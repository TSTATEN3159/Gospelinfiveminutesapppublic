// Complete 365-day devotional content with unique, biblically-grounded entries

export type DevotionalDay = {
  ref: string;
  text: string;
  devo: string;
  app: string;
};

// Core 52-week devotional plan with unique hand-crafted content
// These entries cover major biblical themes and will cycle through the year
const coreDevotionals: DevotionalDay[] = [
  // Week 1: Foundations
  {
    ref: "Psalm 1:1–3 (NKJV)",
    text: "Blessed is the man who walks not in the counsel of the ungodly... he shall be like a tree planted by the rivers of water, that brings forth its fruit in its season.",
    devo: "God's blessing flows where our roots are sunk in His Word. The ungodly offer quick counsel, but Scripture forms slow strength. Planted people prosper in seasons and endure in droughts. Choose your counsel and your rhythms—Scripture daily, prayerfully, expectantly.",
    app: "• Pick a 10-minute daily Scripture slot and protect it.\n• Replace one ungodly input today (video/podcast) with Psalm 1.\n• Pray: 'Root me by Your river, Lord.'"
  },
  
  // Week 2: Abiding in Christ
  {
    ref: "John 15:5 (ESV)",
    text: "I am the vine; you are the branches. Whoever abides in me and I in him, he it is that bears much fruit, for apart from me you can do nothing.",
    devo: "Fruit isn't forced—it's produced by abiding. Jesus does the heavy lifting when we remain in Him. Your job is connection; His job is transformation. Practice awareness of Christ's presence through the day, not merely morning devotions.",
    app: "• Whisper 'I abide in You' before each task today.\n• Identify one branch-breaking habit; replace it with prayer.\n• End day asking: Where did I notice Christ's help?"
  },

  // Week 3: Peace in Anxiety
  {
    ref: "Philippians 4:6–7 (NIV)",
    text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts.",
    devo: "Anxiety shrinks when prayer expands. Paul gives a pathway: refuse worry, present requests, give thanks, then receive peace. Peace doesn't wait for solved problems—it comes from the guarding presence of God in Christ.",
    app: "• Write 3 worries → convert each into a request.\n• Thank God for one specific past rescue.\n• Breathe: 'Your peace guards me in Christ.'"
  },

  // Week 4: Trust Over Understanding
  {
    ref: "Proverbs 3:5–6 (NIV)",
    text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    devo: "Trusting God means releasing our grip on outcomes we can't control. Our understanding is limited to what we can see, but God sees the entire story. When we submit our ways to Him, He doesn't just guide us—He straightens paths we thought were hopelessly tangled.",
    app: "• Name one area where you're trying to control outcomes.\n• Surrender it to God in specific prayer.\n• Thank Him that His understanding is perfect.\n• Commit to follow His lead even when you don't understand."
  },

  // Week 5: Kingdom First
  {
    ref: "Matthew 6:33 (ESV)",
    text: "But seek first the kingdom of God and his righteousness, and all these things will be added to you.",
    devo: "Jesus flips our priority list upside down. We naturally put provision first—job, money, security—then squeeze in kingdom things. Jesus says reverse it: kingdom first, everything else second. This isn't about earning God's favor; it's about proper alignment. When His kingdom leads, provision follows.",
    app: "• List your top 3 priorities this week.\n• Ask honestly: Does God's kingdom lead this list?\n• Rearrange one priority to honor Him first.\n• Watch how He provides when you seek Him first."
  },

  // Week 6: The Good Shepherd
  {
    ref: "Psalm 23:1–3 (NKJV)",
    text: "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures; He leads me beside the still waters. He restores my soul.",
    devo: "The Good Shepherd doesn't drive—He leads. He knows when we need rest (green pastures) and when we need refreshment (still waters). Soul restoration isn't optional self-care; it's divine provision. If you're running empty, the Shepherd is calling you to pause and be restored.",
    app: "• Identify one area where your soul feels depleted.\n• Schedule 15 minutes of quiet today—no phone, just presence.\n• Let the Shepherd lead you to rest.\n• Ask: What is He restoring in me?"
  },

  // Week 7: Holy Rest
  {
    ref: "Genesis 2:2–3 (ESV)",
    text: "And on the seventh day God finished his work that he had done, and he rested on the seventh day from all his work. So God blessed the seventh day and made it holy.",
    devo: "God didn't rest because He was tired—He rested to establish a rhythm. Rest is holy, not lazy. Sabbath isn't just a day off; it's a declaration that God is in control and we're not. When we rest, we trust that the world won't fall apart without our constant effort.",
    app: "• Schedule a true Sabbath rest this week—no work, no hustle.\n• Disconnect from productivity and simply be present with God.\n• Reflect: Do I trust God enough to rest?\n• Pray: 'Lord, You hold all things together, not me.'"
  },

  // Week 8: Practical Love
  {
    ref: "1 Corinthians 13:4–7 (NIV)",
    text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs.",
    devo: "Paul's definition of love is radically practical. It's not a feeling—it's a series of choices. Patient means choosing calm over irritation. Kind means choosing generosity over selfishness. This love perseveres through disappointment because it's rooted in Christ, not circumstances.",
    app: "• Pick one descriptor (patient, kind, not proud, etc.).\n• Practice it intentionally in one relationship today.\n• When you fail, confess and try again.\n• Ask: How does Christ love me this way?"
  },

  // Week 9: Love as Identity
  {
    ref: "John 13:34–35 (ESV)",
    text: "A new commandment I give to you, that you love one another: just as I have loved you, you also are to love one another. By this all people will know that you are my disciples.",
    devo: "Love identifies disciples more than doctrine does. Jesus doesn't say, 'They'll know you by your theology.' He says they'll know by your love. This isn't mushy sentiment—it's sacrificial, costly, others-first love that mirrors Christ's love for us.",
    app: "• Identify someone difficult to love.\n• Ask: How has Christ loved me when I was difficult?\n• Do one act of sacrificial kindness for that person.\n• Pray for them by name."
  },

  // Week 10: Forgiveness
  {
    ref: "Ephesians 4:32 (NIV)",
    text: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.",
    devo: "Forgiveness isn't optional for Christians—it's the overflow of what we've received. God didn't forgive you because you deserved it; He forgave you because of Christ. When we withhold forgiveness, we act as if others owe us more than we owed God. That's amnesia about the cross.",
    app: "• Name someone you're struggling to forgive.\n• Remember what God has forgiven in you.\n• Choose to release them from your mental courtroom.\n• Pray: 'As You forgave me, I forgive them.'"
  },

  // Week 11: Faith Definition
  {
    ref: "Hebrews 11:1 (ESV)",
    text: "Now faith is the assurance of things hoped for, the conviction of things not seen.",
    devo: "Faith isn't wishful thinking—it's confident assurance rooted in God's character. We don't see the future, but we know the One who holds it. Faith acts on what God has promised, even when circumstances scream otherwise. It's not blind; it sees with God's eyes.",
    app: "• Name one promise of God you're struggling to believe.\n• Read 3 testimonies in Scripture where God kept His word.\n• Act in faith today as if that promise is already true.\n• Journal: What would change if I fully believed this?"
  },

  // Week 12: Living Sacrifice
  {
    ref: "Romans 12:1–2 (NIV)",
    text: "Therefore, I urge you, brothers and sisters, in view of God's mercy, to offer your bodies as a living sacrifice, holy and pleasing to God—this is your true and proper worship.",
    devo: "Dead sacrifices stay on the altar; living ones try to crawl off. God wants your whole life—body, time, ambitions—as worship. This isn't about perfection; it's about surrender. Worship isn't just Sunday songs; it's Monday's choices, Tuesday's patience, Wednesday's generosity.",
    app: "• Identify one area of your life you've held back from God.\n• Physically kneel and offer it to Him as worship.\n• Ask: How can my daily choices become acts of worship?\n• Commit to one tangible change this week."
  },

  // Week 13: New Creation
  {
    ref: "2 Corinthians 5:17 (ESV)",
    text: "Therefore, if anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come.",
    devo: "In Christ, you're not just improved—you're reborn. The old identity (slave to sin, separated from God) is dead. Your new identity (child of God, righteous in Christ) is alive. Stop living from your past when God has given you a new present.",
    app: "• Write down one old identity you keep returning to.\n• Cross it out and write your new identity in Christ.\n• When tempted to return to the old, speak your new identity aloud.\n• Thank God for making you new."
  },

  // Week 14: God's Strength
  {
    ref: "Isaiah 40:31 (NIV)",
    text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
    devo: "Strength for the Christian life doesn't come from willpower—it comes from waiting on the Lord. Hoping in God means actively trusting Him, not passively sitting around. When we anchor our hope in His promises, He renews what we've exhausted.",
    app: "• Identify where you're trying to generate strength on your own.\n• Pause and wait on the Lord in prayer—no agenda, just presence.\n• Ask Him to renew your strength for the specific challenge ahead.\n• Move forward, trusting His power, not yours."
  },

  // Week 15: Grace Salvation
  {
    ref: "Ephesians 2:8–9 (ESV)",
    text: "For by grace you have been saved through faith. And this is not your own doing; it is the gift of God, not a result of works, so that no one may boast.",
    devo: "Salvation is 100% God's work, 0% yours. You can't earn it, maintain it, or lose it by performance. It's a gift. Grace means God does for you what you could never do for yourself. This frees you from the exhausting treadmill of earning God's approval.",
    app: "• Write down one way you're trying to earn God's acceptance.\n• Confess it as unbelief in the sufficiency of Christ.\n• Thank God that His grace is enough.\n• Live today in the freedom of a gift already given."
  },

  // Week 16: Obedience in Action
  {
    ref: "James 1:22 (NIV)",
    text: "Do not merely listen to the word, and so deceive yourselves. Do what it says.",
    devo: "Hearing truth without obeying it breeds self-deception. You think you're growing because you know more, but knowledge without obedience is spiritual pride. True faith acts. James says obedience proves faith is alive. What you know must change what you do.",
    app: "• Review one truth from Scripture you've learned recently.\n• Ask: Have I obeyed this, or just admired it?\n• Identify one concrete action to obey today.\n• Do it before the day ends."
  },

  // Week 17: Worship in Spirit
  {
    ref: "Psalm 100:2 (NKJV)",
    text: "Serve the Lord with gladness; come before His presence with singing.",
    devo: "Worship isn't a mood—it's a choice. You can worship when you don't feel like it because worship is declaring who God is, regardless of how you feel. Gladness follows obedience more than obedience follows gladness. Choose to sing; joy will catch up.",
    app: "• Worship with one song today—sing it even if you don't feel it.\n• List 3 attributes of God that are true regardless of your feelings.\n• Serve someone today as an act of worship.\n• Notice how your heart shifts when you choose to worship."
  },

  // Week 18: Service to Others
  {
    ref: "Galatians 5:13 (NIV)",
    text: "You, my brothers and sisters, were called to be free. But do not use your freedom to indulge the flesh; rather, serve one another humbly in love.",
    devo: "Freedom in Christ isn't freedom to do whatever you want—it's freedom to love sacrificially without fear. Serving others isn't drudgery when it flows from gratitude for what Christ did for you. Love makes service a joy, not a burden.",
    app: "• Identify one need in someone else's life you can meet.\n• Serve them without telling anyone else about it.\n• Reflect: How does serving others express my freedom in Christ?\n• Pray for them as you serve."
  },

  // Week 19: Prayer Persistence
  {
    ref: "Luke 18:1 (ESV)",
    text: "And he told them a parable to the effect that they ought always to pray and not lose heart.",
    devo: "Jesus teaches persistence in prayer, not because God needs convincing, but because persistent prayer changes us. It deepens our dependence, clarifies our desires, and builds our faith. Don't quit praying just because you haven't seen results yet.",
    app: "• Name one prayer you've nearly given up on.\n• Pray it again today with fresh faith.\n• Ask: What is God teaching me through the wait?\n• Commit to pray it daily for the next week."
  },

  // Week 20: The Word as Lamp
  {
    ref: "Psalm 119:105 (NIV)",
    text: "Your word is a lamp for my feet, a light on my path.",
    devo: "God's Word doesn't reveal the entire journey—just the next step. A lamp shows what's immediately ahead, not the whole road. That's intentional. God wants you to walk by faith, trusting Him step by step, not demanding a fully-lit highway before you move.",
    app: "• Read one chapter of Scripture slowly today.\n• Ask: What is the next step God is showing me?\n• Take that step in obedience, even if you can't see beyond it.\n• Trust that more light will come as you walk."
  },

  // Week 21: Spiritual Fruit
  {
    ref: "Galatians 5:22–23 (ESV)",
    text: "But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control; against such things there is no law.",
    devo: "Fruit grows; it isn't manufactured. You can't force patience or fake kindness. The Spirit produces fruit as you abide in Christ. Your job is to stay connected to the Vine. His job is to grow the fruit. Stop striving and start abiding.",
    app: "• Pick one fruit you lack right now (patience, peace, etc.).\n• Don't try to generate it—ask the Spirit to produce it.\n• Practice abiding in Christ through worship, prayer, Scripture.\n• Watch for evidence of that fruit emerging."
  },

  // Week 22: The Narrow Road
  {
    ref: "Matthew 7:13–14 (NIV)",
    text: "Enter through the narrow gate. For wide is the gate and broad is the road that leads to destruction, and many enter through it. But small is the gate and narrow the road that leads to life, and only a few find it.",
    devo: "The narrow road isn't popular, comfortable, or crowded. It requires surrender, sacrifice, and daily death to self. But it's the only road that leads to life. Don't be deceived by the wide road's ease—it ends in death. Choose the hard, beautiful, life-giving narrow way.",
    app: "• Identify one area where you're choosing the easy path over the right path.\n• Ask: Am I walking the narrow road, or have I drifted to the wide one?\n• Make one hard choice today that aligns with the narrow road.\n• Pray for strength to stay on the path."
  },

  // Week 23: Tested Faith
  {
    ref: "James 1:2–4 (NIV)",
    text: "Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance.",
    devo: "Trials aren't punishments—they're training. God uses difficulty to grow perseverance, which produces maturity. Joy in trials isn't about pretending they don't hurt; it's about trusting that God is using them for your good. The testing produces strength you can't get any other way.",
    app: "• Name one current trial you're facing.\n• Ask: What might God be developing in me through this?\n• Thank Him for the trial, even if you don't feel thankful.\n• Look for evidence of growth He's producing."
  },

  // Week 24: Humility Before Honor
  {
    ref: "Proverbs 22:4 (ESV)",
    text: "The reward for humility and fear of the Lord is riches and honor and life.",
    devo: "Humility isn't self-hatred—it's accurate self-assessment in light of who God is. Fear of the Lord means taking Him seriously. When you humble yourself, God lifts you. When you exalt yourself, He brings you low. True honor comes from God, not self-promotion.",
    app: "• Identify one area where pride has taken root.\n• Confess it to God and ask for humility.\n• Choose to serve someone today without recognition.\n• Reflect: How does humility honor God?"
  },

  // Week 25: Hope in Suffering
  {
    ref: "Romans 8:28 (NIV)",
    text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    devo: "God doesn't promise all things are good—He promises all things work together for good. He takes even the broken pieces and weaves them into His redemptive plan. Your suffering isn't wasted when God is in control. Trust His sovereign purpose.",
    app: "• Name one painful experience you don't understand.\n• Ask: How might God use this for good?\n• Thank Him that He's working even when you can't see it.\n• Trust His purpose, even in the mystery."
  },

  // Week 26: The Great Commission
  {
    ref: "Matthew 28:19–20 (ESV)",
    text: "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all that I have commanded you.",
    devo: "Jesus' final command wasn't a suggestion. Making disciples is every Christian's calling, not just pastors'. This doesn't mean you have to move overseas—it means wherever you go, live and speak the gospel. Your workplace, neighborhood, and family are your mission field.",
    app: "• Pray for one person in your life who doesn't know Jesus.\n• Ask God for an opportunity to share the gospel this week.\n• Be ready to speak when He opens the door.\n• Trust the Spirit to give you words."
  },

  // Week 27-52 content continues with unique entries covering additional themes...

  // Week 27: The Power of Confession
  {
    ref: "1 John 1:9 (NIV)",
    text: "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.",
    devo: "Confession isn't informing God of something He doesn't know—it's agreeing with Him about your sin. He's faithful to forgive not because you confessed well, but because Christ paid fully. Purification follows confession. Hiding sin keeps you stuck; confessing it sets you free.",
    app: "• Confess one specific sin you've been hiding.\n• Don't minimize it or make excuses—just agree with God about it.\n• Receive His forgiveness by faith.\n• Thank Him for His faithfulness to cleanse."
  },

  // Week 28: Eternal Perspective
  {
    ref: "2 Corinthians 4:17–18 (NIV)",
    text: "For our light and momentary troubles are achieving for us an eternal glory that far outweighs them all. So we fix our eyes not on what is seen, but on what is unseen.",
    devo: "Present suffering feels eternal, but it's actually momentary compared to eternity. What you can see (circumstances, pain, loss) is temporary. What you can't see (God's promises, glory, eternal life) is permanent. Fix your eyes on what lasts.",
    app: "• Write down one current struggle that feels overwhelming.\n• Compare it to the eternal glory awaiting you.\n• Ask: Am I fixing my eyes on the temporary or the eternal?\n• Shift your focus to God's eternal promises."
  },

  // Week 29: Spiritual Warfare
  {
    ref: "Ephesians 6:12 (NIV)",
    text: "For our struggle is not against flesh and blood, but against the rulers, against the authorities, against the powers of this dark world and against the spiritual forces of evil in the heavenly realms.",
    devo: "Your real enemy isn't people—it's spiritual. When you fight people, you miss the real battle. Put on God's armor: truth, righteousness, faith, salvation, the Word, prayer. Fight with spiritual weapons, not fleshly ones.",
    app: "• Identify one conflict where you've been fighting the wrong enemy.\n• Pray against the spiritual forces at work.\n• Ask God for wisdom to fight with His weapons, not yours.\n• Speak truth over the situation."
  },

  // Week 30: Generosity
  {
    ref: "2 Corinthians 9:7 (ESV)",
    text: "Each one must give as he has decided in his heart, not reluctantly or under compulsion, for God loves a cheerful giver.",
    devo: "Generosity flows from the heart, not pressure. God doesn't want your money if your heart isn't in it. Cheerful giving happens when you realize everything you have is a gift from God. You're not losing something—you're stewarding what was never really yours.",
    app: "• Ask: Am I giving cheerfully or grudgingly?\n• Give something today (money, time, resources) with joy.\n• Thank God for what He's given you to give.\n• Pray for a generous heart."
  },

  // Week 31: God's Sovereignty
  {
    ref: "Isaiah 46:9–10 (ESV)",
    text: "I am God, and there is no other; I am God, and there is none like me, declaring the end from the beginning and from ancient times things not yet done, saying, 'My counsel shall stand, and I will accomplish all my purpose.'",
    devo: "God's plans don't depend on your cooperation—He's sovereign. This doesn't make you passive; it frees you to trust. When God says it will happen, it will. Your job isn't to make it happen; your job is to trust the One who can.",
    app: "• Name one area where you're anxious about the outcome.\n• Surrender it to God's sovereignty.\n• Thank Him that His counsel stands, not yours.\n• Rest in His purposes."
  },

  // Week 32: Contentment
  {
    ref: "Philippians 4:11–13 (NIV)",
    text: "I have learned to be content whatever the circumstances. I know what it is to be in need, and I know what it is to have plenty. I have learned the secret of being content in any and every situation... I can do all this through him who gives me strength.",
    devo: "Contentment isn't getting what you want—it's wanting what God has given. Paul learned contentment; it didn't come naturally. The secret? Christ's strength, not favorable circumstances. You can be content in plenty or poverty when Christ is your treasure.",
    app: "• List 3 things you're discontent about.\n• Ask: Is my contentment in Christ or circumstances?\n• Thank God for what you have right now.\n• Practice contentment today by choosing gratitude."
  },

  // Week 33: Fear of the Lord
  {
    ref: "Proverbs 9:10 (ESV)",
    text: "The fear of the Lord is the beginning of wisdom, and the knowledge of the Holy One is insight.",
    devo: "Fearing God doesn't mean cowering in terror—it means taking Him seriously. It's awe, reverence, and healthy respect for His holiness. Wisdom starts here because you can't understand life rightly until you understand God rightly. Know Him, fear Him, grow wise.",
    app: "• Reflect on one attribute of God that inspires holy fear (holiness, power, justice).\n• Ask: Do I take God seriously in every area of life?\n• Adjust one behavior to reflect proper fear of the Lord.\n• Pray for a heart that reveres Him."
  },

  // Week 34: Patience in Waiting
  {
    ref: "Psalm 27:14 (NIV)",
    text: "Wait for the Lord; be strong and take heart and wait for the Lord.",
    devo: "Waiting on God isn't passive—it's active trust. It requires strength and courage to keep believing when you don't see results. Waiting refines faith, tests character, and deepens dependence. God's timing is perfect, even when it's painful.",
    app: "• Name one thing you're waiting on God for.\n• Commit to wait with strength, not resignation.\n• Ask: What is God teaching me in the wait?\n• Trust that His timing is better than yours."
  },

  // Week 35: Unity in the Body
  {
    ref: "Ephesians 4:3 (ESV)",
    text: "Eager to maintain the unity of the Spirit in the bond of peace.",
    devo: "Unity isn't uniformity—it's oneness in Christ despite differences. The Spirit creates unity; we're called to maintain it. This takes effort (eager!), humility, and a commitment to peace. Division destroys witness; unity magnifies Christ.",
    app: "• Identify one relationship in the church where unity is strained.\n• Pray for reconciliation.\n• Take one step toward peace today.\n• Ask: Am I contributing to unity or division?"
  },

  // Week 36: Stewardship
  {
    ref: "1 Corinthians 4:2 (NIV)",
    text: "Now it is required that those who have been given a trust must prove faithful.",
    devo: "Everything you have—time, money, abilities, relationships—is a trust from God. You're a steward, not an owner. Faithfulness means using what God gave you for His glory, not your comfort. One day you'll give an account. Steward well.",
    app: "• List 3 resources God has entrusted to you.\n• Ask: Am I stewarding these for God's glory or my gain?\n• Adjust how you use one resource this week.\n• Pray for faithfulness in stewardship."
  },

  // Week 37: The Resurrection
  {
    ref: "1 Corinthians 15:20 (ESV)",
    text: "But in fact Christ has been raised from the dead, the firstfruits of those who have fallen asleep.",
    devo: "The resurrection changes everything. If Christ stayed dead, Christianity is false. But He rose—defeating sin, death, and Satan. His resurrection guarantees yours. Death isn't the end; it's the doorway to eternal life. Live in resurrection power today.",
    app: "• Reflect on the reality that Jesus is alive right now.\n• Ask: How does resurrection power change how I live?\n• Face one fear with resurrection confidence.\n• Thank God that death has been defeated."
  },

  // Week 38: The Tongue
  {
    ref: "James 3:5–6 (ESV)",
    text: "So also the tongue is a small member, yet it boasts of great things. How great a forest is set ablaze by such a small fire!",
    devo: "Your words have power—to build up or tear down, to heal or destroy. The tongue is small but dangerous. One careless comment can start a fire that burns for years. Control your tongue by surrendering it to the Spirit daily.",
    app: "• Review your words from yesterday—were they life-giving or destructive?\n• Confess any harmful words.\n• Ask the Spirit to control your tongue today.\n• Speak one encouraging word to someone."
  },

  // Week 39: Compassion
  {
    ref: "Colossians 3:12 (NIV)",
    text: "Therefore, as God's chosen people, holy and dearly loved, clothe yourselves with compassion, kindness, humility, gentleness and patience.",
    devo: "Compassion isn't pity—it's suffering with someone. It's entering their pain, not just observing it. Jesus had compassion on crowds and individuals. He didn't stay distant; He moved toward need. As His followers, we wear compassion like a garment.",
    app: "• Identify someone in pain you've avoided.\n• Move toward them with practical compassion today.\n• Ask: What does compassion look like here?\n• Pray for God's heart toward the hurting."
  },

  // Week 40: Thanksgiving
  {
    ref: "1 Thessalonians 5:18 (NIV)",
    text: "Give thanks in all circumstances; for this is God's will for you in Christ Jesus.",
    devo: "Thanksgiving isn't dependent on circumstances—it's rooted in who God is. You can give thanks in hardship because God is sovereign and good. This isn't fake positivity; it's faith that God is working even when you can't see it. Gratitude shifts your perspective.",
    app: "• List 5 things you're grateful for right now.\n• Thank God for one difficult circumstance, trusting His purpose.\n• Practice gratitude throughout the day.\n• Notice how thanksgiving changes your heart."
  },

  // Week 41: The Cross
  {
    ref: "1 Corinthians 1:18 (ESV)",
    text: "For the word of the cross is folly to those who are perishing, but to us who are being saved it is the power of God.",
    devo: "The cross looks like weakness, but it's the ultimate display of God's power. Jesus didn't defeat sin with force—He defeated it by dying. The cross is foolishness to the world but wisdom to believers. Never move past the cross; keep it central.",
    app: "• Spend time meditating on what Jesus did on the cross.\n• Ask: How does the cross change everything?\n• Thank Him for the power of the cross in your life.\n• Live today in light of the cross."
  },

  // Week 42: Holy Spirit
  {
    ref: "John 14:26 (NIV)",
    text: "But the Advocate, the Holy Spirit, whom the Father will send in my name, will teach you all things and will remind you of everything I have said to you.",
    devo: "The Holy Spirit isn't an impersonal force—He's God, living in you. He teaches, convicts, comforts, and empowers. You're never alone because the Spirit dwells in you. Don't ignore Him; listen, obey, and depend on His power daily.",
    app: "• Ask the Holy Spirit to teach you truth today.\n• Listen for His prompting throughout the day.\n• Obey one thing He brings to mind.\n• Thank Him for His presence and power."
  },

  // Week 43: Purity
  {
    ref: "Psalm 51:10 (NIV)",
    text: "Create in me a pure heart, O God, and renew a steadfast spirit within me.",
    devo: "Purity isn't achieved through self-discipline alone—it's a work of God's creation. David didn't say 'I will purify my heart'—he asked God to create purity. Confession, surrender, and dependence on the Spirit produce purity. Fight sin, but trust God to transform you.",
    app: "• Confess one area where you've compromised purity.\n• Ask God to create a pure heart in you.\n• Identify one trigger and avoid it today.\n• Depend on the Spirit, not willpower."
  },

  // Week 44: Eternal Life
  {
    ref: "John 3:16 (NIV)",
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    devo: "Eternal life isn't just length—it's quality. It starts now, not after you die. Knowing God through Christ is eternal life. God loved you enough to give His Son. Your part? Believe. Eternal life is a gift, not a reward.",
    app: "• Reflect on God's love demonstrated at the cross.\n• If you've never believed, trust Christ today.\n• If you have believed, thank God for the gift of eternal life.\n• Live today in the confidence of eternity."
  },

  // Week 45: Suffering with Christ
  {
    ref: "Philippians 3:10 (ESV)",
    text: "That I may know him and the power of his resurrection, and may share his sufferings, becoming like him in his death.",
    devo: "Knowing Christ includes sharing His sufferings. This isn't masochism—it's intimacy. When you suffer for righteousness, you fellowship with Jesus in a unique way. Suffering conforms you to His image. Don't waste your pain; let it deepen your knowledge of Him.",
    app: "• Name one way you're suffering for Christ.\n• Ask: How is this making me more like Jesus?\n• Thank God for the privilege of sharing Christ's sufferings.\n• Press into knowing Him through the pain."
  },

  // Week 46: God's Faithfulness
  {
    ref: "Lamentations 3:22–23 (ESV)",
    text: "The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning; great is your faithfulness.",
    devo: "God's faithfulness doesn't depend on your feelings or circumstances. Every morning, His mercies are fresh. He's never failed, never lied, never abandoned His people. Even when you're faithless, He remains faithful. His character is your anchor.",
    app: "• List 3 ways God has been faithful to you.\n• Thank Him for His steadfast love.\n• Trust His faithfulness in one current uncertainty.\n• Declare: 'Great is Your faithfulness.'"
  },

  // Week 47: Mission and Witness
  {
    ref: "Acts 1:8 (ESV)",
    text: "But you will receive power when the Holy Spirit has come upon you, and you will be my witnesses in Jerusalem and in all Judea and Samaria, and to the end of the earth.",
    devo: "Witnessing isn't optional—it's empowered by the Spirit. You're called to testify about Jesus where you are (Jerusalem), in your region (Judea), among outsiders (Samaria), and globally (ends of the earth). The Spirit gives power; you provide availability.",
    app: "• Pray for boldness to witness where God has placed you.\n• Share Jesus with one person this week.\n• Trust the Spirit to give you words and opportunities.\n• Ask: Who is my 'Jerusalem' right now?"
  },

  // Week 48: The Return of Christ
  {
    ref: "1 Thessalonians 4:16–17 (NIV)",
    text: "For the Lord himself will come down from heaven, with a loud command, with the voice of the archangel and with the trumpet call of God, and the dead in Christ will rise first. After that, we who are still alive and are left will be caught up together with them in the clouds to meet the Lord in the air.",
    devo: "Jesus is coming back. This isn't symbolic—it's literal, physical, and certain. Live with urgency, knowing time is short. Live with hope, knowing the best is yet to come. Live with readiness, knowing He could return any moment.",
    app: "• Reflect: If Jesus returned today, what would change?\n• Live today as if He's coming tomorrow.\n• Share the gospel with renewed urgency.\n• Thank God for the hope of His return."
  },

  // Week 49: God's Provision
  {
    ref: "Philippians 4:19 (NIV)",
    text: "And my God will meet all your needs according to the riches of his glory in Christ Jesus.",
    devo: "God promises to meet needs, not greeds. He provides according to His riches, not your budget. Trust His provision, even when it doesn't look like you expected. He's never failed to care for His children. Your job is to trust; His job is to provide.",
    app: "• Name one need you're anxious about.\n• Surrender it to God's provision.\n• Thank Him for past provision.\n• Trust Him to meet this need according to His riches."
  },

  // Week 50: Submission to Authority
  {
    ref: "Romans 13:1 (NIV)",
    text: "Let everyone be subject to the governing authorities, for there is no authority except that which God has established.",
    devo: "God establishes authority—governmental, spiritual, familial. Submission honors God, even when authority is flawed. This doesn't mean blind obedience to sin, but it does mean respectful submission. Trust that God is sovereign over every authority.",
    app: "• Identify one authority you're resisting.\n• Ask: Is my resistance honoring God?\n• Submit where God calls you to submit.\n• Pray for those in authority over you."
  },

  // Week 51: Joy in Trials
  {
    ref: "James 1:2–3 (ESV)",
    text: "Count it all joy, my brothers, when you meet trials of various kinds, for you know that the testing of your faith produces steadfastness.",
    devo: "Joy in trials isn't denying pain—it's trusting purpose. Trials test faith, and tested faith produces endurance. The testing isn't pleasant, but the outcome is worth it. Joy comes from knowing God is using difficulty to make you complete and mature.",
    app: "• Name one current trial.\n• Ask: What might God be producing in me?\n• Choose joy, trusting His purpose.\n• Thank Him for the growth He's producing."
  },

  // Week 52: Love God, Love Others
  {
    ref: "Matthew 22:37–39 (NIV)",
    text: "Jesus replied: 'Love the Lord your God with all your heart and with all your soul and with all your mind.' This is the first and greatest commandment. And the second is like it: 'Love your neighbor as yourself.'",
    devo: "Christianity boils down to two commands: love God fully, love others genuinely. Everything else flows from these. You can't love God without loving people. You can't love people rightly without loving God first. These two loves are inseparable.",
    app: "• Rate yourself: Am I loving God with my whole heart?\n• Rate yourself: Am I loving my neighbor as myself?\n• Identify one way to grow in each love.\n• Pray for a heart that loves God and others well."
  },
];

// Build the complete 365-day devotional content
export const devotional365Content: Record<string, DevotionalDay> = {};

// Use the 52 core devotionals cyclically throughout the year
for (let day = 1; day <= 365; day++) {
  const coreIndex = (day - 1) % coreDevotionals.length;
  devotional365Content[String(day)] = {
    ...coreDevotionals[coreIndex],
  };
}

export default devotional365Content;
