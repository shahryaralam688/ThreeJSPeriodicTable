import * as THREE from 'three';
import TWEEN from 'three/addons/libs/tween.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { buildElements, bohrModelSVG } from './elements-data.js';

const elements = buildElements();

const MIN_DISTANCE = 80;
const MAX_DISTANCE = 120000;
const BASE_FOV = 40;
const MAX_FOV = 100;

/** Default camera distance from layout center for each tab */
const VIEW_DISTANCE = {
	table: 3000,
	sphere: 3000,
	helix: 3200,
	grid: 3800
};

let camera, scene, renderer, controls;
const objects = [];
const targets = { table: [], sphere: [], helix: [], grid: [] };
let currentLayout = 'table';
let activeObject = null;
let pointerDown = null;
let resetTween = null;
let pinchFingerCount = 0;
let controlsWatchdogTimer = 0;
let layoutTweens = [];

const overlay = document.getElementById('detail-overlay');
const sheet = document.getElementById('detail-sheet');

init();
animate();

function init() {
	camera = new THREE.PerspectiveCamera(BASE_FOV, window.innerWidth / window.innerHeight, 1, 250000);
	camera.position.z = 3000;
	scene = new THREE.Scene();

	for (let i = 0; i < elements.length; i++) {
		const data = elements[i];
		const el = document.createElement('div');
		el.className = 'element';
		el.dataset.index = String(i);
		el.innerHTML = `
			<span class="accent-bar"></span>
			<div class="number">${data.Z}</div>
			<div class="symbol">${data.symbol}</div>
			<div class="details">${data.name}<span class="mass">${data.mass}</span></div>
		`;

		el.addEventListener('pointerdown', (event) => {
			pointerDown = { x: event.clientX, y: event.clientY, index: i, time: performance.now() };
		});
		el.addEventListener('pointerup', (event) => {
			if (!pointerDown || pointerDown.index !== i) return;
			const dx = event.clientX - pointerDown.x;
			const dy = event.clientY - pointerDown.y;
			const dt = performance.now() - pointerDown.time;
			pointerDown = null;
			if (Math.hypot(dx, dy) < 12 && dt < 500) {
				event.stopPropagation();
				openDetail(i);
			}
		});

		const objectCSS = new CSS3DObject(el);
		objectCSS.position.x = Math.random() * 4000 - 2000;
		objectCSS.position.y = Math.random() * 4000 - 2000;
		objectCSS.position.z = Math.random() * 4000 - 2000;
		objectCSS.userData.index = i;
		scene.add(objectCSS);
		objects.push(objectCSS);

		const object = new THREE.Object3D();
		object.position.x = data.group * 140 - 1330;
		object.position.y = -(data.period * 180) + 990;
		targets.table.push(object);
	}

	const vector = new THREE.Vector3();

	for (let i = 0, l = objects.length; i < l; i++) {
		const phi = Math.acos(-1 + (2 * i) / l);
		const theta = Math.sqrt(l * Math.PI) * phi;
		const object = new THREE.Object3D();
		object.position.setFromSphericalCoords(800, phi, theta);
		vector.copy(object.position).multiplyScalar(2);
		object.lookAt(vector);
		targets.sphere.push(object);
	}

	for (let i = 0, l = objects.length; i < l; i++) {
		const theta = i * 0.175 + Math.PI;
		const y = -(i * 8) + 450;
		const object = new THREE.Object3D();
		object.position.setFromCylindricalCoords(900, theta, y);
		vector.x = object.position.x * 2;
		vector.y = object.position.y;
		vector.z = object.position.z * 2;
		object.lookAt(vector);
		targets.helix.push(object);
	}

	for (let i = 0; i < objects.length; i++) {
		const object = new THREE.Object3D();
		object.position.x = ((i % 5) * 400) - 800;
		object.position.y = (-(Math.floor(i / 5) % 5) * 400) + 800;
		object.position.z = (Math.floor(i / 25) * 1000) - 2000;
		targets.grid.push(object);
	}

	renderer = new CSS3DRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	const container = document.getElementById('container');
	container.appendChild(renderer.domElement);
	renderer.domElement.style.touchAction = 'none';
	container.style.touchAction = 'none';

	controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.dampingFactor = 0.08;
	controls.rotateSpeed = 0.85;
	controls.zoomSpeed = 1.4;
	controls.panSpeed = 0.8;
	controls.minDistance = MIN_DISTANCE;
	controls.maxDistance = MAX_DISTANCE;
	controls.enableZoom = true; // mouse wheel
	controls.zoomToCursor = false;
	// Two-finger dolly handled by installPinchZoom (stronger zoom-out on iOS)
	controls.touches = {
		ONE: THREE.TOUCH.ROTATE,
		TWO: THREE.TOUCH.PAN
	};
	controls.addEventListener('change', () => {
		syncZoomFeel();
		render();
	});

	installPinchZoom(renderer.domElement);
	installControlsWatchdog();

	wireMenu();
	wireDetailChrome();
	document.getElementById('reset-view').addEventListener('click', resetView);

	transform(targets.table, 2000);
	setActiveMenu('table');
	currentLayout = 'table';

	window.addEventListener('resize', onWindowResize);
}

