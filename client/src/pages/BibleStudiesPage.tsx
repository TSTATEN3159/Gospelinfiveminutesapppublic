import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Search, Clock, Users, BookOpen, Star, ChevronRight, Play, ChevronLeft } from "lucide-react";
import { useTranslations } from "@/lib/translations";

interface BibleStudyProps {
  currentUserId: string;
  language: string;
  onNavigate?: (page: string) => void;
}

interface BibleStudy {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  lessons: number;
  imageUrl?: string;
  featured?: boolean;
}

interface StudyLesson {
  id: number;
  title: string;
  content: string;
  verse: string;
  verseText: string;
  reflection: string[];
  prayer: string;
}

const sampleStudies: BibleStudy[] = [
  {
    id: "abide-in-christ",
    title: "Abide in Christ (Preview)",
    author: "Andrew Murray (1828-1917)",
    description: "Experience 5 sample chapters from this classic 31-day devotional exploring what it means to have continuous, intimate fellowship with Christ. Based on John 15, Murray teaches that abiding in Jesus is not a work we do, but a yielding to let Him do all for us. This timeless work has helped millions discover the secret of resting in Christ's keeping power.",
    category: "Discipleship",
    duration: "5 sample chapters",
    difficulty: "Beginner",
    lessons: 5,
    featured: true
  },
  {
    id: "morning-and-evening",
    title: "Morning and Evening (Preview)",
    author: "Charles H. Spurgeon (1834-1892)",
    description: "Sample 5 readings from Spurgeon's beloved devotional. The 'Prince of Preachers' wrote 732 daily readings (morning and evening for each day) to help believers begin and end each day with Scripture and reflection. These samples showcase his characteristic warmth, wit, and deep pastoral insight.",
    category: "Encouragement",
    duration: "5 sample readings",
    difficulty: "Beginner",
    lessons: 5
  },
  {
    id: "power-through-prayer",
    title: "Power Through Prayer (Preview)",
    author: "E.M. Bounds (1835-1913)",
    description: "Preview 5 chapters from this 20-chapter masterwork on prayer. Edward McKendree Bounds spent the last 17 years of his life writing about prayer. This powerful work declares that 'the Church is looking for better methods; God is looking for better men.'",
    category: "Prayer",
    duration: "5 sample chapters",
    difficulty: "Intermediate",
    lessons: 5
  },
  {
    id: "waiting-on-god",
    title: "Waiting on God (Preview)",
    author: "Andrew Murray (1828-1917)",
    description: "Sample 2 meditations from Murray's 31-day journey into the art of waiting upon God in prayer. Murray shows how waiting on God is not passive, but the highest form of active faith—learning to rest in His timing while remaining expectant for His work.",
    category: "Prayer",
    duration: "2 sample meditations",
    difficulty: "Intermediate",
    lessons: 2
  },
  {
    id: "all-of-grace",
    title: "All of Grace (Preview)",
    author: "Charles H. Spurgeon (1834-1892)",
    description: "Experience 5 chapters from Spurgeon's most beloved evangelistic work, written to explain the gospel in simple, compelling terms. He writes: 'I have felt that I would gladly give my two hands if I might by their loss bring you to Christ.'",
    category: "Discipleship",
    duration: "5 sample chapters",
    difficulty: "Beginner",
    lessons: 5
  },
  {
    id: "humility",
    title: "Humility: The Beauty of Holiness (Preview)",
    author: "Andrew Murray (1828-1917)",
    description: "Sample 2 chapters from Murray's profound study on humility as the root of every grace and virtue. He shows how Jesus—though equal with God—humbled Himself, and how we are called to follow His example. 'Humility is the blossom of which heaven is the fruit.'",
    category: "Character",
    duration: "2 sample chapters",
    difficulty: "Intermediate",
    lessons: 2
  }
];

// Study-specific lessons from public domain Christian classics
// Each study has its own lesson content from the actual book

