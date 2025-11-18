import heavenCloudsImage from '@assets/stock_images/heaven_clouds_eterna_9fe3749f.jpg';
import worshipHandsImage from '@assets/stock_images/church_worship_hands_478f58d8.jpg';
import prayerSupportImage from '@assets/stock_images/hands_helping_prayer_2e8063e8.jpg';
import groupPrayerImage from '@assets/stock_images/group_of_people_pray_e32ccdad.jpg';
import forestPathImage from '@assets/stock_images/forest_path_sunlight_7c167ac0.jpg';
import twoPeopleReadingImage from '@assets/stock_images/two_people_reading_b_2fa31c4a.jpg';
import calmLakeImage from '@assets/stock_images/calm_lake_reflection_6b898f76.jpg';
import peacefulPrayerImage from '@assets/stock_images/peaceful_prayer_hand_0c8506a2.jpg';
import sunriseMountainImage from '@assets/stock_images/beautiful_sunrise_go_5ee50391.jpg';
import majesticMountainImage from '@assets/stock_images/majestic_mountain_pe_d088efcc.jpg';
import openBibleSunlightImage from '@assets/stock_images/open_bible_golden_su_50449d17.jpg';
import crossSilhouetteImage from '@assets/stock_images/cross_silhouette_sun_9382d340.jpg';

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
  imageUrl: heavenCloudsImage,
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
  imageUrl: worshipHandsImage,
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
  imageUrl: prayerSupportImage,
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

export const winningOverTemptationPlan: DiscipleshipPlan = {
  id: "winning-over-temptation",
  title: "Winning Over Temptation",
  subtitle: "God's power for real battles",
  imageUrl: groupPrayerImage,
  totalDays: 5,
  days: [
    {
      id: "day-1",
      dayNumber: 1,
      title: "The Battle Is Real",
      items: [
        {
          id: "d1-devotional",
          type: "devotional",
          title: "The Battle Is Real",
          body: "Temptation is not a sign that you're weak — it's proof that you're alive in Christ. Before salvation, sin didn't have to tempt you… you simply followed it. Now there's a war inside you: the Spirit versus the flesh.\n\nYou are not temptation's prisoner anymore. But to win the war, you must recognize the enemy. Temptation comes through:\nThe flesh — inner desires\nThe world — pressure around you\nThe devil — lies against you\n\nJesus understands temptation. He faced the full assault of Satan and never sinned. So when you battle temptation, you're not alone — your King has fought and won.",
        },
        { id: "d1-james", type: "scripture", title: "James 1:13–15", reference: "James 1:13-15", body: "Temptation gives birth to sin when desires are acted on" },
        { id: "d1-eph", type: "scripture", title: "Ephesians 6:10–11", reference: "Ephesians 6:10-11", body: "Stand against the devil's schemes" },
      ],
    },
    {
      id: "day-2",
      dayNumber: 2,
      title: "Run, Don't Reason",
      items: [
        { id: "d2-devotional", type: "devotional", title: "Run, Don't Reason", body: "We often lose the battle because we try to negotiate with temptation. The flesh says: 'Just a little… it's not a big deal…' But the Bible doesn't say 'argue with temptation.' It says: 'Flee.' Sometimes victory looks like leaving the room, deleting the app, changing the friend group, or blocking the access. Fleeing is not cowardice — it's obedience." },
        { id: "d2-2tim", type: "scripture", title: "2 Timothy 2:22", reference: "2 Timothy 2:22", body: "Flee youthful passions and pursue righteousness" },
      ],
    },
    {
      id: "day-3",
      dayNumber: 3,
      title: "Take Every Thought Captive",
      items: [
        { id: "d3-devotional", type: "devotional", title: "Take Every Thought Captive", body: "Temptation doesn't start with behavior — it starts with thoughts. The battlefield is your mind. The enemy throws lies but God gives you the power to reject lies and replace them with truth. When Jesus was tempted, He responded: 'It is written…' Not with emotion or willpower — but the Word." },
        { id: "d3-2cor", type: "scripture", title: "2 Corinthians 10:3–5", reference: "2 Corinthians 10:3-5", body: "Take thoughts captive to obey Christ" },
      ],
    },
    { id: "day-4", dayNumber: 4, title: "The Spirit Is Greater", items: [{ id: "d4-devotional", type: "devotional", title: "The Spirit Is Greater", body: "You don't fight for victory — you fight from victory. The Spirit of God lives in you, and where the Spirit rules, sin cannot dominate." }, { id: "d4-rom", type: "scripture", title: "Romans 8:9", reference: "Romans 8:9", body: "We are no longer controlled by the flesh but the Spirit" }] },
    { id: "day-5", dayNumber: 5, title: "Freedom Is a Journey", items: [{ id: "d5-devotional", type: "devotional", title: "Freedom Is a Journey", body: "The righteous person is not the one who never falls, but the one who keeps getting up in grace. When you fail: Run to God, not away. Confess quickly. Keep walking in the Spirit." }, { id: "d5-prov", type: "scripture", title: "Proverbs 24:16", reference: "Proverbs 24:16", body: "The righteous rise again after falling" }] },
  ],
};

