/** Periodic table rows: [symbol, name, mass, groupX, periodY] — mirrors three.js example */
export const table = [
	'H', 'Hydrogen', '1.00794', 1, 1,
	'He', 'Helium', '4.002602', 18, 1,
	'Li', 'Lithium', '6.941', 1, 2,
	'Be', 'Beryllium', '9.012182', 2, 2,
	'B', 'Boron', '10.811', 13, 2,
	'C', 'Carbon', '12.0107', 14, 2,
	'N', 'Nitrogen', '14.0067', 15, 2,
	'O', 'Oxygen', '15.9994', 16, 2,
	'F', 'Fluorine', '18.9984032', 17, 2,
	'Ne', 'Neon', '20.1797', 18, 2,
	'Na', 'Sodium', '22.98976', 1, 3,
	'Mg', 'Magnesium', '24.305', 2, 3,
	'Al', 'Aluminium', '26.9815386', 13, 3,
	'Si', 'Silicon', '28.0855', 14, 3,
	'P', 'Phosphorus', '30.973762', 15, 3,
	'S', 'Sulfur', '32.065', 16, 3,
	'Cl', 'Chlorine', '35.453', 17, 3,
	'Ar', 'Argon', '39.948', 18, 3,
	'K', 'Potassium', '39.0983', 1, 4,
	'Ca', 'Calcium', '40.078', 2, 4,
	'Sc', 'Scandium', '44.955912', 3, 4,
	'Ti', 'Titanium', '47.867', 4, 4,
	'V', 'Vanadium', '50.9415', 5, 4,
	'Cr', 'Chromium', '51.9961', 6, 4,
	'Mn', 'Manganese', '54.938045', 7, 4,
	'Fe', 'Iron', '55.845', 8, 4,
	'Co', 'Cobalt', '58.933195', 9, 4,
	'Ni', 'Nickel', '58.6934', 10, 4,
	'Cu', 'Copper', '63.546', 11, 4,
	'Zn', 'Zinc', '65.38', 12, 4,
	'Ga', 'Gallium', '69.723', 13, 4,
	'Ge', 'Germanium', '72.63', 14, 4,
	'As', 'Arsenic', '74.9216', 15, 4,
	'Se', 'Selenium', '78.96', 16, 4,
	'Br', 'Bromine', '79.904', 17, 4,
	'Kr', 'Krypton', '83.798', 18, 4,
	'Rb', 'Rubidium', '85.4678', 1, 5,
	'Sr', 'Strontium', '87.62', 2, 5,
	'Y', 'Yttrium', '88.90585', 3, 5,
	'Zr', 'Zirconium', '91.224', 4, 5,
	'Nb', 'Niobium', '92.90628', 5, 5,
	'Mo', 'Molybdenum', '95.96', 6, 5,
	'Tc', 'Technetium', '(98)', 7, 5,
	'Ru', 'Ruthenium', '101.07', 8, 5,
	'Rh', 'Rhodium', '102.9055', 9, 5,
	'Pd', 'Palladium', '106.42', 10, 5,
	'Ag', 'Silver', '107.8682', 11, 5,
	'Cd', 'Cadmium', '112.411', 12, 5,
	'In', 'Indium', '114.818', 13, 5,
	'Sn', 'Tin', '118.71', 14, 5,
	'Sb', 'Antimony', '121.76', 15, 5,
	'Te', 'Tellurium', '127.6', 16, 5,
	'I', 'Iodine', '126.90447', 17, 5,
	'Xe', 'Xenon', '131.293', 18, 5,
	'Cs', 'Caesium', '132.9054', 1, 6,
	'Ba', 'Barium', '137.327', 2, 6,
	'La', 'Lanthanum', '138.90547', 4, 9,
	'Ce', 'Cerium', '140.116', 5, 9,
	'Pr', 'Praseodymium', '140.90765', 6, 9,
	'Nd', 'Neodymium', '144.242', 7, 9,
	'Pm', 'Promethium', '(145)', 8, 9,
	'Sm', 'Samarium', '150.36', 9, 9,
	'Eu', 'Europium', '151.964', 10, 9,
	'Gd', 'Gadolinium', '157.25', 11, 9,
	'Tb', 'Terbium', '158.92535', 12, 9,
	'Dy', 'Dysprosium', '162.5', 13, 9,
	'Ho', 'Holmium', '164.93032', 14, 9,
	'Er', 'Erbium', '167.259', 15, 9,
	'Tm', 'Thulium', '168.93421', 16, 9,
	'Yb', 'Ytterbium', '173.054', 17, 9,
	'Lu', 'Lutetium', '174.9668', 18, 9,
	'Hf', 'Hafnium', '178.49', 4, 6,
	'Ta', 'Tantalum', '180.94788', 5, 6,
	'W', 'Tungsten', '183.84', 6, 6,
	'Re', 'Rhenium', '186.207', 7, 6,
	'Os', 'Osmium', '190.23', 8, 6,
	'Ir', 'Iridium', '192.217', 9, 6,
	'Pt', 'Platinum', '195.084', 10, 6,
	'Au', 'Gold', '196.966569', 11, 6,
	'Hg', 'Mercury', '200.59', 12, 6,
	'Tl', 'Thallium', '204.3833', 13, 6,
	'Pb', 'Lead', '207.2', 14, 6,
	'Bi', 'Bismuth', '208.9804', 15, 6,
	'Po', 'Polonium', '(209)', 16, 6,
	'At', 'Astatine', '(210)', 17, 6,
	'Rn', 'Radon', '(222)', 18, 6,
	'Fr', 'Francium', '(223)', 1, 7,
	'Ra', 'Radium', '(226)', 2, 7,
	'Ac', 'Actinium', '(227)', 4, 10,
	'Th', 'Thorium', '232.03806', 5, 10,
	'Pa', 'Protactinium', '231.0588', 6, 10,
	'U', 'Uranium', '238.02891', 7, 10,
	'Np', 'Neptunium', '(237)', 8, 10,
	'Pu', 'Plutonium', '(244)', 9, 10,
	'Am', 'Americium', '(243)', 10, 10,
	'Cm', 'Curium', '(247)', 11, 10,
	'Bk', 'Berkelium', '(247)', 12, 10,
	'Cf', 'Californium', '(251)', 13, 10,
	'Es', 'Einsteinium', '(252)', 14, 10,
	'Fm', 'Fermium', '(257)', 15, 10,
	'Md', 'Mendelevium', '(258)', 16, 10,
	'No', 'Nobelium', '(259)', 17, 10,
	'Lr', 'Lawrencium', '(262)', 18, 10,
	'Rf', 'Rutherfordium', '(267)', 4, 7,
	'Db', 'Dubnium', '(268)', 5, 7,
	'Sg', 'Seaborgium', '(271)', 6, 7,
	'Bh', 'Bohrium', '(272)', 7, 7,
	'Hs', 'Hassium', '(270)', 8, 7,
	'Mt', 'Meitnerium', '(276)', 9, 7,
	'Ds', 'Darmstadtium', '(281)', 10, 7,
	'Rg', 'Roentgenium', '(280)', 11, 7,
	'Cn', 'Copernicium', '(285)', 12, 7,
	'Nh', 'Nihonium', '(286)', 13, 7,
	'Fl', 'Flerovium', '(289)', 14, 7,
	'Mc', 'Moscovium', '(290)', 15, 7,
	'Lv', 'Livermorium', '(293)', 16, 7,
	'Ts', 'Tennessine', '(294)', 17, 7,
	'Og', 'Oganesson', '(294)', 18, 7
];

