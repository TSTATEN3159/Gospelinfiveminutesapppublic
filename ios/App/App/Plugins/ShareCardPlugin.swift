import Capacitor
import UIKit

@objc(ShareCardPlugin)
public class ShareCardPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "ShareCardPlugin"
    public let jsName = "ShareCard"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "share", returnType: CAPPluginReturnPromise)
    ]

    @objc func share(_ call: CAPPluginCall) {
        let verseText = call.getString("verseText") ?? ""
        let reference = call.getString("reference") ?? ""
        
        let text = "\(verseText)\n\n\(reference)"
        
        let activityVC = UIActivityViewController(activityItems: [text], applicationActivities: nil)
        DispatchQueue.main.async {
            UIApplication.shared.windows.first?.rootViewController?.present(activityVC, animated: true, completion: nil)
        }
        
        call.resolve()
    }
}