// Andrew Murray's "Abide in Christ" (Public Domain, 1895)
const abideInChristLessons: StudyLesson[] = [
  {
    id: 1,
    title: "Day 1: All You Who Have Come to Him",
    content: "It is to you who have heard and hearkened to the call, 'Come unto me,' that this new invitation comes, 'Abide in me.' The message comes from the same loving Saviour. You doubtless have never repented having come at His call. He made you partakers of the blessings and the joy of His love. Was not His welcome most hearty, His pardon full and free, His love most sweet and precious?\n\nAnd yet you have had to complain of disappointment: as time went on, your expectations were not realized. The blessings you once enjoyed were lost; the love and joy of your first meeting with your Saviour, instead of deepening, became faint and feeble.\n\nThe answer is very simple. You wandered from Him. The blessings He bestows are all connected with His 'Come to ME,' and are only to be enjoyed in close fellowship with Himself. You either did not fully understand, or did not rightly remember, that the call meant, 'Come to me to stay with me.'\n\nObserve especially, it was not that He said, 'Come to me and abide with me,' but, 'Abide IN me.' He opened His arms, to press you to His bosom; He opened His heart, to welcome you there; He opened up all His divine fulness of life and love, and offered to take you up into its fellowship, to make you wholly one with Himself.",
    verse: "John 15:4",
    verseText: "Abide in me, and I in you. As the branch cannot bear fruit of itself, except it abide in the vine; no more can ye, except ye abide in me.",
    reflection: [
      "When did you first come to Jesus, and what was that experience like?",
      "Have you experienced times when your spiritual joy faded? What caused it?",
      "What does it mean to you that Jesus invites you not just to come, but to abide IN Him?"
    ],
    prayer: "Blessed Saviour, I do abide in Thee. At Thy bidding I take Thy yoke; I undertake the duty without delay; I abide in Thee. Let day by day the answer from my heart be clearer and fuller: Blessed Saviour, I do abide in Thee. Amen."
  },
  {
    id: 2,
    title: "Day 2: And You Shall Find Rest to Your Souls",
    content: "Rest for the soul: Such was the first promise with which the Saviour sought to win the heavy-laden sinner. Rest for the soul—does it not imply deliverance from every fear, the supply of every want, the fulfilment of every desire?\n\nFirst the Saviour says, 'Come unto me, and I will give you rest'—the rest of pardon and acceptance—the rest in my love. But we know that all that God bestows needs time to become fully our own; it must be held fast, and appropriated, and assimilated into our inmost being.\n\nAnd so the Saviour repeats His promise: 'Take my yoke upon you and learn of me; ye shall find rest to your souls.' The rest He gave at coming will become something you have really found and made your very own—the deeper abiding rest which comes from longer acquaintance and closer fellowship, from entire surrender and deeper sympathy.\n\nGiving up one's whole life to Him, for Him alone to rule and order it; taking up His yoke, and submitting to be led and taught, to learn of Him; abiding in Him, to be and do only what He wills—these are the conditions of discipleship without which there can be no thought of maintaining the rest that was bestowed on first coming to Christ.",
    verse: "Matthew 11:28-29",
    verseText: "Come unto me, all ye that labour and are heavy laden, and I will give you rest. Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls.",
    reflection: [
      "What is the difference between the rest Jesus gives immediately, and the rest we find through abiding?",
      "In what areas of your life do you still carry burdens instead of resting in Christ?",
      "How can 'taking His yoke' actually lead to rest rather than more work?"
    ],
    prayer: "O my Saviour, if ever my heart should doubt or fear again, as if the blessing were too great to expect, or too high to attain, let me hear Thy voice to quicken my faith and obedience: 'Abide in me'; 'Take my yoke upon you, and learn of me; ye shall find rest to your souls.' Amen."
  },
  {
    id: 3,
    title: "Day 3: Trusting Him to Keep You",
    content: "More than one admits that it is a sacred duty and a blessed privilege to abide in Christ, but shrinks back continually before the question: Is it possible, a life of unbroken fellowship with the Saviour?\n\nDear souls! How little they know that the abiding in Christ is just meant for the weak, and so beautifully suited to their feebleness. It is not the doing of some great thing, and does not demand that we first lead a very holy and devoted life. No, it is simply weakness entrusting itself to a Mighty One to be kept—the unfaithful one casting self on One who is altogether trustworthy and true.\n\nAbiding in Him is not a work that we have to do as the condition for enjoying His salvation, but a consenting to let Him do all for us, and in us, and through us. It is a work He does for us—the fruit and the power of His redeeming love. Our part is simply to yield, to trust, and to wait for what He has engaged to perform.\n\nFix your eyes on the whereunto for which He has apprehended you. It is nothing less than a life of abiding, unbroken fellowship with Himself to which He is seeking to lift you up. Union with Himself, and so with the Father, is His highest object. Fix your eye on this, and gaze until it stand out before you clear and unmistakable: Christ's aim is to have me abiding in Him.",
    verse: "Philippians 3:12",
    verseText: "Not as though I had already attained, either were already perfect: but I follow after, if that I may apprehend that for which also I am apprehended of Christ Jesus.",
    reflection: [
      "Do you sometimes feel too weak to maintain fellowship with Christ? How does this teaching address that fear?",
      "What does it mean that abiding is 'consenting to let Him do all for us'?",
      "How does knowing that Christ has 'apprehended' you change your perspective on the spiritual life?"
    ],
    prayer: "O my Jesus, if Thou biddest me, and if Thou engagest to lift and keep me there, I will venture. Trembling, but trusting, I will say: Jesus, I do abide in Thee. It is because Jesus has taken hold of me, and because Jesus keeps me, that I dare to say: Saviour, I abide in Thee. Amen."
  },
  {
    id: 4,
    title: "Day 4: As the Branch in the Vine",
    content: "Jesus said: 'I am the vine, ye are the branches.' In the previous lessons we studied the meaning of His command, 'Abide in me.' Today we look at the beautiful parable He used to make that command clear.\n\nConsider a vine and its branches. The branch is completely, absolutely dependent on the vine for its nourishment and life. It can do nothing of itself. So it is with the believer and Christ.\n\nThe connection between the vine and the branch is a living one. No outer joining or union will suffice; it must be a vital connection. The vine and the branches are one.\n\nThe vine lives in the branch. Through the organic connection between them, the life of the vine flows through the branch. The sap and fatness of the vine are the life of the branch.\n\nThe branch lives in the vine. From the vine comes all that makes the branch what it is. Day and night, every moment, it abides in the vine. Not for a moment can it be separated.\n\nAbiding in Christ means the complete surrender of the whole being, as utterly empty of all good, to receive and enjoy the presence and the power of the vine in the branch.",
    verse: "John 15:5",
    verseText: "I am the vine, ye are the branches: He that abideth in me, and I in him, the same bringeth forth much fruit: for without me ye can do nothing.",
    reflection: [
      "In what ways does the image of the vine and branch help you understand your relationship with Christ?",
      "What does it mean practically that 'without Him you can do nothing'?",
      "How can you cultivate a deeper awareness of your dependence on Christ throughout each day?"
    ],
    prayer: "Lord Jesus, I thank Thee for this beautiful picture of the vine and branches. Help me to see that my life is completely dependent on Thee, and that apart from Thee I can do nothing. Teach me to abide in Thee every moment, drawing all my strength and fruitfulness from Thy life flowing through me. Amen."
  },
  {
    id: 5,
    title: "Day 5: As You Came to Him, by Faith",
    content: "Some believers seem to think that once they have begun the Christian life, their work is to maintain their spiritual state by effort and willpower. But the Apostle Paul teaches us: 'As ye have therefore received Christ Jesus the Lord, so walk ye in him.'\n\nHow did you receive Christ? By faith—simply trusting in His promise and His grace. It is in this same way that you are to continue walking in Him.\n\nFaith is the very essence of abiding. Faith is not the effort of the mind to believe something it does not naturally believe. Faith is the simple resting of the soul on God's Word and God's faithfulness.\n\nWhen you first came to Christ, you did not come because you felt worthy or capable. You came because you were weak and sinful, and you trusted in His power to save. So it is with abiding.\n\nThe life of faith is one of continual looking away from self to Christ. It is not introspection, examining whether we are abiding properly. It is the upward look, the outward look to Jesus, trusting Him to keep us as we simply rest in Him.\n\nLet your abiding be the exercise of faith. Do not make it a burden or a work. Simply trust Jesus to keep you abiding.",
    verse: "Colossians 2:6-7",
    verseText: "As ye have therefore received Christ Jesus the Lord, so walk ye in him: Rooted and built up in him, and stablished in the faith, as ye have been taught, abounding therein with thanksgiving.",
    reflection: [
      "How did you first come to Christ? Was it through effort or through simple trust?",
      "In what ways have you tried to 'maintain' your spiritual life by effort rather than faith?",
      "What would it look like to walk with Christ the same way you first received Him?"
    ],
    prayer: "Lord, I thank Thee that salvation is by grace through faith from beginning to end. Help me to stop striving and start trusting. Just as I received Thee by simple faith, teach me to walk in Thee and abide in Thee the same way. I rest in Thy keeping power today. Amen."
  }
];

