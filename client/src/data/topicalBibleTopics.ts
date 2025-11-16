import { BibleVersionCode } from "@/config/bibleVersions";

export type { BibleVersionCode };

export interface TopicDefinition {
  id: string;
  name: string;
  description: string;
  references: string[];
}

export const TOPICAL_BIBLE_TOPICS: TopicDefinition[] = [
  {
    id: "kingdom-of-god",
    name: "Kingdom of God",
    description: "What life looks like under King Jesus.",
    references: ["Matthew 6:33", "Romans 14:17", "Luke 17:20-21"]
  },
  {
    id: "salvation",
    name: "Salvation",
    description: "How God saves sinners by grace through faith.",
    references: ["John 3:16", "Ephesians 2:8-9", "Romans 10:9-10"]
  },
  {
    id: "faith",
    name: "Faith",
    description: "Trusting God's character and promises.",
    references: ["Hebrews 11:1", "2 Corinthians 5:7", "Romans 1:17"]
  },
  {
    id: "love",
    name: "Love",
    description: "God's love and the love we show others.",
    references: ["1 Corinthians 13:4-7", "John 13:34-35", "1 John 4:7-8"]
  },
  {
    id: "holy-spirit",
    name: "Holy Spirit",
    description: "The Spirit's presence, power, and fruit.",
    references: ["John 14:16-17", "Galatians 5:22-23", "Acts 1:8"]
  },
  {
    id: "forgiveness",
    name: "Forgiveness",
    description: "Receiving and extending God's forgiveness.",
    references: ["Ephesians 4:32", "1 John 1:9", "Matthew 6:14-15"]
  },
  {
    id: "healing",
    name: "Healing",
    description: "God's care for our bodies and souls.",
    references: ["James 5:14-15", "Psalm 103:2-3", "Isaiah 53:4-5"]
  },
  {
    id: "wisdom",
    name: "Wisdom",
    description: "Seeing life from God's perspective.",
    references: ["James 1:5", "Proverbs 3:5-6", "Colossians 1:9-10"]
  },
  {
    id: "peace",
    name: "Peace",
    description: "God's peace in a restless world.",
    references: ["Philippians 4:6-7", "John 14:27", "Isaiah 26:3"]
  },
  {
    id: "joy",
    name: "Joy",
    description: "Deep gladness rooted in Christ.",
    references: ["Nehemiah 8:10", "John 15:11", "1 Peter 1:8"]
  },
  {
    id: "prayer",
    name: "Prayer",
    description: "Talking with the Father in Jesus' name.",
    references: ["Philippians 4:6", "Matthew 6:9-13", "1 Thessalonians 5:17"]
  },
  {
    id: "strength",
    name: "Strength",
    description: "God's power in our weakness.",
    references: ["Isaiah 40:29-31", "2 Corinthians 12:9-10", "Philippians 4:13"]
  },
  {
    id: "provision",
    name: "God's Provision",
    description: "Trusting God to provide what we need.",
    references: ["Matthew 6:31-34", "Philippians 4:19", "Psalm 23:1"]
  },
  {
    id: "hope",
    name: "Hope",
    description: "Confident expectation rooted in God's promises.",
    references: ["Romans 15:13", "Hebrews 6:19", "1 Peter 1:3"]
  },
  {
    id: "obedience",
    name: "Obedience",
    description: "Loving God by doing what He says.",
    references: ["John 14:15", "James 1:22", "Deuteronomy 10:12-13"]
  },
  {
    id: "repentance",
    name: "Repentance",
    description: "Turning from sin to God.",
    references: ["Acts 3:19", "2 Corinthians 7:10", "1 John 1:9"]
  },
  {
    id: "fear-and-courage",
    name: "Fear & Courage",
    description: "God's presence drives out fear.",
    references: ["Joshua 1:9", "2 Timothy 1:7", "Psalm 27:1"]
  },
  {
    id: "humility",
    name: "Humility",
    description: "Walking low so Christ is lifted high.",
    references: ["Philippians 2:3-5", "James 4:6", "1 Peter 5:5-6"]
  },
  {
    id: "holiness",
    name: "Holiness & Purity",
    description: "Being set apart for God.",
    references: ["1 Peter 1:15-16", "1 Thessalonians 4:3-4", "Hebrews 12:14"]
  },
  {
    id: "spiritual-warfare",
    name: "Spiritual Warfare",
    description: "Standing firm in Christ's victory.",
    references: ["Ephesians 6:10-12", "2 Corinthians 10:3-5", "1 Peter 5:8-9"]
  },
  {
    id: "faithfulness",
    name: "Faithfulness",
    description: "God's faithfulness and ours.",
    references: ["Lamentations 3:22-23", "Galatians 6:9", "Matthew 25:21"]
  },
  {
    id: "trust",
    name: "Trusting God",
    description: "Leaning fully on the Lord.",
    references: ["Proverbs 3:5-6", "Psalm 37:3-5", "Isaiah 12:2"]
  },
  {
    id: "gods-will",
    name: "God's Will",
    description: "Discerning and doing His will.",
    references: ["Romans 12:1-2", "1 Thessalonians 4:3", "Proverbs 16:9"]
  },
  {
    id: "grace",
    name: "Grace",
    description: "God's undeserved kindness and power.",
    references: ["Ephesians 2:8-9", "Titus 2:11-12", "2 Corinthians 12:9"]
  },
  {
    id: "mercy",
    name: "Mercy",
    description: "God not giving us what we deserve.",
    references: ["Psalm 103:8-12", "Micah 7:18-19", "Luke 6:36"]
  },
  {
    id: "evangelism",
    name: "Evangelism",
    description: "Sharing the good news of Jesus.",
    references: ["Matthew 28:18-20", "Romans 1:16", "Acts 1:8"]
  },
  {
    id: "perseverance",
    name: "Perseverance",
    description: "Enduring in faith through trials.",
    references: ["James 1:2-4", "Hebrews 12:1-3", "Romans 5:3-5"]
  },
  {
    id: "thankfulness",
    name: "Thankfulness",
    description: "A grateful heart in all seasons.",
    references: ["1 Thessalonians 5:18", "Colossians 3:15-17", "Psalm 100:4"]
  },
  {
    id: "church",
    name: "The Church",
    description: "Christ's body, called to unity and love.",
    references: ["Ephesians 4:11-16", "Acts 2:42-47", "Hebrews 10:24-25"]
  },
  {
    id: "word-of-god",
    name: "Word of God",
    description: "Scripture as God's living voice.",
    references: ["2 Timothy 3:16-17", "Hebrews 4:12", "Psalm 119:105"]
  },
  {
    id: "end-times",
    name: "End Times",
    description: "Christ's return and final victory.",
    references: ["Matthew 24:30-31", "1 Thessalonians 4:16-17", "Revelation 21:1-4"]
  },
  {
    id: "heaven",
    name: "Heaven",
    description: "The believer's eternal home with God.",
    references: ["Revelation 21:3-4", "John 14:2-3", "Philippians 3:20-21"]
  },
  {
    id: "hell",
    name: "Hell & Judgment",
    description: "God's righteous judgment on sin.",
    references: ["Matthew 25:31-46", "Revelation 20:11-15", "Hebrews 9:27"]
  },
  {
    id: "temptation",
    name: "Temptation",
    description: "Resisting sin by God's help.",
    references: ["1 Corinthians 10:13", "James 1:13-15", "Hebrews 4:15-16"]
  },
  {
    id: "parenting",
    name: "Parenting",
    description: "Raising children in the Lord.",
    references: ["Ephesians 6:4", "Proverbs 22:6", "Deuteronomy 6:6-7"]
  },
  {
    id: "serving",
    name: "Serving",
    description: "Using our gifts to serve others.",
    references: ["Mark 10:43-45", "1 Peter 4:10", "Galatians 5:13"]
  },
  {
    id: "generosity",
    name: "Generosity",
    description: "Giving freely because God gave first.",
    references: ["2 Corinthians 9:6-8", "Acts 20:35", "Proverbs 11:24-25"]
  },
  {
    id: "work",
    name: "Work",
    description: "Honouring Christ in everyday work.",
    references: ["Colossians 3:23-24", "1 Corinthians 10:31", "Proverbs 16:3"]
  },
  {
    id: "marriage",
    name: "Marriage",
    description: "A picture of Christ and the Church.",
    references: ["Ephesians 5:25-33", "Genesis 2:24", "1 Peter 3:7"]
  },
  {
    id: "suffering",
    name: "Trials & Suffering",
    description: "God's purposes in our pain.",
    references: ["Romans 8:18", "1 Peter 4:12-13", "2 Corinthians 4:16-18"]
  }
];
