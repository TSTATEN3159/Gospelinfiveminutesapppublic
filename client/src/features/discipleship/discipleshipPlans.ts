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
import identityMirrorImage from '@assets/stock_images/person_looking_in_mi_ea96f742.jpg';
import overcomingFearImage from '@assets/stock_images/peaceful_calm_person_7cf34fa8.jpg';
import timeWithGodImage from '@assets/stock_images/person_praying_with__10196106.jpg';
import servingJesusImage from '@assets/stock_images/helping_hands_commun_81ec3db5.jpg';
import marriageLoveImage from '@assets/stock_images/wedding_rings_covena_8f9f1053.jpg';
import parentingGospelImage from '@assets/stock_images/parent_child_family__30b5d4ec.jpg';
import workCallingImage from '@assets/stock_images/professional_person__259aad65.jpg';
import purityWorldImage from '@assets/stock_images/pure_heart_clean_han_1a005796.jpg';
import sufferingFaithfulnessImage from '@assets/stock_images/person_in_difficult__faffc05a.jpg';
import prayerLifeImage from '@assets/stock_images/hands_folded_in_pray_b98684b0.jpg';
import ruggedChurchImage from '@assets/stock_images/old_rustic_stone_chu_610102d9.jpg';
import manAtBarImage from '@assets/generated_images/man_contemplating_at_bar.png';

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
          body: `
**Scripture (KJV)**  
> "For all have sinned, and come short of the glory of God;"

**Meaning:** Every human being, without exception, has sinned and fallen short of God's perfect standard. Sin is not just "big crimes"; it is any thought, action, or desire that fails to love God with all your heart.  
**Application:** This verse removes all excuses and comparisons. You don't come to God as a "pretty good person" needing a small touch-up; you come as a sinner needing a Savior.
          `.trim(),
        },
        {
          id: "d1-rom310-12",
          type: "scripture",
          title: "None Righteous on Their Own",
          reference: "Romans 3:10–12",
          body: `
**Scripture (KJV)**  
> "As it is written, There is none righteous, no, not one:  
> There is none that understandeth, there is none that seeketh after God.  
> They are all gone out of the way, they are together become unprofitable;  
> there is none that doeth good, no, not one."

**Meaning:** No one, by nature, lives in a way that is perfectly right before God. Left to ourselves, we do not seek God as He truly is.  
**Application:** This kills spiritual pride. You don't need help polishing your goodness; you need God to rescue you from spiritual death.
          `.trim(),
        },
        {
          id: "d1-heb927",
          type: "scripture",
          title: "Appointment with Judgment",
          reference: "Hebrews 9:27",
          body: `
**Scripture (KJV)**  
> "And as it is appointed unto men once to die, but after this the judgment:"

**Meaning:** Every person dies once and then faces God's judgment. There are no second chances, reincarnations, or do-overs.  
**Application:** This makes today urgent. You don't know your day of death, but you do know you will stand before God. Now is the time to seek Him.
          `.trim(),
        },
        {
          id: "d1-matt713-14",
          type: "scripture",
          title: "Two Roads, Two Destinations",
          reference: "Matthew 7:13–14",
          body: `
**Scripture (KJV)**  
> "Enter ye in at the strait gate: for wide is the gate, and broad is the way,  
> that leadeth to destruction, and many there be which go in thereat:  
> Because strait is the gate, and narrow is the way, which leadeth unto life,  
> and few there be that find it."

**Meaning:** Jesus describes two gates and two roads: the wide road many travel that leads to destruction, and the narrow road that leads to life.  
**Application:** You are on one of those roads right now. Faith in Christ is not one option among many equal paths; it is the narrow way that leads to life.
          `.trim(),
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
          body: `
**Scripture (KJV)**  
> "But your iniquities have separated between you and your God,  
> and your sins have hid his face from you, that he will not hear."

**Meaning:** Sin creates a separation between people and God, so that He hides His face and does not hear.  
**Application:** The biggest problem with sin is not what it does to your reputation—it is what it does to your relationship with God.
          `.trim(),
        },
        {
          id: "d2-rom62-23",
          type: "scripture",
          title: "Sin's Paycheck: Death",
          reference: "Romans 6:23",
          body: `
**Scripture (KJV)**  
> "For the wages of sin is death; but the gift of God is eternal life  
> through Jesus Christ our Lord."

**Meaning:** The result, or wage, of sin is death—spiritual separation from God now and forever. But God offers eternal life as a gift through Jesus Christ.  
**Application:** You don't "get away" with sin; you get paid for it—with death. But God offers a different paycheck: eternal life, undeserved, through His Son.
          `.trim(),
        },
        {
          id: "d2-ps514",
          type: "scripture",
          title: "Against God First",
          reference: "Psalm 51:4",
          body: `
**Scripture (KJV)**  
> "Against thee, thee only, have I sinned, and done this evil in thy sight:  
> that thou mightest be justified when thou speakest,  
> and be clear when thou judgest."

**Meaning:** David confesses that his sin, though it hurt others, was ultimately against God Himself.  
**Application:** Sin is not only about hurting people; it is about offending a holy God. That is why only God can ultimately forgive it.
          `.trim(),
        },
        {
          id: "d2-james417",
          type: "scripture",
          title: "Respectable Sins",
          reference: "James 4:17",
          body: `
**Scripture (KJV)**  
> "Therefore to him that knoweth to do good, and doeth it not,  
> to him it is sin."

**Meaning:** Knowing the right thing to do and refusing to do it is also sin.  
**Application:** Sin is not just doing bad things; it is also failing to do the good God has shown you. This means no one can claim to be innocent.
          `.trim(),
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
          body: `
**Scripture (KJV)**  
> "Two men went up into the temple to pray; the one a Pharisee, and the other a publican.  
> The Pharisee stood and prayed thus with himself, God, I thank thee, that I am not as other men are,  
> extortioners, unjust, adulterers, or even as this publican.  
> I fast twice in the week, I give tithes of all that I possess.  
> And the publican, standing afar off, would not lift up so much as his eyes unto heaven,  
> but smote upon his breast, saying, God be merciful to me a sinner.  
> I tell you, this man went down to his house justified rather than the other:  
> for every one that exalteth himself shall be abased; and he that humbleth himself shall be exalted."

**Meaning:** Jesus contrasts a proud Pharisee trusting his own goodness with a tax collector crying for mercy. God accepts the humble sinner, not the self-righteous man.  
**Application:** God is not impressed with religious pride. The person who admits their guilt and casts themselves on God's mercy goes home justified.
          `.trim(),
        },
        {
          id: "d3-rom323-24",
          type: "scripture",
          title: "Justified as a Gift",
          reference: "Romans 3:23–24",
          body: `
**Scripture (KJV)**  
> "For all have sinned, and come short of the glory of God;  
> Being justified freely by his grace through the redemption that is in Christ Jesus:"

**Meaning:** All have sinned, yet God justifies (declares righteous) sinners freely by His grace through the redemption that is in Christ Jesus.  
**Application:** You cannot buy or earn justification. It is a free act of God's grace because Jesus paid the full price.
          `.trim(),
        },
        {
          id: "d3-isaiah646",
          type: "scripture",
          title: "Our Righteousness Is Not Enough",
          reference: "Isaiah 64:6",
          body: `
**Scripture (KJV)**  
> "But we are all as an unclean thing, and all our righteousnesses are as filthy rags;  
> and we all do fade as a leaf; and our iniquities, like the wind, have taken us away."

**Meaning:** Even what we think of as righteous deeds are like "filthy rags" before a perfectly holy God.  
**Application:** Compared to other people, you may look good. Compared to God's holiness, even your best efforts fall short.
          `.trim(),
        },
        {
          id: "d3-eph28-9",
          type: "scripture",
          title: "Saved by Grace, Not Works",
          reference: "Ephesians 2:8–9",
          body: `
**Scripture (KJV)**  
> "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God:  
> Not of works, lest any man should boast."

**Meaning:** Salvation is by grace through faith. It is God's gift—not a result of works—so that no one can boast.  
**Application:** Any system that says "do enough good and you will be saved" contradicts this verse. The Christian rests in grace, not performance.
          `.trim(),
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
          body: `
**Scripture (KJV)**  
> "But he was wounded for our transgressions, he was bruised for our iniquities:  
> the chastisement of our peace was upon him; and with his stripes we are healed.  
> All we like sheep have gone astray; we have turned every one to his own way;  
> and the LORD hath laid on him the iniquity of us all."

**Meaning:** The suffering Servant was pierced and crushed for **our** sins; the punishment that brings us peace fell on Him.  
**Application:** Your sin did not just disappear; it was placed on Christ. He took what you deserve so you can receive what He deserves.
          `.trim(),
        },
        {
          id: "d4-2cor521",
          type: "scripture",
          title: "The Great Exchange",
          reference: "2 Corinthians 5:21",
          body: `
**Scripture (KJV)**  
> "For he hath made him to be sin for us, who knew no sin;  
> that we might be made the righteousness of God in him."

**Meaning:** God made Jesus, who knew no sin, to be sin for us, so that in Him we might become the righteousness of God.  
**Application:** At the cross, your sin was counted to Christ, and His righteousness is counted to you when you trust Him.
          `.trim(),
        },
        {
          id: "d4-rom58",
          type: "scripture",
          title: "Love in the Middle of Our Sin",
          reference: "Romans 5:8",
          body: `
**Scripture (KJV)**  
> "But God commendeth his love toward us, in that, while we were yet sinners,  
> Christ died for us."

**Meaning:** God demonstrates His love by Christ dying for us **while** we were still sinners.  
**Application:** God did not wait for you to clean up your life. The cross proves His love came first.
          `.trim(),
        },
        {
          id: "d4-1pet224",
          type: "scripture",
          title: "He Bore Our Sins",
          reference: "1 Peter 2:24",
          body: `
**Scripture (KJV)**  
> "Who his own self bare our sins in his own body on the tree,  
> that we, being dead to sins, should live unto righteousness:  
> by whose stripes ye were healed."

**Meaning:** Jesus bore our sins in His body on the tree so we might die to sin and live to righteousness.  
**Application:** The cross is not just forgiveness; it is also power to live a new life, free from sin's rule.
          `.trim(),
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
          body: `
**Scripture (KJV)**  
> "And saying, The time is fulfilled, and the kingdom of God is at hand:  
> repent ye, and believe the gospel."

**Meaning:** Jesus announces the kingdom of God and calls people to repent and believe the gospel.  
**Application:** The response Jesus calls for is clear: turn from sin, turn to Him in faith. Both are needed.
          `.trim(),
        },
        {
          id: "d5-rom109-10",
          type: "scripture",
          title: "Confess and Believe",
          reference: "Romans 10:9–10",
          body: `
**Scripture (KJV)**  
> "That if thou shalt confess with thy mouth the Lord Jesus,  
> and shalt believe in thine heart that God hath raised him from the dead,  
> thou shalt be saved.  
> For with the heart man believeth unto righteousness;  
> and with the mouth confession is made unto salvation."

**Meaning:** If you confess Jesus as Lord and believe God raised Him from the dead, you will be saved.  
**Application:** Salvation is tied to a real faith in the risen Christ and a heart-level surrender to His lordship.
          `.trim(),
        },
        {
          id: "d5-john112",
          type: "scripture",
          title: "Receiving Christ",
          reference: "John 1:12",
          body: `
**Scripture (KJV)**  
> "But as many as received him, to them gave he power to become the sons of God,  
> even to them that believe on his name:"

**Meaning:** Those who receive Jesus and believe in His name are given the right to become children of God.  
**Application:** Eternal life is not automatic; you must personally receive Christ by faith.
          `.trim(),
        },
        {
          id: "d5-1john513",
          type: "scripture",
          title: "You Can Know You Have Eternal Life",
          reference: "1 John 5:13",
          body: `
**Scripture (KJV)**  
> "These things have I written unto you that believe on the name of the Son of God;  
> that ye may know that ye have eternal life,  
> and that ye may believe on the name of the Son of God."

**Meaning:** John writes so that believers may **know** they have eternal life.  
**Application:** God wants you to have settled confidence in Christ, not constant fear about your eternal destiny.
          `.trim(),
        },
      ],
    },
  ],
};

export const lifeInSpiritPlan: DiscipleshipPlan = {
  id: "life-in-spirit",
  title: "Life in the Spirit",
  subtitle: "Learning to live by the power of the Holy Spirit",
  imageUrl: ruggedChurchImage,
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
          body: `**Scripture (KJV)**  
> "There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit. For the law of the Spirit of life in Christ Jesus hath made me free from the law of sin and death."

**Meaning:** For those who are in Christ Jesus, there is now no condemnation. The law of the Spirit of life has set you free from the law of sin and death.  
**Application:** You don't live under a guilty verdict anymore. The Spirit marks you as someone liberated from sin's death sentence.`.trim(),
        },
        {
          id: "lis-d1-john3-5-6",
          type: "scripture",
          title: "Born of Water and the Spirit",
          reference: "John 3:5–6",
          body: `**Scripture (KJV)**  
> "Jesus answered, Verily, verily, I say unto thee, Except a man be born of water and of the Spirit, he cannot enter into the kingdom of God. That which is born of the flesh is flesh; and that which is born of the Spirit is spirit."

**Meaning:** Jesus explains that you must be born "of water and the Spirit" to enter the kingdom of God. What is born of the flesh is flesh; what is born of the Spirit is spirit.  
**Application:** You don't enter God's kingdom by heritage, effort, or religion, but by a new birth the Spirit brings.`.trim(),
        },
        {
          id: "lis-d1-titus3-5-6",
          type: "scripture",
          title: "Wash and Renew",
          reference: "Titus 3:5–6",
          body: `**Scripture (KJV)**  
> "Not by works of righteousness which we have done, but according to his mercy he saved us, by the washing of regeneration, and renewing of the Holy Ghost; Which he shed on us abundantly through Jesus Christ our Saviour;"

**Meaning:** God saved us not by works of righteousness we have done, but according to His mercy, by the washing of regeneration and renewal of the Holy Spirit.  
**Application:** Your new life is mercy from start to finish. The Spirit washed you and made you new; you cannot boast in yourself.`.trim(),
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
          body: `**Scripture (KJV)**  
> "For ye have not received the spirit of bondage again to fear; but ye have received the Spirit of adoption, whereby we cry, Abba, Father. The Spirit itself beareth witness with our spirit, that we are the children of God:"

**Meaning:** You did not receive a spirit of slavery to fall back into fear, but the Spirit of adoption, who cries "Abba, Father," and bears witness that you are God's child.  
**Application:** Fear no longer has the final word. The Spirit in you continually reminds you that you belong to a Father, not a slavemaster.`.trim(),
        },
        {
          id: "lis-d2-1cor6-19-20",
          type: "scripture",
          title: "Temple of the Holy Spirit",
          reference: "1 Corinthians 6:19–20",
          body: `**Scripture (KJV)**  
> "What? know ye not that your body is the temple of the Holy Ghost which is in you, which ye have of God, and ye are not your own? For ye are bought with a price: therefore glorify God in your body, and in your spirit, which are God’s."

**Meaning:** Your body is a temple of the Holy Spirit, whom you have from God. You are not your own; you were bought with a price.  
**Application:** Your body and life have a holy purpose now. You don't belong to sin, to culture, or even to yourself—you belong to God.`.trim(),
        },
        {
          id: "lis-d2-eph1-13-14",
          type: "scripture",
          title: "Sealed by the Spirit",
          reference: "Ephesians 1:13–14",
          body: `**Scripture (KJV)**  
> "In whom ye also trusted, after that ye heard the word of truth, the gospel of your salvation: in whom also after that ye believed, ye were sealed with that holy Spirit of promise, Which is the earnest of our inheritance until the redemption of the purchased possession, unto the praise of his glory."

**Meaning:** When you believed the gospel, you were sealed with the Holy Spirit, who is a guarantee of your inheritance until the full redemption.  
**Application:** The Spirit is God's down payment that He will finish what He started in you. Your future with Him is secure.`.trim(),
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
          body: `**Scripture (KJV)**  
> "This I say then, Walk in the Spirit, and ye shall not fulfil the lust of the flesh. For the flesh lusteth against the Spirit, and the Spirit against the flesh: and these are contrary the one to the other: so that ye cannot do the things that ye would."

**Meaning:** If you walk by the Spirit you will not gratify the desires of the flesh, because the flesh and Spirit are opposed to each other.  
**Application:** You win the battle with sin not by sheer willpower, but by a Spirit-led walk that leaves less room for the flesh.`.trim(),
        },
        {
          id: "lis-d3-rom8-5-6",
          type: "scripture",
          title: "Mindset of Life and Peace",
          reference: "Romans 8:5–6",
          body: `**Scripture (KJV)**  
> "For they that are after the flesh do mind the things of the flesh; but they that are after the Spirit the things of the Spirit. For to be carnally minded is death; but to be spiritually minded is life and peace."

**Meaning:** Those who live according to the Spirit set their minds on the things of the Spirit; this mindset is life and peace.  
**Application:** What you habitually think about reveals whether you're living by the flesh or by the Spirit. Guard your inner focus.`.trim(),
        },
        {
          id: "lis-d3-col3-1-3",
          type: "scripture",
          title: "Set Your Mind Above",
          reference: "Colossians 3:1–3",
          body: `**Scripture (KJV)**  
> "If ye then be risen with Christ, seek those things which are above, where Christ sitteth on the right hand of God. Set your affection on things above, not on things on the earth. For ye are dead, and your life is hid with Christ in God."

**Meaning:** Since you have been raised with Christ, seek the things above and set your mind there, because your life is hidden with Christ in God.  
**Application:** Your true life is anchored in heaven, not earth. Let that reality shape your choices and desires.`.trim(),
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
          body: `**Scripture (KJV)**  
> "For as many as are led by the Spirit of God, they are the sons of God."

**Meaning:** All who are led by the Spirit of God are sons of God.  
**Application:** Being led by the Spirit is a family mark. Your guidance is not random; it flows from your sonship.`.trim(),
        },
        {
          id: "lis-d4-john16-13",
          type: "scripture",
          title: "Spirit of Truth Guides",
          reference: "John 16:13",
          body: `**Scripture (KJV)**  
> "Howbeit when he, the Spirit of truth, is come, he will guide you into all truth: for he shall not speak of himself; but whatsoever he shall hear, that shall he speak: and he will shew you things to come."

**Meaning:** The Spirit of truth will guide you into all the truth and glorify Jesus.  
**Application:** The Spirit's guidance will always agree with Scripture and lead you toward Jesus, not away from Him.`.trim(),
        },
        {
          id: "lis-d4-isa30-21",
          type: "scripture",
          title: "This Is the Way, Walk in It",
          reference: "Isaiah 30:21",
          body: `**Scripture (KJV)**  
> "And thine ears shall hear a word behind thee, saying, This is the way, walk ye in it, when ye turn to the right hand, and when ye turn to the left."

**Meaning:** God promises that you will hear a word behind you saying, "This is the way, walk in it," when you turn to the right or left.  
**Application:** God is not trying to confuse you. As you seek Him, He faithfully directs your steps.`.trim(),
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
          body: `**Scripture (KJV)**  
> "But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, Meekness, temperance: against such there is no law."

**Meaning:** The fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control.  
**Application:** The Spirit aims to change your character, not just your circumstances. These traits are signs of His work in you.`.trim(),
        },
        {
          id: "lis-d5-acts1-8",
          type: "scripture",
          title: "Power to Witness",
          reference: "Acts 1:8",
          body: `**Scripture (KJV)**  
> "But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judæa, and in Samaria, and unto the uttermost part of the earth."

**Meaning:** You will receive power when the Holy Spirit comes upon you, and you will be Jesus' witnesses to the ends of the earth.  
**Application:** The Spirit empowers you to speak of Christ with boldness and love, right where you are.`.trim(),
        },
        {
          id: "lis-d5-phil2-13",
          type: "scripture",
          title: "God at Work in You",
          reference: "Philippians 2:13",
          body: `**Scripture (KJV)**  
> "For it is God which worketh in you both to will and to do of his good pleasure."

**Meaning:** God is at work in you, both to will and to work for His good pleasure.  
**Application:** Even your desire to obey is a work of the Spirit. You are not alone in the struggle; God Himself is working within you.`.trim(),
        },
      ],
    },
  ],
};

