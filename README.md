# Periodic Table — iOS (Three.js CSS3D)

Native **iOS** app that runs the [three.js CSS3D periodic table](https://threejs.org/examples/css3d_periodictable.html) example inside a SwiftUI `WKWebView`.

Layouts: **TABLE · SPHERE · HELIX · GRID** (same as the official demo). Drag to orbit, pinch to zoom.

## Run

1. Open `ThreeJSPeriodicTable.xcodeproj` in Xcode  
2. Pick an iPhone Simulator  
3. Set your Signing Team if needed  
4. **Product → Run**

Or regenerate the project after editing `project.yml`:

```bash
cd "ThreeJSPeriodicTable"
xcodegen generate
```

## Layout

```
ThreeJSPeriodicTable/
├── project.yml
├── ThreeJSPeriodicTable/          # SwiftUI shell
│   ├── ThreeJSPeriodicTableApp.swift
│   ├── ContentView.swift
│   └── ThreeJSWebView.swift       # WKWebView + appcontent:// scheme
└── WebContent/                    # Bundled Three.js demo
    ├── index.html
    ├── main.css
    ├── build/three.module.js
    └── jsm/                       # CSS3DRenderer, TrackballControls, tween
```

## Credits

- [three.js css3d_periodictable](https://threejs.org/examples/css3d_periodictable.html) — MIT
