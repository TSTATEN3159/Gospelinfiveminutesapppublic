import WidgetKit
import SwiftUI

// MARK: - Widget Entry
struct VerseEntry: TimelineEntry {
    let date: Date
    let verse: String
    let reference: String
    let theme: String
}

// MARK: - Timeline Provider
struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> VerseEntry {
        VerseEntry(
            date: Date(),
            verse: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
            reference: "John 3:16",
            theme: "faith"
        )
    }

    func getSnapshot(in context: Context, completion: @escaping (VerseEntry) -> ()) {
        let entry = loadVerseEntry() ?? placeholder(in: context)
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        var entries: [VerseEntry] = []
        
        // Load current verse from shared data
        let currentEntry = loadVerseEntry() ?? placeholder(in: context)
        let currentDate = Date()
        
        // Create entry for now
        entries.append(currentEntry)
        
        // Schedule next update at midnight
        let calendar = Calendar.current
        if let midnight = calendar.nextDate(
            after: currentDate,
            matching: DateComponents(hour: 0, minute: 0),
            matchingPolicy: .nextTime
        ) {
            // Create timeline that updates at midnight
            let timeline = Timeline(entries: entries, policy: .after(midnight))
            completion(timeline)
        } else {
            // Fallback: update in 1 hour
            let nextUpdate = calendar.date(byAdding: .hour, value: 1, to: currentDate)!
            let timeline = Timeline(entries: entries, policy: .after(nextUpdate))
            completion(timeline)
        }
    }
    
    // MARK: - Load Verse from App Groups
    private func loadVerseEntry() -> VerseEntry? {
        guard let sharedDefaults = UserDefaults(suiteName: "group.com.gospelapp.shared") else {
            return nil
        }
        
        guard let verse = sharedDefaults.string(forKey: "dailyVerse"),
              let reference = sharedDefaults.string(forKey: "dailyVerseReference") else {
            return nil
        }
        
        let theme = sharedDefaults.string(forKey: "dailyVerseTheme") ?? "faith"
        
        return VerseEntry(
            date: Date(),
            verse: verse,
            reference: reference,
            theme: theme
        )
    }
}

// MARK: - Widget Views
struct GospelWidgetEntryView : View {
    var entry: Provider.Entry
    @Environment(\.widgetFamily) var family

    var body: some View {
        switch family {
        case .systemSmall:
            SmallWidgetView(entry: entry)
        case .systemMedium:
            MediumWidgetView(entry: entry)
        case .systemLarge:
            LargeWidgetView(entry: entry)
        default:
            MediumWidgetView(entry: entry)
        }
    }
}

// MARK: - Small Widget (Quote Format)
struct SmallWidgetView: View {
    var entry: VerseEntry
    
    var body: some View {
        ZStack {
            // Background gradient
            LinearGradient(
                colors: themeColors(for: entry.theme),
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            
            VStack(alignment: .leading, spacing: 8) {
                // Icon
                Image(systemName: "book.fill")
                    .font(.system(size: 20))
                    .foregroundColor(.white.opacity(0.9))
                
                Spacer()
                
                // Verse snippet (first 80 characters)
                Text(verseSnippet(entry.verse))
                    .font(.system(size: 13, weight: .medium))
                    .foregroundColor(.white)
                    .lineLimit(4)
                
                Spacer()
                
                // Reference
                Text(entry.reference)
                    .font(.system(size: 11, weight: .semibold))
                    .foregroundColor(.white.opacity(0.85))
            }
            .padding(16)
        }
    }
    
    private func verseSnippet(_ verse: String) -> String {
        let maxLength = 80
        if verse.count > maxLength {
            return String(verse.prefix(maxLength)) + "..."
        }
        return verse
    }
}

// MARK: - Medium Widget (Card Format)
struct MediumWidgetView: View {
    var entry: VerseEntry
    
    var body: some View {
        ZStack {
            // Background gradient
            LinearGradient(
                colors: themeColors(for: entry.theme),
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            
            HStack(spacing: 16) {
                // Icon column
                VStack {
                    ZStack {
                        Circle()
                            .fill(Color.white.opacity(0.2))
                            .frame(width: 50, height: 50)
                        
                        Image(systemName: "book.fill")
                            .font(.system(size: 24))
                            .foregroundColor(.white)
                    }
                    
                    Spacer()
                }
                
                // Verse content
                VStack(alignment: .leading, spacing: 8) {
                    Text("Daily Verse")
                        .font(.system(size: 11, weight: .semibold))
                        .foregroundColor(.white.opacity(0.85))
                        .textCase(.uppercase)
                        .tracking(0.5)
                    
                    Text(verseSnippet(entry.verse, maxLength: 140))
                        .font(.system(size: 14, weight: .medium))
                        .foregroundColor(.white)
                        .lineLimit(4)
                    
                    Spacer()
                    
                    Text(entry.reference)
                        .font(.system(size: 12, weight: .bold))
                        .foregroundColor(.white.opacity(0.95))
                }
                
                Spacer()
            }
            .padding(16)
        }
    }
    
    private func verseSnippet(_ verse: String, maxLength: Int) -> String {
        if verse.count > maxLength {
            return String(verse.prefix(maxLength)) + "..."
        }
        return verse
    }
}

// MARK: - Large Widget (Full Verse)
struct LargeWidgetView: View {
    var entry: VerseEntry
    