export const findingGodsWillPlan: DiscipleshipPlan = {
  id: "finding-gods-will",
  title: "Finding God's Will for My Life",
  subtitle: "Confidence in God's direction",
  imageUrl: forestPathImage,
  totalDays: 5,
  days: [
    { id: "day-1", dayNumber: 1, title: "God Wants You to Know His Will", items: [{ id: "d1-devotional", type: "devotional", title: "God Wants You to Know His Will", body: "Many believers fear missing God's will — like God is hiding it. But Scripture says the opposite: God wants to guide His children. His will is not discovered by anxiety — it's revealed to those who seek Him. When you follow what you know, God reveals what you don't yet know." }, { id: "d1-prov", type: "scripture", title: "Proverbs 3:5–6", reference: "Proverbs 3:5-6", body: "He will direct your paths" }] },
    { id: "day-2", dayNumber: 2, title: "The Word Leads the Way", items: [{ id: "d2-devotional", type: "devotional", title: "The Word Leads the Way", body: "The primary way God leads is through His written Word. Any guidance that contradicts Scripture is not God. The more Scripture is in you, the more your choices reflect Christ." }, { id: "d2-ps", type: "scripture", title: "Psalm 119:105", reference: "Psalm 119:105", body: "God's Word is a lamp to our feet" }] },
    { id: "day-3", dayNumber: 3, title: "God's Spirit Guides Your Steps", items: [{ id: "d3-devotional", type: "devotional", title: "God's Spirit Guides", body: "The Holy Spirit applies God's Word personally. He nudges, convicts, warns, and encourages. You don't have to fear making the wrong move if your heart is surrendered to Him." }, { id: "d3-rom", type: "scripture", title: "Romans 8:14", reference: "Romans 8:14", body: "The children of God are led by the Spirit" }] },
    { id: "day-4", dayNumber: 4, title: "Peace Is a Guide", items: [{ id: "d4-devotional", type: "devotional", title: "Peace Is a Guide", body: "When God is guiding you, He often gives you a deep peace that doesn't match the situation. Let peace be the umpire in your heart — ruling in or ruling out decisions." }, { id: "d4-col", type: "scripture", title: "Colossians 3:15", reference: "Colossians 3:15", body: "Let God's peace rule in your hearts" }] },
    { id: "day-5", dayNumber: 5, title: "Trust God with the Next Step", items: [{ id: "d5-devotional", type: "devotional", title: "Trust God with the Next Step", body: "God leads one step at a time — so your faith is in Him, not in your plan. The most important step you'll ever take is the next one of obedience." }, { id: "d5-ps", type: "scripture", title: "Psalm 37:23", reference: "Psalm 37:23", body: "God orders the steps of the righteous" }] },
  ],
};

