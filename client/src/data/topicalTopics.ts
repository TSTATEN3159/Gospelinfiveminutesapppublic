// client/src/data/topicalTopics.ts

export interface TopicalTopic {
  id: string;       // stable key used by the API, e.g. "kingdom-of-god"
  label: string;    // what the user sees
  description: string;
}

export const TOPICAL_TOPICS: TopicalTopic[] = [
  { id: "kingdom-of-god",        label: "Kingdom of God",        description: "God's reign, rule, and kingdom life." },
  { id: "salvation",             label: "Salvation",             description: "Being saved by grace through faith in Christ." },
  { id: "faith",                 label: "Faith",                 description: "Trusting God and His promises." },
  { id: "love",                  label: "Love",                  description: "God's love and our call to love others." },
  { id: "prayer",                label: "Prayer",                description: "Talking with God in every season." },
  { id: "holy-spirit",           label: "Holy Spirit",           description: "The Spirit's presence, power, and guidance." },
  { id: "healing",               label: "Healing",               description: "God's healing for body, soul, and spirit." },
  { id: "forgiveness",           label: "Forgiveness",           description: "Receiving and extending forgiveness." },
  { id: "wisdom",                label: "Wisdom",                description: "God's wisdom for everyday decisions." },
  { id: "hope",                  label: "Hope",                  description: "Hope in God's promises and future." },
  { id: "grace",                 label: "Grace",                 description: "Unmerited favor and strength from God." },
  { id: "mercy",                 label: "Mercy",                 description: "God's compassion toward us and others." },
  { id: "obedience",             label: "Obedience",             description: "Walking in God's commands." },
  { id: "sanctification",        label: "Sanctification",        description: "Growing in holiness over time." },
  { id: "holiness",              label: "Holiness",              description: "Being set apart for God." },
  { id: "humility",              label: "Humility",              description: "Living low before God and people." },
  { id: "spiritual-warfare",     label: "Spiritual Warfare",     description: "Standing firm against the enemy." },
  { id: "fruit-of-the-spirit",   label: "Fruit of the Spirit",   description: "Love, joy, peace and more in us." },
  { id: "fear-and-anxiety",      label: "Fear & Anxiety",        description: "Overcoming worry through faith." },
  { id: "peace",                 label: "Peace",                 description: "God's peace in every circumstance." },
  { id: "provision-and-finance", label: "Provision & Finances",  description: "Trusting God as provider." },
  { id: "suffering",             label: "Suffering",             description: "God's presence in trials." },
  { id: "perseverance",          label: "Perseverance",          description: "Enduring by God's strength." },
  { id: "evangelism",            label: "Evangelism",            description: "Sharing the good news of Jesus." },
  { id: "discipleship",          label: "Discipleship",          description: "Following Jesus and helping others follow Him." },
  { id: "family-and-marriage",   label: "Family & Marriage",     description: "God's design for home and marriage." },
  { id: "parenting",             label: "Parenting",             description: "Raising children in the Lord." },
  { id: "work-and-calling",      label: "Work & Calling",        description: "Serving God in our work." },
  { id: "rest-and-sabbath",      label: "Rest & Sabbath",        description: "God's rhythm of rest." },
  { id: "guidance-and-will",     label: "Guidance & God's Will", description: "Knowing and doing God's will." },
  { id: "repentance",            label: "Repentance",            description: "Turning from sin to God." },
  { id: "confession",            label: "Confession",            description: "Agreeing with God about our sin." },
  { id: "identity-in-christ",    label: "Identity in Christ",    description: "Who we are because of Jesus." },
  { id: "spiritual-gifts",       label: "Spiritual Gifts",       description: "Gifts of the Spirit for service." },
  { id: "church-and-unity",      label: "Church & Unity",        description: "God's family living as one." },
  { id: "end-times-and-hope",    label: "End Times & Hope",      description: "Christ's return and our future hope." },
  { id: "gratitude",             label: "Gratitude",             description: "Thankfulness in all things." },
  { id: "justice-and-mercy",     label: "Justice & Mercy",       description: "God's heart for justice and compassion." },
  { id: "compassion",            label: "Compassion",            description: "Caring for the hurting." },
  { id: "joy",                   label: "Joy",                   description: "Deep joy in Christ." },
  { id: "patience",              label: "Patience",              description: "Waiting well with God." },
  { id: "courage",               label: "Courage",               description: "Strength and boldness in God." },
];