export const breakingFreeAddictionPlan: DiscipleshipPlan = {
  id: "breaking-free-addiction",
  title: "Breaking Free from Addiction",
  subtitle: "Walking out of bondage and into freedom in Christ",
  imageUrl: manAtBarImage,
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
          body: `**Scripture (KJV)**  
> "Jesus answered them, Verily, verily, I say unto you, Whosoever committeth sin is the servant of sin. And the servant abideth not in the house for ever: but the Son abideth ever. If the Son therefore shall make you free, ye shall be free indeed."

**Meaning:** Whoever practices sin is a slave to sin, but the Son sets people truly free.  
**Application:** Addiction is spiritual slavery, but Jesus has real power to break chains and give true freedom.`.trim(),
        },
        {
          id: "bfa-d1-rom7-18-19",
          type: "scripture",
          title: "The Inner Struggle",
          reference: "Romans 7:18–19",
          body: `**Scripture (KJV)**  
> "For I know that in me (that is, in my flesh,) dwelleth no good thing: for to will is present with me; but how to perform that which is good I find not. For the good that I would I do not: but the evil which I would not, that I do."

**Meaning:** Paul describes wanting to do good but experiencing another power at work that pulls him into what he hates.  
**Application:** You are not crazy or alone in the inner battle. Scripture understands the struggle and points you to grace, not self-reliance.`.trim(),
        },
        {
          id: "bfa-d1-ps139-23-24",
          type: "scripture",
          title: "Search Me, O God",
          reference: "Psalm 139:23–24",
          body: `**Scripture (KJV)**  
> "Search me, O God, and know my heart: try me, and know my thoughts: And see if there be any wicked way in me, and lead me in the way everlasting."

**Meaning:** The psalmist invites God to search his heart and reveal any grievous way.  
**Application:** Ask God to put His finger on the real issues—beneath the surface habits to the heart-level idols.`.trim(),
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
          body: `**Scripture (KJV)**  
> "But if we walk in the light, as he is in the light, we have fellowship one with another, and the blood of Jesus Christ his Son cleanseth us from all sin. If we say that we have no sin, we deceive ourselves, and the truth is not in us. If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness."

**Meaning:** Walking in the light means honesty before God; as we confess our sins, He is faithful to forgive and cleanse us.  
**Application:** Freedom requires stepping out of hiding. Confession is not the end of you; it's the beginning of cleansing.`.trim(),
        },
        {
          id: "bfa-d2-prov28-13",
          type: "scripture",
          title: "Concealed or Confessed?",
          reference: "Proverbs 28:13",
          body: `**Scripture (KJV)**  
> "He that covereth his sins shall not prosper: but whoso confesseth and forsaketh them shall have mercy."

**Meaning:** Those who conceal sins do not prosper, but those who confess and forsake them obtain mercy.  
**Application:** Hiding your addiction ensures its power over you. Mercy flows where sin is confessed and abandoned.`.trim(),
        },
        {
          id: "bfa-d2-james5-16",
          type: "scripture",
          title: "Healing in Community",
          reference: "James 5:16",
          body: `**Scripture (KJV)**  
> "Confess your faults one to another, and pray one for another, that ye may be healed. The effectual fervent prayer of a righteous man availeth much."

**Meaning:** Confess your sins to one another and pray for one another, that you may be healed.  
**Application:** You need both God and godly people. Honest friendships are part of God's design for your healing.`.trim(),
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
          body: `**Scripture (KJV)**  
> "There hath no temptation taken you but such as is common to man: but God is faithful, who will not suffer you to be tempted above that ye are able; but will with the temptation also make a way to escape, that ye may be able to bear it."

**Meaning:** Temptation is common to humanity, but God is faithful and always provides a way of escape so you can endure it.  
**Application:** You are never forced to sin. Ask God to show you the path of escape before you're in too deep.`.trim(),
        },
        {
          id: "bfa-d3-2tim2-22",
          type: "scripture",
          title: "Flee and Pursue",
          reference: "2 Timothy 2:22",
          body: `**Scripture (KJV)**  
> "Flee also youthful lusts: but follow righteousness, faith, charity, peace, with them that call on the Lord out of a pure heart."

**Meaning:** Flee youthful passions and pursue righteousness, faith, love, and peace with those who call on the Lord.  
**Application:** It's not enough to run from sin; you must also run *toward* godly people and godly pursuits.`.trim(),
        },
        {
          id: "bfa-d3-matt5-29-30",
          type: "scripture",
          title: "Radical Amputations",
          reference: "Matthew 5:29–30",
          body: `**Scripture (KJV)**  
> "And if thy right eye offend thee, pluck it out, and cast it from thee: for it is profitable for thee that one of thy members should perish, and not that thy whole body should be cast into hell. And if thy right hand offend thee, cut it off, and cast it from thee: for it is profitable for thee that one of thy members should perish, and not that thy whole body should be cast into hell."

**Meaning:** Jesus uses strong imagery about losing an eye or hand rather than being thrown into hell because of sin.  
**Application:** Serious sin calls for serious measures. Removing access points to addiction is wisdom, not extremism.`.trim(),
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
          body: `**Scripture (KJV)**  
> "And let us consider one another to provoke unto love and to good works: Not forsaking the assembling of ourselves together, as the manner of some is; but exhorting one another: and so much the more, as ye see the day approaching."

**Meaning:** Believers are called to stir one another up to love and good works and not neglect meeting together.  
**Application:** Skipping community weakens you. You need regular encouragement and challenge from other believers.`.trim(),
        },
        {
          id: "bfa-d4-eccl4-9-10",
          type: "scripture",
          title: "Two Are Better Than One",
          reference: "Ecclesiastes 4:9–10",
          body: `**Scripture (KJV)**  
> "¶ Two are better than one; because they have a good reward for their labour. For if they fall, the one will lift up his fellow: but woe to him that is alone when he falleth; for he hath not another to help him up."

**Meaning:** Two are better than one because if one falls, the other can lift him up.  
**Application:** Recovery is easier with real partners. Let others lift you instead of hiding when you fall.`.trim(),
        },
        {
          id: "bfa-d4-gal6-1-2",
          type: "scripture",
          title: "Restore Gently",
          reference: "Galatians 6:1–2",
          body: `**Scripture (KJV)**  
> "Brethren, if a man be overtaken in a fault, ye which are spiritual, restore such an one in the spirit of meekness; considering thyself, lest thou also be tempted. Bear ye one another’s burdens, and so fulfil the law of Christ."

**Meaning:** Those who are spiritual should restore the one caught in any transgression with gentleness, bearing one another's burdens.  
**Application:** Ask God for safe people who restore gently—and be willing to be that kind of person for others too.`.trim(),
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
          body: `**Scripture (KJV)**  
> "For a just man falleth seven times, and riseth up again: but the wicked shall fall into mischief."

**Meaning:** The righteous person falls seven times and rises again, but the wicked stumble in calamity.  
**Application:** In Christ, falling is not final. By His grace you get back up and keep moving toward Him.`.trim(),
        },
        {
          id: "bfa-d5-micah7-8-9",
          type: "scripture",
          title: "From Darkness to Light",
          reference: "Micah 7:8–9",
          body: `**Scripture (KJV)**  
> "¶ Rejoice not against me, O mine enemy: when I fall, I shall arise; when I sit in darkness, the LORD shall be a light unto me. I will bear the indignation of the LORD, because I have sinned against him, until he plead my cause, and execute judgment for me: he will bring me forth to the light, and I shall behold his righteousness."

**Meaning:** Even when the believer falls, he declares that the Lord will be his light, and God will bring him out to the light.  
**Application:** Your lowest moments are not beyond God's reach. He still leads you from darkness back into His light.`.trim(),
        },
        {
          id: "bfa-d5-hebrews4-15-16",
          type: "scripture",
          title: "Help in Time of Need",
          reference: "Hebrews 4:15–16",
          body: `**Scripture (KJV)**  
> "For we have not an high priest which cannot be touched with the feeling of our infirmities; but was in all points tempted like as we are, yet without sin. Let us therefore come boldly unto the throne of grace, that we may obtain mercy, and find grace to help in time of need."

**Meaning:** We have a High Priest who sympathizes with our weaknesses, so we can come boldly to the throne of grace for mercy and help.  
**Application:** Run to Jesus *because* you are weak, not because you feel strong. The throne you approach is a throne of grace.`.trim(),
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
          body: `**Scripture (KJV)**  
> "Let no man say when he is tempted, I am tempted of God: for God cannot be tempted with evil, neither tempteth he any man: But every man is tempted, when he is drawn away of his own lust, and enticed. Then when lust hath conceived, it bringeth forth sin: and sin, when it is finished, bringeth forth death."

**Meaning:** God does not tempt anyone. Temptation arises from one's own desires, which when acted upon give birth to sin, and sin leads to death.  
**Application:** You cannot blame God or circumstances for your temptation. Recognize the pattern: desire → temptation → sin → death. Break the cycle early by taking your desires to God.`.trim(),
        },
        {
          id: "d1-eph",
          type: "scripture",
          title: "Ephesians 6:10–11",
          reference: "Ephesians 6:10-11",
          body: `**Scripture (KJV)**  
> "Finally, my brethren, be strong in the Lord, and in the power of his might. Put on the whole armour of God, that ye may be able to stand against the wiles of the devil."

**Meaning:** Be strong in the Lord and put on the full armor of God so you can stand against the devil's schemes.  
**Application:** Your battle is spiritual. You need God's strength and His armor, not just willpower. The devil has schemes, but God has given you the tools to stand firm.`.trim(),
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
          body: `**Scripture (KJV)**  
> "Flee also youthful lusts: but follow righteousness, faith, charity, peace, with them that call on the Lord out of a pure heart."

**Meaning:** Flee youthful passions and pursue righteousness, faith, love, and peace, along with those who call on the Lord from a pure heart.  
**Application:** Don't just run from sin—run toward godliness. Surround yourself with people who are pursuing Christ with you. Victory is both fleeing and pursuing.`.trim(),
        },
        {
          id: "d2-1cor1013",
          type: "scripture",
          title: "God Provides a Way Out",
          reference: "1 Corinthians 10:13",
          body: `**Scripture (KJV)**  
> "There hath no temptation taken you but such as is common to man: but God is faithful, who will not suffer you to be tempted above that ye are able; but will with the temptation also make a way to escape, that ye may be able to bear it."

**Meaning:** No temptation has overtaken you that is not common to man. God is faithful, and He will not let you be tempted beyond your ability, but with the temptation He will also provide the way of escape.  
**Application:** You are never trapped. Every temptation has an exit. Look for it, and God will help you take it.`.trim(),
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
          body: `**Scripture (KJV)**  
> "For though we walk in the flesh, we do not war after the flesh: (For the weapons of our warfare are not carnal, but mighty through God to the pulling down of strong holds;) Casting down imaginations, and every high thing that exalteth itself against the knowledge of God, and bringing into captivity every thought to the obedience of Christ;"

**Meaning:** Though we live in the world, we do not wage war as the world does. We destroy arguments and every lofty opinion raised against the knowledge of God, and take every thought captive to obey Christ.  
**Application:** You have the power to take control of your thoughts. Don't let lies run wild—arrest them and submit them to Christ.`.trim(),
        },
        {
          id: "d3-matt44-11",
          type: "scripture",
          title: "Jesus' Example",
          reference: "Matthew 4:4, 11",
          body: `**Scripture (KJV)**  
> "But he answered and said, It is written, Man shall not live by bread alone, but by every word that proceedeth out of the mouth of God."

**Meaning:** When tempted, Jesus responded with "It is written…" and defeated Satan with Scripture. After the devil left, angels came and ministered to Him.  
**Application:** Use the Word of God as your weapon against temptation. When you resist the devil with Scripture, he will flee—and God will minister to you.`.trim(),
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
          body: `**Scripture (KJV)**  
> "But ye are not in the flesh, but in the Spirit, if so be that the Spirit of God dwell in you. Now if any man have not the Spirit of Christ, he is none of his."

**Meaning:** You are not in the flesh but in the Spirit, if indeed the Spirit of God dwells in you.  
**Application:** If you are in Christ, you are no longer controlled by the flesh. The Spirit's presence changes your identity and your power source.`.trim(),
        },
        {
          id: "d4-1john44",
          type: "scripture",
          title: "Greater Is He Who Is in You",
          reference: "1 John 4:4",
          body: `**Scripture (KJV)**  
> "Ye are of God, little children, and have overcome them: because greater is he that is in you, than he that is in the world."

**Meaning:** Little children, you are from God and have overcome them, for He who is in you is greater than he who is in the world.  
**Application:** The Holy Spirit in you is more powerful than any temptation, any lie, or any enemy. You overcome because of who lives in you.`.trim(),
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
          body: `**Scripture (KJV)**  
> "For a just man falleth seven times, and riseth up again: but the wicked shall fall into mischief."

**Meaning:** The righteous falls seven times and rises again, but the wicked stumble in times of calamity.  
**Application:** What separates the righteous from the wicked is not the absence of falling, but the getting back up. Keep rising in God's grace.`.trim(),
        },
        {
          id: "d5-1john19",
          type: "scripture",
          title: "Confess and Be Cleansed",
          reference: "1 John 1:9",
          body: `**Scripture (KJV)**  
> "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness."

**Meaning:** If we confess our sins, He is faithful and just to forgive us our sins and to cleanse us from all unrighteousness.  
**Application:** Confession brings cleansing. Don't hide your failures—bring them to God, and He will wash you clean every time.`.trim(),
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
          body: `**Scripture (KJV)**  
> "¶ Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths."

**Meaning:** Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge Him, and He will make your paths straight.  
**Application:** God promises to direct your path when you trust Him fully and acknowledge Him in every decision. Stop leaning on your limited understanding and lean into His unlimited wisdom.`.trim(),
        },
        {
          id: "d1-ps2514",
          type: "scripture",
          title: "The Secret of the Lord",
          reference: "Psalm 25:14",
          body: `**Scripture (KJV)**  
> "The secret of the LORD is with them that fear him; and he will shew them his covenant."

**Meaning:** The friendship of the Lord is for those who fear Him, and He makes known to them His covenant.  
**Application:** God reveals His will to those who walk closely with Him. Intimacy with God leads to clarity about His direction.`.trim(),
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
          body: `**Scripture (KJV)**  
> "Thy word is a lamp unto my feet, and a light unto my path."

**Meaning:** Your word is a lamp to my feet and a light to my path.  
**Application:** God's Word illuminates the step in front of you. You don't need to see the whole path—just the next step. Stay in the Word and He will keep guiding.`.trim(),
        },
        {
          id: "d2-2tim316-17",
          type: "scripture",
          title: "Scripture Equips You",
          reference: "2 Timothy 3:16–17",
          body: `**Scripture (KJV)**  
> "All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness: That the man of God may be perfect, throughly furnished unto all good works."

**Meaning:** All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness, that the man of God may be complete, equipped for every good work.  
**Application:** God's Word doesn't just inform you—it equips you for the work God calls you to do. If you want to know God's will, saturate yourself in His Word.`.trim(),
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
          body: `**Scripture (KJV)**  
> "For as many as are led by the Spirit of God, they are the sons of God."

**Meaning:** For all who are led by the Spirit of God are sons of God.  
**Application:** Being led by the Spirit is a mark of belonging to God. If you are His child, He will lead you—trust that His Spirit is at work in you.`.trim(),
        },
        {
          id: "d3-john1613",
          type: "scripture",
          title: "The Spirit Guides into Truth",
          reference: "John 16:13",
          body: `**Scripture (KJV)**  
> "Howbeit when he, the Spirit of truth, is come, he will guide you into all truth: for he shall not speak of himself; but whatsoever he shall hear, that shall he speak: and he will shew you things to come."

**Meaning:** When the Spirit of truth comes, He will guide you into all the truth.  
**Application:** The Holy Spirit's role is to guide you into truth—not confusion. When you feel confused, ask the Spirit to bring clarity and trust that He will.`.trim(),
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
          body: `**Scripture (KJV)**  
> "And let the peace of God rule in your hearts, to the which also ye are called in one body; and be ye thankful."

**Meaning:** Let the peace of Christ rule in your hearts.  
**Application:** Peace should be the umpire, the deciding factor in your decisions. When you lack peace, pause and seek God more deeply before moving forward.`.trim(),
        },
        {
          id: "d4-phil47",
          type: "scripture",
          title: "Peace Guards Your Heart",
          reference: "Philippians 4:7",
          body: `**Scripture (KJV)**  
> "And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus."

**Meaning:** And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus.  
**Application:** God's peace isn't logical—it surpasses understanding. When you're walking in His will, His peace guards your heart even in uncertain circumstances.`.trim(),
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
          body: `**Scripture (KJV)**  
> "The steps of a good man are ordered by the LORD: and he delighteth in his way."

**Meaning:** The steps of a man are established by the Lord, when he delights in his way.  
**Application:** When you delight in the Lord, He directs your steps. Your job isn't to figure it all out—it's to delight in Him and trust that He's ordering your path.`.trim(),
        },
        {
          id: "d5-prov165",
          type: "scripture",
          title: "Commit Your Work to the Lord",
          reference: "Proverbs 16:3",
          body: `**Scripture (KJV)**  
> "Commit thy works unto the LORD, and thy thoughts shall be established."

**Meaning:** Commit your work to the Lord, and your plans will be established.  
**Application:** When you surrender your plans to God, He establishes them. Stop holding tightly to your own agenda and release it into His hands.`.trim(),
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
          body: `**Scripture (KJV)**  
> "Be ye not unequally yoked together with unbelievers: for what fellowship hath righteousness with unrighteousness? and what communion hath light with darkness?"

**Meaning:** Do not be unequally yoked with unbelievers. What partnership has righteousness with lawlessness? Or what fellowship has light with darkness?  
**Application:** Dating a non-believer is like yoking an ox with a donkey—they'll pull in different directions. Your spiritual life is too important to compromise for a relationship.`.trim(),
        },
        {
          id: "d1-amos33",
          type: "scripture",
          title: "Can Two Walk Together?",
          reference: "Amos 3:3",
          body: `**Scripture (KJV)**  
> "Can two walk together, except they be agreed?"

**Meaning:** Can two walk together, except they be agreed?  
**Application:** If you and the person you're dating don't share the same commitment to Christ, you'll struggle to walk together in the same direction.`.trim(),
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
          body: `**Scripture (KJV)**  
> "But the LORD said unto Samuel, Look not on his countenance, or on the height of his stature; because I have refused him: for the Lord seeth not as man seeth; for man looketh on the outward appearance, but the LORD looketh on the heart."

**Meaning:** Man looks on the outward appearance, but the Lord looks on the heart.  
**Application:** The world judges by looks, status, and charisma. God looks at the heart. Make sure the person's heart is pursuing Christ.`.trim(),
        },
        {
          id: "d2-gal522-23",
          type: "scripture",
          title: "The Fruit of the Spirit",
          reference: "Galatians 5:22–23",
          body: `**Scripture (KJV)**  
> "But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, Meekness, temperance: against such there is no law."

**Meaning:** The fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control.  
**Application:** Look for these qualities in the person you're considering dating. If the fruit of the Spirit is missing, red flags are waving.`.trim(),
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
          body: `**Scripture (KJV)**  
> "For this is the will of God, even your sanctification, that ye should abstain from fornication: That every one of you should know how to possess his vessel in sanctification and honour; Not in the lust of concupiscence, even as the Gentiles which know not God:"

**Meaning:** This is the will of God, your sanctification: that you abstain from sexual immorality; that each one of you know how to control his own body in holiness and honor.  
**Application:** God's will is clear: sexual purity before marriage. This isn't a suggestion—it's His loving design to protect you.`.trim(),
        },
        {
          id: "d3-1cor618-20",
          type: "scripture",
          title: "Your Body Is a Temple",
          reference: "1 Corinthians 6:18–20",
          body: `**Scripture (KJV)**  
> "Flee fornication. Every sin that a man doeth is without the body; but he that committeth fornication sinneth against his own body. What? know ye not that your body is the temple of the Holy Ghost which is in you, which ye have of God, and ye are not your own? For ye are bought with a price: therefore glorify God in your body, and in your spirit, which are God’s."

**Meaning:** Flee from sexual immorality. Your body is a temple of the Holy Spirit. You are not your own; you were bought with a price. So glorify God in your body.  
**Application:** Your body belongs to God. Sexual sin is unique because it sins against your own body. Honor God by fleeing from it.`.trim(),
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
          body: `**Scripture (KJV)**  
> "¶ Therefore whosoever heareth these sayings of mine, and doeth them, I will liken him unto a wise man, which built his house upon a rock: And the rain descended, and the floods came, and the winds blew, and beat upon that house; and it fell not: for it was founded upon a rock."

**Meaning:** Everyone who hears these words of Mine and does them will be like a wise man who built his house on the rock. And the rain fell, and the floods came, and the winds blew and beat on that house, but it did not fall, because it had been founded on the rock.  
**Application:** A relationship built on obedience to Christ's Word will withstand the storms. Build on the rock, not on feelings.`.trim(),
        },
        {
          id: "d4-prov35-6",
          type: "scripture",
          title: "Trust in the Lord",
          reference: "Proverbs 3:5–6",
          body: `**Scripture (KJV)**  
> "¶ Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths."

**Meaning:** Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge Him, and He will make straight your paths.  
**Application:** Don't rely on your feelings or your friends' advice alone. Bring your relationship to God and trust Him to guide you.`.trim(),
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
          body: `**Scripture (KJV)**  
> "For the LORD God is a sun and shield: the LORD will give grace and glory: no good thing will he withhold from them that walk uprightly."

**Meaning:** For the Lord God is a sun and shield; the Lord bestows favor and honor. No good thing does He withhold from those who walk uprightly.  
**Application:** If you're walking with God, He will not withhold any good thing from you—including the right relationship at the right time. Trust Him.`.trim(),
        },
        {
          id: "d5-eccles33",
          type: "scripture",
          title: "A Time for Everything",
          reference: "Ecclesiastes 3:1",
          body: `**Scripture (KJV)**  
> "To every thing there is a season, and a time to every purpose under the heaven:"

**Meaning:** For everything there is a season, and a time for every matter under heaven.  
**Application:** There is a season for singleness and a season for relationships. Don't try to force a season that God hasn't opened yet.`.trim(),
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
          body: `**Scripture (KJV)**  
> "What time I am afraid, I will trust in thee. In God I will praise his word, in God I have put my trust; I will not fear what flesh can do unto me."

**Meaning:** When I am afraid, I put my trust in You. In God, whose word I praise—in God I trust; I shall not be afraid. What can flesh do to me?  
**Application:** When fear comes, shift your focus from what you fear to who God is. Trust isn't the absence of fear—it's choosing God in the midst of it.`.trim(),
        },
        {
          id: "d1-ps2310",
          type: "scripture",
          title: "The Lord Is My Light",
          reference: "Psalm 27:1",
          body: `**Scripture (KJV)**  
> "The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?"

**Meaning:** The Lord is my light and my salvation; whom shall I fear? The Lord is the stronghold of my life; of whom shall I be afraid?  
**Application:** God is your protector and your light. When you're afraid, remember: He is with you, and He is stronger than whatever you fear.`.trim(),
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
          body: `**Scripture (KJV)**  
> "Therefore I say unto you, Take no thought for your life, what ye shall eat, or what ye shall drink; nor yet for your body, what ye shall put on. Is not the life more than meat, and the body than raiment? Behold the fowls of the air: for they sow not, neither do they reap, nor gather into barns; yet your heavenly Father feedeth them. Are ye not much better than they? Which of you by taking thought can add one cubit unto his stature? And why take ye thought for raiment? Consider the lilies of the field, how they grow; they toil not, neither do they spin: And yet I say unto you, That even Solomon in all his glory was not arrayed like one of these. Wherefore, if God so clothe the grass of the field, which to day is, and to morrow is cast into the oven, shall he not much more clothe you, O ye of little faith? Therefore take no thought, saying, What shall we eat? or, What shall we drink? or, Wherewithal shall we be clothed? (For after all these things do the Gentiles seek:) for your heavenly Father knoweth that ye have need of all these things. But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you. Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself. Sufficient unto the day is the evil thereof."

**Meaning:** Jesus tells us not to worry about tomorrow, for the Father knows what we need. He will provide for us just as He provides for the birds and the flowers.  
**Application:** Stop trying to control tomorrow. Your Father knows what you need and will take care of you. Focus on today and trust Him with the rest.`.trim(),
        },
        {
          id: "d2-jer2911",
          type: "scripture",
          title: "God Has Plans for You",
          reference: "Jeremiah 29:11",
          body: `**Scripture (KJV)**  
> "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end."

**Meaning:** For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.  
**Application:** God's plans for you are good, even when you can't see them. Trust that He is working for your good and your future.`.trim(),
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
          body: `**Scripture (KJV)**  
> "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus."

**Meaning:** Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus.  
**Application:** Trade anxiety for prayer and thanksgiving. When you bring your worries to God, His supernatural peace guards your heart and mind.`.trim(),
        },
        {
          id: "d3-1pet57",
          type: "scripture",
          title: "Cast Your Anxiety on Him",
          reference: "1 Peter 5:7",
          body: `**Scripture (KJV)**  
> "Casting all your care upon him; for he careth for you."

**Meaning:** Cast all your anxieties on Him, because He cares for you.  
**Application:** God isn't annoyed by your worries—He cares about them because He cares about you. Throw your anxieties on Him and let Him carry them.`.trim(),
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
          body: `**Scripture (KJV)**  
> "Finally, brethren, whatsoever things are true, whatsoever things are honest, whatsoever things are just, whatsoever things are pure, whatsoever things are lovely, whatsoever things are of good report; if there be any virtue, and if there be any praise, think on these things. Those things, which ye have both learned, and received, and heard, and seen in me, do: and the God of peace shall be with you."

**Meaning:** Finally, brothers, whatever is true, whatever is honorable, whatever is just, whatever is pure, whatever is lovely, whatever is commendable, if there is any excellence, if there is anything worthy of praise, think about these things.  
**Application:** You have control over what you think about. Fill your mind with God's truth, not the world's lies, and your anxiety will lose its grip.`.trim(),
        },
        {
          id: "d4-rom122",
          type: "scripture",
          title: "Renew Your Mind",
          reference: "Romans 12:2",
          body: `**Scripture (KJV)**  
> "And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God."

**Meaning:** Do not be conformed to this world, but be transformed by the renewal of your mind.  
**Application:** Your mind is transformed when you replace worldly thinking with God's Word. Renewing your mind daily is the path to peace.`.trim(),
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
          body: `**Scripture (KJV)**  
> "¶ Come unto me, all ye that labour and are heavy laden, and I will give you rest. Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls. For my yoke is easy, and my burden is light."

**Meaning:** Come to Me, all who labor and are heavy laden, and I will give you rest. Take My yoke upon you, and learn from Me, for I am gentle and lowly in heart, and you will find rest for your souls.  
**Application:** Jesus invites the weary and burdened to find rest in Him. Stop striving and come to Him. His rest is real and available to you today.`.trim(),
        },
        {
          id: "d5-ps4610",
          type: "scripture",
          title: "Be Still and Know",
          reference: "Psalm 46:10",
          body: `**Scripture (KJV)**  
> "Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth."

**Meaning:** Be still, and know that I am God. I will be exalted among the nations, I will be exalted in the earth!  
**Application:** Sometimes the most spiritual thing you can do is be still. Stop striving, stop controlling, and simply trust that God is God.`.trim(),
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
          body: `**Scripture (KJV)**  
> "Be ye angry, and sin not: let not the sun go down upon your wrath: Neither give place to the devil."

**Meaning:** Be angry and do not sin; do not let the sun go down on your anger, and give no opportunity to the devil.  
**Application:** Anger itself isn't always sin, but unresolved anger opens the door to sin. Deal with your anger quickly and bring it to God before it turns into bitterness.`.trim(),
        },
        {
          id: "d1-james119-20",
          type: "scripture",
          title: "Quick to Listen, Slow to Anger",
          reference: "James 1:19–20",
          body: `**Scripture (KJV)**  
> "Wherefore, my beloved brethren, let every man be swift to hear, slow to speak, slow to wrath: For the wrath of man worketh not the righteousness of God."

**Meaning:** Let every person be quick to hear, slow to speak, slow to anger; for the anger of man does not produce the righteousness of God.  
**Application:** Human anger rarely produces godly results. Slow down, listen first, and give yourself time before reacting in anger.`.trim(),
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
          body: `**Scripture (KJV)**  
> "For if ye forgive men their trespasses, your heavenly Father will also forgive you: But if ye forgive not men their trespasses, neither will your Father forgive your trespasses."

**Meaning:** For if you forgive others their trespasses, your heavenly Father will also forgive you, but if you do not forgive others their trespasses, neither will your Father forgive your trespasses.  
**Application:** Forgiveness isn't optional for followers of Christ. Just as God has forgiven you, He calls you to forgive others—even when it's hard.`.trim(),
        },
        {
          id: "d2-rom1219",
          type: "scripture",
          title: "Leave Room for God's Wrath",
          reference: "Romans 12:19",
          body: `**Scripture (KJV)**  
> "Dearly beloved, avenge not yourselves, but rather give place unto wrath: for it is written, Vengeance is mine; I will repay, saith the Lord."

**Meaning:** Beloved, never avenge yourselves, but leave it to the wrath of God, for it is written, "Vengeance is Mine, I will repay, says the Lord."  
**Application:** You don't need to hold onto bitterness to ensure justice. God will handle it. Release the person and trust God to be the judge.`.trim(),
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
          body: `**Scripture (KJV)**  
> "And when ye stand praying, forgive, if ye have ought against any: that your Father also which is in heaven may forgive you your trespasses."

**Meaning:** And whenever you stand praying, forgive, if you have anything against anyone, so that your Father also who is in heaven may forgive you your trespasses.  
**Application:** Forgiveness is part of your prayer life. Before you ask God for anything, check your heart and forgive those who have wronged you.`.trim(),
        },
        {
          id: "d3-col313",
          type: "scripture",
          title: "Forgive as the Lord Forgave You",
          reference: "Colossians 3:13",
          body: `**Scripture (KJV)**  
> "Forbearing one another, and forgiving one another, if any man have a quarrel against any: even as Christ forgave you, so also do ye."

**Meaning:** Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you.  
**Application:** You have been forgiven of so much. Let that shape how you forgive others—freely and fully, just as Christ forgave you.`.trim(),
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
          body: `**Scripture (KJV)**  
> "A soft answer turneth away wrath: but grievous words stir up anger."

**Meaning:** A soft answer turns away wrath, but a harsh word stirs up anger.  
**Application:** Your tone and words have power. A gentle response can defuse conflict, while harsh words escalate it. Choose gentleness.`.trim(),
        },
        {
          id: "d4-eph429",
          type: "scripture",
          title: "Let No Corrupting Talk Come Out",
          reference: "Ephesians 4:29",
          body: `**Scripture (KJV)**  
> "Let no corrupt communication proceed out of your mouth, but that which is good to the use of edifying, that it may minister grace unto the hearers."

**Meaning:** Let no corrupting talk come out of your mouths, but only such as is good for building up, as fits the occasion, that it may give grace to those who hear.  
**Application:** Your words should build up, not tear down. Before you speak in anger, ask: will this give grace to the hearer?`.trim(),
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
          body: `**Scripture (KJV)**  
> "Follow peace with all men, and holiness, without which no man shall see the Lord: Looking diligently lest any man fail of the grace of God; lest any root of bitterness springing up trouble you, and thereby many be defiled;"

**Meaning:** Strive for peace with everyone, and for the holiness without which no one will see the Lord. See to it that no one fails to obtain the grace of God; that no "root of bitterness" springs up and causes trouble, and by it many become defiled.  
**Application:** Bitterness doesn't just hurt you—it affects everyone around you. Pursue peace and uproot bitterness before it spreads.`.trim(),
        },
        {
          id: "d5-luke637-38",
          type: "scripture",
          title: "Forgive and You Will Be Forgiven",
          reference: "Luke 6:37–38",
          body: `**Scripture (KJV)**  
> "Judge not, and ye shall not be judged: condemn not, and ye shall not be condemned: forgive, and ye shall be forgiven: Give, and it shall be given unto you; good measure, pressed down, and shaken together, and running over, shall men give into your bosom. For with the same measure that ye mete withal it shall be measured to you again."

**Meaning:** Judge not, and you will not be judged; condemn not, and you will not be condemned; forgive, and you will be forgiven.  
**Application:** The measure you use for others will be used for you. Extend mercy and forgiveness freely, and you will receive it in return.`.trim(),
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
          body: `**Scripture (KJV)**  
> "¶ And God said, Let us make man in our image, after our likeness: and let them have dominion over the fish of the sea, and over the fowl of the air, and over the cattle, and over all the earth, and over every creeping thing that creepeth upon the earth. So God created man in his own image, in the image of God created he him; male and female created he them."

**Meaning:** Then God said, "Let Us make man in Our image, after Our likeness." So God created man in His own image, in the image of God He created him; male and female He created them.  
**Application:** You bear the image of God. That alone gives you infinite worth and purpose. Your life matters because you were made to reflect the glory of your Creator.`.trim(),
        },
        {
          id: "d1-eph210",
          type: "scripture",
          title: "God's Workmanship",
          reference: "Ephesians 2:10",
          body: `**Scripture (KJV)**  
> "For we are his workmanship, created in Christ Jesus unto good works, which God hath before ordained that we should walk in them."

**Meaning:** For we are His workmanship, created in Christ Jesus for good works, which God prepared beforehand, that we should walk in them.  
**Application:** You are God's masterpiece, created for good works He planned in advance. Your purpose isn't random—it was designed by God before you were born.`.trim(),
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
          body: `**Scripture (KJV)**  
> "But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people; that ye should shew forth the praises of him who hath called you out of darkness into his marvellous light: Which in time past were not a people, but are now the people of God: which had not obtained mercy, but now have obtained mercy."

**Meaning:** But you are a chosen race, a royal priesthood, a holy nation, a people for His own possession, that you may proclaim the excellencies of Him who called you out of darkness into His marvelous light.  
**Application:** You are chosen, royal, and set apart. Your purpose is to proclaim God's greatness. Live like someone who belongs to the King.`.trim(),
        },
        {
          id: "d2-2cor520",
          type: "scripture",
          title: "Ambassadors for Christ",
          reference: "2 Corinthians 5:20",
          body: `**Scripture (KJV)**  
> "Now then we are ambassadors for Christ, as though God did beseech you by us: we pray you in Christ’s stead, be ye reconciled to God."

**Meaning:** Therefore, we are ambassadors for Christ, God making His appeal through us.  
**Application:** You represent Christ wherever you go. Your words, actions, and life are His message to the world. Live worthy of your calling.`.trim(),
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
          body: `**Scripture (KJV)**  
> "For as we have many members in one body, and all members have not the same office: So we, being many, are one body in Christ, and every one members one of another. Having then gifts differing according to the grace that is given to us, whether prophecy, let us prophesy according to the proportion of faith; Or ministry, let us wait on our ministering: or he that teacheth, on teaching; Or he that exhorteth, on exhortation: he that giveth, let him do it with simplicity; he that ruleth, with diligence; he that sheweth mercy, with cheerfulness."

**Meaning:** We have different gifts according to the grace given to each of us. Use them diligently—whether prophecy, service, teaching, encouraging, giving, leading, or showing mercy.  
**Application:** Don't compare your gifts to others'. Use what God has given you with diligence and faithfulness, knowing every gift matters in the body of Christ.`.trim(),
        },
        {
          id: "d3-1pet410-11",
          type: "scripture",
          title: "Serve One Another",
          reference: "1 Peter 4:10–11",
          body: `**Scripture (KJV)**  
> "As every man hath received the gift, even so minister the same one to another, as good stewards of the manifold grace of God. If any man speak, let him speak as the oracles of God; if any man minister, let him do it as of the ability which God giveth: that God in all things may be glorified through Jesus Christ, to whom be praise and dominion for ever and ever. Amen."

**Meaning:** As each has received a gift, use it to serve one another, as good stewards of God's varied grace.  
**Application:** Your gifts are a stewardship—God gave them to you to bless others. Don't hoard them; use them generously to serve the body of Christ.`.trim(),
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
          body: `**Scripture (KJV)**  
> "Whether therefore ye eat, or drink, or whatsoever ye do, do all to the glory of God."

**Meaning:** So, whether you eat or drink, or whatever you do, do all to the glory of God.  
**Application:** Everything you do—no matter how ordinary—can be an act of worship when you do it for God's glory. Bring Him into every moment.`.trim(),
        },
        {
          id: "d4-col323-24",
          type: "scripture",
          title: "Work as for the Lord",
          reference: "Colossians 3:23–24",
          body: `**Scripture (KJV)**  
> "And whatsoever ye do, do it heartily, as to the Lord, and not unto men; Knowing that of the Lord ye shall receive the reward of the inheritance: for ye serve the Lord Christ."

**Meaning:** Whatever you do, work heartily, as for the Lord and not for men, knowing that from the Lord you will receive the inheritance as your reward. You are serving the Lord Christ.  
**Application:** Your work isn't just for your boss or your family—it's for the Lord. When you work with that perspective, even the mundane becomes meaningful.`.trim(),
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
          body: `**Scripture (KJV)**  
> "¶ Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths."

**Meaning:** Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge Him, and He will make straight your paths.  
**Application:** Stop trying to figure it all out on your own. Trust God with your purpose and He will direct your steps. Your job is to walk with Him, not to have it all mapped out.`.trim(),
        },
        {
          id: "d5-jer2911",
          type: "scripture",
          title: "God's Plans for You",
          reference: "Jeremiah 29:11",
          body: `**Scripture (KJV)**  
> "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end."

**Meaning:** For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.  
**Application:** God knows the plans He has for you, and they are good. You don't need to know every detail—just trust that He's leading you to a future full of hope.`.trim(),
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
          body: `**Scripture (KJV)**  
> "As ye have therefore received Christ Jesus the Lord, so walk ye in him: Rooted and built up in him, and stablished in the faith, as ye have been taught, abounding therein with thanksgiving."

**Meaning:** Therefore, as you received Christ Jesus the Lord, so walk in Him, rooted and built up in Him and established in the faith.  
**Application:** Just as you received Christ by faith, continue to walk in Him daily. Being rooted means going deep—not just surface-level faith, but a life built on Jesus.`.trim(),
        },
        {
          id: "d1-jer178",
          type: "scripture",
          title: "Planted by the Water",
          reference: "Jeremiah 17:7–8",
          body: `**Scripture (KJV)**  
> "Blessed is the man that trusteth in the LORD, and whose hope the LORD is. For he shall be as a tree planted by the waters, and that spreadeth out her roots by the river, and shall not see when heat cometh, but her leaf shall be green; and shall not be careful in the year of drought, neither shall cease from yielding fruit."

**Meaning:** Blessed is the man who trusts in the Lord, whose trust is the Lord. He is like a tree planted by water, that sends out its roots by the stream.  
**Application:** When you trust the Lord deeply, you become like a tree with deep roots. Even in drought, you remain green and fruitful because your roots are in Him.`.trim(),
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
          body: `**Scripture (KJV)**  
> "But he answered and said, It is written, Man shall not live by bread alone, but by every word that proceedeth out of the mouth of God."

**Meaning:** Man shall not live by bread alone, but by every word that comes from the mouth of God.  
**Application:** Physical food keeps your body alive, but God's Word sustains your soul. You need it just as much—if not more—than your daily bread.`.trim(),
        },
        {
          id: "d2-ps11997",
          type: "scripture",
          title: "Delighting in God's Word",
          reference: "Psalm 119:97",
          body: `**Scripture (KJV)**  
> "O how love I thy law! it is my meditation all the day."

**Meaning:** Oh how I love Your law! It is my meditation all the day.  
**Application:** When you love God's Word, you can't stop thinking about it. It becomes the meditation of your heart, not just a Sunday routine.`.trim(),
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
          body: `**Scripture (KJV)**  
> "And it came to pass, that, as he was praying in a certain place, when he ceased, one of his disciples said unto him, Lord, teach us to pray, as John also taught his disciples. And he said unto them, When ye pray, say, Our Father which art in heaven, Hallowed be thy name. Thy kingdom come. Thy will be done, as in heaven, so in earth. Give us day by day our daily bread. And forgive us our sins; for we also forgive every one that is indebted to us. And lead us not into temptation; but deliver us from evil."

**Meaning:** Jesus teaches the disciples to pray, modeling dependence on God, worship, and trust in His provision and forgiveness.  
**Application:** Prayer is learned by doing it. Follow Jesus' model: honor God, depend on Him, and bring your needs to Him with trust.`.trim(),
        },
        {
          id: "d3-1thess517",
          type: "scripture",
          title: "Pray Without Ceasing",
          reference: "1 Thessalonians 5:17",
          body: `**Scripture (KJV)**  
> "Pray without ceasing."

**Meaning:** Pray without ceasing.  
**Application:** Prayer isn't just a morning or evening event—it's a constant conversation with God throughout your day. Stay connected to Him always.`.trim(),
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
          body: `**Scripture (KJV)**  
> "But be ye doers of the word, and not hearers only, deceiving your own selves. For if any be a hearer of the word, and not a doer, he is like unto a man beholding his natural face in a glass: For he beholdeth himself, and goeth his way, and straightway forgetteth what manner of man he was. But whoso looketh into the perfect law of liberty, and continueth therein, he being not a forgetful hearer, but a doer of the work, this man shall be blessed in his deed."

**Meaning:** Be doers of the Word, and not hearers only, deceiving yourselves. The one who looks into the Word and persists in obedience will be blessed.  
**Application:** Knowing the Word without obeying it is self-deception. True blessing comes when you hear God's Word and actually do what it says.`.trim(),
        },
        {
          id: "d4-john1314-15",
          type: "scripture",
          title: "If You Love Me, Obey",
          reference: "John 14:15",
          body: `**Scripture (KJV)**  
> "¶ If ye love me, keep my commandments."

**Meaning:** If you love Me, you will keep My commandments.  
**Application:** Love for Jesus is shown through obedience, not just words or feelings. If you love Him, obey Him.`.trim(),
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
          body: `**Scripture (KJV)**  
> "These things I have spoken unto you, that in me ye might have peace. In the world ye shall have tribulation: but be of good cheer; I have overcome the world."

**Meaning:** In the world you will have tribulation. But take heart; I have overcome the world.  
**Application:** Jesus doesn't promise a storm-free life, but He does promise victory. In Him, you can face any storm with confidence because He has overcome.`.trim(),
        },
        {
          id: "d5-matt724-27",
          type: "scripture",
          title: "Build on the Rock",
          reference: "Matthew 7:24–27",
          body: `**Scripture (KJV)**  
> "¶ Therefore whosoever heareth these sayings of mine, and doeth them, I will liken him unto a wise man, which built his house upon a rock: And the rain descended, and the floods came, and the winds blew, and beat upon that house; and it fell not: for it was founded upon a rock. And every one that heareth these sayings of mine, and doeth them not, shall be likened unto a foolish man, which built his house upon the sand: And the rain descended, and the floods came, and the winds blew, and beat upon that house; and it fell: and great was the fall of it."

**Meaning:** Everyone who hears Jesus' words and does them is like a wise man who built his house on the rock. The rain fell, the floods came, and the winds blew, but the house did not fall, because it had been founded on the rock.  
**Application:** When you build your life on Jesus' Word and obey it, you can withstand any storm. Shallow faith collapses; deep faith endures.`.trim(),
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
          body: `**Scripture (KJV)**  
> "All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness: That the man of God may be perfect, throughly furnished unto all good works."

**Meaning:** All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness, that the man of God may be complete, equipped for every good work.  
**Application:** Scripture is not just a book—it's God-breathed. When you read it, God is speaking directly to you, equipping you for everything He's called you to do.`.trim(),
        },
        {
          id: "d1-heb412",
          type: "scripture",
          title: "The Word Is Living and Active",
          reference: "Hebrews 4:12",
          body: `**Scripture (KJV)**  
> "For the word of God is quick, and powerful, and sharper than any twoedged sword, piercing even to the dividing asunder of soul and spirit, and of the joints and marrow, and is a discerner of the thoughts and intents of the heart."

**Meaning:** For the word of God is living and active, sharper than any two-edged sword, piercing to the division of soul and of spirit.  
**Application:** God's Word isn't dead text on a page—it's alive and active. It speaks into your life, revealing your heart and pointing you to truth.`.trim(),
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
          body: `**Scripture (KJV)**  
> "Open thou mine eyes, that I may behold wondrous things out of thy law."

**Meaning:** Open my eyes, that I may behold wondrous things out of Your law.  
**Application:** You need God's help to truly understand His Word. Ask Him to open your eyes as you read, and He will reveal wonderful truths you would have missed on your own.`.trim(),
        },
        {
          id: "d2-james122",
          type: "scripture",
          title: "Be Quick to Listen",
          reference: "James 1:22",
          body: `**Scripture (KJV)**  
> "But be ye doers of the word, and not hearers only, deceiving your own selves."

**Meaning:** But be doers of the word, and not hearers only, deceiving yourselves.  
**Application:** It's not enough to read the Bible—you have to listen and obey. A heart that truly listens will respond in obedience.`.trim(),
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
          body: `**Scripture (KJV)**  
> "Howbeit when he, the Spirit of truth, is come, he will guide you into all truth: for he shall not speak of himself; but whatsoever he shall hear, that shall he speak: and he will shew you things to come. He shall glorify me: for he shall receive of mine, and shall shew it unto you."

**Meaning:** When the Spirit of truth comes, He will guide you into all the truth and glorify Jesus.  
**Application:** The Holy Spirit's job is to guide you into truth and point you to Jesus. Ask Him to teach you as you read, and He will.`.trim(),
        },
        {
          id: "d3-1cor214",
          type: "scripture",
          title: "The Spirit Teaches Spiritual Things",
          reference: "1 Corinthians 2:14",
          body: `**Scripture (KJV)**  
> "But the natural man receiveth not the things of the Spirit of God: for they are foolishness unto him: neither can he know them, because they are spiritually discerned."

**Meaning:** The natural person does not accept the things of the Spirit of God, for they are folly to him, and he is not able to understand them because they are spiritually discerned.  
**Application:** Without the Spirit, Scripture can seem confusing or irrelevant. With the Spirit, God's truth comes alive and transforms you.`.trim(),
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
          body: `**Scripture (KJV)**  
> "Beloved, believe not every spirit, but try the spirits whether they are of God: because many false prophets are gone out into the world."

**Meaning:** Beloved, do not believe every spirit, but test the spirits to see whether they are from God.  
**Application:** Don't accept every voice or teaching as truth. Test it against Scripture. If it doesn't align, reject it.`.trim(),
        },
        {
          id: "d4-acts1711",
          type: "scripture",
          title: "The Bereans Examined the Scriptures",
          reference: "Acts 17:11",
          body: `**Scripture (KJV)**  
> "These were more noble than those in Thessalonica, in that they received the word with all readiness of mind, and searched the scriptures daily, whether those things were so."

**Meaning:** The Bereans were more noble because they received the word with eagerness and examined the Scriptures daily to see if these things were so.  
**Application:** Even good teaching should be tested against Scripture. Be eager to learn, but always check it against God's Word.`.trim(),
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
          body: `**Scripture (KJV)**  
> "But he said, Yea rather, blessed are they that hear the word of God, and keep it."

**Meaning:** Blessed are those who hear the word of God and keep it.  
**Application:** True blessing comes not just from hearing God's Word, but from doing what it says. Obedience brings the blessing.`.trim(),
        },
        {
          id: "d5-james122-25",
          type: "scripture",
          title: "Doers of the Word",
          reference: "James 1:22–25",
          body: `**Scripture (KJV)**  
> "But be ye doers of the word, and not hearers only, deceiving your own selves. For if any be a hearer of the word, and not a doer, he is like unto a man beholding his natural face in a glass: For he beholdeth himself, and goeth his way, and straightway forgetteth what manner of man he was. But whoso looketh into the perfect law of liberty, and continueth therein, he being not a forgetful hearer, but a doer of the work, this man shall be blessed in his deed."

**Meaning:** Be doers of the word, and not hearers only. The one who looks into the law and persists in doing it will be blessed.  
**Application:** It's not enough to read and know Scripture—you have to live it. When you do what God's Word says, you experience His blessing.`.trim(),
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
          body: `**Scripture (KJV)**  
> "Or despisest thou the riches of his goodness and forbearance and longsuffering; not knowing that the goodness of God leadeth thee to repentance?"

**Meaning:** God's kindness and patience are meant to lead you to repentance, not to encourage sin.  
**Application:** Repentance is not punishment—it's a gift that flows from experiencing God's kindness. When you see how good God is, it makes you want to turn from sin.`.trim(),
        },
        {
          id: "d1-acts319",
          type: "scripture",
          title: "Repent and Turn Back",
          reference: "Acts 3:19",
          body: `**Scripture (KJV)**  
> "¶ Repent ye therefore, and be converted, that your sins may be blotted out, when the times of refreshing shall come from the presence of the Lord;"

**Meaning:** Repent and turn back to God so that your sins may be blotted out.  
**Application:** Repentance is not just feeling sorry—it's actively turning back to God. When you do, He wipes your sins away completely.`.trim(),
        },
        {
          id: "d1-ps511-4",
          type: "scripture",
          title: "David's Honest Confession",
          reference: "Psalm 51:1–4",
          body: `**Scripture (KJV)**  
> "Have mercy upon me, O God, according to thy lovingkindness: according unto the multitude of thy tender mercies blot out my transgressions. Wash me throughly from mine iniquity, and cleanse me from my sin. For I acknowledge my transgressions: and my sin is ever before me. Against thee, thee only, have I sinned, and done this evil in thy sight: that thou mightest be justified when thou speakest, and be clear when thou judgest."

**Meaning:** David confesses his sin honestly before God, acknowledging that ultimately all sin is against God Himself.  
**Application:** True repentance doesn't minimize or excuse. It calls sin what God calls it and brings it directly to Him for mercy.`.trim(),
        },
        {
          id: "d1-2cor79-10",
          type: "scripture",
          title: "Godly Grief vs. Worldly Grief",
          reference: "2 Corinthians 7:9–10",
          body: `**Scripture (KJV)**  
> "Now I rejoice, not that ye were made sorry, but that ye sorrowed to repentance: for ye were made sorry after a godly manner, that ye might receive damage by us in nothing. For godly sorrow worketh repentance to salvation not to be repented of: but the sorrow of the world worketh death."

**Meaning:** Godly grief produces repentance that leads to salvation without regret; worldly grief produces death.  
**Application:** There's a difference between being sorry you got caught and being sorry you sinned against God. Godly sorrow changes you; worldly sorrow just makes you feel bad.`.trim(),
        },
        {
          id: "d1-isaiah556-7",
          type: "scripture",
          title: "Return to the Lord",
          reference: "Isaiah 55:6–7",
          body: `**Scripture (KJV)**  
> "¶ Seek ye the LORD while he may be found, call ye upon him while he is near: Let the wicked forsake his way, and the unrighteous man his thoughts: and let him return unto the LORD, and he will have mercy upon him; and to our God, for he will abundantly pardon."

**Meaning:** Seek the Lord while He may be found; let the wicked forsake their way and return to the Lord, who will have compassion and abundantly pardon.  
**Application:** No matter how far you've gone, God invites you to return. His mercy is abundant, and His arms are open.`.trim(),
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
          body: `**Scripture (KJV)**  
> "If we say that we have no sin, we deceive ourselves, and the truth is not in us. If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness."

**Meaning:** If we say we have no sin, we deceive ourselves. But if we confess our sins, God is faithful and just to forgive us and cleanse us from all unrighteousness.  
**Application:** Confession brings cleansing, not condemnation. God doesn't reject you when you confess—He forgives you completely because of Jesus.`.trim(),
        },
        {
          id: "d2-prov2813",
          type: "scripture",
          title: "Concealing vs. Confessing",
          reference: "Proverbs 28:13",
          body: `**Scripture (KJV)**  
> "He that covereth his sins shall not prosper: but whoso confesseth and forsaketh them shall have mercy."

**Meaning:** Whoever conceals their sins will not prosper, but whoever confesses and forsakes them will receive mercy.  
**Application:** Hiding sin keeps you stuck. Confessing and turning from it opens the door to God's mercy and freedom.`.trim(),
        },
        {
          id: "d2-ps321-5",
          type: "scripture",
          title: "The Misery of Hiding Sin",
          reference: "Psalm 32:1–5",
          body: `**Scripture (KJV)**  
> "Blessed is he whose transgression is forgiven, whose sin is covered. Blessed is the man unto whom the LORD imputeth not iniquity, and in whose spirit there is no guile. When I kept silence, my bones waxed old through my roaring all the day long. For day and night thy hand was heavy upon me: my moisture is turned into the drought of summer. Selah. I acknowledged my sin unto thee, and mine iniquity have I not hid. I said, I will confess my transgressions unto the LORD; and thou forgavest the iniquity of my sin. Selah."

**Meaning:** David describes the physical and emotional misery of hiding sin, and the relief and forgiveness that came when he confessed it to God.  
**Application:** Unconfessed sin weighs you down spiritually, emotionally, and even physically. Confession brings relief and restoration.`.trim(),
        },
        {
          id: "d2-heb416",
          type: "scripture",
          title: "Come Boldly for Mercy",
          reference: "Hebrews 4:16",
          body: `**Scripture (KJV)**  
> "Let us therefore come boldly unto the throne of grace, that we may obtain mercy, and find grace to help in time of need."

**Meaning:** We can come boldly to the throne of grace to receive mercy and find help in time of need.  
**Application:** You don't have to crawl to God in shame. Because of Jesus, you can come confidently, knowing you'll receive mercy, not rejection.`.trim(),
        },
        {
          id: "d2-luke189-14",
          type: "scripture",
          title: "The Tax Collector's Humble Confession",
          reference: "Luke 18:9–14",
          body: `**Scripture (KJV)**  
> "And he spake this parable unto certain which trusted in themselves that they were righteous, and despised others: Two men went up into the temple to pray; the one a Pharisee, and the other a publican. The Pharisee stood and prayed thus with himself, God, I thank thee, that I am not as other men are, extortioners, unjust, adulterers, or even as this publican. I fast twice in the week, I give tithes of all that I possess. And the publican, standing afar off, would not lift up so much as his eyes unto heaven, but smote upon his breast, saying, God be merciful to me a sinner. I tell you, this man went down to his house justified rather than the other: for every one that exalteth himself shall be abased; and he that humbleth himself shall be exalted."

**Meaning:** Jesus contrasts a proud Pharisee who boasted in his own righteousness with a tax collector who humbly cried out for mercy. The tax collector went home justified, not the Pharisee.  
**Application:** God responds to humble, honest confession, not religious pride or self-justification.`.trim(),
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
          body: `**Scripture (KJV)**  
> "But shewed first unto them of Damascus, and at Jerusalem, and throughout all the coasts of Judæa, and then to the Gentiles, that they should repent and turn to God, and do works meet for repentance."

**Meaning:** Paul preached that people should repent, turn to God, and perform deeds in keeping with their repentance.  
**Application:** Real repentance shows up in your actions. If you've truly turned from sin, your life will begin to look different.`.trim(),
        },
        {
          id: "d3-eph422-24",
          type: "scripture",
          title: "Put Off the Old, Put On the New",
          reference: "Ephesians 4:22–24",
          body: `**Scripture (KJV)**  
> "That ye put off concerning the former conversation the old man, which is corrupt according to the deceitful lusts; And be renewed in the spirit of your mind; And that ye put on the new man, which after God is created in righteousness and true holiness."

**Meaning:** Put off your old self, which belongs to your former manner of life and is corrupt; be renewed in the spirit of your minds, and put on the new self, created after the likeness of God.  
**Application:** Repentance involves both putting off sinful patterns and putting on Christlike ones. It's not just stopping bad habits—it's replacing them with godly ones.`.trim(),
        },
        {
          id: "d3-rom1312-14",
          type: "scripture",
          title: "Put On Christ, Make No Provision for the Flesh",
          reference: "Romans 13:12–14",
          body: `**Scripture (KJV)**  
> "The night is far spent, the day is at hand: let us therefore cast off the works of darkness, and let us put on the armour of light. Let us walk honestly, as in the day; not in rioting and drunkenness, not in chambering and wantonness, not in strife and envying. But put ye on the Lord Jesus Christ, and make not provision for the flesh, to fulfil the lusts thereof."

**Meaning:** Cast off the works of darkness and put on the armor of light. Put on the Lord Jesus Christ, and make no provision for the flesh.  
**Application:** Don't set yourself up for failure by keeping easy access to sin. Remove temptation, cut off the pathways, and clothe yourself in Christ instead.`.trim(),
        },
        {
          id: "d3-col35-10",
          type: "scripture",
          title: "Put to Death What Is Earthly",
          reference: "Colossians 3:5–10",
          body: `**Scripture (KJV)**  
> "Mortify therefore your members which are upon the earth; fornication, uncleanness, inordinate affection, evil concupiscence, and covetousness, which is idolatry: For which things’ sake the wrath of God cometh on the children of disobedience: In the which ye also walked some time, when ye lived in them. But now ye also put off all these; anger, wrath, malice, blasphemy, filthy communication out of your mouth. Lie not one to another, seeing that ye have put off the old man with his deeds; And have put on the new man, which is renewed in knowledge after the image of him that created him:"

**Meaning:** Put to death what is earthly in you—sexual immorality, impurity, covetousness, and more. You have put off the old self and have put on the new self, being renewed in knowledge after the image of its Creator.  
**Application:** Repentance is serious. You're not casually managing sin—you're putting it to death and living as a new creation in Christ.`.trim(),
        },
        {
          id: "d3-heb121-2",
          type: "scripture",
          title: "Lay Aside Every Weight",
          reference: "Hebrews 12:1–2",
          body: `**Scripture (KJV)**  
> "Wherefore seeing we also are compassed about with so great a cloud of witnesses, let us lay aside every weight, and the sin which doth so easily beset us, and let us run with patience the race that is set before us, Looking unto Jesus the author and finisher of our faith; who for the joy that was set before him endured the cross, despising the shame, and is set down at the right hand of the throne of God."

**Meaning:** Lay aside every weight and sin that clings so closely, and run with endurance the race set before you, looking to Jesus.  
**Application:** Some things aren't sins, but they weigh you down. True repentance clears away everything that hinders your walk with Christ.`.trim(),
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
          body: `**Scripture (KJV)**  
> "¶ And he said to them all, If any man will come after me, let him deny himself, and take up his cross daily, and follow me."

**Meaning:** Jesus said, "If anyone would come after Me, let him deny himself and take up his cross daily and follow Me."  
**Application:** Following Jesus isn't a one-time decision—it's a daily choice. Every day you deny self and say yes to Christ.`.trim(),
        },
        {
          id: "d4-ps13923-24",
          type: "scripture",
          title: "Search Me, O God",
          reference: "Psalm 139:23–24",
          body: `**Scripture (KJV)**  
> "Search me, O God, and know my heart: try me, and know my thoughts: And see if there be any wicked way in me, and lead me in the way everlasting."

**Meaning:** David prays, "Search me, O God, and know my heart; try me and know my thoughts. See if there be any grievous way in me, and lead me in the way everlasting."  
**Application:** Don't wait until you stumble into sin to repent. Regularly invite God to show you areas that need His light and transformation.`.trim(),
        },
        {
          id: "d4-rev24-5",
          type: "scripture",
          title: "Remember, Repent, Return",
          reference: "Revelation 2:4–5",
          body: `**Scripture (KJV)**  
> "Nevertheless I have somewhat against thee, because thou hast left thy first love. Remember therefore from whence thou art fallen, and repent, and do the first works; or else I will come unto thee quickly, and will remove thy candlestick out of his place, except thou repent."

**Meaning:** Jesus tells the church in Ephesus: "You have abandoned the love you had at first. Remember therefore from where you have fallen; repent, and do the works you did at first."  
**Application:** Even mature believers can drift. The remedy is simple: remember where you've fallen from, repent, and return to doing what you once did with passion.`.trim(),
        },
        {
          id: "d4-lam340-41",
          type: "scripture",
          title: "Examine Our Ways and Return",
          reference: "Lamentations 3:40–41",
          body: `**Scripture (KJV)**  
> "Let us search and try our ways, and turn again to the LORD. Let us lift up our heart with our hands unto God in the heavens."

**Meaning:** "Let us test and examine our ways, and return to the Lord! Let us lift up our hearts and hands to God in heaven."  
**Application:** Regular self-examination isn't morbid introspection—it's wise stewardship of your walk with God. Look honestly at your life and return to Him.`.trim(),
        },
        {
          id: "d4-matt53-4",
          type: "scripture",
          title: "Blessed Are the Poor in Spirit",
          reference: "Matthew 5:3–4",
          body: `**Scripture (KJV)**  
> "Blessed are the poor in spirit: for theirs is the kingdom of heaven. Blessed are they that mourn: for they shall be comforted."

**Meaning:** "Blessed are the poor in spirit, for theirs is the kingdom of heaven. Blessed are those who mourn, for they shall be comforted."  
**Application:** A healthy spiritual life includes mourning over sin—not in hopeless despair, but in humble dependence on God's grace.`.trim(),
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
          body: `**Scripture (KJV)**  
> "There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit."

**Meaning:** There is therefore now no condemnation for those who are in Christ Jesus.  
**Application:** When you confess and repent, you don't live under condemnation. The verdict over you is "not guilty" because of Jesus.`.trim(),
        },
        {
          id: "d5-ps10310-12",
          type: "scripture",
          title: "As Far as East Is from West",
          reference: "Psalm 103:10–12",
          body: `**Scripture (KJV)**  
> "He hath not dealt with us after our sins; nor rewarded us according to our iniquities. For as the heaven is high above the earth, so great is his mercy toward them that fear him. As far as the east is from the west, so far hath he removed our transgressions from us."

**Meaning:** God does not deal with us according to our sins. He has removed our transgressions from us as far as the east is from the west.  
**Application:** God's forgiveness is total and final. He doesn't keep a record to throw back at you later. Your sin is gone—completely.`.trim(),
        },
        {
          id: "d5-mic718-19",
          type: "scripture",
          title: "God Delights in Steadfast Love",
          reference: "Micah 7:18–19",
          body: `**Scripture (KJV)**  
> "Who is a God like unto thee, that pardoneth iniquity, and passeth by the transgression of the remnant of his heritage? he retaineth not his anger for ever, because he delighteth in mercy. He will turn again, he will have compassion upon us; he will subdue our iniquities; and thou wilt cast all their sins into the depths of the sea."

**Meaning:** Who is a God like You, pardoning iniquity and passing over transgression? He does not retain His anger forever, because He delights in steadfast love. He will cast all our sins into the depths of the sea.  
**Application:** God doesn't forgive grudgingly—He delights in showing mercy. He throws your sins into the deepest part of the ocean, never to be retrieved.`.trim(),
        },
        {
          id: "d5-heb1014-17",
          type: "scripture",
          title: "Perfected and Remembered No More",
          reference: "Hebrews 10:14–17",
          body: `**Scripture (KJV)**  
> "For by one offering he hath perfected for ever them that are sanctified. Whereof the Holy Ghost also is a witness to us: for after that he had said before, This is the covenant that I will make with them after those days, saith the Lord, I will put my laws into their hearts, and in their minds will I write them; And their sins and iniquities will I remember no more."

**Meaning:** By a single offering, Christ has perfected for all time those who are being sanctified. The Holy Spirit testifies: "I will remember their sins and their lawless deeds no more."  
**Application:** Christ's sacrifice was once for all. Your sins are not just covered—they're forgotten by God. He doesn't bring them up because Jesus has dealt with them fully.`.trim(),
        },
        {
          id: "d5-col213-14",
          type: "scripture",
          title: "Your Debt Was Nailed to the Cross",
          reference: "Colossians 2:13–14",
          body: `**Scripture (KJV)**  
> "And you, being dead in your sins and the uncircumcision of your flesh, hath he quickened together with him, having forgiven you all trespasses; Blotting out the handwriting of ordinances that was against us, which was contrary to us, and took it out of the way, nailing it to his cross;"

**Meaning:** God made you alive together with Christ, having forgiven us all our trespasses, by canceling the record of debt that stood against us with its legal demands. This He set aside, nailing it to the cross.  
**Application:** The legal record of your sins was nailed to the cross with Jesus. The debt is paid. The charges are dropped. You are free.`.trim(),
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
          body: `**Scripture (KJV)**  
> "The earth is the LORD’s, and the fulness thereof; the world, and they that dwell therein."

**Meaning:** The earth and everything in it belong to the Lord.  
**Application:** Everything you have—money, possessions, even your abilities—all belong to God. You're managing His resources, not your own.`.trim(),
        },
        {
          id: "d1-hag28",
          type: "scripture",
          title: "Silver and Gold Are God's",
          reference: "Haggai 2:8",
          body: `**Scripture (KJV)**  
> "The silver is mine, and the gold is mine, saith the LORD of hosts."

**Meaning:** The silver and gold belong to God.  
**Application:** Money is not ultimately yours. God owns it all, and He entrusts it to you for His purposes.`.trim(),
        },
        {
          id: "d1-deut818",
          type: "scripture",
          title: "God Gives You Power to Produce Wealth",
          reference: "Deuteronomy 8:18",
          body: `**Scripture (KJV)**  
> "But thou shalt remember the LORD thy God: for it is he that giveth thee power to get wealth, that he may establish his covenant which he sware unto thy fathers, as it is this day."

**Meaning:** God gives you the ability to produce wealth.  
**Application:** Your job, your skills, your opportunities—all come from God. Don't forget that He is the source of everything you have.`.trim(),
        },
        {
          id: "d1-1chron2911-14",
          type: "scripture",
          title: "All Things Come from God",
          reference: "1 Chronicles 29:11–14",
          body: `**Scripture (KJV)**  
> "Thine, O LORD, is the greatness, and the power, and the glory, and the victory, and the majesty: for all that is in the heaven and in the earth is thine; thine is the kingdom, O LORD, and thou art exalted as head above all. Both riches and honour come of thee, and thou reignest over all; and in thine hand is power and might; and in thine hand it is to make great, and to give strength unto all. Now therefore, our God, we thank thee, and praise thy glorious name. But who am I, and what is my people, that we should be able to offer so willingly after this sort? for all things come of thee, and of thine own have we given thee."

**Meaning:** David praises God, acknowledging that all things come from Him, and we give only what is already His.  
**Application:** When you give to God, you're not giving away your stuff—you're returning what was His all along.`.trim(),
        },
        {
          id: "d1-1cor42",
          type: "scripture",
          title: "Stewards Must Be Found Faithful",
          reference: "1 Corinthians 4:2",
          body: `**Scripture (KJV)**  
> "Moreover it is required in stewards, that a man be found faithful."

**Meaning:** It is required of stewards that they be found faithful.  
**Application:** God will evaluate how you managed what He entrusted to you. The question isn't "Did you have much?" but "Were you faithful with what you had?"`.trim(),
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
          body: `**Scripture (KJV)**  
> "And he said unto them, Take heed, and beware of covetousness: for a man’s life consisteth not in the abundance of the things which he possesseth."

**Meaning:** Jesus warns to beware of all covetousness, for life is more than possessions.  
**Application:** Your worth and security don't come from what you own. Greed promises satisfaction but never delivers.`.trim(),
        },
        {
          id: "d2-1tim69-10",
          type: "scripture",
          title: "Love of Money Leads to Sorrows",
          reference: "1 Timothy 6:9–10",
          body: `**Scripture (KJV)**  
> "But they that will be rich fall into temptation and a snare, and into many foolish and hurtful lusts, which drown men in destruction and perdition. For the love of money is the root of all evil: which while some coveted after, they have erred from the faith, and pierced themselves through with many sorrows."

**Meaning:** Those who desire to be rich fall into temptation and many harmful desires. The love of money is a root of all kinds of evils.  
**Application:** Money itself isn't evil, but loving it leads to destruction. It's a trap that promises freedom but delivers slavery.`.trim(),
        },
        {
          id: "d2-matt619-21",
          type: "scripture",
          title: "Where Your Treasure Is",
          reference: "Matthew 6:19–21",
          body: `**Scripture (KJV)**  
> "¶ Lay not up for yourselves treasures upon earth, where moth and rust doth corrupt, and where thieves break through and steal: But lay up for yourselves treasures in heaven, where neither moth nor rust doth corrupt, and where thieves do not break through nor steal: For where your treasure is, there will your heart be also."

**Meaning:** Don't store up treasures on earth, but in heaven. Where your treasure is, there your heart will be also.  
**Application:** What you spend your money on reveals what you truly value. Invest in what lasts forever, not what rusts away.`.trim(),
        },
        {
          id: "d2-heb135",
          type: "scripture",
          title: "Be Content",
          reference: "Hebrews 13:5",
          body: `**Scripture (KJV)**  
> "Let your conversation be without covetousness; and be content with such things as ye have: for he hath said, I will never leave thee, nor forsake thee."

**Meaning:** Keep your life free from love of money, and be content with what you have, for God said, "I will never leave you or forsake you."  
**Application:** Contentment comes not from having more, but from trusting that God is with you and will provide what you need.`.trim(),
        },
        {
          id: "d2-col35",
          type: "scripture",
          title: "Greed Is Idolatry",
          reference: "Colossians 3:5",
          body: `**Scripture (KJV)**  
> "Mortify therefore your members which are upon the earth; fornication, uncleanness, inordinate affection, evil concupiscence, and covetousness, which is idolatry:"

**Meaning:** Put to death what is earthly in you, including covetousness, which is idolatry.  
**Application:** Greed is not just a bad habit—it's worshiping money instead of God. It's spiritual adultery.`.trim(),
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
          body: `**Scripture (KJV)**  
> "But this I say, He which soweth sparingly shall reap also sparingly; and he which soweth bountifully shall reap also bountifully. Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver. And God is able to make all grace abound toward you; that ye, always having all sufficiency in all things, may abound to every good work:"

**Meaning:** Whoever sows sparingly will also reap sparingly, and whoever sows bountifully will also reap bountifully. God loves a cheerful giver and is able to make all grace abound to you.  
**Application:** Generosity isn't a loss—it's a seed. God blesses cheerful givers and supplies what they need to keep giving.`.trim(),
        },
        {
          id: "d3-prov39-10",
          type: "scripture",
          title: "Honor the Lord with Your Wealth",
          reference: "Proverbs 3:9–10",
          body: `**Scripture (KJV)**  
> "Honour the LORD with thy substance, and with the firstfruits of all thine increase: So shall thy barns be filled with plenty, and thy presses shall burst out with new wine."

**Meaning:** Honor the Lord with your wealth and with the firstfruits of all your produce.  
**Application:** Giving God your "firstfruits" means He gets first priority, not the leftovers. It's an act of worship and trust.`.trim(),
        },
        {
          id: "d3-acts2035",
          type: "scripture",
          title: "More Blessed to Give",
          reference: "Acts 20:35",
          body: `**Scripture (KJV)**  
> "I have shewed you all things, how that so labouring ye ought to support the weak, and to remember the words of the Lord Jesus, how he said, It is more blessed to give than to receive."

**Meaning:** Jesus said it is more blessed to give than to receive.  
**Application:** Generosity brings a joy that hoarding never can. When you give, you taste the heart of God.`.trim(),
        },
        {
          id: "d3-phil418-19",
          type: "scripture",
          title: "A Fragrant Offering",
          reference: "Philippians 4:18–19",
          body: `**Scripture (KJV)**  
> "But I have all, and abound: I am full, having received of Epaphroditus the things which were sent from you, an odour of a sweet smell, a sacrifice acceptable, wellpleasing to God. But my God shall supply all your need according to his riches in glory by Christ Jesus."

**Meaning:** Paul says the gifts given are a fragrant offering, a sacrifice acceptable and pleasing to God. And God will supply every need of yours.  
**Application:** Your giving is an offering to God. He sees it, is pleased by it, and promises to take care of your needs.`.trim(),
        },
        {
          id: "d3-mark1241-44",
          type: "scripture",
          title: "The Widow's Small Gift",
          reference: "Mark 12:41–44",
          body: `**Scripture (KJV)**  
> "¶ And Jesus sat over against the treasury, and beheld how the people cast money into the treasury: and many that were rich cast in much. And there came a certain poor widow, and she threw in two mites, which make a farthing. And he called unto him his disciples, and saith unto them, Verily I say unto you, That this poor widow hath cast more in, than all they which have cast into the treasury: For all they did cast in of their abundance; but she of her want did cast in all that she had, even all her living."

**Meaning:** Jesus commends a poor widow who gave two small coins, saying she gave more than all the rich people because she gave out of her poverty.  
**Application:** God doesn't measure your gift by the amount, but by the heart. Sacrificial giving honors God more than large gifts given casually.`.trim(),
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
          body: `**Scripture (KJV)**  
> "He becometh poor that dealeth with a slack hand: but the hand of the diligent maketh rich."

**Meaning:** A slack hand causes poverty, but the hand of the diligent makes rich.  
**Application:** Hard work and diligence honor God. Laziness leads to need; faithful work provides for yourself and others.`.trim(),
        },
        {
          id: "d4-prov2120",
          type: "scripture",
          title: "The Wise Store Up",
          reference: "Proverbs 21:20",
          body: `**Scripture (KJV)**  
> "There is treasure to be desired and oil in the dwelling of the wise; but a foolish man spendeth it up."

**Meaning:** Precious treasure and oil are in a wise person's dwelling, but a foolish man devours it.  
**Application:** Saving wisely is biblical. The fool spends everything immediately; the wise prepare for the future.`.trim(),
        },
        {
          id: "d4-prov227",
          type: "scripture",
          title: "The Borrower Is Slave to the Lender",
          reference: "Proverbs 22:7",
          body: `**Scripture (KJV)**  
> "The rich ruleth over the poor, and the borrower is servant to the lender."

**Meaning:** The rich rules over the poor, and the borrower is the slave of the lender.  
**Application:** Debt puts you in bondage. Be cautious about borrowing, and work to live within your means and become debt-free.`.trim(),
        },
        {
          id: "d4-matt631-33",
          type: "scripture",
          title: "Seek First God's Kingdom",
          reference: "Matthew 6:31–33",
          body: `**Scripture (KJV)**  
> "Therefore take no thought, saying, What shall we eat? or, What shall we drink? or, Wherewithal shall we be clothed? (For after all these things do the Gentiles seek:) for your heavenly Father knoweth that ye have need of all these things. But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you."

**Meaning:** Don't be anxious about food and clothing. Seek first the kingdom of God and His righteousness, and all these things will be added to you.  
**Application:** When God's kingdom is your priority, He takes care of your needs. Worry less about money; seek Him more.`.trim(),
        },
        {
          id: "d4-1tim66-8",
          type: "scripture",
          title: "Godliness with Contentment",
          reference: "1 Timothy 6:6–8",
          body: `**Scripture (KJV)**  
> "But godliness with contentment is great gain. For we brought nothing into this world, and it is certain we can carry nothing out. And having food and raiment let us be therewith content."

**Meaning:** Godliness with contentment is great gain. If we have food and clothing, with these we will be content.  
**Application:** True wealth is godliness combined with contentment, not a big bank account. Learn to be satisfied with what God provides.`.trim(),
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
          body: `**Scripture (KJV)**  
> "For ye know the grace of our Lord Jesus Christ, that, though he was rich, yet for your sakes he became poor, that ye through his poverty might be rich."

**Meaning:** Though Jesus was rich, yet for your sake He became poor, so that you by His poverty might become rich.  
**Application:** Jesus gave up everything for you. Your generosity is a reflection of the gospel—giving sacrificially because you've been given everything in Christ.`.trim(),
        },
        {
          id: "d5-eph51-2",
          type: "scripture",
          title: "Imitate God and Walk in Love",
          reference: "Ephesians 5:1–2",
          body: `**Scripture (KJV)**  
> "Be ye therefore followers of God, as dear children; And walk in love, as Christ also hath loved us, and hath given himself for us an offering and a sacrifice to God for a sweetsmelling savour."

**Meaning:** Be imitators of God and walk in love, as Christ loved us and gave Himself up for us.  
**Application:** Jesus is your model for generosity. He gave His life; you give your resources, time, and love as a reflection of Him.`.trim(),
        },
        {
          id: "d5-luke638",
          type: "scripture",
          title: "Give and It Will Be Given to You",
          reference: "Luke 6:38",
          body: `**Scripture (KJV)**  
> "Give, and it shall be given unto you; good measure, pressed down, and shaken together, and running over, shall men give into your bosom. For with the same measure that ye mete withal it shall be measured to you again."

**Meaning:** Give, and it will be given to you. Good measure, pressed down, shaken together, running over, will be put into your lap.  
**Application:** God's measure is overflowing. You can't out-give God—He blesses generosity in ways you can't predict.`.trim(),
        },
        {
          id: "d5-titus34-7",
          type: "scripture",
          title: "God Saved Us by His Mercy",
          reference: "Titus 3:4–7",
          body: `**Scripture (KJV)**  
> "But after that the kindness and love of God our Saviour toward man appeared, Not by works of righteousness which we have done, but according to his mercy he saved us, by the washing of regeneration, and renewing of the Holy Ghost; Which he shed on us abundantly through Jesus Christ our Saviour; That being justified by his grace, we should be made heirs according to the hope of eternal life."

**Meaning:** When the goodness and loving kindness of God appeared, He saved us not because of works done by us, but according to His own mercy.  
**Application:** You didn't earn salvation; God gave it generously. Let that generous grace overflow into how you live and give.`.trim(),
        },
        {
          id: "d5-matt2534-40",
          type: "scripture",
          title: "Serving the Least Is Serving Jesus",
          reference: "Matthew 25:34–40",
          body: `**Scripture (KJV)**  
> "Then shall the King say unto them on his right hand, Come, ye blessed of my Father, inherit the kingdom prepared for you from the foundation of the world: For I was an hungred, and ye gave me meat: I was thirsty, and ye gave me drink: I was a stranger, and ye took me in: Naked, and ye clothed me: I was sick, and ye visited me: I was in prison, and ye came unto me. Then shall the righteous answer him, saying, Lord, when saw we thee an hungred, and fed thee? or thirsty, and gave thee drink? When saw we thee a stranger, and took thee in? or naked, and clothed thee? Or when saw we thee sick, or in prison, and came unto thee? And the King shall answer and say unto them, Verily I say unto you, Inasmuch as ye have done it unto one of the least of these my brethren, ye have done it unto me."

**Meaning:** Jesus says that when you serve the hungry, the stranger, the sick, or the prisoner, you are serving Him.  
**Application:** Generosity to those in need is generosity to Jesus Himself. How you treat the least among you reveals your heart toward Him.`.trim(),
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
          body: `**Scripture (KJV)**  
> "Finally, my brethren, be strong in the Lord, and in the power of his might. Put on the whole armour of God, that ye may be able to stand against the wiles of the devil. For we wrestle not against flesh and blood, but against principalities, against powers, against the rulers of the darkness of this world, against spiritual wickedness in high places."

**Meaning:** Be strong in the Lord. Your struggle is not against flesh and blood, but against spiritual forces of evil.  
**Application:** When conflict arises, remember the real enemy is spiritual. People are not your opponents—they're fellow image-bearers caught in the same war.`.trim(),
        },
        {
          id: "d1-2cor103-4",
          type: "scripture",
          title: "Weapons with Divine Power",
          reference: "2 Corinthians 10:3–4",
          body: `**Scripture (KJV)**  
> "For though we walk in the flesh, we do not war after the flesh: (For the weapons of our warfare are not carnal, but mighty through God to the pulling down of strong holds;)"

**Meaning:** Though we walk in the flesh, we are not waging war according to the flesh. Our weapons have divine power to destroy strongholds.  
**Application:** You can't fight spiritual battles with human strategies. Prayer, Scripture, and faith are your real weapons.`.trim(),
        },
        {
          id: "d1-1pet58-9",
          type: "scripture",
          title: "Resist the Devil",
          reference: "1 Peter 5:8–9",
          body: `**Scripture (KJV)**  
> "Be sober, be vigilant; because your adversary the devil, as a roaring lion, walketh about, seeking whom he may devour: Whom resist stedfast in the faith, knowing that the same afflictions are accomplished in your brethren that are in the world."

**Meaning:** Be sober-minded and watchful. Your adversary the devil prowls like a roaring lion, seeking someone to devour. Resist him, firm in your faith.  
**Application:** The enemy is real and active. Don't be naive or fearful—be alert and stand firm in Christ.`.trim(),
        },
        {
          id: "d1-john1010",
          type: "scripture",
          title: "The Thief Comes to Destroy",
          reference: "John 10:10",
          body: `**Scripture (KJV)**  
> "The thief cometh not, but for to steal, and to kill, and to destroy: I am come that they might have life, and that they might have it more abundantly."

**Meaning:** The thief comes only to steal, kill, and destroy. Jesus came that you may have life and have it abundantly.  
**Application:** The enemy's goal is destruction. Jesus' goal is abundant life. Recognize which voice you're listening to.`.trim(),
        },
        {
          id: "d1-col213-15",
          type: "scripture",
          title: "Christ Disarmed Spiritual Rulers",
          reference: "Colossians 2:13–15",
          body: `**Scripture (KJV)**  
> "And you, being dead in your sins and the uncircumcision of your flesh, hath he quickened together with him, having forgiven you all trespasses; Blotting out the handwriting of ordinances that was against us, which was contrary to us, and took it out of the way, nailing it to his cross; And having spoiled principalities and powers, he made a shew of them openly, triumphing over them in it."

**Meaning:** God made you alive with Christ, having forgiven all your trespasses. He disarmed the rulers and authorities and put them to open shame, triumphing over them in the cross.  
**Application:** The enemy has been defeated at the cross. You fight from victory, not for victory.`.trim(),
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
          body: `**Scripture (KJV)**  
> "Wherefore take unto you the whole armour of God, that ye may be able to withstand in the evil day, and having done all, to stand. Stand therefore, having your loins girt about with truth, and having on the breastplate of righteousness;"

**Meaning:** Take up the whole armor of God so you can stand. Stand therefore, having fastened on the belt of truth and the breastplate of righteousness.  
**Application:** Truth and righteousness are foundational. Without them, the rest of your armor doesn't work.`.trim(),
        },
        {
          id: "d2-john1717",
          type: "scripture",
          title: "God's Word Is Truth",
          reference: "John 17:17",
          body: `**Scripture (KJV)**  
> "Sanctify them through thy truth: thy word is truth."

**Meaning:** Jesus prays, "Sanctify them in the truth; Your word is truth."  
**Application:** The Word of God is your standard for truth. When the enemy lies, the Bible exposes it.`.trim(),
        },
        {
          id: "d2-john831-32",
          type: "scripture",
          title: "The Truth Sets You Free",
          reference: "John 8:31–32",
          body: `**Scripture (KJV)**  
> "Then said Jesus to those Jews which believed on him, If ye continue in my word, then are ye my disciples indeed; And ye shall know the truth, and the truth shall make you free."

**Meaning:** Jesus said, "If you abide in My word, you are truly My disciples, and you will know the truth, and the truth will set you free."  
**Application:** Knowing and living in God's truth brings freedom. Lies keep you in bondage; truth liberates.`.trim(),
        },
        {
          id: "d2-2cor521",
          type: "scripture",
          title: "Become God's Righteousness in Christ",
          reference: "2 Corinthians 5:21",
          body: `**Scripture (KJV)**  
> "For he hath made him to be sin for us, who knew no sin; that we might be made the righteousness of God in him."

**Meaning:** God made Jesus who knew no sin to be sin for us, so that in Him we might become the righteousness of God.  
**Application:** Your righteousness before God is not your own—it's Christ's. When the enemy accuses, point to the cross.`.trim(),
        },
        {
          id: "d2-rom833-34",
          type: "scripture",
          title: "Who Can Bring a Charge?",
          reference: "Romans 8:33–34",
          body: `**Scripture (KJV)**  
> "Who shall lay any thing to the charge of God’s elect? It is God that justifieth. Who is he that condemneth? It is Christ that died, yea rather, that is risen again, who is even at the right hand of God, who also maketh intercession for us."

**Meaning:** Who shall bring any charge against God's elect? It is God who justifies. Who is to condemn? Christ Jesus is the one who died and was raised, who is at the right hand of God interceding for us.  
**Application:** Satan is the accuser, but God is the justifier. When accusations come, remember: you are justified by Christ, not condemned.`.trim(),
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
          body: `**Scripture (KJV)**  
> "And your feet shod with the preparation of the gospel of peace; Above all, taking the shield of faith, wherewith ye shall be able to quench all the fiery darts of the wicked."

**Meaning:** Have your feet fitted with the readiness given by the gospel of peace. Take up the shield of faith, with which you can extinguish all the flaming darts of the evil one.  
**Application:** Peace with God makes you immovable. Faith in God protects you from the enemy's attacks.`.trim(),
        },
        {
          id: "d3-rom51",
          type: "scripture",
          title: "Peace with God Through Faith",
          reference: "Romans 5:1",
          body: `**Scripture (KJV)**  
> "Therefore being justified by faith, we have peace with God through our Lord Jesus Christ:"

**Meaning:** Therefore, since we have been justified by faith, we have peace with God through our Lord Jesus Christ.  
**Application:** You're not at war with God anymore. That peace is your foundation for every battle you face.`.trim(),
        },
        {
          id: "d3-isaiah527",
          type: "scripture",
          title: "Beautiful Are the Feet",
          reference: "Isaiah 52:7",
          body: `**Scripture (KJV)**  
> "¶ How beautiful upon the mountains are the feet of him that bringeth good tidings, that publisheth peace; that bringeth good tidings of good, that publisheth salvation; that saith unto Zion, Thy God reigneth!"

**Meaning:** How beautiful upon the mountains are the feet of him who brings good news, who publishes peace.  
**Application:** When you carry the gospel, you bring the best news in the world. Be ready to share it wherever you go.`.trim(),
        },
        {
          id: "d3-heb111-6",
          type: "scripture",
          title: "Faith Is Assurance",
          reference: "Hebrews 11:1, 6",
          body: `**Scripture (KJV)**  
> "Now faith is the substance of things hoped for, the evidence of things not seen."

**Meaning:** Faith is the assurance of things hoped for, the conviction of things not seen. Without faith it is impossible to please God.  
**Application:** Faith isn't wishful thinking—it's confidence in God's character and promises, even when you can't see the outcome yet.`.trim(),
        },
        {
          id: "d3-ps914-5",
          type: "scripture",
          title: "God Is a Shield",
          reference: "Psalm 91:4–5",
          body: `**Scripture (KJV)**  
> "He shall cover thee with his feathers, and under his wings shalt thou trust: his truth shall be thy shield and buckler. Thou shalt not be afraid for the terror by night; nor for the arrow that flieth by day;"

**Meaning:** God will cover you with His pinions; under His wings you will find refuge. His faithfulness is a shield. You will not fear the terror of the night, nor the arrow that flies by day.  
**Application:** God Himself is your shield. When fear and doubt come like arrows, run to Him for refuge.`.trim(),
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
          body: `**Scripture (KJV)**  
> "And take the helmet of salvation, and the sword of the Spirit, which is the word of God:"

**Meaning:** Take the helmet of salvation and the sword of the Spirit, which is the word of God.  
**Application:** Salvation secures your mind; Scripture equips your hand. Both are essential for spiritual warfare.`.trim(),
        },
        {
          id: "d4-1thess58",
          type: "scripture",
          title: "Put On the Helmet of Hope",
          reference: "1 Thessalonians 5:8",
          body: `**Scripture (KJV)**  
> "But let us, who are of the day, be sober, putting on the breastplate of faith and love; and for an helmet, the hope of salvation."

**Meaning:** Since we belong to the day, let us be sober, having put on the breastplate of faith and love, and for a helmet the hope of salvation.  
**Application:** The helmet is the hope of salvation—confidence that God will finish what He started in you.`.trim(),
        },
        {
          id: "d4-rom838-39",
          type: "scripture",
          title: "Nothing Can Separate You from God's Love",
          reference: "Romans 8:38–39",
          body: `**Scripture (KJV)**  
> "For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come, Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord."

**Meaning:** I am sure that neither death nor life, nor angels nor rulers, nor things present nor things to come, nor powers, nor height nor depth, nor anything else in all creation, will be able to separate us from the love of God in Christ Jesus our Lord.  
**Application:** When the enemy whispers that you're not saved or that God has abandoned you, stand on this truth: nothing can separate you from His love.`.trim(),
        },
        {
          id: "d4-matt41-11",
          type: "scripture",
          title: "Jesus Uses Scripture Against Temptation",
          reference: "Matthew 4:1–11",
          body: `**Scripture (KJV)**  
> "Then was Jesus led up of the Spirit into the wilderness to be tempted of the devil. And when he had fasted forty days and forty nights, he was afterward an hungred. And when the tempter came to him, he said, If thou be the Son of God, command that these stones be made bread. But he answered and said, It is written, Man shall not live by bread alone, but by every word that proceedeth out of the mouth of God. Then the devil taketh him up into the holy city, and setteth him on a pinnacle of the temple, And saith unto him, If thou be the Son of God, cast thyself down: for it is written, He shall give his angels charge concerning thee: and in their hands they shall bear thee up, lest at any time thou dash thy foot against a stone. Jesus said unto him, It is written again, Thou shalt not tempt the Lord thy God. Again, the devil taketh him up into an exceeding high mountain, and sheweth him all the kingdoms of the world, and the glory of them; And saith unto him, All these things will I give thee, if thou wilt fall down and worship me. Then saith Jesus unto him, Get thee hence, Satan: for it is written, Thou shalt worship the Lord thy God, and him only shalt thou serve. Then the devil leaveth him, and, behold, angels came and ministered unto him."

**Meaning:** Jesus was tempted by the devil and responded every time with "It is written…"  
**Application:** Jesus defeated Satan with Scripture, not feelings or arguments. Follow His example: fight lies with God's Word.`.trim(),
        },
        {
          id: "d4-ps1496",
          type: "scripture",
          title: "A Two-Edged Sword in Their Hand",
          reference: "Psalm 149:6",
          body: `**Scripture (KJV)**  
> "Let the high praises of God be in their mouth, and a twoedged sword in their hand;"

**Meaning:** Let the high praises of God be in their throats and a two-edged sword in their hands.  
**Application:** Worship and the Word go together. When you praise God and wield His Word, you're armed for battle.`.trim(),
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
          body: `**Scripture (KJV)**  
> "Praying always with all prayer and supplication in the Spirit, and watching thereunto with all perseverance and supplication for all saints; And for me, that utterance may be given unto me, that I may open my mouth boldly, to make known the mystery of the gospel, For which I am an ambassador in bonds: that therein I may speak boldly, as I ought to speak."

**Meaning:** Pray at all times in the Spirit, with all prayer and supplication. Keep alert with all perseverance, making supplication for all the saints.  
**Application:** The armor isn't complete without prayer. Constant, Spirit-led prayer is how you stay connected to God and the body of Christ in the fight.`.trim(),
        },
        {
          id: "d5-james516",
          type: "scripture",
          title: "Pray for One Another",
          reference: "James 5:16",
          body: `**Scripture (KJV)**  
> "Confess your faults one to another, and pray one for another, that ye may be healed. The effectual fervent prayer of a righteous man availeth much."

**Meaning:** Confess your sins to one another and pray for one another, that you may be healed. The prayer of a righteous person has great power.  
**Application:** Don't hide your struggles. Bring them to trusted believers who will pray with you and for you.`.trim(),
        },
        {
          id: "d5-heb1024-25",
          type: "scripture",
          title: "Stir One Another Up",
          reference: "Hebrews 10:24–25",
          body: `**Scripture (KJV)**  
> "And let us consider one another to provoke unto love and to good works: Not forsaking the assembling of ourselves together, as the manner of some is; but exhorting one another: and so much the more, as ye see the day approaching."

**Meaning:** Let us consider how to stir up one another to love and good works, not neglecting to meet together, but encouraging one another.  
**Application:** You need the church, and the church needs you. Don't isolate—gather, encourage, and fight together.`.trim(),
        },
        {
          id: "d5-gal62",
          type: "scripture",
          title: "Bear One Another's Burdens",
          reference: "Galatians 6:2",
          body: `**Scripture (KJV)**  
> "Bear ye one another’s burdens, and so fulfil the law of Christ."

**Meaning:** Bear one another's burdens, and so fulfill the law of Christ.  
**Application:** When a fellow believer is struggling spiritually, step in. Pray for them, encourage them, and help carry their load.`.trim(),
        },
        {
          id: "d5-matt1819-20",
          type: "scripture",
          title: "Jesus Is Present Where Believers Agree",
          reference: "Matthew 18:19–20",
          body: `**Scripture (KJV)**  
> "Again I say unto you, That if two of you shall agree on earth as touching any thing that they shall ask, it shall be done for them of my Father which is in heaven. For where two or three are gathered together in my name, there am I in the midst of them."

**Meaning:** If two of you agree on earth about anything they ask, it will be done for them by My Father in heaven. For where two or three are gathered in My name, there am I among them.  
**Application:** Corporate prayer has power. When believers unite in prayer, Jesus is present, and the Father listens.`.trim(),
        },
      ],
    },
  ],
};