const CATEGORY = {
	noble: 'Noble Gas',
	alkali: 'Alkali Metal',
	alkaline: 'Alkaline Earth',
	transition: 'Transition Metal',
	post: 'Post-transition',
	metalloid: 'Metalloid',
	nonmetal: 'Reactive Nonmetal',
	halogen: 'Halogen',
	lanthanide: 'Lanthanide',
	actinide: 'Actinide',
	unknown: 'Unknown'
};

const HIGHLIGHTS = {
	H: {
		summary: 'The lightest element — fuel of stars and the backbone of water.',
		features: ['Lightest atom', 'Fusion fuel', 'Forms water', 'Colorless gas'],
		uses: ['Rocket propellant', 'Ammonia / fertilizer feedstock', 'Fuel cells', 'Laboratory reducing agent']
	},
	He: {
		summary: 'An inert noble gas famous for balloons, cryogenics, and cool blue glow.',
		features: ['Chemically inert', 'Second lightest', 'Lowest boiling point', 'Non-flammable'],
		uses: ['MRI cryogenics', 'Party balloons', 'Leak detection', 'Shielding gas']
	},
	C: {
		summary: 'The element of life — diamonds, graphite, and every organic molecule.',
		features: ['4 valence bonds', 'Allotropes', 'Basis of organics', 'High melting forms'],
		uses: ['Steel alloys', 'Batteries / graphene R&D', 'Polymers', 'Jewelry (diamond)']
	},
	O: {
		summary: 'Essential for respiration and combustion; ~21% of Earth’s atmosphere.',
		features: ['Supports life', 'Strong oxidizer', 'Forms oxides', 'Pale blue liquid'],
		uses: ['Medical oxygen', 'Steelmaking', 'Water treatment', 'Rocket oxidizer']
	},
	Fe: {
		summary: 'The workhorse metal of civilization — from blood hemoglobin to skyscrapers.',
		features: ['Magnetic', 'Abundant', 'Forms steel', 'Corrodes as rust'],
		uses: ['Construction steel', 'Machinery', 'Magnets', 'Biology (hemoglobin)']
	},
	Au: {
		summary: 'A soft, corrosion-proof precious metal prized for jewelry and electronics.',
		features: ['Highly conductive', 'Does not rust', 'Malleable', 'Dense yellow metal'],
		uses: ['Jewelry', 'Circuit contacts', 'Investment bars', 'Nanomedicine research']
	},
	U: {
		summary: 'A heavy radioactive actinide used as nuclear fuel when enriched.',
		features: ['Radioactive', 'Dense', 'Fissionable isotopes', 'Silvery metal'],
		uses: ['Nuclear reactors', 'Research isotopes', 'Armor piercing (depleted)', 'Dating rocks']
	}
};