export const findingGodlyRelationshipPlan: DiscipleshipPlan = {
  id: "finding-godly-relationship",
  title: "Finding a Godly Relationship",
  subtitle: "God's design for love, dating, and marriage",
  imageUrl: twoPeopleReadingImage,
  totalDays: 5,
  days: [
    { id: "day-1", dayNumber: 1, title: "God Cares About Who You Date", items: [{ id: "d1-devotional", type: "devotional", title: "God Cares About Who You Date", body: "Romantic relationships can be beautiful — or deeply damaging. God designed love, so He knows how it works best. The person you date influences your walk with God, your peace, your habits, and your future family. God does not want you to settle for someone who pulls you away from Him." }, { id: "d1-2cor", type: "scripture", title: "2 Corinthians 6:14", reference: "2 Corinthians 6:14", body: "Do not be unequally yoked" }] },
    { id: "day-2", dayNumber: 2, title: "Look for Christlike Qualities", items: [{ id: "d2-devotional", type: "devotional", title: "Look for Christlike Qualities", body: "Attraction matters — but character comes first. Don't just ask: 'Do I like them?' Ask: 'Do they look like Jesus is changing their life?' A dating relationship is not a mission field — marry someone who is already following Christ." }, { id: "d2-1sam", type: "scripture", title: "1 Samuel 16:7", reference: "1 Samuel 16:7", body: "God looks at the heart" }] },
    { id: "day-3", dayNumber: 3, title: "Purity Protects Your Future", items: [{ id: "d3-devotional", type: "devotional", title: "Purity Protects Your Future", body: "Sex is God's idea — and He designed it for marriage. Purity is not God trying to ruin your fun — it's God protecting your future joy. Someone who truly loves you will protect your purity, not pressure you to sin." }, { id: "d3-1thess", type: "scripture", title: "1 Thessalonians 4:3–5", reference: "1 Thessalonians 4:3-5", body: "This is God's will: that we abstain from sexual immorality" }] },
    { id: "day-4", dayNumber: 4, title: "Relationships Built on Wisdom", items: [{ id: "d4-devotional", type: "devotional", title: "Relationships Built on Wisdom", body: "Every relationship has storms. Wisdom builds a foundation that can survive them. The foolish build on chemistry and convenience. The wise build on Christ and commitment." }, { id: "d4-matt", type: "scripture", title: "Matthew 7:24–25", reference: "Matthew 7:24-25", body: "Build on the rock, not sand" }] },
    { id: "day-5", dayNumber: 5, title: "Trust God with Your Timing", items: [{ id: "d5-devotional", type: "devotional", title: "Trust God with Your Timing", body: "Waiting is hard — especially when everyone around you seems to be dating or married. But waiting is not wasting when God is the One who holds the timetable. Don't rush ahead of God — He writes better love stories than we do." }, { id: "d5-ps", type: "scripture", title: "Psalm 84:11", reference: "Psalm 84:11", body: "God withholds no good thing from those who walk uprightly" }] },
  ],
};

export const conqueringFearPlan: DiscipleshipPlan = {
  id: "conquering-fear-anxiety",
  title: "Conquering Fear and Anxiety",
  subtitle: "Learning to rest in God's peace",
  imageUrl: calmLakeImage,
  totalDays: 5,
  days: [
    { id: "day-1", dayNumber: 1, title: "Naming Your Fears", items: [{ id: "d1-devotional", type: "devotional", title: "Naming Your Fears", body: "Fear grows in the dark, when it stays vague and undefined. God invites you to name your fears and bring them into His light. He is not surprised by what scares you—He already knows, and He is bigger than all of it. Faith isn't pretending you're not afraid; it's choosing to trust God in the fear." }, { id: "d1-ps", type: "scripture", title: "Psalm 56:3–4", reference: "Psalm 56:3-4", body: "When you're afraid, trust in God; His Word and presence become your confidence" }] },
    { id: "day-2", dayNumber: 2, title: "God Is Bigger Than 'What If'", items: [{ id: "d2-devotional", type: "devotional", title: "God Is Bigger Than 'What If'", body: "Anxiety often lives in the land of 'What if...?' But God is already in your future. He doesn't just control circumstances—He holds you. His plans are wise, His heart is good, and His power is unlimited. Anxiety shrinks when you remember who your God is." }, { id: "d2-matt", type: "scripture", title: "Matthew 6:25–34", reference: "Matthew 6:25-34", body: "Jesus tells us not to worry about tomorrow; the Father knows what we need" }] },
    { id: "day-3", dayNumber: 3, title: "Replacing Worry with Prayer", items: [{ id: "d3-devotional", type: "devotional", title: "Replacing Worry with Prayer", body: "Worry is like mental chewing—it burns energy but doesn't feed your soul. God tells you what to do instead: pray, give thanks, and present your requests to Him. Prayer takes what's spinning in your mind and places it in God's hands." }, { id: "d3-phil", type: "scripture", title: "Philippians 4:6–7", reference: "Philippians 4:6-7", body: "Trade anxiety for prayer and thanksgiving; God's peace guards your heart and mind" }] },
    { id: "day-4", dayNumber: 4, title: "Guarding Your Mind", items: [{ id: "d4-devotional", type: "devotional", title: "Guarding Your Mind", body: "What you feed your mind shapes your emotions. God calls you to guard your mind and fill it with what is true, honorable, pure, and praiseworthy. Anxiety weakens when your mind is anchored in God's truth." }, { id: "d4-phil2", type: "scripture", title: "Philippians 4:8–9", reference: "Philippians 4:8-9", body: "Think on what is true, honorable, just, pure, lovely, and commendable" }] },
    { id: "day-5", dayNumber: 5, title: "Learning to Rest in God", items: [{ id: "d5-devotional", type: "devotional", title: "Learning to Rest in God", body: "Anxiety constantly pushes you to do more, fix more, control more. God invites you to rest—not because everything is solved, but because He is God and you are not. Resting in God means trusting that He is working even when you don't see it." }, { id: "d5-matt2", type: "scripture", title: "Matthew 11:28–30", reference: "Matthew 11:28-30", body: "Jesus invites the weary and burdened to find rest in Him" }] },
  ],
};

