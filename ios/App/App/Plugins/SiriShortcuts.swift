import Capacitor
import Intents
import IntentsUI

@objc(SiriShortcutsPlugin)
public class SiriShortcutsPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "SiriShortcutsPlugin"
    public let jsName = "SiriShortcuts"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "donateShortcut", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "presentShortcut", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getVoiceShortcuts", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "deleteShortcut", returnType: CAPPluginReturnPromise)
    ]
    
    // Shortcut types
    enum ShortcutType: String {
        case dailyVerse = "com.gospelapp.dailyverse"
        case randomVerse = "com.gospelapp.randomverse"
        case prayerTime = "com.gospelapp.prayertime"
        case searchVerse = "com.gospelapp.searchverse"
        case bookmarks = "com.gospelapp.bookmarks"
        case trivia = "com.gospelapp.trivia"
    }
    
    // MARK: - Donate Shortcut
    @objc func donateShortcut(_ call: CAPPluginCall) {
        guard let typeString = call.getString("type"),
              let type = ShortcutType(rawValue: "com.gospelapp.\(typeString)") else {
            call.reject("Invalid shortcut type")
            return
        }
        
        let title = call.getString("title") ?? getDefaultTitle(for: type)
        let phrase = call.getString("suggestedPhrase") ?? getDefaultPhrase(for: type)
        
        let activity = createActivity(type: type, title: title, suggestedPhrase: phrase)
        activity.becomeCurrent()
        
        // Donate to Siri
        if #available(iOS 12.0, *) {
            let interaction = INInteraction(intent: createIntent(for: type), response: nil)
            interaction.donate { error in
                if let error = error {
                    print("[SiriShortcuts] Donation error: \(error.localizedDescription)")
                    call.reject("Donation failed: \(error.localizedDescription)")
                } else {
                    print("[SiriShortcuts] Donated shortcut: \(type.rawValue)")
                    call.resolve([
                        "success": true,
                        "type": typeString,
                        "title": title
                    ])
                }
            }
        } else {
            call.resolve([
                "success": true,
                "type": typeString,
                "title": title,
                "note": "Siri donation requires iOS 12+"
            ])
        }
    }
    
    // MARK: - Present Shortcut for Voice Setup
    @objc func presentShortcut(_ call: CAPPluginCall) {
        guard let typeString = call.getString("type"),
              let type = ShortcutType(rawValue: "com.gospelapp.\(typeString)") else {
            call.reject("Invalid shortcut type")
            return
        }
        
        if #available(iOS 12.0, *) {
            DispatchQueue.main.async {
                let activity = self.createActivity(type: type, title: self.getDefaultTitle(for: type), suggestedPhrase: self.getDefaultPhrase(for: type))
                let shortcut = INShortcut(userActivity: activity)
                
                let viewController = INUIAddVoiceShortcutViewController(shortcut: shortcut)
                viewController.delegate = self
                
                if let rootVC = self.bridge?.viewController {
                    rootVC.present(viewController, animated: true) {
                        call.resolve([
                            "success": true,
                            "presented": true
                        ])
                    }
                } else {
                    call.reject("Could not present shortcut view")
                }
            }
        } else {
            call.reject("Siri Shortcuts require iOS 12+")
        }
    }
    
    // MARK: - Get Voice Shortcuts
    @objc func getVoiceShortcuts(_ call: CAPPluginCall) {
        if #available(iOS 12.0, *) {
            INVoiceShortcutCenter.shared.getAllVoiceShortcuts { shortcuts, error in
                if let error = error {
                    call.reject("Failed to get shortcuts: \(error.localizedDescription)")
                    return
                }
                
                let shortcutData = shortcuts?.compactMap { shortcut -> [String: Any]? in
                    guard let activity = shortcut.shortcut.userActivity else { return nil }
                    return [
                        "identifier": shortcut.identifier.uuidString,
                        "phrase": shortcut.invocationPhrase,
                        "title": activity.title ?? "",
                        "type": activity.activityType
                    ]
                } ?? []
                
                call.resolve([
                    "shortcuts": shortcutData
                ])
            }
        } else {
            call.resolve(["shortcuts": []])
        }
    }
    
    // MARK: - Delete Shortcut
    @objc func deleteShortcut(_ call: CAPPluginCall) {
        guard let identifier = call.getString("identifier") else {
            call.reject("Missing shortcut identifier")
            return
        }
        
        if #available(iOS 12.0, *) {
            guard let uuid = UUID(uuidString: identifier) else {
                call.reject("Invalid identifier format")
                return
            }
            
            INVoiceShortcutCenter.shared.getAllVoiceShortcuts { shortcuts, error in
                guard let shortcuts = shortcuts,
                      let shortcut = shortcuts.first(where: { $0.identifier == uuid }) else {
                    call.reject("Shortcut not found")
                    return
                }
                
                INVoiceShortcutCenter.shared.deleteVoiceShortcut(withIdentifier: shortcut.identifier) { error in
                    if let error = error {
                        call.reject("Delete failed: \(error.localizedDescription)")
                    } else {
                        call.resolve(["success": true])
                    }
                }
            }
        } else {
            call.reject("Siri Shortcuts require iOS 12+")
        }
    }
    
    // MARK: - Helpers
    private func createActivity(type: ShortcutType, title: String, suggestedPhrase: String) -> NSUserActivity {
        let activity = NSUserActivity(activityType: type.rawValue)
        activity.title = title
        activity.isEligibleForSearch = true
        activity.isEligibleForPrediction = true
        activity.persistentIdentifier = type.rawValue
        activity.suggestedInvocationPhrase = suggestedPhrase
        
        // Add keywords for better Siri matching
        activity.keywords = getKeywords(for: type)
        
        return activity
    }
    
    private func createIntent(for type: ShortcutType) -> INIntent {
        // Create a generic intent for donation
        if #available(iOS 12.0, *) {
            let intent = INSearchForNotebookItemsIntent()
            intent.title = INSpeakableString(spokenPhrase: getDefaultTitle(for: type))
            return intent
        }
        return INIntent()
    }
    
    private func getDefaultTitle(for type: ShortcutType) -> String {
        switch type {
        case .dailyVerse: return "Today's Bible Verse"
        case .randomVerse: return "Random Bible Verse"
        case .prayerTime: return "Start Prayer Time"
        case .searchVerse: return "Search the Bible"
        case .bookmarks: return "My Saved Verses"
        case .trivia: return "Bible Trivia"
        }
    }
    
    private func getDefaultPhrase(for type: ShortcutType) -> String {
        switch type {
        case .dailyVerse: return "What's today's verse"
        case .randomVerse: return "Give me a Bible verse"
        case .prayerTime: return "Start prayer time"
        case .searchVerse: return "Search the Bible"
        case .bookmarks: return "Show my saved verses"
        case .trivia: return "Start Bible trivia"
        }
    }
    
    private func getKeywords(for type: ShortcutType) -> Set<String> {
        var keywords: Set<String> = ["bible", "gospel", "verse", "scripture"]
        
        switch type {
        case .dailyVerse:
            keywords.formUnion(["daily", "today", "morning", "devotional"])
        case .randomVerse:
            keywords.formUnion(["random", "inspire", "word"])
        case .prayerTime:
            keywords.formUnion(["prayer", "pray", "quiet time", "devotion"])
        case .searchVerse:
            keywords.formUnion(["search", "find", "look up"])
        case .bookmarks:
            keywords.formUnion(["saved", "bookmarks", "favorites"])
        case .trivia:
            keywords.formUnion(["trivia", "quiz", "game", "test"])
        }
        
        return keywords
    }
}

// MARK: - Voice Shortcut Delegate
@available(iOS 12.0, *)
extension SiriShortcutsPlugin: INUIAddVoiceShortcutViewControllerDelegate {
    public func addVoiceShortcutViewController(_ controller: INUIAddVoiceShortcutViewController, didFinishWith voiceShortcut: INVoiceShortcut?, error: Error?) {
        controller.dismiss(animated: true)
        
        if let error = error {
            print("[SiriShortcuts] Add voice shortcut error: \(error.localizedDescription)")
        } else if let voiceShortcut = voiceShortcut {
            print("[SiriShortcuts] Voice shortcut added: \(voiceShortcut.invocationPhrase)")
            notifyListeners("shortcutAdded", data: [
                "phrase": voiceShortcut.invocationPhrase,
                "identifier": voiceShortcut.identifier.uuidString
            ])
        }
    }
    
    public func addVoiceShortcutViewControllerDidCancel(_ controller: INUIAddVoiceShortcutViewController) {
        controller.dismiss(animated: true)
        notifyListeners("shortcutCancelled", data: [:])
    }
}