export const identityInChristPlan: DiscipleshipPlan = {
  id: "identity-in-christ",
  title: "Identity in Christ",
  subtitle: "Seeing yourself the way God sees you",
  imageUrl: identityMirrorImage,
  totalDays: 5,
  days: [
    {
      id: "day-1",
      dayNumber: 1,
      title: "From Guilty to Forgiven",
      items: [
        {
          id: "d1-devotional",
          type: "devotional",
          title: "Day 1 — From Guilty to Forgiven",
          body: `Your identity is not who you were—it's who God says you are now. Before Christ, you were guilty, condemned, and separated from God. But in Christ, you are forgiven, redeemed, and brought near.

Too many believers still live under the weight of guilt and shame, forgetting that the cross paid for all of it. God doesn't just tolerate you—He delights in you because you are clothed in the righteousness of Christ.

**Reflection**

Do you live more like a guilty sinner or a forgiven child? What would change if you truly believed God's verdict over you?

**Prayer**

Father, thank You for declaring me forgiven through Jesus. Help me to stop living under guilt and to walk in the freedom You've given me.

**Shareable Truth**

"In Christ, your past does not define you—God's grace does."`,
        },
        {
          id: "d1-eph17",
          type: "scripture",
          title: "Redemption Through His Blood",
          reference: "Ephesians 1:7",
          body: `**Scripture (KJV)**  
> "In whom we have redemption through his blood, the forgiveness of sins, according to the riches of his grace;"

**Meaning:** In Christ we have redemption through His blood, the forgiveness of our trespasses, according to the riches of His grace.  
**Application:** Forgiveness is not based on your performance but on Christ's blood. You are fully forgiven because of what Jesus did, not what you do.`.trim(),
        },
        {
          id: "d1-col113-14",
          type: "scripture",
          title: "Transferred to the Kingdom",
          reference: "Colossians 1:13–14",
          body: `**Scripture (KJV)**  
> "Who hath delivered us from the power of darkness, and hath translated us into the kingdom of his dear Son: In whom we have redemption through his blood, even the forgiveness of sins:"

**Meaning:** God has delivered us from the domain of darkness and transferred us to the kingdom of His beloved Son, in whom we have redemption, the forgiveness of sins.  
**Application:** You're not just forgiven—you've been moved from one kingdom to another. You now belong to Jesus and live under His reign.`.trim(),
        },
        {
          id: "d1-rom81",
          type: "scripture",
          title: "No Condemnation",
          reference: "Romans 8:1",
          body: `**Scripture (KJV)**  
> "There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit."

**Meaning:** There is therefore now no condemnation for those who are in Christ Jesus.  
**Application:** If you are in Christ, God does not condemn you. The guilty verdict has been removed. Live like it.`.trim(),
        },
        {
          id: "d1-1jn19",
          type: "scripture",
          title: "He Is Faithful to Forgive",
          reference: "1 John 1:9",
          body: `**Scripture (KJV)**  
> "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness."

**Meaning:** If we confess our sins, He is faithful and just to forgive us our sins and to cleanse us from all unrighteousness.  
**Application:** When you sin, don't hide. Confess it. God promises to forgive and cleanse you every single time.`.trim(),
        },
      ],
    },
    {
      id: "day-2",
      dayNumber: 2,
      title: "From Orphan to Child of God",
      items: [
        {
          id: "d2-devotional",
          type: "devotional",
          title: "Day 2 — From Orphan to Child of God",
          body: `Before Christ, you were spiritually orphaned—separated from God, without hope, and without belonging. But in Christ, you are adopted into God's family. You are not just forgiven—you are His child.

Adoption means you have a Father who loves you, a family who belongs with you, and an inheritance that cannot be taken away. This is not just a legal transaction; it's a relationship of love.

**Reflection**

Do you approach God as a distant stranger or as your loving Father? How does knowing you're His child change the way you live?

**Prayer**

Abba, Father, thank You for adopting me into Your family. Teach me to live as Your beloved child, not as an orphan.

**Shareable Truth**

"You are not an orphan striving for acceptance—you are a child loved by the Father."`,
        },
        {
          id: "d2-jn112-13",
          type: "scripture",
          title: "Children of God",
          reference: "John 1:12–13",
          body: `**Scripture (KJV)**  
> "But as many as received him, to them gave he power to become the sons of God, even to them that believe on his name: Which were born, not of blood, nor of the will of the flesh, nor of the will of man, but of God."

**Meaning:** To all who did receive Him, who believed in His name, He gave the right to become children of God, who were born, not of blood nor of the will of the flesh nor of the will of man, but of God.  
**Application:** Your identity as God's child is not based on your family background or efforts—it's a gift of grace through faith in Jesus.`.trim(),
        },
        {
          id: "d2-rom814-15",
          type: "scripture",
          title: "The Spirit of Adoption",
          reference: "Romans 8:14–15",
          body: `**Scripture (KJV)**  
> "For as many as are led by the Spirit of God, they are the sons of God. For ye have not received the spirit of bondage again to fear; but ye have received the Spirit of adoption, whereby we cry, Abba, Father."

**Meaning:** All who are led by the Spirit of God are sons of God. For you did not receive the spirit of slavery to fall back into fear, but you have received the Spirit of adoption as sons, by whom we cry, "Abba! Father!"  
**Application:** You don't have to be afraid of God. You have the Spirit of adoption, and you can call God "Abba"—your Papa.`.trim(),
        },
        {
          id: "d2-gal46-7",
          type: "scripture",
          title: "Heirs of God",
          reference: "Galatians 4:6–7",
          body: `**Scripture (KJV)**  
> "And because ye are sons, God hath sent forth the Spirit of his Son into your hearts, crying, Abba, Father. Wherefore thou art no more a servant, but a son; and if a son, then an heir of God through Christ."

**Meaning:** Because you are sons, God has sent the Spirit of His Son into our hearts, crying, "Abba! Father!" So you are no longer a slave, but a son, and if a son, then an heir through God.  
**Application:** You're not just a child of God—you're also an heir. Everything God has for His children is yours in Christ.`.trim(),
        },
        {
          id: "d2-1jn31",
          type: "scripture",
          title: "See What Kind of Love",
          reference: "1 John 3:1",
          body: `**Scripture (KJV)**  
> "Behold, what manner of love the Father hath bestowed upon us, that we should be called the sons of God: therefore the world knoweth us not, because it knew him not."

**Meaning:** See what kind of love the Father has given to us, that we should be called children of God; and so we are.  
**Application:** It's not just a title—it's reality. You really are God's child, loved deeply by the Father.`.trim(),
        },
      ],
    },
    {
      id: "day-3",
      dayNumber: 3,
      title: "From Slave to Free",
      items: [
        {
          id: "d3-devotional",
          type: "devotional",
          title: "Day 3 — From Slave to Free",
          body: `Before Christ, you were enslaved to sin, powerless to break free. But in Christ, you are liberated. Sin no longer has authority over you. You are free to say no to what once controlled you.

Freedom in Christ is not the license to do whatever you want—it's the power to do what is right. You are no longer a slave to sin's demands; you are free to live for God.

**Reflection**

Are there areas where you still live like a slave instead of walking in freedom? What would it look like to surrender those to Christ today?

**Prayer**

Jesus, You broke the chains of sin. Help me to walk in the freedom You purchased for me and to refuse to return to slavery.

**Shareable Truth**

"Freedom in Christ is not doing whatever you want—it's finally being able to do what is right."`,
        },
        {
          id: "d3-rom66-7",
          type: "scripture",
          title: "Freed from Sin",
          reference: "Romans 6:6–7",
          body: `**Scripture (KJV)**  
> "Knowing this, that our old man is crucified with him, that the body of sin might be destroyed, that henceforth we should not serve sin. For he that is dead is freed from sin."

**Meaning:** We know that our old self was crucified with Him in order that the body of sin might be brought to nothing, so that we would no longer be enslaved to sin. For one who has died has been set free from sin.  
**Application:** Your old sinful self died with Christ. You are no longer a slave to sin. It doesn't have to control you anymore.`.trim(),
        },
        {
          id: "d3-gal51",
          type: "scripture",
          title: "Stand Firm in Freedom",
          reference: "Galatians 5:1",
          body: `**Scripture (KJV)**  
> "Stand fast therefore in the liberty wherewith Christ hath made us free, and be not entangled again with the yoke of bondage."

**Meaning:** For freedom Christ has set us free; stand firm therefore, and do not submit again to a yoke of slavery.  
**Application:** Jesus set you free—don't go back to living like a slave. Stand firm in the freedom He bought for you.`.trim(),
        },
        {
          id: "d3-jn831-32",
          type: "scripture",
          title: "The Truth Will Set You Free",
          reference: "John 8:31–32",
          body: `**Scripture (KJV)**  
> "Then said Jesus to those Jews which believed on him, If ye continue in my word, then are ye my disciples indeed; And ye shall know the truth, and the truth shall make you free."

**Meaning:** Jesus said, "If you abide in My word, you are truly My disciples, and you will know the truth, and the truth will set you free."  
**Application:** Freedom comes from knowing and abiding in God's truth. The more you know Jesus, the freer you become.`.trim(),
        },
        {
          id: "d3-2cor317",
          type: "scripture",
          title: "Where the Spirit Is, There Is Freedom",
          reference: "2 Corinthians 3:17",
          body: `**Scripture (KJV)**  
> "Now the Lord is that Spirit: and where the Spirit of the Lord is, there is liberty."

**Meaning:** Now the Lord is the Spirit, and where the Spirit of the Lord is, there is freedom.  
**Application:** The Spirit of God brings freedom. Stay close to Him, and you will experience the liberty Christ died to give you.`.trim(),
        },
      ],
    },
    {
      id: "day-4",
      dayNumber: 4,
      title: "From Broken to New Creation",
      items: [
        {
          id: "d4-devotional",
          type: "devotional",
          title: "Day 4 — From Broken to New Creation",
          body: `You are not just a patched-up version of your old self. In Christ, you are a new creation. The old is gone; the new has come. God doesn't just forgive your past—He gives you a new identity and a fresh start.

This means your failures, your shame, your brokenness do not define you. What defines you is the finished work of Christ and the new life He's given you in Him.

**Reflection**

In what ways do you still see yourself through the lens of your old life instead of your new identity in Christ?

**Prayer**

Lord, thank You for making me new. Help me to see myself as You see me—a brand-new creation, not defined by my past but by Your grace.

**Shareable Truth**

"In Christ, you're not a work in progress—you're a new creation with a new identity."`,
        },
        {
          id: "d4-2cor517",
          type: "scripture",
          title: "New Creation",
          reference: "2 Corinthians 5:17",
          body: `**Scripture (KJV)**  
> "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new."

**Meaning:** If anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come.  
**Application:** You are not your past. In Christ, you are entirely new. Don't let the old define you—embrace the new life God has given.`.trim(),
        },
        {
          id: "d4-eph422-24",
          type: "scripture",
          title: "Put On the New Self",
          reference: "Ephesians 4:22–24",
          body: `**Scripture (KJV)**  
> "That ye put off concerning the former conversation the old man, which is corrupt according to the deceitful lusts; And be renewed in the spirit of your mind; And that ye put on the new man, which after God is created in righteousness and true holiness."

**Meaning:** Put off your old self, which belongs to your former manner of life and is corrupt, and be renewed in the spirit of your minds, and put on the new self, created after the likeness of God in true righteousness and holiness.  
**Application:** Stop living like the old you. Put on your new identity—one that reflects God's righteousness and holiness.`.trim(),
        },
        {
          id: "d4-ezek3626",
          type: "scripture",
          title: "A New Heart",
          reference: "Ezekiel 36:26",
          body: `**Scripture (KJV)**  
> "A new heart also will I give you, and a new spirit will I put within you: and I will take away the stony heart out of your flesh, and I will give you an heart of flesh."

**Meaning:** I will give you a new heart, and a new spirit I will put within you. And I will remove the heart of stone from your flesh and give you a heart of flesh.  
**Application:** God doesn't just change your behavior—He gives you a new heart. Your desires change when Christ transforms you from the inside out.`.trim(),
        },
        {
          id: "d4-col310",
          type: "scripture",
          title: "Renewed in Knowledge",
          reference: "Colossians 3:10",
          body: `**Scripture (KJV)**  
> "And have put on the new man, which is renewed in knowledge after the image of him that created him:"

**Meaning:** You have put on the new self, which is being renewed in knowledge after the image of its creator.  
**Application:** Your new identity is continually being renewed. The more you know God, the more you reflect His image.`.trim(),
        },
      ],
    },
    {
      id: "day-5",
      dayNumber: 5,
      title: "Living Out Your New Identity",
      items: [
        {
          id: "d5-devotional",
          type: "devotional",
          title: "Day 5 — Living Out Your New Identity",
          body: `Knowing your identity in Christ is one thing—living it out is another. You are forgiven, adopted, free, and new. Now the call is to live like it.

This means setting your mind on things above, putting to death what belongs to your old self, and actively putting on the character of Christ. Your identity is secure—now let it shape the way you think, speak, and live.

**Reflection**

How would your daily life look different if you fully lived out your identity as a forgiven, adopted, free, new creation in Christ?

**Prayer**

Father, help me to live in light of who You say I am. Let my identity in Christ shape everything I do, say, and think.

**Shareable Truth**

"Your identity is settled in heaven—now live it out on earth."`,
        },
        {
          id: "d5-col31-4",
          type: "scripture",
          title: "Set Your Minds on Things Above",
          reference: "Colossians 3:1–4",
          body: `**Scripture (KJV)**  
> "If ye then be risen with Christ, seek those things which are above, where Christ sitteth on the right hand of God. Set your affection on things above, not on things on the earth. For ye are dead, and your life is hid with Christ in God. When Christ, who is our life, shall appear, then shall ye also appear with him in glory."

**Meaning:** If then you have been raised with Christ, seek the things that are above, where Christ is, seated at the right hand of God. Set your minds on things that are above, not on things that are on earth. For you have died, and your life is hidden with Christ in God.  
**Application:** Your true life is with Christ in heaven. Don't let earthly labels define you—live according to your heavenly identity.`.trim(),
        },
        {
          id: "d5-gal220",
          type: "scripture",
          title: "Christ Lives in Me",
          reference: "Galatians 2:20",
          body: `**Scripture (KJV)**  
> "I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me: and the life which I now live in the flesh I live by the faith of the Son of God, who loved me, and gave himself for me."

**Meaning:** I have been crucified with Christ. It is no longer I who live, but Christ who lives in me. And the life I now live in the flesh I live by faith in the Son of God, who loved me and gave Himself for me.  
**Application:** Your old self is dead. Now Christ lives in you. Every day, you live by faith in His love and power, not your own.`.trim(),
        },
        {
          id: "d5-rom612-13",
          type: "scripture",
          title: "Do Not Let Sin Reign",
          reference: "Romans 6:12–13",
          body: `**Scripture (KJV)**  
> "Let not sin therefore reign in your mortal body, that ye should obey it in the lusts thereof. Neither yield ye your members as instruments of unrighteousness unto sin: but yield yourselves unto God, as those that are alive from the dead, and your members as instruments of righteousness unto God."

**Meaning:** Let not sin therefore reign in your mortal body, to make you obey its passions. Do not present your members to sin as instruments for unrighteousness, but present yourselves to God as those who have been brought from death to life.  
**Application:** You are alive in Christ. Don't give sin control—present yourself to God as someone who has been made new.`.trim(),
        },
        {
          id: "d5-phil313",
          type: "scripture",
          title: "Forgetting What Lies Behind",
          reference: "Philippians 3:13",
          body: `**Scripture (KJV)**  
> "Brethren, I count not myself to have apprehended: but this one thing I do, forgetting those things which are behind, and reaching forth unto those things which are before,"

**Meaning:** Brothers, I do not consider that I have made it my own. But one thing I do: forgetting what lies behind and straining forward to what lies ahead.  
**Application:** Don't dwell on your old identity. Press forward into the fullness of who you are in Christ.`.trim(),
        },
      ],
    },
  ],
};