export const dealingWithAngerPlan: DiscipleshipPlan = {
  id: "dealing-anger-unforgiveness",
  title: "Dealing with Anger and Unforgiveness",
  subtitle: "From bitterness to Christlike mercy",
  imageUrl: peacefulPrayerImage,
  totalDays: 5,
  days: [
    { id: "day-1", dayNumber: 1, title: "Owning Your Anger", items: [{ id: "d1-devotional", type: "devotional", title: "Owning Your Anger", body: "Anger is not always sin; God Himself is slow to anger, not free of it. But human anger easily slips into bitterness, harsh words, and revenge. Freedom begins when you own your anger instead of excusing it. God invites you to bring your anger to Him, not unleash it on others." }, { id: "d1-eph", type: "scripture", title: "Ephesians 4:26–27", reference: "Ephesians 4:26-27", body: "Be angry and do not sin; don't let the sun go down on your anger" }] },
    { id: "day-2", dayNumber: 2, title: "The Cost of Unforgiveness", items: [{ id: "d2-devotional", type: "devotional", title: "The Cost of Unforgiveness", body: "Unforgiveness feels like power—holding someone's wrong over their head. But in reality, it chains you, not them. Bitterness is like drinking poison and expecting the other person to die. Forgiving doesn't mean forgetting or excusing. It means releasing someone from your personal revenge and entrusting justice to God." }, { id: "d2-matt", type: "scripture", title: "Matthew 6:14–15", reference: "Matthew 6:14-15", body: "If we forgive others, the Father forgives us" }] },
    { id: "day-3", dayNumber: 3, title: "Forgiving from the Heart", items: [{ id: "d3-devotional", type: "devotional", title: "Forgiving from the Heart", body: "Forgiveness is more than saying 'It's okay.' Often, it wasn't okay at all. Forgiving from the heart means naming the wrong honestly, bringing your pain to God, and choosing to release the debt. You're not saying what they did was right—you're saying you will no longer be ruled by it." }, { id: "d3-mark", type: "scripture", title: "Mark 11:25", reference: "Mark 11:25", body: "When you stand praying, forgive if you have anything against anyone" }] },
    { id: "day-4", dayNumber: 4, title: "Learning Gentle Speech", items: [{ id: "d4-devotional", type: "devotional", title: "Learning Gentle Speech", body: "Anger doesn't just stay inside; it flows out through your mouth. Words spoken in heat can scar relationships for years. God calls you to speak truth and grace at the same time. As the Spirit changes your heart, He also wants to change your words." }, { id: "d4-prov", type: "scripture", title: "Proverbs 15:1", reference: "Proverbs 15:1", body: "A soft answer turns away wrath, but harsh words stir up anger" }] },
    { id: "day-5", dayNumber: 5, title: "Living Free from Bitterness", items: [{ id: "d5-devotional", type: "devotional", title: "Living Free from Bitterness", body: "Forgiveness and healing are not one-time events; they become a lifestyle. New offenses will come. Old hurts will resurface. But you don't have to live as a prisoner of bitterness. As you remember how much you've been forgiven, your heart softens toward others. You are never more like Jesus than when you forgive." }, { id: "d5-heb", type: "scripture", title: "Hebrews 12:14–15", reference: "Hebrews 12:14-15", body: "Pursue peace and watch for any root of bitterness" }] },
  ],
};

