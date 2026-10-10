import SwiftUI
import WebKit

struct ThreeJSWebView: UIViewRepresentable {
    func makeCoordinator() -> Coordinator {
        Coordinator()
    }

    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.preferences.setValue(true, forKey: "allowFileAccessFromFileURLs")
        config.setValue(true, forKey: "allowUniversalAccessFromFileURLs")
        config.defaultWebpagePreferences.allowsContentJavaScript = true
        config.allowsInlineMediaPlayback = true
        config.mediaTypesRequiringUserActionForPlayback = []

        let handler = LocalWebSchemeHandler(rootDirectory: Self.webRoot)
        config.setURLSchemeHandler(handler, forURLScheme: LocalWebSchemeHandler.scheme)
        context.coordinator.schemeHandler = handler

        let webView = WKWebView(frame: .zero, configuration: config)
        webView.isOpaque = false
        webView.backgroundColor = UIColor(red: 0.922, green: 0.925, blue: 0.941, alpha: 1) // #EBECF0
        webView.scrollView.backgroundColor = UIColor(red: 0.922, green: 0.925, blue: 0.941, alpha: 1)
        webView.scrollView.isScrollEnabled = false
        webView.scrollView.bounces = false
        webView.scrollView.bouncesZoom = false
        webView.scrollView.maximumZoomScale = 1
        webView.scrollView.minimumZoomScale = 1
        webView.scrollView.delaysContentTouches = false
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.allowsBackForwardNavigationGestures = false
        // Stop UIScrollView from eating pinch-out (zoom smaller) gestures
        webView.scrollView.pinchGestureRecognizer?.isEnabled = false
        webView.scrollView.panGestureRecognizer.isEnabled = false
        for recognizer in webView.scrollView.gestureRecognizers ?? [] {
            if recognizer is UIPinchGestureRecognizer {
                recognizer.isEnabled = false
            }
        }
        #if DEBUG
        if #available(iOS 16.4, *) {
            webView.isInspectable = true
        }
        #endif

        let url = URL(string: "\(LocalWebSchemeHandler.scheme)://local/index.html")!
        webView.load(URLRequest(url: url))
        return webView
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {}

    private static var webRoot: URL {
        guard let url = Bundle.main.resourceURL?.appendingPathComponent("WebContent", isDirectory: true) else {
            fatalError("WebContent folder missing from app bundle")
        }
        return url
    }

    final class Coordinator {
        var schemeHandler: LocalWebSchemeHandler?
    }
}

final class LocalWebSchemeHandler: NSObject, WKURLSchemeHandler {
    static let scheme = "appcontent"

    private let rootDirectory: URL
    private let queue = DispatchQueue(label: "LocalWebSchemeHandler")

    init(rootDirectory: URL) {
        self.rootDirectory = rootDirectory.standardizedFileURL
    }

    func webView(_ webView: WKWebView, start urlSchemeTask: WKURLSchemeTask) {
        queue.async { [rootDirectory] in
            guard let requestURL = urlSchemeTask.request.url else {
                urlSchemeTask.didFailWithError(URLError(.badURL))
                return
            }

            var relativePath = requestURL.path
            if relativePath.hasPrefix("/") {
                relativePath.removeFirst()
            }
            if relativePath.isEmpty {
                relativePath = "index.html"
            }

            let fileURL = rootDirectory.appendingPathComponent(relativePath).standardizedFileURL
            guard fileURL.path.hasPrefix(rootDirectory.path) else {
                urlSchemeTask.didFailWithError(URLError(.noPermissionsToReadFile))
                return
            }

            do {
                let data = try Data(contentsOf: fileURL)
                let mime = Self.mimeType(for: fileURL.pathExtension)
                let response = URLResponse(
                    url: requestURL,
                    mimeType: mime,
                    expectedContentLength: data.count,
                    textEncodingName: mime.hasPrefix("text/") || mime.contains("javascript") || mime == "application/json" ? "utf-8" : nil
                )
                urlSchemeTask.didReceive(response)
                urlSchemeTask.didReceive(data)
                urlSchemeTask.didFinish()
            } catch {
                urlSchemeTask.didFailWithError(error)
            }
        }
    }

    func webView(_ webView: WKWebView, stop urlSchemeTask: WKURLSchemeTask) {}

    private static func mimeType(for ext: String) -> String {
        switch ext.lowercased() {
        case "html", "htm": return "text/html"
        case "js", "mjs": return "text/javascript"
        case "css": return "text/css"
        case "json": return "application/json"
        case "png": return "image/png"
        case "jpg", "jpeg": return "image/jpeg"
        case "webp": return "image/webp"
        case "svg": return "image/svg+xml"
        case "wasm": return "application/wasm"
        case "woff": return "font/woff"
        case "woff2": return "font/woff2"
        default: return "application/octet-stream"
        }
    }
}