export const overcomingFearPlan: DiscipleshipPlan = {
  id: "overcoming-fear-and-anxiety",
  title: "Overcoming Fear and Anxiety",
  subtitle: "Learning to trust God with what scares you",
  imageUrl: overcomingFearImage,
  totalDays: 5,
  days: [
    {
      id: "day-1",
      dayNumber: 1,
      title: "Naming Your Fears Before God",
      items: [
        {
          id: "d1-devotional",
          type: "devotional",
          title: "Day 1 — Naming Your Fears Before God",
          body: `Fear thrives in the dark. It grows when you refuse to name it, when you let it lurk unnamed in the corners of your mind. But God invites you to bring your fears into the light—not to shame you, but to heal you.

David didn't hide his fear. He named it honestly before God. "When I am afraid, I put my trust in You" (Psalm 56:3). Notice: he didn't deny the fear. He acknowledged it, then chose trust.

Naming your fears before God is an act of faith. It says, "I'm not okay, but I know You are bigger than this." It opens the door for God to meet you in your weakness.

**Reflection**

What specific fear are you carrying right now that you haven't fully named before God?

**Prayer**

Lord, I am afraid. I bring this fear to You—not to fix it on my own, but to trust You with it. You know what scares me. Help me to believe You are bigger.

**Shareable Truth**

"Fear shrinks in the presence of an honest prayer."`,
        },
        {
          id: "d1-ps563",
          type: "scripture",
          title: "When I Am Afraid, I Trust in You",
          reference: "Psalm 56:3",
          body: `**Scripture (KJV)**  
> "What time I am afraid, I will trust in thee."

**Meaning:** David admits his fear but chooses to respond by putting his trust in God.  
**Application:** Fear is not sin—it's what you do with the fear that matters. When fear comes, turn toward God, not away from Him.`.trim(),
        },
        {
          id: "d1-ps344-5",
          type: "scripture",
          title: "Seek the Lord and Be Delivered",
          reference: "Psalm 34:4–5",
          body: `**Scripture (KJV)**  
> "I sought the LORD, and he heard me, and delivered me from all my fears. They looked unto him, and were lightened: and their faces were not ashamed."

**Meaning:** Those who seek the Lord are delivered from their fears, and their faces are radiant with hope.  
**Application:** Don't carry fear alone. Seek God actively, and He will meet you in it.`.trim(),
        },
        {
          id: "d1-ps3411",
          type: "scripture",
          title: "The Lord Hears the Cry of the Afflicted",
          reference: "Psalm 34:17",
          body: `**Scripture (KJV)**  
> "The righteous cry, and the LORD heareth, and delivereth them out of all their troubles."

**Meaning:** When the righteous cry out, the Lord hears them and delivers them from all their troubles.  
**Application:** Your cry doesn't fall on deaf ears. God is attentive to your fear and ready to act.`.trim(),
        },
        {
          id: "d1-ps2714",
          type: "scripture",
          title: "Wait for the Lord; Be Strong",
          reference: "Psalm 27:14",
          body: `**Scripture (KJV)**  
> "Wait on the LORD: be of good courage, and he shall strengthen thine heart: wait, I say, on the LORD."

**Meaning:** Wait for the Lord; be strong, and let your heart take courage; wait for the Lord!  
**Application:** Courage is not the absence of fear—it's trusting God while you wait for Him to act.`.trim(),
        },
      ],
    },
    {
      id: "day-2",
      dayNumber: 2,
      title: "God's Nearness in Anxiety",
      items: [
        {
          id: "d2-devotional",
          type: "devotional",
          title: "Day 2 — God's Nearness in Anxiety",
          body: `Anxiety lies. It tells you that you are alone, that the burden is yours to carry, that God is distant. But Scripture declares the opposite: **the Lord is near**.

Paul writes to anxious believers: "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God" (Philippians 4:6). This is not a dismissal of your concerns—it's an invitation to bring them to a God who is present and listening.

The nearness of God is not dependent on your feelings. It is a fact. He does not abandon you in your anxiety. He meets you there.

**Reflection**

In your anxiety, do you feel God is distant or near? What would it take to believe He is right here with you now?

**Prayer**

Lord, my anxious thoughts tell me You are far away. Remind me of Your nearness. Help me to feel Your presence, even when fear is loud.

**Shareable Truth**

"Anxiety whispers that you're alone. God's Word shouts that He is near."`,
        },
        {
          id: "d2-phil44-7",
          type: "scripture",
          title: "Rejoice, the Lord Is at Hand",
          reference: "Philippians 4:4–7",
          body: `**Scripture (KJV)**  
> "Rejoice in the Lord alway: and again I say, Rejoice. Let your moderation be known unto all men. The Lord is at hand. Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus."

**Meaning:** Rejoice always, for the Lord is near. Don't be anxious; instead, pray about everything, and God's peace will guard your heart and mind.  
**Application:** Anxiety is defeated not by trying harder to calm down, but by turning everything over to God in prayer.`.trim(),
        },
        {
          id: "d2-ps469",
          type: "scripture",
          title: "Be Still and Know",
          reference: "Psalm 46:10",
          body: `**Scripture (KJV)**  
> "Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth."

**Meaning:** Be still, and know that I am God. I will be exalted among the nations, I will be exalted in the earth!  
**Application:** Stillness is an act of trust. When anxiety screams for action, God invites you to rest in His sovereignty.`.trim(),
        },
        {
          id: "d2-ps1455-6",
          type: "scripture",
          title: "The Lord Upholds the Brokenhearted",
          reference: "Psalm 145:14",
          body: `**Scripture (KJV)**  
> "The LORD upholdeth all that fall, and raiseth up all those that be bowed down."

**Meaning:** The Lord upholds all who are falling and raises up all who are bowed down.  
**Application:** When anxiety weighs you down, God is the One who lifts you. You don't have to carry it alone.`.trim(),
        },
        {
          id: "d2-isa4110",
          type: "scripture",
          title: "Fear Not, I Am with You",
          reference: "Isaiah 41:10",
          body: `**Scripture (KJV)**  
> "¶ Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness."

**Meaning:** Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you, I will uphold you with My righteous right hand.  
**Application:** God doesn't just tell you not to fear—He gives you reasons not to: His presence, His strength, His help, His upholding hand.`.trim(),
        },
      ],
    },
    {
      id: "day-3",
      dayNumber: 3,
      title: "Casting Cares on Him",
      items: [
        {
          id: "d3-devotional",
          type: "devotional",
          title: "Day 3 — Casting Cares on Him",
          body: `You were never meant to carry the weight of your worries alone. God commands you to **cast** your anxieties on Him—not because He is indifferent, but because He cares for you (1 Peter 5:7).

Casting is an active choice. It means consciously taking the burden off your shoulders and placing it into God's hands. It is not pretending the problem doesn't exist; it is trusting that God is more capable of handling it than you are.

Every time anxiety resurfaces, cast it again. This is not failure—it is faithfulness.

**Reflection**

What burden are you trying to carry on your own that God is inviting you to cast on Him?

**Prayer**

Father, I release this weight to You. I've been trying to carry it, and I can't. You care for me, so I choose to trust You with it.

**Shareable Truth**

"Your worries are not too small for God to care about—and not too big for Him to carry."`,
        },
        {
          id: "d3-1pet57",
          type: "scripture",
          title: "Cast All Your Anxieties on Him",
          reference: "1 Peter 5:6–7",
          body: `**Scripture (KJV)**  
> "Humble yourselves therefore under the mighty hand of God, that he may exalt you in due time: Casting all your care upon him; for he careth for you."

**Meaning:** Humble yourselves under the mighty hand of God, and at the proper time He will exalt you, casting all your anxieties on Him, because He cares for you.  
**Application:** Casting your cares is an expression of humility. It admits you cannot carry it—and that you trust God can.`.trim(),
        },
        {
          id: "d3-matt1128-30",
          type: "scripture",
          title: "Come to Me, You Who Are Weary",
          reference: "Matthew 11:28–30",
          body: `**Scripture (KJV)**  
> "¶ Come unto me, all ye that labour and are heavy laden, and I will give you rest. Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls. For my yoke is easy, and my burden is light."

**Meaning:** Jesus invites all who are weary and burdened to come to Him for rest. His yoke is easy and His burden is light.  
**Application:** Jesus doesn't add more weight—He lifts it. Come to Him with your burdens, and He will give you rest.`.trim(),
        },
        {
          id: "d3-ps5522",
          type: "scripture",
          title: "Cast Your Burden on the Lord",
          reference: "Psalm 55:22",
          body: `**Scripture (KJV)**  
> "Cast thy burden upon the LORD, and he shall sustain thee: he shall never suffer the righteous to be moved."

**Meaning:** Cast your burden on the Lord, and He will sustain you; He will never permit the righteous to be moved.  
**Application:** God doesn't promise to remove every burden instantly, but He does promise to sustain you through it.`.trim(),
        },
      ],
    },
    {
      id: "day-4",
      dayNumber: 4,
      title: "Fear of Man vs. Fear of God",
      items: [
        {
          id: "d4-devotional",
          type: "devotional",
          title: "Day 4 — Fear of Man vs. Fear of God",
          body: `The fear of man is a snare. It makes you a slave to others' opinions, approval, and expectations. But the fear of the Lord—reverence, awe, and trust in Him—sets you free.

When you fear God rightly, human opinion loses its power over you. You stop living to please people and start living to please the One whose opinion actually matters.

This doesn't mean you become reckless or unkind. It means your deepest allegiance shifts from the approval of man to the approval of God.

**Reflection**

Whose approval do you seek most—God's or people's? How is the fear of man holding you back from obedience?

**Prayer**

Lord, forgive me for fearing people more than You. Help me to live for Your approval alone, trusting that You see, You know, and You are enough.

**Shareable Truth**

"When you fear God, you stop fearing people."`,
        },
        {
          id: "d4-prov2925",
          type: "scripture",
          title: "The Fear of Man Is a Snare",
          reference: "Proverbs 29:25",
          body: `**Scripture (KJV)**  
> "The fear of man bringeth a snare: but whoso putteth his trust in the LORD shall be safe."

**Meaning:** The fear of man lays a snare, but whoever trusts in the Lord is safe.  
**Application:** Trusting God is the antidote to the fear of man. When you trust Him, you are secure—no matter what others think.`.trim(),
        },
        {
          id: "d4-gal110",
          type: "scripture",
          title: "Am I Trying to Please Man?",
          reference: "Galatians 1:10",
          body: `**Scripture (KJV)**  
> "For do I now persuade men, or God? or do I seek to please men? for if I yet pleased men, I should not be the servant of Christ."

**Meaning:** Paul asks: Am I now seeking the approval of man, or of God? If I were still trying to please man, I would not be a servant of Christ.  
**Application:** You cannot serve two masters. Choose today: Will you live for God's approval or man's applause?`.trim(),
        },
        {
          id: "d4-acts529",
          type: "scripture",
          title: "We Must Obey God Rather Than Men",
          reference: "Acts 5:29",
          body: `**Scripture (KJV)**  
> "¶ Then Peter and the other apostles answered and said, We ought to obey God rather than men."

**Meaning:** Peter and the apostles answered: We must obey God rather than men.  
**Application:** When obedience to God conflicts with pleasing people, the choice is clear. Obey God.`.trim(),
        },
        {
          id: "d4-matt1028",
          type: "scripture",
          title: "Do Not Fear Those Who Kill the Body",
          reference: "Matthew 10:28",
          body: `**Scripture (KJV)**  
> "And fear not them which kill the body, but are not able to kill the soul: but rather fear him which is able to destroy both soul and body in hell."

**Meaning:** Do not fear those who kill the body but cannot kill the soul. Rather fear Him who can destroy both soul and body in hell.  
**Application:** The worst any person can do is limited. God's authority is eternal. Fear Him, not them.`.trim(),
        },
      ],
    },
    {
      id: "day-5",
      dayNumber: 5,
      title: "Practicing Peace Daily",
      items: [
        {
          id: "d5-devotional",
          type: "devotional",
          title: "Day 5 — Practicing Peace Daily",
          body: `Peace is not the absence of trouble—it is the presence of God in the midst of it. Jesus promised: "Peace I leave with you; My peace I give to you. Not as the world gives do I give to you. Let not your hearts be troubled, neither let them be afraid" (John 14:27).

Practicing peace means setting your mind on God daily, choosing to trust Him with what you cannot control, and resting in His promises instead of your circumstances.

**Reflection**

What daily habit or thought pattern is stealing your peace? What would it look like to practice trust instead?

**Prayer**

Prince of Peace, guard my heart and mind. Teach me to rest in You, to set my thoughts on Your truth, and to walk in the peace You've already given me.

**Shareable Truth**

"Peace is not found in perfect circumstances—it's found in a perfect Savior."`,
        },
        {
          id: "d5-isa263",
          type: "scripture",
          title: "Perfect Peace for the Steadfast Mind",
          reference: "Isaiah 26:3",
          body: `**Scripture (KJV)**  
> "Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee."

**Meaning:** You keep him in perfect peace whose mind is stayed on You, because he trusts in You.  
**Application:** Peace is the fruit of a mind anchored on God. What you focus on determines your peace.`.trim(),
        },
        {
          id: "d5-john1427",
          type: "scripture",
          title: "My Peace I Give to You",
          reference: "John 14:27",
          body: `**Scripture (KJV)**  
> "Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid."

**Meaning:** Jesus gives His peace—not as the world gives, but as a gift that calms troubled and fearful hearts.  
**Application:** The peace Jesus offers doesn't depend on your circumstances. It is rooted in His presence and His finished work.`.trim(),
        },
        {
          id: "d5-col315",
          type: "scripture",
          title: "Let the Peace of Christ Rule",
          reference: "Colossians 3:15",
          body: `**Scripture (KJV)**  
> "And let the peace of God rule in your hearts, to the which also ye are called in one body; and be ye thankful."

**Meaning:** Let the peace of Christ rule in your hearts, to which indeed you were called in one body. And be thankful.  
**Application:** Peace is meant to rule your heart—to be the umpire of your decisions, emotions, and reactions. Let it lead you.`.trim(),
        },
        {
          id: "d5-rom158",
          type: "scripture",
          title: "The God of Hope Fills You with Peace",
          reference: "Romans 15:13",
          body: `**Scripture (KJV)**  
> "Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost."

**Meaning:** May the God of hope fill you with all joy and peace in believing, so that by the power of the Holy Spirit you may abound in hope.  
**Application:** Peace is a gift from the God of hope. As you trust Him, He fills you with peace by the Spirit's power.`.trim(),
        },
      ],
    },
  ],
};