// Charles Spurgeon's "Morning and Evening" (Public Domain, 1866)
const morningAndEveningLessons: StudyLesson[] = [
  {
    id: 1,
    title: "January 1 - Morning: A New Beginning",
    content: "They did eat of the fruit of the land of Canaan that year.' It was on the morrow after the Passover that the manna ceased. The provision which had been their food for forty years in the wilderness was no longer needed now that they had entered the promised land.\n\nBeliever, there is a change for you also. You have passed from death unto life, from the wilderness of sin into the Canaan of grace. It is right that your spiritual food should change. The manna was food for pilgrims and wanderers; you need food for conquerors and inheritors.\n\nYou are now to live upon the old corn of the land—the rich provisions stored up by the dying and rising of your blessed Lord Jesus. Feed upon Him. Let your soul be nourished by the flesh and blood of Christ. He is the true bread from heaven, and he that eateth of this bread shall live forever.\n\nThis is the year's beginning. Let it be the beginning of a better, holier, and more heavenly life. May the God of all grace grant you to grow in grace, and in the knowledge of our Lord and Saviour Jesus Christ.",
    verse: "Joshua 5:12",
    verseText: "And the manna ceased on the morrow after they had eaten of the old corn of the land; neither had the children of Israel manna any more; but they did eat of the fruit of the land of Canaan that year.",
    reflection: [
      "How has God's provision for you changed as you have grown in faith?",
      "What 'wilderness food' might God be asking you to leave behind for something richer?",
      "How can you feast more deeply on Christ Himself this year?"
    ],
    prayer: "Lord Jesus, as I begin this new year, help me to feed more deeply upon Thee. May I move from merely surviving to truly thriving in Thy grace. Give me a hunger for the riches of Thy Word and Thy presence. Amen."
  },
  {
    id: 2,
    title: "January 1 - Evening: The Promise of His Presence",
    content: "We will come unto him, and make our abode with him.' What condescension is this! God Himself, the Father and the Son, coming to us to make their abode with us! Not a casual visit, but a permanent dwelling.\n\nThink of the honor: the King of kings choosing to dwell in the humble cottage of your heart! He who fills immensity makes His home in a believer's soul. The heaven of heavens cannot contain Him, yet He condescends to dwell within your breast.\n\nBut observe the condition: 'If a man love me, he will keep my words.' Love is the magnet that draws the divine presence. Obedience is the evidence of love. We cannot separate love from obedience; they are twins.\n\nBeloved, if you would have the Father and the Son to abide with you, keep close to Christ's words. Read them, meditate upon them, practice them. Let them be your daily counsel and guide. So shall your heart become a holy of holies, a dwelling place of the Most High.",
    verse: "John 14:23",
    verseText: "Jesus answered and said unto him, If a man love me, he will keep my words: and my Father will love him, and we will come unto him, and make our abode with him.",
    reflection: [
      "What does it mean to you that God desires to make His home in your heart?",
      "How does love for Christ motivate your obedience to His words?",
      "What would change in your daily life if you truly believed God was dwelling within you?"
    ],
    prayer: "Father, I am amazed that Thou wouldst desire to dwell with one such as me. Help me to love Thy Son and keep His words, that my heart might be a worthy dwelling for Thee. Come, Lord, and make Thine abode with me. Amen."
  },
  {
    id: 3,
    title: "January 2 - Morning: Strength for Each Day",
    content: "As thy days, so shall thy strength be.' Precious promise! Whatever thy days bring thee, strength shall be given equal to the need. In the morning of life, when duties are new and untried, grace shall be given. In the noon of labor, when the heat is heavy and the toil severe, strength shall be renewed. In the evening of age, when the shadows lengthen and the night draws near, fresh vigor shall be imparted.\n\nThis promise has a most comprehensive application. Some days are dark with sorrow—then look for strong consolation. Some days are bright with joy—then look for strength to bear the burden of happiness, which is often as hard to carry as the burden of grief. Some days are full of temptation—then expect power to resist.\n\nMark this: the promise is not that as thy months, or as thy years, but as thy DAYS shall thy strength be. Live for the day, not dreading tomorrow nor regretting yesterday. Each day brings its own supply. God's mercies are new every morning.",
    verse: "Deuteronomy 33:25",
    verseText: "Thy shoes shall be iron and brass; and as thy days, so shall thy strength be.",
    reflection: [
      "What day-by-day challenges do you currently face that require God's strength?",
      "How does living 'one day at a time' reduce anxiety about the future?",
      "Can you recall a time when God gave you exactly the strength you needed for a difficult day?"
    ],
    prayer: "Gracious Father, I thank Thee for the promise of daily strength. Help me not to borrow trouble from tomorrow, but to trust Thee for today's provision. As my days, so may my strength be. Amen."
  },
  {
    id: 4,
    title: "January 2 - Evening: Fullness in Christ",
    content: "Of his fulness have all we received.' The fullness of Christ is inexhaustible. All the saints have received of it, from the first until now, and yet it remains as full as ever. It is like the widow's cruse of oil which never failed, or like the sun which, though it has shone for ages, is as bright today as at the beginning.\n\nBut observe—we have received grace. Not a portion of grace, but 'grace for grace'—one wave of grace following another, like the successive waves of the sea. As fast as one grace is used, another comes to take its place.\n\nFrom this inexhaustible fullness we may draw at any moment. The supply never fails. Are you in need? Go to the fullness. Are you empty? There is fullness to fill you. Are you weak? There is strength. Are you ignorant? There is wisdom. Are you sinful? There is righteousness.\n\nWhatever you need, Christ has it and offers it freely. Come boldly. Come continually. His fullness awaits your emptiness.",
    verse: "John 1:16",
    verseText: "And of his fulness have all we received, and grace for grace.",
    reflection: [
      "What aspect of Christ's fullness do you most need to draw upon right now?",
      "How does the image of 'wave after wave' of grace encourage you?",
      "What prevents you from coming more boldly to receive from Christ's abundance?"
    ],
    prayer: "Lord Jesus, I come to Thy fullness with my emptiness. Fill me afresh with Thy grace, Thy strength, Thy wisdom. May I never think that Thy supply can be exhausted. Help me to receive freely all that Thou dost offer. Amen."
  },
  {
    id: 5,
    title: "January 3 - Morning: Perfect Peace",
    content: "Thou wilt keep him in perfect peace, whose mind is stayed on thee.' Peace—perfect peace—is one of the choicest blessings the soul can possess. Many seek it in the world and find only disappointment. But the soul that is stayed upon God finds a peace that passes understanding.\n\nObserve the condition: the mind must be 'stayed'—fixed, settled, anchored. It is not the occasional glance at God that brings peace, but the steady gaze. Not the fitful trust, but the habitual reliance. The mind that wanders brings only anxiety; the mind that is stayed brings rest.\n\nThis peace is not dependent upon circumstances. It can flourish in the storm as well as in the calm. It does not require the absence of trouble, but the presence of God. The believer whose mind is stayed on God can smile at the tempest because his anchor holds within the veil.\n\nDo you want this peace? Then fix your mind on God. In the morning, set your thoughts upon Him. Through the day, bring every anxiety to Him. At night, commit yourself to His keeping.",
    verse: "Isaiah 26:3",
    verseText: "Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.",
    reflection: [
      "What tends to 'unfix' your mind from God and disturb your peace?",
      "How can you practice keeping your mind 'stayed' on God throughout the day?",
      "What is the connection between trusting God and experiencing His peace?"
    ],
    prayer: "Lord, my mind is so prone to wander. Fix my thoughts upon Thee. Help me to stay my mind upon Thy faithfulness, Thy love, Thy power. Keep me in perfect peace, not because my circumstances are easy, but because my trust is in Thee. Amen."
  }
];

