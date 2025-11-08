import Foundation
import Capacitor
import WidgetKit

@objc(WidgetUpdaterPlugin)
public class WidgetUpdaterPlugin: CAPPlugin {
    
    @objc func updateDailyVerse(_ call: CAPPluginCall) {
        guard let verse = call.getString("verse"),
              let reference = call.getString("reference") else {
            call.reject("Missing verse or reference")
            return
        }
        
        let theme = call.getString("theme") ?? "faith"
        
        // Save to App Groups for widget access
        guard let sharedDefaults = UserDefaults(suiteName: "group.com.gospelapp.shared") else {
            call.reject("Unable to access shared storage")
            return
        }
        
        sharedDefaults.set(verse, forKey: "dailyVerse")
        sharedDefaults.set(reference, forKey: "dailyVerseReference")
        sharedDefaults.set(theme, forKey: "dailyVerseTheme")
        sharedDefaults.set(Date(), forKey: "lastUpdated")
        sharedDefaults.synchronize()
        
        // Reload all widgets
        WidgetCenter.shared.reloadAllTimelines()
        
        call.resolve([
            "success": true,
            "message": "Widget updated successfully"
        ])
    }
    
    @objc func scheduleNextUpdate(_ call: CAPPluginCall) {
        // Calculate time until midnight
        let calendar = Calendar.current
        let now = Date()
        
        guard let midnight = calendar.nextDate(
            after: now,
            matching: DateComponents(hour: 0, minute: 0),
            matchingPolicy: .nextTime
        ) else {
            call.reject("Unable to calculate next midnight")
            return
        }
        
        let timeInterval = midnight.timeIntervalSince(now)
        
        // Reload widgets at midnight
        WidgetCenter.shared.reloadAllTimelines()
        
        call.resolve([
            "success": true,
            "nextUpdate": midnight.timeIntervalSince1970,
            "secondsUntilUpdate": timeInterval
        ])
    }
    
    @objc func getWidgetData(_ call: CAPPluginCall) {
        guard let sharedDefaults = UserDefaults(suiteName: "group.com.gospelapp.shared") else {
            call.reject("Unable to access shared storage")
            return
        }
        
        let verse = sharedDefaults.string(forKey: "dailyVerse") ?? ""
        let reference = sharedDefaults.string(forKey: "dailyVerseReference") ?? ""
        let theme = sharedDefaults.string(forKey: "dailyVerseTheme") ?? "faith"
        let lastUpdated = sharedDefaults.object(forKey: "lastUpdated") as? Date
        
        call.resolve([
            "verse": verse,
            "reference": reference,
            "theme": theme,
            "lastUpdated": lastUpdated?.timeIntervalSince1970 ?? 0
        ])
    }
}
