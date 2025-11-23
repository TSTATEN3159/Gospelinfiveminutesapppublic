import Capacitor
import UIKit

@objc(BrandedShareImagePlugin)
public class BrandedShareImagePlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "BrandedShareImagePlugin"
    public let jsName = "BrandedShareImage"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "shareVerse", returnType: CAPPluginReturnPromise)
    ]

    @objc func shareVerse(_ call: CAPPluginCall) {
        let verseText = call.getString("verseText") ?? ""
        let reference = call.getString("reference") ?? ""
        let tagline = call.getString("tagline") ?? "The Gospel in Five Minutes"

        let width = 1024
        let height = 1024
        let size = CGSize(width: width, height: height)

        let fullText = verseText.isEmpty ? reference : "\(verseText)\n\n\(reference)"

        let renderer = UIGraphicsImageRenderer(size: size)
        let image = renderer.image { ctx in
            let context = ctx.cgContext
            let rect = CGRect(origin: .zero, size: size)

            // Background gradient
            let topColor = UIColor.systemBackground
            let bottomColor = UIColor.systemGray5

            let colors = [topColor.cgColor, bottomColor.cgColor] as CFArray
            let colorSpace = CGColorSpaceCreateDeviceRGB()
            if let gradient = CGGradient(colorsSpace: colorSpace, colors: colors, locations: [0.0, 1.0]) {
                context.drawLinearGradient(
                    gradient,
                    start: CGPoint(x: rect.midX, y: rect.minY),
                    end: CGPoint(x: rect.midX, y: rect.maxY),
                    options: []
                )
            } else {
                UIColor.systemBackground.setFill()
                context.fill(rect)
            }

            // Inner card
            let cardInset: CGFloat = 64
            let cardRect = rect.insetBy(dx: cardInset, dy: cardInset + 40) // leave room at bottom for branding
            let cardPath = UIBezierPath(roundedRect: cardRect, cornerRadius: 36)
            UIColor.white.withAlphaComponent(0.97).setFill()
            context.setShadow(
                offset: CGSize(width: 0, height: 10),
                blur: 28,
                color: UIColor.black.withAlphaComponent(0.2).cgColor
            )
            cardPath.fill()

            // Reset shadow for text
            context.setShadow(offset: .zero, blur: 0, color: nil)

            // Main verse text
            let paragraphStyle = NSMutableParagraphStyle()
            paragraphStyle.alignment = .center
            paragraphStyle.lineBreakMode = .byWordWrapping

            let maxTextWidth = cardRect.width - 40
            let maxTextHeight = cardRect.height - 40

            var fontSize: CGFloat = 34
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
            } while (textRect.height > maxTextHeight && fontSize > 16)

            let drawRect = CGRect(
                x: cardRect.midX - textRect.width / 2,
                y: cardRect.midY - textRect.height / 2,
                width: textRect.width,
                height: textRect.height
            )

            (fullText as NSString).draw(in: drawRect, withAttributes: attributes)

            // Branding strip at the bottom
            let brandingHeight: CGFloat = 60
            let brandingRect = CGRect(
                x: cardInset,
                y: rect.maxY - cardInset - brandingHeight,
                width: rect.width - cardInset * 2,
                height: brandingHeight
            )

            let brandingPath = UIBezierPath(roundedRect: brandingRect, cornerRadius: 24)
            UIColor.black.withAlphaComponent(0.75).setFill()
            brandingPath.fill()

            // Tagline text on left
            let taglineParagraph = NSMutableParagraphStyle()
            taglineParagraph.alignment = .left
            taglineParagraph.lineBreakMode = .byTruncatingTail

            let taglineAttributes: [NSAttributedString.Key: Any] = [
                .font: UIFont.systemFont(ofSize: 20, weight: .medium),
                .foregroundColor: UIColor.white,
                .paragraphStyle: taglineParagraph
            ]

            let taglineInsetRect = brandingRect.insetBy(dx: 20, dy: 10)
            (tagline as NSString).draw(
                in: taglineInsetRect,
                withAttributes: taglineAttributes
            )

            // Optional logo on right (if we find an image named "ShareLogo" in assets)
            if let logo = UIImage(named: "ShareLogo") {
                let logoMaxHeight: CGFloat = brandingHeight - 16
                let aspect = logo.size.width / logo.size.height
                let logoHeight = logoMaxHeight
                let logoWidth = logoHeight * aspect

                let logoRect = CGRect(
                    x: brandingRect.maxX - logoWidth - 16,
                    y: brandingRect.midY - logoHeight / 2,
                    width: logoWidth,
                    height: logoHeight
                )

                context.saveGState()
                context.setAlpha(0.9)
                logo.draw(in: logoRect)
                context.restoreGState()
            }
        }

        // Prepare items for share sheet
        let shareText = "\(verseText)\n\n\(reference)\n\nThe Gospel in Five Minutes"
        var activityItems: [Any] = [image, shareText]

        let activityVC = UIActivityViewController(activityItems: activityItems, applicationActivities: nil)

        DispatchQueue.main.async {
            if let root = UIApplication.shared.windows.first?.rootViewController {
                root.present(activityVC, animated: true, completion: nil)
                call.resolve()
            } else {
                call.reject("No root view controller available for sharing")
            }
        }
    }
}