export const timeWithGodPlan: DiscipleshipPlan = {
  id: "time-with-god",
  title: "Time with God: Prayer & Scripture",
  subtitle: "Building a daily rhythm of meeting with the Lord",
  imageUrl: timeWithGodImage,
  totalDays: 5,
  days: [
    {
      id: "day-1",
      dayNumber: 1,
      title: "Why Daily Time with God Matters",
      items: [
        {
          id: "d1-devotional",
          type: "devotional",
          title: "Day 1 — Why Daily Time with God Matters",
          body: `You cannot love someone you don't spend time with. You cannot know someone you never talk to. And you cannot follow someone you're not listening to. This is why daily time with God is not optional for the Christian—it is essential.

Jesus modeled this. Despite a demanding ministry, He regularly withdrew to pray (Luke 5:16). If the Son of God needed time alone with the Father, how much more do we?

Time with God is not about checking a box or earning His favor. It's about relationship. It's where you hear His voice, align your heart with His, and find the strength to live for Him.

**Reflection**

What is your honest relationship with daily time with God right now—consistent, sporadic, or non-existent? What's holding you back?

**Prayer**

Father, forgive me for treating time with You as optional. Help me to see it as the lifeline it truly is. Give me a hunger to meet with You daily.

**Shareable Truth**

"You can't run on yesterday's time with God—you need fresh bread every day."`,
        },
        {
          id: "d1-ps631-2",
          type: "scripture",
          title: "Earnestly Seeking God",
          reference: "Psalm 63:1–2",
          body: `**Scripture (KJV)**  
> "O God, thou art my God; early will I seek thee: my soul thirsteth for thee, my flesh longeth for thee in a dry and thirsty land, where no water is; To see thy power and thy glory, so as I have seen thee in the sanctuary."

**Meaning:** David's soul thirsts for God; he earnestly seeks Him because he has seen God's power and glory.  
**Application:** Time with God begins with desire. Ask God to give you a longing for His presence, not just a sense of duty.`.trim(),
        },
        {
          id: "d1-luke516",
          type: "scripture",
          title: "Jesus Withdrew to Pray",
          reference: "Luke 5:16",
          body: `**Scripture (KJV)**  
> "¶ And he withdrew himself into the wilderness, and prayed."

**Meaning:** Jesus would withdraw to desolate places and pray.  
**Application:** If Jesus needed time alone with the Father, you do too. Follow His example—make time, protect it, prioritize it.`.trim(),
        },
        {
          id: "d1-ps14312",
          type: "scripture",
          title: "Satisfy Us in the Morning",
          reference: "Psalm 90:14",
          body: `**Scripture (KJV)**  
> "O satisfy us early with thy mercy; that we may rejoice and be glad all our days."

**Meaning:** Satisfy us in the morning with Your steadfast love, that we may rejoice and be glad all our days.  
**Application:** Starting your day with God sets the tone for everything. Let His love be the first thing that satisfies your soul.`.trim(),
        },
        {
          id: "d1-jer2913",
          type: "scripture",
          title: "Seek Me and Find Me",
          reference: "Jeremiah 29:13",
          body: `**Scripture (KJV)**  
> "And ye shall seek me, and find me, when ye shall search for me with all your heart."

**Meaning:** You will seek Me and find Me, when you seek Me with all your heart.  
**Application:** God promises to be found by those who genuinely seek Him. He's not hiding—He's waiting for you to come.`.trim(),
        },
      ],
    },
    {
      id: "day-2",
      dayNumber: 2,
      title: "Learning to Pray Honestly",
      items: [
        {
          id: "d2-devotional",
          type: "devotional",
          title: "Day 2 — Learning to Pray Honestly",
          body: `God doesn't want your polished, "religious" prayers. He wants your heart—raw, honest, and real. The Psalms are filled with honest cries: anger, doubt, fear, desperation, and praise. Nothing is off-limits.

Prayer is not impressing God; it's bringing your real self to Him. You don't have to clean up before you come. In fact, you can't. Come broken, come confused, come desperate—just come.

Jesus taught us to pray, "Our Father"—a relationship word. You're not approaching a distant deity; you're talking to your Father.

**Reflection**

When you pray, are you more focused on saying the "right" things or being honest with God? What would change if you prayed like the Psalms?

**Prayer**

Father, teach me to pray honestly. Help me to stop performing and start pouring out my heart to You—the good, the bad, and the broken.

**Shareable Truth**

"God isn't looking for perfect prayers—He's listening for honest hearts."`,
        },
        {
          id: "d2-matt69-13",
          type: "scripture",
          title: "The Lord's Prayer",
          reference: "Matthew 6:9–13",
          body: `**Scripture (KJV)**  
> "After this manner therefore pray ye: Our Father which art in heaven, Hallowed be thy name. Thy kingdom come. Thy will be done in earth, as it is in heaven. Give us this day our daily bread. And forgive us our debts, as we forgive our debtors. And lead us not into temptation, but deliver us from evil: For thine is the kingdom, and the power, and the glory, for ever. Amen."

**Meaning:** Jesus teaches His disciples to pray by honoring God's name, submitting to His will, asking for provision, seeking forgiveness, and requesting deliverance.  
**Application:** The Lord's Prayer is a model. It shows you how to balance worship, dependence, confession, and trust in your prayers.`.trim(),
        },
        {
          id: "d2-ps624-8",
          type: "scripture",
          title: "Pour Out Your Heart Before Him",
          reference: "Psalm 62:8",
          body: `**Scripture (KJV)**  
> "Trust in him at all times; ye people, pour out your heart before him: God is a refuge for us. Selah."

**Meaning:** Trust in Him at all times, O people; pour out your heart before Him; God is a refuge for us.  
**Application:** Don't hold back. Whatever is in your heart—fear, anger, joy, confusion—pour it out to God. He is your refuge.`.trim(),
        },
        {
          id: "d2-phil46-7",
          type: "scripture",
          title: "Let Your Requests Be Made Known",
          reference: "Philippians 4:6–7",
          body: `**Scripture (KJV)**  
> "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus."

**Meaning:** In everything, by prayer and supplication with thanksgiving, let your requests be made known to God.  
**Application:** Bring everything to God—big or small. He cares about all of it, and He invites you to ask.`.trim(),
        },
      ],
    },
    {
      id: "day-3",
      dayNumber: 3,
      title: "Meditating on the Word, Not Just Reading It",
      items: [
        {
          id: "d3-devotional",
          type: "devotional",
          title: "Day 3 — Meditating on the Word, Not Just Reading It",
          body: `Reading the Bible is good. Meditating on it is transformative. Meditation is not mindless repetition; it's slow, focused, prayerful reflection on what God is saying.

The psalmist says the blessed person meditates on God's law day and night (Psalm 1:2). Meditation means chewing on a verse, turning it over in your mind, asking God to show you what it means and how to live it.

It's the difference between eating fast food on the run and savoring a home-cooked meal. One fills you temporarily; the other nourishes you deeply.

**Reflection**

Do you tend to rush through Scripture just to check a box, or do you slow down to let it sink in? What would change if you meditated more?

**Prayer**

Lord, slow me down. Help me not to rush past Your Word but to meditate on it, savor it, and let it shape my heart and mind.

**Shareable Truth**

"Don't just read the Bible—let the Bible read you."`,
        },
        {
          id: "d3-ps11-2",
          type: "scripture",
          title: "Meditate Day and Night",
          reference: "Psalm 1:1–2",
          body: `**Scripture (KJV)**  
> "Blessed is the man that walketh not in the counsel of the ungodly, nor standeth in the way of sinners, nor sitteth in the seat of the scornful. But his delight is in the law of the LORD; and in his law doth he meditate day and night."

**Meaning:** Blessed is the one whose delight is in the law of the Lord, and who meditates on it day and night.  
**Application:** Meditation is not a burden; it's a delight. When you love God's Word, you naturally want to think about it all day.`.trim(),
        },
        {
          id: "d3-josh18",
          type: "scripture",
          title: "Do Not Let This Book Depart",
          reference: "Joshua 1:8",
          body: `**Scripture (KJV)**  
> "This book of the law shall not depart out of thy mouth; but thou shalt meditate therein day and night, that thou mayest observe to do according to all that is written therein: for then thou shalt make thy way prosperous, and then thou shalt have good success."

**Meaning:** Meditate on God's Word day and night so that you may be careful to do everything written in it. Then you will prosper and succeed.  
**Application:** Success in God's eyes comes from meditating on His Word and obeying it. The two are inseparable.`.trim(),
        },
        {
          id: "d3-ps11997",
          type: "scripture",
          title: "Oh, How I Love Your Law",
          reference: "Psalm 119:97",
          body: `**Scripture (KJV)**  
> "O how love I thy law! it is my meditation all the day."

**Meaning:** Oh, how I love Your law! It is my meditation all the day.  
**Application:** Love for God's Word and meditation go together. The more you meditate, the more you love it; the more you love it, the more you meditate.`.trim(),
        },
        {
          id: "d3-col316",
          type: "scripture",
          title: "Let the Word Dwell Richly",
          reference: "Colossians 3:16",
          body: `**Scripture (KJV)**  
> "Let the word of Christ dwell in you richly in all wisdom; teaching and admonishing one another in psalms and hymns and spiritual songs, singing with grace in your hearts to the Lord."

**Meaning:** Let the word of Christ dwell in you richly, teaching and admonishing one another in all wisdom.  
**Application:** God's Word should be so deeply embedded in you that it overflows into your relationships, decisions, and worship.`.trim(),
        },
      ],
    },
    {
      id: "day-4",
      dayNumber: 4,
      title: "Listening and Responding",
      items: [
        {
          id: "d4-devotional",
          type: "devotional",
          title: "Day 4 — Listening and Responding",
          body: `It's possible to read the Bible and never truly listen. Listening means opening your heart to what God is saying and being willing to change because of it.

James warns against being hearers only, deceiving yourselves (James 1:22). True listening always leads to obedience. If you hear God's Word and do nothing, you've wasted your time.

God is speaking. The question is: Are you listening—and are you willing to respond?

**Reflection**

What is one thing God has shown you recently in His Word that you have not yet obeyed? What's holding you back?

**Prayer**

Lord, give me ears to hear and a heart willing to obey. Don't let me be a hearer only—make me a doer of Your Word.

**Shareable Truth**

"Hearing without obeying is not faith—it's foolishness."`,
        },
        {
          id: "d4-james122-25",
          type: "scripture",
          title: "Be Doers of the Word",
          reference: "James 1:22–25",
          body: `**Scripture (KJV)**  
> "But be ye doers of the word, and not hearers only, deceiving your own selves. For if any be a hearer of the word, and not a doer, he is like unto a man beholding his natural face in a glass: For he beholdeth himself, and goeth his way, and straightway forgetteth what manner of man he was. But whoso looketh into the perfect law of liberty, and continueth therein, he being not a forgetful hearer, but a doer of the work, this man shall be blessed in his deed."

**Meaning:** Be doers of the Word, not hearers only. The one who looks into God's Word and acts on it will be blessed.  
**Application:** The blessing is not in knowing God's Word—it's in obeying it. Knowledge without obedience puffs up.`.trim(),
        },
        {
          id: "d4-luke1128",
          type: "scripture",
          title: "Blessed Are Those Who Hear and Keep",
          reference: "Luke 11:28",
          body: `**Scripture (KJV)**  
> "But he said, Yea rather, blessed are they that hear the word of God, and keep it."

**Meaning:** Jesus says, "Blessed rather are those who hear the word of God and keep it!"  
**Application:** It's not enough to hear. True blessing comes from hearing and keeping—obeying what God has said.`.trim(),
        },
        {
          id: "d4-john1417",
          type: "scripture",
          title: "If You Love Me, Keep My Commandments",
          reference: "John 14:15",
          body: `**Scripture (KJV)**  
> "¶ If ye love me, keep my commandments."

**Meaning:** Jesus says, "If you love Me, you will keep My commandments."  
**Application:** Love for Jesus is proven by obedience. If you claim to love Him but refuse to obey, your love is only words.`.trim(),
        },
      ],
    },
    {
      id: "day-5",
      dayNumber: 5,
      title: "Staying Consistent When Life Is Busy",
      items: [
        {
          id: "d5-devotional",
          type: "devotional",
          title: "Day 5 — Staying Consistent When Life Is Busy",
          body: `Everyone is busy. But busyness is not the issue—priority is. You make time for what matters most. If your time with God is inconsistent, it's not because you're too busy; it's because other things are more important to you.

That sounds harsh, but it's freeing. You don't need more time—you need to reorder your priorities. Start small. Five focused minutes with God is better than zero. Build from there.

Consistency beats intensity. A little every day beats a lot once in a while.

**Reflection**

What are you currently prioritizing over time with God? What would it look like to rearrange your schedule to put Him first?

**Prayer**

Lord, forgive me for letting other things crowd You out. Help me to prioritize You—not out of guilt, but out of love and dependence.

**Shareable Truth**

"You don't find time for God—you make time for Him."`,
        },
        {
          id: "d5-matt633",
          type: "scripture",
          title: "Seek First the Kingdom",
          reference: "Matthew 6:33",
          body: `**Scripture (KJV)**  
> "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you."

**Meaning:** Seek first the kingdom of God and His righteousness, and all these things will be added to you.  
**Application:** When you put God first, everything else falls into place. He promises to provide what you need as you seek Him.`.trim(),
        },
        {
          id: "d5-mark135",
          type: "scripture",
          title: "Jesus Rose Early to Pray",
          reference: "Mark 1:35",
          body: `**Scripture (KJV)**  
> "And in the morning, rising up a great while before day, he went out, and departed into a solitary place, and there prayed."

**Meaning:** Very early in the morning, while it was still dark, Jesus got up, left the house, and went off to a solitary place to pray.  
**Application:** Even Jesus prioritized time alone with the Father—before the busyness of the day began.`.trim(),
        },
        {
          id: "d5-ps51-3",
          type: "scripture",
          title: "In the Morning, O Lord, You Hear My Voice",
          reference: "Psalm 5:3",
          body: `**Scripture (KJV)**  
> "My voice shalt thou hear in the morning, O LORD; in the morning will I direct my prayer unto thee, and will look up."

**Meaning:** In the morning, O Lord, You hear my voice; in the morning I prepare a sacrifice for You and watch expectantly.  
**Application:** Morning time with God sets the tone for your day. Come expectantly—God is ready to meet you.`.trim(),
        },
      ],
    },
  ],
};

