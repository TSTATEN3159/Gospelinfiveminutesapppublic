import Capacitor
import AVFoundation

@objc(VerseSpeechPlugin)
public class VerseSpeechPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "VerseSpeechPlugin"
    public let jsName = "VerseSpeech"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "speak", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "stop", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "isSpeaking", returnType: CAPPluginReturnPromise)
    ]

    private let synthesizer = AVSpeechSynthesizer()

    @objc func speak(_ call: CAPPluginCall) {
        let verseText = call.getString("verseText") ?? ""
        let reference = call.getString("reference") ?? ""
        let languageCode = call.getString("languageCode") ?? "en-US"

        if verseText.isEmpty && reference.isEmpty {
            call.reject("No text to speak")
            return
        }

        if synthesizer.isSpeaking {
            synthesizer.stopSpeaking(at: .immediate)
        }

        let combinedText = verseText.isEmpty ? reference : "\(verseText) \(reference)"

        let utterance = AVSpeechUtterance(string: combinedText)
        utterance.rate = AVSpeechUtteranceDefaultSpeechRate
        utterance.pitchMultiplier = 1.0
        utterance.volume = 1.0

        // Try to pick a voice for the requested language, fall back to default
        if let voice = AVSpeechSynthesisVoice(language: languageCode) {
            utterance.voice = voice
        }

        synthesizer.speak(utterance)
        call.resolve()
    }

    @objc func stop(_ call: CAPPluginCall) {
        if synthesizer.isSpeaking {
            synthesizer.stopSpeaking(at: .immediate)
        }
        call.resolve()
    }

    @objc func isSpeaking(_ call: CAPPluginCall) {
        call.resolve([
            "isSpeaking": synthesizer.isSpeaking
        ])
    }
}
