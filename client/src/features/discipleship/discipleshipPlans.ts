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

export const DISCIPLESHIP_PLANS: DiscipleshipPlan[] = [heavenOrHellPlan];