// E.M. Bounds' "Power Through Prayer" (Public Domain, 1912)
const powerThroughPrayerLessons: StudyLesson[] = [
  {
    id: 1,
    title: "Chapter 1: Men of Prayer Needed",
    content: "We are constantly on a stretch, if not on a strain, to devise new methods, new plans, new organizations to advance the Church and secure enlargement and efficiency for the Gospel. This trend of the day has a tendency to lose sight of the man or sink the man in the plan or organization.\n\nGod's plan is to make much of the man, far more of him than of anything else. Men are God's method. The Church is looking for better methods; God is looking for better men.\n\nWhat the Church needs today is not more machinery or better, not new organizations or more and novel methods, but men whom the Holy Ghost can use—men of prayer, men mighty in prayer. The Holy Ghost does not flow through methods, but through men. He does not come on machinery, but on men. He does not anoint plans, but men—men of prayer.\n\nAn eminent historian has said that the accidents of personal character have more to do with the revolutions of nations than either philosophic historians or democratic politicians will allow. This truth has its application in full to the gospel of Christ.",
    verse: "1 Timothy 2:8",
    verseText: "I will therefore that men pray every where, lifting up holy hands, without wrath and doubting.",
    reflection: [
      "Why does God work primarily through people rather than methods and programs?",
      "What does it mean to be a person 'whom the Holy Ghost can use'?",
      "How might an overemphasis on methods and organization hinder spiritual effectiveness?"
    ],
    prayer: "Lord, make me a person of prayer. I confess that I have often trusted in methods and programs more than in Thee. Help me to understand that Thou art looking for men and women who will pray. Let me be such a person. Amen."
  },
  {
    id: 2,
    title: "Chapter 2: Our Sufficiency Is of God",
    content: "The man makes the preacher. God must make the man. The messenger is, if possible, more than the message. The preacher is more than the sermon. The preacher makes the sermon. As the life-giving milk from the mother's bosom is but the mother's life, so all the preacher says is tinctured, impregnated by what the preacher is.\n\nThe treasure is in earthen vessels, and the taste of the vessel impregnates and may discolor. The man, the whole man, lies behind the sermon. Preaching is not the performance of an hour. It is the outflow of a life. It takes twenty years to make a sermon, because it takes twenty years to make the man.\n\nThe true sermon is a thing of life. The sermon grows because the man grows. The sermon is forceful because the man is forceful. The sermon is holy because the man is holy. The sermon is full of the divine unction because the man is full of the divine unction.\n\nIt is not great talents or great learning or great preachers that God needs, but men great in holiness, great in faith, great in love, great in fidelity, great for God.",
    verse: "2 Corinthians 3:5",
    verseText: "Not that we are sufficient of ourselves to think any thing as of ourselves; but our sufficiency is of God.",
    reflection: [
      "How does your character and spiritual life affect the impact of your words on others?",
      "What does it mean that 'it takes twenty years to make a sermon'?",
      "In what areas do you need God to work on the 'man' or 'woman' behind your ministry?"
    ],
    prayer: "Father, I acknowledge that my sufficiency is not in myself but in Thee. Work on me, the vessel, before Thou dost work through me. Make me a person of holiness, faith, and love, that my life might speak as loudly as my words. Amen."
  },
  {
    id: 3,
    title: "Chapter 3: The Letter Killeth",
    content: "The church may find suitable employment for the merely professional or formally educated preacher, but the pulpit of the evangelist cannot be filled by the man who is not thoroughly devoted to God. The church may give a place to the merely gifted man, but God does not give him a place in His kingdom.\n\nThe letter of the Word can be preached with head knowledge, but the Spirit of the Word can only be taught by the anointing. The great truths of the gospel can be stated by one whose heart has never been touched by grace, but they can only be witnessed to by one who has experienced their power.\n\nMany preachers know little about the prayer-closet. They spend more time with their books than with their God. They are stronger in intellect than in heart. Their sermons are full of light but lack heat. They instruct the mind but do not move the heart.\n\nThe preacher's sharpest and strongest preaching should be to himself. His most difficult, delicate, laborious, and thorough work must be with himself. The training of the twelve was the great, difficult, and enduring work of Christ.",
    verse: "2 Corinthians 3:6",
    verseText: "Who also hath made us able ministers of the new testament; not of the letter, but of the spirit: for the letter killeth, but the spirit giveth life.",
    reflection: [
      "What is the difference between head knowledge and heart knowledge of spiritual truth?",
      "How much time do you spend in the 'prayer-closet' compared to other activities?",
      "Why must our strongest 'preaching' be directed at ourselves first?"
    ],
    prayer: "Lord, save me from being a minister of the letter that kills rather than the Spirit who gives life. Let my knowledge of Thee be experiential, not merely intellectual. Drive me to the prayer-closet where alone I can receive the anointing. Amen."
  },
  {
    id: 4,
    title: "Chapter 4: Tendencies to Be Avoided",
    content: "The preacher must throw himself, with all the abandon of a perfect, self-emptying faith and a self-consuming zeal, into his work for the salvation of men. Hearty, heroic, compassionate, fearless martyrs must the men be who take hold of and shape a generation for God.\n\nIf they be timid timeservers, place seekers, if they be men pleasers or men fearers, if their faith has a weak hold on God or His Word, if their denial be broken by any phase of self or the world, they cannot take hold of the Church nor the world for God.\n\nThe real sermon is made in the closet. The man—God's man—is made in the closet. His life and his profoundest convictions were born in his secret communion with God. The burdened and tearful agony of his spirit, his weightiest and sweetest messages were got when alone with God.\n\nPrayer makes the man; prayer makes the preacher; prayer makes the pastor. The pulpit of this day is weak in praying. The pride of learning is against the dependent humility of prayer.",
    verse: "Acts 4:13",
    verseText: "Now when they saw the boldness of Peter and John, and perceived that they were unlearned and ignorant men, they marvelled; and they took knowledge of them, that they had been with Jesus.",
    reflection: [
      "What 'tendencies' in your own life might hinder your spiritual effectiveness?",
      "How does the 'pride of learning' work against the humility of prayer?",
      "What would change if your most profound messages came from time alone with God?"
    ],
    prayer: "Father, deliver me from being a timid timeserver or a man-pleaser. Give me the holy boldness that comes from being with Jesus. Let my messages be born in the closet of prayer, not merely in the study of books. Amen."
  },
  {
    id: 5,
    title: "Chapter 5: Prayer, the Great Essential",
    content: "Every preacher who does not make prayer a mighty factor in his own life and ministry is weak as a factor in God's work and is powerless to advance God's cause in this world. Prayer is the mightiest weapon in all the arsenal of heaven.\n\nThe sweetest graces by a slight perversion may bear the bitterest fruit. The strongest virtues, by an unguarded use, may become the very ruin of character. The deadliest wound may be self-inflicted. The most fatal blow to character may be by the pen of the man himself.\n\nPrayer, with its allied forces of faith, patience, and love, is the foundation of godly character and the fruitful mother of godly actions. Nothing is done well without prayer. Prayer is not incidental to the work of the preacher; it is the very business of his calling.\n\nPrayer is not simply the first thing a minister should do each day; it is the continuing thing he should do all day. The preacher must be pre-eminently a man of prayer. If he does not make prayer a chief study and chief work, he is not a true minister of Jesus Christ.",
    verse: "Ephesians 6:18",
    verseText: "Praying always with all prayer and supplication in the Spirit, and watching thereunto with all perseverance and supplication for all saints.",
    reflection: [
      "Is prayer truly the 'business of your calling' or merely an addition to it?",
      "What would it mean for prayer to be a 'continuing thing' throughout your day?",
      "How can prayer become the foundation rather than the decoration of your spiritual life?"
    ],
    prayer: "Lord, I confess that prayer has often been incidental rather than essential in my life. Teach me that prayer is the very business of my calling. Make me a person for whom prayer is not just the first thing but the continuing thing. Amen."
  }
];

