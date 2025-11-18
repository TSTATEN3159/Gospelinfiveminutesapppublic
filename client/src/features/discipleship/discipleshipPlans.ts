export type PlanItemType = "devotional" | "scripture";

export interface PlanItem {
  id: string;
  type: PlanItemType;
  title: string;
  reference?: string;
  body: string;
}

export interface PlanDay {
  id: string;
  dayNumber: number;
  title: string;
  items: PlanItem[];
}

export interface DiscipleshipPlan {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  totalDays: number;
  days: PlanDay[];
}

export const heavenOrHellPlan: DiscipleshipPlan = {
  id: "heaven-or-hell",
  title: "Am I Going to Heaven or Hell?",
  subtitle: "Finding real assurance in Christ",
  imageUrl: "/assets/discipleship/heaven-or-hell.jpg",
  totalDays: 5,
  days: [
    {
      id: "day-1",
      dayNumber: 1,
      title: "Why This Question Matters",
      items: [
        {
          id: "d1-devotional",
          type: "devotional",
          title: "Why This Question Matters",
          body:
            "Everyone dies. No one avoids judgment. We ignore it until a funeral or a health scare forces us to face eternity. " +
            "Most people assume they are going to heaven: 'I'm a good person... I go to church... God knows my heart.' " +
            "But Jesus Himself said that not everyone who calls Him 'Lord' will enter the kingdom of heaven. Heaven is not a reward " +
            "for the good; it is a gift for the forgiven. Today God invites you to move from guessing to knowing, " +
            "so you can live with confidence instead of fear.",
        },
        {
          id: "d1-heb-9-27",
          type: "scripture",
          title: "Hebrews 9:27",
          reference: "Hebrews 9:27",
          body:
            "This verse reminds us that death and judgment are appointments every person will keep. There are no second lives or " +
            "restarts—what we do with Jesus in this life matters forever.",
        },
        {
          id: "d1-mt-7-21",
          type: "scripture",
          title: "Matthew 7:21",
          reference: "Matthew 7:21",
          body:
            "Jesus warns that calling Him 'Lord' with our lips is not enough. True faith shows up in a surrendered life that does " +
            "the will of the Father.",
        },
        {
          id: "d1-jn-3-16",
          type: "scripture",
          title: "John 3:16",
          reference: "John 3:16",
          body:
            "God's love moved Him to give His Son so that anyone who believes in Him will not perish but have eternal life. " +
            "Eternal life is not earned but received through faith in Christ.",
        },
      ],
    },
    {
      id: "day-2",
      dayNumber: 2,
      title: "What Jesus Did To Save You",
      items: [
        {
          id: "d2-devotional",
          type: "devotional",
          title: "What Jesus Did To Save You",
          body:
            "Heaven requires perfection because God is holy. None of us meet that standard. Jesus did what we could never do: " +
            "He lived a sinless life, took our sin upon Himself, and died in our place. On the cross He absorbed the judgment we deserved. " +
            "He rose again so that His life could be given to us. You don't go to heaven because you are perfect; you go because He is. " +
            "Salvation is not you paying God back—it is you trusting that Jesus already paid it all.",
        },
        {
          id: "d2-rom-6-23",
          type: "scripture",
          title: "Romans 6:23",
          reference: "Romans 6:23",
          body:
            "Sin earns death as its wage, but God offers eternal life as a free gift in Christ Jesus our Lord. The contrast is sharp: " +
            "what we earn versus what He gives.",
        },
        {
          id: "d2-2cor-5-21",
          type: "scripture",
          title: "2 Corinthians 5:21",
          reference: "2 Corinthians 5:21",
          body:
            "Jesus, who knew no sin, was made to be sin for us so that in Him we might become the righteousness of God. " +
            "He took our place so we could receive His standing before the Father.",
        },
        {
          id: "d2-jn-14-6",
          type: "scripture",
          title: "John 14:6",
          reference: "John 14:6",
          body:
            "Jesus does not claim to be one of many ways. He is the Way, the Truth, and the Life. No one comes to the Father except through Him.",
        },
      ],
    },
    {
      id: "day-3",
      dayNumber: 3,
      title: "What Real Faith Looks Like",
      items: [
        {
          id: "d3-devotional",
          type: "devotional",
          title: "What Real Faith Looks Like",
          body:
            "Faith is more than agreeing that God exists or praying when life is hard. Saving faith trusts Jesus alone for salvation " +
            "and surrenders to Him as Lord. Real faith shows up in a new direction: not instant perfection, but a new pattern of following Christ. " +
            "If you are truly trusting Him, your life will gradually reflect that trust.",
        },
        {
          id: "d3-james-2-17",
          type: "scripture",
          title: "James 2:17",
          reference: "James 2:17",
          body:
            "Faith without works is dead. Works do not save us, but living faith always produces visible fruit in how we live.",
        },
        {
          id: "d3-lk-9-23",
          type: "scripture",
          title: "Luke 9:23",
          reference: "Luke 9:23",
          body:
            "Jesus calls His followers to deny themselves, take up their cross daily, and follow Him. Real faith says yes to that call.",
        },
        {
          id: "d3-2cor-5-17",
          type: "scripture",
          title: "2 Corinthians 5:17",
          reference: "2 Corinthians 5:17",
          body:
            "In Christ we become new creations. The old has passed away and the new has come. Salvation brings a real inner change.",
        },
      ],
    },
    {
      id: "day-4",
      dayNumber: 4,
      title: "The Fruit of Salvation",
      items: [
        {
          id: "d4-devotional",
          type: "devotional",
          title: "The Fruit of Salvation",
          body:
            "You recognize a tree by its fruit. In the same way, a genuine relationship with Jesus produces visible change over time—" +
            "new desires, a growing hatred of sin, and an increasing love for God and people. We are not saved by fruit, but real salvation " +
            "does not stay hidden. Where Jesus truly reigns, transformation begins.",
        },
        {
          id: "d4-mt-7-20",
          type: "scripture",
          title: "Matthew 7:20",
          reference: "Matthew 7:20",
          body:
            "Jesus says we will recognize people by their fruits. What consistently comes out of our lives reveals what is within.",
        },
        {
          id: "d4-gal-5-22-23",
          type: "scripture",
          title: "Galatians 5:22–23",
          reference: "Galatians 5:22–23",
          body:
            "The fruit of the Spirit—love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control—" +
            "shows what the Holy Spirit is producing in a believer.",
        },
        {
          id: "d4-phil-1-6",
          type: "scripture",
          title: "Philippians 1:6",
          reference: "Philippians 1:6",
          body:
            "God finishes what He starts. The One who began a good work in you will carry it on to completion in Christ Jesus.",
        },
      ],
    },
    {
      id: "day-5",
      dayNumber: 5,
      title: "Blessed Assurance",
      items: [
        {
          id: "d5-devotional",
          type: "devotional",
          title: "Blessed Assurance",
          body:
            "God does not want His children living in constant fear about eternity. In Christ, He offers assurance. Our salvation is not " +
            "held by our grip on God but by His grip on us. When He saves, He keeps. This confidence does not make us careless; it makes us grateful " +
            "and bold. You do not have to guess about heaven when your life is hidden with Christ.",
        },
        {
          id: "d5-1jn-5-13",
          type: "scripture",
          title: "1 John 5:13",
          reference: "1 John 5:13",
          body:
            "John writes so that believers may know they have eternal life. God wants His children assured, not uncertain.",
        },
        {
          id: "d5-rom-8-1",
          type: "scripture",
          title: "Romans 8:1",
          reference: "Romans 8:1",
          body:
            "There is now no condemnation for those who are in Christ Jesus. Judgment has already been settled at the cross.",
        },
        {
          id: "d5-jn-10-28",
          type: "scripture",
          title: "John 10:28",
          reference: "John 10:28",
          body:
            "Jesus gives His sheep eternal life and says no one can snatch them out of His hand. Your security rests in His power.",
        },
      ],
    },
  ],
};