export const purposePlan: DiscipleshipPlan = {
  id: "purpose-why-am-i-here",
  title: "Purpose: Why Am I Here?",
  subtitle: "Living the life God designed",
  imageUrl: sunriseMountainImage,
  totalDays: 5,
  days: [
    { id: "day-1", dayNumber: 1, title: "Created on Purpose", items: [{ id: "d1-devotional", type: "devotional", title: "Created on Purpose", body: "You are not an accident. You were crafted by God with intention. The world measures worth by success, beauty, or usefulness. God measures worth by design and love. You were made in His image to know Him, reflect Him, and enjoy Him. When you discover God's purpose, every day becomes meaningful—even the ordinary ones." }, { id: "d1-gen", type: "scripture", title: "Genesis 1:26–27", reference: "Genesis 1:26-27", body: "You were made in God's image" }] },
    { id: "day-2", dayNumber: 2, title: "Saved for a Reason", items: [{ id: "d2-devotional", type: "devotional", title: "Saved for a Reason", body: "God didn't just save you from hell; He saved you for Himself. He brought you from darkness to light so that you would declare His praises and walk in His ways. Your identity in Christ becomes the foundation of your purpose. You are called to live as an ambassador of His kingdom wherever He places you." }, { id: "d2-1pet", type: "scripture", title: "1 Peter 2:9–10", reference: "1 Peter 2:9-10", body: "You are a chosen people, called out of darkness to proclaim His excellencies" }] },
    { id: "day-3", dayNumber: 3, title: "Discovering Your Gifts", items: [{ id: "d3-devotional", type: "devotional", title: "Discovering Your Gifts", body: "God gives spiritual gifts so that His people can build up the body of Christ. Your gifts are not for your ego; they're for service and encouragement. As you serve, your gifts become clearer. You don't have to be gifted at everything—just faithful with what God has given you." }, { id: "d3-rom", type: "scripture", title: "Romans 12:4–8", reference: "Romans 12:4-8", body: "Different gifts in one body; use them diligently" }] },
    { id: "day-4", dayNumber: 4, title: "Purpose in Daily Life", items: [{ id: "d4-devotional", type: "devotional", title: "Purpose in Daily Life", body: "Purpose isn't just about big moments. It's also about how you handle small, everyday opportunities. Work, school, chores, conversations, parenting, marriage, friendships—all become places to love God and love people. When you do ordinary tasks with a heart of worship, they become acts of eternal significance." }, { id: "d4-1cor", type: "scripture", title: "1 Corinthians 10:31", reference: "1 Corinthians 10:31", body: "Whatever you do, do all to the glory of God" }] },
    { id: "day-5", dayNumber: 5, title: "Trusting God with the Path", items: [{ id: "d5-devotional", type: "devotional", title: "Trusting God with the Path", body: "You may not know the full shape of your calling yet, and that's okay. God calls you to be faithful with what's in front of you, and He unfolds the rest in His timing. You don't have to fear missing His purpose if you are walking with Him daily. Purpose is less about finding a perfect role and more about walking closely with a perfect God." }, { id: "d5-prov2", type: "scripture", title: "Proverbs 3:5–6", reference: "Proverbs 3:5-6", body: "Trust in the Lord; He will direct your paths" }] },
  ],
};