export const servingLikeJesusPlan: DiscipleshipPlan = {
  id: "serving-like-jesus",
  title: "Serving Others Like Jesus",
  subtitle: "From self-focus to servant-hearted living",
  imageUrl: servingJesusImage,
  totalDays: 5,
  days: [
    {
      id: "day-1",
      dayNumber: 1,
      title: "Jesus the Servant King",
      items: [
        {
          id: "d1-devotional",
          type: "devotional",
          title: "Day 1 — Jesus the Servant King",
          body: `Jesus, the King of Kings, took a towel and washed His disciples' feet. This was not a symbolic gesture—it was a living picture of His entire mission. He came not to be served, but to serve.

In John 13, Jesus shows His disciples (and us) that greatness in God's kingdom looks radically different from greatness in the world. True greatness is found in humble, sacrificial service.

If the Son of God served, how much more should we?

**Reflection**

When you think of Jesus, do you see Him more as a King to be worshiped or as a Servant to be imitated? How should that change how you live?

**Prayer**

Jesus, You are the King who became a servant. Teach me to follow Your example—to serve others humbly, sacrificially, and joyfully.

**Shareable Truth**

"Jesus didn't come to be served—He came to serve. So should you."`,
        },
        {
          id: "d1-john131-5",
          type: "scripture",
          title: "Jesus Washes the Disciples' Feet",
          reference: "John 13:1–5",
          body: `**Scripture (KJV)**  
> "Now before the feast of the passover, when Jesus knew that his hour was come that he should depart out of this world unto the Father, having loved his own which were in the world, he loved them unto the end. And supper being ended, the devil having now put into the heart of Judas Iscariot, Simon’s son, to betray him; Jesus knowing that the Father had given all things into his hands, and that he was come from God, and went to God; He riseth from supper, and laid aside his garments; and took a towel, and girded himself. After that he poureth water into a bason, and began to wash the disciples’ feet, and to wipe them with the towel wherewith he was girded."

**Meaning:** Jesus, knowing His hour had come and loving His own to the end, took a towel and washed His disciples' feet.  
**Application:** Love expresses itself in service. Jesus' act of washing feet was not a one-time gesture—it was a picture of how He constantly serves those He loves.`.trim(),
        },
        {
          id: "d1-john1312-15",
          type: "scripture",
          title: "I Have Given You an Example",
          reference: "John 13:12–15",
          body: `**Scripture (KJV)**  
> "So after he had washed their feet, and had taken his garments, and was set down again, he said unto them, Know ye what I have done to you? Ye call me Master and Lord: and ye say well; for so I am. If I then, your Lord and Master, have washed your feet; ye also ought to wash one another’s feet. For I have given you an example, that ye should do as I have done to you."

**Meaning:** After washing their feet, Jesus said, "I have given you an example, that you also should do just as I have done to you."  
**Application:** Jesus didn't just tell you to serve—He showed you how. His life is the blueprint for servant-hearted living.`.trim(),
        },
        {
          id: "d1-phil25-8",
          type: "scripture",
          title: "He Took the Form of a Servant",
          reference: "Philippians 2:5–8",
          body: `**Scripture (KJV)**  
> "Let this mind be in you, which was also in Christ Jesus: Who, being in the form of God, thought it not robbery to be equal with God: But made himself of no reputation, and took upon him the form of a servant, and was made in the likeness of men: And being found in fashion as a man, he humbled himself, and became obedient unto death, even the death of the cross."

**Meaning:** Jesus, though He was in the form of God, did not count equality with God a thing to be grasped, but emptied Himself, taking the form of a servant.  
**Application:** If Jesus, who is God, humbled Himself to serve, no task is beneath you. Serve with the mind of Christ.`.trim(),
        },
      ],
    },
    {
      id: "day-2",
      dayNumber: 2,
      title: "Greatness in God's Kingdom",
      items: [
        {
          id: "d2-devotional",
          type: "devotional",
          title: "Day 2 — Greatness in God's Kingdom",
          body: `The world measures greatness by power, position, and prestige. God's kingdom measures greatness by humility, sacrifice, and service.

Jesus told His disciples: "Whoever would be great among you must be your servant" (Mark 10:43). This is not just counter-cultural—it's counter-intuitive. But it is the way of the cross.

Greatness in God's eyes is not about being served; it's about how faithfully you serve others in Jesus' name.

**Reflection**

Are you pursuing greatness the world's way or God's way? What needs to change?

**Prayer**

Lord, reshape my definition of greatness. Help me to measure my life not by what I've gained, but by how I've served.

**Shareable Truth**

"True greatness is not found in a title—it's found in a towel."`,
        },
        {
          id: "d2-mark1042-45",
          type: "scripture",
          title: "The Son of Man Came to Serve",
          reference: "Mark 10:42–45",
          body: `**Scripture (KJV)**  
> "But Jesus called them to him, and saith unto them, Ye know that they which are accounted to rule over the Gentiles exercise lordship over them; and their great ones exercise authority upon them. But so shall it not be among you: but whosoever will be great among you, shall be your minister: And whosoever of you will be the chiefest, shall be servant of all. For even the Son of man came not to be ministered unto, but to minister, and to give his life a ransom for many."

**Meaning:** Jesus said the Son of Man came not to be served but to serve, and to give His life as a ransom for many.  
**Application:** Jesus' entire mission was service and sacrifice. If you follow Him, your life should reflect the same.`.trim(),
        },
        {
          id: "d2-matt2026-28",
          type: "scripture",
          title: "Whoever Wants to Be Great Must Be a Servant",
          reference: "Matthew 20:26–28",
          body: `**Scripture (KJV)**  
> "But it shall not be so among you: but whosoever will be great among you, let him be your minister; And whosoever will be chief among you, let him be your servant: Even as the Son of man came not to be ministered unto, but to minister, and to give his life a ransom for many."

**Meaning:** Whoever wants to be great must be a servant, and whoever wants to be first must be a slave—just as the Son of Man came to serve.  
**Application:** Ambition is not wrong—but it must be redirected. Seek to be great at serving, not at being served.`.trim(),
        },
        {
          id: "d2-luke2226-27",
          type: "scripture",
          title: "I Am Among You as One Who Serves",
          reference: "Luke 22:26–27",
          body: `**Scripture (KJV)**  
> "But ye shall not be so: but he that is greatest among you, let him be as the younger; and he that is chief, as he that doth serve. For whether is greater, he that sitteth at meat, or he that serveth? is not he that sitteth at meat? but I am among you as he that serveth."

**Meaning:** Jesus says, "Let the greatest among you become as the youngest, and the leader as one who serves. I am among you as one who serves."  
**Application:** Jesus led by serving. If you want to lead well, follow His example.`.trim(),
        },
      ],
    },
    {
      id: "day-3",
      dayNumber: 3,
      title: "Serving in the Local Church",
      items: [
        {
          id: "d3-devotional",
          type: "devotional",
          title: "Day 3 — Serving in the Local Church",
          body: `The church is not a building you visit—it's a body you belong to. And every part of the body has a function (1 Corinthians 12). You are not a spectator; you are a member with a role to play.

God has given you gifts, not for your own benefit, but to build up the church. Serving in the church is not optional for the "super spiritual"—it is the normal Christian life.

Find where you can serve, and serve faithfully. The church needs you.

**Reflection**

Are you actively serving in your local church, or are you still sitting on the sidelines? What is holding you back?

**Prayer**

Lord, show me where You want me to serve in the body of Christ. Give me a willing heart and faithful hands.

**Shareable Truth**

"The church is not a hotel for saints—it's a hospital where wounded healers serve one another."`,
        },
        {
          id: "d3-1cor1212-27",
          type: "scripture",
          title: "Many Members, One Body",
          reference: "1 Corinthians 12:12–27",
          body: `**Scripture (KJV)**  
> "For as the body is one, and hath many members, and all the members of that one body, being many, are one body: so also is Christ. For by one Spirit are we all baptized into one body, whether we be Jews or Gentiles, whether we be bond or free; and have been all made to drink into one Spirit. For the body is not one member, but many. If the foot shall say, Because I am not the hand, I am not of the body; is it therefore not of the body? And if the ear shall say, Because I am not the eye, I am not of the body; is it therefore not of the body? If the whole body were an eye, where were the hearing? If the whole were hearing, where were the smelling? But now hath God set the members every one of them in the body, as it hath pleased him. And if they were all one member, where were the body? But now are they many members, yet but one body. And the eye cannot say unto the hand, I have no need of thee: nor again the head to the feet, I have no need of you. Nay, much more those members of the body, which seem to be more feeble, are necessary: And those members of the body, which we think to be less honourable, upon these we bestow more abundant honour; and our uncomely parts have more abundant comeliness. For our comely parts have no need: but God hath tempered the body together, having given more abundant honour to that part which lacked: That there should be no schism in the body; but that the members should have the same care one for another. And whether one member suffer, all the members suffer with it; or one member be honoured, all the members rejoice with it. Now ye are the body of Christ, and members in particular."

**Meaning:** The body is one, yet it has many members. Each member has a role, and all are needed.  
**Application:** You are not extra. You are essential. The body of Christ needs your unique gifts and service.`.trim(),
        },
        {
          id: "d3-1pet410-11",
          type: "scripture",
          title: "Serve One Another with Your Gifts",
          reference: "1 Peter 4:10–11",
          body: `**Scripture (KJV)**  
> "As every man hath received the gift, even so minister the same one to another, as good stewards of the manifold grace of God. If any man speak, let him speak as the oracles of God; if any man minister, let him do it as of the ability which God giveth: that God in all things may be glorified through Jesus Christ, to whom be praise and dominion for ever and ever. Amen."

**Meaning:** As each has received a gift, use it to serve one another, as good stewards of God's varied grace.  
**Application:** Your gifts are not for you—they are for the benefit of others. Steward them well by serving the church.`.trim(),
        },
        {
          id: "d3-rom126-8",
          type: "scripture",
          title: "Use Your Gifts According to Grace",
          reference: "Romans 12:6–8",
          body: `**Scripture (KJV)**  
> "Having then gifts differing according to the grace that is given to us, whether prophecy, let us prophesy according to the proportion of faith; Or ministry, let us wait on our ministering: or he that teacheth, on teaching; Or he that exhorteth, on exhortation: he that giveth, let him do it with simplicity; he that ruleth, with diligence; he that sheweth mercy, with cheerfulness."

**Meaning:** Having gifts that differ according to the grace given to us, let us use them—prophecy, service, teaching, exhortation, giving, leading, showing mercy.  
**Application:** Whatever your gift, use it. Don't wait for a title or permission—just serve faithfully.`.trim(),
        },
      ],
    },
    {
      id: "day-4",
      dayNumber: 4,
      title: "Serving the Least of These",
      items: [
        {
          id: "d4-devotional",
          type: "devotional",
          title: "Day 4 — Serving the Least of These",
          body: `Jesus said, "As you did it to one of the least of these My brothers, you did it to Me" (Matthew 25:40). Every act of service to the poor, the weak, the forgotten—Jesus counts as service to Him.

This should radically reorient how you see service. You're not just helping people—you're ministering to Christ Himself.

The question is not "Do they deserve it?" but "What would Jesus do?"

**Reflection**

Who are "the least of these" in your life? How is God calling you to serve them?

**Prayer**

Jesus, open my eyes to see You in the faces of the hurting, the lonely, the forgotten. Give me a heart that serves them as if I'm serving You—because I am.

**Shareable Truth**

"When you serve the forgotten, you are serving the One who never forgets."`,
        },
        {
          id: "d4-matt2534-40",
          type: "scripture",
          title: "Whatever You Did for the Least, You Did for Me",
          reference: "Matthew 25:34–40",
          body: `**Scripture (KJV)**  
> "Then shall the King say unto them on his right hand, Come, ye blessed of my Father, inherit the kingdom prepared for you from the foundation of the world: For I was an hungred, and ye gave me meat: I was thirsty, and ye gave me drink: I was a stranger, and ye took me in: Naked, and ye clothed me: I was sick, and ye visited me: I was in prison, and ye came unto me. Then shall the righteous answer him, saying, Lord, when saw we thee an hungred, and fed thee? or thirsty, and gave thee drink? When saw we thee a stranger, and took thee in? or naked, and clothed thee? Or when saw we thee sick, or in prison, and came unto thee? And the King shall answer and say unto them, Verily I say unto you, Inasmuch as ye have done it unto one of the least of these my brethren, ye have done it unto me."

**Meaning:** Jesus says that when you feed the hungry, welcome the stranger, clothe the naked, or visit the sick and imprisoned, you do it to Him.  
**Application:** Every act of service to the vulnerable and overlooked is an act of worship to Christ.`.trim(),
        },
        {
          id: "d4-prov1931",
          type: "scripture",
          title: "Kindness to the Poor Is Lending to the Lord",
          reference: "Proverbs 19:17",
          body: `**Scripture (KJV)**  
> "He that hath pity upon the poor lendeth unto the LORD; and that which he hath given will he pay him again."

**Meaning:** Whoever is generous to the poor lends to the Lord, and He will repay him for his deed.  
**Application:** Serving the poor is not charity you might regret—it's an investment God Himself will honor.`.trim(),
        },
        {
          id: "d4-james115-17",
          type: "scripture",
          title: "Pure Religion: Care for Widows and Orphans",
          reference: "James 1:27",
          body: `**Scripture (KJV)**  
> "Pure religion and undefiled before God and the Father is this, To visit the fatherless and widows in their affliction, and to keep himself unspotted from the world."

**Meaning:** Pure and undefiled religion is to visit orphans and widows in their affliction.  
**Application:** True faith is not just what you believe—it's how you care for the vulnerable.`.trim(),
        },
      ],
    },
    {
      id: "day-5",
      dayNumber: 5,
      title: "A Lifestyle of Service at Home and Work",
      items: [
        {
          id: "d5-devotional",
          type: "devotional",
          title: "Day 5 — A Lifestyle of Service at Home and Work",
          body: `Service is not just something you do at church on Sunday—it's a lifestyle you live every day at home, at work, and everywhere you go.

Husbands, serve your wives. Parents, serve your children. Employees, serve your employers as if serving the Lord. Service is not about the spotlight—it's about faithfulness in the everyday, unseen moments.

A servant heart doesn't need applause. It just needs an opportunity to love.

**Reflection**

Where are you most tempted to serve yourself instead of others—at home, at work, or elsewhere? What would change if you approached that area as a servant?

**Prayer**

Lord, make me a servant in every area of my life. Help me to see opportunities to serve, and give me a heart that loves to do it—without needing recognition.

**Shareable Truth**

"A servant heart doesn't need a stage—it just needs an opportunity."`,
        },
        {
          id: "d5-col323-24",
          type: "scripture",
          title: "Work as for the Lord",
          reference: "Colossians 3:23–24",
          body: `**Scripture (KJV)**  
> "And whatsoever ye do, do it heartily, as to the Lord, and not unto men; Knowing that of the Lord ye shall receive the reward of the inheritance: for ye serve the Lord Christ."

**Meaning:** Whatever you do, work heartily, as for the Lord and not for men, knowing that from the Lord you will receive the inheritance as your reward.  
**Application:** Even mundane work becomes worship when done as service to Christ.`.trim(),
        },
        {
          id: "d5-eph525-28",
          type: "scripture",
          title: "Husbands, Love and Serve Your Wives",
          reference: "Ephesians 5:25–28",
          body: `**Scripture (KJV)**  
> "Husbands, love your wives, even as Christ also loved the church, and gave himself for it; That he might sanctify and cleanse it with the washing of water by the word, That he might present it to himself a glorious church, not having spot, or wrinkle, or any such thing; but that it should be holy and without blemish. So ought men to love their wives as their own bodies. He that loveth his wife loveth himself."

**Meaning:** Husbands, love your wives, as Christ loved the church and gave Himself up for her.  
**Application:** Christian marriage is built on sacrificial service, mirroring Christ's love for the church.`.trim(),
        },
        {
          id: "d5-gal513",
          type: "scripture",
          title: "Serve One Another Through Love",
          reference: "Galatians 5:13",
          body: `**Scripture (KJV)**  
> "For, brethren, ye have been called unto liberty; only use not liberty for an occasion to the flesh, but by love serve one another."

**Meaning:** You were called to freedom, brothers. Only do not use your freedom as an opportunity for the flesh, but through love serve one another.  
**Application:** Freedom in Christ is not freedom to please yourself—it's freedom to love and serve others.`.trim(),
        },
      ],
    },
  ],
};

export const marriageLovePlan: DiscipleshipPlan = {
  id: "marriage-and-covenant-love",
  title: "Marriage & Covenant Love",
  subtitle: "Reflecting Christ and the Church at home",
  imageUrl: marriageLoveImage,
  totalDays: 5,
  days: [
    {
      id: "day-1",
      dayNumber: 1,
      title: "God's Design for Marriage",
      items: [
        {
          id: "d1-devotional",
          type: "devotional",
          title: "Day 1 — God's Design for Marriage",
          body: `Marriage was God's idea, not man's. He created it before the fall, in the perfection of Eden. It is holy, good, and designed to display the covenant love between Christ and the church.

God's design is one man and one woman, united for life, becoming one flesh. This union is not just for companionship or procreation—it is a living picture of the gospel.

When the world distorts marriage, the church must hold fast to God's design. Not out of legalism, but out of love for the One who created it.

**Reflection**

Do you view marriage as something God invented, or something culture defines? How does God's design challenge the way you think about marriage?

**Prayer**

Father, thank You for creating marriage. Help me to honor Your design and to see marriage as a reflection of Your love for the church.

**Shareable Truth**

"Marriage was designed by God to display the gospel, not just to make you happy."`,
        },
        {
          id: "d1-gen224",
          type: "scripture",
          title: "One Flesh",
          reference: "Genesis 2:24",
          body: `**Scripture (KJV)**  
> "Therefore shall a man leave his father and his mother, and shall cleave unto his wife: and they shall be one flesh."

**Meaning:** A man shall leave his father and mother and hold fast to his wife, and they shall become one flesh.  
**Application:** Marriage is a covenant of leaving, cleaving, and becoming one. It is meant to be exclusive, permanent, and intimate.`.trim(),
        },
        {
          id: "d1-matt194-6",
          type: "scripture",
          title: "What God Has Joined Together",
          reference: "Matthew 19:4–6",
          body: `**Scripture (KJV)**  
> "And he answered and said unto them, Have ye not read, that he which made them at the beginning made them male and female, And said, For this cause shall a man leave father and mother, and shall cleave to his wife: and they twain shall be one flesh? Wherefore they are no more twain, but one flesh. What therefore God hath joined together, let not man put asunder."

**Meaning:** Jesus affirms God's design: one man, one woman, one flesh. What God has joined together, let no one separate.  
**Application:** Marriage is not a human contract you can break at will—it is a divine covenant God holds you to.`.trim(),
        },
        {
          id: "d1-mal215-16",
          type: "scripture",
          title: "Guard Your Spirit; Do Not Be Faithless",
          reference: "Malachi 2:15–16",
          body: `**Scripture (KJV)**  
> "And did not he make one? Yet had he the residue of the spirit. And wherefore one? That he might seek a godly seed. Therefore take heed to your spirit, and let none deal treacherously against the wife of his youth. For the LORD, the God of Israel, saith that he hateth putting away: for one covereth violence with his garment, saith the LORD of hosts: therefore take heed to your spirit, that ye deal not treacherously."

**Meaning:** God hates divorce because it breaks the covenant He witnessed. Guard your spirit and do not be faithless to the wife of your youth.  
**Application:** God takes your marriage covenant seriously. Guard it fiercely, and do not treat it lightly.`.trim(),
        },
      ],
    },
    {
      id: "day-2",
      dayNumber: 2,
      title: "Husbands, Wives, and Mutual Honor",
      items: [
        {
          id: "d2-devotional",
          type: "devotional",
          title: "Day 2 — Husbands, Wives, and Mutual Honor",
          body: `God's design for marriage includes distinct roles, but both are marked by sacrificial love and mutual honor. Husbands are called to love their wives as Christ loved the church—giving themselves up for her. Wives are called to respect and submit to their husbands as to the Lord.

This is not about superiority or inferiority—it's about order and purpose. Both roles require humility, sacrifice, and a gospel-centered heart.

**Reflection**

Husbands: Are you loving your wife sacrificially, as Christ loves the church? Wives: Are you honoring and respecting your husband as unto the Lord?

**Prayer**

Lord, help me to fulfill my role in marriage with humility and love. Teach me to honor my spouse as You have honored me.

**Shareable Truth**

"In marriage, both spouses are called to die to self and live for the other."`,
        },
        {
          id: "d2-eph525-28",
          type: "scripture",
          title: "Husbands, Love Your Wives",
          reference: "Ephesians 5:25–28",
          body: `**Scripture (KJV)**  
> "Husbands, love your wives, even as Christ also loved the church, and gave himself for it; That he might sanctify and cleanse it with the washing of water by the word, That he might present it to himself a glorious church, not having spot, or wrinkle, or any such thing; but that it should be holy and without blemish. So ought men to love their wives as their own bodies. He that loveth his wife loveth himself."

**Meaning:** Husbands, love your wives, as Christ loved the church and gave Himself up for her.  
**Application:** Husbands, your love should be sacrificial, not self-serving. Christ's love is the standard.`.trim(),
        },
        {
          id: "d2-eph522-24",
          type: "scripture",
          title: "Wives, Submit to Your Husbands",
          reference: "Ephesians 5:22–24",
          body: `**Scripture (KJV)**  
> "Wives, submit yourselves unto your own husbands, as unto the Lord. For the husband is the head of the wife, even as Christ is the head of the church: and he is the saviour of the body. Therefore as the church is subject unto Christ, so let the wives be to their own husbands in every thing."

**Meaning:** Wives, submit to your own husbands, as to the Lord, for the husband is the head of the wife even as Christ is the head of the church.  
**Application:** Submission is not weakness—it is trust in God's design and in the leadership He has appointed.`.trim(),
        },
        {
          id: "d2-1pet37",
          type: "scripture",
          title: "Husbands, Live with Understanding",
          reference: "1 Peter 3:7",
          body: `**Scripture (KJV)**  
> "Likewise, ye husbands, dwell with them according to knowledge, giving honour unto the wife, as unto the weaker vessel, and as being heirs together of the grace of life; that your prayers be not hindered."

**Meaning:** Husbands, live with your wives in an understanding way, showing honor to the woman as the weaker vessel, since they are heirs with you of the grace of life.  
**Application:** Husbands, treat your wife with tenderness, honor, and understanding. She is your co-heir in Christ.`.trim(),
        },
      ],
    },
    {
      id: "day-3",
      dayNumber: 3,
      title: "Communication, Conflict, and Forgiveness",
      items: [
        {
          id: "d3-devotional",
          type: "devotional",
          title: "Day 3 — Communication, Conflict, and Forgiveness",
          body: `Every marriage has conflict. The question is not if you will disagree, but how you will handle it. Will you fight to win, or fight to understand? Will you seek reconciliation, or hold on to bitterness?

Healthy communication requires humility, listening, and a commitment to truth spoken in love. And when you sin against each other—and you will—forgiveness must be quick, complete, and sincere.

**Reflection**

How do you typically handle conflict in your marriage? Do you fight to win or to reconcile? What needs to change?

**Prayer**

Lord, teach us to communicate with humility and grace. Help us to forgive quickly and to seek reconciliation, not victory.

**Shareable Truth**

"In marriage, it's not about winning the argument—it's about winning each other's hearts."`,
        },
        {
          id: "d3-eph426-27",
          type: "scripture",
          title: "Do Not Let the Sun Go Down on Your Anger",
          reference: "Ephesians 4:26–27",
          body: `**Scripture (KJV)**  
> "Be ye angry, and sin not: let not the sun go down upon your wrath: Neither give place to the devil."

**Meaning:** Be angry and do not sin; do not let the sun go down on your anger, and give no opportunity to the devil.  
**Application:** Deal with conflict quickly. Unresolved anger gives the enemy a foothold in your marriage.`.trim(),
        },
        {
          id: "d3-col312-13",
          type: "scripture",
          title: "Forgive as the Lord Forgave You",
          reference: "Colossians 3:12–13",
          body: `**Scripture (KJV)**  
> "Put on therefore, as the elect of God, holy and beloved, bowels of mercies, kindness, humbleness of mind, meekness, longsuffering; Forbearing one another, and forgiving one another, if any man have a quarrel against any: even as Christ forgave you, so also do ye."

**Meaning:** Put on compassion, kindness, humility, and patience, bearing with one another and forgiving each other as the Lord forgave you.  
**Application:** You have been forgiven much. Forgive your spouse the same way Christ forgave you.`.trim(),
        },
        {
          id: "d3-prov1520",
          type: "scripture",
          title: "A Soft Answer Turns Away Wrath",
          reference: "Proverbs 15:1",
          body: `**Scripture (KJV)**  
> "A soft answer turneth away wrath: but grievous words stir up anger."

**Meaning:** A soft answer turns away wrath, but a harsh word stirs up anger.  
**Application:** The tone you use matters. Choose gentleness over harshness, even when you're frustrated.`.trim(),
        },
      ],
    },
    {
      id: "day-4",
      dayNumber: 4,
      title: "Guarding Your Marriage from Drift and Temptation",
      items: [
        {
          id: "d4-devotional",
          type: "devotional",
          title: "Day 4 — Guarding Your Marriage from Drift and Temptation",
          body: `No marriage is immune to drift. Busyness, neglect, and unmet expectations can slowly erode intimacy. And where there is drift, temptation finds an opportunity.

You must guard your marriage intentionally. That means protecting your time together, your physical intimacy, your emotional connection, and your purity. Set boundaries, flee temptation, and fight for your covenant.

**Reflection**

Are there areas where you've allowed drift in your marriage? What boundaries do you need to set to guard against temptation?

**Prayer**

Lord, protect our marriage from drift and from the enemy's schemes. Help us to fight for our covenant and to flee from anything that threatens it.

**Shareable Truth**

"A strong marriage doesn't happen by accident—it's built by intentional, daily choices."`,
        },
        {
          id: "d4-1cor716",
          type: "scripture",
          title: "Let Each Have His Own Wife",
          reference: "1 Corinthians 7:1–5",
          body: `**Scripture (KJV)**  
> "Now concerning the things whereof ye wrote unto me: It is good for a man not to touch a woman. Nevertheless, to avoid fornication, let every man have his own wife, and let every woman have her own husband. Let the husband render unto the wife due benevolence: and likewise also the wife unto the husband. The wife hath not power of her own body, but the husband: and likewise also the husband hath not power of his own body, but the wife. Defraud ye not one the other, except it be with consent for a time, that ye may give yourselves to fasting and prayer; and come together again, that Satan tempt you not for your incontinency."

**Meaning:** Because of the temptation to sexual immorality, each man should have his own wife and each woman her own husband. Do not deprive one another.  
**Application:** Physical intimacy in marriage is a gift and a safeguard. Don't neglect it.`.trim(),
        },
        {
          id: "d4-heb134",
          type: "scripture",
          title: "Let the Marriage Bed Be Undefiled",
          reference: "Hebrews 13:4",
          body: `**Scripture (KJV)**  
> "Marriage is honourable in all, and the bed undefiled: but whoremongers and adulterers God will judge."

**Meaning:** Let marriage be held in honor among all, and let the marriage bed be undefiled, for God will judge the sexually immoral and adulterous.  
**Application:** Guard the purity of your marriage. Sexual sin has severe consequences—flee from it.`.trim(),
        },
        {
          id: "d4-prov427",
          type: "scripture",
          title: "Do Not Swerve to the Right or the Left",
          reference: "Proverbs 4:23–27",
          body: `**Scripture (KJV)**  
> "¶ Keep thy heart with all diligence; for out of it are the issues of life. Put away from thee a froward mouth, and perverse lips put far from thee. Let thine eyes look right on, and let thine eyelids look straight before thee. Ponder the path of thy feet, and let all thy ways be established. Turn not to the right hand nor to the left: remove thy foot from evil."

**Meaning:** Guard your heart, keep your eyes straight ahead, and do not swerve to the right or left. Keep your foot from evil.  
**Application:** Guarding your marriage starts with guarding your heart and your eyes. Be vigilant.`.trim(),
        },
      ],
    },
    {
      id: "day-5",
      dayNumber: 5,
      title: "Praying Together and Growing Together",
      items: [
        {
          id: "d5-devotional",
          type: "devotional",
          title: "Day 5 — Praying Together and Growing Together",
          body: `A couple that prays together grows together. Prayer knits your hearts, aligns your wills, and invites God into the center of your marriage.

If you're not praying together, start. It doesn't have to be long or eloquent. Just come before God together, humble and honest. Ask Him to strengthen your marriage, grow your love, and keep you faithful.

**Reflection**

Do you and your spouse pray together regularly? If not, what's holding you back?

**Prayer**

Father, teach us to pray together. Unite our hearts as we come before You. Grow our marriage into a testimony of Your grace.

**Shareable Truth**

"Couples who pray together don't just stay together—they grow together."`,
        },
        {
          id: "d5-eccl49-12",
          type: "scripture",
          title: "Two Are Better Than One",
          reference: "Ecclesiastes 4:9–12",
          body: `**Scripture (KJV)**  
> "¶ Two are better than one; because they have a good reward for their labour. For if they fall, the one will lift up his fellow: but woe to him that is alone when he falleth; for he hath not another to help him up. Again, if two lie together, then they have heat: but how can one be warm alone? And if one prevail against him, two shall withstand him; and a threefold cord is not quickly broken."

**Meaning:** Two are better than one. If one falls, the other can lift them up. A cord of three strands is not quickly broken.  
**Application:** A marriage with God at the center is strong. He is the third strand that holds you together.`.trim(),
        },
        {
          id: "d5-1pet37",
          type: "scripture",
          title: "Pray Together So Your Prayers Are Not Hindered",
          reference: "1 Peter 3:7",
          body: `**Scripture (KJV)**  
> "Likewise, ye husbands, dwell with them according to knowledge, giving honour unto the wife, as unto the weaker vessel, and as being heirs together of the grace of life; that your prayers be not hindered."

**Meaning:** Husbands, live with your wives in an understanding way, showing honor, so that your prayers may not be hindered.  
**Application:** Your relationship with your spouse affects your relationship with God. Treat each other with honor.`.trim(),
        },
        {
          id: "d5-matt1819-20",
          type: "scripture",
          title: "Where Two Agree, God Is Present",
          reference: "Matthew 18:19–20",
          body: `**Scripture (KJV)**  
> "Again I say unto you, That if two of you shall agree on earth as touching any thing that they shall ask, it shall be done for them of my Father which is in heaven. For where two or three are gathered together in my name, there am I in the midst of them."

**Meaning:** If two of you agree on earth about anything they ask, it will be done for them by My Father in heaven. Where two or three are gathered in My name, I am there.  
**Application:** Praying together invites God's presence and power into your marriage.`.trim(),
        },
      ],
    },
  ],
};