/**
 * Pinch / Option-key simulator gestures sometimes leave OrbitControls with
 * stale pointers so one-finger rotate stops working. Force a clean slate.
 */
function reviveControls() {
	if (!controls) return;

	controls.enabled = true;

	// Clear private interaction leftovers (safe on three.js OrbitControls)
	if (Array.isArray(controls._pointers)) {
		controls._pointers.length = 0;
	}
	if (controls._pointerPositions) {
		for (const key of Object.keys(controls._pointerPositions)) {
			delete controls._pointerPositions[key];
		}
	}

	controls.state = -1; // STATE.NONE
	if (controls._sphericalDelta) controls._sphericalDelta.set(0, 0, 0);
	if (controls._panOffset) controls._panOffset.set(0, 0, 0);
	controls._scale = 1;

	const el = controls.domElement;
	if (el) {
		el.removeEventListener('pointermove', controls._onPointerMove);
		el.removeEventListener('pointerup', controls._onPointerUp);
		try {
			if (typeof el.releasePointerCapture === 'function') {
				// Best-effort: release any captured pointer ids we can see
				const maybeIds = [];
				if (window.event && 'pointerId' in window.event) {
					maybeIds.push(window.event.pointerId);
				}
				for (const id of maybeIds) {
					try { el.releasePointerCapture(id); } catch (_) { /* ignore */ }
				}
			}
		} catch (_) { /* ignore */ }
	}

	controls.update();
}

/** Global safety net: clear OrbitControls only when a gesture fully ended but leftovers remain. */
function installControlsWatchdog() {
	const scheduleReviveIfStuck = () => {
		window.clearTimeout(controlsWatchdogTimer);
		controlsWatchdogTimer = window.setTimeout(() => {
			if (resetTween || overlay.classList.contains('open')) return;
			if (pinchFingerCount > 0) return;
			if (!controls || !Array.isArray(controls._pointers)) return;
			// Still tracking pointers with no active pinch fingers = stuck (common after Option-pinch)
			if (controls._pointers.length > 0) {
				reviveControls();
			}
		}, 120);
	};

	window.addEventListener('pointerup', scheduleReviveIfStuck, true);
	window.addEventListener('pointercancel', scheduleReviveIfStuck, true);
	window.addEventListener('blur', () => reviveControls());
	document.addEventListener('visibilitychange', () => {
		if (document.visibilityState === 'visible') reviveControls();
	});
}

/** Widen FOV as camera pulls back so zoom-out can make the table tiny. */
function syncZoomFeel() {
	const distance = camera.position.distanceTo(controls.target);
	const t = THREE.MathUtils.clamp((distance - 2500) / (MAX_DISTANCE - 2500), 0, 1);
	const nextFov = THREE.MathUtils.lerp(BASE_FOV, MAX_FOV, Math.pow(t, 0.65));
	if (Math.abs(camera.fov - nextFov) > 0.05) {
		camera.fov = nextFov;
		camera.updateProjectionMatrix();
	}
}

