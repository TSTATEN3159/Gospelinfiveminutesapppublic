import ActivityKit
import WidgetKit
import SwiftUI

// MARK: - Live Activity Attributes
struct VerseCountdownAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        var currentVerse: String
        var currentReference: String
        var nextUpdateTime: Date
    }
    
    var appName: String
}

// MARK: - Live Activity Widget
@available(iOS 16.1, *)
struct VerseCountdownLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: VerseCountdownAttributes.self) { context in
            // Lock screen/banner UI
            LockScreenLiveActivityView(context: context)
        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded Region
                DynamicIslandExpandedRegion(.leading) {
                    VStack(alignment: .leading, spacing: 4) {
                        Image(systemName: "book.fill")
                            .font(.title3)
                            .foregroundColor(.blue)
                        
                        Text("Next Verse")
                            .font(.caption2)
                            .foregroundColor(.secondary)
                    }
                }
                
                DynamicIslandExpandedRegion(.trailing) {
                    VStack(alignment: .trailing, spacing: 4) {
                        Text(timeUntilMidnight(from: context.state.nextUpdateTime))
                            .font(.title2)
                            .fontWeight(.semibold)
                            .foregroundColor(.primary)
                        
                        Text("until refresh")
                            .font(.caption2)
                            .foregroundColor(.secondary)
                    }
                }
                
                DynamicIslandExpandedRegion(.bottom) {
                    VStack(spacing: 8) {
                        Text(context.state.currentReference)
                            .font(.caption)
                            .fontWeight(.semibold)
                            .foregroundColor(.secondary)
                        
                        Text(context.state.currentVerse)
                            .font(.footnote)
                            .foregroundColor(.primary)
                            .multilineTextAlignment(.center)
                            .lineLimit(3)
                    }
                    .padding(.horizontal)
                }
            } compactLeading: {
                // Compact leading (left side of Dynamic Island)
                Image(systemName: "book.fill")
                    .foregroundColor(.blue)
            } compactTrailing: {
                // Compact trailing (right side of Dynamic Island)
                Text(timeUntilMidnightShort(from: context.state.nextUpdateTime))
                    .font(.caption2)
                    .fontWeight(.semibold)
                    .foregroundColor(.primary)
            } minimal: {
                // Minimal presentation (when multiple activities)
                Image(systemName: "book.fill")
                    .foregroundColor(.blue)
            }
        }
    }
}

// MARK: - Lock Screen View
@available(iOS 16.1, *)
struct LockScreenLiveActivityView: View {
    let context: ActivityViewContext<VerseCountdownAttributes>
    
    var body: some View {
        VStack(spacing: 12) {
            HStack {
                // App icon placeholder
                ZStack {
                    Circle()
                        .fill(LinearGradient(
                            colors: [Color.blue, Color.purple],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        ))
                        .frame(width: 32, height: 32)
                    
                    Image(systemName: "book.fill")
                        .font(.system(size: 16))
                        .foregroundColor(.white)
                }
                
                VStack(alignment: .leading, spacing: 2) {
                    Text("The Gospel in 5 Minutes")
                        .font(.caption)
                        .fontWeight(.semibold)
                    
                    Text("New verse at midnight")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }
                
                Spacer()
                
                // Countdown
                VStack(alignment: .trailing, spacing: 2) {
                    Text(timeUntilMidnight(from: context.state.nextUpdateTime))
                        .font(.title3)
                        .fontWeight(.bold)
                        .foregroundColor(.blue)
                    
                    Text("remaining")
                        .font(.caption2)
                        .foregroundColor(.secondary)
                }
            }
            
            Divider()
            
            // Current verse
            VStack(spacing: 6) {
                Text(context.state.currentReference)
                    .font(.caption)
                    .fontWeight(.semibold)
                    .foregroundColor(.secondary)
                
                Text(context.state.currentVerse)
                    .font(.subheadline)
                    .multilineTextAlignment(.center)
                    .lineLimit(4)
            }
        }
        .padding()
    }
}

// MARK: - Helper Functions
private func timeUntilMidnight(from date: Date) -> String {
    let now = Date()
    let timeInterval = date.timeIntervalSince(now)
    
    guard timeInterval > 0 else {
        return "Soon"
    }
    
    let hours = Int(timeInterval) / 3600
    let minutes = (Int(timeInterval) % 3600) / 60
    
    if hours > 0 {
        return "\(hours)h \(minutes)m"
    } else {
        return "\(minutes)m"
    }
}

private func timeUntilMidnightShort(from date: Date) -> String {
    let now = Date()
    let timeInterval = date.timeIntervalSince(now)
    
    guard timeInterval > 0 else {
        return "🔄"
    }
    
    let hours = Int(timeInterval) / 3600
    let minutes = (Int(timeInterval) % 3600) / 60
    
    if hours > 0 {
        return "\(hours)h"
    } else {
        return "\(minutes)m"
    }
}

// MARK: - Preview
@available(iOS 16.1, *)
struct VerseCountdownLiveActivity_Previews: PreviewProvider {
    static let attributes = VerseCountdownAttributes(appName: "The Gospel in 5 Minutes")
    static let contentState = VerseCountdownAttributes.ContentState(
        currentVerse: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
        currentReference: "John 3:16",
        nextUpdateTime: Calendar.current.date(byAdding: .hour, value: 3, to: Date())!
    )

    static var previews: some View {
        if #available(iOS 16.1, *) {
            attributes
                .previewContext(contentState, viewKind: .dynamicIsland(.compact))
                .previewDisplayName("Compact")
            
            attributes
                .previewContext(contentState, viewKind: .dynamicIsland(.expanded))
                .previewDisplayName("Expanded")
            
            attributes
                .previewContext(contentState, viewKind: .content)
                .previewDisplayName("Lock Screen")
        }
    }
}