export const lifeInSpiritPlan: DiscipleshipPlan = {
  id: "life-in-spirit",
  title: "Life in the Spirit",
  subtitle: "Learning to live by the power of the Holy Spirit",
  imageUrl: "/assets/discipleship/life-in-spirit.jpg",
  totalDays: 5,
  days: [
    {
      id: "day-1",
      dayNumber: 1,
      title: "Born of the Spirit",
      items: [
        {
          id: "d1-devotional",
          type: "devotional",
          title: "Born of the Spirit",
          body:
            "The Christian life is not just 'trying harder to be good.' It begins with a miracle: you are born again by the Holy Spirit. God doesn't just improve your old life; He gives you a new one.\n\n" +
            "When you believed in Jesus, the Spirit made you alive on the inside. He opened your eyes, softened your heart, and turned you toward Christ. Now you are not only forgiven—you are indwelt. The same Spirit who raised Jesus from the dead now lives in you.\n\n" +
            "Life in the Spirit is not a special level for super-Christians. It is normal Christianity. You are no longer condemned, and you no longer have to be ruled by the flesh. You have a new power at work within you.",
        },
        {
          id: "d1-rom-8-1-2",
          type: "scripture",
          title: "Romans 8:1-2",
          reference: "Romans 8:1-2",
          body: "No condemnation in Christ; the law of the Spirit of life has set you free from the law of sin and death.",
        },
        {
          id: "d1-jn-3-5-6",
          type: "scripture",
          title: "John 3:5-6",
          reference: "John 3:5-6",
          body: "Jesus explains that we must be born of water and the Spirit; what is born of the Spirit is spirit.",
        },
      ],
    },
    {
      id: "day-2",
      dayNumber: 2,
      title: "The Spirit Within: Your New Identity",
      items: [
        {
          id: "d2-devotional",
          type: "devotional",
          title: "The Spirit Within: Your New Identity",
          body:
            "Many believers still see themselves mainly as broken, dirty, or disqualified. But God says something different. Because His Spirit lives in you, your core identity has changed.\n\n" +
            "You are now a child of God, adopted into His family. The Holy Spirit is the 'Spirit of adoption' who cries out in you, 'Abba, Father.' He Himself bears witness that you belong to God.\n\n" +
            "Your body is also a temple of the Holy Spirit. That means God is not far away; He has chosen to dwell in you. This is both comfort and calling: comfort because you are never alone, calling because your life is now set apart for Him.",
        },
        {
          id: "d2-rom-8-15-16",
          type: "scripture",
          title: "Romans 8:15-16",
          reference: "Romans 8:15-16",
          body: "The Spirit of adoption causes us to cry, 'Abba, Father,' and testifies that we are God's children.",
        },
        {
          id: "d2-1cor-6-19-20",
          type: "scripture",
          title: "1 Corinthians 6:19-20",
          reference: "1 Corinthians 6:19-20",
          body: "Your body is a temple of the Holy Spirit; you are not your own, you were bought with a price.",
        },
      ],
    },
    {
      id: "day-3",
      dayNumber: 3,
      title: "Walking by the Spirit, Not the Flesh",
      items: [
        {
          id: "d3-devotional",
          type: "devotional",
          title: "Walking by the Spirit, Not the Flesh",
          body:
            "The flesh still pulls at you—old habits, old reactions, old patterns. But you are no longer a slave. Scripture calls you to walk by the Spirit so you will not fulfill the desires of the flesh.\n\n" +
            "Walking by the Spirit is not a mystical feeling; it's a daily direction. You set your mind on the things of the Spirit. You listen to God's Word. You say yes to His leading and no to the flesh's demands.\n\n" +
            "When you fail, you don't quit—you confess, get up, and keep in step with the Spirit again. Over time, your desires start to change. What once pulled you strongly now loses its grip, because you value pleasing God more than pleasing sin.",
        },
        {
          id: "d3-gal-5-16-17",
          type: "scripture",
          title: "Galatians 5:16-17",
          reference: "Galatians 5:16-17",
          body: "Walk by the Spirit, and you will not gratify the desires of the flesh; the flesh and Spirit are opposed.",
        },
        {
          id: "d3-rom-8-5-6",
          type: "scripture",
          title: "Romans 8:5-6",
          reference: "Romans 8:5-6",
          body: "Those who live according to the Spirit set their minds on the things of the Spirit; this mindset is life and peace.",
        },
      ],
    },
    {
      id: "day-4",
      dayNumber: 4,
      title: "Led by the Spirit",
      items: [
        {
          id: "d4-devotional",
          type: "devotional",
          title: "Led by the Spirit",
          body:
            "Life in the Spirit is not only about power over sin; it is about guidance. God did not save you to wander in confusion. He promises to lead His children.\n\n" +
            "The Spirit leads primarily through the Word of God, making Scripture come alive and applying it to your situation. He also gives inner conviction, wise counsel through other believers, and providential circumstances. All of this will always agree with Scripture, never contradict it.\n\n" +
            "You don't have to fear missing God's will if you are humbly seeking Him, obeying what you already know, and staying surrendered. The Spirit is a faithful Guide. He is more committed to you walking in God's will than you are.",
        },
        {
          id: "d4-rom-8-14",
          type: "scripture",
          title: "Romans 8:14",
          reference: "Romans 8:14",
          body: "All who are led by the Spirit of God are sons of God.",
        },
        {
          id: "d4-jn-16-13",
          type: "scripture",
          title: "John 16:13",
          reference: "John 16:13",
          body: "The Spirit of truth will guide you into all truth.",
        },
      ],
    },
    {
      id: "day-5",
      dayNumber: 5,
      title: "Fruit, Power, and Mission",
      items: [
        {
          id: "d5-devotional",
          type: "devotional",
          title: "Fruit, Power, and Mission",
          body:
            "The Spirit doesn't fill you just so you can feel spiritual. He fills you so you can bear fruit and live on mission.\n\n" +
            "Fruit is who you are becoming—love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control. Power is what you are able to do—witness boldly, serve sacrificially, endure hardship with hope.\n\n" +
            "Jesus promised the Spirit so that His people would be witnesses 'to the end of the earth.' Life in the Spirit is a life that reflects Christ and reaches others for Him. You are not only a recipient of grace—you are a carrier.",
        },
        {
          id: "d5-gal-5-22-23",
          type: "scripture",
          title: "Galatians 5:22-23",
          reference: "Galatians 5:22-23",
          body: "The fruit of the Spirit in a believer's life.",
        },
        {
          id: "d5-acts-1-8",
          type: "scripture",
          title: "Acts 1:8",
          reference: "Acts 1:8",
          body: "You will receive power when the Holy Spirit comes upon you, and you will be Jesus' witnesses.",
        },
      ],
    },
  ],
};

