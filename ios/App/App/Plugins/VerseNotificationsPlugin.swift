import Capacitor
import UserNotifications

@objc(VerseNotificationsPlugin)
public class VerseNotificationsPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "VerseNotificationsPlugin"
    public let jsName = "VerseNotifications"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "scheduleDaily", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "cancelAll", returnType: CAPPluginReturnPromise)
    ]

    @objc func scheduleDaily(_ call: CAPPluginCall) {
        let verseText = call.getString("verseText") ?? "Daily Scripture"
        let reference = call.getString("reference") ?? ""
        let hour = call.getInt("hour") ?? 7
        let minute = call.getInt("minute") ?? 0

        let center = UNUserNotificationCenter.current()

        // Ask for permission
        center.requestAuthorization(options: [.alert, .sound, .badge]) { granted, error in
            if let error = error {
                call.reject("Notification permission error: \(error.localizedDescription)")
                return
            }

            if !granted {
                call.reject("Notification permission not granted")
                return
            }

            // Remove existing scheduled notifications for cleanliness
            center.removeAllPendingNotificationRequests()

            let content = UNMutableNotificationContent()
            content.title = "Daily Scripture"
            content.body = "\(verseText)\n\(reference)"
            content.sound = .default

            var dateComponents = DateComponents()
            dateComponents.hour = hour
            dateComponents.minute = minute

            let trigger = UNCalendarNotificationTrigger(dateMatching: dateComponents, repeats: true)
            let request = UNNotificationRequest(identifier: "daily_scripture_notification", content: content, trigger: trigger)

            center.add(request) { addError in
                if let addError = addError {
                    call.reject("Failed to schedule notification: \(addError.localizedDescription)")
                } else {
                    call.resolve()
                }
            }
        }
    }

    @objc func cancelAll(_ call: CAPPluginCall) {
        let center = UNUserNotificationCenter.current()
        center.removeAllPendingNotificationRequests()
        call.resolve()
    }
}
