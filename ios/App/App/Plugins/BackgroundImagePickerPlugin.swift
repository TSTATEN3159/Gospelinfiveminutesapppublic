import Capacitor
import UIKit

@objc(BackgroundImagePickerPlugin)
public class BackgroundImagePickerPlugin: CAPPlugin, CAPBridgedPlugin, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    public let identifier = "BackgroundImagePickerPlugin"
    public let jsName = "BackgroundImagePicker"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "pickImage", returnType: CAPPluginReturnPromise)
    ]

    private var currentCall: CAPPluginCall?

    @objc func pickImage(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            guard let viewController = self.bridge?.viewController else {
                call.reject("No root view controller available")
                return
            }

            self.currentCall = call

            let picker = UIImagePickerController()
            picker.sourceType = .photoLibrary
            picker.delegate = self
            picker.allowsEditing = false

            viewController.present(picker, animated: true, completion: nil)
        }
    }

    public func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        picker.dismiss(animated: true) {
            self.currentCall?.reject("User cancelled image picking")
            self.currentCall = nil
        }
    }

    public func imagePickerController(_ picker: UIImagePickerController,
                                      didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
        picker.dismiss(animated: true) {
            guard let call = self.currentCall else { return }

            guard let image = info[.originalImage] as? UIImage else {
                call.reject("Failed to get image")
                self.currentCall = nil
                return
            }

            // Save the picked image into app's temporary directory
            guard let data = image.jpegData(compressionQuality: 0.9) else {
                call.reject("Failed to convert image to JPEG")
                self.currentCall = nil
                return
            }

            let filename = "user_background_\(UUID().uuidString).jpg"
            let tempDir = FileManager.default.temporaryDirectory
            let fileURL = tempDir.appendingPathComponent(filename)

            do {
                try data.write(to: fileURL)
                call.resolve([
                    "fileUrl": fileURL.absoluteString
                ])
            } catch {
                call.reject("Failed to save image: \(error.localizedDescription)")
            }

            self.currentCall = nil
        }
    }
}