function categoryFor(Z, group, period) {
	if (period === 9) return CATEGORY.lanthanide;
	if (period === 10) return CATEGORY.actinide;
	if (group === 18) return CATEGORY.noble;
	if (group === 1 && Z !== 1) return CATEGORY.alkali;
	if (group === 2) return CATEGORY.alkaline;
	if (group === 17) return CATEGORY.halogen;
	if ([5, 14, 32, 33, 51, 52, 85].includes(Z)) return CATEGORY.metalloid;
	if ([1, 6, 7, 8, 15, 16, 34].includes(Z)) return CATEGORY.nonmetal;
	if (group >= 3 && group <= 12) return CATEGORY.transition;
	if (group === 13 || group === 14 || group === 15 || group === 16) return CATEGORY.post;
	return CATEGORY.unknown;
}

/** Approximate Bohr shell filling for visualization (capped for readability). */
export function electronShells(Z) {
	const caps = [2, 8, 18, 32, 32, 18, 8];
	const shells = [];
	let left = Math.max(1, Math.min(Z, 118));
	for (const cap of caps) {
		if (left <= 0) break;
		const n = Math.min(cap, left);
		shells.push(n);
		left -= n;
	}
	return shells;
}

function defaultFeatures(category, Z) {
	const base = {
		[CATEGORY.noble]: ['Full outer shell', 'Low reactivity', 'Gaseous at STP', 'Glows in discharge'],
		[CATEGORY.alkali]: ['Soft metal', '1 valence e⁻', 'Highly reactive', 'Forms +1 ions'],
		[CATEGORY.alkaline]: ['Reactive metal', '2 valence e⁻', 'Forms +2 ions', 'Flame colors'],
		[CATEGORY.transition]: ['Variable oxidation', 'Colored compounds', 'Good conductor', 'Catalytic uses'],
		[CATEGORY.post]: ['Softer metals', 'Mixed bonding', 'Often toxic salts', 'Useful alloys'],
		[CATEGORY.metalloid]: ['Semi-conductor', 'Mixed properties', 'Brittle solids', 'Electronics role'],
		[CATEGORY.nonmetal]: ['Poor conductor', 'Forms molecules', 'High electronegativity', 'Essential in life'],
		[CATEGORY.halogen]: ['Highly reactive', 'Forms salts', 'Diatomic forms', 'Strong oxidizer'],
		[CATEGORY.lanthanide]: ['f-block metal', 'Similar chemistry', 'Magnetic uses', 'Rare-earth tech'],
		[CATEGORY.actinide]: ['Radioactive', 'Heavy metal', 'f-block', 'Nuclear relevance'],
		[CATEGORY.unknown]: ['Synthetic', 'Short-lived', 'Research only', 'Predicted properties']
	};
	const list = (base[category] || base[CATEGORY.unknown]).slice();
	list.unshift(`Atomic number ${Z}`);
	return list.slice(0, 4);
}