export const parentingGospelPlan: DiscipleshipPlan = {
  id: "parenting-with-the-gospel",
  title: "Parenting with the Gospel",
  subtitle: "Raising children in grace and truth",
  imageUrl: parentingGospelImage,
  totalDays: 5,
  days: [
    {
      id: "day-1",
      dayNumber: 1,
      title: "Children as a Stewardship from God",
      items: [
        {
          id: "d1-devotional",
          type: "devotional",
          title: "Day 1 — Children as a Stewardship from God",
          body: `Your children are not yours—they are God's. You did not create them; He did. You do not own them; you are stewarding them. And one day, you will give an account for how you raised them.

This is both humbling and freeing. Humbling because the responsibility is great. Freeing because the burden is not ultimately yours—it's God's. He entrusted them to you, and He will equip you for the task.

**Reflection**

Do you see your children as yours to control or as God's to steward? How does that shift change your approach to parenting?

**Prayer**

Lord, thank You for the children You have entrusted to me. Help me to steward them well, raising them to know and love You.

**Shareable Truth**

"Your children are not your possession—they are God's gift and your stewardship."`,
        },
        {
          id: "d1-ps1273-5",
          type: "scripture",
          title: "Children Are a Heritage from the Lord",
          reference: "Psalm 127:3–5",
          body: `**Scripture (KJV)**  
> "Lo, children are an heritage of the LORD: and the fruit of the womb is his reward. As arrows are in the hand of a mighty man; so are children of the youth. Happy is the man that hath his quiver full of them: they shall not be ashamed, but they shall speak with the enemies in the gate."

**Meaning:** Children are a heritage from the Lord, the fruit of the womb a reward. Blessed is the man whose quiver is full of them.  
**Application:** Children are not a burden—they are a blessing from God. Receive them as such.`.trim(),
        },
        {
          id: "d1-gen1718",
          type: "scripture",
          title: "Abraham Will Command His Children",
          reference: "Genesis 18:19",
          body: `**Scripture (KJV)**  
> "For I know him, that he will command his children and his household after him, and they shall keep the way of the LORD, to do justice and judgment; that the LORD may bring upon Abraham that which he hath spoken of him."

**Meaning:** God chose Abraham so that he may command his children and his household after him to keep the way of the Lord.  
**Application:** God gives you children so you can teach them to follow Him. Parenting is discipleship.`.trim(),
        },
        {
          id: "d1-prov226",
          type: "scripture",
          title: "Train Up a Child",
          reference: "Proverbs 22:6",
          body: `**Scripture (KJV)**  
> "Train up a child in the way he should go: and when he is old, he will not depart from it."

**Meaning:** Train up a child in the way he should go; even when he is old he will not depart from it.  
**Application:** Training takes time and intentionality. Invest in your children's spiritual formation now, trusting God for the future.`.trim(),
        },
      ],
    },
    {
      id: "day-2",
      dayNumber: 2,
      title: "Training in Grace, Not Just Rules",
      items: [
        {
          id: "d2-devotional",
          type: "devotional",
          title: "Day 2 — Training in Grace, Not Just Rules",
          body: `Parenting is not about raising "good kids" who obey the rules. It's about raising children who love Jesus and understand the gospel.

Rules without grace produce either rebellion or self-righteousness. Grace without truth produces entitlement and compromise. You need both: high standards rooted in love and forgiveness.

Point your children to Jesus—not just to behavior modification. Show them that obedience flows from a changed heart, not just fear of consequences.

**Reflection**

Are you raising your children with rules alone, or are you pointing them to the grace of Jesus? What needs to change?

**Prayer**

Lord, help me to parent with both grace and truth. Give me wisdom to discipline in love and to always point my children to You.

**Shareable Truth**

"Rules without grace create Pharisees. Grace without truth creates entitlement. Kids need both."`,
        },
        {
          id: "d2-eph64",
          type: "scripture",
          title: "Do Not Provoke Your Children",
          reference: "Ephesians 6:4",
          body: `**Scripture (KJV)**  
> "And, ye fathers, provoke not your children to wrath: but bring them up in the nurture and admonition of the Lord."

**Meaning:** Fathers, do not provoke your children to anger, but bring them up in the discipline and instruction of the Lord.  
**Application:** Discipline your children, but do it in a way that reflects God's heart—firm but loving, just but gracious.`.trim(),
        },
        {
          id: "d2-col321",
          type: "scripture",
          title: "Do Not Embitter Your Children",
          reference: "Colossians 3:21",
          body: `**Scripture (KJV)**  
> "Fathers, provoke not your children to anger, lest they be discouraged."

**Meaning:** Fathers, do not embitter your children, or they will become discouraged.  
**Application:** Harsh, graceless parenting crushes a child's spirit. Be firm, but always point them to hope in Christ.`.trim(),
        },
        {
          id: "d2-titus211-12",
          type: "scripture",
          title: "Grace Trains Us",
          reference: "Titus 2:11–12",
          body: `**Scripture (KJV)**  
> "For the grace of God that bringeth salvation hath appeared to all men, Teaching us that, denying ungodliness and worldly lusts, we should live soberly, righteously, and godly, in this present world;"

**Meaning:** The grace of God has appeared, bringing salvation and training us to renounce ungodliness and to live self-controlled, upright, and godly lives.  
**Application:** Grace is not soft—it trains us. Show your children that grace leads to godliness, not license to sin.`.trim(),
        },
      ],
    },
    {
      id: "day-3",
      dayNumber: 3,
      title: "Discipline that Reflects God's Heart",
      items: [
        {
          id: "d3-devotional",
          type: "devotional",
          title: "Day 3 — Discipline that Reflects God's Heart",
          body: `Discipline is not punishment—it's training. God disciplines those He loves (Hebrews 12:6), and so should you. But discipline must always be done in love, not anger. It should point toward restoration, not just correction.

Your goal is not to control your children, but to shepherd their hearts toward God. Discipline is one tool in that shepherding process.

**Reflection**

When you discipline your children, does it reflect God's heart—loving, corrective, and restorative? Or does it reflect your frustration and anger?

**Prayer**

Lord, teach me to discipline my children as You discipline me—with love, patience, and a desire for their good. Help me to shepherd their hearts, not just manage their behavior.

**Shareable Truth**

"Discipline is not about control—it's about shaping a heart toward God."`,
        },
        {
          id: "d3-heb125-11",
          type: "scripture",
          title: "The Lord Disciplines Those He Loves",
          reference: "Hebrews 12:5–11",
          body: `**Scripture (KJV)**  
> "And ye have forgotten the exhortation which speaketh unto you as unto children, My son, despise not thou the chastening of the Lord, nor faint when thou art rebuked of him: For whom the Lord loveth he chasteneth, and scourgeth every son whom he receiveth. If ye endure chastening, God dealeth with you as with sons; for what son is he whom the father chasteneth not? But if ye be without chastisement, whereof all are partakers, then are ye bastards, and not sons. Furthermore we have had fathers of our flesh which corrected us, and we gave them reverence: shall we not much rather be in subjection unto the Father of spirits, and live? For they verily for a few days chastened us after their own pleasure; but he for our profit, that we might be partakers of his holiness. Now no chastening for the present seemeth to be joyous, but grievous: nevertheless afterward it yieldeth the peaceable fruit of righteousness unto them which are exercised thereby."

**Meaning:** The Lord disciplines the one He loves. All discipline seems painful at the time, but later it yields the peaceful fruit of righteousness.  
**Application:** Discipline your children because you love them, not because you're angry. And discipline always has a purpose—formation, not just punishment.`.trim(),
        },
        {
          id: "d3-prov1324",
          type: "scripture",
          title: "Whoever Spares the Rod Hates His Son",
          reference: "Proverbs 13:24",
          body: `**Scripture (KJV)**  
> "He that spareth his rod hateth his son: but he that loveth him chasteneth him betimes."

**Meaning:** Whoever spares the rod hates his son, but he who loves him is diligent to discipline him.  
**Application:** Discipline is an act of love. Failing to discipline is not kindness—it's negligence.`.trim(),
        },
        {
          id: "d3-prov2215",
          type: "scripture",
          title: "Folly Is Bound Up in a Child's Heart",
          reference: "Proverbs 22:15",
          body: `**Scripture (KJV)**  
> "Foolishness is bound in the heart of a child; but the rod of correction shall drive it far from him."

**Meaning:** Folly is bound up in the heart of a child, but the rod of discipline drives it far from him.  
**Application:** Children are not morally neutral. They are bent toward sin and need discipline to train them in righteousness.`.trim(),
        },
      ],
    },
    {
      id: "day-4",
      dayNumber: 4,
      title: "Pointing Kids to Christ in Everyday Life",
      items: [
        {
          id: "d4-devotional",
          type: "devotional",
          title: "Day 4 — Pointing Kids to Christ in Everyday Life",
          body: `Discipleship doesn't happen once a week at church—it happens in the rhythms of daily life. Deuteronomy 6 calls parents to teach God's Word when they sit, walk, lie down, and rise up.

This means using everyday moments—car rides, meals, bedtime—to talk about God, His Word, and His ways. Don't wait for formal lessons. Weave the gospel into ordinary life.

**Reflection**

Are you using everyday moments to point your children to Christ, or are you leaving their spiritual formation to Sunday school?

**Prayer**

Lord, help me to be intentional about pointing my children to You in the everyday moments of life. Give me wisdom to speak Your truth naturally and consistently.

**Shareable Truth**

"Discipleship happens in the car, at the table, and at bedtime—not just on Sundays."`,
        },
        {
          id: "d4-deut66-9",
          type: "scripture",
          title: "Teach Them Diligently",
          reference: "Deuteronomy 6:6–9",
          body: `**Scripture (KJV)**  
> "And these words, which I command thee this day, shall be in thine heart: And thou shalt teach them diligently unto thy children, and shalt talk of them when thou sittest in thine house, and when thou walkest by the way, and when thou liest down, and when thou risest up. And thou shalt bind them for a sign upon thine hand, and they shall be as frontlets between thine eyes. And thou shalt write them upon the posts of thy house, and on thy gates."

**Meaning:** These words shall be on your heart, and you shall teach them diligently to your children, talking of them when you sit, walk, lie down, and rise.  
**Application:** Teaching your children about God is not a one-time event—it's woven into the fabric of daily life.`.trim(),
        },
        {
          id: "d4-ps784-7",
          type: "scripture",
          title: "Tell the Next Generation",
          reference: "Psalm 78:4–7",
          body: `**Scripture (KJV)**  
> "We will not hide them from their children, shewing to the generation to come the praises of the LORD, and his strength, and his wonderful works that he hath done. For he established a testimony in Jacob, and appointed a law in Israel, which he commanded our fathers, that they should make them known to their children: That the generation to come might know them, even the children which should be born; who should arise and declare them to their children: That they might set their hope in God, and not forget the works of God, but keep his commandments:"

**Meaning:** We will tell the coming generation the glorious deeds of the Lord, that they should set their hope in God and not forget His works.  
**Application:** Your children need to know God's story—His faithfulness, His power, His love. Tell them often.`.trim(),
        },
        {
          id: "d4-2tim315",
          type: "scripture",
          title: "From Childhood You Have Known the Scriptures",
          reference: "2 Timothy 3:15",
          body: `**Scripture (KJV)**  
> "And that from a child thou hast known the holy scriptures, which are able to make thee wise unto salvation through faith which is in Christ Jesus."

**Meaning:** From childhood you have been acquainted with the sacred writings, which are able to make you wise for salvation through faith in Christ Jesus.  
**Application:** Teach your children the Scriptures from an early age. God's Word has the power to lead them to salvation.`.trim(),
        },
      ],
    },
    {
      id: "day-5",
      dayNumber: 5,
      title: "Praying Over Your Children and Letting Go",
      items: [
        {
          id: "d5-devotional",
          type: "devotional",
          title: "Day 5 — Praying Over Your Children and Letting Go",
          body: `You cannot save your children. You can teach them, love them, and model Christ for them—but only God can change their hearts.

This is why prayer is essential. You must entrust your children to God daily, asking Him to do what you cannot. And as they grow, you must learn to let go, trusting God to complete the work He started.

**Reflection**

Are you praying over your children daily? Are you trusting God with their future, or trying to control it?

**Prayer**

Father, I entrust my children to You. Do in their hearts what I cannot do. Save them, shape them, and use them for Your glory.

**Shareable Truth**

"You can't save your children—but you can pray to the One who can."`,
        },
        {
          id: "d5-1sam127-28",
          type: "scripture",
          title: "I Have Lent Him to the Lord",
          reference: "1 Samuel 1:27–28",
          body: `**Scripture (KJV)**  
> "For this child I prayed; and the LORD hath given me my petition which I asked of him: Therefore also I have lent him to the LORD; as long as he liveth he shall be lent to the LORD. And he worshipped the LORD there."

**Meaning:** Hannah prayed for a child, and when God gave her Samuel, she gave him back to the Lord.  
**Application:** Your children are not yours to keep—they are God's to use. Dedicate them to Him and trust Him with their lives.`.trim(),
        },
        {
          id: "d5-prov35-6",
          type: "scripture",
          title: "Trust in the Lord with All Your Heart",
          reference: "Proverbs 3:5–6",
          body: `**Scripture (KJV)**  
> "¶ Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths."

**Meaning:** Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge Him, and He will make straight your paths.  
**Application:** You can't control your children's future, but you can trust the God who holds it.`.trim(),
        },
        {
          id: "d5-phil16",
          type: "scripture",
          title: "He Who Began a Good Work Will Complete It",
          reference: "Philippians 1:6",
          body: `**Scripture (KJV)**  
> "Being confident of this very thing, that he which hath begun a good work in you will perform it until the day of Jesus Christ:"

**Meaning:** I am sure of this, that He who began a good work in you will bring it to completion at the day of Jesus Christ.  
**Application:** If God has begun a work in your child's heart, trust Him to finish it. Pray, and let go.`.trim(),
        },
      ],
    },
  ],
};

export const workCallingPlan: DiscipleshipPlan = {
  id: "work-and-calling",
  title: "Work, Calling, and the Kingdom",
  subtitle: "Honoring Christ in your daily work",
  imageUrl: workCallingImage,
  totalDays: 5,
  days: [
    {
      id: "day-1",
      dayNumber: 1,
      title: "Work as Worship",
      items: [
        {
          id: "d1-devotional",
          type: "devotional",
          title: "Day 1 — Work as Worship",
          body: `Work is not a curse—it's a calling. Before the fall, God gave Adam work to do in the Garden (Genesis 2:15). Work was always part of God's design, and it is meant to be an act of worship.

When you work as for the Lord and not for men, even mundane tasks become sacred. You're not just earning a paycheck—you're serving the One who created you, redeemed you, and called you.

**Reflection**

Do you see your work as worship, or just as a means to an end? How would your attitude change if you worked for an audience of One?

**Prayer**

Lord, help me to see my work as worship. Whatever I do, let me do it for Your glory and not just for approval, success, or a paycheck.

**Shareable Truth**

"Work done for the Lord is never wasted—even when no one else sees it."`,
        },
        {
          id: "d1-col323-24",
          type: "scripture",
          title: "Whatever You Do, Work for the Lord",
          reference: "Colossians 3:23–24",
          body: `**Scripture (KJV)**  
> "And whatsoever ye do, do it heartily, as to the Lord, and not unto men; Knowing that of the Lord ye shall receive the reward of the inheritance: for ye serve the Lord Christ."

**Meaning:** Whatever you do, work heartily, as for the Lord and not for men, knowing that from the Lord you will receive the inheritance as your reward.  
**Application:** Your boss may not notice, but the Lord does. Work for Him, and He will reward you.`.trim(),
        },
        {
          id: "d1-gen215",
          type: "scripture",
          title: "Work and Keep the Garden",
          reference: "Genesis 2:15",
          body: `**Scripture (KJV)**  
> "And the LORD God took the man, and put him into the garden of Eden to dress it and to keep it."

**Meaning:** The Lord God took the man and put him in the garden of Eden to work it and keep it.  
**Application:** Work existed before the fall. It was part of God's good design, not a result of sin.`.trim(),
        },
        {
          id: "d1-1cor1031",
          type: "scripture",
          title: "Do All to the Glory of God",
          reference: "1 Corinthians 10:31",
          body: `**Scripture (KJV)**  
> "Whether therefore ye eat, or drink, or whatsoever ye do, do all to the glory of God."

**Meaning:** Whatever you do, do all to the glory of God.  
**Application:** No task is too small to be done for God's glory. Even the most ordinary work can bring Him honor.`.trim(),
        },
      ],
    },
    {
      id: "day-2",
      dayNumber: 2,
      title: "Calling Beyond Just a Job Title",
      items: [
        {
          id: "d2-devotional",
          type: "devotional",
          title: "Day 2 — Calling Beyond Just a Job Title",
          body: `Your calling is not just your job title—it's your identity in Christ and the unique way God has wired you to serve His kingdom. Some are called to full-time ministry, but all believers are called to full-time faithfulness wherever God has placed them.

Your vocation (job) is one expression of your calling, but your calling is bigger. It includes how you love your family, serve your church, and reflect Christ in every sphere of life.

**Reflection**

Do you see your job as your calling, or as one part of a larger calling to serve Christ in all of life?

**Prayer**

Lord, help me to see my calling as bigger than my job. Show me how to serve You faithfully in every area of life.

**Shareable Truth**

"Your calling is not what you do for a living—it's who you are in Christ."`,
        },
        {
          id: "d2-1pet29",
          type: "scripture",
          title: "Called to Proclaim His Excellencies",
          reference: "1 Peter 2:9",
          body: `**Scripture (KJV)**  
> "But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people; that ye should shew forth the praises of him who hath called you out of darkness into his marvellous light:"

**Meaning:** You are a chosen race, a royal priesthood, a holy nation, a people for His own possession, that you may proclaim the excellencies of Him who called you.  
**Application:** Your primary calling is not a job—it's to proclaim the excellencies of Christ in everything you do.`.trim(),
        },
        {
          id: "d2-eph410-12",
          type: "scripture",
          title: "Gifts Given to Equip the Saints",
          reference: "Ephesians 4:11–12",
          body: `**Scripture (KJV)**  
> "And he gave some, apostles; and some, prophets; and some, evangelists; and some, pastors and teachers; For the perfecting of the saints, for the work of the ministry, for the edifying of the body of Christ:"

**Meaning:** God gave gifts to equip the saints for the work of ministry, for building up the body of Christ.  
**Application:** God has uniquely equipped you for service in His kingdom. Discover your gifts and use them.`.trim(),
        },
        {
          id: "d2-rom68",
          type: "scripture",
          title: "Each Has Different Gifts",
          reference: "Romans 12:6–8",
          body: `**Scripture (KJV)**  
> "Having then gifts differing according to the grace that is given to us, whether prophecy, let us prophesy according to the proportion of faith; Or ministry, let us wait on our ministering: or he that teacheth, on teaching; Or he that exhorteth, on exhortation: he that giveth, let him do it with simplicity; he that ruleth, with diligence; he that sheweth mercy, with cheerfulness."

**Meaning:** We have different gifts according to the grace given to us. Let us use them.  
**Application:** God has given you unique gifts. Your calling is to steward them well for His glory and the good of others.`.trim(),
        },
      ],
    },
    {
      id: "day-3",
      dayNumber: 3,
      title: "Integrity and Witness at Work",
      items: [
        {
          id: "d3-devotional",
          type: "devotional",
          title: "Day 3 — Integrity and Witness at Work",
          body: `Your workplace is a mission field. The way you work—your integrity, your attitude, your work ethic—is a testimony to the gospel. People are watching.

Do you cut corners, gossip, complain, or compromise? Or do you work with excellence, honesty, and kindness—even when no one is watching? Your witness at work is powerful.

**Reflection**

What kind of witness are you at work? Do your coworkers see Christ in you, or just another employee trying to get by?

**Prayer**

Lord, help me to work with integrity and to be a faithful witness for You in my workplace. Let my life point others to You.

**Shareable Truth**

"Your witness at work speaks louder than words—let it point to Christ."`,
        },
        {
          id: "d3-prov1026",
          type: "scripture",
          title: "The Integrity of the Upright Guides Them",
          reference: "Proverbs 11:3",
          body: `**Scripture (KJV)**  
> "The integrity of the upright shall guide them: but the perverseness of transgressors shall destroy them."

**Meaning:** The integrity of the upright guides them, but the crookedness of the treacherous destroys them.  
**Application:** Integrity in your work protects and guides you. Compromise eventually leads to ruin.`.trim(),
        },
        {
          id: "d3-eph628",
          type: "scripture",
          title: "Serve with a Good Will",
          reference: "Ephesians 6:5–8",
          body: `**Scripture (KJV)**  
> "Servants, be obedient to them that are your masters according to the flesh, with fear and trembling, in singleness of your heart, as unto Christ; Not with eyeservice, as menpleasers; but as the servants of Christ, doing the will of God from the heart; With good will doing service, as to the Lord, and not to men: Knowing that whatsoever good thing any man doeth, the same shall he receive of the Lord, whether he be bond or free."

**Meaning:** Bondservants (employees), obey your earthly masters with respect and sincerity, as you would Christ, serving with a good will as to the Lord.  
**Application:** Your work ethic is a reflection of your relationship with Christ. Serve with excellence, as if He is your boss.`.trim(),
        },
        {
          id: "d3-titus210",
          type: "scripture",
          title: "Adorn the Doctrine of God",
          reference: "Titus 2:9–10",
          body: `**Scripture (KJV)**  
> "Exhort servants to be obedient unto their own masters, and to please them well in all things; not answering again; Not purloining, but shewing all good fidelity; that they may adorn the doctrine of God our Saviour in all things."

**Meaning:** Bondservants are to be well-pleasing, not argumentative, and to show all good faith, so that in everything they may adorn the doctrine of God our Savior.  
**Application:** Your conduct at work either adorns the gospel or tarnishes it. Choose to adorn it.`.trim(),
        },
      ],
    },
    {
      id: "day-4",
      dayNumber: 4,
      title: "Rest, Sabbath, and Avoiding Burnout",
      items: [
        {
          id: "d4-devotional",
          type: "devotional",
          title: "Day 4 — Rest, Sabbath, and Avoiding Burnout",
          body: `God created the Sabbath not as a burden, but as a gift. Rest is not laziness—it's obedience. When you refuse to rest, you're saying, "God, I don't trust You to sustain me if I stop working."

Sabbath is a declaration that God is in control, not you. It's an act of faith that says, "I trust You, Lord, to provide even when I'm not striving."

**Reflection**

Do you regularly rest, or do you work yourself to exhaustion? What is driving you—trust in God or fear of falling behind?

**Prayer**

Lord, teach me to rest. Help me to trust You enough to stop striving and to receive the gift of Sabbath.

**Shareable Truth**

"Sabbath is not about being lazy—it's about trusting that God is God and you are not."`,
        },
        {
          id: "d4-ex208-11",
          type: "scripture",
          title: "Remember the Sabbath Day",
          reference: "Exodus 20:8–11",
          body: `**Scripture (KJV)**  
> "Remember the sabbath day, to keep it holy. Six days shalt thou labour, and do all thy work: But the seventh day is the sabbath of the LORD thy God: in it thou shalt not do any work, thou, nor thy son, nor thy daughter, thy manservant, nor thy maidservant, nor thy cattle, nor thy stranger that is within thy gates: For in six days the LORD made heaven and earth, the sea, and all that in them is, and rested the seventh day: wherefore the LORD blessed the sabbath day, and hallowed it."

**Meaning:** Remember the Sabbath day, to keep it holy. Six days you shall labor, but the seventh is a Sabbath to the Lord.  
**Application:** God commands rest because you need it. Sabbath is not optional—it's a gift to receive and a command to obey.`.trim(),
        },
        {
          id: "d4-matt1128",
          type: "scripture",
          title: "Come to Me and Rest",
          reference: "Matthew 11:28",
          body: `**Scripture (KJV)**  
> "¶ Come unto me, all ye that labour and are heavy laden, and I will give you rest."

**Meaning:** Come to Me, all who labor and are heavy laden, and I will give you rest.  
**Application:** Jesus offers rest for your soul. You don't have to earn it—just receive it.`.trim(),
        },
        {
          id: "d4-ps1272",
          type: "scripture",
          title: "It Is in Vain to Rise Early and Go Late to Rest",
          reference: "Psalm 127:2",
          body: `**Scripture (KJV)**  
> "It is vain for you to rise up early, to sit up late, to eat the bread of sorrows: for so he giveth his beloved sleep."

**Meaning:** It is in vain that you rise up early and go late to rest, eating the bread of anxious toil; for He gives to His beloved sleep.  
**Application:** Overworking is not noble—it's a lack of trust in God's provision. Rest is a gift from Him.`.trim(),
        },
      ],
    },
    {
      id: "day-5",
      dayNumber: 5,
      title: "Using Your Gifts for Kingdom Impact",
      items: [
        {
          id: "d5-devotional",
          type: "devotional",
          title: "Day 5 — Using Your Gifts for Kingdom Impact",
          body: `God has given you gifts, talents, and opportunities—not for your own comfort, but for His kingdom. The question is: Are you using them, or wasting them?

Every resource you have—time, money, skills—is a stewardship from God. One day, you will give an account for how you used what He gave you. Use it well. Use it for eternal impact.

**Reflection**

Are you using your gifts and resources for kingdom impact, or are you living only for yourself? What needs to change?

**Prayer**

Lord, everything I have is Yours. Show me how to use my gifts, my time, and my resources for Your kingdom and Your glory.

**Shareable Truth**

"Your gifts are not for your comfort—they're for God's kingdom."`,
        },
        {
          id: "d5-matt2514-30",
          type: "scripture",
          title: "The Parable of the Talents",
          reference: "Matthew 25:14–30",
          body: `**Scripture (KJV)**  
> "¶ For the kingdom of heaven is as a man travelling into a far country, who called his own servants, and delivered unto them his goods. And unto one he gave five talents, to another two, and to another one; to every man according to his several ability; and straightway took his journey. Then he that had received the five talents went and traded with the same, and made them other five talents. And likewise he that had received two, he also gained other two. But he that had received one went and digged in the earth, and hid his lord’s money. After a long time the lord of those servants cometh, and reckoneth with them. And so he that had received five talents came and brought other five talents, saying, Lord, thou deliveredst unto me five talents: behold, I have gained beside them five talents more. His lord said unto him, Well done, thou good and faithful servant: thou hast been faithful over a few things, I will make thee ruler over many things: enter thou into the joy of thy lord. He also that had received two talents came and said, Lord, thou deliveredst unto me two talents: behold, I have gained two other talents beside them. His lord said unto him, Well done, good and faithful servant; thou hast been faithful over a few things, I will make thee ruler over many things: enter thou into the joy of thy lord. Then he which had received the one talent came and said, Lord, I knew thee that thou art an hard man, reaping where thou hast not sown, and gathering where thou hast not strawed: And I was afraid, and went and hid thy talent in the earth: lo, there thou hast that is thine. His lord answered and said unto him, Thou wicked and slothful servant, thou knewest that I reap where I sowed not, and gather where I have not strawed: Thou oughtest therefore to have put my money to the exchangers, and then at my coming I should have received mine own with usury. Take therefore the talent from him, and give it unto him which hath ten talents. For unto every one that hath shall be given, and he shall have abundance: but from him that hath not shall be taken away even that which he hath. And cast ye the unprofitable servant into outer darkness: there shall be weeping and gnashing of teeth."

**Meaning:** The master entrusts his servants with talents (resources) and holds them accountable for how they used them. The faithful are rewarded; the lazy are condemned.  
**Application:** God has entrusted you with gifts and opportunities. Use them faithfully. One day, you will give an account.`.trim(),
        },
        {
          id: "d5-1pet410",
          type: "scripture",
          title: "Use Your Gifts to Serve One Another",
          reference: "1 Peter 4:10",
          body: `**Scripture (KJV)**  
> "As every man hath received the gift, even so minister the same one to another, as good stewards of the manifold grace of God."

**Meaning:** As each has received a gift, use it to serve one another, as good stewards of God's varied grace.  
**Application:** Your gifts are not for you—they are for serving others and stewarding God's grace.`.trim(),
        },
        {
          id: "d5-1tim617-19",
          type: "scripture",
          title: "Use Your Wealth for Good Works",
          reference: "1 Timothy 6:17–19",
          body: `**Scripture (KJV)**  
> "Charge them that are rich in this world, that they be not highminded, nor trust in uncertain riches, but in the living God, who giveth us richly all things to enjoy; That they do good, that they be rich in good works, ready to distribute, willing to communicate; Laying up in store for themselves a good foundation against the time to come, that they may lay hold on eternal life."

**Meaning:** Those who are rich in this present age are to do good, to be rich in good works, generous and ready to share, storing up treasure for themselves as a good foundation for the future.  
**Application:** Use what God has given you—time, money, talents—for eternal impact, not just temporary comfort.`.trim(),
        },
      ],
    },
  ],
};

export const purityWorldPlan: DiscipleshipPlan = {
  id: "purity-in-a-sexualized-world",
  title: "Purity in a Sexualized World",
  subtitle: "Honoring Jesus with your body and mind",
  imageUrl: purityWorldImage,
  totalDays: 5,
  days: [
    {
      id: "day-1",
      dayNumber: 1,
      title: "God's Design for Sex and Purity",
      items: [
        {
          id: "d1-devotional",
          type: "devotional",
          title: "Day 1 — God's Design for Sex and Purity",
          body: `Sex was God's idea, not the world's. He created it, called it good, and designed it for marriage—one man and one woman in a covenant relationship.

The world distorts sex, treating it as recreational, casual, or an expression of self-fulfillment. But God's design is clear: sex is sacred, reserved for marriage, and meant to be a picture of covenant love.

Purity is not about repression—it's about honoring God's design and trusting that His way is best.

**Reflection**

Do you view sex through the lens of culture or through the lens of Scripture? How does God's design challenge your thinking?

**Prayer**

Lord, forgive me for letting the world shape my view of sex and purity. Help me to honor Your design and to trust that Your way is best.

**Shareable Truth**

"Purity is not repression—it's honoring God's design for sex."`,
        },
        {
          id: "d1-gen127-28",
          type: "scripture",
          title: "Male and Female He Created Them",
          reference: "Genesis 1:27–28",
          body: `**Scripture (KJV)**  
> "So God created man in his own image, in the image of God created he him; male and female created he them. And God blessed them, and God said unto them, Be fruitful, and multiply, and replenish the earth, and subdue it: and have dominion over the fish of the sea, and over the fowl of the air, and over every living thing that moveth upon the earth."

**Meaning:** God created male and female, blessed them, and told them to be fruitful and multiply.  
**Application:** Sex is God's idea, created for good. His design is clear: one man, one woman, in marriage.`.trim(),
        },
        {
          id: "d1-heb134",
          type: "scripture",
          title: "The Marriage Bed Undefiled",
          reference: "Hebrews 13:4",
          body: `**Scripture (KJV)**  
> "Marriage is honourable in all, and the bed undefiled: but whoremongers and adulterers God will judge."

**Meaning:** Let marriage be held in honor among all, and let the marriage bed be undefiled, for God will judge the sexually immoral and adulterous.  
**Application:** Sex within marriage is pure and honorable. Sex outside marriage is sin and will be judged by God.`.trim(),
        },
        {
          id: "d1-1cor618-20",
          type: "scripture",
          title: "Flee Sexual Immorality",
          reference: "1 Corinthians 6:18–20",
          body: `**Scripture (KJV)**  
> "Flee fornication. Every sin that a man doeth is without the body; but he that committeth fornication sinneth against his own body. What? know ye not that your body is the temple of the Holy Ghost which is in you, which ye have of God, and ye are not your own? For ye are bought with a price: therefore glorify God in your body, and in your spirit, which are God’s."

**Meaning:** Flee from sexual immorality. Your body is a temple of the Holy Spirit. You are not your own; you were bought with a price. So glorify God in your body.  
**Application:** Sexual sin is uniquely destructive because it sins against your own body, which is God's temple. Honor God with your body.`.trim(),
        },
      ],
    },
    {
      id: "day-2",
      dayNumber: 2,
      title: "Battling Lust in Heart and Mind",
      items: [
        {
          id: "d2-devotional",
          type: "devotional",
          title: "Day 2 — Battling Lust in Heart and Mind",
          body: `Jesus made it clear: lust is not just a behavior problem—it's a heart problem. "Everyone who looks at a woman with lustful intent has already committed adultery with her in his heart" (Matthew 5:28).

The battle for purity is won or lost in your mind. What you look at, what you think about, what you dwell on—these shape your desires. Lust feeds on secrecy, but it dies in the light.

**Reflection**

Are you fighting lust only when it becomes action, or are you battling it at the level of your thoughts? Where do you need to bring light?

**Prayer**

Lord, search my heart and expose any lust hiding there. Give me the strength to fight it at the thought level, not just the action level.

**Shareable Truth**

"Lust thrives in secrecy—bring it to the light and it loses its power."`,
        },
        {
          id: "d2-matt527-30",
          type: "scripture",
          title: "Lust in the Heart Is Adultery",
          reference: "Matthew 5:27–30",
          body: `**Scripture (KJV)**  
> "¶ Ye have heard that it was said by them of old time, Thou shalt not commit adultery: But I say unto you, That whosoever looketh on a woman to lust after her hath committed adultery with her already in his heart. And if thy right eye offend thee, pluck it out, and cast it from thee: for it is profitable for thee that one of thy members should perish, and not that thy whole body should be cast into hell. And if thy right hand offend thee, cut it off, and cast it from thee: for it is profitable for thee that one of thy members should perish, and not that thy whole body should be cast into hell."

**Meaning:** Jesus says that looking at someone with lust is adultery in the heart. If your eye causes you to sin, tear it out.  
**Application:** Jesus is not calling for literal self-mutilation—He's calling for radical action against sin. Take lust seriously.`.trim(),
        },
        {
          id: "d2-job311",
          type: "scripture",
          title: "I Made a Covenant with My Eyes",
          reference: "Job 31:1",
          body: `**Scripture (KJV)**  
> "I made a covenant with mine eyes; why then should I think upon a maid?"

**Meaning:** Job says, "I have made a covenant with my eyes; how then could I gaze at a virgin?"  
**Application:** Guard your eyes. Make a covenant to avoid looking at what stirs up lust.`.trim(),
        },
        {
          id: "d2-2tim222",
          type: "scripture",
          title: "Flee Youthful Passions",
          reference: "2 Timothy 2:22",
          body: `**Scripture (KJV)**  
> "Flee also youthful lusts: but follow righteousness, faith, charity, peace, with them that call on the Lord out of a pure heart."

**Meaning:** Flee youthful passions and pursue righteousness, faith, love, and peace, along with those who call on the Lord from a pure heart.  
**Application:** Don't just avoid sin—replace it. Flee lust and pursue Christ and godly community.`.trim(),
        },
      ],
    },
    {
      id: "day-3",
      dayNumber: 3,
      title: "Boundaries, Media, and Guarding Your Eyes",
      items: [
        {
          id: "d3-devotional",
          type: "devotional",
          title: "Day 3 — Boundaries, Media, and Guarding Your Eyes",
          body: `The world bombards you with sexual images constantly—TV, movies, social media, advertisements. If you don't set boundaries, you will fall.

Guarding your eyes means being intentional about what you watch, what you scroll, and what you allow into your mind. It means accountability, filters, and sometimes cutting off access completely.

This is not legalism—it's wisdom. "I will not set before my eyes anything that is worthless" (Psalm 101:3).

**Reflection**

What media or habits are feeding lust in your life? What boundaries do you need to set?

**Prayer**

Lord, give me the courage to set boundaries and to guard my eyes. Help me to flee temptation and to pursue purity.

**Shareable Truth**

"You can't guard your heart if you don't guard your eyes."`,
        },
        {
          id: "d3-ps1013",
          type: "scripture",
          title: "I Will Not Set Worthless Things Before My Eyes",
          reference: "Psalm 101:3",
          body: `**Scripture (KJV)**  
> "I will set no wicked thing before mine eyes: I hate the work of them that turn aside; it shall not cleave to me."

**Meaning:** I will not set before my eyes anything that is worthless.  
**Application:** What you look at matters. Be ruthless about removing anything that stirs up lust.`.trim(),
        },
        {
          id: "d3-prov423",
          type: "scripture",
          title: "Guard Your Heart",
          reference: "Proverbs 4:23",
          body: `**Scripture (KJV)**  
> "¶ Keep thy heart with all diligence; for out of it are the issues of life."

**Meaning:** Keep your heart with all vigilance, for from it flow the springs of life.  
**Application:** Guarding your heart means guarding what you let in—through your eyes, ears, and mind.`.trim(),
        },
        {
          id: "d3-phil48",
          type: "scripture",
          title: "Think About These Things",
          reference: "Philippians 4:8",
          body: `**Scripture (KJV)**  
> "Finally, brethren, whatsoever things are true, whatsoever things are honest, whatsoever things are just, whatsoever things are pure, whatsoever things are lovely, whatsoever things are of good report; if there be any virtue, and if there be any praise, think on these things."

**Meaning:** Whatever is true, honorable, just, pure, lovely, commendable—if there is any excellence, if there is anything worthy of praise, think about these things.  
**Application:** Don't just avoid impure thoughts—replace them with what is pure, true, and honoring to God.`.trim(),
        },
      ],
    },
    {
      id: "day-4",
      dayNumber: 4,
      title: "Confession, Cleansing, and a Fresh Start",
      items: [
        {
          id: "d4-devotional",
          type: "devotional",
          title: "Day 4 — Confession, Cleansing, and a Fresh Start",
          body: `If you've fallen into sexual sin, don't hide. Bring it into the light. Confess it to God and to a trusted believer. "If we confess our sins, He is faithful and just to forgive us our sins and to cleanse us from all unrighteousness" (1 John 1:9).

God does not condemn you—He cleanses you. You are not defined by your past. In Christ, you are forgiven, washed, and made new.

**Reflection**

Is there sexual sin you've been hiding? What would it look like to bring it to the light today?

**Prayer**

Lord, I confess my sin to You. Forgive me, cleanse me, and give me a fresh start. Help me to walk in purity from this day forward.

**Shareable Truth**

"Confession brings the shame into the light—and God's grace washes it away."`,
        },
        {
          id: "d4-1jn19",
          type: "scripture",
          title: "He Is Faithful to Forgive",
          reference: "1 John 1:9",
          body: `**Scripture (KJV)**  
> "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness."

**Meaning:** If we confess our sins, He is faithful and just to forgive us our sins and to cleanse us from all unrighteousness.  
**Application:** God doesn't just forgive—He cleanses. Confession brings freedom.`.trim(),
        },
        {
          id: "d4-ps511-2",
          type: "scripture",
          title: "Wash Me and I Shall Be Whiter Than Snow",
          reference: "Psalm 51:1–2",
          body: `**Scripture (KJV)**  
> "Have mercy upon me, O God, according to thy lovingkindness: according unto the multitude of thy tender mercies blot out my transgressions. Wash me throughly from mine iniquity, and cleanse me from my sin."

**Meaning:** David prays: Have mercy on me, O God. Wash me thoroughly from my iniquity, and cleanse me from my sin.  
**Application:** No sin is too great for God to forgive. Come to Him, confess, and be washed clean.`.trim(),
        },
        {
          id: "d4-james516",
          type: "scripture",
          title: "Confess Your Sins to One Another",
          reference: "James 5:16",
          body: `**Scripture (KJV)**  
> "Confess your faults one to another, and pray one for another, that ye may be healed. The effectual fervent prayer of a righteous man availeth much."

**Meaning:** Confess your sins to one another and pray for one another, that you may be healed.  
**Application:** Confession to God is essential, but confession to a trusted believer brings healing and accountability.`.trim(),
        },
      ],
    },
    {
      id: "day-5",
      dayNumber: 5,
      title: "Pursuing Holiness, Not Just Avoidance",
      items: [
        {
          id: "d5-devotional",
          type: "devotional",
          title: "Day 5 — Pursuing Holiness, Not Just Avoidance",
          body: `Purity is not just about what you avoid—it's about what you pursue. You were created for holiness, not just sin-avoidance.

Pursue Christ. Pursue worship. Pursue community. Fill your life with what is good, true, and beautiful. The more you love God, the less appealing sin becomes.

**Reflection**

Are you just trying to avoid sin, or are you actively pursuing holiness and intimacy with God?

**Prayer**

Lord, give me a heart that loves You more than sin. Help me to pursue holiness, not out of fear, but out of love for You.

**Shareable Truth**

"Holiness is not just avoiding sin—it's loving God more."`,
        },
        {
          id: "d5-1thess43-5",
          type: "scripture",
          title: "This Is the Will of God: Your Sanctification",
          reference: "1 Thessalonians 4:3–5",
          body: `**Scripture (KJV)**  
> "For this is the will of God, even your sanctification, that ye should abstain from fornication: That every one of you should know how to possess his vessel in sanctification and honour; Not in the lust of concupiscence, even as the Gentiles which know not God:"

**Meaning:** This is the will of God, your sanctification: that you abstain from sexual immorality and control your own body in holiness and honor.  
**Application:** God's will for you is clear—holiness. Pursue it with everything you have.`.trim(),
        },
        {
          id: "d5-heb1214",
          type: "scripture",
          title: "Pursue Holiness",
          reference: "Hebrews 12:14",
          body: `**Scripture (KJV)**  
> "Follow peace with all men, and holiness, without which no man shall see the Lord:"

**Meaning:** Strive for peace with everyone, and for the holiness without which no one will see the Lord.  
**Application:** Holiness is not optional. Pursue it actively, or you will drift into compromise.`.trim(),
        },
        {
          id: "d5-2cor71",
          type: "scripture",
          title: "Let Us Cleanse Ourselves",
          reference: "2 Corinthians 7:1",
          body: `**Scripture (KJV)**  
> "Having therefore these promises, dearly beloved, let us cleanse ourselves from all filthiness of the flesh and spirit, perfecting holiness in the fear of God."

**Meaning:** Since we have these promises, beloved, let us cleanse ourselves from every defilement of body and spirit, bringing holiness to completion in the fear of God.  
**Application:** You have a role to play. Cleanse yourself from sin and pursue holiness actively.`.trim(),
        },
      ],
    },
  ],
};