// Spurgeon's "All of Grace" (Public Domain, 1886)
const allOfGraceLessons: StudyLesson[] = [
  {
    id: 1,
    title: "Chapter 1: To You",
    content: "I have felt that I would gladly give my two hands if I might by their loss bring you to Christ. I have thought that I would willingly lose my eyes if only you could see the way of salvation. I have cried unto God in secret with great bitterness of soul for your sake.\n\nTo you I would speak, and to all who are like you. The message is for all who feel their need of a Saviour. If you desire to escape from sin and its terrible consequences, this book is meant for you.\n\nI am not writing for the learned, but for the ignorant. I am not addressing the righteous, but sinners. I would speak to those who are conscious that they have wandered from God, and who would gladly return if they knew the way.\n\nGod has a way of salvation which is open to every sinner under heaven. It is entirely of grace. It asks for nothing from you as a price or a preparation. It meets you just as you are.",
    verse: "Romans 3:24",
    verseText: "Being justified freely by his grace through the redemption that is in Christ Jesus.",
    reflection: [
      "How does Spurgeon's passion for souls challenge your own concern for the lost?",
      "What does it mean that salvation 'asks for nothing from you as a price or preparation'?",
      "How should the message of grace affect those who feel unworthy to approach God?"
    ],
    prayer: "Lord, give me the heart of a true soul-winner, one who would give anything to see others come to Christ. Help me to understand and proclaim the message of grace—that salvation is free and open to all who come. Amen."
  },
  {
    id: 2,
    title: "Chapter 2: God Justifieth the Ungodly",
    content: "This message is for those who feel themselves to be ungodly. It is not for the righteous that I write, but for the very opposite class—for the ungodly. 'God justifieth the ungodly.' That is the wonder of wonders—that God should justify the ungodly!\n\nYou say, 'How can this be? Surely the righteous Lord cannot approve of the unrighteous?' No, He does not approve of sin; but He does justify the sinner who believes in Jesus. This is the gospel—not that God forgives good people, but that He justifies the ungodly.\n\nIf you feel your ungodliness, here is hope for you. You need not become godly first before coming to Christ. Come as you are, ungodly as you are. Christ Jesus came into the world to save sinners—not those who think they are righteous, but those who know they are sinners.\n\nI do not ask you to prepare yourself for grace. Grace meets you in your rags and filth. Grace finds you in the far country among the swine. Grace invites you to the Father's house without delay.",
    verse: "Romans 4:5",
    verseText: "But to him that worketh not, but believeth on him that justifieth the ungodly, his faith is counted for righteousness.",
    reflection: [
      "Why is it significant that God 'justifies the ungodly' rather than the righteous?",
      "How does this truth liberate those who feel they must clean themselves up before coming to God?",
      "What is the relationship between feeling your ungodliness and being ready for grace?"
    ],
    prayer: "Father, I thank Thee that Thou dost justify the ungodly. I do not come to Thee because I am righteous, but because I am a sinner in need of Thy grace. Justify me through faith in Christ Jesus, not through any works of my own. Amen."
  },
  {
    id: 3,
    title: "Chapter 3: 'It Is God That Justifieth'",
    content: "Here is a rock upon which you may build your eternal hope: 'It is God that justifieth.' It is not man, whose judgment may be mistaken or unjust, but God Himself who declares the believer righteous.\n\nWhen God justifies a sinner, who shall condemn? 'Who shall lay anything to the charge of God's elect? It is God that justifieth.' If the highest court has pronounced you righteous, what lower court can reverse the verdict?\n\nOh, sinner, if you believe in Jesus, God Himself declares you righteous! Not merely pardoned, but justified—declared to be as righteous as if you had never sinned. This is what Christ's blood and righteousness do for you.\n\nLet the law condemn; God justifies. Let conscience accuse; God justifies. Let Satan bring his charges; God justifies. And if God be for us, who can be against us? This is the solid ground upon which the believer stands forever secure.",
    verse: "Romans 8:33-34",
    verseText: "Who shall lay any thing to the charge of God's elect? It is God that justifieth. Who is he that condemneth? It is Christ that died, yea rather, that is risen again, who is even at the right hand of God, who also maketh intercession for us.",
    reflection: [
      "What does it mean that God 'declares' believers righteous rather than merely forgiving them?",
      "How does the security of God's justification answer the accusations of conscience and Satan?",
      "Why is the fact that God Himself justifies the ultimate ground of assurance?"
    ],
    prayer: "Lord God, I rest upon Thy justification. When my conscience condemns me, I look to Thee. When Satan accuses me, I point to Christ. Thou hast declared me righteous through faith in Jesus. In this I stand forever secure. Amen."
  },
  {
    id: 4,
    title: "Chapter 4: Concerning Deliverance from Sinning",
    content: "Many seek salvation from the punishment of sin, but what they need most is salvation from sinning. It is a blessed thing to be delivered from the wrath to come, but it is a more blessed thing to be delivered from the love of sin.\n\nDo you desire to be made holy? Then come to Jesus. He is not only a Saviour from hell, but a Saviour from sin. He did not come merely to rescue us from the consequences of sin, but from the dominion of sin.\n\nSome say, 'I cannot give up my sins.' Dear friend, you do not have to give them up before you come to Christ; you come to Him that He may give you power to overcome them. The power to conquer sin comes from receiving Christ, not from reforming yourself.\n\nChrist does not ask you to clean yourself up before coming. He asks you to come dirty, that He may wash you. He asks you to come weak, that He may strengthen you. He asks you to come bound, that He may set you free.",
    verse: "Matthew 1:21",
    verseText: "And she shall bring forth a son, and thou shalt call his name JESUS: for he shall save his people from their sins.",
    reflection: [
      "What is the difference between being saved from the punishment of sin and from sin itself?",
      "Why is it good news that we come to Christ for power to overcome sin, rather than trying first to overcome it?",
      "How does understanding this liberate those who feel trapped in sinful patterns?"
    ],
    prayer: "Lord Jesus, save me not only from sin's punishment but from sin's power. I cannot overcome in my own strength, so I come to Thee for deliverance. Break every chain that binds me and set me free to live for Thee. Amen."
  },
  {
    id: 5,
    title: "Chapter 5: By Grace Through Faith",
    content: "Salvation is all of grace—from first to last. From the first thought of mercy to the final admission to glory, it is grace and grace alone. We are not saved by works, lest any man should boast. We are saved by grace through faith.\n\nBut what is faith? It is not a difficult thing, though many make it so. Faith is simply trusting Jesus. Faith is looking to Him as the brazen serpent was looked upon in the wilderness. Faith is receiving Christ as He is offered in the gospel.\n\nSome say, 'I wish I could believe.' But faith is not an effort—it is a rest. It is not struggling—it is yielding. It is not doing—it is trusting another who has done. Look away from your faith to Christ. It is not faith that saves, but Christ. Faith is simply the hand that receives what Christ offers.\n\nDo not analyze your faith. Simply trust. As you would trust a friend who promised to help you, so trust Jesus who has promised to save all who come to Him.",
    verse: "Ephesians 2:8-9",
    verseText: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.",
    reflection: [
      "How does understanding faith as 'resting' rather than 'struggling' change your approach to believing?",
      "Why is it important to look away from your faith to Christ Himself?",
      "What does it mean practically to trust Jesus as you would trust a faithful friend?"
    ],
    prayer: "Lord, I do not trust in my own ability to believe, but in Thy faithfulness to save. I rest in Thee. I receive what Thou dost offer. Not my faith but Thy faithfulness is my confidence. I simply trust Thee, Lord Jesus. Amen."
  }
];

