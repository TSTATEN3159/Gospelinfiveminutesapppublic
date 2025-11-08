import Foundation
import Capacitor
import ActivityKit

@objc(LiveActivityManagerPlugin)
public class LiveActivityManagerPlugin: CAPPlugin {
    
    @available(iOS 16.1, *)
    @objc func startCountdown(_ call: CAPPluginCall) {
        guard ActivityAuthorizationInfo().areActivitiesEnabled else {
            call.reject("Live Activities are not enabled")
            return
        }
        
        guard let verse = call.getString("verse"),
              let reference = call.getString("reference") else {
            call.reject("Missing verse or reference")
            return
        }
        
        // Calculate next midnight
        let calendar = Calendar.current
        let now = Date()
        guard let midnight = calendar.nextDate(
            after: now,
            matching: DateComponents(hour: 0, minute: 0),
            matchingPolicy: .nextTime
        ) else {
            call.reject("Unable to calculate midnight")
            return
        }
        
        // Create Live Activity
        let attributes = VerseCountdownAttributes(appName: "The Gospel in 5 Minutes")
        let contentState = VerseCountdownAttributes.ContentState(
            currentVerse: verse,
            currentReference: reference,
            nextUpdateTime: midnight
        )
        
        do {
            let activity = try Activity<VerseCountdownAttributes>.request(
                attributes: attributes,
                contentState: contentState,
                pushType: nil
            )
            
            call.resolve([
                "success": true,
                "activityId": activity.id,
                "nextUpdate": midnight.timeIntervalSince1970
            ])
        } catch {
            call.reject("Failed to start Live Activity: \(error.localizedDescription)")
        }
    }
    
    @available(iOS 16.1, *)
    @objc func updateCountdown(_ call: CAPPluginCall) {
        guard let verse = call.getString("verse"),
              let reference = call.getString("reference") else {
            call.reject("Missing verse or reference")
            return
        }
        
        // Calculate next midnight
        let calendar = Calendar.current
        let now = Date()
        guard let midnight = calendar.nextDate(
            after: now,
            matching: DateComponents(hour: 0, minute: 0),
            matchingPolicy: .nextTime
        ) else {
            call.reject("Unable to calculate midnight")
            return
        }
        
        // Update all active Live Activities
        let contentState = VerseCountdownAttributes.ContentState(
            currentVerse: verse,
            currentReference: reference,
            nextUpdateTime: midnight
        )
        
        Task {
            for activity in Activity<VerseCountdownAttributes>.activities {
                await activity.update(using: contentState)
            }
            
            call.resolve([
                "success": true,
                "updated": Activity<VerseCountdownAttributes>.activities.count
            ])
        }
    }
    
    @available(iOS 16.1, *)
    @objc func stopCountdown(_ call: CAPPluginCall) {
        Task {
            for activity in Activity<VerseCountdownAttributes>.activities {
                await activity.end(dismissalPolicy: .immediate)
            }
            
            call.resolve([
                "success": true,
                "stopped": Activity<VerseCountdownAttributes>.activities.count
            ])
        }
    }
    
    @objc func isLiveActivitySupported(_ call: CAPPluginCall) {
        if #available(iOS 16.1, *) {
            call.resolve([
                "supported": true,
                "enabled": ActivityAuthorizationInfo().areActivitiesEnabled
            ])
        } else {
            call.resolve([
                "supported": false,
                "enabled": false
            ])
        }
    }
}