export const growingStrongRootsPlan: DiscipleshipPlan = {
  id: "growing-strong-roots",
  title: "Growing Strong Roots in Christ",
  subtitle: "Becoming unshakable in Jesus",
  imageUrl: majesticMountainImage,
  totalDays: 5,
  days: [
    { id: "day-1", dayNumber: 1, title: "Rooted, Not Just Visiting", items: [{ id: "d1-devotional", type: "devotional", title: "Rooted, Not Just Visiting", body: "Many people 'visit' Jesus on Sundays but live the rest of the week rooted in everything else. Scripture says we are to be rooted and built up in Christ. Roots are unseen, slow, and steady. Your unseen life with Jesus—prayer, meditation on Scripture, obedience in small things—determines how you stand when life shakes." }, { id: "d1-col", type: "scripture", title: "Colossians 2:6–7", reference: "Colossians 2:6-7", body: "Walk in Christ, rooted and built up, established in the faith" }] },
    { id: "day-2", dayNumber: 2, title: "Feeding on God's Word", items: [{ id: "d2-devotional", type: "devotional", title: "Feeding on God's Word", body: "Roots pull nourishment from the soil. Your soul's 'soil' is the Word of God. If your Bible intake is shallow and irregular, your roots will be too. God's Word is not just information—it is food, light, and life. You cannot grow deep in Christ while staying distant from His Word." }, { id: "d2-matt", type: "scripture", title: "Matthew 4:4", reference: "Matthew 4:4", body: "We live by every word that comes from God's mouth" }] },
    { id: "day-3", dayNumber: 3, title: "Prayer that Sinks Roots Deeper", items: [{ id: "d3-devotional", type: "devotional", title: "Prayer that Sinks Roots Deeper", body: "Prayer is not just a religious task—it's the way your heart stays connected to the Vine. When prayer is absent, you live as if you are on your own. Real prayer is honest, not fancy. Over time, prayer moves from 'last resort' to 'first response.'" }, { id: "d3-luke", type: "scripture", title: "Luke 11:1–4", reference: "Luke 11:1-4", body: "Jesus teaches the disciples to pray with dependence and worship" }] },
    { id: "day-4", dayNumber: 4, title: "Obedience: Roots that Take Hold", items: [{ id: "d4-devotional", type: "devotional", title: "Obedience: Roots that Take Hold", body: "Hearing God's Word without obeying it is like planting a seed but never letting it take root. Jesus said those who hear His words and do them are like a wise person building on rock. Every time you choose God's way over your own, you drive your roots deeper into Him." }, { id: "d4-james", type: "scripture", title: "James 1:22–25", reference: "James 1:22-25", body: "Be doers of the Word, not hearers only" }] },
    { id: "day-5", dayNumber: 5, title: "Standing Firm in the Storm", items: [{ id: "d5-devotional", type: "devotional", title: "Standing Firm in the Storm", body: "Strong roots don't prevent storms, but they keep the tree standing when storms hit. As you grow in the Word, prayer, and obedience, you find that when hardship comes, you bend but you do not break. The same winds that uproot shallow faith drive deep faith even deeper." }, { id: "d5-john", type: "scripture", title: "John 16:33", reference: "John 16:33", body: "In this world you will have trouble, but Jesus has overcome it" }] },
  ],
};

export const hearingGodsVoicePlan: DiscipleshipPlan = {
  id: "hearing-gods-voice",
  title: "Hearing God's Voice Through His Word",
  subtitle: "Learning to listen to Scripture",
  imageUrl: openBibleSunlightImage,
  totalDays: 5,
  days: [
    { id: "day-1", dayNumber: 1, title: "God Still Speaks", items: [{ id: "d1-devotional", type: "devotional", title: "God Still Speaks", body: "God is not silent. He speaks clearly today—primarily through His written Word. Many chase mystical experiences, but neglect the Bible that sits unopened nearby. When you open Scripture, you are not just reading ancient text—you are listening to the living God." }, { id: "d1-2tim", type: "scripture", title: "2 Timothy 3:16–17", reference: "2 Timothy 3:16-17", body: "All Scripture is God-breathed and useful to equip you" }] },
    { id: "day-2", dayNumber: 2, title: "Reading with a Listening Heart", items: [{ id: "d2-devotional", type: "devotional", title: "Reading with a Listening Heart", body: "You can read the Bible quickly and miss God's voice. Hearing requires attention and humility. Instead of rushing, slow down. Ask: What does this teach about God? About me? A listening heart doesn't try to twist Scripture—it submits to what God says, even when it confronts or corrects." }, { id: "d2-ps", type: "scripture", title: "Psalm 119:18", reference: "Psalm 119:18", body: "Open my eyes, that I may behold wondrous things out of Your law" }] },
    { id: "day-3", dayNumber: 3, title: "The Spirit and the Word Together", items: [{ id: "d3-devotional", type: "devotional", title: "The Spirit and the Word Together", body: "The Holy Spirit is the Author of Scripture. He doesn't compete with the Word; He illuminates it. Without Him, the Bible can feel dry. With Him, it becomes light and life. Ask the Spirit to help you understand and apply what you read." }, { id: "d3-john", type: "scripture", title: "John 16:13–14", reference: "John 16:13-14", body: "The Spirit of truth guides into truth and glorifies Jesus" }] },
    { id: "day-4", dayNumber: 4, title: "Testing Voices by the Word", items: [{ id: "d4-devotional", type: "devotional", title: "Testing Voices by the Word", body: "Many voices claim to speak for God. Scripture is your plumb line to test every voice. God will never lead you in a way that contradicts His Word. Any 'voice' that excuses sin, attacks Christ's work, or twists Scripture is not from Him." }, { id: "d4-1john", type: "scripture", title: "1 John 4:1", reference: "1 John 4:1", body: "Test the spirits to see whether they are from God" }] },
    { id: "day-5", dayNumber: 5, title: "Responding to What You Hear", items: [{ id: "d5-devotional", type: "devotional", title: "Responding to What You Hear", body: "Hearing is incomplete without a response. God speaks so that you will trust, repent, obey, and worship. When Scripture prompts you to forgive, forgive. When it calls you to repent, repent. This is how you walk with God in real time." }, { id: "d5-luke", type: "scripture", title: "Luke 11:28", reference: "Luke 11:28", body: "Blessed are those who hear the Word of God and keep it" }] },
  ],
};