// Andrew Murray's "Waiting on God" (Public Domain, 1896)
const waitingOnGodLessons: StudyLesson[] = [
  {
    id: 1,
    title: "Day 1: The God of Our Salvation",
    content: "Wait on the Lord.' How little we know what these words mean! How much we need to be taught to practice them! We want to learn what it really is to wait only upon God—to wait for His salvation.\n\nThe deep root of all true waiting is the knowledge of our own helplessness and the certainty that God must work. We must learn to acknowledge our absolute dependence upon Him.\n\nBut waiting is also the expression of desire—strong desire for God Himself and for what He alone can give. It is not merely waiting for blessings, but waiting for the Blesser. It is not merely looking for answers to prayer, but looking for Him who answers.\n\nWaiting speaks also of patience. We wait in the quiet confidence that God will fulfill His Word. We wait without anxiety, without restlessness, in the calm assurance that His time is best.\n\nAbove all, waiting expresses trust—unshakeable trust that God is faithful, that He will not disappoint those who put their hope in Him.",
    verse: "Psalm 62:1-2",
    verseText: "Truly my soul waiteth upon God: from him cometh my salvation. He only is my rock and my salvation; he is my defence; I shall not be greatly moved.",
    reflection: [
      "What does it mean to wait on God Himself rather than just His blessings?",
      "In what areas of your life do you struggle with waiting patiently on God?",
      "How does acknowledging your helplessness prepare you for true waiting?"
    ],
    prayer: "Lord, teach me to wait upon Thee. I confess my impatience and my tendency to look to other sources for help. Thou art my rock and my salvation. Help me to wait quietly and confidently for Thee alone. Amen."
  },
  {
    id: 2,
    title: "Day 2: The Keynote of Life",
    content: "Waiting on God is not merely a spiritual exercise for special occasions. It must become the keynote of our daily life. In every circumstance, at every moment, the soul must be in the attitude of waiting upon God.\n\nThis is what distinguishes the true child of God from the mere professor of religion. The nominal Christian goes to God occasionally; the true believer lives in continual dependence upon Him. The one visits God; the other dwells with God.\n\nHow is this continuous waiting to be maintained? It is by cultivating the habit of turning to God in every situation. Before every decision, turn to God. In every perplexity, wait upon God. In every sorrow, look to God.\n\nThis waiting becomes natural as we grow in the knowledge of God. The more we know His faithfulness, the more easily we trust. The more we experience His love, the more naturally we turn to Him.\n\nLet waiting on God be the constant disposition of your heart, and you will find a peace and power that nothing else can give.",
    verse: "Psalm 25:5",
    verseText: "Lead me in thy truth, and teach me: for thou art the God of my salvation; on thee do I wait all the day.",
    reflection: [
      "What is the difference between visiting God occasionally and dwelling with Him continually?",
      "How can you cultivate the habit of turning to God in every situation?",
      "What would change if waiting on God became the 'keynote' of your daily life?"
    ],
    prayer: "Father, I want waiting on Thee to be not an occasional exercise but the keynote of my life. Teach me to turn to Thee in every situation. Let my heart be in a continual attitude of dependence upon Thee. Amen."
  }
];

