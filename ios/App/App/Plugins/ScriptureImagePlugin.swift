import Capacitor
import UIKit

@objc(ScriptureImagePlugin)
public class ScriptureImagePlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "ScriptureImagePlugin"
    public let jsName = "ScriptureImage"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "generate", returnType: CAPPluginReturnPromise)
    ]

    @objc func generate(_ call: CAPPluginCall) {
        let verseText = call.getString("verseText") ?? ""
        let reference = call.getString("reference") ?? ""
        let width = call.getInt("width") ?? 1024
        let height = call.getInt("height") ?? 1024

        let fullText = verseText.isEmpty ? reference : "\(verseText)\n\n\(reference)"
        let size = CGSize(width: width, height: height)

        let renderer = UIGraphicsImageRenderer(size: size)
        let image = renderer.image { ctx in
            // Background gradient-like effect
            let context = ctx.cgContext
            let rect = CGRect(origin: .zero, size: size)

            let topColor = UIColor.systemBackground
            let bottomColor = UIColor.systemGray6

            let colors = [topColor.cgColor, bottomColor.cgColor] as CFArray
            let colorSpace = CGColorSpaceCreateDeviceRGB()
            if let gradient = CGGradient(colorsSpace: colorSpace, colors: colors, locations: [0.0, 1.0]) {
                context.drawLinearGradient(gradient,
                                           start: CGPoint(x: rect.midX, y: rect.minY),
                                           end: CGPoint(x: rect.midX, y: rect.maxY),
                                           options: [])
            } else {
                UIColor.systemBackground.setFill()
                context.fill(rect)
            }

            // Inner card
            let cardInset: CGFloat = 48
            let cardRect = rect.insetBy(dx: cardInset, dy: cardInset)
            let cardPath = UIBezierPath(roundedRect: cardRect, cornerRadius: 32)
            UIColor.white.withAlphaComponent(0.96).setFill()
            context.setShadow(offset: CGSize(width: 0, height: 8),
                              blur: 24,
                              color: UIColor.black.withAlphaComponent(0.18).cgColor)
            cardPath.fill()

            // Text attributes with dynamic sizing
            let paragraphStyle = NSMutableParagraphStyle()
            paragraphStyle.alignment = .center
            paragraphStyle.lineBreakMode = .byWordWrapping

            let maxTextWidth = cardRect.width - 32
            let maxTextHeight = cardRect.height - 32

            var fontSize: CGFloat = 32
            var textRect = CGRect.zero
            var attributes: [NSAttributedString.Key: Any] = [:]

            repeat {
                let font = UIFont.systemFont(ofSize: fontSize, weight: .semibold)
                attributes = [
                    .font: font,
                    .foregroundColor: UIColor.label,
                    .paragraphStyle: paragraphStyle
                ]

                let boundingSize = CGSize(width: maxTextWidth, height: CGFloat.greatestFiniteMagnitude)
                textRect = (fullText as NSString).boundingRect(
                    with: boundingSize,
                    options: [.usesLineFragmentOrigin, .usesFontLeading],
                    attributes: attributes,
                    context: nil
                )

                fontSize -= 2
            } while (textRect.height > maxTextHeight && fontSize > 14)

            let drawRect = CGRect(
                x: cardRect.midX - textRect.width / 2,
                y: cardRect.midY - textRect.height / 2,
                width: textRect.width,
                height: textRect.height
            )

            (fullText as NSString).draw(in: drawRect, withAttributes: attributes)
        }

        guard let data = image.pngData() else {
            call.reject("Failed to create image data")
            return
        }

        let filename = "scripture_card_\(UUID().uuidString).png"
        let tempDir = FileManager.default.temporaryDirectory
        let fileURL = tempDir.appendingPathComponent(filename)

        do {
            try data.write(to: fileURL)
            call.resolve([
                "fileUrl": fileURL.absoluteString
            ])
        } catch {
            call.reject("Failed to write image file: \(error.localizedDescription)")
        }
    }
}