function defaultUses(category, name) {
	const map = {
		[CATEGORY.noble]: [`Lighting & discharge tubes`, `Inert atmospheres for ${name}`, `Cryogenics / insulation`, `Specialty research`],
		[CATEGORY.alkali]: [`Batteries & electrolytes`, `Chemical synthesis`, `Street lighting salts`, `Lab reagents`],
		[CATEGORY.alkaline]: [`Lightweight alloys`, `Flare compounds`, `Cement / minerals`, `Biology (ions)`],
		[CATEGORY.transition]: [`Structural alloys`, `Catalysts`, `Magnets & motors`, `Pigments & plating`],
		[CATEGORY.post]: [`Solders & alloys`, `Electronics packaging`, `Coatings`, `Specialty chemistry`],
		[CATEGORY.metalloid]: [`Semiconductors`, `Glass & ceramics`, `Alloying agent`, `Sensors`],
		[CATEGORY.nonmetal]: [`Industrial chemicals`, `Life sciences`, `Polymers & plastics`, `Energy materials`],
		[CATEGORY.halogen]: [`Disinfectants`, `Pharmaceuticals`, `Polymers (e.g. PVC)`, `Photography / etching`],
		[CATEGORY.lanthanide]: [`Permanent magnets`, `Lasers & optics`, `Catalysts`, `Display phosphors`],
		[CATEGORY.actinide]: [`Nuclear fuel cycles`, `Radiography sources`, `Scientific research`, `Isotope production`],
		[CATEGORY.unknown]: [`Accelerator experiments`, `Theoretical models`, `Named discovery credits`, `Future chemistry`]
	};
	return map[category] || map[CATEGORY.unknown];
}

function defaultSummary(name, category) {
	return `${name} is classified as a ${category.toLowerCase()}. Tap through its atomic structure, key features, and real-world uses below.`;
}

export function buildElements() {
	const list = [];
	for (let i = 0; i < table.length; i += 5) {
		const Z = i / 5 + 1;
		const symbol = table[i];
		const name = table[i + 1];
		const mass = String(table[i + 2]);
		const group = Number(table[i + 3]);
		const period = Number(table[i + 4]);
		const category = categoryFor(Z, group, period);
		const highlight = HIGHLIGHTS[symbol];
		list.push({
			Z,
			symbol,
			name,
			mass,
			group,
			period,
			category,
			shells: electronShells(Z),
			summary: highlight?.summary || defaultSummary(name, category),
			features: highlight?.features || defaultFeatures(category, Z),
			uses: highlight?.uses || defaultUses(category, name)
		});
	}
	return list;
}

export function bohrModelSVG(shells, symbol) {
	const size = 220;
	const cx = size / 2;
	const cy = size / 2;
	const maxR = 92;
	const shellCount = Math.max(shells.length, 1);
	let rings = '';
	let electrons = '';

	shells.forEach((count, idx) => {
		const r = 22 + ((idx + 1) / shellCount) * (maxR - 22);
		rings += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(163,177,198,0.65)" stroke-width="1.5"/>`;
		const n = Math.min(count, 24);
		for (let e = 0; e < n; e++) {
			const a = (e / n) * Math.PI * 2 - Math.PI / 2;
			const x = cx + Math.cos(a) * r;
			const y = cy + Math.sin(a) * r;
			electrons += `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="4.2" fill="#FF8A00" stroke="#fff" stroke-width="1.2"/>`;
		}
	});

	return `
<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
	<defs>
		<radialGradient id="core" cx="35%" cy="30%" r="70%">
			<stop offset="0%" stop-color="#FFF3E0"/>
			<stop offset="55%" stop-color="#FF8A00"/>
			<stop offset="100%" stop-color="#FF6A00"/>
		</radialGradient>
		<filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
			<feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="rgba(163,177,198,0.45)"/>
		</filter>
	</defs>
	<circle cx="${cx}" cy="${cy}" r="${maxR + 8}" fill="rgba(235,236,240,0.55)" filter="url(#soft)"/>
	${rings}
	<circle cx="${cx}" cy="${cy}" r="16" fill="url(#core)" stroke="rgba(255,255,255,0.85)" stroke-width="2"/>
	<text x="${cx}" y="${cy + 5}" text-anchor="middle" font-family="-apple-system,BlinkMacSystemFont,sans-serif" font-size="12" font-weight="800" fill="#fff">${symbol}</text>
	${electrons}
</svg>`;
}