// Andrew Murray's "Humility" (Public Domain, 1895)
const humilityLessons: StudyLesson[] = [
  {
    id: 1,
    title: "Chapter 1: Humility—The Glory of the Creature",
    content: "Humility is the root of every grace and virtue. Without it, there can be no true religion. Pride was the sin of angels; pride was the sin of our first parents; pride is the very essence of sin.\n\nWhen we look at the Son of God, who humbled Himself and became obedient unto death, we see what true humility looks like. Though He was equal with God, He did not grasp at that equality, but emptied Himself, taking the form of a servant.\n\nHumility is not thinking meanly of ourselves; it is not thinking of ourselves at all. It is the blessed absence of self-consciousness that comes when we are wholly occupied with God and others.\n\nThe humble soul does not claim merit for itself; it acknowledges that all good comes from God. It does not seek recognition; it is content to be hidden and forgotten if God is glorified.\n\nHumility is the blossom of which heaven is the fruit. It is the pathway Jesus walked, and it is the only pathway that leads to true exaltation.",
    verse: "Philippians 2:5-7",
    verseText: "Let this mind be in you, which was also in Christ Jesus: Who, being in the form of God, thought it not robbery to be equal with God: But made himself of no reputation, and took upon him the form of a servant, and was made in the likeness of men.",
    reflection: [
      "Why is pride considered the very essence of sin?",
      "How does Jesus' example redefine our understanding of true humility?",
      "What would it look like to have the 'blessed absence of self-consciousness'?"
    ],
    prayer: "Lord Jesus, let the mind that was in Thee be also in me. Teach me the true humility that empties self and is wholly occupied with the Father and others. Help me to walk the pathway of humility that leads to true glory. Amen."
  },
  {
    id: 2,
    title: "Chapter 2: Humility in the Life of Jesus",
    content: "In the life of Jesus we have the perfect manifestation of what humility is. He is the one perfect example of humility. Not only in His death, but in every moment of His life, He displayed the beauty of a humble heart.\n\n'I came down from heaven, not to do mine own will, but the will of him that sent me.' Here is the essence of humility—the complete surrender of self-will to the will of the Father.\n\n'I can of mine own self do nothing.' Jesus, the mighty Son of God, lived in continual dependence upon the Father. He did not act independently; He waited for the Father's leading in all things.\n\n'I seek not mine own glory.' Jesus was utterly free from the desire for human approval or recognition. His one aim was that the Father might be glorified.\n\nThis is the humility we are called to imitate. Not a humility we can manufacture by effort, but one that flows from a life hidden with Christ in God.",
    verse: "John 5:30",
    verseText: "I can of mine own self do nothing: as I hear, I judge: and my judgment is just; because I seek not mine own will, but the will of the Father which hath sent me.",
    reflection: [
      "How did Jesus demonstrate humility in His relationship with the Father?",
      "What does it mean to seek not our own glory?",
      "How can we cultivate a life of dependence upon God like Jesus modeled?"
    ],
    prayer: "Father, I want to follow Jesus in the path of humility. Teach me to surrender my will to Thine, to depend upon Thee for everything, and to seek Thy glory rather than my own. Let Christ's humility be formed in me. Amen."
  }
];

// Map study IDs to their lesson sets
const studyLessonsMap: Record<string, StudyLesson[]> = {
  "abide-in-christ": abideInChristLessons,
  "morning-and-evening": morningAndEveningLessons,
  "power-through-prayer": powerThroughPrayerLessons,
  "all-of-grace": allOfGraceLessons,
  "waiting-on-god": waitingOnGodLessons,
  "humility": humilityLessons
};

// Helper function to get lessons for a specific study
const getLessonsForStudy = (studyId: string): StudyLesson[] => {
  return studyLessonsMap[studyId] || abideInChristLessons;
};