export const sufferingFaithfulnessPlan: DiscipleshipPlan = {
  id: "suffering-and-gods-faithfulness",
  title: "Suffering, Trials, and God's Faithfulness",
  subtitle: "Finding hope when life hurts",
  imageUrl: sufferingFaithfulnessImage,
  totalDays: 5,
  days: [
    {
      id: "day-1",
      dayNumber: 1,
      title: "God's Presence in the Fire",
      items: [
        {
          id: "d1-devotional",
          type: "devotional",
          title: "Day 1 — God's Presence in the Fire",
          body: `When Shadrach, Meshach, and Abednego were thrown into the fiery furnace, they were not alone. A fourth figure appeared in the flames—"like a son of the gods" (Daniel 3:25). God did not spare them from the fire, but He met them in it.

You may be in a fire right now—suffering, pain, loss. God has not abandoned you. He is with you in the flames, and He will bring you through.

**Reflection**

Where are you experiencing suffering right now? Do you believe God is with you in it, or do you feel abandoned?

**Prayer**

Lord, I am in the fire. I don't understand why, but I choose to trust that You are with me. Don't let me go through this alone.

**Shareable Truth**

"God doesn't always remove the fire—but He always walks through it with you."`,
        },
        {
          id: "d1-dan325",
          type: "scripture",
          title: "A Fourth Man in the Fire",
          reference: "Daniel 3:25",
          body: `**Scripture (KJV)**  
> "He answered and said, Lo, I see four men loose, walking in the midst of the fire, and they have no hurt; and the form of the fourth is like the Son of God."

**Meaning:** King Nebuchadnezzar saw four men walking in the fire, unbound and unharmed, and the fourth had the appearance of a son of the gods.  
**Application:** God doesn't always remove your trial, but He always enters it with you. You are not alone.`.trim(),
        },
        {
          id: "d1-isa432",
          type: "scripture",
          title: "When You Walk Through the Fire",
          reference: "Isaiah 43:2",
          body: `**Scripture (KJV)**  
> "When thou passest through the waters, I will be with thee; and through the rivers, they shall not overflow thee: when thou walkest through the fire, thou shalt not be burned; neither shall the flame kindle upon thee."

**Meaning:** When you pass through the waters, I will be with you; and through the rivers, they shall not overwhelm you; when you walk through fire you shall not be burned.  
**Application:** God promises His presence in suffering. The fire may be real, but it will not consume you.`.trim(),
        },
        {
          id: "d1-ps234",
          type: "scripture",
          title: "Even Though I Walk Through the Valley",
          reference: "Psalm 23:4",
          body: `**Scripture (KJV)**  
> "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me."

**Meaning:** Even though I walk through the valley of the shadow of death, I will fear no evil, for You are with me.  
**Application:** God's presence is the antidote to fear. Even in the darkest valley, He is with you.`.trim(),
        },
      ],
    },
    {
      id: "day-2",
      dayNumber: 2,
      title: "Purpose in Pain",
      items: [
        {
          id: "d2-devotional",
          type: "devotional",
          title: "Day 2 — Purpose in Pain",
          body: `God does not waste your pain. Romans 8:28 promises that "for those who love God all things work together for good." This doesn't mean all things are good—it means God is working in all things for a greater purpose.

Your suffering is not random. God is refining you, shaping you, and conforming you to the image of Christ. Trust that He is working, even when you can't see it.

**Reflection**

Do you believe God can bring good out of your suffering? What might He be teaching you through this pain?

**Prayer**

Lord, I don't understand this suffering, but I trust that You are working in it. Use this pain for Your glory and my good.

**Shareable Truth**

"God doesn't waste your pain—He redeems it."`,
        },
        {
          id: "d2-rom828-30",
          type: "scripture",
          title: "All Things Work Together for Good",
          reference: "Romans 8:28–30",
          body: `**Scripture (KJV)**  
> "And we know that all things work together for good to them that love God, to them who are the called according to his purpose. For whom he did foreknow, he also did predestinate to be conformed to the image of his Son, that he might be the firstborn among many brethren. Moreover whom he did predestinate, them he also called: and whom he called, them he also justified: and whom he justified, them he also glorified."

**Meaning:** For those who love God, all things work together for good, for those who are called according to His purpose—to be conformed to the image of His Son.  
**Application:** God's purpose in your suffering is to make you more like Jesus. Trust the process.`.trim(),
        },
        {
          id: "d2-james12-4",
          type: "scripture",
          title: "The Testing of Your Faith Produces Steadfastness",
          reference: "James 1:2–4",
          body: `**Scripture (KJV)**  
> "My brethren, count it all joy when ye fall into divers temptations; Knowing this, that the trying of your faith worketh patience. But let patience have her perfect work, that ye may be perfect and entire, wanting nothing."

**Meaning:** Count it all joy when you meet trials, for the testing of your faith produces steadfastness, and steadfastness leads to maturity.  
**Application:** Trials are not meaningless—they are refining your faith and making you complete.`.trim(),
        },
        {
          id: "d2-1pet16-7",
          type: "scripture",
          title: "Tested by Fire",
          reference: "1 Peter 1:6–7",
          body: `**Scripture (KJV)**  
> "Wherein ye greatly rejoice, though now for a season, if need be, ye are in heaviness through manifold temptations: That the trial of your faith, being much more precious than of gold that perisheth, though it be tried with fire, might be found unto praise and honour and glory at the appearing of Jesus Christ:"

**Meaning:** Though now for a little while you may have to suffer trials, this is so that the tested genuineness of your faith may result in praise and glory at the revelation of Jesus Christ.  
**Application:** Your suffering is temporary. The faith it produces is eternal.`.trim(),
        },
      ],
    },
    {
      id: "day-3",
      dayNumber: 3,
      title: "Lament: Honest Tears Before God",
      items: [
        {
          id: "d3-devotional",
          type: "devotional",
          title: "Day 3 — Lament: Honest Tears Before God",
          body: `The Psalms teach us that it's okay to cry out to God in pain. Lament is not a lack of faith—it's honest faith. It says, "God, this hurts, and I don't understand, but I'm bringing it to You."

You don't have to pretend you're okay. God can handle your questions, your anger, your grief. Bring it all to Him.

**Reflection**

Are you allowing yourself to lament, or are you stuffing your pain and pretending it doesn't exist?

**Prayer**

Lord, I'm hurting. I don't have it all together, and I don't have all the answers. I pour out my heart to You and trust that You hear me.

**Shareable Truth**

"Lament is not doubt—it's honest faith crying out to a faithful God."`,
        },
        {
          id: "d3-ps131-2",
          type: "scripture",
          title: "How Long, O Lord?",
          reference: "Psalm 13:1–2",
          body: `**Scripture (KJV)**  
> "How long wilt thou forget me, O LORD? for ever? how long wilt thou hide thy face from me? How long shall I take counsel in my soul, having sorrow in my heart daily? how long shall mine enemy be exalted over me?"

**Meaning:** David cries out: How long, O Lord? Will You forget me forever? How long must I take counsel in my soul and have sorrow in my heart all the day?  
**Application:** You can be honest with God about your pain. He welcomes your lament.`.trim(),
        },
        {
          id: "d3-ps624-8",
          type: "scripture",
          title: "Pour Out Your Heart",
          reference: "Psalm 62:8",
          body: `**Scripture (KJV)**  
> "Trust in him at all times; ye people, pour out your heart before him: God is a refuge for us. Selah."

**Meaning:** Trust in Him at all times, O people; pour out your heart before Him; God is a refuge for us.  
**Application:** God is your refuge. Don't hold back—pour out everything you're feeling.`.trim(),
        },
        {
          id: "d3-ps5617",
          type: "scripture",
          title: "You Have Kept Count of My Tossings",
          reference: "Psalm 56:8",
          body: `**Scripture (KJV)**  
> "Thou tellest my wanderings: put thou my tears into thy bottle: are they not in thy book?"

**Meaning:** You have kept count of my tossings; put my tears in Your bottle. Are they not in Your book?  
**Application:** God sees every tear you cry. None of your suffering is unseen or unnoticed by Him.`.trim(),
        },
      ],
    },
    {
      id: "day-4",
      dayNumber: 4,
      title: "Encouragement from Jesus' Suffering",
      items: [
        {
          id: "d4-devotional",
          type: "devotional",
          title: "Day 4 — Encouragement from Jesus' Suffering",
          body: `Jesus knows what it's like to suffer. He was despised, rejected, and crushed. He experienced physical pain, emotional anguish, and spiritual separation from the Father.

Because Jesus suffered, He is able to sympathize with you in your weakness (Hebrews 4:15). He doesn't look down on your pain—He entered into it.

**Reflection**

How does it change your perspective on suffering to know that Jesus Himself suffered?

**Prayer**

Jesus, thank You for not staying distant from my pain. You entered into it, and because You did, I can trust You to walk with me through mine.

**Shareable Truth**

"Jesus didn't avoid suffering—He entered into it so you would never suffer alone."`,
        },
        {
          id: "d4-isa533",
          type: "scripture",
          title: "A Man of Sorrows, Acquainted with Grief",
          reference: "Isaiah 53:3",
          body: `**Scripture (KJV)**  
> "He is despised and rejected of men; a man of sorrows, and acquainted with grief: and we hid as it were our faces from him; he was despised, and we esteemed him not."

**Meaning:** He was despised and rejected by men, a man of sorrows and acquainted with grief.  
**Application:** Jesus knows your suffering. He walked through it Himself.`.trim(),
        },
        {
          id: "d4-heb415-16",
          type: "scripture",
          title: "He Sympathizes with Our Weaknesses",
          reference: "Hebrews 4:15–16",
          body: `**Scripture (KJV)**  
> "For we have not an high priest which cannot be touched with the feeling of our infirmities; but was in all points tempted like as we are, yet without sin. Let us therefore come boldly unto the throne of grace, that we may obtain mercy, and find grace to help in time of need."

**Meaning:** We do not have a high priest who is unable to sympathize with our weaknesses, but one who in every respect has been tempted as we are, yet without sin.  
**Application:** Jesus understands your pain. Come boldly to Him for mercy and grace.`.trim(),
        },
        {
          id: "d4-1pet221-24",
          type: "scripture",
          title: "Christ Suffered for You",
          reference: "1 Peter 2:21–24",
          body: `**Scripture (KJV)**  
> "For even hereunto were ye called: because Christ also suffered for us, leaving us an example, that ye should follow his steps: Who did no sin, neither was guile found in his mouth: Who, when he was reviled, reviled not again; when he suffered, he threatened not; but committed himself to him that judgeth righteously: Who his own self bare our sins in his own body on the tree, that we, being dead to sins, should live unto righteousness: by whose stripes ye were healed."

**Meaning:** Christ suffered for you, leaving you an example, that you should follow in His steps. He bore our sins in His body on the tree.  
**Application:** Jesus' suffering was not meaningless—it purchased your salvation. Your suffering is not meaningless either.`.trim(),
        },
      ],
    },
    {
      id: "day-5",
      dayNumber: 5,
      title: "Eternal Perspective in Temporary Trials",
      items: [
        {
          id: "d5-devotional",
          type: "devotional",
          title: "Day 5 — Eternal Perspective in Temporary Trials",
          body: `Your suffering is real, but it is also temporary. Paul writes, "This light momentary affliction is preparing for us an eternal weight of glory beyond all comparison" (2 Corinthians 4:17).

One day, every tear will be wiped away. There will be no more suffering, no more pain, no more death. Hold on to that hope.

**Reflection**

Does your suffering feel overwhelming? How does the promise of eternity change the way you see it?

**Prayer**

Lord, help me to hold on to the hope of eternity. When this life feels unbearable, remind me that You are preparing a place where there will be no more tears.

**Shareable Truth**

"This suffering is real—but it's temporary. Glory is forever."`,
        },
        {
          id: "d5-2cor417-18",
          type: "scripture",
          title: "Light Momentary Affliction",
          reference: "2 Corinthians 4:17–18",
          body: `**Scripture (KJV)**  
> "For our light affliction, which is but for a moment, worketh for us a far more exceeding and eternal weight of glory; While we look not at the things which are seen, but at the things which are not seen: for the things which are seen are temporal; but the things which are not seen are eternal."

**Meaning:** This light momentary affliction is preparing for us an eternal weight of glory beyond all comparison, as we look not to the things that are seen but to the things that are unseen.  
**Application:** Your suffering is temporary. The glory that awaits you is eternal.`.trim(),
        },
        {
          id: "d5-rom818",
          type: "scripture",
          title: "The Sufferings of This Present Time",
          reference: "Romans 8:18",
          body: `**Scripture (KJV)**  
> "For I reckon that the sufferings of this present time are not worthy to be compared with the glory which shall be revealed in us."

**Meaning:** I consider that the sufferings of this present time are not worth comparing with the glory that is to be revealed to us.  
**Application:** The weight of eternal glory far outweighs the pain of this present age.`.trim(),
        },
        {
          id: "d5-rev214",
          type: "scripture",
          title: "No More Tears",
          reference: "Revelation 21:4",
          body: `**Scripture (KJV)**  
> "And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away."

**Meaning:** He will wipe away every tear from their eyes, and death shall be no more, neither shall there be mourning, nor crying, nor pain anymore, for the former things have passed away.  
**Application:** One day, all suffering will end. Hold on to that promise.`.trim(),
        },
      ],
    },
  ],
};

export const prayerLifePlan: DiscipleshipPlan = {
  id: "building-a-life-of-prayer",
  title: "Building a Life of Prayer",
  subtitle: "Moving from occasional prayer to ongoing conversation with God",
  imageUrl: prayerLifeImage,
  totalDays: 5,
  days: [
    {
      id: "day-1",
      dayNumber: 1,
      title: "Why Prayer Matters to God and You",
      items: [
        {
          id: "d1-devotional",
          type: "devotional",
          title: "Day 1 — Why Prayer Matters to God and You",
          body: `Prayer is not just a religious duty—it is the lifeline of your relationship with God. It is how you talk to Him, listen to Him, and align your heart with His.

God doesn't need your prayers, but He desires them. He wants you to come to Him, not because He is distant, but because He is a Father who loves to hear from His children.

Prayer changes you. It shifts your perspective, strengthens your faith, and deepens your dependence on God.

**Reflection**

Is prayer a priority in your life, or an afterthought? What would change if you saw it as essential, not optional?

**Prayer**

Lord, forgive me for neglecting prayer. Help me to see it as the privilege it is—talking to the God of the universe who calls me His child.

**Shareable Truth**

"Prayer is not a task to check off—it's a relationship to live in."`,
        },
        {
          id: "d1-1thess517",
          type: "scripture",
          title: "Pray Without Ceasing",
          reference: "1 Thessalonians 5:17",
          body: `**Scripture (KJV)**  
> "Pray without ceasing."

**Meaning:** Pray without ceasing.  
**Application:** Prayer is not confined to a specific time or place. It is a continual conversation with God throughout your day.`.trim(),
        },
        {
          id: "d1-jer2912-13",
          type: "scripture",
          title: "You Will Seek Me and Find Me",
          reference: "Jeremiah 29:12–13",
          body: `**Scripture (KJV)**  
> "Then shall ye call upon me, and ye shall go and pray unto me, and I will hearken unto you. And ye shall seek me, and find me, when ye shall search for me with all your heart."

**Meaning:** You will call upon Me and come and pray to Me, and I will hear you. You will seek Me and find Me, when you seek Me with all your heart.  
**Application:** God promises to hear and respond when you seek Him in prayer. He is not hiding—He is waiting for you to come.`.trim(),
        },
        {
          id: "d1-phil46",
          type: "scripture",
          title: "Let Your Requests Be Made Known",
          reference: "Philippians 4:6",
          body: `**Scripture (KJV)**  
> "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God."

**Meaning:** Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.  
**Application:** Prayer is the antidote to anxiety. Bring everything to God—big or small.`.trim(),
        },
      ],
    },
    {
      id: "day-2",
      dayNumber: 2,
      title: "Learning from the Lord's Prayer",
      items: [
        {
          id: "d2-devotional",
          type: "devotional",
          title: "Day 2 — Learning from the Lord's Prayer",
          body: `Jesus taught His disciples to pray by giving them a model: the Lord's Prayer. It is not a formula to repeat mindlessly, but a framework to follow.

It begins with worship ("Our Father, hallowed be Your name"), moves to submission ("Your kingdom come, Your will be done"), then to dependence ("Give us this day our daily bread"), confession ("Forgive us our debts"), and finally to spiritual warfare ("Deliver us from evil").

This prayer teaches balance: worship and petition, confession and dependence, trust and vigilance.

**Reflection**

Does your prayer life include all these elements, or do you focus only on asking for things?

**Prayer**

Father, teach me to pray like Jesus taught. Help me to worship, submit, confess, and trust—not just ask.

**Shareable Truth**

"The Lord's Prayer is not a script to recite—it's a model to follow."`,
        },
        {
          id: "d2-matt69-13",
          type: "scripture",
          title: "Our Father in Heaven",
          reference: "Matthew 6:9–13",
          body: `**Scripture (KJV)**  
> "After this manner therefore pray ye: Our Father which art in heaven, Hallowed be thy name. Thy kingdom come. Thy will be done in earth, as it is in heaven. Give us this day our daily bread. And forgive us our debts, as we forgive our debtors. And lead us not into temptation, but deliver us from evil: For thine is the kingdom, and the power, and the glory, for ever. Amen."

**Meaning:** Jesus teaches His disciples to pray: Our Father in heaven, hallowed be Your name. Your kingdom come, Your will be done. Give us our daily bread. Forgive us our debts. Lead us not into temptation, but deliver us from evil.  
**Application:** This prayer covers worship, submission, provision, forgiveness, and protection. Let it shape how you pray.`.trim(),
        },
        {
          id: "d2-luke111-4",
          type: "scripture",
          title: "Lord, Teach Us to Pray",
          reference: "Luke 11:1–4",
          body: `**Scripture (KJV)**  
> "And it came to pass, that, as he was praying in a certain place, when he ceased, one of his disciples said unto him, Lord, teach us to pray, as John also taught his disciples. And he said unto them, When ye pray, say, Our Father which art in heaven, Hallowed be thy name. Thy kingdom come. Thy will be done, as in heaven, so in earth. Give us day by day our daily bread. And forgive us our sins; for we also forgive every one that is indebted to us. And lead us not into temptation; but deliver us from evil."

**Meaning:** The disciples ask Jesus to teach them to pray, and He gives them the Lord's Prayer.  
**Application:** If the disciples needed to be taught to pray, so do you. Learn from Jesus.`.trim(),
        },
        {
          id: "d2-rom268",
          type: "scripture",
          title: "We Do Not Know What to Pray",
          reference: "Romans 8:26",
          body: `**Scripture (KJV)**  
> "Likewise the Spirit also helpeth our infirmities: for we know not what we should pray for as we ought: but the Spirit itself maketh intercession for us with groanings which cannot be uttered."

**Meaning:** The Spirit helps us in our weakness. For we do not know what to pray for as we ought, but the Spirit Himself intercedes for us.  
**Application:** When you don't know what to pray, the Spirit prays for you. Lean on Him.`.trim(),
        },
      ],
    },
    {
      id: "day-3",
      dayNumber: 3,
      title: "Praying Scripture and Promises",
      items: [
        {
          id: "d3-devotional",
          type: "devotional",
          title: "Day 3 — Praying Scripture and Promises",
          body: `One of the most powerful ways to pray is to pray God's Word back to Him. When you pray Scripture, you are praying what God has already said, aligning your heart with His will.

Take a promise from God's Word and turn it into a prayer. For example: "Lord, You promise to never leave me or forsake me (Hebrews 13:5). Help me to believe that today."

Praying Scripture gives you confidence that you are praying according to God's will.

**Reflection**

Do you pray Scripture, or only your own words? What promise from God's Word do you need to pray today?

**Prayer**

Lord, teach me to pray Your Word. Help me to know Your promises and to bring them before You in prayer.

**Shareable Truth**

"When you pray Scripture, you're praying what God has already promised."`,
        },
        {
          id: "d3-1john514-15",
          type: "scripture",
          title: "Praying According to His Will",
          reference: "1 John 5:14–15",
          body: `**Scripture (KJV)**  
> "And this is the confidence that we have in him, that, if we ask any thing according to his will, he heareth us: And if we know that he hear us, whatsoever we ask, we know that we have the petitions that we desired of him."

**Meaning:** This is the confidence we have in approaching God: that if we ask anything according to His will, He hears us. And if we know that He hears us, we know that we have what we asked of Him.  
**Application:** Praying God's Word is praying according to His will. You can pray with confidence.`.trim(),
        },
        {
          id: "d3-ps1192-5",
          type: "scripture",
          title: "Your Word Is a Lamp",
          reference: "Psalm 119:105",
          body: `**Scripture (KJV)**  
> "Thy word is a lamp unto my feet, and a light unto my path."

**Meaning:** Your word is a lamp to my feet and a light to my path.  
**Application:** God's Word guides your prayers. Let it light the way as you bring your requests to Him.`.trim(),
        },
        {
          id: "d3-josh18",
          type: "scripture",
          title: "Meditate on It Day and Night",
          reference: "Joshua 1:8",
          body: `**Scripture (KJV)**  
> "This book of the law shall not depart out of thy mouth; but thou shalt meditate therein day and night, that thou mayest observe to do according to all that is written therein: for then thou shalt make thy way prosperous, and then thou shalt have good success."

**Meaning:** This Book of the Law shall not depart from your mouth, but you shall meditate on it day and night, so that you may be careful to do according to all that is written in it.  
**Application:** Meditation on God's Word leads naturally into prayer. Fill your mind with Scripture, and it will overflow into your prayers.`.trim(),
        },
      ],
    },
    {
      id: "day-4",
      dayNumber: 4,
      title: "Interceding for Others",
      items: [
        {
          id: "d4-devotional",
          type: "devotional",
          title: "Day 4 — Interceding for Others",
          body: `Intercession is praying on behalf of others. It is one of the most loving things you can do—taking someone's needs, burdens, and struggles before the throne of God.

Paul constantly interceded for the churches. He prayed for their faith, their love, their knowledge, and their endurance. He didn't just pray for their physical needs—he prayed for their spiritual growth.

Who in your life needs you to intercede for them?

**Reflection**

Do you regularly pray for others, or are your prayers mostly about yourself? Who can you intercede for today?

**Prayer**

Lord, give me a heart that prays for others. Show me who needs intercession, and help me to stand in the gap for them.

**Shareable Truth**

"Intercession is love on its knees."`,
        },
        {
          id: "d4-eph116-19",
          type: "scripture",
          title: "Paul's Prayer for the Church",
          reference: "Ephesians 1:16–19",
          body: `**Scripture (KJV)**  
> "Cease not to give thanks for you, making mention of you in my prayers; That the God of our Lord Jesus Christ, the Father of glory, may give unto you the spirit of wisdom and revelation in the knowledge of him: The eyes of your understanding being enlightened; that ye may know what is the hope of his calling, and what the riches of the glory of his inheritance in the saints, And what is the exceeding greatness of his power to us-ward who believe, according to the working of his mighty power,"

**Meaning:** Paul prays that the Ephesians would have the Spirit of wisdom and revelation in the knowledge of God, that the eyes of their hearts would be enlightened to know His hope, riches, and power.  
**Application:** Pray for spiritual growth in others, not just physical needs.`.trim(),
        },
        {
          id: "d4-col19-12",
          type: "scripture",
          title: "We Have Not Ceased to Pray for You",
          reference: "Colossians 1:9–12",
          body: `**Scripture (KJV)**  
> "For this cause we also, since the day we heard it, do not cease to pray for you, and to desire that ye might be filled with the knowledge of his will in all wisdom and spiritual understanding; That ye might walk worthy of the Lord unto all pleasing, being fruitful in every good work, and increasing in the knowledge of God; Strengthened with all might, according to his glorious power, unto all patience and longsuffering with joyfulness; Giving thanks unto the Father, which hath made us meet to be partakers of the inheritance of the saints in light:"

**Meaning:** Paul prays that the Colossians would be filled with the knowledge of God's will, walk in a manner worthy of the Lord, bear fruit, and be strengthened with all power.  
**Application:** Consistent intercession is a mark of spiritual maturity. Don't give up praying for others.`.trim(),
        },
        {
          id: "d4-1tim21-4",
          type: "scripture",
          title: "Pray for All People",
          reference: "1 Timothy 2:1–4",
          body: `**Scripture (KJV)**  
> "I exhort therefore, that, first of all, supplications, prayers, intercessions, and giving of thanks, be made for all men; For kings, and for all that are in authority; that we may lead a quiet and peaceable life in all godliness and honesty. For this is good and acceptable in the sight of God our Saviour; Who will have all men to be saved, and to come unto the knowledge of the truth."

**Meaning:** First of all, then, I urge that supplications, prayers, intercessions, and thanksgivings be made for all people, for kings and all who are in high positions.  
**Application:** Pray broadly—for family, friends, leaders, and even those you disagree with.`.trim(),
        },
      ],
    },
    {
      id: "day-5",
      dayNumber: 5,
      title: "Praying Without Ceasing in Everyday Life",
      items: [
        {
          id: "d5-devotional",
          type: "devotional",
          title: "Day 5 — Praying Without Ceasing in Everyday Life",
          body: `Paul commands believers to "pray without ceasing" (1 Thessalonians 5:17). This doesn't mean you're always on your knees with your eyes closed—it means you live in continual awareness of God's presence, talking to Him throughout your day.

Prayer becomes a lifestyle when you turn your thoughts toward God in every situation: when you're worried, when you're grateful, when you're tempted, when you're joyful. Every moment can become a prayer.

**Reflection**

What would it look like to turn your everyday moments into prayers? How can you cultivate a habit of praying without ceasing?

**Prayer**

Lord, teach me to pray without ceasing. Help me to turn my thoughts toward You all day long, making my whole life a conversation with You.

**Shareable Truth**

"Praying without ceasing doesn't mean never stopping—it means never disconnecting."`,
        },
        {
          id: "d5-1thess517-18",
          type: "scripture",
          title: "Pray Without Ceasing, Give Thanks",
          reference: "1 Thessalonians 5:16–18",
          body: `**Scripture (KJV)**  
> "Rejoice evermore. Pray without ceasing. In every thing give thanks: for this is the will of God in Christ Jesus concerning you."

**Meaning:** Rejoice always, pray without ceasing, give thanks in all circumstances; for this is the will of God in Christ Jesus for you.  
**Application:** Prayer is woven into the rhythm of your day—rejoicing, praying, and giving thanks in all things.`.trim(),
        },
        {
          id: "d5-eph618",
          type: "scripture",
          title: "Pray at All Times in the Spirit",
          reference: "Ephesians 6:18",
          body: `**Scripture (KJV)**  
> "Praying always with all prayer and supplication in the Spirit, and watching thereunto with all perseverance and supplication for all saints;"

**Meaning:** Pray at all times in the Spirit, with all prayer and supplication, keeping alert with all perseverance.  
**Application:** Prayer is not confined to a time or place. It is a constant, Spirit-empowered conversation with God.`.trim(),
        },
        {
          id: "d5-col42",
          type: "scripture",
          title: "Continue Steadfastly in Prayer",
          reference: "Colossians 4:2",
          body: `**Scripture (KJV)**  
> "Continue in prayer, and watch in the same with thanksgiving;"

**Meaning:** Continue steadfastly in prayer, being watchful in it with thanksgiving.  
**Application:** Persevere in prayer. Don't give up. Stay watchful, alert, and grateful.`.trim(),
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
  identityInChristPlan,
  overcomingFearPlan,
  timeWithGodPlan,
  servingLikeJesusPlan,
  marriageLovePlan,
  parentingGospelPlan,
  workCallingPlan,
  purityWorldPlan,
  sufferingFaithfulnessPlan,
  prayerLifePlan,
];
