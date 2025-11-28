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

// Traditional Bible Studies - Public Domain Christian Classics
const sampleStudies: BibleStudy[] = [
  // ANDREW MURRAY STUDIES
  {
    id: "abide-in-christ",
    title: "Abide in Christ (Preview)",
    author: "Andrew Murray",
    description: "Experience 5 sample chapters from this classic 31-day devotional exploring what it means to have continuous, intimate fellowship with Christ. Based on John 15, Murray teaches that abiding in Jesus is not a work we do, but a yielding to let Him do all for us.",
    category: "Discipleship",
    duration: "5 sample chapters",
    difficulty: "Beginner",
    lessons: 5,
    featured: true
  },
  {
    id: "waiting-on-god",
    title: "Waiting on God (Preview)",
    author: "Andrew Murray",
    description: "Sample 2 meditations from Murray's 31-day journey into the art of waiting upon God in prayer. Murray shows how waiting on God is not passive, but the highest form of active faith.",
    category: "Prayer",
    duration: "2 sample meditations",
    difficulty: "Intermediate",
    lessons: 2
  },
  {
    id: "humility",
    title: "Humility: The Beauty of Holiness (Preview)",
    author: "Andrew Murray",
    description: "Sample 2 chapters from Murray's profound study on humility as the root of every grace and virtue. 'Humility is the blossom of which heaven is the fruit.'",
    category: "Character",
    duration: "2 sample chapters",
    difficulty: "Intermediate",
    lessons: 2
  },
  {
    id: "absolute-surrender",
    title: "Absolute Surrender (Preview)",
    author: "Andrew Murray",
    description: "Sample 3 addresses from Murray's powerful call to complete consecration to God. 'God is ready to assume full responsibility for the life wholly yielded to Him.'",
    category: "Discipleship",
    duration: "3 sample chapters",
    difficulty: "Intermediate",
    lessons: 3
  },
  {
    id: "with-christ-school-of-prayer",
    title: "With Christ in the School of Prayer (Preview)",
    author: "Andrew Murray",
    description: "Sample 3 lessons from Murray's comprehensive guide to prayer. Learn from Jesus Himself as the Master Teacher reveals the secrets of effective intercession.",
    category: "Prayer",
    duration: "3 sample lessons",
    difficulty: "Beginner",
    lessons: 3
  },
  // CHARLES SPURGEON STUDIES
  {
    id: "morning-and-evening",
    title: "Morning and Evening (Preview)",
    author: "Charles H. Spurgeon",
    description: "Sample 5 readings from Spurgeon's beloved devotional. The 'Prince of Preachers' wrote 732 daily readings to help believers begin and end each day with Scripture and reflection.",
    category: "Encouragement",
    duration: "5 sample readings",
    difficulty: "Beginner",
    lessons: 5
  },
  {
    id: "all-of-grace",
    title: "All of Grace (Preview)",
    author: "Charles H. Spurgeon",
    description: "Experience 5 chapters from Spurgeon's most beloved evangelistic work, written to explain the gospel in simple, compelling terms.",
    category: "Discipleship",
    duration: "5 sample chapters",
    difficulty: "Beginner",
    lessons: 5
  },
  {
    id: "treasury-of-david",
    title: "Treasury of David: Psalms (Preview)",
    author: "Charles H. Spurgeon",
    description: "Sample 3 expositions from Spurgeon's monumental 7-volume commentary on the Psalms. Rich devotional insight into the songs of Israel.",
    category: "Encouragement",
    duration: "3 sample Psalms",
    difficulty: "Intermediate",
    lessons: 3
  },
  // E.M. BOUNDS STUDIES
  {
    id: "power-through-prayer",
    title: "Power Through Prayer (Preview)",
    author: "E.M. Bounds",
    description: "Preview 5 chapters from this 20-chapter masterwork on prayer. 'The Church is looking for better methods; God is looking for better men.'",
    category: "Prayer",
    duration: "5 sample chapters",
    difficulty: "Intermediate",
    lessons: 5
  },
  {
    id: "purpose-in-prayer",
    title: "Purpose in Prayer (Preview)",
    author: "E.M. Bounds",
    description: "Sample 3 chapters exploring how prayer moves the arm of God. Bounds shows that purposeful, persistent prayer accomplishes what nothing else can.",
    category: "Prayer",
    duration: "3 sample chapters",
    difficulty: "Intermediate",
    lessons: 3
  },
  {
    id: "weapon-of-prayer",
    title: "The Weapon of Prayer (Preview)",
    author: "E.M. Bounds",
    description: "Sample 3 chapters on prayer as spiritual warfare. Learn to wield prayer as the mighty weapon God designed it to be.",
    category: "Prayer",
    duration: "3 sample chapters",
    difficulty: "Advanced",
    lessons: 3
  },
  // CLASSIC DEVOTIONAL AUTHORS
  {
    id: "imitation-of-christ",
    title: "The Imitation of Christ (Preview)",
    author: "Thomas à Kempis",
    description: "Sample 3 meditations from the most widely read Christian devotional book after the Bible. Written in the 15th century, its wisdom remains timeless.",
    category: "Discipleship",
    duration: "3 sample meditations",
    difficulty: "Intermediate",
    lessons: 3
  },
  {
    id: "practice-presence-of-god",
    title: "The Practice of the Presence of God (Preview)",
    author: "Brother Lawrence",
    description: "Sample 3 conversations and letters from this beloved classic. A humble monastery cook shares how to experience God's presence in every moment.",
    category: "Discipleship",
    duration: "3 sample readings",
    difficulty: "Beginner",
    lessons: 3
  },
  {
    id: "pilgrims-progress",
    title: "The Pilgrim's Progress (Preview)",
    author: "John Bunyan",
    description: "Sample 3 stages from the greatest Christian allegory ever written. Journey with Christian from the City of Destruction to the Celestial City.",
    category: "Discipleship",
    duration: "3 sample stages",
    difficulty: "Beginner",
    lessons: 3
  },
  // HANNAH WHITALL SMITH
  {
    id: "christians-secret-happy-life",
    title: "The Christian's Secret of a Happy Life (Preview)",
    author: "Hannah Whitall Smith",
    description: "Sample 3 chapters from this classic guide to victorious Christian living. Discover the secret of resting in God's keeping power.",
    category: "Encouragement",
    duration: "3 sample chapters",
    difficulty: "Beginner",
    lessons: 3
  },
  // GEORGE MÜLLER
  {
    id: "answers-to-prayer",
    title: "Answers to Prayer (Preview)",
    author: "George Müller",
    description: "Sample 3 testimonies from Müller's remarkable life of faith. He cared for 10,000 orphans without ever asking for money—only praying.",
    category: "Prayer",
    duration: "3 sample testimonies",
    difficulty: "Beginner",
    lessons: 3
  },
  // R.A. TORREY
  {
    id: "how-to-pray",
    title: "How to Pray (Preview)",
    author: "R.A. Torrey",
    description: "Sample 3 chapters of practical instruction on prayer from the great evangelist and Bible teacher. Clear, powerful teaching on effective prayer.",
    category: "Prayer",
    duration: "3 sample chapters",
    difficulty: "Beginner",
    lessons: 3
  },
  // HUDSON TAYLOR
  {
    id: "union-and-communion",
    title: "Union and Communion (Preview)",
    author: "Hudson Taylor",
    description: "Sample 3 meditations on the Song of Solomon from the pioneer missionary to China. Discover the intimate relationship Christ desires with His bride.",
    category: "Discipleship",
    duration: "3 sample meditations",
    difficulty: "Intermediate",
    lessons: 3
  },
  // OSWALD CHAMBERS
  {
    id: "my-utmost-for-his-highest",
    title: "My Utmost for His Highest (Preview)",
    author: "Oswald Chambers",
    description: "Sample 5 daily readings from the most popular devotional of the 20th century. Challenging, inspiring insights that have touched millions.",
    category: "Discipleship",
    duration: "5 sample readings",
    difficulty: "Intermediate",
    lessons: 5,
    featured: true
  },
  // A.W. PINK
  {
    id: "attributes-of-god",
    title: "The Attributes of God (Preview)",
    author: "A.W. Pink",
    description: "Sample 3 chapters exploring the nature and character of God. A profound study of who God is and what that means for believers.",
    category: "Character",
    duration: "3 sample chapters",
    difficulty: "Advanced",
    lessons: 3
  },
  // FENELON
  {
    id: "christian-counsel",
    title: "Christian Counsel (Preview)",
    author: "François Fénelon",
    description: "Sample 3 letters of spiritual direction from the beloved French archbishop. Gentle, wise guidance for the soul seeking deeper union with God.",
    category: "Discipleship",
    duration: "3 sample letters",
    difficulty: "Intermediate",
    lessons: 3
  },
  // MADAME GUYON
  {
    id: "experiencing-depths",
    title: "Experiencing the Depths of Jesus Christ (Preview)",
    author: "Madame Guyon",
    description: "Sample 3 chapters on contemplative prayer and the interior life. A guide to moving beyond surface religion into the depths of Christ.",
    category: "Prayer",
    duration: "3 sample chapters",
    difficulty: "Advanced",
    lessons: 3
  },
  // WILLIAM LAW
  {
    id: "serious-call",
    title: "A Serious Call to a Devout and Holy Life (Preview)",
    author: "William Law",
    description: "Sample 3 chapters from the book that transformed John Wesley. A powerful summons to live every aspect of life for God's glory.",
    category: "Discipleship",
    duration: "3 sample chapters",
    difficulty: "Intermediate",
    lessons: 3
  },
  // JONATHAN EDWARDS
  {
    id: "religious-affections",
    title: "Religious Affections (Preview)",
    author: "Jonathan Edwards",
    description: "Sample 3 sections from America's greatest theologian. Distinguish true spiritual experience from mere emotion or self-deception.",
    category: "Character",
    duration: "3 sample sections",
    difficulty: "Advanced",
    lessons: 3
  },
  // D.L. MOODY
  {
    id: "way-to-god",
    title: "The Way to God (Preview)",
    author: "D.L. Moody",
    description: "Sample 3 chapters from the great evangelist. Clear, practical teaching on salvation, faith, and the Christian life.",
    category: "Discipleship",
    duration: "3 sample chapters",
    difficulty: "Beginner",
    lessons: 3
  },
  // JOHN WESLEY
  {
    id: "christian-perfection",
    title: "A Plain Account of Christian Perfection (Preview)",
    author: "John Wesley",
    description: "Sample 3 sections on growing in holiness from the founder of Methodism. What it means to love God with all your heart.",
    category: "Character",
    duration: "3 sample sections",
    difficulty: "Intermediate",
    lessons: 3
  },
  // AUGUSTINE
  {
    id: "confessions",
    title: "Confessions (Preview)",
    author: "Augustine of Hippo",
    description: "Sample 3 passages from the most influential autobiography in Christian history. A soul's journey from sin to salvation.",
    category: "Discipleship",
    duration: "3 sample passages",
    difficulty: "Intermediate",
    lessons: 3
  },
  // CHARLES FINNEY
  {
    id: "lectures-on-revival",
    title: "Lectures on Revival (Preview)",
    author: "Charles Finney",
    description: "Sample 3 lectures from the father of modern revivalism. Principles for personal and corporate spiritual awakening.",
    category: "Encouragement",
    duration: "3 sample lectures",
    difficulty: "Intermediate",
    lessons: 3
  },
  // JOHN NEWTON
  {
    id: "letters-of-newton",
    title: "Letters of John Newton (Preview)",
    author: "John Newton",
    description: "Sample 3 letters from the author of 'Amazing Grace.' Pastoral wisdom from a former slave trader transformed by Christ.",
    category: "Encouragement",
    duration: "3 sample letters",
    difficulty: "Beginner",
    lessons: 3
  },
  // SAMUEL RUTHERFORD
  {
    id: "letters-of-rutherford",
    title: "Letters of Samuel Rutherford (Preview)",
    author: "Samuel Rutherford",
    description: "Sample 3 letters from the Scottish pastor whose correspondence became a devotional classic. Written from prison, full of Christ's love.",
    category: "Encouragement",
    duration: "3 sample letters",
    difficulty: "Intermediate",
    lessons: 3
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

// Andrew Murray's "Absolute Surrender" (Public Domain, 1895)
const absoluteSurrenderLessons: StudyLesson[] = [
  {
    id: 1,
    title: "Address 1: Absolute Surrender",
    content: "What God Demands: Absolute Surrender. God is worthy of absolute surrender. When Jesus died on the cross, He gave everything. When He calls us to follow Him, He asks for everything in return.\n\nWhat is absolute surrender? It is yielding our whole being to God—every thought, every desire, every plan, every relationship. It is saying to God, 'I am Thine—wholly Thine. Do with me as Thou wilt.'\n\nMany Christians live defeated lives because they have never made an unconditional surrender to God. They give Him part of their lives, but hold back areas they are not willing to yield.\n\nGod cannot fill what is not empty. He cannot use what is not surrendered. He cannot bless what is not given. The blessing of the Lord comes only upon a life that is wholly His.\n\n'God is ready to assume full responsibility for the life wholly yielded to Him.' What a promise! What comfort for the surrendered soul!",
    verse: "Romans 12:1",
    verseText: "I beseech you therefore, brethren, by the mercies of God, that ye present your bodies a living sacrifice, holy, acceptable unto God, which is your reasonable service.",
    reflection: [
      "What areas of your life have you been holding back from God?",
      "What does it mean that God is ready to 'assume full responsibility' for your life?",
      "Why is partial surrender actually no surrender at all?"
    ],
    prayer: "Lord, I surrender absolutely to Thee. Take my life and let it be wholly Thine. I hold nothing back. Assume full responsibility for this life that is now fully yielded to Thee. Amen."
  },
  {
    id: 2,
    title: "Address 2: The Fruit of the Spirit",
    content: "The fruit of the Spirit is not produced by our effort, but by our abiding. As a branch bears fruit not by straining but by remaining connected to the vine, so we bear spiritual fruit by remaining surrendered to Christ.\n\nLove, joy, peace, longsuffering, gentleness, goodness, faith, meekness, temperance—these are not virtues we must manufacture. They are the natural overflow of a life filled with the Spirit.\n\nThe great mistake of many Christians is trying to produce the fruit while neglecting the root. They work at being patient, at being loving, at being joyful—but they do not cultivate the inner life of surrender that alone can produce these graces.\n\nSurrender is the secret. When we yield ourselves completely to God, His Spirit flows through us, and the fruit appears naturally. It is His life in us that produces His fruit through us.\n\nDo not try to imitate the fruit—seek the root. Do not strive for love—surrender to the One who is love.",
    verse: "Galatians 5:22-23",
    verseText: "But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, meekness, temperance: against such there is no law.",
    reflection: [
      "Have you been trying to produce fruit through effort rather than through surrender?",
      "What is the difference between imitating the fruit and having the root?",
      "How does surrender relate to the fruit of the Spirit in your daily life?"
    ],
    prayer: "Holy Spirit, I surrender to Thy working in my life. I cease striving to produce fruit and simply yield to Thee. Let Thy life flow through me and produce Thy fruit. Amen."
  },
  {
    id: 3,
    title: "Address 3: Kept by the Power of God",
    content: "One of the greatest hindrances to absolute surrender is the fear that we cannot maintain it. We have tried before and failed. How can we be sure we will not fail again?\n\nThe answer is this: We are not kept by our own power but by the power of God. 'Kept by the power of God through faith unto salvation.' It is not our faithfulness that keeps us, but His.\n\nOur part is to trust; God's part is to keep. Our part is to surrender; God's part is to preserve what is surrendered. When we commit ourselves to Him, He takes responsibility for keeping us.\n\nThis is the secret of the victorious life—not our holding on to God, but His holding on to us. Not our grip on Him, but His grip on us. We are safe not because of our strength but because of His.\n\nSurrender your life to God and trust Him to keep what you have committed to Him. He is faithful who promised, and He will do it.",
    verse: "1 Peter 1:5",
    verseText: "Who are kept by the power of God through faith unto salvation ready to be revealed in the last time.",
    reflection: [
      "What fears have prevented you from making an absolute surrender to God?",
      "How does knowing you are kept by God's power change your approach to Christian living?",
      "What does it mean practically to trust God to keep what you commit to Him?"
    ],
    prayer: "Father, I commit myself to Thee. I trust not in my own ability to stay surrendered, but in Thy power to keep me. Keep that which I have committed unto Thee. I rest in Thy keeping power. Amen."
  }
];

// Andrew Murray's "With Christ in the School of Prayer" (Public Domain, 1895)
const withChristSchoolOfPrayerLessons: StudyLesson[] = [
  {
    id: 1,
    title: "Lesson 1: The Only Teacher",
    content: "Lord, teach us to pray.' This request of the disciples shows us that prayer is not natural—it must be taught. And who better to teach us than Jesus Himself, the Master of prayer?\n\nJesus' whole life was a life of prayer. He prayed at His baptism, before choosing His disciples, before feeding the multitudes, in Gethsemane, on the cross. He knew the Father's heart as no one else did.\n\nThe disciples saw something in Jesus' prayer that they lacked in their own. They observed the power, the peace, the intimacy with the Father. And they said, 'Teach us.'\n\nThis must be our prayer too. Not 'teach us a method' but 'teach us to pray.' Not techniques but a relationship. Not formulas but fellowship with the Father.\n\nJesus is willing to teach us. He invites us to sit at His feet in the school of prayer. Let us come as learners, humble and eager, ready to be taught by the Master.",
    verse: "Luke 11:1",
    verseText: "And it came to pass, that, as he was praying in a certain place, when he ceased, one of his disciples said unto him, Lord, teach us to pray, as John also taught his disciples.",
    reflection: [
      "Have you truly asked Jesus to teach you to pray?",
      "What drew the disciples to want to pray like Jesus?",
      "What is the difference between learning prayer techniques and being taught by Christ?"
    ],
    prayer: "Lord Jesus, teach me to pray. I come to Thee as a learner in Thy school of prayer. I do not want mere methods—I want fellowship with the Father such as Thou hadst. Teach me, Master. Amen."
  },
  {
    id: 2,
    title: "Lesson 2: In Spirit and Truth",
    content: "God is a Spirit: and they that worship him must worship him in spirit and in truth.' True prayer is not a matter of words or postures—it is a matter of spirit. It is the inner man reaching out to the Father.\n\nTo pray in spirit means to pray from the heart, not merely from the lips. It means to pray in the power of the Holy Spirit who dwells within us and helps our infirmities.\n\nTo pray in truth means to pray sincerely, without pretense. It means to come to God as we really are, not wearing masks or playing roles. God sees the heart; we cannot deceive Him.\n\nMany prayers never rise higher than the ceiling because they are prayers of the lips only. The words are there, but the heart is far away. Such prayers are form without power.\n\nLet us learn to pray in spirit and in truth—from the depths of our being, in the power of the Spirit, with complete sincerity before God.",
    verse: "John 4:24",
    verseText: "God is a Spirit: and they that worship him must worship him in spirit and in truth.",
    reflection: [
      "What is the difference between praying from the lips and praying from the heart?",
      "How does the Holy Spirit help us in our prayers?",
      "What does it mean to pray 'in truth'—without pretense before God?"
    ],
    prayer: "Father, I would worship Thee in spirit and in truth. Help me to pray from my heart, not merely my lips. Let the Holy Spirit guide my prayers. I come to Thee in sincerity, hiding nothing. Amen."
  },
  {
    id: 3,
    title: "Lesson 3: Ask, and It Shall Be Given",
    content: "Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you.' These are among the most wonderful and yet most neglected words of Jesus.\n\nNotice the ascending intensity: asking, seeking, knocking. Sometimes asking is enough. But when the answer does not come immediately, we are to seek more diligently. And when seeking does not prevail, we are to knock—to persist with holy importunity.\n\nThe promise is absolute: 'It shall be given.' 'Ye shall find.' 'It shall be opened.' Not maybe. Not perhaps. Shall. Jesus pledges His word.\n\nWhy then do our prayers so often seem unanswered? Perhaps because we ask amiss. Perhaps because we give up too soon. Perhaps because we do not really believe.\n\nLet us take Jesus at His word. Let us ask in faith, seek with persistence, and knock with holy determination. The Father delights to give good things to those who ask Him.",
    verse: "Matthew 7:7-8",
    verseText: "Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you: For every one that asketh receiveth; and he that seeketh findeth; and to him that knocketh it shall be opened.",
    reflection: [
      "What is the difference between asking, seeking, and knocking?",
      "Why do you think Jesus emphasized persistence in prayer?",
      "What prevents you from taking Jesus at His word regarding answered prayer?"
    ],
    prayer: "Lord, I take Thee at Thy word. I ask, believing I shall receive. I seek, knowing I shall find. I knock, trusting the door will open. Increase my faith to pray with holy persistence. Amen."
  }
];

// Spurgeon's "Treasury of David" (Public Domain, 1869-1885)
const treasuryOfDavidLessons: StudyLesson[] = [
  {
    id: 1,
    title: "Psalm 1: The Way of the Blessed",
    content: "Blessed is the man that walketh not in the counsel of the ungodly.' The first Psalm stands as a preface to the entire Psalter, setting before us the two ways—the way of the righteous and the way of the ungodly.\n\nNotice the progression of evil: walking, standing, sitting. Sin begins with a single step in the wrong direction, advances to lingering in the way of sinners, and ends in settling down among the scornful.\n\nBut the blessed man is not merely negative—avoiding evil. He delights in the law of the Lord. His meditation is positive, constant, day and night. He does not read Scripture as a duty but as a delight.\n\nSuch a man is like a tree—not a wild tree in the desert, but a planted tree by rivers of water. He is established, nourished, fruitful. His leaf does not wither. Whatsoever he doeth shall prosper.\n\nWhich way are you walking? There is no middle road. You are either planted by the waters or blown about like chaff.",
    verse: "Psalm 1:1-3",
    verseText: "Blessed is the man that walketh not in the counsel of the ungodly, nor standeth in the way of sinners, nor sitteth in the seat of the scornful. But his delight is in the law of the LORD; and in his law doth he meditate day and night. And he shall be like a tree planted by the rivers of water.",
    reflection: [
      "What is the progression of evil described in this Psalm?",
      "What does it mean to 'delight' in God's Word rather than merely read it?",
      "How does the image of a tree by rivers of water describe the blessed life?"
    ],
    prayer: "Lord, let me be like that tree planted by the waters. May I delight in Thy Word and meditate on it continually. Keep me from the way of the ungodly and establish me in the path of righteousness. Amen."
  },
  {
    id: 2,
    title: "Psalm 23: The Shepherd Psalm",
    content: "The Lord is my shepherd; I shall not want.' This most beloved of all Psalms has comforted countless millions through the ages. It breathes the spirit of quiet confidence in God's care.\n\n'The Lord is MY shepherd'—not a shepherd, not the shepherd of Israel, but MY shepherd. This is personal, intimate, possessive. Do you know God in this personal way?\n\nBecause the Lord is our shepherd, we shall not want. Not we 'may not want' or 'should not want,' but shall not want. The good Shepherd provides everything His sheep need.\n\nGreen pastures for rest and nourishment. Still waters for refreshment. Right paths for guidance. Comfort in the valley of death's shadow. A table prepared in the presence of enemies. An overflowing cup. Goodness and mercy following all our days.\n\nThe Psalm ends where every believer longs to be: 'I will dwell in the house of the Lord forever.' From pastures to palace, from wilderness to worship—the Shepherd leads us home.",
    verse: "Psalm 23:1-4",
    verseText: "The LORD is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake. Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me.",
    reflection: [
      "Can you say 'The Lord is MY shepherd' with full assurance?",
      "What does it mean that you 'shall not want'?",
      "How does knowing the Shepherd is with you change your experience of dark valleys?"
    ],
    prayer: "Lord, Thou art my Shepherd. I trust Thee to lead me in green pastures and beside still waters. When I walk through dark valleys, I will fear no evil, for Thou art with me. Amen."
  },
  {
    id: 3,
    title: "Psalm 51: The Prayer of the Penitent",
    content: "Have mercy upon me, O God, according to thy lovingkindness.' This is the prayer of David after his great sin with Bathsheba. It is the most deeply penitential of all the Psalms.\n\nNotice that David does not make excuses. He does not minimize his sin or blame his circumstances. He acknowledges his transgression and confesses that he has sinned against God.\n\n'Against thee, thee only, have I sinned.' All sin is ultimately against God. David had wronged Bathsheba, murdered Uriah, and brought reproach upon the nation—yet the deepest offense was against God Himself.\n\nWhat does the penitent seek? Not merely forgiveness but cleansing. Not merely pardon but purity. 'Create in me a clean heart, O God.' He wants the stain removed, the pollution washed away.\n\nThis is the prayer for all who have sinned—and that is all of us. Come to God as David came: honestly, humbly, pleading for mercy based not on your merit but on His lovingkindness.",
    verse: "Psalm 51:1-2, 10",
    verseText: "Have mercy upon me, O God, according to thy lovingkindness: according unto the multitude of thy tender mercies blot out my transgressions. Wash me throughly from mine iniquity, and cleanse me from my sin... Create in me a clean heart, O God; and renew a right spirit within me.",
    reflection: [
      "Why is it so important to acknowledge our sin without excuses?",
      "What does it mean that all sin is ultimately against God?",
      "What is the difference between seeking forgiveness and seeking cleansing?"
    ],
    prayer: "Have mercy upon me, O God, according to Thy lovingkindness. I confess my sin—I make no excuses. Wash me thoroughly and create in me a clean heart. Renew a right spirit within me. Amen."
  }
];

// E.M. Bounds' "Purpose in Prayer" (Public Domain, 1920)
const purposeInPrayerLessons: StudyLesson[] = [
  {
    id: 1,
    title: "Chapter 1: Prayer and the Promises",
    content: "God's promises are the foundation of prayer. They are the checks which faith presents at the bank of heaven. They are the encouragements which embolden us to come to the throne of grace.\n\nWithout the promises, prayer would be presumption. Who would dare to ask God for anything unless He had first promised to give? But with the promises, prayer becomes confidence, assurance, certainty.\n\n'Whatsoever ye shall ask in my name, that will I do.' 'If ye shall ask anything in my name, I will do it.' 'Ask, and it shall be given you.' These are not idle words. They are pledges from the throne.\n\nThe problem is not that God's promises fail, but that we fail to claim them. We read them, we admire them, we even memorize them—but we do not take them to God and ask Him to fulfill them.\n\nPrayer with purpose lays hold of the promises. It reminds God of what He has said. It pleads His own Word back to Him. And God, who cannot lie, is bound to answer.",
    verse: "2 Peter 1:4",
    verseText: "Whereby are given unto us exceeding great and precious promises: that by these ye might be partakers of the divine nature, having escaped the corruption that is in the world through lust.",
    reflection: [
      "How do God's promises serve as the foundation for confident prayer?",
      "Why do we often fail to claim God's promises in prayer?",
      "What promise of God will you take to Him in prayer today?"
    ],
    prayer: "Father, Thy promises are exceeding great and precious. Teach me to pray according to Thy promises, to claim them by faith, and to trust Thee to fulfill Thy Word. Amen."
  },
  {
    id: 2,
    title: "Chapter 2: Prayer and Desire",
    content: "The prayer of desire moves the arm of God. Weak desires make weak prayers. Strong desires make powerful prayers. God responds to the intensity of our asking.\n\n'Ye shall seek me, and find me, when ye shall search for me with all your heart.' Not half-hearted seeking, not casual inquiry, but wholehearted pursuit. This is the prayer that prevails.\n\nMany prayers fail because they are too cold, too formal, too indifferent. We pray because we ought to, not because we want to. We go through the motions, but our hearts are elsewhere.\n\nDesire is the soul of prayer. Without desire, words are empty. With desire, even sighs and groans are eloquent before God. 'The effectual fervent prayer of a righteous man availeth much.'\n\nDo you really want what you are asking for? Are you willing to pay the price? Does your prayer rise from the depths of your being? If so, pray on—your prayer shall be answered.",
    verse: "Jeremiah 29:13",
    verseText: "And ye shall seek me, and find me, when ye shall search for me with all your heart.",
    reflection: [
      "What is the relationship between desire and effective prayer?",
      "Why do many prayers fail to prevail with God?",
      "How can you cultivate deeper desire in your prayer life?"
    ],
    prayer: "Lord, kindle in me a burning desire for the things I ask. Let my prayers rise from the depths of my heart. Give me such hunger for Thee and Thy will that I cannot help but pray with fervor. Amen."
  },
  {
    id: 3,
    title: "Chapter 3: Prayer and Faith",
    content: "Without faith it is impossible to please God. And without faith, it is impossible to pray effectively. Faith is to prayer what wings are to a bird—the means by which it rises.\n\nWhat is faith in prayer? It is believing that God hears. It is believing that God will answer. It is believing before you see, trusting before you receive.\n\n'What things soever ye desire, when ye pray, believe that ye receive them, and ye shall have them.' Not believe that you shall receive—but believe that you receive. Present tense. Now.\n\nThis is not wishful thinking. This is not positive thinking. This is faith in the faithful God who has promised. It is taking God at His word and acting upon it.\n\nFaith does not demand signs. It does not need to see in order to believe. It rests in the character of God—His power, His wisdom, His love—and says, 'Though He slay me, yet will I trust in Him.'",
    verse: "Mark 11:24",
    verseText: "Therefore I say unto you, What things soever ye desire, when ye pray, believe that ye receive them, and ye shall have them.",
    reflection: [
      "What is the difference between faith and wishful thinking?",
      "Why does Jesus tell us to believe we 'receive' (present tense) rather than 'shall receive'?",
      "How can you grow in faith as you pray?"
    ],
    prayer: "Lord, increase my faith. Help me to believe before I see, to trust before I receive. I take Thee at Thy word. I believe that when I pray according to Thy will, Thou dost hear and answer. Amen."
  }
];

// E.M. Bounds' "The Weapon of Prayer" (Public Domain, 1931)
const weaponOfPrayerLessons: StudyLesson[] = [
  {
    id: 1,
    title: "Chapter 1: Prayer—A Spiritual Weapon",
    content: "We wrestle not against flesh and blood, but against principalities, against powers.' The Christian life is a war, and prayer is our chief weapon in this spiritual battle.\n\nMany Christians fight with carnal weapons—argument, money, influence, organization. But these are powerless against spiritual foes. 'The weapons of our warfare are not carnal, but mighty through God.'\n\nPrayer is the weapon that unlocks heaven's armory. It is the means by which we lay hold of God's power. It brings supernatural resources to bear upon natural problems.\n\nThe devil fears prayer more than anything else. He will let you do almost anything—work, give, even preach—if he can keep you from praying. For he knows that prayer releases a power he cannot withstand.\n\nLearn to wield the weapon of prayer. Put on the whole armor of God and take the sword of the Spirit. Pray always with all prayer and supplication in the Spirit.",
    verse: "Ephesians 6:12, 18",
    verseText: "For we wrestle not against flesh and blood, but against principalities, against powers, against the rulers of the darkness of this world, against spiritual wickedness in high places... Praying always with all prayer and supplication in the Spirit.",
    reflection: [
      "Why are carnal weapons ineffective against spiritual enemies?",
      "How is prayer a weapon in spiritual warfare?",
      "Why does the devil particularly fear the praying Christian?"
    ],
    prayer: "Lord, teach me to wage spiritual warfare through prayer. Help me to take up the weapon You have provided. Make me a praying warrior who stands in the gap and defeats the powers of darkness. Amen."
  },
  {
    id: 2,
    title: "Chapter 2: The Power of Intercession",
    content: "Intercessory prayer is the mightiest force in the world. It moves the hand that moves the universe. Through intercession, we participate in God's work of redemption.\n\nTo intercede is to stand between—between God and those for whom we pray. It is to bear the burdens of others on our hearts. It is to plead their case before the throne of grace.\n\nAbraham interceded for Sodom. Moses interceded for Israel. Samuel interceded for his people. Paul interceded for the churches. And Jesus, our great High Priest, ever lives to make intercession for us.\n\nThis is the highest form of prayer—not praying for ourselves but for others. It is prayer that forgets self in love for others. It costs time, energy, and often tears.\n\nGod is looking for intercessors. 'I sought for a man among them, that should make up the hedge, and stand in the gap.' Will you be that man, that woman?",
    verse: "1 Timothy 2:1",
    verseText: "I exhort therefore, that, first of all, supplications, prayers, intercessions, and giving of thanks, be made for all men.",
    reflection: [
      "What does it mean to 'stand in the gap' for others?",
      "Why is intercessory prayer considered the highest form of prayer?",
      "For whom is God calling you to intercede?"
    ],
    prayer: "Father, give me a heart that prays for others. Burden me with the needs of those around me. Help me to stand in the gap and plead their cause before Thy throne. Make me an intercessor. Amen."
  },
  {
    id: 3,
    title: "Chapter 3: Prayer and Spiritual Victory",
    content: "Prayer is the path to spiritual victory. Every great advance in the kingdom of God has been preceded and accompanied by prayer. Every revival, every awakening, every transformation—all have their roots in prayer.\n\nThe early church prayed, and three thousand were converted in a day. The disciples prayed, and the place was shaken where they were assembled. Peter was in prison, and the church prayed—and an angel opened the doors.\n\nWhy do we not see such victories today? Is God's arm shortened? Has His power diminished? No! We do not have because we do not ask. We do not receive because we do not pray.\n\nSpiritual victory never comes to the prayerless. You may organize, you may strategize, you may work until you drop—but without prayer, there will be no lasting victory.\n\nDo you want to see God work mightily? Then pray mightily. Do you want spiritual victory? Then take up the weapon of prayer and fight on your knees.",
    verse: "2 Chronicles 7:14",
    verseText: "If my people, which are called by my name, shall humble themselves, and pray, and seek my face, and turn from their wicked ways; then will I hear from heaven, and will forgive their sin, and will heal their land.",
    reflection: [
      "Why has every great spiritual advance been rooted in prayer?",
      "What is the connection between prayerlessness and spiritual defeat?",
      "What spiritual victory are you seeking, and are you willing to pray for it?"
    ],
    prayer: "Lord, I want spiritual victory. I know it comes only through prayer. Teach me to pray mightily and to fight on my knees. Let me see Thy power manifested as I give myself to prayer. Amen."
  }
];

// Thomas à Kempis' "The Imitation of Christ" (Public Domain, 15th Century)
const imitationOfChristLessons: StudyLesson[] = [
  {
    id: 1,
    title: "Book 1, Chapter 1: Of the Imitation of Christ",
    content: "He that followeth me shall not walk in darkness, saith the Lord. These are the words of Christ, by which we are admonished to imitate His life and manners, if we would be truly enlightened and delivered from all blindness of heart.\n\nLet therefore our chief study be to meditate upon the life of Jesus Christ. The doctrine of Christ exceedeth all the doctrines of holy men; and he that hath His Spirit will find therein a hidden manna.\n\nBut it happeneth that many, although they often hear the gospel of Christ, are yet but little affected, because they have not the Spirit of Christ. Whosoever therefore would fully understand the words of Christ must endeavor to conform his whole life to that of Christ.\n\nWhat doth it profit thee to discourse profoundly of the Trinity, if thou be void of humility, and art thereby displeasing to the Trinity? Surely high words do not make a man holy and just; but a virtuous life maketh him dear to God.\n\nVanity of vanities, and all is vanity, except to love God and serve Him only.",
    verse: "John 8:12",
    verseText: "Then spake Jesus again unto them, saying, I am the light of the world: he that followeth me shall not walk in darkness, but shall have the light of life.",
    reflection: [
      "What does it mean to 'imitate' the life of Christ?",
      "Why is knowledge of Christ without the Spirit of Christ insufficient?",
      "How does à Kempis define true wisdom versus mere learning?"
    ],
    prayer: "Lord Jesus, I would imitate Thy life. Give me not only knowledge of Thy words but Thy Spirit to understand and live them. Conform my whole life to Thine. Amen."
  },
  {
    id: 2,
    title: "Book 2, Chapter 1: Of the Inward Life",
    content: "The kingdom of God is within you, saith the Lord. Turn thee with thy whole heart unto the Lord, and forsake this wretched world, and thy soul shall find rest.\n\nLearn to despise outward things and give thyself to things inward, and thou shalt perceive the kingdom of God to come in thee. For the kingdom of God is peace and joy in the Holy Ghost, which is not given unto the unholy.\n\nChrist will come unto thee, and show thee His own consolation, if thou prepare for Him a worthy mansion within thee. All His glory and beauty is from within, and there He delighteth Himself.\n\nThe inward man He often visiteth; and hath with him sweet discourses, pleasant solace, much peace, familiarity exceeding wonderful.\n\nO faithful soul, make ready thy heart for this Bridegroom, that He may vouchsafe to come unto thee and dwell within thee.",
    verse: "Luke 17:21",
    verseText: "Neither shall they say, Lo here! or, lo there! for, behold, the kingdom of God is within you.",
    reflection: [
      "What does it mean that the kingdom of God is 'within you'?",
      "Why is the inward life more important than outward appearances?",
      "How can you prepare your heart as a 'worthy mansion' for Christ?"
    ],
    prayer: "Lord, turn me from outward distractions to the inward life. Come and dwell within me. Make my heart a worthy mansion for Thee. Let me know Thy kingdom of peace and joy within. Amen."
  },
  {
    id: 3,
    title: "Book 3, Chapter 5: Of Self-Resignation",
    content: "Son, forsake thyself, and thou shalt find Me. Stand without choosing and without any self-seeking, and thou shalt always gain. For greater grace shall be added to thee the moment thou resignest thyself and dost not take thyself back.\n\nLord, how often shall I resign myself, and wherein shall I forsake myself?\n\nAlways; every hour: both in small matters and in great. I except nothing, but will have thee to be found stripped of all things. Otherwise, how canst thou be Mine, and I thine, unless thou be stripped of thine own will both within and without?\n\nThe sooner thou dost this, the better it shall be with thee; and the more fully and sincerely, the more thou shalt please Me, and the greater shall be thy gain.\n\nSome resign themselves, but with some exceptions; for they do not put their whole trust in God, therefore they are busy to provide for themselves. Some also at first offer all; but afterwards being assailed by temptation, they return again to that which they had left.",
    verse: "Matthew 16:24",
    verseText: "Then said Jesus unto his disciples, If any man will come after me, let him deny himself, and take up his cross, and follow me.",
    reflection: [
      "What is the difference between partial and complete self-resignation?",
      "Why does à Kempis say we must be 'stripped of all things'?",
      "What areas of your life are you still holding back from complete surrender?"
    ],
    prayer: "Lord, I resign myself wholly to Thee. Strip me of all self-seeking and self-will. Let me be Thine completely, without exception, that I may find my all in Thee. Amen."
  }
];

// Brother Lawrence's "The Practice of the Presence of God" (Public Domain, 1692)
const practicePresenceOfGodLessons: StudyLesson[] = [
  {
    id: 1,
    title: "First Conversation",
    content: "Brother Lawrence said that the most excellent method he had found of going to God was that of doing our common business without any view of pleasing men, and purely for the love of God.\n\nThat we ought not to be weary of doing little things for the love of God, who regards not the greatness of the work, but the love with which it is performed.\n\nThat in the beginning of the spiritual life, we ought to be faithful in doing our duty and denying ourselves; but after that, unspeakable pleasures follow.\n\nThat in difficulties we need only have recourse to Jesus Christ, and beg His grace, with which everything becomes easy.\n\nThat all bodily mortifications and other exercises are useless, except as they serve to arrive at the union with God by love; that he had well considered this, and found it the shortest way to go straight to Him by a continual exercise of love and doing all things for His sake.",
    verse: "Colossians 3:23",
    verseText: "And whatsoever ye do, do it heartily, as to the Lord, and not unto men.",
    reflection: [
      "How can common, everyday tasks become acts of worship?",
      "Why does God regard the love behind our work more than its greatness?",
      "What would change if you did everything purely for the love of God?"
    ],
    prayer: "Lord, let me practice Thy presence in all I do. Help me to do the smallest things with great love. Transform my common work into holy service. Let every task be an act of worship. Amen."
  },
  {
    id: 2,
    title: "Fourth Conversation",
    content: "Brother Lawrence spoke to me with great openness and told me that useless thoughts spoil all; that the mischief begins there; but that we ought to reject them as soon as we perceive their impertinence to the matter in hand, and return to our communion with God.\n\nThat at the beginning he had often passed his time appointed for prayer in rejecting wandering thoughts and falling back into them. That he could never regulate his devotion by certain methods as some do.\n\nThat all consists in one hearty renunciation of everything which we are sensible does not lead to God, that we may accustom ourselves to a continual conversation with Him.\n\nThat we need only to recognize God intimately present with us, to address ourselves to Him every moment, that we may beg His assistance for knowing His will in things doubtful, and for rightly performing those which we plainly see He requires of us.\n\nThat our sanctification did not depend upon changing our works, but in doing that for God's sake which we commonly do for our own.",
    verse: "1 Thessalonians 5:17",
    verseText: "Pray without ceasing.",
    reflection: [
      "How do we deal with wandering thoughts during prayer?",
      "What does 'continual conversation' with God look like in daily life?",
      "How can our ordinary work become sanctified by doing it for God?"
    ],
    prayer: "Father, teach me to turn to Thee in every moment. When my thoughts wander, bring me back to Thy presence. Let my whole life become a continual conversation with Thee. Amen."
  },
  {
    id: 3,
    title: "Letter 9: Walking in God's Presence",
    content: "Let us think often that our only business in this life is to please God. Perhaps all besides is but folly and vanity.\n\nYou and I have lived above forty years in religion (i.e., the religious life). Have we employed them in loving and serving God, who by His mercy has called us for that purpose? I am filled with shame and confusion when I reflect on one hand upon the great favors which God has done me, and on the other, upon the ill use I have made of them.\n\nLet us begin in earnest. Let us put aside all else. Time presses. Let us enter into ourselves. The time is short.\n\nI do not say that we should suffer much pain; no, for the love of God can sweeten sufferings. What we must do is to establish ourselves in a sense of God's presence by continually conversing with Him.\n\nThink of Him the most you can. The more one knows Him, the more one desires to know Him. And as knowledge is commonly the measure of love, the deeper and more extensive our knowledge shall be, the greater will be our love.",
    verse: "Psalm 16:11",
    verseText: "Thou wilt shew me the path of life: in thy presence is fulness of joy; at thy right hand there are pleasures for evermore.",
    reflection: [
      "If our only business is to please God, how should that change our priorities?",
      "How does knowing God more deeply increase our love for Him?",
      "What would it mean to 'enter into yourself' and begin in earnest?"
    ],
    prayer: "Lord, time is short and eternity is long. Help me to set aside all that does not matter and focus on what does—knowing Thee and loving Thee. Let me live in Thy presence continually. Amen."
  }
];

// John Bunyan's "The Pilgrim's Progress" (Public Domain, 1678)
const pilgrimsProgressLessons: StudyLesson[] = [
  {
    id: 1,
    title: "Part 1: The City of Destruction",
    content: "As I walked through the wilderness of this world, I lighted on a certain place where was a Den, and I laid me down in that place to sleep: and, as I slept, I dreamed a dream.\n\nI saw a man clothed with rags, standing in a certain place, with his face from his own house, a book in his hand, and a great burden upon his back. I looked, and saw him open the book, and read therein; and as he read, he wept, and trembled; and not being able longer to contain, he brake out with a lamentable cry, saying, 'What shall I do?'\n\nThis man's name was Christian, and his burden was his sin. The book was the Bible, and it showed him that he was in great danger—dwelling in the City of Destruction, which would surely be burned with fire from heaven.\n\nA man named Evangelist came to him and asked, 'Wherefore dost thou cry?' Christian answered, 'Sir, I perceive by the book in my hand that I am condemned to die, and after that to come to judgment, and I find that I am not willing to do the first, nor able to do the second.'\n\nEvangelist pointed to a distant light and said, 'Keep that light in your eye, and go up directly thereto.'",
    verse: "Matthew 7:13-14",
    verseText: "Enter ye in at the strait gate: for wide is the gate, and broad is the way, that leadeth to destruction, and many there be which go in thereat: Because strait is the gate, and narrow is the way, which leadeth unto life, and few there be that find it.",
    reflection: [
      "What does Christian's burden represent in our own lives?",
      "Why is the first step on the spiritual journey recognizing our danger?",
      "What 'light' has God given you to follow?"
    ],
    prayer: "Lord, I recognize the burden of my sin. Like Christian, I cry out, 'What shall I do?' Point me to the way of salvation and give me grace to follow the light. Amen."
  },
  {
    id: 2,
    title: "Part 2: The Wicket Gate and the Cross",
    content: "So Christian came to the gate. Over the gate was written, 'Knock, and it shall be opened unto you.' He knocked, therefore, more than once or twice, saying: 'May I now enter here?'\n\nAt last there came a grave person to the gate, named Good-will, who opened the gate and pulled Christian in. 'Why did you pull me in?' asked Christian. Good-will replied, 'A little distance from this gate, there is a strong castle, of which Beelzebub is the captain. From there they shoot arrows at those who come up to this gate, to kill them before they can enter in.'\n\nChristian asked, 'I rejoice and tremble. But what must I do now?' Good-will pointed him forward to a narrow way.\n\nChristian ran until he came to a place somewhat ascending; and upon that place stood a Cross, and a little below, in the bottom, a Sepulchre. Just as Christian came up to the Cross, his burden loosed from off his shoulders, and fell from off his back, and began to tumble, and so continued to do till it came to the mouth of the Sepulchre, where it fell in, and I saw it no more.\n\nThen was Christian glad and lightsome, and said with a merry heart, 'He hath given me rest by His sorrow, and life by His death.'",
    verse: "1 Peter 2:24",
    verseText: "Who his own self bare our sins in his own body on the tree, that we, being dead to sins, should live unto righteousness: by whose stripes ye were healed.",
    reflection: [
      "Why does Good-will need to 'pull' Christian through the gate?",
      "What happens to Christian's burden at the Cross?",
      "Have you experienced the freedom of having your burden roll away?"
    ],
    prayer: "Lord Jesus, I come to Thy Cross. Let my burden of sin roll away into Thy empty tomb. Give me rest by Thy sorrow and life by Thy death. I praise Thee for setting me free. Amen."
  },
  {
    id: 3,
    title: "Part 3: The Palace Beautiful and the Valley",
    content: "After leaving the Cross, Christian came to the Palace Beautiful, where he was welcomed by Discretion, Prudence, Piety, and Charity. Here he was armed for the journey ahead.\n\nThey brought him into the armory, where they showed him all manner of furniture which their Lord had provided for pilgrims: sword, shield, helmet, breastplate, prayer, and shoes that would not wear out. They harnessed him from head to foot with what was of proof, lest he should be assaulted in the way.\n\nBut the next part of the journey led through the Valley of Humiliation, where Christian met a foul fiend named Apollyon. The monster straddled the whole breadth of the way and said, 'Prepare thyself to die; for I swear by my infernal den, that thou shalt go no further; here will I spill thy soul.'\n\nA most dreadful fight ensued, lasting above half a day. Christian was wounded in his head, hand, and foot. But when Apollyon was making his final attack, Christian reached for his sword and gave him a deadly thrust, saying, 'Rejoice not against me, O mine enemy: when I fall, I shall arise.'\n\nAt this, Apollyon spread his dragon wings and sped away.",
    verse: "Ephesians 6:11",
    verseText: "Put on the whole armour of God, that ye may be able to stand against the wiles of the devil.",
    reflection: [
      "Why is it important to be armed before entering the battle?",
      "What weapons did Christian use to defeat Apollyon?",
      "How do you respond when the enemy seems to be winning the fight?"
    ],
    prayer: "Lord, arm me with the armor of God. When I face the enemy, let me stand firm. Though I fall, I shall arise. Give me victory through the sword of the Spirit and the power of prayer. Amen."
  }
];

// Hannah Whitall Smith's "The Christian's Secret of a Happy Life" (Public Domain, 1875)
const christiansSecretHappyLifeLessons: StudyLesson[] = [
  {
    id: 1,
    title: "Chapter 1: Is It Scriptural?",
    content: "A keen observer once said that the Christians he knew seemed to wear a look of 'sadness and unrest.' Surely this is not how it ought to be. The Bible is full of promises of joy, peace, and victory.\n\nMany Christians know they are saved but have never learned the secret of happy, victorious living. They struggle and fail, rise and fall, until Christianity seems more of a burden than a blessing.\n\nBut Scripture reveals another way. 'The fruit of the Spirit is love, joy, peace.' 'My peace I give unto you.' 'These things have I spoken unto you, that my joy might remain in you, and that your joy might be full.'\n\nThis life of rest and victory is not for a select few super-saints. It is the normal Christian life—what God intends for all His children. The fact that so few experience it does not mean it is unavailable; it only means that few have discovered the secret.\n\nThe secret is simple, though not easy to learn: it is complete trust in God, moment by moment, for everything.",
    verse: "John 15:11",
    verseText: "These things have I spoken unto you, that my joy might remain in you, and that your joy might be full.",
    reflection: [
      "Is your Christian life characterized more by struggle or by rest?",
      "Why do you think so few Christians experience the 'happy life' Christ offers?",
      "What might it mean to trust God 'moment by moment, for everything'?"
    ],
    prayer: "Lord, I want the full joy Thou hast promised. I am tired of struggling and failing. Reveal to me the secret of the happy, victorious life. Teach me to trust Thee completely. Amen."
  },
  {
    id: 2,
    title: "Chapter 4: How to Enter In",
    content: "The way into this life of rest is simply by faith. Just as we entered salvation by faith, so we enter the victorious life by faith. But many do not understand what faith means.\n\nFaith is not feeling. You may not feel anything at all and yet be exercising real faith. Many make the mistake of looking to their feelings for evidence that they have believed. But feelings are not faith.\n\nFaith is not effort. Some try very hard to believe, straining and struggling as if faith were something to be achieved. But faith is exactly the opposite—it is a resting, a ceasing from effort.\n\nWhat then is faith? Faith is taking God at His word. It is saying, 'God has promised, and I believe Him.' It is committing yourself to God's keeping and leaving yourself there.\n\nThere is nothing mystical about it. When you sit in a chair, you trust it to hold you. When you deposit money in a bank, you trust the bank to keep it. Faith in God is simply trusting Him to do what He has promised.",
    verse: "Hebrews 4:3",
    verseText: "For we which have believed do enter into rest.",
    reflection: [
      "How have you confused faith with feelings or effort?",
      "What does it mean practically to 'take God at His word'?",
      "What promise of God do you need to trust right now?"
    ],
    prayer: "Lord, I take Thee at Thy word. I cease from my own efforts and rest in Thy promises. I commit myself to Thy keeping and leave myself there by faith. Amen."
  },
  {
    id: 3,
    title: "Chapter 8: Difficulties Concerning the Will",
    content: "The greatest difficulty most Christians have in entering the life of rest is surrendering their wills to God. They want God's best, but they want to keep control. They are willing for God to bless them, but not to rule them.\n\nBut the secret of happiness is found in one thing: making God's will our will. Not grudging submission, but glad surrender. Not saying, 'Thy will be done' with a sigh, but with a shout of joy.\n\nMany Christians see God's will as something to be endured rather than embraced. They picture Him as a hard taskmaster whose will is sure to be unpleasant. Nothing could be further from the truth.\n\nGod's will is 'good, and acceptable, and perfect.' It is the very best thing that could possibly happen to us. When we truly see this, we will stop resisting and start resting.\n\nThe surrendered will is not a weak will—it is the strongest will of all. For it is united with the will of Omnipotence.",
    verse: "Romans 12:2",
    verseText: "And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.",
    reflection: [
      "What areas of your life are you reluctant to surrender to God?",
      "How does seeing God's will as 'good, acceptable, and perfect' change your attitude?",
      "What would it look like to say 'Thy will be done' with a shout of joy?"
    ],
    prayer: "Father, I surrender my will to Thine—not with resignation but with joy. Thy will is good and perfect. Unite my will with Thine. Let me find my happiness in Thy will. Amen."
  }
];

// George Müller's "Answers to Prayer" (Public Domain, 1895)
const answersToPrayerLessons: StudyLesson[] = [
  {
    id: 1,
    title: "The Commencement of the Orphan Work",
    content: "In November 1835, I was stirred up to pray about establishing an Orphan-House. The reasons were: First, that God might be glorified, should He be pleased to furnish me with the means, in its being seen that it is not a vain thing to trust in Him. Second, the spiritual welfare of the orphans.\n\nI had no means to start such a work. I had no buildings, no funds, no prospect of support. But I had God.\n\nI asked no man for money. I made no appeals. I simply laid the matter before God in prayer, believing that He who had put the work into my heart would provide the means to accomplish it.\n\nOn December 10, 1835, I received one shilling—the first donation toward this work. By the next morning, I had received £50 more. Day by day the money came in, unsolicited, in answer to prayer alone.\n\nOver the years that followed, I cared for over ten thousand orphans. We never went into debt. We never asked anyone for money. We simply prayed—and God provided. 'Behold, I am the Lord, the God of all flesh: is there anything too hard for me?'",
    verse: "Philippians 4:19",
    verseText: "But my God shall supply all your need according to his riches in glory by Christ Jesus.",
    reflection: [
      "Why did Müller refuse to ask anyone for money?",
      "What can we learn from his approach to beginning a work for God?",
      "How does this testimony increase your faith in prayer?"
    ],
    prayer: "Lord, Thou art the God who provides. Increase my faith to trust Thee for the impossible. Teach me to bring my needs to Thee alone, believing that nothing is too hard for Thee. Amen."
  },
  {
    id: 2,
    title: "When There Was Not a Penny in Hand",
    content: "One morning we had no food for the orphans. Not a penny was in hand. But I was as sure that God would provide as if the money were already there.\n\nI sent word to the matron to have the children ready for breakfast, as usual. She was astonished, knowing there was nothing to give them. But I told her to have them seated—the Lord would provide.\n\nWe were about to sit down to empty tables when there came a knock at the door. A baker stood there with enough bread for everyone. 'I could not sleep last night,' he said. 'Something told me you would need bread this morning, so I got up at 2 a.m. to bake it.'\n\nBefore the bread was consumed, another knock came. A milkman's cart had broken down in front of the orphanage, and he needed to empty his load. 'Would you like the milk?' he asked.\n\nGod sent bread and milk to those who trusted Him. Not always dramatically—but always faithfully.",
    verse: "Matthew 6:33",
    verseText: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
    reflection: [
      "How did Müller demonstrate faith even before the answer came?",
      "What does this story teach about God's timing?",
      "Are there needs in your life that you should trust to God rather than worrying about?"
    ],
    prayer: "Father, I trust Thee to provide for my needs. When I cannot see how, help me to believe Thou canst. Let me seek first Thy kingdom, trusting all these things to be added. Amen."
  },
  {
    id: 3,
    title: "The Secret of Müller's Prayer Life",
    content: "Many have asked me the secret of my service. I can only give one answer: I have made it a habit to read through the whole Bible through, four or five times a year. But I always find some new light.\n\nI have also learned that prayer and the Word must go together. I do not mean repeating prayers from a book. I mean pouring out my heart before God about every concern—large or small.\n\nAnother secret has been waiting upon God until the answer comes. I do not give up. I do not conclude that the answer is 'No' simply because it does not come at once. I pray until I receive—or until God clearly shows me His will is otherwise.\n\nI have learned to test everything by Scripture. I seek to have no will of my own. I ask God to work in me to will and to do of His good pleasure. I make a study of what His will is.\n\nAbove all, I have learned that what God wants is faith—simple, childlike faith that takes Him at His word.",
    verse: "James 5:16",
    verseText: "The effectual fervent prayer of a righteous man availeth much.",
    reflection: [
      "What role did Scripture play in Müller's prayer life?",
      "What does it mean to 'wait upon God until the answer comes'?",
      "What aspect of Müller's prayer life could you implement this week?"
    ],
    prayer: "Lord, teach me to pray like Müller prayed—with Scripture, with persistence, with faith. Help me to seek Thy will above my own. Give me childlike trust in Thy Word. Amen."
  }
];

// R.A. Torrey's "How to Pray" (Public Domain, 1900)
const howToPrayLessons: StudyLesson[] = [
  {
    id: 1,
    title: "Chapter 1: The Importance of Prayer",
    content: "Prayer is the key that unlocks all the storehouses of God's infinite grace and power. All that God is and all that God has is at the disposal of prayer.\n\nPrayer can do anything that God can do, and as God can do anything, prayer is omnipotent. No one can put any limit on what prayer can do.\n\nThe lack of prayer is the cause of the lack of power. We are not straitened in God; we are straitened in ourselves. The problem is not that God's arm is shortened; the problem is that we do not ask.\n\nPrayer is the secret of the great souls of history. Every mighty revival began with prayer. Every great missionary thrust was born in prayer. Every significant advance of the kingdom has had its roots in the prayer closet.\n\nIf we wish to be men and women of power—power for service, power for God, power over sin—we must be men and women of prayer. There is no other way.",
    verse: "James 4:2",
    verseText: "Ye have not, because ye ask not.",
    reflection: [
      "Why is prayerlessness the cause of powerlessness in Christian life?",
      "What would change in your life if you truly believed prayer could do 'anything God can do'?",
      "What is preventing you from becoming a person of prayer?"
    ],
    prayer: "Lord, forgive my prayerlessness. I want to be a person of power—power for service, for righteousness, for Thee. Teach me to pray. Make me a person of the prayer closet. Amen."
  },
  {
    id: 2,
    title: "Chapter 3: Praying Unto God",
    content: "We should always remember that we are praying to God. That sounds simple, but many forget it. They are thinking about their prayers—how well or how poorly they pray—rather than thinking about God.\n\nWhen you pray, lift your eyes to God. See Him on His throne. Remember His power, His wisdom, His love. Consider that nothing is impossible to Him.\n\nPrayer is coming into the audience chamber of the King of kings. Prayer is pouring out your heart to your Father who loves you. Prayer is speaking with your Friend who sticks closer than a brother.\n\nThink about God. Think about His ability to answer. Think about His willingness to help. Think about His faithfulness to His promises.\n\nMany prayers fail because they are addressed to the wrong person—to ourselves, to our feelings, to the thin air. True prayer goes straight to God.",
    verse: "Hebrews 4:16",
    verseText: "Let us therefore come boldly unto the throne of grace, that we may obtain mercy, and find grace to help in time of need.",
    reflection: [
      "When you pray, are you focused on God or on your own praying?",
      "How does thinking about God's character affect your prayers?",
      "What does it mean to 'come boldly' to the throne of grace?"
    ],
    prayer: "Father, I lift my eyes to Thee. Thou art the Almighty God, the loving Father, the faithful Friend. I come boldly to Thy throne. Hear my prayer and answer according to Thy grace. Amen."
  },
  {
    id: 3,
    title: "Chapter 6: Praying in the Name of Jesus",
    content: "To pray in the name of Jesus is not simply to tack His name at the end of a prayer. It means far more than that.\n\nTo pray in Jesus' name is to pray in His merit, not our own. We come to God not because we are worthy but because Jesus is worthy. His righteousness is our passport into God's presence.\n\nTo pray in Jesus' name is to pray as His representative. It is to pray for what He would pray for, what advances His kingdom and glorifies His name.\n\nTo pray in Jesus' name is to pray in His authority. He has given us the right to use His name. 'Whatsoever ye shall ask in my name, that will I do, that the Father may be glorified in the Son.'\n\nWhat power is in the name of Jesus! At that name, every knee shall bow. At that name, demons flee. At that name, heaven's resources are released. Learn to pray in the mighty name of Jesus.",
    verse: "John 14:13-14",
    verseText: "And whatsoever ye shall ask in my name, that will I do, that the Father may be glorified in the Son. If ye shall ask any thing in my name, I will do it.",
    reflection: [
      "What does it really mean to pray 'in Jesus' name'?",
      "How does praying in Jesus' name change what you ask for?",
      "Why is Jesus' name so powerful in prayer?"
    ],
    prayer: "Lord Jesus, I come to the Father in Thy name—not in my merit but in Thine. As Thy representative, I pray for what glorifies Thee. In Thy authority, I ask. Answer, Lord, for Thy name's sake. Amen."
  }
];

// Hudson Taylor's "Union and Communion" (Public Domain, 1894)
const unionAndCommunionLessons: StudyLesson[] = [
  {
    id: 1,
    title: "Chapter 1: The Unsatisfied Life",
    content: "Too many Christians live an unsatisfied life. They know Christ as Savior but not as the Lover of their souls. They have life but not abundant life. They exist, but they do not overflow.\n\nThe Song of Solomon speaks of an intimacy with Christ that many believers have never experienced. 'Let him kiss me with the kisses of his mouth: for thy love is better than wine.'\n\nThis is not the language of formality but of passion. This is not cold orthodoxy but warm devotion. This is not religion but relationship—the most intimate relationship possible.\n\nChrist desires this intimacy with you. He says, 'Behold, I stand at the door, and knock.' He wants to come in and sup with you—to share fellowship, communion, intimacy.\n\nAre you satisfied with where you are in your relationship with Christ? Or do you sense that there is more—much more—that you have not yet experienced?",
    verse: "Song of Solomon 1:2",
    verseText: "Let him kiss me with the kisses of his mouth: for thy love is better than wine.",
    reflection: [
      "In what ways has your Christian life been 'unsatisfied'?",
      "What does it mean to know Christ not just as Savior but as the 'Lover of your soul'?",
      "How intimate is your relationship with Christ right now?"
    ],
    prayer: "Lord Jesus, I want more of Thee. I am not satisfied with a formal, distant relationship. Draw me closer. Let me know Thee intimately. Let Thy love satisfy my deepest longings. Amen."
  },
  {
    id: 2,
    title: "Chapter 2: Nearness to Christ",
    content: "Christ invites us to nearness. 'Draw me, we will run after thee.' We cannot draw ourselves; we must be drawn. But when He draws, we run—eagerly, willingly, joyfully.\n\nNotice the progression: 'Draw me' is singular, but 'we will run' is plural. When one soul is drawn near to Christ, others are influenced and follow. Nearness to Christ always results in drawing others.\n\nBut there is a condition: 'The king hath brought me into his chambers.' Not merely into His presence but into His chambers—the private rooms, the place of intimacy. This is where secrets are shared, where love is expressed, where hearts are united.\n\nMany Christians stay in the outer courts. They know about Christ but do not know Him. They serve Him but do not commune with Him. They work for Him but do not rest in Him.\n\nChrist calls you into His chambers. Will you come?",
    verse: "Song of Solomon 1:4",
    verseText: "Draw me, we will run after thee: the king hath brought me into his chambers.",
    reflection: [
      "What does it mean to be 'drawn' by Christ rather than to draw yourself?",
      "How does your nearness to Christ affect others around you?",
      "What would it mean for you to move from the outer courts into His chambers?"
    ],
    prayer: "Lord, draw me. I cannot draw myself to Thee. But when Thou drawest, I will run. Bring me into Thy chambers. Let me know the intimacy Thou hast prepared for those who love Thee. Amen."
  },
  {
    id: 3,
    title: "Chapter 4: The Joy of Union",
    content: "The bride says, 'I sat down under his shadow with great delight, and his fruit was sweet to my taste.' Here is the posture of communion—sitting, resting, delighting.\n\nToo many Christians are too busy to sit with Christ. They are always running, always doing, always working. But intimacy requires stillness. Communion requires time. Love requires attention.\n\n'His shadow'—the shadow of Christ is protection from the scorching heat of life's burdens. In His shadow we find rest from our labors, peace from our struggles, comfort from our sorrows.\n\n'His fruit was sweet'—not bitter, not merely tolerable, but sweet. When we are in close communion with Christ, we find that He satisfies completely. His love is sweet. His Word is sweet. His presence is sweet.\n\nLearn to sit at His feet. Learn to rest in His shadow. Learn to taste His sweetness. This is the secret of the abundant life.",
    verse: "Song of Solomon 2:3",
    verseText: "As the apple tree among the trees of the wood, so is my beloved among the sons. I sat down under his shadow with great delight, and his fruit was sweet to my taste.",
    reflection: [
      "What does 'sitting under His shadow' look like in your daily life?",
      "Are you too busy for communion with Christ?",
      "What would it take to taste and see that the Lord is 'sweet'?"
    ],
    prayer: "Lord Jesus, I want to sit under Thy shadow with great delight. Still my busy heart. Let me taste Thy sweetness. In Thy presence I find rest, and Thy fruit is sweeter than any earthly pleasure. Amen."
  }
];

// Oswald Chambers' "My Utmost for His Highest" (Public Domain, 1927)
const myUtmostLessons: StudyLesson[] = [
  {
    id: 1,
    title: "January 1: Let Us Keep to the Point",
    content: "'My Utmost for His Highest.' This is the motto for the Christian life. Not my minimum, but my utmost. Not for my glory, but for His highest purpose.\n\nMy determination is to be my utmost for His highest, my best for His glory. I am here not to serve my purposes but His. I am not my own; I have been bought with a price.\n\nThe great challenge of the Christian life is to stay focused on this purpose. We are so easily distracted. We substitute lesser goods for the greatest good. We lose sight of the main thing.\n\nWhat is the main thing? 'That I may know him.' Not that I may know about Him, but that I may know Him personally, intimately, increasingly. Everything else is secondary.\n\nLet us keep to the point. In a world of distractions, let us be single-minded. In an age of half-heartedness, let us give our utmost. For His highest—that is the goal.",
    verse: "Philippians 3:10",
    verseText: "That I may know him, and the power of his resurrection, and the fellowship of his sufferings, being made conformable unto his death.",
    reflection: [
      "What does 'my utmost for His highest' mean for your daily life?",
      "What distractions keep you from knowing Christ more deeply?",
      "Are you giving your minimum or your utmost to God?"
    ],
    prayer: "Lord, I want to give my utmost for Thy highest. I am Thine, not my own. Help me to know Thee—not about Thee, but Thee. Keep me focused on what matters most. Amen."
  },
  {
    id: 2,
    title: "January 13: The Cost of Discipleship",
    content: "'If any man come to me, and hate not his father, and mother...he cannot be my disciple.' Jesus did not say this to harden us but to help us. He was warning us of the cost.\n\nDiscipleship is costly. It costs you your self-will, your independence, your right to choose your own way. It costs you everything—in exchange for everything.\n\nMany start with enthusiasm but fall away when the cost becomes clear. They want the benefits of the kingdom without the demands of the King. But Jesus is looking for disciples, not admirers.\n\nThe word 'hate' seems harsh, but Jesus is making a comparison. Your love for Him must be so great that all other loves pale in comparison—seem like hate by contrast.\n\nAre you willing to pay the price? Are you prepared to put Christ above all—above family, above career, above comfort, above life itself? This is what it means to be His disciple.",
    verse: "Luke 14:26",
    verseText: "If any man come to me, and hate not his father, and mother, and wife, and children, and brethren, and sisters, yea, and his own life also, he cannot be my disciple.",
    reflection: [
      "What has discipleship cost you so far?",
      "Is there anything you are holding back from Christ?",
      "What does it mean to love Christ so much that all other loves seem like 'hate' by comparison?"
    ],
    prayer: "Lord Jesus, I want to be Thy disciple, not just Thy admirer. I count the cost and choose to follow. Let my love for Thee surpass all other loves. I give Thee everything. Amen."
  },
  {
    id: 3,
    title: "March 6: Am I My Brother's Keeper?",
    content: "Cain's question reveals the fundamental selfishness of sin: 'Am I my brother's keeper?' The answer is yes. We are responsible for one another.\n\nGod does not put us in isolation. He puts us in community, in relationship, in responsibility. We are not saved to be spiritual hermits but to be part of a body.\n\nThe mark of true Christianity is not just love for God but love for one another. 'By this shall all men know that ye are my disciples, if ye have love one to another.'\n\nThis is not mere sentiment. It is sacrificial service. It is bearing one another's burdens. It is preferring others above ourselves. It is laying down our lives for the brethren.\n\nYes, you are your brother's keeper. The question is not whether you are responsible but whether you will accept the responsibility. Will you care for those God has put in your life?",
    verse: "1 John 3:16",
    verseText: "Hereby perceive we the love of God, because he laid down his life for us: and we ought to lay down our lives for the brethren.",
    reflection: [
      "Do you tend toward spiritual independence or interdependence?",
      "Who has God put in your life that you are responsible to love and serve?",
      "What does it mean practically to 'lay down your life for the brethren'?"
    ],
    prayer: "Father, forgive my selfishness. Help me to see that I am my brother's keeper. Teach me to love not in word only but in deed and truth. Let me lay down my life for others. Amen."
  },
  {
    id: 4,
    title: "May 7: The Vision and the Verity",
    content: "God gives us visions of what we may become, but the vision is always followed by the valley. The mountaintop experience must be tested in the flatland of ordinary life.\n\nPeter saw the Transfiguration—Christ in His glory. But then he had to come down from the mountain and face a demon-possessed boy, failure, and denial. The vision was real, but so was the valley.\n\nThis is God's way. He shows us what can be, then tests us to see if we will believe it when we cannot see it. The vision gives us the goal; the valley proves our faith.\n\nDo not be discouraged when the valley follows the vision. This is normal. The vision is not taken away—it is being worked into you through the discipline of the valley.\n\nHold onto the vision, even when the valley seems to deny it. In time, the vision will become verity—reality. What God has shown you, He will accomplish in you.",
    verse: "2 Peter 1:17-18",
    verseText: "For he received from God the Father honour and glory, when there came such a voice to him from the excellent glory, This is my beloved Son, in whom I am well pleased. And this voice which came from heaven we heard, when we were with him in the holy mount.",
    reflection: [
      "What visions has God given you that are being tested in the valley?",
      "How do you respond when the valley seems to contradict the vision?",
      "How is the valley working the vision into reality in your life?"
    ],
    prayer: "Lord, help me hold onto the vision even in the valley. I believe what Thou hast shown me. Work it into me through the discipline of difficulty. Turn the vision into verity. Amen."
  },
  {
    id: 5,
    title: "December 31: Yesterday",
    content: "As this year closes, what will you do with yesterday? Will you carry its failures into the new year? Will you drag its regrets behind you?\n\nThe beauty of the Christian life is that we can leave yesterday behind. 'Forgetting those things which are behind, and reaching forth unto those things which are before.'\n\nThis does not mean we learn nothing from the past. But it means we are not imprisoned by it. Our failures are forgiven. Our sins are covered. Our mistakes are redeemed.\n\n'His compassions fail not. They are new every morning.' What a promise! Not old compassions, but new ones. Not stale mercies, but fresh ones. Every morning is a new beginning.\n\nAs you face the new year, leave yesterday with God. Take from it the lessons He taught you, but leave the guilt, the regret, the failure. Press forward to what lies ahead. Christ calls you onward.",
    verse: "Philippians 3:13-14",
    verseText: "Brethren, I count not myself to have apprehended: but this one thing I do, forgetting those things which are behind, and reaching forth unto those things which are before, I press toward the mark for the prize of the high calling of God in Christ Jesus.",
    reflection: [
      "What from the past year do you need to leave behind?",
      "What lessons has God taught you that you should carry forward?",
      "What does it mean practically to 'press toward the mark'?"
    ],
    prayer: "Father, I leave yesterday with Thee. I thank Thee for Thy mercies that are new every morning. I press forward to what lies ahead. Let me apprehend that for which I have been apprehended by Christ. Amen."
  }
];

// A.W. Pink's "The Attributes of God" (Public Domain, 1930)
const attributesOfGodLessons: StudyLesson[] = [
  {
    id: 1,
    title: "Chapter 1: The Solitariness of God",
    content: "In the beginning, God. There was a time when God dwelt alone. Before there was any creature, God was. He needed nothing outside Himself. He was complete in Himself—self-existent, self-sufficient, self-satisfied.\n\nGod did not create because He was lonely or because He needed companions. He created for His own glory, according to His own pleasure. 'For thy pleasure they are and were created.'\n\nThis truth is humbling. We are not necessary to God. He existed in perfect blessedness for an eternity before we were. He would lose nothing of His essential glory if we had never been.\n\nAnd yet, wonder of wonders, He chose to create us. He chose to love us. He chose to redeem us. Not because He needed us, but because He wanted us.\n\nUnderstanding God's solitariness is the beginning of true worship. It puts us in our proper place—as recipients of His grace, not contributors to His glory.",
    verse: "Isaiah 40:13-14",
    verseText: "Who hath directed the Spirit of the LORD, or being his counsellor hath taught him? With whom took he counsel, and who instructed him, and taught him in the path of judgment, and taught him knowledge, and shewed to him the way of understanding?",
    reflection: [
      "What does it mean that God existed in perfect blessedness before creation?",
      "How does understanding God's self-sufficiency change your perspective on worship?",
      "Why is it humbling—and yet wonderful—that God chose to create and love us?"
    ],
    prayer: "Lord, Thou art complete in Thyself, needing nothing. And yet Thou hast chosen to love me. This humbles me and fills me with wonder. I worship Thee, the self-existent, self-sufficient God. Amen."
  },
  {
    id: 2,
    title: "Chapter 3: The Sovereignty of God",
    content: "God is sovereign. This means He is supreme, absolute, independent. He does according to His will in the army of heaven and among the inhabitants of the earth. None can stay His hand or say to Him, 'What doest thou?'\n\nGod's sovereignty extends to all things. Not a sparrow falls without His will. Not a hair of our head is outside His control. All events, all circumstances, all creatures—all are under His absolute dominion.\n\nThis is not fatalism. Fatalism believes in blind chance or impersonal force. Sovereignty believes in a loving, wise, all-powerful God who works all things according to His good purpose.\n\nMany reject this doctrine because they want to be sovereign themselves. They want to control their own destinies. But this is the essence of human pride—placing self on the throne that belongs to God alone.\n\nTo bow to God's sovereignty is to find peace. When we cease fighting against His will and submit to His wise and loving rule, we find rest for our souls.",
    verse: "Daniel 4:35",
    verseText: "And all the inhabitants of the earth are reputed as nothing: and he doeth according to his will in the army of heaven, and among the inhabitants of the earth: and none can stay his hand, or say unto him, What doest thou?",
    reflection: [
      "What is the difference between God's sovereignty and fatalism?",
      "In what areas of your life do you struggle to submit to God's sovereign will?",
      "How does accepting God's sovereignty bring peace?"
    ],
    prayer: "Sovereign Lord, I bow before Thy throne. Thou doest all things well. I cease my fighting and submit to Thy wise and loving rule. Thy will be done, on earth as it is in heaven. Amen."
  },
  {
    id: 3,
    title: "Chapter 9: The Love of God",
    content: "God is love. This is His nature, not merely His attitude. He does not merely act lovingly; He is love. Love is the very essence of His being.\n\nBut we must not sentimentalize God's love. It is not weak or indulgent. It is holy love—love that is compatible with His justice, His wrath against sin, His sovereign purposes.\n\nGod's love is sovereign—He loves whom He will. It is eternal—He loved us before the foundation of the world. It is infinite—it is boundless, measureless, unfathomable. It is unchangeable—He loves us the same yesterday, today, and forever.\n\nThe supreme demonstration of God's love is the cross. 'Herein is love, not that we loved God, but that he loved us, and sent his Son to be the propitiation for our sins.'\n\nWe cannot earn God's love or lose it. It is fixed upon us by His sovereign choice. It holds us fast through every storm. It will never let us go.",
    verse: "1 John 4:10",
    verseText: "Herein is love, not that we loved God, but that he loved us, and sent his Son to be the propitiation for our sins.",
    reflection: [
      "What is the difference between God 'being love' and God 'acting lovingly'?",
      "How does the cross demonstrate the nature of God's love?",
      "How does knowing that God's love is sovereign, eternal, infinite, and unchangeable affect your security in Him?"
    ],
    prayer: "Father, Thou art love. I cannot comprehend Thy love, but I rest in it. Thou hast loved me with an everlasting love. Help me to grasp how wide and long and high and deep is the love of Christ. Amen."
  }
];

// François Fénelon's "Christian Counsel" (Public Domain, 17th Century)
const christianCounselLessons: StudyLesson[] = [
  {
    id: 1,
    title: "Letter 1: On Simplicity",
    content: "True simplicity is that grace which frees the soul from all unnecessary reflections upon itself. It is different from sincerity. Sincerity is a virtue below simplicity.\n\nSimplicity goes straight to God without self-reflection. The simple soul does not analyze whether it is doing well or poorly. It simply does what it believes God wants, and leaves the results to Him.\n\nThe truly simple soul is not occupied with itself at all. It is wholly occupied with God. It does not ask, 'Am I making progress?' It simply loves and trusts.\n\nThis simplicity is the death of self-love. Self-love is constantly examining, comparing, measuring. Simplicity forgets self altogether in its focus on God.\n\nSeek this simplicity. Do not be always turning inward to see how you are doing. Turn outward to God. Do what love requires, and leave yourself in His hands.",
    verse: "Matthew 6:22",
    verseText: "The light of the body is the eye: if therefore thine eye be single, thy whole body shall be full of light.",
    reflection: [
      "What is the difference between sincerity and simplicity?",
      "How does self-examination become self-absorption?",
      "What would it look like to forget yourself in your focus on God?"
    ],
    prayer: "Lord, give me the grace of holy simplicity. Free me from constant self-reflection. Help me to do what love requires and leave myself in Thy hands. Amen."
  },
  {
    id: 2,
    title: "Letter 2: On Dryness in Prayer",
    content: "Do not be troubled when you find yourself dry and cold in prayer. God is weaning you from sensible consolations so that you may love Him for Himself alone.\n\nWhen God gives us feelings of sweetness, we are tempted to love the gift more than the Giver. We come to prayer seeking the pleasure rather than seeking God. So He withdraws the pleasure.\n\nIn the dry times, faith becomes pure. You pray not because it feels good, but because you love God. You seek not experiences, but Him. This is a higher kind of prayer.\n\nDo not try to force feelings that will not come. Simply present yourself to God in your poverty. Say, 'Lord, I have nothing to offer Thee but my weakness. I love Thee, though I feel nothing.'\n\nThis humble, naked faith pleases God far more than all our fervent emotions. He sees the will that perseveres when feeling fails.",
    verse: "Psalm 42:1-2",
    verseText: "As the hart panteth after the water brooks, so panteth my soul after thee, O God. My soul thirsteth for God, for the living God.",
    reflection: [
      "Have you experienced dryness in prayer? How did you respond?",
      "Why might God withdraw feelings of sweetness in prayer?",
      "How can dryness actually purify our love for God?"
    ],
    prayer: "Father, I come to Thee in my dryness. I have nothing to offer but my weakness. I love Thee, though I feel nothing. Accept my naked faith and teach me to love Thee for Thyself alone. Amen."
  },
  {
    id: 3,
    title: "Letter 3: On Bearing with Ourselves",
    content: "We must bear with ourselves without flattering ourselves. This is one of the most important lessons of the spiritual life.\n\nMany become discouraged when they see their faults. They expected to become perfect quickly, and when they fall, they are angry with themselves. But this anger is itself a form of pride.\n\nTrue humility accepts that we are weak and will fall often. It does not excuse sin, but neither does it expect instant perfection. It accepts the slow work of grace.\n\nBear with yourself as God bears with you—patiently, gently, hopefully. When you fall, do not waste time in self-reproach. Rise immediately and turn back to God.\n\nGod is not surprised by your failures. He knows your weakness better than you do. He asks only that you keep turning back to Him, again and again, with childlike trust.",
    verse: "Psalm 103:13-14",
    verseText: "Like as a father pitieth his children, so the LORD pitieth them that fear him. For he knoweth our frame; he remembereth that we are dust.",
    reflection: [
      "Do you get angry with yourself when you fail? Is this humility or pride?",
      "What does it mean to bear with yourself without flattering yourself?",
      "How does God bear with our weakness?"
    ],
    prayer: "Father, teach me to bear with myself as Thou dost bear with me. When I fall, help me not to waste time in self-reproach but to rise and return to Thee with childlike trust. Amen."
  }
];

// Madame Guyon's "Experiencing the Depths of Jesus Christ" (Public Domain, 1685)
const experiencingDepthsLessons: StudyLesson[] = [
  {
    id: 1,
    title: "Chapter 1: The Way to God",
    content: "There is a way to God that is simple and direct, available to all believers. It does not require great learning or special gifts. It requires only a heart that desires God.\n\nThis way is the way of turning inward to find God who dwells within. 'The kingdom of God is within you.' Christ lives in you by His Spirit. You need not search far.\n\nBegin by turning your attention inward, away from external things. Quiet your busy thoughts. Center your heart on God's presence within.\n\nThis is not complicated. It is simply love turning toward its object. As a flower turns toward the sun, so the soul turns toward God.\n\nDo not strain or struggle. Simply turn. Simply rest. Simply be present to Him who is always present to you. This is the beginning of the deep life.",
    verse: "Luke 17:21",
    verseText: "Neither shall they say, Lo here! or, lo there! for, behold, the kingdom of God is within you.",
    reflection: [
      "What does it mean that God dwells within you?",
      "How can you begin turning your attention inward to God?",
      "Why is this way available to all believers, regardless of education?"
    ],
    prayer: "Lord, Thou dwellest within me. Teach me to turn inward and find Thee there. Quiet my busy thoughts. Let my heart rest in Thy presence. Amen."
  },
  {
    id: 2,
    title: "Chapter 3: Abandonment to God",
    content: "The deepest Christian experience comes through abandonment—complete surrender of yourself to God's will and way.\n\nAbandonment means giving up control. It means ceasing to manage your own spiritual life and letting God manage it. It means trusting Him with everything, even your growth in holiness.\n\nMany Christians hold back from complete abandonment because they fear what God might ask of them. But this fear is groundless. God is love. His will for you is always better than your will for yourself.\n\nAbandonment is not passive resignation. It is active trust. It is placing yourself entirely in God's hands, moment by moment, decision by decision.\n\nWhen you have truly abandoned yourself to God, you find a peace that nothing can disturb. You have stopped fighting. You have stopped trying to control. You have let go—and God has caught you.",
    verse: "Psalm 37:5",
    verseText: "Commit thy way unto the LORD; trust also in him; and he shall bring it to pass.",
    reflection: [
      "What areas of your life have you not yet abandoned to God?",
      "What fears hold you back from complete surrender?",
      "How is abandonment different from passive resignation?"
    ],
    prayer: "Lord, I abandon myself to Thee. I cease trying to control my life and my spiritual growth. I place myself entirely in Thy hands. Catch me as I let go. Amen."
  },
  {
    id: 3,
    title: "Chapter 7: The Prayer of Stillness",
    content: "There is a prayer beyond words—the prayer of stillness. In this prayer, the soul simply rests in God's presence, saying nothing, wanting nothing, doing nothing.\n\nThis is not emptiness. It is fullness. The soul is so full of God that words are inadequate. Love speaks without speaking. Communion happens without conversation.\n\nTo enter this prayer, begin with a simple turning toward God within. Let go of all other thoughts and desires. Rest in His presence as a child rests in its mother's arms.\n\nDo not be distracted if thoughts come. Gently let them go and return to stillness. Do not judge yourself for wandering. Simply return, again and again.\n\nIn this stillness, God does His deepest work. What takes years to accomplish through effort, He accomplishes in moments through stillness. Let Him work. Rest and let Him work.",
    verse: "Psalm 46:10",
    verseText: "Be still, and know that I am God.",
    reflection: [
      "Have you ever experienced prayer beyond words?",
      "What makes stillness difficult for you?",
      "What might God accomplish in you through the prayer of stillness?"
    ],
    prayer: "Lord, teach me to be still. Quiet my racing thoughts. Let me rest in Thy presence without words. Do Thy deepest work in me through stillness. Amen."
  }
];

// William Law's "A Serious Call to a Devout and Holy Life" (Public Domain, 1728)
const seriousCallLessons: StudyLesson[] = [
  {
    id: 1,
    title: "Chapter 1: The Nature of Devotion",
    content: "Devotion is not merely praying at certain times. It is dedicating all the actions of life to God. The devout person does not merely say prayers—he lives a life of prayer.\n\nWe readily grant that we should pray with devotion. But why should we not eat and drink, work and rest, with the same devotion? All of life belongs to God, not just the moments we set aside for worship.\n\nA man may pray fervently in church and yet live carelessly at home. He may be devout on his knees but proud in his business. This is not true devotion—it is playacting.\n\nTrue devotion transforms every aspect of life. The devout person asks of every action, 'Is this pleasing to God? Does this glorify Him?' Nothing is too small for this scrutiny.\n\nThis is the serious call to a devout life: not to add more religious duties, but to make all of life a religious duty. Every hour is holy. Every task is worship.",
    verse: "1 Corinthians 10:31",
    verseText: "Whether therefore ye eat, or drink, or whatsoever ye do, do all to the glory of God.",
    reflection: [
      "Is your devotion limited to 'religious' activities, or does it extend to all of life?",
      "What would change if you asked of every action, 'Does this glorify God?'",
      "How can eating, working, and resting become acts of worship?"
    ],
    prayer: "Lord, I would be devout not merely in my prayers but in my whole life. Let every action be dedicated to Thee. Make all of my life a life of worship. Amen."
  },
  {
    id: 2,
    title: "Chapter 4: The Use of Time",
    content: "Time is a precious gift, given us for the purpose of preparing for eternity. How we use our time reveals what we truly value.\n\nMany who would never waste money think nothing of wasting time. Yet time is more precious than money. Money lost can be regained; time lost is lost forever.\n\nThe devout person redeems the time. He does not fritter away his hours in idle amusements or vain pursuits. He asks, 'What is the best use of this hour for God's glory and my soul's welfare?'\n\nThis does not mean ceaseless activity. Rest is proper. Recreation has its place. But even our rest should be governed by wisdom, not by self-indulgence.\n\nConsider: in a few years, you will stand before God to give account of your life. Will you be able to say that you used your time wisely? Begin now to redeem the time.",
    verse: "Ephesians 5:15-16",
    verseText: "See then that ye walk circumspectly, not as fools, but as wise, Redeeming the time, because the days are evil.",
    reflection: [
      "Do you value your time as much as you value your money?",
      "How much of your time is spent on things of eternal significance?",
      "What changes would you make if you knew you would give account for every hour?"
    ],
    prayer: "Lord, my time is a gift from Thee. Teach me to use it wisely. Help me to redeem the time, using every hour for Thy glory and my soul's eternal welfare. Amen."
  },
  {
    id: 3,
    title: "Chapter 7: Humility in Daily Life",
    content: "Humility is not merely a religious virtue to be practiced in prayer. It must govern all our interactions with others in daily life.\n\nThe humble person does not think of himself more highly than he ought. He does not demand the best seat, the first word, the highest praise. He is content to be overlooked.\n\nPride shows itself in a thousand small ways: in the tone of voice that says, 'I am superior'; in the impatience with those who are slower; in the resentment when others are praised.\n\nTrue humility comes from seeing ourselves as God sees us. We are creatures, dependent on His grace for every breath. We are sinners, saved only by His mercy. What have we to be proud of?\n\nPractice humility in small things. Prefer others before yourself. Speak well of those who speak ill of you. Rejoice when others succeed. This daily practice will transform your character.",
    verse: "Philippians 2:3",
    verseText: "Let nothing be done through strife or vainglory; but in lowliness of mind let each esteem other better than themselves.",
    reflection: [
      "In what small ways does pride show itself in your daily interactions?",
      "What would it look like to prefer others before yourself today?",
      "How does seeing ourselves as God sees us produce humility?"
    ],
    prayer: "Lord, humble my proud heart. Help me not to think of myself more highly than I ought. Teach me to prefer others before myself in the small interactions of daily life. Amen."
  }
];

// Jonathan Edwards' "Religious Affections" (Public Domain, 1746)
const religiousAffectionsLessons: StudyLesson[] = [
  {
    id: 1,
    title: "Part 1: The Nature of True Religion",
    content: "True religion, in great part, consists in holy affections. By 'affections' I mean the vigorous and sensible exercises of the inclination and will of the soul.\n\nTrue religion is not merely in the head. It is in the heart. It is not enough to believe right doctrine; the heart must be engaged, the affections stirred.\n\nBut not all religious affections are true. Many people feel strongly about religion who have no true grace. Their affections are raised by their own imagination, not by the Holy Spirit.\n\nHow then do we distinguish true religious affections from false? This is the great question of the spiritual life. Many are deceived, thinking themselves saved when they are not.\n\nTrue affections have their source in the Holy Spirit's work. They arise from a spiritual perception of divine things—a sight of God's beauty, a taste of His sweetness, an experience of His love.",
    verse: "Matthew 22:37",
    verseText: "Jesus said unto him, Thou shalt love the Lord thy God with all thy heart, and with all thy soul, and with all thy mind.",
    reflection: [
      "What is the difference between religion in the head and religion in the heart?",
      "Why is it important to distinguish true from false religious affections?",
      "What is the source of true religious affections?"
    ],
    prayer: "Lord, give me true religious affections—affections that arise from Thy Spirit's work in my heart. Let me not be deceived by false emotions, but let me truly love Thee with all my heart. Amen."
  },
  {
    id: 2,
    title: "Part 2: Signs That Do Not Prove True Grace",
    content: "Many things that people take as evidence of true grace prove nothing at all. Great religious feelings may be present without any true grace.\n\nIntense emotions are no sure sign. A person may be moved to tears, stirred to great heights of feeling, and yet have no true grace. The devil can counterfeit emotion.\n\nMuch talk about religion is no sure sign. Some who speak most fluently about divine things have never truly experienced them. They have the words without the reality.\n\nExtraordinary experiences are no sure sign. Visions, voices, remarkable impressions—these prove nothing. Satan can produce these as easily as God can.\n\nEven love and joy are no certain evidence, for even these can be counterfeited. Self-love can produce feelings that look like love for God. Natural temperament can produce joy without grace.\n\nWe must look deeper than these surface signs for the true marks of God's work.",
    verse: "Matthew 7:21-22",
    verseText: "Not every one that saith unto me, Lord, Lord, shall enter into the kingdom of heaven... Many will say to me in that day, Lord, Lord, have we not prophesied in thy name?",
    reflection: [
      "Have you ever confused intense emotion with true spiritual experience?",
      "Why can even love and joy be counterfeited?",
      "What might be more reliable signs of true grace than feelings?"
    ],
    prayer: "Lord, protect me from self-deception. Let me not trust in feelings or experiences alone. Give me the true marks of Thy grace that cannot be counterfeited. Amen."
  },
  {
    id: 3,
    title: "Part 3: True Signs of Gracious Affections",
    content: "What then are the true signs of gracious affections? These affections arise from a spiritual sense of divine things—a new kind of perception that only the regenerate possess.\n\nTrue affections rest on the moral excellency of divine things. The natural man may be awed by God's power or grateful for His blessings. But only the spiritual man delights in God's holiness, loves His justice, and finds beauty in His moral perfection.\n\nTrue affections are attended by humility. False affections puff up; true affections humble. The more a person truly sees God, the more he sees his own sinfulness and unworthiness.\n\nTrue affections produce a change of nature. They are not like paint on the surface but like sap in the tree—they transform from within. The person with true grace is fundamentally different from what he was before.\n\nFinally, true affections are known by their fruit. Christian practice is the chief evidence of grace. Not what we feel, but what we do, reveals our true condition.",
    verse: "Matthew 7:16-17",
    verseText: "Ye shall know them by their fruits. Do men gather grapes of thorns, or figs of thistles? Even so every good tree bringeth forth good fruit.",
    reflection: [
      "Do you love God's holiness, not just His blessings?",
      "Have your religious experiences humbled you or puffed you up?",
      "What fruit in your life gives evidence of true grace?"
    ],
    prayer: "Lord, give me true signs of grace—love for Thy holiness, deep humility, and fruit that shows a changed nature. Let my practice confirm my profession. Amen."
  }
];

// D.L. Moody's "The Way to God" (Public Domain, 1884)
const wayToGodLessons: StudyLesson[] = [
  {
    id: 1,
    title: "Chapter 1: The Love of God",
    content: "God loves you. This is the starting point of the gospel. Before we can talk about sin or salvation, we must understand that God loves us with an everlasting love.\n\nMany people think of God as angry, waiting to punish them. But 'God is love.' He is not looking for reasons to condemn you; He is looking for ways to save you.\n\n'For God so loved the world.' Not just the good people, not just the religious people—the world. That includes you, with all your sins and failures.\n\n'That He gave His only begotten Son.' This is how much God loves you. He gave His best, His dearest, His only Son. He held nothing back.\n\n'That whosoever believeth in Him should not perish.' The door is open to everyone. Whosoever! That word takes in every man, woman, and child who ever lived. If you will believe, you will not perish.",
    verse: "John 3:16",
    verseText: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
    reflection: [
      "Do you truly believe that God loves you?",
      "What does it tell you about God's love that He gave His only Son?",
      "What does 'whosoever' mean for you personally?"
    ],
    prayer: "Father, help me to grasp how much Thou dost love me. Thou hast given Thy Son for me. Let me receive this love and believe in Him whom Thou hast sent. Amen."
  },
  {
    id: 2,
    title: "Chapter 3: The New Birth",
    content: "Jesus said, 'Ye must be born again.' This is not optional. It is not a suggestion. It is a must. Without the new birth, no one can see the kingdom of God.\n\nWhat is the new birth? It is not reformation—trying to do better. It is not education—learning religious truths. It is not church membership—joining an organization.\n\nThe new birth is a supernatural work of God's Spirit in the human heart. It is a new creation. Old things pass away; all things become new.\n\nYou cannot give yourself the new birth, any more than you could give yourself your first birth. It is God's work, not yours. But you can put yourself in the way of it.\n\nHow? By believing on the Lord Jesus Christ. 'As many as received Him, to them gave He power to become the sons of God, even to them that believe on His name.'",
    verse: "John 3:7",
    verseText: "Marvel not that I said unto thee, Ye must be born again.",
    reflection: [
      "Have you been born again, or are you relying on reformation or religion?",
      "What is the difference between the new birth and self-improvement?",
      "How does one receive this new birth from God?"
    ],
    prayer: "Lord, I need to be born again. I cannot give myself this new life. Work in me by Thy Spirit. Give me a new heart. Make me a new creation in Christ. Amen."
  },
  {
    id: 3,
    title: "Chapter 5: Assurance of Salvation",
    content: "Can you know for certain that you are saved? Yes, you can. God wants you to know. He has given you His Word precisely so that you may know.\n\n'These things have I written unto you that believe on the name of the Son of God; that ye may know that ye have eternal life.' Not hope, not wish, not think—know.\n\nAssurance is not presumption. It is faith in God's Word. If God says that everyone who believes in His Son has eternal life, and you believe in His Son, then you have eternal life. It is that simple.\n\nThe devil wants you to doubt. He whispers, 'You're not good enough. You've sinned too much. You don't feel saved.' But your salvation does not depend on your goodness or your feelings. It depends on Christ.\n\nRest on the Word. God said it. That settles it. Believe it and be at peace.",
    verse: "1 John 5:13",
    verseText: "These things have I written unto you that believe on the name of the Son of God; that ye may know that ye have eternal life.",
    reflection: [
      "Do you have assurance of your salvation, or do you doubt?",
      "On what is your assurance based—feelings or God's Word?",
      "How can you combat the devil's whispers of doubt?"
    ],
    prayer: "Father, I believe in Thy Son Jesus Christ. According to Thy Word, I have eternal life. Help me to rest in this assurance. Silence the doubts of the enemy. Let me know that I am Thine. Amen."
  }
];

// John Wesley's "A Plain Account of Christian Perfection" (Public Domain, 1766)
const christianPerfectionLessons: StudyLesson[] = [
  {
    id: 1,
    title: "Section 1: What is Christian Perfection?",
    content: "Christian perfection is not sinless perfection. We never claimed that. It is not freedom from ignorance or mistake. It is not freedom from temptation.\n\nWhat then is it? It is loving God with all the heart, soul, mind, and strength. It is the pure love of God reigning alone in the heart.\n\nThe perfect Christian is not one who never errs, but one whose heart is wholly given to God. He may make mistakes of judgment, but his intention is pure. He loves God supremely.\n\nThis is not an impossible ideal. It is God's command: 'Thou shalt love the Lord thy God with all thy heart.' God does not command impossibilities. What He commands, He enables.\n\nDo not be content with less than God's best for you. Press on toward the mark. Love is the prize—pure, perfect love for God and for your neighbor.",
    verse: "Deuteronomy 6:5",
    verseText: "And thou shalt love the LORD thy God with all thine heart, and with all thy soul, and with all thy might.",
    reflection: [
      "How is 'Christian perfection' different from sinless perfection?",
      "What does it mean for love to reign alone in the heart?",
      "Do you believe this is possible in this life?"
    ],
    prayer: "Lord, I want to love Thee with all my heart. Purify my love until Thou alone dost reign within. Let me not be content with less than Thy best for me. Amen."
  },
  {
    id: 2,
    title: "Section 2: How is Perfection Attained?",
    content: "Some believe that Christian perfection is attained gradually, through a long process of growth. Others believe it is received instantaneously, by faith. I believe it is both.\n\nThere is a gradual work of sanctification from the moment of conversion. The believer grows in grace, putting off the old man and putting on the new.\n\nBut there is also a moment when God cleanses the heart entirely—when the struggle with inward sin gives way to settled peace. This is received by faith, just as justification is received by faith.\n\nHow do we receive this blessing? By believing that God is able to do it now. By believing that He is willing to do it now. By believing that He does it now.\n\nDo not put this off to your deathbed. Do not wait for some future time. Christ can sanctify you wholly today. Look to Him and believe.",
    verse: "1 Thessalonians 5:23-24",
    verseText: "And the very God of peace sanctify you wholly; and I pray God your whole spirit and soul and body be preserved blameless unto the coming of our Lord Jesus Christ. Faithful is he that calleth you, who also will do it.",
    reflection: [
      "Have you experienced both gradual growth and moments of breakthrough?",
      "What is holding you back from believing God can sanctify you wholly now?",
      "What would it mean to believe that God does it now?"
    ],
    prayer: "God of peace, sanctify me wholly. I believe Thou art able. I believe Thou art willing. I believe Thou dost do it now. Cleanse my heart and fill me with perfect love. Amen."
  },
  {
    id: 3,
    title: "Section 3: How is Perfection Maintained?",
    content: "Receiving the blessing of entire sanctification is one thing. Maintaining it is another. Many who have received have also lost.\n\nThe first enemy is pride. When God gives great blessings, we are tempted to think ourselves better than others. This pride grieves the Spirit and opens the door to the enemy.\n\nAnother enemy is unbelief. We begin to doubt whether we really received. We listen to the whispers of Satan. We look at our feelings rather than at Christ.\n\nThe way to maintain the blessing is the same way we received it—by faith. We must abide in Christ moment by moment. We must walk in the light as He is in the light.\n\nIf we do fall, we must not despair. We can return to Christ and receive again what we have lost. His grace is greater than our failure.",
    verse: "Jude 1:24",
    verseText: "Now unto him that is able to keep you from falling, and to present you faultless before the presence of his glory with exceeding joy.",
    reflection: [
      "What are the greatest threats to maintaining spiritual progress?",
      "How does pride creep in after God blesses us?",
      "What does it mean to abide in Christ moment by moment?"
    ],
    prayer: "Lord, keep me from falling. Guard me against pride and unbelief. Help me to abide in Thee moment by moment. And if I fall, restore me quickly by Thy grace. Amen."
  }
];

// Augustine's "Confessions" (Public Domain, 397 AD)
const confessionsLessons: StudyLesson[] = [
  {
    id: 1,
    title: "Book 1: The Restless Heart",
    content: "Thou hast made us for Thyself, O Lord, and our hearts are restless until they rest in Thee.\n\nThis is the testimony of my own soul. I sought happiness in pleasure, in success, in philosophy—but found only emptiness. The human heart has a God-shaped void that nothing else can fill.\n\nI confess my early sins—the theft of pears, not from hunger but from the sheer pleasure of wrongdoing. I confess the lusts of youth that held me captive. I was bound by chains of my own forging.\n\nMy mother Monica prayed for me year after year. She never stopped believing that God would save me. Her tears were not wasted.\n\nLooking back, I see that even when I was running from God, He was pursuing me. His grace was at work long before I knew it. He was preparing me for the day when I would finally come home.",
    verse: "Psalm 27:8",
    verseText: "When thou saidst, Seek ye my face; my heart said unto thee, Thy face, LORD, will I seek.",
    reflection: [
      "In what ways has your heart been restless, seeking satisfaction in things other than God?",
      "How have you seen God pursuing you even when you were running from Him?",
      "What 'chains of your own forging' have held you captive?"
    ],
    prayer: "O Lord, Thou hast made me for Thyself. My heart is restless until it rests in Thee. I confess my wanderings. Draw me back to Thyself. Amen."
  },
  {
    id: 2,
    title: "Book 8: The Garden Conversion",
    content: "I was in the garden, torn between two wills. Part of me wanted God; part of me clung to sin. I was paralyzed by the struggle.\n\nThen I heard a child's voice from a neighboring house, singing, 'Take up and read, take up and read.' I took it as a command from God. I picked up the Scriptures and read the first passage my eyes fell upon.\n\n'Not in rioting and drunkenness, not in chambering and wantonness, not in strife and envying: but put ye on the Lord Jesus Christ, and make not provision for the flesh, to fulfil the lusts thereof.'\n\nI needed to read no further. In that instant, all the darkness of doubt vanished. Light flooded my heart. The chains fell away.\n\nI ran to my mother with the news. Her prayers had been answered. The son of so many tears could not be lost.",
    verse: "Romans 13:13-14",
    verseText: "Let us walk honestly, as in the day; not in rioting and drunkenness, not in chambering and wantonness, not in strife and envying: But put ye on the Lord Jesus Christ, and make not provision for the flesh, to fulfil the lusts thereof.",
    reflection: [
      "Have you ever been torn between two wills—wanting God but clinging to sin?",
      "How has God used unexpected means to speak to you?",
      "What chains have fallen away when you turned fully to Christ?"
    ],
    prayer: "Lord Jesus, I put Thee on. I make no provision for the flesh. Free me from the struggle between two wills. Let light flood my heart and chains fall away. Amen."
  },
  {
    id: 3,
    title: "Book 10: The Memory and God",
    content: "Late have I loved Thee, O Beauty so ancient and so new, late have I loved Thee! Thou wert within me, and I was outside, and there I searched for Thee.\n\nI looked for God in the beauty of creation, in the pleasures of the senses, in the achievements of the mind. All these things said to me, 'We are not God; look higher.'\n\nAt last I looked within and found Thee there—Thou who hadst been with me all along. Thou wert more inward than my inmost self, and higher than my highest.\n\nWhere then did I find Thee? In the memory of Thee that was planted in my heart. I knew I was seeking something I had somehow lost. When I found Thee, I recognized Thee as the One I had always been looking for.\n\nNow I love Thee, late though it be. I had been looking for Thee in all the wrong places. Thou wert within, waiting for me to come home.",
    verse: "Psalm 139:7-8",
    verseText: "Whither shall I go from thy spirit? or whither shall I flee from thy presence? If I ascend up into heaven, thou art there: if I make my bed in hell, behold, thou art there.",
    reflection: [
      "Have you been looking for God 'outside' when He is within?",
      "What does it mean that God is 'more inward than your inmost self'?",
      "How can the phrase 'late have I loved Thee' become your prayer?"
    ],
    prayer: "O Beauty so ancient and so new, late have I loved Thee! Thou wert within, and I was outside. Now I turn within and find Thee there. I love Thee, Lord, late though it be. Amen."
  }
];

// Charles Finney's "Lectures on Revival" (Public Domain, 1835)
const lecturesOnRevivalLessons: StudyLesson[] = [
  {
    id: 1,
    title: "Lecture 1: What a Revival of Religion Is",
    content: "A revival is not a miracle. It is the natural result of the right use of means. God has established laws in the spiritual realm just as in the natural realm.\n\nRevival presupposes that the church has sunk into a backslidden state. Christians have lost their first love. The world has crept in. Prayer has grown cold.\n\nIn revival, Christians are convicted of their sins. They repent deeply. They return to their first love. They begin to obey God fully.\n\nSinners are also convicted. The Spirit works mightily. Souls are converted in great numbers. The community is shaken.\n\nRevival is desperately needed in our day. The church is weak. The world is strong. Sinners are perishing. But God is ready to revive us—if we will meet His conditions.",
    verse: "Habakkuk 3:2",
    verseText: "O LORD, I have heard thy speech, and was afraid: O LORD, revive thy work in the midst of the years, in the midst of the years make known; in wrath remember mercy.",
    reflection: [
      "Do you believe revival follows spiritual laws, or is it purely miraculous?",
      "What signs of backsliding do you see in the church today?",
      "What role do you play in preparing for revival?"
    ],
    prayer: "O Lord, revive Thy work! We are backslidden and cold. Convict us of our sins. Restore our first love. Pour out Thy Spirit on us and on the lost around us. Amen."
  },
  {
    id: 2,
    title: "Lecture 2: The Conditions of Revival",
    content: "If my people, which are called by my name, shall humble themselves, and pray, and seek my face, and turn from their wicked ways; then will I hear from heaven, and will forgive their sin, and will heal their land.\n\nHere are God's conditions for revival: humility, prayer, seeking God's face, and repentance. When these conditions are met, God promises to hear, forgive, and heal.\n\nHumility comes first. Pride is the great barrier to revival. We must acknowledge our need, confess our failures, and take our proper place before God.\n\nPrayer must be united and earnest. Not formal prayers, but desperate, believing prayer. 'The effectual fervent prayer of a righteous man availeth much.'\n\nWe must seek God's face, not just His hand. We want His presence, not just His blessings. And we must turn from our wicked ways—all of them, not just the obvious ones.",
    verse: "2 Chronicles 7:14",
    verseText: "If my people, which are called by my name, shall humble themselves, and pray, and seek my face, and turn from their wicked ways; then will I hear from heaven, and will forgive their sin, and will heal their land.",
    reflection: [
      "Which of these conditions—humility, prayer, seeking God's face, repentance—is most needed in your life?",
      "What is the difference between seeking God's hand and seeking His face?",
      "What 'wicked ways' might God be calling you to turn from?"
    ],
    prayer: "Father, I humble myself before Thee. I pray earnestly for revival. I seek Thy face, not just Thy hand. I turn from every wicked way. Hear from heaven and revive us. Amen."
  },
  {
    id: 3,
    title: "Lecture 4: Prevailing Prayer",
    content: "Prevailing prayer is prayer that obtains the blessing it seeks. It is possible to pray and not prevail. Many prayers are never answered because they are not prayed in the right way.\n\nTo prevail in prayer, you must pray for a definite object. Vague prayers get vague answers—or no answers at all. Know what you are asking for.\n\nYou must pray in faith, believing that God hears and will answer. 'What things soever ye desire, when ye pray, believe that ye receive them, and ye shall have them.'\n\nYou must pray in the name of Jesus, relying on His merit, not your own. You must pray with a submissive spirit, willing for God's will to be done.\n\nAnd you must pray with persistence. Don't give up. Keep asking, keep seeking, keep knocking. The prayer that prevails is the prayer that perseveres.",
    verse: "James 5:16",
    verseText: "The effectual fervent prayer of a righteous man availeth much.",
    reflection: [
      "Are your prayers specific or vague?",
      "What does it mean to believe you receive before you see the answer?",
      "How persistent are you in prayer when answers do not come quickly?"
    ],
    prayer: "Lord, teach me to pray prevailing prayer. Help me to be specific, to believe, to pray in Jesus' name, to submit to Thy will, and to persist until the answer comes. Amen."
  }
];

// John Newton's Letters (Public Domain, 18th Century)
const lettersOfNewtonLessons: StudyLesson[] = [
  {
    id: 1,
    title: "Letter 1: On the Grace That Saved Me",
    content: "Amazing grace, how sweet the sound, that saved a wretch like me! I once was lost, but now am found; was blind, but now I see.\n\nI was a slave trader, dealing in human misery for profit. I blasphemed God. I lived in open wickedness. If ever a man deserved hell, it was I.\n\nBut God, who is rich in mercy, reached down into my pit and lifted me out. He did not save me because I was seeking Him; I was running from Him. He saved me by His sovereign grace alone.\n\nThis is my testimony: I am a great sinner, and Christ is a great Savior. The worse your sin, the more glorious His grace appears in saving you.\n\nDo not despair of God's mercy. If He could save John Newton, He can save anyone. His arm is not shortened. His grace is not diminished. Come to Him as you are, and He will receive you.",
    verse: "1 Timothy 1:15",
    verseText: "This is a faithful saying, and worthy of all acceptation, that Christ Jesus came into the world to save sinners; of whom I am chief.",
    reflection: [
      "What does your own story of grace look like?",
      "Why does Newton call himself a 'great sinner'?",
      "How does the depth of our sin magnify the greatness of God's grace?"
    ],
    prayer: "Lord Jesus, I am a sinner, but Thou art a Savior. I come to Thee as I am. Receive me by Thy grace. Let me never forget where Thou hast brought me from. Amen."
  },
  {
    id: 2,
    title: "Letter 2: On Growth in Grace",
    content: "The Christian life is a journey, not a destination. We are pilgrims, pressing on toward the celestial city. Do not be discouraged that you have not yet arrived.\n\nI compare the growth of a believer to the stages of a voyage. First there is the beginning—leaving the port of our old life, setting sail for the new. Then the middle passage—often stormy, often calm, always moving forward. Finally the end—entering the harbor of glory.\n\nMany young Christians are troubled because they do not feel as holy as they wish to be. But feeling and being are different things. You may be making more progress than you know.\n\nThe marks of growth are not always what we expect. Sometimes growing in grace means growing in awareness of our sin. The closer we get to the light, the more we see our dirt.\n\nPress on. Do not grow weary. The One who began a good work in you will bring it to completion.",
    verse: "Philippians 1:6",
    verseText: "Being confident of this very thing, that he which hath begun a good work in you will perform it until the day of Jesus Christ.",
    reflection: [
      "At what stage of the voyage do you find yourself?",
      "How has growing in grace also meant growing in awareness of sin?",
      "What encouragement do you take from the promise that God will complete His work?"
    ],
    prayer: "Lord, I am on the voyage. Sometimes it is stormy, sometimes calm. Help me to press on and not grow weary. Complete the good work Thou hast begun in me. Amen."
  },
  {
    id: 3,
    title: "Letter 3: On Communion with God",
    content: "The great business of life is communion with God. All else is secondary. If we have fellowship with Him, we can bear anything. If we lose fellowship with Him, nothing else can satisfy.\n\nThis communion is not a matter of feeling always. Sometimes God seems far away, though He is near. We walk by faith, not by sight—and not by feeling either.\n\nThe means of communion are simple: prayer, the Word, worship, obedience. Through these ordinary channels, extraordinary grace flows.\n\nDo not neglect the means. Many complain of dryness who have abandoned the very practices that bring life. Return to the basics. Open your Bible. Get on your knees.\n\nAnd remember: communion is two-way. We speak to God; He speaks to us. We love Him; He loves us. It is not mere meditation but relationship—the most wonderful relationship possible.",
    verse: "1 John 1:3",
    verseText: "That which we have seen and heard declare we unto you, that ye also may have fellowship with us: and truly our fellowship is with the Father, and with his Son Jesus Christ.",
    reflection: [
      "What practices help you maintain communion with God?",
      "Have you confused communion with feelings?",
      "How can you deepen your two-way relationship with God?"
    ],
    prayer: "Father, I want fellowship with Thee. Help me not to neglect the means of grace. When Thou seemest far, let me walk by faith. Deepen my communion with Thee day by day. Amen."
  }
];

// Samuel Rutherford's Letters (Public Domain, 17th Century)
const lettersOfRutherfordLessons: StudyLesson[] = [
  {
    id: 1,
    title: "Letter 1: Christ's Loveliness",
    content: "Oh, if ye knew Him, and saw His beauty, your love, your heart, your desires would close with Him and cleave to Him! Love, love—Christ is the well of love, and His love passeth knowledge.\n\nI have been in the depths, in prison for my Lord's sake. But I would not exchange my prison and my Christ for the palace and all the world. He visits me here. He is sweeter than honey.\n\nI have seen Him, and I cannot now part from Him. He has ravished my heart. No one is like my Beloved. He is altogether lovely.\n\nDo you know Him? Not know about Him, but know Him—as a lover knows the beloved? This is the knowledge that matters. This is the pearl of great price.\n\nSeek Him. Seek Him until you find Him. And when you find Him, hold Him and do not let Him go. He is worth infinitely more than all you leave behind.",
    verse: "Song of Solomon 5:16",
    verseText: "His mouth is most sweet: yea, he is altogether lovely. This is my beloved, and this is my friend, O daughters of Jerusalem.",
    reflection: [
      "Do you know Christ, or only know about Him?",
      "What does it mean that Christ is 'altogether lovely'?",
      "What would you give up to have more of Christ?"
    ],
    prayer: "Lord Jesus, Thou art altogether lovely. Ravish my heart with Thyself. Let me know Thee, not just about Thee. Let me love Thee more than anything this world can offer. Amen."
  },
  {
    id: 2,
    title: "Letter 2: The Sweetness of Suffering",
    content: "I find crosses, losses, and sadness sweeter, when Christ is there, than a full table without His presence. Give me suffering with Christ over comfort without Him.\n\nMy imprisonment has taught me this: the cross is not my enemy but my friend. It drives me to Christ. It strips away false comforts. It shows me what really matters.\n\nDo not pray for easy lives. Pray to be strong men and women. The furnace refines the gold. The pruning brings forth fruit. The trial produces patience.\n\nI am more thankful for my afflictions than for all my comforts. In comfort I was prone to wander. In affliction I cling to Christ.\n\nIf you are suffering, take heart. Christ is nearest when the night is darkest. He does His best work in the furnace. Trust Him there.",
    verse: "Romans 8:28",
    verseText: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
    reflection: [
      "Can you say that suffering with Christ is sweeter than comfort without Him?",
      "How has affliction driven you closer to Christ?",
      "What good has God worked through your trials?"
    ],
    prayer: "Lord, make my crosses sweet because Thou art in them. Let affliction drive me to Thee rather than from Thee. Do Thy refining work. I trust Thee in the furnace. Amen."
  },
  {
    id: 3,
    title: "Letter 3: Longing for Heaven",
    content: "Oh, to be beyond the sea! Oh, to be where there is no more sin, no more sorrow, no more parting! The Lamb is there, and we shall see His face.\n\nThis world is not my home. I am a stranger here, a pilgrim passing through. My citizenship is in heaven. My heart is already there.\n\nI long for that day when faith shall become sight. When we shall know as we are known. When every tear shall be wiped away.\n\nBut while I wait, I serve. While I long, I labor. The hope of heaven does not make me idle on earth. It makes me earnest—for the night is coming when no man can work.\n\nKeep your eyes on the prize. Run the race set before you. Press toward the mark. Soon, very soon, we shall be at home with our Lord forever.",
    verse: "Philippians 1:23",
    verseText: "For I am in a strait betwixt two, having a desire to depart, and to be with Christ; which is far better.",
    reflection: [
      "Do you long for heaven, or are you too comfortable on earth?",
      "How does the hope of heaven affect your life on earth?",
      "What do you most look forward to about being with Christ?"
    ],
    prayer: "Lord, I long to be with Thee forever. This world is not my home. But while I wait, help me to serve. Keep my eyes on the prize until I reach the goal. Amen."
  }
];

// Map study IDs to their lesson sets
const studyLessonsMap: Record<string, StudyLesson[]> = {
  "abide-in-christ": abideInChristLessons,
  "morning-and-evening": morningAndEveningLessons,
  "power-through-prayer": powerThroughPrayerLessons,
  "all-of-grace": allOfGraceLessons,
  "waiting-on-god": waitingOnGodLessons,
  "humility": humilityLessons,
  "absolute-surrender": absoluteSurrenderLessons,
  "with-christ-school-of-prayer": withChristSchoolOfPrayerLessons,
  "treasury-of-david": treasuryOfDavidLessons,
  "purpose-in-prayer": purposeInPrayerLessons,
  "weapon-of-prayer": weaponOfPrayerLessons,
  "imitation-of-christ": imitationOfChristLessons,
  "practice-presence-of-god": practicePresenceOfGodLessons,
  "pilgrims-progress": pilgrimsProgressLessons,
  "christians-secret-happy-life": christiansSecretHappyLifeLessons,
  "answers-to-prayer": answersToPrayerLessons,
  "how-to-pray": howToPrayLessons,
  "union-and-communion": unionAndCommunionLessons,
  "my-utmost-for-his-highest": myUtmostLessons,
  "attributes-of-god": attributesOfGodLessons,
  "christian-counsel": christianCounselLessons,
  "experiencing-depths": experiencingDepthsLessons,
  "serious-call": seriousCallLessons,
  "religious-affections": religiousAffectionsLessons,
  "way-to-god": wayToGodLessons,
  "christian-perfection": christianPerfectionLessons,
  "confessions": confessionsLessons,
  "lectures-on-revival": lecturesOnRevivalLessons,
  "letters-of-newton": lettersOfNewtonLessons,
  "letters-of-rutherford": lettersOfRutherfordLessons
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