/**
 * Dedicated two-finger pinch: spread = bigger, pinch = much smaller.
 * Complements OrbitControls and avoids WKWebView eating zoom-out.
 */
function installPinchZoom(domElement) {
	const pointers = new Map();
	let lastSpan = 0;
	let wasPinching = false;

	const spanOf = () => {
		if (pointers.size < 2) return 0;
		const [a, b] = [...pointers.values()];
		return Math.hypot(a.x - b.x, a.y - b.y);
	};

	const endPointer = (event) => {
		if (!pointers.has(event.pointerId)) return;
		pointers.delete(event.pointerId);
		pinchFingerCount = pointers.size;
		lastSpan = pointers.size >= 2 ? spanOf() : 0;

		// After a pinch ends, OrbitControls often keeps a stale pointer — revive rotate
		if (wasPinching && pointers.size === 0) {
			wasPinching = false;
			requestAnimationFrame(() => reviveControls());
		}
	};

	domElement.addEventListener('pointerdown', (event) => {
		pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
		pinchFingerCount = pointers.size;
		if (pointers.size >= 2) {
			wasPinching = true;
			lastSpan = spanOf();
		}
	});

	domElement.addEventListener('pointermove', (event) => {
		if (!pointers.has(event.pointerId)) return;
		pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
		if (pointers.size < 2 || lastSpan <= 0 || !controls.enabled || resetTween) return;

		const span = spanOf();
		if (span <= 0) return;

		const ratio = span / lastSpan;
		lastSpan = span;

		const offset = new THREE.Vector3().subVectors(camera.position, controls.target);
		let distance = offset.length();
		if (distance < 1e-6) return;

		let factor;
		if (ratio < 1) {
			factor = 1 / Math.pow(ratio, 1.85);
		} else {
			factor = 1 / Math.pow(ratio, 1.15);
		}

		distance = THREE.MathUtils.clamp(distance * factor, MIN_DISTANCE, MAX_DISTANCE);
		offset.setLength(distance);
		camera.position.copy(controls.target).add(offset);
		camera.lookAt(controls.target);
		syncZoomFeel();
		render();
	}, { passive: true });

	// Use window capture so Option-key simulator pinch can't "lose" the up event
	window.addEventListener('pointerup', endPointer, true);
	window.addEventListener('pointercancel', endPointer, true);
}

function wireMenu() {
	const map = {
		table: targets.table,
		sphere: targets.sphere,
		helix: targets.helix,
		grid: targets.grid
	};

	Object.keys(map).forEach((id) => {
		const button = document.getElementById(id);
		button.addEventListener('click', () => {
			currentLayout = id;
			transform(map[id], 2000);
			setActiveMenu(id);
		});
	});
}

function setActiveMenu(id) {
	document.querySelectorAll('#menu button').forEach((btn) => {
		btn.classList.toggle('active', btn.id === id);
	});
}

function layoutCenter(targetList) {
	const center = new THREE.Vector3();
	if (!targetList.length) return center;
	for (let i = 0; i < targetList.length; i++) {
		center.add(targetList[i].position);
	}
	center.multiplyScalar(1 / targetList.length);
	return center;
}