    var body: some View {
        ZStack {
            // Background gradient
            LinearGradient(
                colors: themeColors(for: entry.theme),
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            
            VStack(alignment: .leading, spacing: 16) {
                // Header
                HStack {
                    ZStack {
                        Circle()
                            .fill(Color.white.opacity(0.2))
                            .frame(width: 44, height: 44)
                        
                        Image(systemName: "book.fill")
                            .font(.system(size: 22))
                            .foregroundColor(.white)
                    }
                    
                    VStack(alignment: .leading, spacing: 2) {
                        Text("Word of the Day")
                            .font(.system(size: 13, weight: .semibold))
                            .foregroundColor(.white.opacity(0.9))
                        
                        Text(formattedDate())
                            .font(.system(size: 11))
                            .foregroundColor(.white.opacity(0.7))
                    }
                    
                    Spacer()
                }
                
                Spacer()
                
                // Full verse
                VStack(alignment: .leading, spacing: 12) {
                    Text(entry.verse)
                        .font(.system(size: 16, weight: .medium, design: .serif))
                        .foregroundColor(.white)
                        .lineLimit(8)
                        .italic()
                    
                    Text("— " + entry.reference)
                        .font(.system(size: 14, weight: .bold))
                        .foregroundColor(.white.opacity(0.95))
                }
                
                Spacer()
                
                // Footer
                HStack {
                    Spacer()
                    Text("The Gospel in 5 Minutes")
                        .font(.system(size: 10, weight: .medium))
                        .foregroundColor(.white.opacity(0.7))
                }
            }
            .padding(20)
        }
    }
    
    private func formattedDate() -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "EEEE, MMM d"
        return formatter.string(from: entry.date)
    }
}

// MARK: - Theme Colors
private func themeColors(for theme: String) -> [Color] {
    switch theme {
    case "faith":
        return [Color(red: 0.4, green: 0.6, blue: 0.9), Color(red: 0.2, green: 0.4, blue: 0.7)]
    case "love":
        return [Color(red: 0.9, green: 0.4, blue: 0.5), Color(red: 0.7, green: 0.2, blue: 0.3)]
    case "hope":
        return [Color(red: 0.5, green: 0.8, blue: 0.5), Color(red: 0.3, green: 0.6, blue: 0.3)]
    case "peace":
        return [Color(red: 0.4, green: 0.7, blue: 0.8), Color(red: 0.2, green: 0.5, blue: 0.6)]
    case "wisdom":
        return [Color(red: 0.7, green: 0.5, blue: 0.9), Color(red: 0.5, green: 0.3, blue: 0.7)]
    default:
        return [Color(red: 0.6, green: 0.5, blue: 0.9), Color(red: 0.4, green: 0.3, blue: 0.7)]
    }
}

// MARK: - Widget Configuration
@main
struct GospelWidget: Widget {
    let kind: String = "GospelWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            GospelWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Daily Verse")
        .description("Start your day with God's Word on your home screen")
        .supportedFamilies([.systemSmall, .systemMedium, .systemLarge])
    }
}

// MARK: - Preview
struct GospelWidget_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            GospelWidgetEntryView(entry: VerseEntry(
                date: Date(),
                verse: "Trust in the LORD with all thine heart; and lean not unto thine own understanding.",
                reference: "Proverbs 3:5",
                theme: "faith"
            ))
            .previewContext(WidgetPreviewContext(family: .systemSmall))
            
            GospelWidgetEntryView(entry: VerseEntry(
                date: Date(),
                verse: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
                reference: "John 3:16",
                theme: "love"
            ))
            .previewContext(WidgetPreviewContext(family: .systemMedium))
            
            GospelWidgetEntryView(entry: VerseEntry(
                date: Date(),
                verse: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.",
                reference: "Philippians 4:6",
                theme: "peace"
            ))
            .previewContext(WidgetPreviewContext(family: .systemLarge))
        }
    }
}