export default function BibleStudiesPage({ currentUserId, language = "en", onNavigate }: BibleStudyProps) {
  const t = useTranslations(language);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(t.allCategory);
  const [selectedStudy, setSelectedStudy] = useState<BibleStudy | null>(null);
  const [showStudyDetail, setShowStudyDetail] = useState(false);
  const [showStudyLesson, setShowStudyLesson] = useState(false);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  const categories = [t.allCategory, t.discipleship, t.encouragement, t.character, t.prayer, t.prophecy, t.love];

  const filteredStudies = sampleStudies.filter(study => {
    const matchesSearch = study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         study.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         study.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === t.allCategory || study.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredStudy = filteredStudies.find(study => study.featured);
  const otherStudies = filteredStudies.filter(study => !study.featured);

  const getDifficultyLevel = (difficulty: string) => {
    if (difficulty === "Beginner") return t.beginner;
    if (difficulty === "Intermediate") return t.intermediate;
    if (difficulty === "Advanced") return t.advanced;
    return difficulty;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "Advanced": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-background dark:to-muted/20">
      {/* Header */}
      <div className="bg-white dark:bg-background px-4 py-6 border-b border-gray-100 dark:border-border ios-safe-top shadow-sm">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate?.('home')}
            className="mr-3 h-11 w-11 bg-amber-100/80 dark:bg-amber-900/50 hover:bg-amber-200 dark:hover:bg-amber-800 shadow-lg hover:shadow-xl transition-all duration-300 rounded-full"
            data-testid="button-back-bible-studies"
            aria-label="Go back to Home page"
          >
            <ArrowLeft className="w-5 h-5 text-amber-700 dark:text-amber-300" />
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold text-amber-800 dark:text-amber-300" style={{ 
              fontFamily: 'Dancing Script, Brush Script MT, cursive'
            }}>
              {t.bibleStudiesTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">{t.bibleStudiesSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Featured Articles Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground">{t.featuredStudies}</h2>
          <Button 
            variant="ghost" 
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            onClick={() => {
              setSelectedCategory(t.allCategory);
              setSearchQuery("");
              document.getElementById("studies-grid")?.scrollIntoView({ behavior: "smooth" });
            }}
            data-testid="button-browse-all-studies"
          >
            {t.browseAllStudies}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder={t.searchBibleStudies}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-studies"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    data-testid={`button-category-${category.toLowerCase()}`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Study */}
        {featuredStudy && (
          <Card className="shadow-lg border-0 overflow-hidden hover-elevate transition-all duration-300 cursor-pointer" data-testid={`featured-study-${featuredStudy.id}`}>
            <div className="md:flex">
              <div className="md:w-1/3 h-64 md:h-auto bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 flex items-center justify-center relative">
                <div className="text-center p-8">
                  <BookOpen className="w-16 h-16 text-amber-600 dark:text-amber-400 mx-auto mb-4" />
                  <Badge className="bg-amber-600 text-white">{t.featured}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Star className="w-6 h-6 text-amber-500 fill-current" />
                </div>
              </div>
              <div className="md:w-2/3 p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary" className={getDifficultyColor(featuredStudy.difficulty)}>
                    {getDifficultyLevel(featuredStudy.difficulty)}
                  </Badge>
                  <Badge variant="outline">{featuredStudy.category}</Badge>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-2">
                  {featuredStudy.title}
                </h3>
                
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-3 uppercase tracking-wide">
                  {featuredStudy.author}
                </p>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {featuredStudy.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredStudy.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {featuredStudy.lessons} {t.lessons}
                  </div>
                </div>
                
                <Button 
                  className="bg-amber-600 hover:bg-amber-700 text-white" 
                  onClick={() => {
                    setSelectedStudy(featuredStudy);
                    setShowStudyDetail(true);
                  }}
                  data-testid={`button-start-study-${featuredStudy.id}`}
                >
                  {t.startStudy}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Other Studies Grid */}
        {otherStudies.length > 0 && (
          <div id="studies-grid">
            <h3 className="text-xl font-bold text-gray-900 dark:text-foreground mb-6">{t.moreStudies}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherStudies.map((study) => (
                <Card 
                  key={study.id} 
                  className="shadow-md hover-elevate transition-all duration-300 cursor-pointer" 
                  onClick={() => {
                    setSelectedStudy(study);
                    setShowStudyDetail(true);
                  }}
                  data-testid={`study-card-${study.id}`}
                >
                  <div className="h-40 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary" className={getDifficultyColor(study.difficulty)}>
                        {getDifficultyLevel(study.difficulty)}
                      </Badge>
                      <Badge variant="outline">{study.category}</Badge>
                    </div>
                    
                    <h4 className="font-bold text-gray-900 dark:text-foreground mb-2">
                      {study.title}
                    </h4>
                    
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2 uppercase tracking-wide">
                      {study.author}
                    </p>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                      {study.description}
                    </p>
                    
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {study.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {study.lessons}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      variant="outline" 
                      onClick={() => {
                        setSelectedStudy(study);
                        setShowStudyDetail(true);
                      }}
                      data-testid={`button-view-study-${study.id}`}
                    >
                      {t.viewStudy}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredStudies.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">{t.noStudiesFound}</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {t.adjustSearchTerms}
            </p>
          </div>
        )}
      </div>

      {/* Study Detail Modal */}
      <Dialog open={showStudyDetail} onOpenChange={setShowStudyDetail}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedStudy && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <DialogTitle className="text-xl font-bold">{selectedStudy.title}</DialogTitle>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium uppercase tracking-wide">
                      {selectedStudy.author}
                    </p>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className={getDifficultyColor(selectedStudy.difficulty)}>
                    {getDifficultyLevel(selectedStudy.difficulty)}
                  </Badge>
                  <Badge variant="outline">{selectedStudy.category}</Badge>
                </div>
                
                <DialogDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {selectedStudy.description}
                </DialogDescription>
                
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{selectedStudy.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{selectedStudy.lessons} {t.lessons}</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">{t.whatYouLearn}</h4>
                  <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                    <li>• {t.deepBiblicalInsights}</li>
                    <li>• {t.guidedReflectionQuestions}</li>
                    <li>• {t.scriptureMemorization}</li>
                    <li>• {t.communityDiscussionPoints}</li>
                  </ul>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                    onClick={() => {
                      setShowStudyDetail(false);
                      setCurrentLessonIndex(0);
                      setShowStudyLesson(true);
                      console.log(`Starting study: ${selectedStudy.title}`);
                    }}
                    data-testid={`button-start-study-detail-${selectedStudy.id}`}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {t.startStudy}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowStudyDetail(false)}
                    data-testid="button-close-study-detail"
                  >
                    {t.close}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Study Lesson Modal */}
      <Dialog open={showStudyLesson} onOpenChange={setShowStudyLesson}>
        <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto">
          {selectedStudy && (() => {
            const studyLessons = getLessonsForStudy(selectedStudy.id);
            const currentLesson = studyLessons[currentLessonIndex];
            if (!currentLesson) return null;
            
            return (
              <>
                <DialogHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowStudyLesson(false)}
                        data-testid="button-close-lesson"
                        className="h-11 w-11 bg-accent/50 dark:bg-accent/30 hover:bg-accent dark:hover:bg-accent shadow-md hover:shadow-lg transition-all duration-300 rounded-full"
                        aria-label="Close lesson"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </Button>
                      <div>
                        <DialogTitle className="text-xl font-bold">{selectedStudy.title}</DialogTitle>
                        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                          {t.lessonOf} {currentLessonIndex + 1} / {studyLessons.length} (Sample Preview)
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {t.day} {currentLessonIndex + 1}
                    </Badge>
                  </div>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* Lesson Title */}
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground">
                      {currentLesson.title}
                    </h2>
                  </div>

                  {/* Main Content */}
                  <div className="prose prose-lg max-w-none dark:prose-invert">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {currentLesson.content}
                    </p>
                  </div>

                  {/* Bible Verse */}
                  <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                    <CardContent className="p-6">
                      <div className="text-center space-y-3">
                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                          {t.todaysScripture}
                        </h3>
                        <div className="bg-white dark:bg-blue-950/50 rounded-lg p-4">
                          <p className="text-blue-800 dark:text-blue-200 italic leading-relaxed mb-3">
                            "{currentLesson.verseText}"
                          </p>
                          <p className="text-blue-600 dark:text-blue-300 font-medium">
                            — {currentLesson.verse}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Reflection Questions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-900 dark:text-foreground">
                        {t.reflectionQuestions}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {currentLesson.reflection.map((question, idx) => (
                          <li key={idx} className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full flex items-center justify-center text-sm font-medium">
                              {idx + 1}
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">{question}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Prayer */}
                  <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                    <CardHeader>
                      <CardTitle className="text-lg text-green-900 dark:text-green-100">
                        {t.todaysPrayer}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-green-800 dark:text-green-200 italic leading-relaxed">
                        {currentLesson.prayer}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Navigation */}
                  <div className="flex justify-between items-center pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentLessonIndex(Math.max(0, currentLessonIndex - 1))}
                      disabled={currentLessonIndex === 0}
                      data-testid="button-previous-lesson"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      {t.previousLesson}
                    </Button>
                    
                    <div className="text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Preview: {currentLessonIndex + 1} / {studyLessons.length}
                      </p>
                      <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
                        <div 
                          className="h-2 bg-amber-600 rounded-full transition-all duration-300"
                          style={{ width: `${((currentLessonIndex + 1) / studyLessons.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        if (currentLessonIndex < studyLessons.length - 1) {
                          setCurrentLessonIndex(currentLessonIndex + 1);
                        } else {
                          // Study completed
                          setShowStudyLesson(false);
                          alert(t.lessonCompleted + " " + t.greatProgress);
                        }
                      }}
                      data-testid="button-next-lesson"
                    >
                      {currentLessonIndex < studyLessons.length - 1 ? t.nextLesson : t.completeLesson}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}