/** Snap camera to front-center of the active layout (table / sphere / helix / grid). */
function resetView() {
	if (!controls || overlay.classList.contains('open')) return;

	const list = targets[currentLayout] || targets.table;
	const center = layoutCenter(list);
	const distance = VIEW_DISTANCE[currentLayout] || 3000;

	const fromPos = camera.position.clone();
	const fromTarget = controls.target.clone();
	const fromFov = camera.fov;
	const toTarget = center.clone();
	const toPos = center.clone().add(new THREE.Vector3(0, 0, distance));

	if (resetTween) {
		resetTween.stop();
		resetTween = null;
	}

	// Pause orbit while animating so damping / stale pointers can't fight the tween
	reviveControls();
	controls.enabled = false;

	const state = { t: 0 };
	resetTween = new TWEEN.Tween(state)
		.to({ t: 1 }, 700)
		.easing(TWEEN.Easing.Cubic.Out)
		.onUpdate(() => {
			const t = state.t;
			camera.position.lerpVectors(fromPos, toPos, t);
			controls.target.lerpVectors(fromTarget, toTarget, t);
			camera.fov = THREE.MathUtils.lerp(fromFov, BASE_FOV, t);
			camera.updateProjectionMatrix();
			camera.lookAt(controls.target);
			render();
		})
		.onComplete(() => {
			camera.position.copy(toPos);
			controls.target.copy(toTarget);
			camera.fov = BASE_FOV;
			camera.updateProjectionMatrix();
			camera.lookAt(controls.target);
			resetTween = null;
			reviveControls();
			render();
		})
		.start();
}

function wireDetailChrome() {
	document.getElementById('detail-close').addEventListener('click', closeDetail);
	overlay.addEventListener('click', (event) => {
		if (event.target === overlay) closeDetail();
	});
	sheet.addEventListener('click', (event) => event.stopPropagation());
}

function openDetail(index) {
	const data = elements[index];
	if (activeObject && activeObject.element) {
		activeObject.element.classList.remove('is-active');
	}
	activeObject = objects[index];
	activeObject.element.classList.add('is-active');

	document.getElementById('d-num').textContent = data.Z;
	document.getElementById('d-sym').textContent = data.symbol;
	document.getElementById('d-name').textContent = data.name;
	document.getElementById('d-meta').textContent = `Group ${data.group} · Period ${data.period}`;
	document.getElementById('d-chip').textContent = data.category;
	document.getElementById('d-mass').textContent = data.mass;
	document.getElementById('d-electrons').textContent = String(data.Z);
	document.getElementById('d-shells').textContent = data.shells.join(' · ');
	document.getElementById('d-summary').textContent = data.summary;
	document.getElementById('d-atom').innerHTML = bohrModelSVG(data.shells, data.symbol);

	const features = document.getElementById('d-features');
	features.innerHTML = data.features.map((f) => `<li>${f}</li>`).join('');

	const uses = document.getElementById('d-uses');
	uses.innerHTML = data.uses
		.map((u) => `<div class="use-row"><span class="use-dot"></span><span>${u}</span></div>`)
		.join('');

	overlay.classList.add('open');
	controls.enabled = false;
}

function closeDetail() {
	overlay.classList.remove('open');
	if (activeObject && activeObject.element) {
		activeObject.element.classList.remove('is-active');
	}
	activeObject = null;
	reviveControls();
}

function transform(targetList, duration) {
	// Stop previous layout tweens only — do not TWEEN.removeAll() (that killed reset)
	for (let i = 0; i < layoutTweens.length; i++) {
		layoutTweens[i].stop();
	}
	layoutTweens = [];

	for (let i = 0; i < objects.length; i++) {
		const object = objects[i];
		const target = targetList[i];

		layoutTweens.push(
			new TWEEN.Tween(object.position)
				.to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
				.easing(TWEEN.Easing.Exponential.InOut)
				.start()
		);

		layoutTweens.push(
			new TWEEN.Tween(object.rotation)
				.to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
				.easing(TWEEN.Easing.Exponential.InOut)
				.start()
		);
	}

	layoutTweens.push(
		new TWEEN.Tween({})
			.to({}, duration * 2)
			.onUpdate(render)
			.start()
	);
}

function animate() {
	requestAnimationFrame(animate);
	TWEEN.update();
	// Skip orbit update during reset tween so it can't overwrite the animation
	if (controls.enabled && !resetTween) {
		controls.update();
	}
	render();
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	render();
}

function render() {
	renderer.render(scene, camera);
}