export const breakingFreeAddictionPlan: DiscipleshipPlan = {
  id: "breaking-free-addiction",
  title: "Breaking Free from Addiction",
  subtitle: "Walking out of bondage and into freedom in Christ",
  imageUrl: "/assets/discipleship/breaking-free.jpg",
  totalDays: 5,
  days: [
    {
      id: "day-1",
      dayNumber: 1,
      title: "Naming the Chains",
      items: [
        {
          id: "d1-devotional",
          type: "devotional",
          title: "Naming the Chains",
          body:
            "Addiction hides in the dark. It tells you, 'You can stop anytime… no one needs to know… it's not that bad.' But Jesus said everyone who practices sin is a slave to sin.\n\n" +
            "Freedom begins with honesty. You cannot heal what you will not name. Whether it's alcohol, drugs, pornography, gambling, food, social media, or anything else that controls you—God already sees it, and He still invites you to Himself.\n\n" +
            "Jesus didn't come just to forgive your addiction; He came to break its power. The road may be long and messy, but it starts with agreeing with God about your bondage and admitting you cannot save yourself.",
        },
        {
          id: "d1-jn-8-34-36",
          type: "scripture",
          title: "John 8:34-36",
          reference: "John 8:34-36",
          body: "Whoever practices sin is a slave to sin, but the Son sets you free indeed.",
        },
        {
          id: "d1-ps-139-23-24",
          type: "scripture",
          title: "Psalm 139:23-24",
          reference: "Psalm 139:23-24",
          body: "'Search me, O God… see if there is any grievous way in me, and lead me in the way everlasting.'",
        },
      ],
    },
    {
      id: "day-2",
      dayNumber: 2,
      title: "Bringing Sin into the Light",
      items: [
        {
          id: "d2-devotional",
          type: "devotional",
          title: "Bringing Sin into the Light",
          body:
            "Addiction grows in secrecy and shame. The enemy whispers, 'If people knew, they would reject you.' God says the opposite: Bring it into the light so I can heal you.\n\n" +
            "Confession is not just saying 'I messed up.' It is agreeing with God that your sin is serious, destructive, and against Him. But confession is also the doorway to cleansing and restoration. The blood of Jesus is enough even for the sins you are most ashamed of.\n\n" +
            "God also uses safe, godly people as part of your healing. James tells us to confess our sins to one another and pray for one another that we may be healed. Isolation keeps you stuck; honest fellowship moves you toward freedom.",
        },
        {
          id: "d2-1jn-1-7-9",
          type: "scripture",
          title: "1 John 1:7-9",
          reference: "1 John 1:7-9",
          body: "Walking in the light, confessing sin, and experiencing cleansing through Jesus' blood.",
        },
        {
          id: "d2-jas-5-16",
          type: "scripture",
          title: "James 5:16",
          reference: "James 5:16",
          body: "Confess your sins to one another and pray for one another, that you may be healed.",
        },
      ],
    },
    {
      id: "day-3",
      dayNumber: 3,
      title: "New Patterns and Escape Routes",
      items: [
        {
          id: "d3-devotional",
          type: "devotional",
          title: "New Patterns and Escape Routes",
          body:
            "Addiction is not just a 'bad habit'; it is often a whole network of patterns—triggers, times of day, emotions, places, and relationships that pull you back into sin.\n\n" +
            "God always provides a way of escape. But you must plan for it. That may mean blocking access, changing routes, deleting apps, avoiding certain friends, or rearranging your schedule. Radical steps are not legalism; they are wisdom when your soul is at stake.\n\n" +
            "Jesus' strong language about cutting off a hand or plucking out an eye is about taking drastic action against anything that leads you repeatedly into sin. You are not powerless; in Christ you are free to flee.",
        },
        {
          id: "d3-1cor-10-13",
          type: "scripture",
          title: "1 Corinthians 10:13",
          reference: "1 Corinthians 10:13",
          body: "God is faithful; He will not let you be tempted beyond your ability but will provide the way of escape.",
        },
        {
          id: "d3-2tim-2-22",
          type: "scripture",
          title: "2 Timothy 2:22",
          reference: "2 Timothy 2:22",
          body: "Flee youthful passions and pursue righteousness, faith, love, and peace with those who call on the Lord.",
        },
      ],
    },
    {
      id: "day-4",
      dayNumber: 4,
      title: "You Can't Do This Alone",
      items: [
        {
          id: "d4-devotional",
          type: "devotional",
          title: "You Can't Do This Alone",
          body:
            "God never meant for you to fight addiction alone. Lone-ranger Christianity is dangerous, especially when you're dealing with deep-rooted sin. You need the body of Christ.\n\n" +
            "Community gives you encouragement when you're weary, correction when you're drifting, and accountability when you're tempted to hide. Two are better than one; if one falls, the other lifts him up.\n\n" +
            "The church is not a museum for perfect people; it is a hospital for sinners who need grace. You may need a recovery group, a mentor, a counselor, or all three. That's not weakness—that's wisdom and humility.",
        },
        {
          id: "d4-heb-10-24-25",
          type: "scripture",
          title: "Hebrews 10:24-25",
          reference: "Hebrews 10:24-25",
          body: "Don't neglect meeting together; stir one another up to love and good works.",
        },
        {
          id: "d4-ecc-4-9-10",
          type: "scripture",
          title: "Ecclesiastes 4:9-10",
          reference: "Ecclesiastes 4:9-10",
          body: "Two are better than one; if one falls, the other can lift him up.",
        },
      ],
    },
    {
      id: "day-5",
      dayNumber: 5,
      title: "Falling Forward in Grace",
      items: [
        {
          id: "d5-devotional",
          type: "devotional",
          title: "Falling Forward in Grace",
          body:
            "Freedom from addiction is often a process, not a straight line. You may still stumble. The enemy wants you to believe that one fall means nothing has changed—that you might as well give up.\n\n" +
            "But Scripture says the righteous person falls seven times and rises again. Your hope is not in a flawless track record; your hope is in a faithful Savior. When you sin, run toward God, not away from Him.\n\n" +
            "God disciplines His children, but He does not abandon them. He is committed to finishing the good work He started in you. Each time you fall and get back up in repentance and faith, you are 'falling forward' into deeper dependence on grace.",
        },
        {
          id: "d5-prov-24-16",
          type: "scripture",
          title: "Proverbs 24:16",
          reference: "Proverbs 24:16",
          body: "The righteous falls seven times and rises again.",
        },
        {
          id: "d5-mic-7-8-9",
          type: "scripture",
          title: "Micah 7:8-9",
          reference: "Micah 7:8-9",
          body: "'When I fall, I shall rise… He will bring me out to the light.'",
        },
      ],
    },
  ],
};

export const DISCIPLESHIP_PLANS: DiscipleshipPlan[] = [
  heavenOrHellPlan,
  lifeInSpiritPlan,
  breakingFreeAddictionPlan,
];
