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
import repentanceCrossImage from '@assets/stock_images/wooden_cross_silhoue_3e88a194.jpg';
import generousGivingImage from '@assets/stock_images/hands_giving_offerin_3b1b35f2.jpg';
import spiritualWarfareImage from '@assets/stock_images/medieval_armor_shiel_bcdaa0c2.jpg';

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
  subtitle: "A 5-day journey to understand the gospel",
  imageUrl: heavenCloudsImage,
  totalDays: 5,
  days: [
    {
      id: "day-1",
      dayNumber: 1,
      title: "The Question Nobody Escapes",
      items: [
        {
          id: "d1-devotional",
          type: "devotional",
          title: "Day 1 – The Question Nobody Escapes",
          body: `Every person will stand before God one day. We prepare for jobs, school, retirement, even vacations—but many never prepare for **eternity**. The question "Am I going to heaven or hell?" is not morbid; it's **wise**.

The Bible is clear: heaven is real, hell is real, and every person spends forever in one of those two places. The good news is that God does not leave you guessing. He tells you plainly how to be right with Him.

Heaven is not a reward for "pretty good people." Hell is not only for the worst of the worst. Scripture says **all have sinned** and **none** can save themselves. That means the question is not "Am I better than others?" but "What have I done with Jesus?"

**Reflection**

If you died tonight, on what would you honestly be basing your hope of heaven—your goodness, your church, your feelings, or Christ alone?

**Prayer**

Lord, I don't want to guess about eternity. Open my eyes this week to see the truth about my heart and Your way of salvation.

**Shareable Truth**

"Eternity is too long to be wrong about the gospel."`,
        },
        {
          id: "d1-rom323",
          type: "scripture",
          title: "All Have Sinned",
          reference: "Romans 3:23",
          body: `**Plain Meaning:** Every human being, without exception, has sinned and fallen short of God's perfect standard. Sin is not just "big crimes"; it is any thought, action, or desire that fails to love God with all your heart.

**Application:** This verse removes all excuses and comparisons. You don't come to God as a "pretty good person" needing a small touch-up; you come as a sinner needing a Savior.`,
        },
        {
          id: "d1-rom310-12",
          type: "scripture",
          title: "None Righteous on Their Own",
          reference: "Romans 3:10–12",
          body: `**Plain Meaning:** No one, by nature, lives in a way that is perfectly right before God. Left to ourselves, we do not seek God as He truly is.

**Application:** This kills spiritual pride. You don't need help polishing your goodness; you need God to rescue you from spiritual death.`,
        },
        {
          id: "d1-heb927",
          type: "scripture",
          title: "Appointment with Judgment",
          reference: "Hebrews 9:27",
          body: `**Plain Meaning:** Every person dies once and then faces God's judgment. There are no second chances, reincarnations, or do-overs.

**Application:** This makes today urgent. You don't know your day of death, but you do know you will stand before God. Now is the time to seek Him.`,
        },
        {
          id: "d1-matt713-14",
          type: "scripture",
          title: "Two Roads, Two Destinations",
          reference: "Matthew 7:13–14",
          body: `**Plain Meaning:** Jesus describes two gates and two roads: the wide road many travel that leads to destruction, and the narrow road that leads to life.

**Application:** You are on one of those roads right now. Faith in Christ is not one option among many equal paths; it is the narrow way that leads to life.`,
        },
      ],
    },
    {
      id: "day-2",
      dayNumber: 2,
      title: "What Is Sin, Really?",
      items: [
        {
          id: "d2-devotional",
          type: "devotional",
          title: "Day 2 – What Is Sin, Really?",
          body: `Most people admit they are "not perfect," but the Bible's view of sin is far deeper than occasional mistakes. Sin is **rebellion** against God—choosing our way over His, loving His gifts more than Him, and wanting to rule our own life.

You can sin in open ways (lying, lust, anger) but also in religious ways (self-righteousness, pride, using good works to feel superior). Sin is not just what you do; it is what you **are by nature** apart from Christ.

Until you see the seriousness of sin, the cross will just look like a religious symbol, not a rescue.

**Reflection**

Do you tend to think of sin as "little slip-ups" or as deep rebellion against a holy God?

**Prayer**

Holy God, show me the truth about my sin—not to crush me, but to bring me to Your cure in Christ.

**Shareable Truth**

"You will never see Christ as a great Savior until you see yourself as a real sinner."`,
        },
        {
          id: "d2-isaiah59-2",
          type: "scripture",
          title: "Sin Separates from God",
          reference: "Isaiah 59:2",
          body: `**Plain Meaning:** Sin creates a separation between people and God, so that He hides His face and does not hear.

**Application:** The biggest problem with sin is not what it does to your reputation—it is what it does to your relationship with God.`,
        },
        {
          id: "d2-rom62-23",
          type: "scripture",
          title: "Sin's Paycheck: Death",
          reference: "Romans 6:23",
          body: `**Plain Meaning:** The result, or wage, of sin is death—spiritual separation from God now and forever. But God offers eternal life as a gift through Jesus Christ.

**Application:** You don't "get away" with sin; you get paid for it—with death. But God offers a different paycheck: eternal life, undeserved, through His Son.`,
        },
        {
          id: "d2-ps514",
          type: "scripture",
          title: "Against God First",
          reference: "Psalm 51:4",
          body: `**Plain Meaning:** David confesses that his sin, though it hurt others, was ultimately against God Himself.

**Application:** Sin is not only about hurting people; it is about offending a holy God. That is why only God can ultimately forgive it.`,
        },
        {
          id: "d2-james417",
          type: "scripture",
          title: "Respectable Sins",
          reference: "James 4:17",
          body: `**Plain Meaning:** Knowing the right thing to do and refusing to do it is also sin.

**Application:** Sin is not just doing bad things; it is also failing to do the good God has shown you. This means no one can claim to be innocent.`,
        },
      ],
    },
    {
      id: "day-3",
      dayNumber: 3,
      title: "Who Deserves Heaven?",
      items: [
        {
          id: "d3-devotional",
          type: "devotional",
          title: "Day 3 – Who Deserves Heaven?",
          body: `If entrance into heaven were based on deserving, no one would enter. The Bible's verdict is clear: **no one is good enough**. Even our "righteous" acts are stained with wrong motives, pride, or self-interest.

That sounds hopeless—until you realize the gospel is not about what you deserve but about what Christ provides. Heaven is not a wage you earn; it is a **gift** God gives because of Jesus' perfect life, death, and resurrection.

**Reflection**

Deep down, have you been thinking, "I'm pretty good, so I should be okay with God"?

**Prayer**

Lord, strip away any belief that I can earn heaven. Show me that my only hope is the perfect righteousness of Jesus.

**Shareable Truth**

"Heaven is not a trophy for the good—it is a gift for the forgiven."`,
        },
        {
          id: "d3-luke1810-14",
          type: "scripture",
          title: "The Proud Religious Man & the Broken Sinner",
          reference: "Luke 18:10–14",
          body: `**Plain Meaning:** Jesus contrasts a proud Pharisee trusting his own goodness with a tax collector crying for mercy. God accepts the humble sinner, not the self-righteous man.

**Application:** God is not impressed with religious pride. The person who admits their guilt and casts themselves on God's mercy goes home justified.`,
        },
        {
          id: "d3-rom323-24",
          type: "scripture",
          title: "Justified as a Gift",
          reference: "Romans 3:23–24",
          body: `**Plain Meaning:** All have sinned, yet God justifies (declares righteous) sinners freely by His grace through the redemption that is in Christ Jesus.

**Application:** You cannot buy or earn justification. It is a free act of God's grace because Jesus paid the full price.`,
        },
        {
          id: "d3-isaiah646",
          type: "scripture",
          title: "Our Righteousness Is Not Enough",
          reference: "Isaiah 64:6",
          body: `**Plain Meaning:** Even what we think of as righteous deeds are like "filthy rags" before a perfectly holy God.

**Application:** Compared to other people, you may look good. Compared to God's holiness, even your best efforts fall short.`,
        },
        {
          id: "d3-eph28-9",
          type: "scripture",
          title: "Saved by Grace, Not Works",
          reference: "Ephesians 2:8–9",
          body: `**Plain Meaning:** Salvation is by grace through faith. It is God's gift—not a result of works—so that no one can boast.

**Application:** Any system that says "do enough good and you will be saved" contradicts this verse. The Christian rests in grace, not performance.`,
        },
      ],
    },
    {
      id: "day-4",
      dayNumber: 4,
      title: "What Jesus Did for You",
      items: [
        {
          id: "d4-devotional",
          type: "devotional",
          title: "Day 4 – What Jesus Did for You",
          body: `The gospel is not advice about how to live better; it is **news** about what Jesus has already done. On the cross, Jesus took the place of sinners, bearing the wrath and judgment we deserved so that we could be forgiven and declared righteous.

He lived the perfect life you could not live, died the death you should have died, and rose from the dead so you could share His life forever.

**Reflection**

When you think of the cross, do you see it mainly as a symbol—or as a personal rescue for you?

**Prayer**

Jesus, thank You for taking my place. Help me see the cross not just as a story, but as Your love poured out for my sin.

**Shareable Truth**

"On the cross, Jesus was treated as you deserved, so you can be treated as He deserves."`,
        },
        {
          id: "d4-isaiah535-6",
          type: "scripture",
          title: "Pierced for Our Transgressions",
          reference: "Isaiah 53:5–6",
          body: `**Plain Meaning:** The suffering Servant was pierced and crushed for **our** sins; the punishment that brings us peace fell on Him.

**Application:** Your sin did not just disappear; it was placed on Christ. He took what you deserve so you can receive what He deserves.`,
        },
        {
          id: "d4-2cor521",
          type: "scripture",
          title: "The Great Exchange",
          reference: "2 Corinthians 5:21",
          body: `**Plain Meaning:** God made Jesus, who knew no sin, to be sin for us, so that in Him we might become the righteousness of God.

**Application:** At the cross, your sin was counted to Christ, and His righteousness is counted to you when you trust Him.`,
        },
        {
          id: "d4-rom58",
          type: "scripture",
          title: "Love in the Middle of Our Sin",
          reference: "Romans 5:8",
          body: `**Plain Meaning:** God demonstrates His love by Christ dying for us **while** we were still sinners.

**Application:** God did not wait for you to clean up your life. The cross proves His love came first.`,
        },
        {
          id: "d4-1pet224",
          type: "scripture",
          title: "He Bore Our Sins",
          reference: "1 Peter 2:24",
          body: `**Plain Meaning:** Jesus bore our sins in His body on the tree so we might die to sin and live to righteousness.

**Application:** The cross is not just forgiveness; it is also power to live a new life, free from sin's rule.`,
        },
      ],
    },
    {
      id: "day-5",
      dayNumber: 5,
      title: "How to Be Sure You're Saved",
      items: [
        {
          id: "d5-devotional",
          type: "devotional",
          title: "Day 5 – How to Be Sure You're Saved",
          body: `God does not want you living in constant uncertainty about heaven and hell. The Bible shows that a person is saved by **repenting** (turning from sin and self-rule) and **believing** (trusting Jesus alone as Lord and Savior).

This is not a magic formula; it is a real transfer of trust—from yourself to Christ. When you trust Him, God forgives your sins, gives you a new heart, and begins changing your life from the inside out.

Assurance is not based on never sinning again, but on the faithfulness of Christ and the evidence of a new direction in your life.

**Reflection**

Have you personally turned from sin and trusted in Jesus alone as your Lord and Savior—or are you still partly trusting yourself?

**Prayer**

Lord Jesus, I confess that I am a sinner who cannot save myself. I turn from my sin and place my full trust in You—Your cross, Your resurrection, and Your lordship over my life.

**Shareable Truth**

"Saving faith is not trusting Christ + something; it is trusting Christ alone."`,
        },
        {
          id: "d5-mark115",
          type: "scripture",
          title: "Repent and Believe",
          reference: "Mark 1:15",
          body: `**Plain Meaning:** Jesus announces the kingdom of God and calls people to repent and believe the gospel.

**Application:** The response Jesus calls for is clear: turn from sin, turn to Him in faith. Both are needed.`,
        },
        {
          id: "d5-rom109-10",
          type: "scripture",
          title: "Confess and Believe",
          reference: "Romans 10:9–10",
          body: `**Plain Meaning:** If you confess Jesus as Lord and believe God raised Him from the dead, you will be saved.

**Application:** Salvation is tied to a real faith in the risen Christ and a heart-level surrender to His lordship.`,
        },
        {
          id: "d5-john112",
          type: "scripture",
          title: "Receiving Christ",
          reference: "John 1:12",
          body: `**Plain Meaning:** Those who receive Jesus and believe in His name are given the right to become children of God.

**Application:** Eternal life is not automatic; you must personally receive Christ by faith.`,
        },
        {
          id: "d5-1john513",
          type: "scripture",
          title: "You Can Know You Have Eternal Life",
          reference: "1 John 5:13",
          body: `**Plain Meaning:** John writes so that believers may **know** they have eternal life.

**Application:** God wants you to have settled confidence in Christ, not constant fear about your eternal destiny.`,
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
          id: "lis-d1-devotional",
          type: "devotional",
          title: "Day 1 — Born of the Spirit",
          body: `The Christian life is not just "trying harder to be good." It begins with a miracle: you are **born again** by the Holy Spirit. God doesn't just improve your old life; He gives you a new one.

When you believed in Jesus, the Spirit made you alive on the inside. He opened your eyes, softened your heart, and turned you toward Christ. Now you are not only forgiven—you are **indwelt**. The same Spirit who raised Jesus from the dead now lives in you.

Life in the Spirit is not a special level for super-Christians. It is normal Christianity. You are no longer condemned, and you no longer have to be ruled by the flesh. You have a new power at work within you.

**Reflection**

When you think about your salvation, do you see it as mostly *your decision* or as God's **Spirit giving you new life**?

**Prayer**

Holy Spirit, thank You for making me alive in Christ. Help me understand that I am no longer condemned and that a new life has truly begun in me.

**Shareable Truth**

"The Christian life isn't self-improvement; it's a new life in the Spirit."`,
        },
        {
          id: "lis-d1-rom8-1-2",
          type: "scripture",
          title: "No Condemnation in Christ",
          reference: "Romans 8:1–2",
          body: `**Plain Meaning:** For those who are in Christ Jesus, there is now no condemnation. The law of the Spirit of life has set you free from the law of sin and death.

**Application:** You don't live under a guilty verdict anymore. The Spirit marks you as someone liberated from sin's death sentence.`,
        },
        {
          id: "lis-d1-john3-5-6",
          type: "scripture",
          title: "Born of Water and the Spirit",
          reference: "John 3:5–6",
          body: `**Plain Meaning:** Jesus explains that you must be born "of water and the Spirit" to enter the kingdom of God. What is born of the flesh is flesh; what is born of the Spirit is spirit.

**Application:** You don't enter God's kingdom by heritage, effort, or religion, but by a new birth the Spirit brings.`,
        },
        {
          id: "lis-d1-titus3-5-6",
          type: "scripture",
          title: "Wash and Renew",
          reference: "Titus 3:5–6",
          body: `**Plain Meaning:** God saved us not by works of righteousness we have done, but according to His mercy, by the washing of regeneration and renewal of the Holy Spirit.

**Application:** Your new life is mercy from start to finish. The Spirit washed you and made you new; you cannot boast in yourself.`,
        },
      ],
    },
    {
      id: "day-2",
      dayNumber: 2,
      title: "A New Identity in the Spirit",
      items: [
        {
          id: "lis-d2-devotional",
          type: "devotional",
          title: "Day 2 — The Spirit Within: Your New Identity",
          body: `Many believers still see themselves mainly as broken, dirty, or disqualified. But God says something different. Because His Spirit lives in you, your **core identity** has changed.

You are now a child of God, adopted into His family. The Holy Spirit is the "Spirit of adoption" who cries out in you, *"Abba, Father."* He Himself bears witness that you belong to God.

Your body is also a **temple** of the Holy Spirit. That means God is not far away; He has chosen to dwell in you. This is both comfort and calling: comfort because you are never alone, calling because your life is now set apart for Him.

**Reflection**

What would change about your daily decisions if you really believed: "I am God's child, and His Spirit lives in me"?

**Prayer**

Father, thank You that Your Spirit lives in me as a seal that I am Yours. Help me remember who I am in Christ when temptation and fear come.

**Shareable Truth**

"The Holy Spirit is God's way of saying: 'You're Mine now—and forever.'"`,
        },
        {
          id: "lis-d2-rom8-15-16",
          type: "scripture",
          title: "Spirit of Adoption",
          reference: "Romans 8:15–16",
          body: `**Plain Meaning:** You did not receive a spirit of slavery to fall back into fear, but the Spirit of adoption, who cries "Abba, Father," and bears witness that you are God's child.

**Application:** Fear no longer has the final word. The Spirit in you continually reminds you that you belong to a Father, not a slavemaster.`,
        },
        {
          id: "lis-d2-1cor6-19-20",
          type: "scripture",
          title: "Temple of the Holy Spirit",
          reference: "1 Corinthians 6:19–20",
          body: `**Plain Meaning:** Your body is a temple of the Holy Spirit, whom you have from God. You are not your own; you were bought with a price.

**Application:** Your body and life have a holy purpose now. You don't belong to sin, to culture, or even to yourself—you belong to God.`,
        },
        {
          id: "lis-d2-eph1-13-14",
          type: "scripture",
          title: "Sealed by the Spirit",
          reference: "Ephesians 1:13–14",
          body: `**Plain Meaning:** When you believed the gospel, you were sealed with the Holy Spirit, who is a guarantee of your inheritance until the full redemption.

**Application:** The Spirit is God's down payment that He will finish what He started in you. Your future with Him is secure.`,
        },
      ],
    },
    {
      id: "day-3",
      dayNumber: 3,
      title: "Walking by the Spirit",
      items: [
        {
          id: "lis-d3-devotional",
          type: "devotional",
          title: "Day 3 — Walking by the Spirit, Not the Flesh",
          body: `The flesh still pulls at you—old habits, old reactions, old patterns. But you are no longer a slave. Scripture calls you to **walk by the Spirit** so you will not fulfill the desires of the flesh.

Walking by the Spirit is not a mystical feeling; it's a daily direction. You set your mind on the things of the Spirit. You listen to God's Word. You say yes to His leading and no to the flesh's demands.

When you fail, you don't quit—you confess, get up, and keep in step with the Spirit again. Over time, your desires start to change. What once pulled you strongly now loses its grip, because you value pleasing God more than pleasing sin.

**Reflection**

Where do you most feel the pull of the flesh right now, and what would it look like to "walk by the Spirit" in that specific area today?

**Prayer**

Holy Spirit, I choose today to set my mind on the things of God. Show me when I'm drifting toward the flesh, and give me strength to obey You.

**Shareable Truth**

"Walking in the Spirit is a direction, not a mood."`,
        },
        {
          id: "lis-d3-gal5-16-17",
          type: "scripture",
          title: "Walk by the Spirit",
          reference: "Galatians 5:16–17",
          body: `**Plain Meaning:** If you walk by the Spirit you will not gratify the desires of the flesh, because the flesh and Spirit are opposed to each other.

**Application:** You win the battle with sin not by sheer willpower, but by a Spirit-led walk that leaves less room for the flesh.`,
        },
        {
          id: "lis-d3-rom8-5-6",
          type: "scripture",
          title: "Mindset of Life and Peace",
          reference: "Romans 8:5–6",
          body: `**Plain Meaning:** Those who live according to the Spirit set their minds on the things of the Spirit; this mindset is life and peace.

**Application:** What you habitually think about reveals whether you're living by the flesh or by the Spirit. Guard your inner focus.`,
        },
        {
          id: "lis-d3-col3-1-3",
          type: "scripture",
          title: "Set Your Mind Above",
          reference: "Colossians 3:1–3",
          body: `**Plain Meaning:** Since you have been raised with Christ, seek the things above and set your mind there, because your life is hidden with Christ in God.

**Application:** Your true life is anchored in heaven, not earth. Let that reality shape your choices and desires.`,
        },
      ],
    },
    {
      id: "day-4",
      dayNumber: 4,
      title: "Led by the Spirit",
      items: [
        {
          id: "lis-d4-devotional",
          type: "devotional",
          title: "Day 4 — Led by the Spirit",
          body: `Life in the Spirit is not only about power over sin; it is about **guidance**. God did not save you to wander in confusion. He promises to lead His children.

The Spirit leads primarily through the **Word of God**, making Scripture come alive and applying it to your situation. He also gives inner conviction, wise counsel through other believers, and providential circumstances. All of this will always agree with Scripture, never contradict it.

You don't have to fear missing God's will if you are humbly seeking Him, obeying what you already know, and staying surrendered. The Spirit is a faithful Guide. He is more committed to you walking in God's will than you are.

**Reflection**

Where do you most need the Spirit's guidance right now—relationships, work, ministry, decisions?

**Prayer**

Spirit of truth, guide me. Keep me close to Your Word, sensitive to Your leading, and willing to obey even when it costs me.

**Shareable Truth**

"The Holy Spirit is not just power for today—He's guidance for every step."`,
        },
        {
          id: "lis-d4-rom8-14",
          type: "scripture",
          title: "Led as Sons",
          reference: "Romans 8:14",
          body: `**Plain Meaning:** All who are led by the Spirit of God are sons of God.

**Application:** Being led by the Spirit is a family mark. Your guidance is not random; it flows from your sonship.`,
        },
        {
          id: "lis-d4-john16-13",
          type: "scripture",
          title: "Spirit of Truth Guides",
          reference: "John 16:13",
          body: `**Plain Meaning:** The Spirit of truth will guide you into all the truth and glorify Jesus.

**Application:** The Spirit's guidance will always agree with Scripture and lead you toward Jesus, not away from Him.`,
        },
        {
          id: "lis-d4-isa30-21",
          type: "scripture",
          title: "This Is the Way, Walk in It",
          reference: "Isaiah 30:21",
          body: `**Plain Meaning:** God promises that you will hear a word behind you saying, "This is the way, walk in it," when you turn to the right or left.

**Application:** God is not trying to confuse you. As you seek Him, He faithfully directs your steps.`,
        },
      ],
    },
    {
      id: "day-5",
      dayNumber: 5,
      title: "Fruit, Power, and Mission",
      items: [
        {
          id: "lis-d5-devotional",
          type: "devotional",
          title: "Day 5 — Fruit, Power, and Mission",
          body: `The Spirit doesn't fill you just so you can feel spiritual. He fills you so you can **bear fruit** and live on **mission**.

Fruit is who you are becoming—love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control. Power is what you are able to do—witness boldly, serve sacrificially, endure hardship with hope.

Jesus promised the Spirit so that His people would be witnesses "to the end of the earth." Life in the Spirit is a life that reflects Christ and reaches others for Him. You are not only a recipient of grace—you are a carrier.

**Reflection**

Which fruit of the Spirit do you most want God to grow in you this month, and who do you sense He wants you to witness or minister to?

**Prayer**

Holy Spirit, bear Your fruit in my character and use me in Your power. Make my life a living picture of Jesus to the people around me.

**Shareable Truth**

"The Spirit doesn't just live in you—He works through you for others."`,
        },
        {
          id: "lis-d5-gal5-22-23",
          type: "scripture",
          title: "The Spirit's Fruit",
          reference: "Galatians 5:22–23",
          body: `**Plain Meaning:** The fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control.

**Application:** The Spirit aims to change your character, not just your circumstances. These traits are signs of His work in you.`,
        },
        {
          id: "lis-d5-acts1-8",
          type: "scripture",
          title: "Power to Witness",
          reference: "Acts 1:8",
          body: `**Plain Meaning:** You will receive power when the Holy Spirit comes upon you, and you will be Jesus' witnesses to the ends of the earth.

**Application:** The Spirit empowers you to speak of Christ with boldness and love, right where you are.`,
        },
        {
          id: "lis-d5-phil2-13",
          type: "scripture",
          title: "God at Work in You",
          reference: "Philippians 2:13",
          body: `**Plain Meaning:** God is at work in you, both to will and to work for His good pleasure.

**Application:** Even your desire to obey is a work of the Spirit. You are not alone in the struggle; God Himself is working within you.`,
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
      id: "bfa-day-1",
      dayNumber: 1,
      title: "Naming the Chains",
      items: [
        {
          id: "bfa-d1-devotional",
          type: "devotional",
          title: "Day 1 — Naming the Chains",
          body: `Addiction hides in the dark. It tells you, "You can stop anytime… no one needs to know… it's not that bad." But Jesus said everyone who practices sin is a **slave** to sin.

Freedom begins with **honesty**. You cannot heal what you will not name. Whether it's alcohol, drugs, pornography, gambling, food, social media, or anything else that controls you—God already sees it, and He still invites you to Himself.

Jesus didn't come just to forgive your addiction; He came to **break its power**. The road may be long and messy, but it starts with agreeing with God about your bondage and admitting you cannot save yourself.

**Reflection**

What is the specific addiction or bondage you need to bring into the light before God today?

**Prayer**

Lord Jesus, I confess that this area has more power over me than I have admitted. Search me, show me the truth, and begin Your freeing work in me.

**Shareable Truth**

"You cannot defeat what you refuse to name—but Jesus already can."`,
        },
        {
          id: "bfa-d1-john8-34-36",
          type: "scripture",
          title: "Slave or Free?",
          reference: "John 8:34–36",
          body: `**Plain Meaning:** Whoever practices sin is a slave to sin, but the Son sets people truly free.

**Application:** Addiction is spiritual slavery, but Jesus has real power to break chains and give true freedom.`,
        },
        {
          id: "bfa-d1-rom7-18-19",
          type: "scripture",
          title: "The Inner Struggle",
          reference: "Romans 7:18–19",
          body: `**Plain Meaning:** Paul describes wanting to do good but experiencing another power at work that pulls him into what he hates.

**Application:** You are not crazy or alone in the inner battle. Scripture understands the struggle and points you to grace, not self-reliance.`,
        },
        {
          id: "bfa-d1-ps139-23-24",
          type: "scripture",
          title: "Search Me, O God",
          reference: "Psalm 139:23–24",
          body: `**Plain Meaning:** The psalmist invites God to search his heart and reveal any grievous way.

**Application:** Ask God to put His finger on the real issues—beneath the surface habits to the heart-level idols.`,
        },
      ],
    },
    {
      id: "bfa-day-2",
      dayNumber: 2,
      title: "Bringing Sin into the Light",
      items: [
        {
          id: "bfa-d2-devotional",
          type: "devotional",
          title: "Day 2 — Bringing Sin into the Light",
          body: `Addiction grows in secrecy and shame. The enemy whispers, "If people knew, they would reject you." God says the opposite: **Bring it into the light so I can heal you.**

Confession is not just saying "I messed up." It is agreeing with God that your sin is serious, destructive, and against Him. But confession is also the doorway to cleansing and restoration. The blood of Jesus is enough even for the sins you are most ashamed of.

God also uses **safe, godly people** as part of your healing. James tells us to confess our sins to one another and pray for one another that we may be healed. Isolation keeps you stuck; honest fellowship moves you toward freedom.

**Reflection**

Who is one mature, trustworthy believer you can be honest with about your struggle this week?

**Prayer**

Lord, give me courage to bring my sin into the light—with You and with a trusted brother or sister. Thank You that Your mercy is greater than my shame.

**Shareable Truth**

"Shame says 'hide'; grace says 'come into the light and be healed.'"`,
        },
        {
          id: "bfa-d2-1john1-7-9",
          type: "scripture",
          title: "Walk in the Light",
          reference: "1 John 1:7–9",
          body: `**Plain Meaning:** Walking in the light means honesty before God; as we confess our sins, He is faithful to forgive and cleanse us.

**Application:** Freedom requires stepping out of hiding. Confession is not the end of you; it's the beginning of cleansing.`,
        },
        {
          id: "bfa-d2-prov28-13",
          type: "scripture",
          title: "Concealed or Confessed?",
          reference: "Proverbs 28:13",
          body: `**Plain Meaning:** Those who conceal sins do not prosper, but those who confess and forsake them obtain mercy.

**Application:** Hiding your addiction ensures its power over you. Mercy flows where sin is confessed and abandoned.`,
        },
        {
          id: "bfa-d2-james5-16",
          type: "scripture",
          title: "Healing in Community",
          reference: "James 5:16",
          body: `**Plain Meaning:** Confess your sins to one another and pray for one another, that you may be healed.

**Application:** You need both God and godly people. Honest friendships are part of God's design for your healing.`,
        },
      ],
    },
    {
      id: "bfa-day-3",
      dayNumber: 3,
      title: "New Patterns and Escape Routes",
      items: [
        {
          id: "bfa-d3-devotional",
          type: "devotional",
          title: "Day 3 — New Patterns and Escape Routes",
          body: `Addiction is not just a "bad habit"; it is often a whole network of patterns—triggers, times of day, emotions, places, and relationships that pull you back into sin.

God always provides a way of escape. But you must **plan for it**. That may mean blocking access, changing routes, deleting apps, avoiding certain friends, or rearranging your schedule. Radical steps are not legalism; they are **wisdom** when your soul is at stake.

Jesus' strong language about cutting off a hand or plucking out an eye is about taking drastic action against anything that leads you repeatedly into sin. You are not powerless; in Christ you are free to flee.

**Reflection**

What practical "escape routes" and boundaries do you need to put in place this week to make it harder to fall and easier to obey?

**Prayer**

Lord, show me the patterns that lead me into sin. Give me wisdom and courage to set up boundaries and escape routes that honor You.

**Shareable Truth**

"God always provides a way out—wisdom is choosing it before temptation hits."`,
        },
        {
          id: "bfa-d3-1cor10-13",
          type: "scripture",
          title: "A Way of Escape",
          reference: "1 Corinthians 10:13",
          body: `**Plain Meaning:** Temptation is common to humanity, but God is faithful and always provides a way of escape so you can endure it.

**Application:** You are never forced to sin. Ask God to show you the path of escape before you're in too deep.`,
        },
        {
          id: "bfa-d3-2tim2-22",
          type: "scripture",
          title: "Flee and Pursue",
          reference: "2 Timothy 2:22",
          body: `**Plain Meaning:** Flee youthful passions and pursue righteousness, faith, love, and peace with those who call on the Lord.

**Application:** It's not enough to run from sin; you must also run *toward* godly people and godly pursuits.`,
        },
        {
          id: "bfa-d3-matt5-29-30",
          type: "scripture",
          title: "Radical Amputations",
          reference: "Matthew 5:29–30",
          body: `**Plain Meaning:** Jesus uses strong imagery about losing an eye or hand rather than being thrown into hell because of sin.

**Application:** Serious sin calls for serious measures. Removing access points to addiction is wisdom, not extremism.`,
        },
      ],
    },
    {
      id: "bfa-day-4",
      dayNumber: 4,
      title: "You Can't Do This Alone",
      items: [
        {
          id: "bfa-d4-devotional",
          type: "devotional",
          title: "Day 4 — You Can't Do This Alone",
          body: `God never meant for you to fight addiction alone. Lone-ranger Christianity is dangerous, especially when you're dealing with deep-rooted sin. You need the **body of Christ**.

Community gives you encouragement when you're weary, correction when you're drifting, and accountability when you're tempted to hide. Two are better than one; if one falls, the other lifts him up.

The church is not a museum for perfect people; it is a hospital for sinners who need grace. You may need a recovery group, a mentor, a counselor, or all three. That's not weakness—that's wisdom and humility.

**Reflection**

Who are the two or three people God may be calling you to invite into your battle for freedom?

**Prayer**

Lord, I confess that I often want to hide and fix myself alone. Give me the humility to seek help and the courage to walk in community.

**Shareable Truth**

"Freedom is personal, but it is rarely private."`,
        },
        {
          id: "bfa-d4-hebrews10-24-25",
          type: "scripture",
          title: "Don't Walk Alone",
          reference: "Hebrews 10:24–25",
          body: `**Plain Meaning:** Believers are called to stir one another up to love and good works and not neglect meeting together.

**Application:** Skipping community weakens you. You need regular encouragement and challenge from other believers.`,
        },
        {
          id: "bfa-d4-eccl4-9-10",
          type: "scripture",
          title: "Two Are Better Than One",
          reference: "Ecclesiastes 4:9–10",
          body: `**Plain Meaning:** Two are better than one because if one falls, the other can lift him up.

**Application:** Recovery is easier with real partners. Let others lift you instead of hiding when you fall.`,
        },
        {
          id: "bfa-d4-gal6-1-2",
          type: "scripture",
          title: "Restore Gently",
          reference: "Galatians 6:1–2",
          body: `**Plain Meaning:** Those who are spiritual should restore the one caught in any transgression with gentleness, bearing one another's burdens.

**Application:** Ask God for safe people who restore gently—and be willing to be that kind of person for others too.`,
        },
      ],
    },
    {
      id: "bfa-day-5",
      dayNumber: 5,
      title: "Falling Forward in Grace",
      items: [
        {
          id: "bfa-d5-devotional",
          type: "devotional",
          title: "Day 5 — Falling Forward in Grace",
          body: `Freedom from addiction is often **a process**, not a straight line. You may still stumble. The enemy wants you to believe that one fall means nothing has changed—that you might as well give up.

But Scripture says the righteous person falls seven times and rises again. Your hope is not in a flawless track record; your hope is in a faithful Savior. When you sin, run **toward** God, not away from Him.

God disciplines His children, but He does not abandon them. He is committed to finishing the good work He started in you. Each time you fall and get back up in repentance and faith, you are "falling forward" into deeper dependence on grace.

**Reflection**

How do you usually respond after you fall—running to God or hiding from Him? What would it look like to "fall forward" next time?

**Prayer**

Father, I thank You that Your grace is greater than my failures. When I fall, help me run back to You quickly, receive Your forgiveness, and keep walking toward freedom.

**Shareable Truth**

"Freedom isn't never falling; it's always getting back up and running to Jesus."`,
        },
        {
          id: "bfa-d5-prov24-16",
          type: "scripture",
          title: "Rise Again",
          reference: "Proverbs 24:16",
          body: `**Plain Meaning:** The righteous person falls seven times and rises again, but the wicked stumble in calamity.

**Application:** In Christ, falling is not final. By His grace you get back up and keep moving toward Him.`,
        },
        {
          id: "bfa-d5-micah7-8-9",
          type: "scripture",
          title: "From Darkness to Light",
          reference: "Micah 7:8–9",
          body: `**Plain Meaning:** Even when the believer falls, he declares that the Lord will be his light, and God will bring him out to the light.

**Application:** Your lowest moments are not beyond God's reach. He still leads you from darkness back into His light.`,
        },
        {
          id: "bfa-d5-hebrews4-15-16",
          type: "scripture",
          title: "Help in Time of Need",
          reference: "Hebrews 4:15–16",
          body: `**Plain Meaning:** We have a High Priest who sympathizes with our weaknesses, so we can come boldly to the throne of grace for mercy and help.

**Application:** Run to Jesus *because* you are weak, not because you feel strong. The throne you approach is a throne of grace.`,
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
          body: `Temptation is not a sign that you're weak — it's proof that you're alive in Christ. Before salvation, sin didn't have to tempt you… you simply followed it. Now there's a war inside you: the Spirit versus the flesh.

You are not temptation's prisoner anymore. But to win the war, you must recognize the enemy. Temptation comes through:
- The flesh — inner desires
- The world — pressure around you
- The devil — lies against you

Jesus understands temptation. He faced the full assault of Satan and never sinned. So when you battle temptation, you're not alone — your King has fought and won.

**Reflection**

What are the three main sources of temptation in your life right now—flesh, world, or devil?

**Prayer**

Lord Jesus, thank You that You faced temptation and won. Help me to see my battles clearly and trust in Your strength, not my own.

**Shareable Truth**

"Temptation is proof you're alive in Christ—and Christ has already won the war."`,
        },
        {
          id: "d1-james",
          type: "scripture",
          title: "James 1:13–15",
          reference: "James 1:13-15",
          body: `**Plain Meaning:** God does not tempt anyone. Temptation arises from one's own desires, which when acted upon give birth to sin, and sin leads to death.

**Application:** You cannot blame God or circumstances for your temptation. Recognize the pattern: desire → temptation → sin → death. Break the cycle early by taking your desires to God.`,
        },
        {
          id: "d1-eph",
          type: "scripture",
          title: "Ephesians 6:10–11",
          reference: "Ephesians 6:10-11",
          body: `**Plain Meaning:** Be strong in the Lord and put on the full armor of God so you can stand against the devil's schemes.

**Application:** Your battle is spiritual. You need God's strength and His armor, not just willpower. The devil has schemes, but God has given you the tools to stand firm.`,
        },
      ],
    },
    {
      id: "day-2",
      dayNumber: 2,
      title: "Run, Don't Reason",
      items: [
        {
          id: "d2-devotional",
          type: "devotional",
          title: "Run, Don't Reason",
          body: `We often lose the battle because we try to negotiate with temptation. The flesh says: 'Just a little… it's not a big deal…' But the Bible doesn't say 'argue with temptation.' It says: 'Flee.'

Sometimes victory looks like leaving the room, deleting the app, changing the friend group, or blocking the access. Fleeing is not cowardice — it's obedience.

**Reflection**

What situation or access point do you need to flee from instead of trying to manage?

**Prayer**

God, give me the courage to run from what tempts me, even when it feels like I'm losing control. Help me to see fleeing as wisdom, not weakness.

**Shareable Truth**

"Sometimes victory looks like running away—and that takes more courage than staying."`,
        },
        {
          id: "d2-2tim",
          type: "scripture",
          title: "2 Timothy 2:22",
          reference: "2 Timothy 2:22",
          body: `**Plain Meaning:** Flee youthful passions and pursue righteousness, faith, love, and peace, along with those who call on the Lord from a pure heart.

**Application:** Don't just run from sin—run toward godliness. Surround yourself with people who are pursuing Christ with you. Victory is both fleeing and pursuing.`,
        },
        {
          id: "d2-1cor1013",
          type: "scripture",
          title: "God Provides a Way Out",
          reference: "1 Corinthians 10:13",
          body: `**Plain Meaning:** No temptation has overtaken you that is not common to man. God is faithful, and He will not let you be tempted beyond your ability, but with the temptation He will also provide the way of escape.

**Application:** You are never trapped. Every temptation has an exit. Look for it, and God will help you take it.`,
        },
      ],
    },
    {
      id: "day-3",
      dayNumber: 3,
      title: "Take Every Thought Captive",
      items: [
        {
          id: "d3-devotional",
          type: "devotional",
          title: "Take Every Thought Captive",
          body: `Temptation doesn't start with behavior — it starts with thoughts. The battlefield is your mind. The enemy throws lies but God gives you the power to reject lies and replace them with truth.

When Jesus was tempted, He responded: 'It is written…' Not with emotion or willpower — but the Word.

**Reflection**

What lie does temptation whisper to you most often? What specific Scripture can you use to fight it?

**Prayer**

Holy Spirit, guard my mind and give me the strength to take every thought captive. Fill my mind with Your Word so I can fight lies with truth.

**Shareable Truth**

"The battle for your actions is won or lost in your thoughts."`,
        },
        {
          id: "d3-2cor",
          type: "scripture",
          title: "2 Corinthians 10:3–5",
          reference: "2 Corinthians 10:3-5",
          body: `**Plain Meaning:** Though we live in the world, we do not wage war as the world does. We destroy arguments and every lofty opinion raised against the knowledge of God, and take every thought captive to obey Christ.

**Application:** You have the power to take control of your thoughts. Don't let lies run wild—arrest them and submit them to Christ.`,
        },
        {
          id: "d3-matt44-11",
          type: "scripture",
          title: "Jesus' Example",
          reference: "Matthew 4:4, 11",
          body: `**Plain Meaning:** When tempted, Jesus responded with "It is written…" and defeated Satan with Scripture. After the devil left, angels came and ministered to Him.

**Application:** Use the Word of God as your weapon against temptation. When you resist the devil with Scripture, he will flee—and God will minister to you.`,
        },
      ],
    },
    {
      id: "day-4",
      dayNumber: 4,
      title: "The Spirit Is Greater",
      items: [
        {
          id: "d4-devotional",
          type: "devotional",
          title: "The Spirit Is Greater",
          body: `You don't fight for victory — you fight from victory. The Spirit of God lives in you, and where the Spirit rules, sin cannot dominate.

The same power that raised Christ from the dead is at work in you. That means you have supernatural strength to overcome temptation.

**Reflection**

Do you believe the Holy Spirit living in you is greater than any temptation you face?

**Prayer**

Holy Spirit, remind me that You are greater than every temptation. Strengthen me with Your power and rule over every area of my life.

**Shareable Truth**

"You don't fight for victory; you fight from the victory Christ already won."`,
        },
        {
          id: "d4-rom",
          type: "scripture",
          title: "Romans 8:9",
          reference: "Romans 8:9",
          body: `**Plain Meaning:** You are not in the flesh but in the Spirit, if indeed the Spirit of God dwells in you.

**Application:** If you are in Christ, you are no longer controlled by the flesh. The Spirit's presence changes your identity and your power source.`,
        },
        {
          id: "d4-1john44",
          type: "scripture",
          title: "Greater Is He Who Is in You",
          reference: "1 John 4:4",
          body: `**Plain Meaning:** Little children, you are from God and have overcome them, for He who is in you is greater than he who is in the world.

**Application:** The Holy Spirit in you is more powerful than any temptation, any lie, or any enemy. You overcome because of who lives in you.`,
        },
      ],
    },
    {
      id: "day-5",
      dayNumber: 5,
      title: "Freedom Is a Journey",
      items: [
        {
          id: "d5-devotional",
          type: "devotional",
          title: "Freedom Is a Journey",
          body: `The righteous person is not the one who never falls, but the one who keeps getting up in grace. When you fail:
- Run to God, not away
- Confess quickly
- Keep walking in the Spirit

Freedom is not perfection—it's perseverance in the grace of God.

**Reflection**

When you fall, do you run to God or away from Him? What would change if you truly believed His grace is greater than your failure?

**Prayer**

Father, thank You that Your grace is greater than my worst failure. Help me to run to You when I fall, not away from You in shame.

**Shareable Truth**

"The righteous don't fall less—they get up faster in grace."`,
        },
        {
          id: "d5-prov",
          type: "scripture",
          title: "Proverbs 24:16",
          reference: "Proverbs 24:16",
          body: `**Plain Meaning:** The righteous falls seven times and rises again, but the wicked stumble in times of calamity.

**Application:** What separates the righteous from the wicked is not the absence of falling, but the getting back up. Keep rising in God's grace.`,
        },
        {
          id: "d5-1john19",
          type: "scripture",
          title: "Confess and Be Cleansed",
          reference: "1 John 1:9",
          body: `**Plain Meaning:** If we confess our sins, He is faithful and just to forgive us our sins and to cleanse us from all unrighteousness.

**Application:** Confession brings cleansing. Don't hide your failures—bring them to God, and He will wash you clean every time.`,
        },
      ],
    },
  ],
};

export const findingGodsWillPlan: DiscipleshipPlan = {
  id: "finding-gods-will",
  title: "Finding God's Will for My Life",
  subtitle: "Confidence in God's direction",
  imageUrl: forestPathImage,
  totalDays: 5,
  days: [
    {
      id: "day-1",
      dayNumber: 1,
      title: "God Wants You to Know His Will",
      items: [
        {
          id: "d1-devotional",
          type: "devotional",
          title: "God Wants You to Know His Will",
          body: `Many believers fear missing God's will — like God is hiding it. But Scripture says the opposite: God wants to guide His children. His will is not discovered by anxiety — it's revealed to those who seek Him.

When you follow what you know, God reveals what you don't yet know.

**Reflection**

Are you seeking God's will with trust, or with fear of missing it?

**Prayer**

Father, thank You that You want to guide me even more than I want to be guided. Give me a heart that seeks You first, trusting that You will make Your will clear.

**Shareable Truth**

"God's will is not hidden from those who humbly seek Him."`,
        },
        {
          id: "d1-prov",
          type: "scripture",
          title: "Proverbs 3:5–6",
          reference: "Proverbs 3:5-6",
          body: `**Plain Meaning:** Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge Him, and He will make your paths straight.

**Application:** God promises to direct your path when you trust Him fully and acknowledge Him in every decision. Stop leaning on your limited understanding and lean into His unlimited wisdom.`,
        },
        {
          id: "d1-ps2514",
          type: "scripture",
          title: "The Secret of the Lord",
          reference: "Psalm 25:14",
          body: `**Plain Meaning:** The friendship of the Lord is for those who fear Him, and He makes known to them His covenant.

**Application:** God reveals His will to those who walk closely with Him. Intimacy with God leads to clarity about His direction.`,
        },
      ],
    },
    {
      id: "day-2",
      dayNumber: 2,
      title: "The Word Leads the Way",
      items: [
        {
          id: "d2-devotional",
          type: "devotional",
          title: "The Word Leads the Way",
          body: `The primary way God leads is through His written Word. Any guidance that contradicts Scripture is not God. The more Scripture is in you, the more your choices reflect Christ.

God doesn't usually speak through burning bushes today—He speaks through the Bible He's already given us.

**Reflection**

How often do you turn to Scripture when you need direction? Are you seeking God's will more than you're seeking His Word?

**Prayer**

Lord, make Your Word alive in my heart. Let it be the lamp that guides my steps and the light that shows me the way forward.

**Shareable Truth**

"God's Word is the map; don't expect Him to guide you if you won't read it."`,
        },
        {
          id: "d2-ps",
          type: "scripture",
          title: "Psalm 119:105",
          reference: "Psalm 119:105",
          body: `**Plain Meaning:** Your word is a lamp to my feet and a light to my path.

**Application:** God's Word illuminates the step in front of you. You don't need to see the whole path—just the next step. Stay in the Word and He will keep guiding.`,
        },
        {
          id: "d2-2tim316-17",
          type: "scripture",
          title: "Scripture Equips You",
          reference: "2 Timothy 3:16–17",
          body: `**Plain Meaning:** All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness, that the man of God may be complete, equipped for every good work.

**Application:** God's Word doesn't just inform you—it equips you for the work God calls you to do. If you want to know God's will, saturate yourself in His Word.`,
        },
      ],
    },
    {
      id: "day-3",
      dayNumber: 3,
      title: "God's Spirit Guides Your Steps",
      items: [
        {
          id: "d3-devotional",
          type: "devotional",
          title: "God's Spirit Guides",
          body: `The Holy Spirit applies God's Word personally. He nudges, convicts, warns, and encourages. You don't have to fear making the wrong move if your heart is surrendered to Him.

The Spirit doesn't contradict the Word—He illuminates it and applies it to your specific situation.

**Reflection**

Are you listening for the Spirit's gentle nudges, or are you so busy planning that you can't hear Him?

**Prayer**

Holy Spirit, I need Your guidance. Speak to me through Your Word, convict me when I'm going the wrong way, and lead me in the paths of righteousness.

**Shareable Truth**

"The Spirit doesn't shout; He whispers to those who listen."`,
        },
        {
          id: "d3-rom",
          type: "scripture",
          title: "Romans 8:14",
          reference: "Romans 8:14",
          body: `**Plain Meaning:** For all who are led by the Spirit of God are sons of God.

**Application:** Being led by the Spirit is a mark of belonging to God. If you are His child, He will lead you—trust that His Spirit is at work in you.`,
        },
        {
          id: "d3-john1613",
          type: "scripture",
          title: "The Spirit Guides into Truth",
          reference: "John 16:13",
          body: `**Plain Meaning:** When the Spirit of truth comes, He will guide you into all the truth.

**Application:** The Holy Spirit's role is to guide you into truth—not confusion. When you feel confused, ask the Spirit to bring clarity and trust that He will.`,
        },
      ],
    },
    {
      id: "day-4",
      dayNumber: 4,
      title: "Peace Is a Guide",
      items: [
        {
          id: "d4-devotional",
          type: "devotional",
          title: "Peace Is a Guide",
          body: `When God is guiding you, He often gives you a deep peace that doesn't match the situation. Let peace be the umpire in your heart — ruling in or ruling out decisions.

Peace doesn't mean the absence of difficulty—it means the presence of God in the middle of difficulty.

**Reflection**

What decision are you facing right now? Do you sense God's peace about it, or unease?

**Prayer**

Prince of Peace, give me Your peace as I make decisions. Let Your peace be the guard and guide of my heart, and show me when to move forward and when to wait.

**Shareable Truth**

"God's peace is a compass; let it guide your yes and your no."`,
        },
        {
          id: "d4-col",
          type: "scripture",
          title: "Colossians 3:15",
          reference: "Colossians 3:15",
          body: `**Plain Meaning:** Let the peace of Christ rule in your hearts.

**Application:** Peace should be the umpire, the deciding factor in your decisions. When you lack peace, pause and seek God more deeply before moving forward.`,
        },
        {
          id: "d4-phil47",
          type: "scripture",
          title: "Peace Guards Your Heart",
          reference: "Philippians 4:7",
          body: `**Plain Meaning:** And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus.

**Application:** God's peace isn't logical—it surpasses understanding. When you're walking in His will, His peace guards your heart even in uncertain circumstances.`,
        },
      ],
    },
    {
      id: "day-5",
      dayNumber: 5,
      title: "Trust God with the Next Step",
      items: [
        {
          id: "d5-devotional",
          type: "devotional",
          title: "Trust God with the Next Step",
          body: `God leads one step at a time — so your faith is in Him, not in your plan. The most important step you'll ever take is the next one of obedience.

You may not know the whole journey, but if God has made the next step clear, take it.

**Reflection**

What is the next step of obedience God is calling you to take today?

**Prayer**

Lord, I don't need to see the whole staircase—just the next step. Give me the courage to obey what You've already shown me, trusting that You'll reveal the next step in Your time.

**Shareable Truth**

"Faith isn't seeing the whole path; it's taking the next step God shows you."`,
        },
        {
          id: "d5-ps",
          type: "scripture",
          title: "Psalm 37:23",
          reference: "Psalm 37:23",
          body: `**Plain Meaning:** The steps of a man are established by the Lord, when he delights in his way.

**Application:** When you delight in the Lord, He directs your steps. Your job isn't to figure it all out—it's to delight in Him and trust that He's ordering your path.`,
        },
        {
          id: "d5-prov165",
          type: "scripture",
          title: "Commit Your Work to the Lord",
          reference: "Proverbs 16:3",
          body: `**Plain Meaning:** Commit your work to the Lord, and your plans will be established.

**Application:** When you surrender your plans to God, He establishes them. Stop holding tightly to your own agenda and release it into His hands.`,
        },
      ],
    },
  ],
};

export const findingGodlyRelationshipPlan: DiscipleshipPlan = {
  id: "finding-godly-relationship",
  title: "Finding a Godly Relationship",
  subtitle: "God's design for love, dating, and marriage",
  imageUrl: twoPeopleReadingImage,
  totalDays: 5,
  days: [
    {
      id: "day-1",
      dayNumber: 1,
      title: "God Cares About Who You Date",
      items: [
        {
          id: "d1-devotional",
          type: "devotional",
          title: "God Cares About Who You Date",
          body: `Romantic relationships can be beautiful — or deeply damaging. God designed love, so He knows how it works best. The person you date influences your walk with God, your peace, your habits, and your future family.

God does not want you to settle for someone who pulls you away from Him.

**Reflection**

Is your desire for a relationship pulling you toward God or away from Him?

**Prayer**

Father, help me to value what You value in a relationship. Give me patience to wait for someone who will draw me closer to You, not further away.

**Shareable Truth**

"The right person will lead you to Jesus, not away from Him."`,
        },
        {
          id: "d1-2cor",
          type: "scripture",
          title: "2 Corinthians 6:14",
          reference: "2 Corinthians 6:14",
          body: `**Plain Meaning:** Do not be unequally yoked with unbelievers. What partnership has righteousness with lawlessness? Or what fellowship has light with darkness?

**Application:** Dating a non-believer is like yoking an ox with a donkey—they'll pull in different directions. Your spiritual life is too important to compromise for a relationship.`,
        },
        {
          id: "d1-amos33",
          type: "scripture",
          title: "Can Two Walk Together?",
          reference: "Amos 3:3",
          body: `**Plain Meaning:** Can two walk together, except they be agreed?

**Application:** If you and the person you're dating don't share the same commitment to Christ, you'll struggle to walk together in the same direction.`,
        },
      ],
    },
    {
      id: "day-2",
      dayNumber: 2,
      title: "Look for Christlike Qualities",
      items: [
        {
          id: "d2-devotional",
          type: "devotional",
          title: "Look for Christlike Qualities",
          body: `Attraction matters — but character comes first. Don't just ask: 'Do I like them?' Ask: 'Do they look like Jesus is changing their life?'

A dating relationship is not a mission field — marry someone who is already following Christ.

**Reflection**

Are you looking for someone who looks good on Instagram, or someone whose character reflects Jesus?

**Prayer**

Lord, give me spiritual eyes to see what really matters. Help me to prioritize godly character over outward appearance or worldly success.

**Shareable Truth**

"Don't date potential; date proven character walking with Jesus."`,
        },
        {
          id: "d2-1sam",
          type: "scripture",
          title: "1 Samuel 16:7",
          reference: "1 Samuel 16:7",
          body: `**Plain Meaning:** Man looks on the outward appearance, but the Lord looks on the heart.

**Application:** The world judges by looks, status, and charisma. God looks at the heart. Make sure the person's heart is pursuing Christ.`,
        },
        {
          id: "d2-gal522-23",
          type: "scripture",
          title: "The Fruit of the Spirit",
          reference: "Galatians 5:22–23",
          body: `**Plain Meaning:** The fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control.

**Application:** Look for these qualities in the person you're considering dating. If the fruit of the Spirit is missing, red flags are waving.`,
        },
      ],
    },
    {
      id: "day-3",
      dayNumber: 3,
      title: "Purity Protects Your Future",
      items: [
        {
          id: "d3-devotional",
          type: "devotional",
          title: "Purity Protects Your Future",
          body: `Sex is God's idea — and He designed it for marriage. Purity is not God trying to ruin your fun — it's God protecting your future joy.

Someone who truly loves you will protect your purity, not pressure you to sin.

**Reflection**

Are you guarding your purity, or compromising it for the sake of a relationship?

**Prayer**

God, give me the strength to honor You with my body. Help me to flee from sexual immorality and to pursue purity, even when it's hard.

**Shareable Truth**

"Real love protects purity; lust demands compromise."`,
        },
        {
          id: "d3-1thess",
          type: "scripture",
          title: "1 Thessalonians 4:3–5",
          reference: "1 Thessalonians 4:3-5",
          body: `**Plain Meaning:** This is the will of God, your sanctification: that you abstain from sexual immorality; that each one of you know how to control his own body in holiness and honor.

**Application:** God's will is clear: sexual purity before marriage. This isn't a suggestion—it's His loving design to protect you.`,
        },
        {
          id: "d3-1cor618-20",
          type: "scripture",
          title: "Your Body Is a Temple",
          reference: "1 Corinthians 6:18–20",
          body: `**Plain Meaning:** Flee from sexual immorality. Your body is a temple of the Holy Spirit. You are not your own; you were bought with a price. So glorify God in your body.

**Application:** Your body belongs to God. Sexual sin is unique because it sins against your own body. Honor God by fleeing from it.`,
        },
      ],
    },
    {
      id: "day-4",
      dayNumber: 4,
      title: "Relationships Built on Wisdom",
      items: [
        {
          id: "d4-devotional",
          type: "devotional",
          title: "Relationships Built on Wisdom",
          body: `Every relationship has storms. Wisdom builds a foundation that can survive them. The foolish build on chemistry and convenience. The wise build on Christ and commitment.

**Reflection**

Is your relationship built on the rock of Christ, or the sand of emotions and convenience?

**Prayer**

Jesus, be the foundation of my relationships. Help me to build on You, not on fleeting feelings or cultural pressure.

**Shareable Truth**

"Chemistry fades; Christ-centered commitment endures."`,
        },
        {
          id: "d4-matt",
          type: "scripture",
          title: "Matthew 7:24–25",
          reference: "Matthew 7:24-25",
          body: `**Plain Meaning:** Everyone who hears these words of Mine and does them will be like a wise man who built his house on the rock. And the rain fell, and the floods came, and the winds blew and beat on that house, but it did not fall, because it had been founded on the rock.

**Application:** A relationship built on obedience to Christ's Word will withstand the storms. Build on the rock, not on feelings.`,
        },
        {
          id: "d4-prov35-6",
          type: "scripture",
          title: "Trust in the Lord",
          reference: "Proverbs 3:5–6",
          body: `**Plain Meaning:** Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge Him, and He will make straight your paths.

**Application:** Don't rely on your feelings or your friends' advice alone. Bring your relationship to God and trust Him to guide you.`,
        },
      ],
    },
    {
      id: "day-5",
      dayNumber: 5,
      title: "Trust God with Your Timing",
      items: [
        {
          id: "d5-devotional",
          type: "devotional",
          title: "Trust God with Your Timing",
          body: `Waiting is hard — especially when everyone around you seems to be dating or married. But waiting is not wasting when God is the One who holds the timetable.

Don't rush ahead of God — He writes better love stories than we do.

**Reflection**

Are you trusting God's timing, or are you anxiously trying to force your own?

**Prayer**

Father, help me to trust that Your timing is perfect. Give me contentment in this season and patience to wait for Your best.

**Shareable Truth**

"God's timing is never late, and His plans are always better than ours."`,
        },
        {
          id: "d5-ps",
          type: "scripture",
          title: "Psalm 84:11",
          reference: "Psalm 84:11",
          body: `**Plain Meaning:** For the Lord God is a sun and shield; the Lord bestows favor and honor. No good thing does He withhold from those who walk uprightly.

**Application:** If you're walking with God, He will not withhold any good thing from you—including the right relationship at the right time. Trust Him.`,
        },
        {
          id: "d5-eccles33",
          type: "scripture",
          title: "A Time for Everything",
          reference: "Ecclesiastes 3:1",
          body: `**Plain Meaning:** For everything there is a season, and a time for every matter under heaven.

**Application:** There is a season for singleness and a season for relationships. Don't try to force a season that God hasn't opened yet.`,
        },
      ],
    },
  ],
};

export const conqueringFearPlan: DiscipleshipPlan = {
  id: "conquering-fear-anxiety",
  title: "Conquering Fear and Anxiety",
  subtitle: "Learning to rest in God's peace",
  imageUrl: calmLakeImage,
  totalDays: 5,
  days: [
    {
      id: "day-1",
      dayNumber: 1,
      title: "Naming Your Fears",
      items: [
        {
          id: "d1-devotional",
          type: "devotional",
          title: "Naming Your Fears",
          body: `Fear grows in the dark, when it stays vague and undefined. God invites you to name your fears and bring them into His light. He is not surprised by what scares you—He already knows, and He is bigger than all of it.

Faith isn't pretending you're not afraid; it's choosing to trust God in the fear.

**Reflection**

What specific fear are you carrying today? Can you bring it into the light and name it before God?

**Prayer**

Father, I'm afraid of [name your fear]. I bring it to You because You are bigger than all of it. Help me to trust You even when I can't see the way forward.

**Shareable Truth**

"Fear loses its power when you bring it into God's light."`,
        },
        {
          id: "d1-ps",
          type: "scripture",
          title: "Psalm 56:3–4",
          reference: "Psalm 56:3-4",
          body: `**Plain Meaning:** When I am afraid, I put my trust in You. In God, whose word I praise—in God I trust; I shall not be afraid. What can flesh do to me?

**Application:** When fear comes, shift your focus from what you fear to who God is. Trust isn't the absence of fear—it's choosing God in the midst of it.`,
        },
        {
          id: "d1-ps2310",
          type: "scripture",
          title: "The Lord Is My Light",
          reference: "Psalm 27:1",
          body: `**Plain Meaning:** The Lord is my light and my salvation; whom shall I fear? The Lord is the stronghold of my life; of whom shall I be afraid?

**Application:** God is your protector and your light. When you're afraid, remember: He is with you, and He is stronger than whatever you fear.`,
        },
      ],
    },
    {
      id: "day-2",
      dayNumber: 2,
      title: "God Is Bigger Than 'What If'",
      items: [
        {
          id: "d2-devotional",
          type: "devotional",
          title: "God Is Bigger Than 'What If'",
          body: `Anxiety often lives in the land of 'What if...?' But God is already in your future. He doesn't just control circumstances—He holds you. His plans are wise, His heart is good, and His power is unlimited.

Anxiety shrinks when you remember who your God is.

**Reflection**

What 'what if' scenario keeps playing in your mind? How does it change when you remember God is already there?

**Prayer**

Lord, I'm anxious about the future and all the 'what ifs.' Remind me that You are already there, and You hold me no matter what happens.

**Shareable Truth**

"God is already in your tomorrow, so you don't have to fear it today."`,
        },
        {
          id: "d2-matt",
          type: "scripture",
          title: "Matthew 6:25–34",
          reference: "Matthew 6:25-34",
          body: `**Plain Meaning:** Jesus tells us not to worry about tomorrow, for the Father knows what we need. He will provide for us just as He provides for the birds and the flowers.

**Application:** Stop trying to control tomorrow. Your Father knows what you need and will take care of you. Focus on today and trust Him with the rest.`,
        },
        {
          id: "d2-jer2911",
          type: "scripture",
          title: "God Has Plans for You",
          reference: "Jeremiah 29:11",
          body: `**Plain Meaning:** For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.

**Application:** God's plans for you are good, even when you can't see them. Trust that He is working for your good and your future.`,
        },
      ],
    },
    {
      id: "day-3",
      dayNumber: 3,
      title: "Replacing Worry with Prayer",
      items: [
        {
          id: "d3-devotional",
          type: "devotional",
          title: "Replacing Worry with Prayer",
          body: `Worry is like mental chewing—it burns energy but doesn't feed your soul. God tells you what to do instead: pray, give thanks, and present your requests to Him.

Prayer takes what's spinning in your mind and places it in God's hands.

**Reflection**

What are you worrying about that you haven't yet prayed about? What would change if you brought it to God right now?

**Prayer**

Father, I give You [name your worry]. I can't carry it anymore. Take it from me and replace my anxiety with Your peace.

**Shareable Truth**

"Worry is carrying tomorrow's burdens with today's strength; prayer is releasing them into God's hands."`,
        },
        {
          id: "d3-phil",
          type: "scripture",
          title: "Philippians 4:6–7",
          reference: "Philippians 4:6-7",
          body: `**Plain Meaning:** Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus.

**Application:** Trade anxiety for prayer and thanksgiving. When you bring your worries to God, His supernatural peace guards your heart and mind.`,
        },
        {
          id: "d3-1pet57",
          type: "scripture",
          title: "Cast Your Anxiety on Him",
          reference: "1 Peter 5:7",
          body: `**Plain Meaning:** Cast all your anxieties on Him, because He cares for you.

**Application:** God isn't annoyed by your worries—He cares about them because He cares about you. Throw your anxieties on Him and let Him carry them.`,
        },
      ],
    },
    {
      id: "day-4",
      dayNumber: 4,
      title: "Guarding Your Mind",
      items: [
        {
          id: "d4-devotional",
          type: "devotional",
          title: "Guarding Your Mind",
          body: `What you feed your mind shapes your emotions. God calls you to guard your mind and fill it with what is true, honorable, pure, and praiseworthy.

Anxiety weakens when your mind is anchored in God's truth.

**Reflection**

What are you feeding your mind? Is it fueling your anxiety or anchoring you in truth?

**Prayer**

Lord, help me to guard my mind from lies and fear. Fill my thoughts with what is true, pure, and worthy of praise.

**Shareable Truth**

"Guard your mind like a garden—what you plant there will grow."`,
        },
        {
          id: "d4-phil2",
          type: "scripture",
          title: "Philippians 4:8–9",
          reference: "Philippians 4:8-9",
          body: `**Plain Meaning:** Finally, brothers, whatever is true, whatever is honorable, whatever is just, whatever is pure, whatever is lovely, whatever is commendable, if there is any excellence, if there is anything worthy of praise, think about these things.

**Application:** You have control over what you think about. Fill your mind with God's truth, not the world's lies, and your anxiety will lose its grip.`,
        },
        {
          id: "d4-rom122",
          type: "scripture",
          title: "Renew Your Mind",
          reference: "Romans 12:2",
          body: `**Plain Meaning:** Do not be conformed to this world, but be transformed by the renewal of your mind.

**Application:** Your mind is transformed when you replace worldly thinking with God's Word. Renewing your mind daily is the path to peace.`,
        },
      ],
    },
    {
      id: "day-5",
      dayNumber: 5,
      title: "Learning to Rest in God",
      items: [
        {
          id: "d5-devotional",
          type: "devotional",
          title: "Learning to Rest in God",
          body: `Anxiety constantly pushes you to do more, fix more, control more. God invites you to rest—not because everything is solved, but because He is God and you are not.

Resting in God means trusting that He is working even when you don't see it.

**Reflection**

Where are you striving to control what only God can handle? What would it look like to rest in Him today?

**Prayer**

Jesus, I'm tired of trying to fix everything on my own. Teach me to rest in You and trust that You are working even when I can't see it.

**Shareable Truth**

"Rest isn't laziness; it's trusting that God is God and you are not."`,
        },
        {
          id: "d5-matt2",
          type: "scripture",
          title: "Matthew 11:28–30",
          reference: "Matthew 11:28-30",
          body: `**Plain Meaning:** Come to Me, all who labor and are heavy laden, and I will give you rest. Take My yoke upon you, and learn from Me, for I am gentle and lowly in heart, and you will find rest for your souls.

**Application:** Jesus invites the weary and burdened to find rest in Him. Stop striving and come to Him. His rest is real and available to you today.`,
        },
        {
          id: "d5-ps4610",
          type: "scripture",
          title: "Be Still and Know",
          reference: "Psalm 46:10",
          body: `**Plain Meaning:** Be still, and know that I am God. I will be exalted among the nations, I will be exalted in the earth!

**Application:** Sometimes the most spiritual thing you can do is be still. Stop striving, stop controlling, and simply trust that God is God.`,
        },
      ],
    },
  ],
};

export const dealingWithAngerPlan: DiscipleshipPlan = {
  id: "dealing-anger-unforgiveness",
  title: "Dealing with Anger and Unforgiveness",
  subtitle: "From bitterness to Christlike mercy",
  imageUrl: peacefulPrayerImage,
  totalDays: 5,
  days: [
    {
      id: "day-1",
      dayNumber: 1,
      title: "Owning Your Anger",
      items: [
        {
          id: "d1-devotional",
          type: "devotional",
          title: "Owning Your Anger",
          body: `Anger is not always sin; God Himself is slow to anger, not free of it. But human anger easily slips into bitterness, harsh words, and revenge.

Freedom begins when you own your anger instead of excusing it. God invites you to bring your anger to Him, not unleash it on others.

**Reflection**

Are you owning your anger, or are you excusing it, blaming others, or letting it control you?

**Prayer**

Lord, I confess my anger to You. Help me to bring it to You first, not unleash it on others. Teach me to be slow to anger like You are.

**Shareable Truth**

"Anger acknowledged before God loses its power to destroy."`,
        },
        {
          id: "d1-eph",
          type: "scripture",
          title: "Ephesians 4:26–27",
          reference: "Ephesians 4:26-27",
          body: `**Plain Meaning:** Be angry and do not sin; do not let the sun go down on your anger, and give no opportunity to the devil.

**Application:** Anger itself isn't always sin, but unresolved anger opens the door to sin. Deal with your anger quickly and bring it to God before it turns into bitterness.`,
        },
        {
          id: "d1-james119-20",
          type: "scripture",
          title: "Quick to Listen, Slow to Anger",
          reference: "James 1:19–20",
          body: `**Plain Meaning:** Let every person be quick to hear, slow to speak, slow to anger; for the anger of man does not produce the righteousness of God.

**Application:** Human anger rarely produces godly results. Slow down, listen first, and give yourself time before reacting in anger.`,
        },
      ],
    },
    {
      id: "day-2",
      dayNumber: 2,
      title: "The Cost of Unforgiveness",
      items: [
        {
          id: "d2-devotional",
          type: "devotional",
          title: "The Cost of Unforgiveness",
          body: `Unforgiveness feels like power—holding someone's wrong over their head. But in reality, it chains you, not them. Bitterness is like drinking poison and expecting the other person to die.

Forgiving doesn't mean forgetting or excusing. It means releasing someone from your personal revenge and entrusting justice to God.

**Reflection**

Who are you holding in unforgiveness? How is that bitterness affecting your own heart and peace?

**Prayer**

Father, I release [name the person] into Your hands. I choose to forgive, not because they deserve it, but because You have forgiven me. Free me from the chains of bitterness.

**Shareable Truth**

"Unforgiveness is a prison where you are both the prisoner and the guard."`,
        },
        {
          id: "d2-matt",
          type: "scripture",
          title: "Matthew 6:14–15",
          reference: "Matthew 6:14-15",
          body: `**Plain Meaning:** For if you forgive others their trespasses, your heavenly Father will also forgive you, but if you do not forgive others their trespasses, neither will your Father forgive your trespasses.

**Application:** Forgiveness isn't optional for followers of Christ. Just as God has forgiven you, He calls you to forgive others—even when it's hard.`,
        },
        {
          id: "d2-rom1219",
          type: "scripture",
          title: "Leave Room for God's Wrath",
          reference: "Romans 12:19",
          body: `**Plain Meaning:** Beloved, never avenge yourselves, but leave it to the wrath of God, for it is written, "Vengeance is Mine, I will repay, says the Lord."

**Application:** You don't need to hold onto bitterness to ensure justice. God will handle it. Release the person and trust God to be the judge.`,
        },
      ],
    },
    {
      id: "day-3",
      dayNumber: 3,
      title: "Forgiving from the Heart",
      items: [
        {
          id: "d3-devotional",
          type: "devotional",
          title: "Forgiving from the Heart",
          body: `Forgiveness is more than saying 'It's okay.' Often, it wasn't okay at all. Forgiving from the heart means naming the wrong honestly, bringing your pain to God, and choosing to release the debt.

You're not saying what they did was right—you're saying you will no longer be ruled by it.

**Reflection**

Have you truly forgiven from the heart, or are you still holding onto the hurt while saying the words?

**Prayer**

Jesus, help me to forgive from the heart, not just with words. Heal the hurt and release me from the weight of unforgiveness.

**Shareable Truth**

"Forgiveness doesn't excuse the wrong; it releases you from the weight of carrying it."`,
        },
        {
          id: "d3-mark",
          type: "scripture",
          title: "Mark 11:25",
          reference: "Mark 11:25",
          body: `**Plain Meaning:** And whenever you stand praying, forgive, if you have anything against anyone, so that your Father also who is in heaven may forgive you your trespasses.

**Application:** Forgiveness is part of your prayer life. Before you ask God for anything, check your heart and forgive those who have wronged you.`,
        },
        {
          id: "d3-col313",
          type: "scripture",
          title: "Forgive as the Lord Forgave You",
          reference: "Colossians 3:13",
          body: `**Plain Meaning:** Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you.

**Application:** You have been forgiven of so much. Let that shape how you forgive others—freely and fully, just as Christ forgave you.`,
        },
      ],
    },
    {
      id: "day-4",
      dayNumber: 4,
      title: "Learning Gentle Speech",
      items: [
        {
          id: "d4-devotional",
          type: "devotional",
          title: "Learning Gentle Speech",
          body: `Anger doesn't just stay inside; it flows out through your mouth. Words spoken in heat can scar relationships for years.

God calls you to speak truth and grace at the same time. As the Spirit changes your heart, He also wants to change your words.

**Reflection**

What do your words reveal about the state of your heart? Are you speaking truth with grace, or just releasing anger?

**Prayer**

Lord, guard my mouth and tame my tongue. Help me to speak words of life, not death, and to respond with gentleness even when I'm angry.

**Shareable Truth**

"Gentle words can turn away wrath; harsh words fuel the fire."`,
        },
        {
          id: "d4-prov",
          type: "scripture",
          title: "Proverbs 15:1",
          reference: "Proverbs 15:1",
          body: `**Plain Meaning:** A soft answer turns away wrath, but a harsh word stirs up anger.

**Application:** Your tone and words have power. A gentle response can defuse conflict, while harsh words escalate it. Choose gentleness.`,
        },
        {
          id: "d4-eph429",
          type: "scripture",
          title: "Let No Corrupting Talk Come Out",
          reference: "Ephesians 4:29",
          body: `**Plain Meaning:** Let no corrupting talk come out of your mouths, but only such as is good for building up, as fits the occasion, that it may give grace to those who hear.

**Application:** Your words should build up, not tear down. Before you speak in anger, ask: will this give grace to the hearer?`,
        },
      ],
    },
    {
      id: "day-5",
      dayNumber: 5,
      title: "Living Free from Bitterness",
      items: [
        {
          id: "d5-devotional",
          type: "devotional",
          title: "Living Free from Bitterness",
          body: `Forgiveness and healing are not one-time events; they become a lifestyle. New offenses will come. Old hurts will resurface. But you don't have to live as a prisoner of bitterness.

As you remember how much you've been forgiven, your heart softens toward others. You are never more like Jesus than when you forgive.

**Reflection**

Are you nurturing any roots of bitterness? What would freedom from bitterness look like in your life?

**Prayer**

Father, search my heart for any root of bitterness. Uproot it and replace it with Your love and grace. Help me to live in the freedom of forgiveness.

**Shareable Truth**

"You are never more like Jesus than when you extend the grace you've received."`,
        },
        {
          id: "d5-heb",
          type: "scripture",
          title: "Hebrews 12:14–15",
          reference: "Hebrews 12:14-15",
          body: `**Plain Meaning:** Strive for peace with everyone, and for the holiness without which no one will see the Lord. See to it that no one fails to obtain the grace of God; that no "root of bitterness" springs up and causes trouble, and by it many become defiled.

**Application:** Bitterness doesn't just hurt you—it affects everyone around you. Pursue peace and uproot bitterness before it spreads.`,
        },
        {
          id: "d5-luke637-38",
          type: "scripture",
          title: "Forgive and You Will Be Forgiven",
          reference: "Luke 6:37–38",
          body: `**Plain Meaning:** Judge not, and you will not be judged; condemn not, and you will not be condemned; forgive, and you will be forgiven.

**Application:** The measure you use for others will be used for you. Extend mercy and forgiveness freely, and you will receive it in return.`,
        },
      ],
    },
  ],
};

export const purposePlan: DiscipleshipPlan = {
  id: "purpose-why-am-i-here",
  title: "Purpose: Why Am I Here?",
  subtitle: "Living the life God designed",
  imageUrl: sunriseMountainImage,
  totalDays: 5,
  days: [
    {
      id: "day-1",
      dayNumber: 1,
      title: "Created on Purpose",
      items: [
        {
          id: "d1-devotional",
          type: "devotional",
          title: "Created on Purpose",
          body: `You are not an accident. You were crafted by God with intention. The world measures worth by success, beauty, or usefulness. God measures worth by design and love.

You were made in His image to know Him, reflect Him, and enjoy Him. When you discover God's purpose, every day becomes meaningful—even the ordinary ones.

**Reflection**

Do you believe you were created with purpose, or do you still measure your worth by the world's standards?

**Prayer**

Father, thank You for creating me on purpose and with purpose. Help me to see myself as You see me and to live for Your glory, not the world's approval.

**Shareable Truth**

"You are not an accident; you are a masterpiece with a mission."`,
        },
        {
          id: "d1-gen",
          type: "scripture",
          title: "Genesis 1:26–27",
          reference: "Genesis 1:26-27",
          body: `**Plain Meaning:** Then God said, "Let Us make man in Our image, after Our likeness." So God created man in His own image, in the image of God He created him; male and female He created them.

**Application:** You bear the image of God. That alone gives you infinite worth and purpose. Your life matters because you were made to reflect the glory of your Creator.`,
        },
        {
          id: "d1-eph210",
          type: "scripture",
          title: "God's Workmanship",
          reference: "Ephesians 2:10",
          body: `**Plain Meaning:** For we are His workmanship, created in Christ Jesus for good works, which God prepared beforehand, that we should walk in them.

**Application:** You are God's masterpiece, created for good works He planned in advance. Your purpose isn't random—it was designed by God before you were born.`,
        },
      ],
    },
    {
      id: "day-2",
      dayNumber: 2,
      title: "Saved for a Reason",
      items: [
        {
          id: "d2-devotional",
          type: "devotional",
          title: "Saved for a Reason",
          body: `God didn't just save you from hell; He saved you for Himself. He brought you from darkness to light so that you would declare His praises and walk in His ways.

Your identity in Christ becomes the foundation of your purpose. You are called to live as an ambassador of His kingdom wherever He places you.

**Reflection**

Are you living like someone who was saved for a purpose, or just someone who was saved from something?

**Prayer**

Lord, You didn't just rescue me—You called me to represent You. Help me to live as Your ambassador and proclaim Your excellencies wherever I go.

**Shareable Truth**

"You were saved from darkness to shine God's light in the world."`,
        },
        {
          id: "d2-1pet",
          type: "scripture",
          title: "1 Peter 2:9–10",
          reference: "1 Peter 2:9-10",
          body: `**Plain Meaning:** But you are a chosen race, a royal priesthood, a holy nation, a people for His own possession, that you may proclaim the excellencies of Him who called you out of darkness into His marvelous light.

**Application:** You are chosen, royal, and set apart. Your purpose is to proclaim God's greatness. Live like someone who belongs to the King.`,
        },
        {
          id: "d2-2cor520",
          type: "scripture",
          title: "Ambassadors for Christ",
          reference: "2 Corinthians 5:20",
          body: `**Plain Meaning:** Therefore, we are ambassadors for Christ, God making His appeal through us.

**Application:** You represent Christ wherever you go. Your words, actions, and life are His message to the world. Live worthy of your calling.`,
        },
      ],
    },
    {
      id: "day-3",
      dayNumber: 3,
      title: "Discovering Your Gifts",
      items: [
        {
          id: "d3-devotional",
          type: "devotional",
          title: "Discovering Your Gifts",
          body: `God gives spiritual gifts so that His people can build up the body of Christ. Your gifts are not for your ego; they're for service and encouragement.

As you serve, your gifts become clearer. You don't have to be gifted at everything—just faithful with what God has given you.

**Reflection**

What spiritual gifts has God given you? Are you using them to serve others, or are they sitting idle?

**Prayer**

Holy Spirit, reveal the gifts You've given me and help me to use them faithfully to serve Your people and glorify Your name.

**Shareable Truth**

"Your gifts aren't for your glory; they're for God's kingdom and others' good."`,
        },
        {
          id: "d3-rom",
          type: "scripture",
          title: "Romans 12:4–8",
          reference: "Romans 12:4-8",
          body: `**Plain Meaning:** We have different gifts according to the grace given to each of us. Use them diligently—whether prophecy, service, teaching, encouraging, giving, leading, or showing mercy.

**Application:** Don't compare your gifts to others'. Use what God has given you with diligence and faithfulness, knowing every gift matters in the body of Christ.`,
        },
        {
          id: "d3-1pet410-11",
          type: "scripture",
          title: "Serve One Another",
          reference: "1 Peter 4:10–11",
          body: `**Plain Meaning:** As each has received a gift, use it to serve one another, as good stewards of God's varied grace.

**Application:** Your gifts are a stewardship—God gave them to you to bless others. Don't hoard them; use them generously to serve the body of Christ.`,
        },
      ],
    },
    {
      id: "day-4",
      dayNumber: 4,
      title: "Purpose in Daily Life",
      items: [
        {
          id: "d4-devotional",
          type: "devotional",
          title: "Purpose in Daily Life",
          body: `Purpose isn't just about big moments. It's also about how you handle small, everyday opportunities. Work, school, chores, conversations, parenting, marriage, friendships—all become places to love God and love people.

When you do ordinary tasks with a heart of worship, they become acts of eternal significance.

**Reflection**

How can you bring purpose and worship into the ordinary moments of your day today?

**Prayer**

Father, help me to see every task, conversation, and moment as an opportunity to glorify You. Make my ordinary extraordinary through Your presence.

**Shareable Truth**

"Ordinary tasks become eternal when done for God's glory."`,
        },
        {
          id: "d4-1cor",
          type: "scripture",
          title: "1 Corinthians 10:31",
          reference: "1 Corinthians 10:31",
          body: `**Plain Meaning:** So, whether you eat or drink, or whatever you do, do all to the glory of God.

**Application:** Everything you do—no matter how ordinary—can be an act of worship when you do it for God's glory. Bring Him into every moment.`,
        },
        {
          id: "d4-col323-24",
          type: "scripture",
          title: "Work as for the Lord",
          reference: "Colossians 3:23–24",
          body: `**Plain Meaning:** Whatever you do, work heartily, as for the Lord and not for men, knowing that from the Lord you will receive the inheritance as your reward. You are serving the Lord Christ.

**Application:** Your work isn't just for your boss or your family—it's for the Lord. When you work with that perspective, even the mundane becomes meaningful.`,
        },
      ],
    },
    {
      id: "day-5",
      dayNumber: 5,
      title: "Trusting God with the Path",
      items: [
        {
          id: "d5-devotional",
          type: "devotional",
          title: "Trusting God with the Path",
          body: `You may not know the full shape of your calling yet, and that's okay. God calls you to be faithful with what's in front of you, and He unfolds the rest in His timing.

You don't have to fear missing His purpose if you are walking with Him daily. Purpose is less about finding a perfect role and more about walking closely with a perfect God.

**Reflection**

Are you anxious about finding your purpose, or are you trusting God to reveal it as you walk with Him?

**Prayer**

Lord, I trust You with my future. Help me to be faithful with what's in front of me today and to rest in Your timing for the rest.

**Shareable Truth**

"Purpose isn't found in a moment; it's walked out daily with God."`,
        },
        {
          id: "d5-prov2",
          type: "scripture",
          title: "Proverbs 3:5–6",
          reference: "Proverbs 3:5-6",
          body: `**Plain Meaning:** Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge Him, and He will make straight your paths.

**Application:** Stop trying to figure it all out on your own. Trust God with your purpose and He will direct your steps. Your job is to walk with Him, not to have it all mapped out.`,
        },
        {
          id: "d5-jer2911",
          type: "scripture",
          title: "God's Plans for You",
          reference: "Jeremiah 29:11",
          body: `**Plain Meaning:** For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.

**Application:** God knows the plans He has for you, and they are good. You don't need to know every detail—just trust that He's leading you to a future full of hope.`,
        },
      ],
    },
  ],
};

export const growingStrongRootsPlan: DiscipleshipPlan = {
  id: "growing-strong-roots",
  title: "Growing Strong Roots in Christ",
  subtitle: "Becoming unshakable in Jesus",
  imageUrl: majesticMountainImage,
  totalDays: 5,
  days: [
    {
      id: "day-1",
      dayNumber: 1,
      title: "Rooted, Not Just Visiting",
      items: [
        {
          id: "d1-devotional",
          type: "devotional",
          title: "Rooted, Not Just Visiting",
          body: `Many people 'visit' Jesus on Sundays but live the rest of the week rooted in everything else. Scripture says we are to be rooted and built up in Christ.

Roots are unseen, slow, and steady. Your unseen life with Jesus—prayer, meditation on Scripture, obedience in small things—determines how you stand when life shakes.

**Reflection**

Are you rooted in Christ, or are you just visiting Him occasionally when it's convenient?

**Prayer**

Jesus, I want to be rooted in You, not just visiting You. Help me to build my life on You every day, not just on Sundays.

**Shareable Truth**

"Roots grow in secret, but they determine whether you stand in the storm."`,
        },
        {
          id: "d1-col",
          type: "scripture",
          title: "Colossians 2:6–7",
          reference: "Colossians 2:6-7",
          body: `**Plain Meaning:** Therefore, as you received Christ Jesus the Lord, so walk in Him, rooted and built up in Him and established in the faith.

**Application:** Just as you received Christ by faith, continue to walk in Him daily. Being rooted means going deep—not just surface-level faith, but a life built on Jesus.`,
        },
        {
          id: "d1-jer178",
          type: "scripture",
          title: "Planted by the Water",
          reference: "Jeremiah 17:7–8",
          body: `**Plain Meaning:** Blessed is the man who trusts in the Lord, whose trust is the Lord. He is like a tree planted by water, that sends out its roots by the stream.

**Application:** When you trust the Lord deeply, you become like a tree with deep roots. Even in drought, you remain green and fruitful because your roots are in Him.`,
        },
      ],
    },
    {
      id: "day-2",
      dayNumber: 2,
      title: "Feeding on God's Word",
      items: [
        {
          id: "d2-devotional",
          type: "devotional",
          title: "Feeding on God's Word",
          body: `Roots pull nourishment from the soil. Your soul's 'soil' is the Word of God. If your Bible intake is shallow and irregular, your roots will be too.

God's Word is not just information—it is food, light, and life. You cannot grow deep in Christ while staying distant from His Word.

**Reflection**

How often are you feeding on God's Word? Is it daily nourishment, or an occasional snack?

**Prayer**

Lord, create in me a hunger for Your Word. Help me to feast on it daily so that my roots grow deep and strong in You.

**Shareable Truth**

"Shallow reading produces shallow roots; daily feeding produces deep faith."`,
        },
        {
          id: "d2-matt",
          type: "scripture",
          title: "Matthew 4:4",
          reference: "Matthew 4:4",
          body: `**Plain Meaning:** Man shall not live by bread alone, but by every word that comes from the mouth of God.

**Application:** Physical food keeps your body alive, but God's Word sustains your soul. You need it just as much—if not more—than your daily bread.`,
        },
        {
          id: "d2-ps11997",
          type: "scripture",
          title: "Delighting in God's Word",
          reference: "Psalm 119:97",
          body: `**Plain Meaning:** Oh how I love Your law! It is my meditation all the day.

**Application:** When you love God's Word, you can't stop thinking about it. It becomes the meditation of your heart, not just a Sunday routine.`,
        },
      ],
    },
    {
      id: "day-3",
      dayNumber: 3,
      title: "Prayer that Sinks Roots Deeper",
      items: [
        {
          id: "d3-devotional",
          type: "devotional",
          title: "Prayer that Sinks Roots Deeper",
          body: `Prayer is not just a religious task—it's the way your heart stays connected to the Vine. When prayer is absent, you live as if you are on your own.

Real prayer is honest, not fancy. Over time, prayer moves from 'last resort' to 'first response.'

**Reflection**

Is prayer your first response or your last resort? How can you make it a deeper part of your daily walk with Jesus?

**Prayer**

Father, teach me to pray. Help me to talk to You honestly and often, not just when I'm desperate. Let prayer become the lifeline of my faith.

**Shareable Truth**

"Prayerless faith is like a tree without roots—it looks alive until the wind blows."`,
        },
        {
          id: "d3-luke",
          type: "scripture",
          title: "Luke 11:1–4",
          reference: "Luke 11:1-4",
          body: `**Plain Meaning:** Jesus teaches the disciples to pray, modeling dependence on God, worship, and trust in His provision and forgiveness.

**Application:** Prayer is learned by doing it. Follow Jesus' model: honor God, depend on Him, and bring your needs to Him with trust.`,
        },
        {
          id: "d3-1thess517",
          type: "scripture",
          title: "Pray Without Ceasing",
          reference: "1 Thessalonians 5:17",
          body: `**Plain Meaning:** Pray without ceasing.

**Application:** Prayer isn't just a morning or evening event—it's a constant conversation with God throughout your day. Stay connected to Him always.`,
        },
      ],
    },
    {
      id: "day-4",
      dayNumber: 4,
      title: "Obedience: Roots that Take Hold",
      items: [
        {
          id: "d4-devotional",
          type: "devotional",
          title: "Obedience: Roots that Take Hold",
          body: `Hearing God's Word without obeying it is like planting a seed but never letting it take root. Jesus said those who hear His words and do them are like a wise person building on rock.

Every time you choose God's way over your own, you drive your roots deeper into Him.

**Reflection**

Is there something God has been asking you to obey that you've been avoiding? What's holding you back?

**Prayer**

Lord, I want to be a doer of Your Word, not just a hearer. Give me the courage to obey You even when it's hard.

**Shareable Truth**

"Obedience is the root system that holds you firm when the storms come."`,
        },
        {
          id: "d4-james",
          type: "scripture",
          title: "James 1:22–25",
          reference: "James 1:22-25",
          body: `**Plain Meaning:** Be doers of the Word, and not hearers only, deceiving yourselves. The one who looks into the Word and persists in obedience will be blessed.

**Application:** Knowing the Word without obeying it is self-deception. True blessing comes when you hear God's Word and actually do what it says.`,
        },
        {
          id: "d4-john1314-15",
          type: "scripture",
          title: "If You Love Me, Obey",
          reference: "John 14:15",
          body: `**Plain Meaning:** If you love Me, you will keep My commandments.

**Application:** Love for Jesus is shown through obedience, not just words or feelings. If you love Him, obey Him.`,
        },
      ],
    },
    {
      id: "day-5",
      dayNumber: 5,
      title: "Standing Firm in the Storm",
      items: [
        {
          id: "d5-devotional",
          type: "devotional",
          title: "Standing Firm in the Storm",
          body: `Strong roots don't prevent storms, but they keep the tree standing when storms hit. As you grow in the Word, prayer, and obedience, you find that when hardship comes, you bend but you do not break.

The same winds that uproot shallow faith drive deep faith even deeper.

**Reflection**

When the storms of life come, do you have deep enough roots to stand firm? What can you do today to grow deeper?

**Prayer**

Jesus, I know storms will come. Help me to grow deep roots in You now so that when they do, I will stand firm and not be shaken.

**Shareable Truth**

"Storms reveal whether your roots are deep or shallow."`,
        },
        {
          id: "d5-john",
          type: "scripture",
          title: "John 16:33",
          reference: "John 16:33",
          body: `**Plain Meaning:** In the world you will have tribulation. But take heart; I have overcome the world.

**Application:** Jesus doesn't promise a storm-free life, but He does promise victory. In Him, you can face any storm with confidence because He has overcome.`,
        },
        {
          id: "d5-matt724-27",
          type: "scripture",
          title: "Build on the Rock",
          reference: "Matthew 7:24–27",
          body: `**Plain Meaning:** Everyone who hears Jesus' words and does them is like a wise man who built his house on the rock. The rain fell, the floods came, and the winds blew, but the house did not fall, because it had been founded on the rock.

**Application:** When you build your life on Jesus' Word and obey it, you can withstand any storm. Shallow faith collapses; deep faith endures.`,
        },
      ],
    },
  ],
};

export const hearingGodsVoicePlan: DiscipleshipPlan = {
  id: "hearing-gods-voice",
  title: "Hearing God's Voice Through His Word",
  subtitle: "Learning to listen to Scripture",
  imageUrl: openBibleSunlightImage,
  totalDays: 5,
  days: [
    {
      id: "day-1",
      dayNumber: 1,
      title: "God Still Speaks",
      items: [
        {
          id: "d1-devotional",
          type: "devotional",
          title: "God Still Speaks",
          body: `God is not silent. He speaks clearly today—primarily through His written Word. Many chase mystical experiences, but neglect the Bible that sits unopened nearby.

When you open Scripture, you are not just reading ancient text—you are listening to the living God.

**Reflection**

Are you listening for God's voice in Scripture, or are you seeking Him everywhere except His Word?

**Prayer**

Lord, help me to recognize that Your Word is not just ancient history—it's Your living voice speaking to me today. Open my ears to hear You.

**Shareable Truth**

"God's primary way of speaking today is through His written Word."`,
        },
        {
          id: "d1-2tim",
          type: "scripture",
          title: "2 Timothy 3:16–17",
          reference: "2 Timothy 3:16-17",
          body: `**Plain Meaning:** All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness, that the man of God may be complete, equipped for every good work.

**Application:** Scripture is not just a book—it's God-breathed. When you read it, God is speaking directly to you, equipping you for everything He's called you to do.`,
        },
        {
          id: "d1-heb412",
          type: "scripture",
          title: "The Word Is Living and Active",
          reference: "Hebrews 4:12",
          body: `**Plain Meaning:** For the word of God is living and active, sharper than any two-edged sword, piercing to the division of soul and of spirit.

**Application:** God's Word isn't dead text on a page—it's alive and active. It speaks into your life, revealing your heart and pointing you to truth.`,
        },
      ],
    },
    {
      id: "day-2",
      dayNumber: 2,
      title: "Reading with a Listening Heart",
      items: [
        {
          id: "d2-devotional",
          type: "devotional",
          title: "Reading with a Listening Heart",
          body: `You can read the Bible quickly and miss God's voice. Hearing requires attention and humility. Instead of rushing, slow down. Ask: What does this teach about God? About me?

A listening heart doesn't try to twist Scripture—it submits to what God says, even when it confronts or corrects.

**Reflection**

Are you reading Scripture to check a box, or are you slowing down to truly listen to what God is saying?

**Prayer**

Father, give me a humble and attentive heart when I read Your Word. Help me to slow down, listen carefully, and submit to Your truth.

**Shareable Truth**

"A listening heart hears what a rushing mind misses."`,
        },
        {
          id: "d2-ps",
          type: "scripture",
          title: "Psalm 119:18",
          reference: "Psalm 119:18",
          body: `**Plain Meaning:** Open my eyes, that I may behold wondrous things out of Your law.

**Application:** You need God's help to truly understand His Word. Ask Him to open your eyes as you read, and He will reveal wonderful truths you would have missed on your own.`,
        },
        {
          id: "d2-james122",
          type: "scripture",
          title: "Be Quick to Listen",
          reference: "James 1:22",
          body: `**Plain Meaning:** But be doers of the word, and not hearers only, deceiving yourselves.

**Application:** It's not enough to read the Bible—you have to listen and obey. A heart that truly listens will respond in obedience.`,
        },
      ],
    },
    {
      id: "day-3",
      dayNumber: 3,
      title: "The Spirit and the Word Together",
      items: [
        {
          id: "d3-devotional",
          type: "devotional",
          title: "The Spirit and the Word Together",
          body: `The Holy Spirit is the Author of Scripture. He doesn't compete with the Word; He illuminates it. Without Him, the Bible can feel dry. With Him, it becomes light and life.

Ask the Spirit to help you understand and apply what you read.

**Reflection**

Are you depending on the Holy Spirit to teach you as you read Scripture, or are you trying to understand it on your own?

**Prayer**

Holy Spirit, You wrote the Word—help me to understand it. Illuminate the truth and bring it to life in my heart as I read.

**Shareable Truth**

"The Spirit wrote the Word and He opens it to those who ask."`,
        },
        {
          id: "d3-john",
          type: "scripture",
          title: "John 16:13–14",
          reference: "John 16:13-14",
          body: `**Plain Meaning:** When the Spirit of truth comes, He will guide you into all the truth and glorify Jesus.

**Application:** The Holy Spirit's job is to guide you into truth and point you to Jesus. Ask Him to teach you as you read, and He will.`,
        },
        {
          id: "d3-1cor214",
          type: "scripture",
          title: "The Spirit Teaches Spiritual Things",
          reference: "1 Corinthians 2:14",
          body: `**Plain Meaning:** The natural person does not accept the things of the Spirit of God, for they are folly to him, and he is not able to understand them because they are spiritually discerned.

**Application:** Without the Spirit, Scripture can seem confusing or irrelevant. With the Spirit, God's truth comes alive and transforms you.`,
        },
      ],
    },
    {
      id: "day-4",
      dayNumber: 4,
      title: "Testing Voices by the Word",
      items: [
        {
          id: "d4-devotional",
          type: "devotional",
          title: "Testing Voices by the Word",
          body: `Many voices claim to speak for God. Scripture is your plumb line to test every voice. God will never lead you in a way that contradicts His Word.

Any 'voice' that excuses sin, attacks Christ's work, or twists Scripture is not from Him.

**Reflection**

Are you testing the voices you hear—whether in your mind, from friends, or from teachers—against the truth of Scripture?

**Prayer**

Lord, give me discernment to test every voice against Your Word. Help me to reject what contradicts You and cling to what aligns with Your truth.

**Shareable Truth**

"If it contradicts Scripture, it's not from God—no matter how convincing it sounds."`,
        },
        {
          id: "d4-1john",
          type: "scripture",
          title: "1 John 4:1",
          reference: "1 John 4:1",
          body: `**Plain Meaning:** Beloved, do not believe every spirit, but test the spirits to see whether they are from God.

**Application:** Don't accept every voice or teaching as truth. Test it against Scripture. If it doesn't align, reject it.`,
        },
        {
          id: "d4-acts1711",
          type: "scripture",
          title: "The Bereans Examined the Scriptures",
          reference: "Acts 17:11",
          body: `**Plain Meaning:** The Bereans were more noble because they received the word with eagerness and examined the Scriptures daily to see if these things were so.

**Application:** Even good teaching should be tested against Scripture. Be eager to learn, but always check it against God's Word.`,
        },
      ],
    },
    {
      id: "day-5",
      dayNumber: 5,
      title: "Responding to What You Hear",
      items: [
        {
          id: "d5-devotional",
          type: "devotional",
          title: "Responding to What You Hear",
          body: `Hearing is incomplete without a response. God speaks so that you will trust, repent, obey, and worship. When Scripture prompts you to forgive, forgive. When it calls you to repent, repent.

This is how you walk with God in real time.

**Reflection**

What has God been speaking to you through His Word lately? Have you responded in obedience, or are you just filing it away?

**Prayer**

Father, help me to not just hear Your Word but to respond to it. Give me the courage to obey what You're saying, even when it's difficult.

**Shareable Truth**

"Hearing God's Word without obeying it is not hearing at all."`,
        },
        {
          id: "d5-luke",
          type: "scripture",
          title: "Luke 11:28",
          reference: "Luke 11:28",
          body: `**Plain Meaning:** Blessed are those who hear the word of God and keep it.

**Application:** True blessing comes not just from hearing God's Word, but from doing what it says. Obedience brings the blessing.`,
        },
        {
          id: "d5-james122-25",
          type: "scripture",
          title: "Doers of the Word",
          reference: "James 1:22–25",
          body: `**Plain Meaning:** Be doers of the word, and not hearers only. The one who looks into the law and persists in doing it will be blessed.

**Application:** It's not enough to read and know Scripture—you have to live it. When you do what God's Word says, you experience His blessing.`,
        },
      ],
    },
  ],
};

export const dailyRepentancePlan: DiscipleshipPlan = {
  id: "walking-daily-repentance",
  title: "Walking in Daily Repentance",
  subtitle: "Turning back to God again and again",
  imageUrl: repentanceCrossImage,
  totalDays: 5,
  days: [
    {
      id: "day-1",
      dayNumber: 1,
      title: "Repentance: God's Gift, Not Punishment",
      items: [
        {
          id: "d1-devotional",
          type: "devotional",
          title: "Day 1 — Repentance: God's Gift, Not Punishment",
          body: `Repentance is not God's way of beating you up; it's His invitation to come home. It means turning away from sin and turning back to God in trust.

True repentance is more than feeling bad. It involves agreement with God about your sin, sorrow over grieving Him, and a change of direction. It is a gift—the Spirit softens your heart so you can return.

**Reflection**

Have you seen repentance as a gift or as a painful embarrassment?

**Prayer**

Father, thank You that repentance is Your kindness calling me home. Soften my heart and make me quick to turn back to You.

**Shareable Truth**

"Repentance is not God pushing you away; it's God opening the door."`,
        },
        {
          id: "d1-rom24",
          type: "scripture",
          title: "God's Kindness Leads to Repentance",
          reference: "Romans 2:4",
          body: `**Plain Meaning:** God's kindness and patience are meant to lead you to repentance, not to encourage sin.

**Application:** Repentance is not punishment—it's a gift that flows from experiencing God's kindness. When you see how good God is, it makes you want to turn from sin.`,
        },
        {
          id: "d1-acts319",
          type: "scripture",
          title: "Repent and Turn Back",
          reference: "Acts 3:19",
          body: `**Plain Meaning:** Repent and turn back to God so that your sins may be blotted out.

**Application:** Repentance is not just feeling sorry—it's actively turning back to God. When you do, He wipes your sins away completely.`,
        },
        {
          id: "d1-ps511-4",
          type: "scripture",
          title: "David's Honest Confession",
          reference: "Psalm 51:1–4",
          body: `**Plain Meaning:** David confesses his sin honestly before God, acknowledging that ultimately all sin is against God Himself.

**Application:** True repentance doesn't minimize or excuse. It calls sin what God calls it and brings it directly to Him for mercy.`,
        },
        {
          id: "d1-2cor79-10",
          type: "scripture",
          title: "Godly Grief vs. Worldly Grief",
          reference: "2 Corinthians 7:9–10",
          body: `**Plain Meaning:** Godly grief produces repentance that leads to salvation without regret; worldly grief produces death.

**Application:** There's a difference between being sorry you got caught and being sorry you sinned against God. Godly sorrow changes you; worldly sorrow just makes you feel bad.`,
        },
        {
          id: "d1-isaiah556-7",
          type: "scripture",
          title: "Return to the Lord",
          reference: "Isaiah 55:6–7",
          body: `**Plain Meaning:** Seek the Lord while He may be found; let the wicked forsake their way and return to the Lord, who will have compassion and abundantly pardon.

**Application:** No matter how far you've gone, God invites you to return. His mercy is abundant, and His arms are open.`,
        },
      ],
    },
    {
      id: "day-2",
      dayNumber: 2,
      title: "Confessing Sin Honestly",
      items: [
        {
          id: "d2-devotional",
          type: "devotional",
          title: "Day 2 — Confessing Sin Honestly",
          body: `We often minimize, excuse, or rename sin. But true confession speaks plainly: "What I did was sin against God." No blaming, no softening, no spin.

When you walk in the light with God, you experience cleansing—not condemnation. You don't have to hide; Jesus has already paid for what you confess.

**Reflection**

Is there any sin you've been softening or hiding that you need to name honestly before God?

**Prayer**

Lord, I bring my sin before You. I call it what You call it and ask for cleansing through Jesus' blood.

**Shareable Truth**

"God doesn't forgive excuses—He forgives confessed sin."`,
        },
        {
          id: "d2-1john18-9",
          type: "scripture",
          title: "Walking in the Light",
          reference: "1 John 1:8–9",
          body: `**Plain Meaning:** If we say we have no sin, we deceive ourselves. But if we confess our sins, God is faithful and just to forgive us and cleanse us from all unrighteousness.

**Application:** Confession brings cleansing, not condemnation. God doesn't reject you when you confess—He forgives you completely because of Jesus.`,
        },
        {
          id: "d2-prov2813",
          type: "scripture",
          title: "Concealing vs. Confessing",
          reference: "Proverbs 28:13",
          body: `**Plain Meaning:** Whoever conceals their sins will not prosper, but whoever confesses and forsakes them will receive mercy.

**Application:** Hiding sin keeps you stuck. Confessing and turning from it opens the door to God's mercy and freedom.`,
        },
        {
          id: "d2-ps321-5",
          type: "scripture",
          title: "The Misery of Hiding Sin",
          reference: "Psalm 32:1–5",
          body: `**Plain Meaning:** David describes the physical and emotional misery of hiding sin, and the relief and forgiveness that came when he confessed it to God.

**Application:** Unconfessed sin weighs you down spiritually, emotionally, and even physically. Confession brings relief and restoration.`,
        },
        {
          id: "d2-heb416",
          type: "scripture",
          title: "Come Boldly for Mercy",
          reference: "Hebrews 4:16",
          body: `**Plain Meaning:** We can come boldly to the throne of grace to receive mercy and find help in time of need.

**Application:** You don't have to crawl to God in shame. Because of Jesus, you can come confidently, knowing you'll receive mercy, not rejection.`,
        },
        {
          id: "d2-luke189-14",
          type: "scripture",
          title: "The Tax Collector's Humble Confession",
          reference: "Luke 18:9–14",
          body: `**Plain Meaning:** Jesus contrasts a proud Pharisee who boasted in his own righteousness with a tax collector who humbly cried out for mercy. The tax collector went home justified, not the Pharisee.

**Application:** God responds to humble, honest confession, not religious pride or self-justification.`,
        },
      ],
    },
    {
      id: "day-3",
      dayNumber: 3,
      title: "Turning from Sin and Toward God",
      items: [
        {
          id: "d3-devotional",
          type: "devotional",
          title: "Day 3 — Turning from Sin and Toward God",
          body: `Repentance is not just "I'm sorry." It is a turn—away from what God hates and toward what God loves. That means taking practical steps to leave sin behind and pursue obedience.

You remove access to sin, change habits, seek accountability, and actively choose God's way. You're not earning forgiveness; you're walking in the freedom God has already given.

**Reflection**

What practical step could you take today that would show a real turn away from a specific sin?

**Prayer**

Jesus, thank You for forgiving me. Now help me to walk differently. Show me what I need to put off and what You want me to put on.

**Shareable Truth**

"Repentance isn't just turning from something; it's turning to Someone."`,
        },
        {
          id: "d3-acts2620",
          type: "scripture",
          title: "Deeds in Keeping with Repentance",
          reference: "Acts 26:20",
          body: `**Plain Meaning:** Paul preached that people should repent, turn to God, and perform deeds in keeping with their repentance.

**Application:** Real repentance shows up in your actions. If you've truly turned from sin, your life will begin to look different.`,
        },
        {
          id: "d3-eph422-24",
          type: "scripture",
          title: "Put Off the Old, Put On the New",
          reference: "Ephesians 4:22–24",
          body: `**Plain Meaning:** Put off your old self, which belongs to your former manner of life and is corrupt; be renewed in the spirit of your minds, and put on the new self, created after the likeness of God.

**Application:** Repentance involves both putting off sinful patterns and putting on Christlike ones. It's not just stopping bad habits—it's replacing them with godly ones.`,
        },
        {
          id: "d3-rom1312-14",
          type: "scripture",
          title: "Put On Christ, Make No Provision for the Flesh",
          reference: "Romans 13:12–14",
          body: `**Plain Meaning:** Cast off the works of darkness and put on the armor of light. Put on the Lord Jesus Christ, and make no provision for the flesh.

**Application:** Don't set yourself up for failure by keeping easy access to sin. Remove temptation, cut off the pathways, and clothe yourself in Christ instead.`,
        },
        {
          id: "d3-col35-10",
          type: "scripture",
          title: "Put to Death What Is Earthly",
          reference: "Colossians 3:5–10",
          body: `**Plain Meaning:** Put to death what is earthly in you—sexual immorality, impurity, covetousness, and more. You have put off the old self and have put on the new self, being renewed in knowledge after the image of its Creator.

**Application:** Repentance is serious. You're not casually managing sin—you're putting it to death and living as a new creation in Christ.`,
        },
        {
          id: "d3-heb121-2",
          type: "scripture",
          title: "Lay Aside Every Weight",
          reference: "Hebrews 12:1–2",
          body: `**Plain Meaning:** Lay aside every weight and sin that clings so closely, and run with endurance the race set before you, looking to Jesus.

**Application:** Some things aren't sins, but they weigh you down. True repentance clears away everything that hinders your walk with Christ.`,
        },
      ],
    },
    {
      id: "day-4",
      dayNumber: 4,
      title: "Daily, Not Just Once",
      items: [
        {
          id: "d4-devotional",
          type: "devotional",
          title: "Day 4 — Daily, Not Just Once",
          body: `Repentance is not a one-time event at conversion; it's a daily rhythm in a believer's life. As God shines more light, you see more areas that need His cleansing and change.

A mature Christian doesn't repent less; they repent faster. Instead of defending themselves, they agree quickly with God and return to Him.

**Reflection**

Is repentance a regular part of your walk with God—or only something you think of after "big" sins?

**Prayer**

Lord, make repentance a normal, daily part of my relationship with You. Keep my heart tender, not hard.

**Shareable Truth**

"Healthy Christians don't sin less often—they repent more quickly."`,
        },
        {
          id: "d4-luke923",
          type: "scripture",
          title: "Take Up Your Cross Daily",
          reference: "Luke 9:23",
          body: `**Plain Meaning:** Jesus said, "If anyone would come after Me, let him deny himself and take up his cross daily and follow Me."

**Application:** Following Jesus isn't a one-time decision—it's a daily choice. Every day you deny self and say yes to Christ.`,
        },
        {
          id: "d4-ps13923-24",
          type: "scripture",
          title: "Search Me, O God",
          reference: "Psalm 139:23–24",
          body: `**Plain Meaning:** David prays, "Search me, O God, and know my heart; try me and know my thoughts. See if there be any grievous way in me, and lead me in the way everlasting."

**Application:** Don't wait until you stumble into sin to repent. Regularly invite God to show you areas that need His light and transformation.`,
        },
        {
          id: "d4-rev24-5",
          type: "scripture",
          title: "Remember, Repent, Return",
          reference: "Revelation 2:4–5",
          body: `**Plain Meaning:** Jesus tells the church in Ephesus: "You have abandoned the love you had at first. Remember therefore from where you have fallen; repent, and do the works you did at first."

**Application:** Even mature believers can drift. The remedy is simple: remember where you've fallen from, repent, and return to doing what you once did with passion.`,
        },
        {
          id: "d4-lam340-41",
          type: "scripture",
          title: "Examine Our Ways and Return",
          reference: "Lamentations 3:40–41",
          body: `**Plain Meaning:** "Let us test and examine our ways, and return to the Lord! Let us lift up our hearts and hands to God in heaven."

**Application:** Regular self-examination isn't morbid introspection—it's wise stewardship of your walk with God. Look honestly at your life and return to Him.`,
        },
        {
          id: "d4-matt53-4",
          type: "scripture",
          title: "Blessed Are the Poor in Spirit",
          reference: "Matthew 5:3–4",
          body: `**Plain Meaning:** "Blessed are the poor in spirit, for theirs is the kingdom of heaven. Blessed are those who mourn, for they shall be comforted."

**Application:** A healthy spiritual life includes mourning over sin—not in hopeless despair, but in humble dependence on God's grace.`,
        },
      ],
    },
    {
      id: "day-5",
      dayNumber: 5,
      title: "Resting in Forgiveness",
      items: [
        {
          id: "d5-devotional",
          type: "devotional",
          title: "Day 5 — Resting in Forgiveness",
          body: `Repentance leads somewhere: to rest in the finished work of Christ. You do not repent to earn God's love; you repent because His love has already been poured out at the cross.

When God forgives, He doesn't hold your sin over you as a weapon. He removes it as far as east is from west. You can live in joy, not fear, because the Judge has already declared you righteous in Christ.

**Reflection**

Do you find it harder to confess sin—or to actually believe you're forgiven after you do?

**Prayer**

Father, thank You that in Christ I am truly forgiven. Help me rest in Your grace and live as someone who is clean and loved.

**Shareable Truth**

"Repentance ends not in shame, but in forgiven joy."`,
        },
        {
          id: "d5-rom81",
          type: "scripture",
          title: "No Condemnation",
          reference: "Romans 8:1",
          body: `**Plain Meaning:** There is therefore now no condemnation for those who are in Christ Jesus.

**Application:** When you confess and repent, you don't live under condemnation. The verdict over you is "not guilty" because of Jesus.`,
        },
        {
          id: "d5-ps10310-12",
          type: "scripture",
          title: "As Far as East Is from West",
          reference: "Psalm 103:10–12",
          body: `**Plain Meaning:** God does not deal with us according to our sins. He has removed our transgressions from us as far as the east is from the west.

**Application:** God's forgiveness is total and final. He doesn't keep a record to throw back at you later. Your sin is gone—completely.`,
        },
        {
          id: "d5-mic718-19",
          type: "scripture",
          title: "God Delights in Steadfast Love",
          reference: "Micah 7:18–19",
          body: `**Plain Meaning:** Who is a God like You, pardoning iniquity and passing over transgression? He does not retain His anger forever, because He delights in steadfast love. He will cast all our sins into the depths of the sea.

**Application:** God doesn't forgive grudgingly—He delights in showing mercy. He throws your sins into the deepest part of the ocean, never to be retrieved.`,
        },
        {
          id: "d5-heb1014-17",
          type: "scripture",
          title: "Perfected and Remembered No More",
          reference: "Hebrews 10:14–17",
          body: `**Plain Meaning:** By a single offering, Christ has perfected for all time those who are being sanctified. The Holy Spirit testifies: "I will remember their sins and their lawless deeds no more."

**Application:** Christ's sacrifice was once for all. Your sins are not just covered—they're forgotten by God. He doesn't bring them up because Jesus has dealt with them fully.`,
        },
        {
          id: "d5-col213-14",
          type: "scripture",
          title: "Your Debt Was Nailed to the Cross",
          reference: "Colossians 2:13–14",
          body: `**Plain Meaning:** God made you alive together with Christ, having forgiven us all our trespasses, by canceling the record of debt that stood against us with its legal demands. This He set aside, nailing it to the cross.

**Application:** The legal record of your sins was nailed to the cross with Jesus. The debt is paid. The charges are dropped. You are free.`,
        },
      ],
    },
  ],
};

export const generousGivingPlan: DiscipleshipPlan = {
  id: "generous-giving-money",
  title: "Generous Giving & Money God's Way",
  subtitle: "Turning finances into worship",
  imageUrl: generousGivingImage,
  totalDays: 5,
  days: [
    {
      id: "day-1",
      dayNumber: 1,
      title: "God Owns It All",
      items: [
        {
          id: "d1-devotional",
          type: "devotional",
          title: "Day 1 — God Owns It All",
          body: `Money feels very personal—we earn it, spend it, save it. But Scripture starts here: God owns everything. You are not the owner; you are a steward.

Seeing God as the true Owner changes everything. Your question shifts from "What do I want to do with my money?" to "Lord, what do You want with what You've entrusted to me?"

**Reflection**

Do you see your money as "yours" that you control—or as God's that you manage?

**Prayer**

Lord, I acknowledge that everything I have is Yours. Teach me to be a faithful steward, not an anxious owner.

**Shareable Truth**

"You're not the owner of your money—you're the manager of God's."`,
        },
        {
          id: "d1-ps241",
          type: "scripture",
          title: "The Earth Is the Lord's",
          reference: "Psalm 24:1",
          body: `**Plain Meaning:** The earth and everything in it belong to the Lord.

**Application:** Everything you have—money, possessions, even your abilities—all belong to God. You're managing His resources, not your own.`,
        },
        {
          id: "d1-hag28",
          type: "scripture",
          title: "Silver and Gold Are God's",
          reference: "Haggai 2:8",
          body: `**Plain Meaning:** The silver and gold belong to God.

**Application:** Money is not ultimately yours. God owns it all, and He entrusts it to you for His purposes.`,
        },
        {
          id: "d1-deut818",
          type: "scripture",
          title: "God Gives You Power to Produce Wealth",
          reference: "Deuteronomy 8:18",
          body: `**Plain Meaning:** God gives you the ability to produce wealth.

**Application:** Your job, your skills, your opportunities—all come from God. Don't forget that He is the source of everything you have.`,
        },
        {
          id: "d1-1chron2911-14",
          type: "scripture",
          title: "All Things Come from God",
          reference: "1 Chronicles 29:11–14",
          body: `**Plain Meaning:** David praises God, acknowledging that all things come from Him, and we give only what is already His.

**Application:** When you give to God, you're not giving away your stuff—you're returning what was His all along.`,
        },
        {
          id: "d1-1cor42",
          type: "scripture",
          title: "Stewards Must Be Found Faithful",
          reference: "1 Corinthians 4:2",
          body: `**Plain Meaning:** It is required of stewards that they be found faithful.

**Application:** God will evaluate how you managed what He entrusted to you. The question isn't "Did you have much?" but "Were you faithful with what you had?"`,
        },
      ],
    },
    {
      id: "day-2",
      dayNumber: 2,
      title: "Guarding Your Heart from Greed",
      items: [
        {
          id: "d2-devotional",
          type: "devotional",
          title: "Day 2 — Guarding Your Heart from Greed",
          body: `Money is a good tool but a terrible master. Greed is subtle; it whispers, "Just a little more and you'll be secure." But that "little more" is never enough.

Jesus warns us that life does not consist in the abundance of possessions. The real danger is not having money; it's money having your heart.

**Reflection**

Where does money or stuff feel like it has too tight a grip on your heart?

**Prayer**

Father, free me from the love of money. I want to love You and people more than possessions.

**Shareable Truth**

"Money is a tool to use, not a god to serve."`,
        },
        {
          id: "d2-luke1215",
          type: "scripture",
          title: "Beware of Covetousness",
          reference: "Luke 12:15",
          body: `**Plain Meaning:** Jesus warns to beware of all covetousness, for life is more than possessions.

**Application:** Your worth and security don't come from what you own. Greed promises satisfaction but never delivers.`,
        },
        {
          id: "d2-1tim69-10",
          type: "scripture",
          title: "Love of Money Leads to Sorrows",
          reference: "1 Timothy 6:9–10",
          body: `**Plain Meaning:** Those who desire to be rich fall into temptation and many harmful desires. The love of money is a root of all kinds of evils.

**Application:** Money itself isn't evil, but loving it leads to destruction. It's a trap that promises freedom but delivers slavery.`,
        },
        {
          id: "d2-matt619-21",
          type: "scripture",
          title: "Where Your Treasure Is",
          reference: "Matthew 6:19–21",
          body: `**Plain Meaning:** Don't store up treasures on earth, but in heaven. Where your treasure is, there your heart will be also.

**Application:** What you spend your money on reveals what you truly value. Invest in what lasts forever, not what rusts away.`,
        },
        {
          id: "d2-heb135",
          type: "scripture",
          title: "Be Content",
          reference: "Hebrews 13:5",
          body: `**Plain Meaning:** Keep your life free from love of money, and be content with what you have, for God said, "I will never leave you or forsake you."

**Application:** Contentment comes not from having more, but from trusting that God is with you and will provide what you need.`,
        },
        {
          id: "d2-col35",
          type: "scripture",
          title: "Greed Is Idolatry",
          reference: "Colossians 3:5",
          body: `**Plain Meaning:** Put to death what is earthly in you, including covetousness, which is idolatry.

**Application:** Greed is not just a bad habit—it's worshiping money instead of God. It's spiritual adultery.`,
        },
      ],
    },
    {
      id: "day-3",
      dayNumber: 3,
      title: "Giving as Worship",
      items: [
        {
          id: "d3-devotional",
          type: "devotional",
          title: "Day 3 — Giving as Worship",
          body: `Giving is not just charity; it is worship. When you give, you are saying, "God, I trust You more than I trust this money."

God loves a cheerful giver—not because He needs your money, but because giving reflects His generous heart. He gave His Son; we give back from what He's given us.

**Reflection**

When you give, do you think more about what you're losing—or Who you're worshiping?

**Prayer**

Lord, make my giving an act of joyful worship. Use what I give to bless others and glorify Your name.

**Shareable Truth**

"Generosity is love in money form."`,
        },
        {
          id: "d3-2cor96-8",
          type: "scripture",
          title: "Sow Generously",
          reference: "2 Corinthians 9:6–8",
          body: `**Plain Meaning:** Whoever sows sparingly will also reap sparingly, and whoever sows bountifully will also reap bountifully. God loves a cheerful giver and is able to make all grace abound to you.

**Application:** Generosity isn't a loss—it's a seed. God blesses cheerful givers and supplies what they need to keep giving.`,
        },
        {
          id: "d3-prov39-10",
          type: "scripture",
          title: "Honor the Lord with Your Wealth",
          reference: "Proverbs 3:9–10",
          body: `**Plain Meaning:** Honor the Lord with your wealth and with the firstfruits of all your produce.

**Application:** Giving God your "firstfruits" means He gets first priority, not the leftovers. It's an act of worship and trust.`,
        },
        {
          id: "d3-acts2035",
          type: "scripture",
          title: "More Blessed to Give",
          reference: "Acts 20:35",
          body: `**Plain Meaning:** Jesus said it is more blessed to give than to receive.

**Application:** Generosity brings a joy that hoarding never can. When you give, you taste the heart of God.`,
        },
        {
          id: "d3-phil418-19",
          type: "scripture",
          title: "A Fragrant Offering",
          reference: "Philippians 4:18–19",
          body: `**Plain Meaning:** Paul says the gifts given are a fragrant offering, a sacrifice acceptable and pleasing to God. And God will supply every need of yours.

**Application:** Your giving is an offering to God. He sees it, is pleased by it, and promises to take care of your needs.`,
        },
        {
          id: "d3-mark1241-44",
          type: "scripture",
          title: "The Widow's Small Gift",
          reference: "Mark 12:41–44",
          body: `**Plain Meaning:** Jesus commends a poor widow who gave two small coins, saying she gave more than all the rich people because she gave out of her poverty.

**Application:** God doesn't measure your gift by the amount, but by the heart. Sacrificial giving honors God more than large gifts given casually.`,
        },
      ],
    },
    {
      id: "day-4",
      dayNumber: 4,
      title: "Wisdom in Earning, Spending, and Saving",
      items: [
        {
          id: "d4-devotional",
          type: "devotional",
          title: "Day 4 — Wisdom in Earning, Spending, and Saving",
          body: `God cares not only that you give—but also how you earn, spend, and save. Honesty at work, contentment at home, and wisdom in planning all honor Him.

Wisdom avoids both extremes: trusting money as your savior or wasting it carelessly. You seek first God's kingdom and let finances serve that priority.

**Reflection**

In your finances, where do you most lack wisdom: earning, spending, or saving?

**Prayer**

Lord, give me practical wisdom with money. Help me honor You in how I work, spend, save, and plan.

**Shareable Truth**

"Money decisions are spiritual decisions in disguise."`,
        },
        {
          id: "d4-prov104",
          type: "scripture",
          title: "Diligent Hands Bring Wealth",
          reference: "Proverbs 10:4",
          body: `**Plain Meaning:** A slack hand causes poverty, but the hand of the diligent makes rich.

**Application:** Hard work and diligence honor God. Laziness leads to need; faithful work provides for yourself and others.`,
        },
        {
          id: "d4-prov2120",
          type: "scripture",
          title: "The Wise Store Up",
          reference: "Proverbs 21:20",
          body: `**Plain Meaning:** Precious treasure and oil are in a wise person's dwelling, but a foolish man devours it.

**Application:** Saving wisely is biblical. The fool spends everything immediately; the wise prepare for the future.`,
        },
        {
          id: "d4-prov227",
          type: "scripture",
          title: "The Borrower Is Slave to the Lender",
          reference: "Proverbs 22:7",
          body: `**Plain Meaning:** The rich rules over the poor, and the borrower is the slave of the lender.

**Application:** Debt puts you in bondage. Be cautious about borrowing, and work to live within your means and become debt-free.`,
        },
        {
          id: "d4-matt631-33",
          type: "scripture",
          title: "Seek First God's Kingdom",
          reference: "Matthew 6:31–33",
          body: `**Plain Meaning:** Don't be anxious about food and clothing. Seek first the kingdom of God and His righteousness, and all these things will be added to you.

**Application:** When God's kingdom is your priority, He takes care of your needs. Worry less about money; seek Him more.`,
        },
        {
          id: "d4-1tim66-8",
          type: "scripture",
          title: "Godliness with Contentment",
          reference: "1 Timothy 6:6–8",
          body: `**Plain Meaning:** Godliness with contentment is great gain. If we have food and clothing, with these we will be content.

**Application:** True wealth is godliness combined with contentment, not a big bank account. Learn to be satisfied with what God provides.`,
        },
      ],
    },
    {
      id: "day-5",
      dayNumber: 5,
      title: "Living Generously Like Jesus",
      items: [
        {
          id: "d5-devotional",
          type: "devotional",
          title: "Day 5 — Living Generously Like Jesus",
          body: `The ultimate picture of generosity is Jesus. He became poor so that we could become rich in Him. When His grace grips your heart, you become more open-handed with your time, money, and life.

Generosity is not about how much you have; it's about how much of your heart God has. A generous life reflects a generous Savior.

**Reflection**

How can you reflect Jesus' generosity to someone in a specific, practical way this week?

**Prayer**

Jesus, You gave everything for me. Shape me into a truly generous person, not just with money, but with my whole life.

**Shareable Truth**

"You can't out-give the One who gave you everything."`,
        },
        {
          id: "d5-2cor89",
          type: "scripture",
          title: "Jesus Became Poor",
          reference: "2 Corinthians 8:9",
          body: `**Plain Meaning:** Though Jesus was rich, yet for your sake He became poor, so that you by His poverty might become rich.

**Application:** Jesus gave up everything for you. Your generosity is a reflection of the gospel—giving sacrificially because you've been given everything in Christ.`,
        },
        {
          id: "d5-eph51-2",
          type: "scripture",
          title: "Imitate God and Walk in Love",
          reference: "Ephesians 5:1–2",
          body: `**Plain Meaning:** Be imitators of God and walk in love, as Christ loved us and gave Himself up for us.

**Application:** Jesus is your model for generosity. He gave His life; you give your resources, time, and love as a reflection of Him.`,
        },
        {
          id: "d5-luke638",
          type: "scripture",
          title: "Give and It Will Be Given to You",
          reference: "Luke 6:38",
          body: `**Plain Meaning:** Give, and it will be given to you. Good measure, pressed down, shaken together, running over, will be put into your lap.

**Application:** God's measure is overflowing. You can't out-give God—He blesses generosity in ways you can't predict.`,
        },
        {
          id: "d5-titus34-7",
          type: "scripture",
          title: "God Saved Us by His Mercy",
          reference: "Titus 3:4–7",
          body: `**Plain Meaning:** When the goodness and loving kindness of God appeared, He saved us not because of works done by us, but according to His own mercy.

**Application:** You didn't earn salvation; God gave it generously. Let that generous grace overflow into how you live and give.`,
        },
        {
          id: "d5-matt2534-40",
          type: "scripture",
          title: "Serving the Least Is Serving Jesus",
          reference: "Matthew 25:34–40",
          body: `**Plain Meaning:** Jesus says that when you serve the hungry, the stranger, the sick, or the prisoner, you are serving Him.

**Application:** Generosity to those in need is generosity to Jesus Himself. How you treat the least among you reveals your heart toward Him.`,
        },
      ],
    },
  ],
};

export const spiritualWarfarePlan: DiscipleshipPlan = {
  id: "spiritual-warfare-armor",
  title: "Spiritual Warfare: The Armor of God",
  subtitle: "Standing firm in Christ's victory",
  imageUrl: spiritualWarfareImage,
  totalDays: 5,
  days: [
    {
      id: "day-1",
      dayNumber: 1,
      title: "Knowing Your Real Enemy",
      items: [
        {
          id: "d1-devotional",
          type: "devotional",
          title: "Day 1 — Knowing Your Real Enemy",
          body: `Your spouse, boss, co-worker, neighbor, or even your own emotions are not the real enemy. Scripture says your true battle is against spiritual forces of evil.

If you fight the wrong enemy with the wrong weapons, you will always feel defeated. God calls you to be strong in the Lord, not in your own strength, and to put on the armor He provides.

**Reflection**

Where have you been treating people as the main enemy instead of recognizing the spiritual battle behind the scenes?

**Prayer**

Lord, open my eyes to the real battle. Teach me to be strong in You, not in myself, and to respond with spiritual weapons.

**Shareable Truth**

"People are not your enemy—sin and Satan are."`,
        },
        {
          id: "d1-eph610-12",
          type: "scripture",
          title: "Not Against Flesh and Blood",
          reference: "Ephesians 6:10–12",
          body: `**Plain Meaning:** Be strong in the Lord. Your struggle is not against flesh and blood, but against spiritual forces of evil.

**Application:** When conflict arises, remember the real enemy is spiritual. People are not your opponents—they're fellow image-bearers caught in the same war.`,
        },
        {
          id: "d1-2cor103-4",
          type: "scripture",
          title: "Weapons with Divine Power",
          reference: "2 Corinthians 10:3–4",
          body: `**Plain Meaning:** Though we walk in the flesh, we are not waging war according to the flesh. Our weapons have divine power to destroy strongholds.

**Application:** You can't fight spiritual battles with human strategies. Prayer, Scripture, and faith are your real weapons.`,
        },
        {
          id: "d1-1pet58-9",
          type: "scripture",
          title: "Resist the Devil",
          reference: "1 Peter 5:8–9",
          body: `**Plain Meaning:** Be sober-minded and watchful. Your adversary the devil prowls like a roaring lion, seeking someone to devour. Resist him, firm in your faith.

**Application:** The enemy is real and active. Don't be naive or fearful—be alert and stand firm in Christ.`,
        },
        {
          id: "d1-john1010",
          type: "scripture",
          title: "The Thief Comes to Destroy",
          reference: "John 10:10",
          body: `**Plain Meaning:** The thief comes only to steal, kill, and destroy. Jesus came that you may have life and have it abundantly.

**Application:** The enemy's goal is destruction. Jesus' goal is abundant life. Recognize which voice you're listening to.`,
        },
        {
          id: "d1-col213-15",
          type: "scripture",
          title: "Christ Disarmed Spiritual Rulers",
          reference: "Colossians 2:13–15",
          body: `**Plain Meaning:** God made you alive with Christ, having forgiven all your trespasses. He disarmed the rulers and authorities and put them to open shame, triumphing over them in the cross.

**Application:** The enemy has been defeated at the cross. You fight from victory, not for victory.`,
        },
      ],
    },
    {
      id: "day-2",
      dayNumber: 2,
      title: "The Belt of Truth and Breastplate of Righteousness",
      items: [
        {
          id: "d2-devotional",
          type: "devotional",
          title: "Day 2 — The Belt of Truth and Breastplate of Righteousness",
          body: `The belt of truth holds everything together. Without truth, your armor falls apart. God's truth counters lies about who He is, who you are, and what is right.

The breastplate of righteousness protects your heart. This is not your own goodness—it is Christ's righteousness credited to you. When the enemy accuses, you stand not on your performance but on Jesus' finished work.

**Reflection**

What lie about God or yourself do you need to replace with truth? Are you standing in your righteousness—or Christ's?

**Prayer**

Jesus, fasten me with Your truth and guard my heart with Your righteousness. Let me stand in what You've done, not what I feel.

**Shareable Truth**

"Truth holds you together; Christ's righteousness guards your heart."`,
        },
        {
          id: "d2-eph613-14",
          type: "scripture",
          title: "Stand with Truth and Righteousness",
          reference: "Ephesians 6:13–14",
          body: `**Plain Meaning:** Take up the whole armor of God so you can stand. Stand therefore, having fastened on the belt of truth and the breastplate of righteousness.

**Application:** Truth and righteousness are foundational. Without them, the rest of your armor doesn't work.`,
        },
        {
          id: "d2-john1717",
          type: "scripture",
          title: "God's Word Is Truth",
          reference: "John 17:17",
          body: `**Plain Meaning:** Jesus prays, "Sanctify them in the truth; Your word is truth."

**Application:** The Word of God is your standard for truth. When the enemy lies, the Bible exposes it.`,
        },
        {
          id: "d2-john831-32",
          type: "scripture",
          title: "The Truth Sets You Free",
          reference: "John 8:31–32",
          body: `**Plain Meaning:** Jesus said, "If you abide in My word, you are truly My disciples, and you will know the truth, and the truth will set you free."

**Application:** Knowing and living in God's truth brings freedom. Lies keep you in bondage; truth liberates.`,
        },
        {
          id: "d2-2cor521",
          type: "scripture",
          title: "Become God's Righteousness in Christ",
          reference: "2 Corinthians 5:21",
          body: `**Plain Meaning:** God made Jesus who knew no sin to be sin for us, so that in Him we might become the righteousness of God.

**Application:** Your righteousness before God is not your own—it's Christ's. When the enemy accuses, point to the cross.`,
        },
        {
          id: "d2-rom833-34",
          type: "scripture",
          title: "Who Can Bring a Charge?",
          reference: "Romans 8:33–34",
          body: `**Plain Meaning:** Who shall bring any charge against God's elect? It is God who justifies. Who is to condemn? Christ Jesus is the one who died and was raised, who is at the right hand of God interceding for us.

**Application:** Satan is the accuser, but God is the justifier. When accusations come, remember: you are justified by Christ, not condemned.`,
        },
      ],
    },
    {
      id: "day-3",
      dayNumber: 3,
      title: "Gospel Shoes and the Shield of Faith",
      items: [
        {
          id: "d3-devotional",
          type: "devotional",
          title: "Day 3 — Gospel Shoes and the Shield of Faith",
          body: `The shoes of the gospel of peace mean you are ready to move with the message of Christ. You stand firm because you know you have peace with God, and you step forward to share that peace with others.

The shield of faith extinguishes the flaming arrows of the evil one: doubt, accusation, fear, discouragement. Faith doesn't ignore those arrows—it lifts up trust in who God is and what He has said.

**Reflection**

Are your "feet" ready to share the gospel? What fiery dart does the enemy often shoot at you, and how can you lift the shield of faith against it?

**Prayer**

Lord, anchor me in the peace of the gospel and make me ready to share it. Strengthen my faith to extinguish every lie and fear.

**Shareable Truth**

"Peace with God makes you steady; faith in God makes you shielded."`,
        },
        {
          id: "d3-eph615-16",
          type: "scripture",
          title: "Feet Fitted with the Gospel of Peace",
          reference: "Ephesians 6:15–16",
          body: `**Plain Meaning:** Have your feet fitted with the readiness given by the gospel of peace. Take up the shield of faith, with which you can extinguish all the flaming darts of the evil one.

**Application:** Peace with God makes you immovable. Faith in God protects you from the enemy's attacks.`,
        },
        {
          id: "d3-rom51",
          type: "scripture",
          title: "Peace with God Through Faith",
          reference: "Romans 5:1",
          body: `**Plain Meaning:** Therefore, since we have been justified by faith, we have peace with God through our Lord Jesus Christ.

**Application:** You're not at war with God anymore. That peace is your foundation for every battle you face.`,
        },
        {
          id: "d3-isaiah527",
          type: "scripture",
          title: "Beautiful Are the Feet",
          reference: "Isaiah 52:7",
          body: `**Plain Meaning:** How beautiful upon the mountains are the feet of him who brings good news, who publishes peace.

**Application:** When you carry the gospel, you bring the best news in the world. Be ready to share it wherever you go.`,
        },
        {
          id: "d3-heb111-6",
          type: "scripture",
          title: "Faith Is Assurance",
          reference: "Hebrews 11:1, 6",
          body: `**Plain Meaning:** Faith is the assurance of things hoped for, the conviction of things not seen. Without faith it is impossible to please God.

**Application:** Faith isn't wishful thinking—it's confidence in God's character and promises, even when you can't see the outcome yet.`,
        },
        {
          id: "d3-ps914-5",
          type: "scripture",
          title: "God Is a Shield",
          reference: "Psalm 91:4–5",
          body: `**Plain Meaning:** God will cover you with His pinions; under His wings you will find refuge. His faithfulness is a shield. You will not fear the terror of the night, nor the arrow that flies by day.

**Application:** God Himself is your shield. When fear and doubt come like arrows, run to Him for refuge.`,
        },
      ],
    },
    {
      id: "day-4",
      dayNumber: 4,
      title: "The Helmet of Salvation and Sword of the Spirit",
      items: [
        {
          id: "d4-devotional",
          type: "devotional",
          title: "Day 4 — The Helmet of Salvation and Sword of the Spirit",
          body: `The helmet of salvation guards your mind. When doubts, accusations, and fears attack your assurance, you remember whose you are and what Christ has done.

The sword of the Spirit is the Word of God—your only offensive weapon in the armor list. Jesus used Scripture to defeat temptation; you can do the same. Quoted, meditated on, believed, and obeyed, the Word becomes a sword in your hand.

**Reflection**

What thoughts regularly attack your confidence in Christ? How can specific Scriptures become your sword against them?

**Prayer**

Jesus, cover my mind with the assurance of salvation and put Your Word in my heart and mouth as a sharp, effective sword.

**Shareable Truth**

"Assurance protects your mind; Scripture arms your hand."`,
        },
        {
          id: "d4-eph617",
          type: "scripture",
          title: "Helmet of Salvation and Sword of the Spirit",
          reference: "Ephesians 6:17",
          body: `**Plain Meaning:** Take the helmet of salvation and the sword of the Spirit, which is the word of God.

**Application:** Salvation secures your mind; Scripture equips your hand. Both are essential for spiritual warfare.`,
        },
        {
          id: "d4-1thess58",
          type: "scripture",
          title: "Put On the Helmet of Hope",
          reference: "1 Thessalonians 5:8",
          body: `**Plain Meaning:** Since we belong to the day, let us be sober, having put on the breastplate of faith and love, and for a helmet the hope of salvation.

**Application:** The helmet is the hope of salvation—confidence that God will finish what He started in you.`,
        },
        {
          id: "d4-rom838-39",
          type: "scripture",
          title: "Nothing Can Separate You from God's Love",
          reference: "Romans 8:38–39",
          body: `**Plain Meaning:** I am sure that neither death nor life, nor angels nor rulers, nor things present nor things to come, nor powers, nor height nor depth, nor anything else in all creation, will be able to separate us from the love of God in Christ Jesus our Lord.

**Application:** When the enemy whispers that you're not saved or that God has abandoned you, stand on this truth: nothing can separate you from His love.`,
        },
        {
          id: "d4-matt41-11",
          type: "scripture",
          title: "Jesus Uses Scripture Against Temptation",
          reference: "Matthew 4:1–11",
          body: `**Plain Meaning:** Jesus was tempted by the devil and responded every time with "It is written…"

**Application:** Jesus defeated Satan with Scripture, not feelings or arguments. Follow His example: fight lies with God's Word.`,
        },
        {
          id: "d4-ps1496",
          type: "scripture",
          title: "A Two-Edged Sword in Their Hand",
          reference: "Psalm 149:6",
          body: `**Plain Meaning:** Let the high praises of God be in their throats and a two-edged sword in their hands.

**Application:** Worship and the Word go together. When you praise God and wield His Word, you're armed for battle.`,
        },
      ],
    },
    {
      id: "day-5",
      dayNumber: 5,
      title: "Praying in the Spirit and Standing Together",
      items: [
        {
          id: "d5-devotional",
          type: "devotional",
          title: "Day 5 — Praying in the Spirit and Standing Together",
          body: `Spiritual warfare isn't just about armor—it's also about prayer. Paul ends the armor passage by calling believers to pray at all times in the Spirit, for themselves and for others.

You were never meant to fight alone. Soldiers stand in formation, not isolation. The church is called to watch, pray, and strengthen one another in the battle.

**Reflection**

Who can stand with you in prayer in your current battles—and who can you stand with?

**Prayer**

Lord, teach me to pray as part of my armor. Surround me with brothers and sisters who will stand and fight with me in the Spirit.

**Shareable Truth**

"You weren't given armor to fight alone—prayer links soldiers together."`,
        },
        {
          id: "d5-eph618-20",
          type: "scripture",
          title: "Pray at All Times in the Spirit",
          reference: "Ephesians 6:18–20",
          body: `**Plain Meaning:** Pray at all times in the Spirit, with all prayer and supplication. Keep alert with all perseverance, making supplication for all the saints.

**Application:** The armor isn't complete without prayer. Constant, Spirit-led prayer is how you stay connected to God and the body of Christ in the fight.`,
        },
        {
          id: "d5-james516",
          type: "scripture",
          title: "Pray for One Another",
          reference: "James 5:16",
          body: `**Plain Meaning:** Confess your sins to one another and pray for one another, that you may be healed. The prayer of a righteous person has great power.

**Application:** Don't hide your struggles. Bring them to trusted believers who will pray with you and for you.`,
        },
        {
          id: "d5-heb1024-25",
          type: "scripture",
          title: "Stir One Another Up",
          reference: "Hebrews 10:24–25",
          body: `**Plain Meaning:** Let us consider how to stir up one another to love and good works, not neglecting to meet together, but encouraging one another.

**Application:** You need the church, and the church needs you. Don't isolate—gather, encourage, and fight together.`,
        },
        {
          id: "d5-gal62",
          type: "scripture",
          title: "Bear One Another's Burdens",
          reference: "Galatians 6:2",
          body: `**Plain Meaning:** Bear one another's burdens, and so fulfill the law of Christ.

**Application:** When a fellow believer is struggling spiritually, step in. Pray for them, encourage them, and help carry their load.`,
        },
        {
          id: "d5-matt1819-20",
          type: "scripture",
          title: "Jesus Is Present Where Believers Agree",
          reference: "Matthew 18:19–20",
          body: `**Plain Meaning:** If two of you agree on earth about anything they ask, it will be done for them by My Father in heaven. For where two or three are gathered in My name, there am I among them.

**Application:** Corporate prayer has power. When believers unite in prayer, Jesus is present, and the Father listens.`,
        },
      ],
    },
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
  generousGivingPlan,
  spiritualWarfarePlan,
];