export const dailyRepentancePlan: DiscipleshipPlan = {
  id: "walking-daily-repentance",
  title: "Walking in Daily Repentance",
  subtitle: "Turning back to God again and again",
  imageUrl: crossSilhouetteImage,
  totalDays: 5,
  days: [
    { id: "day-1", dayNumber: 1, title: "Repentance: God's Gift", items: [{ id: "d1-devotional", type: "devotional", title: "Repentance: God's Gift", body: "Repentance is not God's way of beating you up; it's His invitation to come home. It means turning away from sin and turning back to God in trust. True repentance is more than feeling bad. It involves agreement with God about your sin, sorrow over grieving Him, and a change of direction." }, { id: "d1-rom", type: "scripture", title: "Romans 2:4", reference: "Romans 2:4", body: "God's kindness leads you to repentance" }] },
    { id: "day-2", dayNumber: 2, title: "Confessing Sin Honestly", items: [{ id: "d2-devotional", type: "devotional", title: "Confessing Sin Honestly", body: "We often minimize, excuse, or rename sin. But true confession speaks plainly: 'What I did was sin against God.' No blaming, no softening, no spin. When you walk in the light with God, you experience cleansing—not condemnation." }, { id: "d2-1john", type: "scripture", title: "1 John 1:8–9", reference: "1 John 1:8-9", body: "If we confess our sins, He is faithful and just to forgive and cleanse us" }] },
    { id: "day-3", dayNumber: 3, title: "Turning from Sin", items: [{ id: "d3-devotional", type: "devotional", title: "Turning from Sin", body: "Repentance is not just 'I'm sorry.' It is a turn—away from what God hates and toward what God loves. That means taking practical steps to leave sin behind and pursue obedience. You're not earning forgiveness; you're walking in the freedom God has already given." }, { id: "d3-acts", type: "scripture", title: "Acts 26:20", reference: "Acts 26:20", body: "Repent, turn to God, and perform deeds in keeping with repentance" }] },
    { id: "day-4", dayNumber: 4, title: "Daily, Not Just Once", items: [{ id: "d4-devotional", type: "devotional", title: "Daily, Not Just Once", body: "Repentance is not a one-time event at conversion; it's a daily rhythm in a believer's life. A mature Christian doesn't repent less; they repent faster. Instead of defending themselves, they agree quickly with God and return to Him." }, { id: "d4-luke", type: "scripture", title: "Luke 9:23", reference: "Luke 9:23", body: "Take up your cross daily and follow Jesus" }] },
    { id: "day-5", dayNumber: 5, title: "Resting in Forgiveness", items: [{ id: "d5-devotional", type: "devotional", title: "Resting in Forgiveness", body: "Repentance leads somewhere: to rest in the finished work of Christ. You do not repent to earn God's love; you repent because His love has already been poured out at the cross. When God forgives, He removes it as far as east is from west." }, { id: "d5-rom2", type: "scripture", title: "Romans 8:1", reference: "Romans 8:1", body: "No condemnation for those in Christ Jesus" }] },
  ],
};

export const DISCIPLESHIP_PLANS: DiscipleshipPlan[] = [
  heavenOrHellPlan,
  lifeInSpiritPlan,
  breakingFreeAddictionPlan,
  winningOverTemptationPlan,
  findingGodsWillPlan,
  findingGodlyRelationshipPlan,
  conqueringFearPlan,
  dealingWithAngerPlan,
  purposePlan,
  growingStrongRootsPlan,
  hearingGodsVoicePlan,
  dailyRepentancePlan,
];
