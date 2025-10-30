import { db } from './db.js';
import { devotionals, type InsertDevotional } from '../shared/schema.js';

// Sample 7-day devotional content for MEN
const menDevotionals: InsertDevotional[] = [
  {
    dayNumber: 1,
    gender: 'men',
    language: 'en',
    title: 'Walk in Strength',
    mainScripture: 'Joshua 1:9',
    mainScriptureText: 'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.',
    devotionalContent: `God calls men to be strong and courageous. But this strength isn't about physical power or bravado - it's about spiritual fortitude rooted in God's presence.\n\nJoshua faced an impossible task: leading God's people into the Promised Land after Moses' death. The weight of responsibility was crushing. Yet God didn't say "be strong because you are capable." He said "be strong because I am with you."\n\nToday's world tells men to be self-reliant, to never show weakness, to always have the answers. But God's calling is different. He calls you to be strong in Him, to draw courage from His presence, not your abilities.\n\nWhat makes you afraid today? A difficult decision at work? Uncertainty about providing for your family? Relational conflict? God doesn't minimize these fears. Instead, He promises His presence in the midst of them.\n\nTrue masculine strength is admitting when you need God's help and stepping forward anyway. It's leading your family spiritually even when you don't have all the answers. It's choosing integrity when compromise seems easier.\n\nYou don't have to be strong enough - you just need to be close enough to the One who is.`,
    supportingVerse1: 'Psalm 28:7',
    supportingVerse1Text: 'The LORD is my strength and my shield; my heart trusts in him, and he helps me. My heart leaps for joy, and with my song I praise him.',
    supportingVerse2: 'Ephesians 6:10',
    supportingVerse2Text: 'Finally, be strong in the Lord and in his mighty power.',
  },
  {
    dayNumber: 2,
    gender: 'men',
    language: 'en',
    title: 'Lead with Love',
    mainScripture: 'Ephesians 5:25',
    mainScriptureText: 'Husbands, love your wives, just as Christ loved the church and gave himself up for her.',
    devotionalContent: `Christ's love for the church sets the standard for how men should love. This isn't passive affection or romantic feelings that come and go. This is sacrificial, intentional, self-giving love.\n\nJesus didn't wait for the church to be perfect before loving her. He loved us while we were still sinners, broken and rebellious. He served us, sacrificed for us, and continues to pursue us daily.\n\nWhether you're married, single, dating, or a father, God calls you to this same pattern of love. To lead by serving. To protect by sacrificing. To build others up rather than tearing them down.\n\nIn marriage, this means putting your wife's needs above your own desires. It means listening when you'd rather be heard. Serving when you'd rather be served. Leading spiritually by example, not by force.\n\nAs a father, it means showing up consistently, even when you're tired. Disciplining with grace, not anger. Speaking words that build confidence, not shame.\n\nAs a single man, it means honoring women with your words, your eyes, and your actions. Treating every woman as a sister worthy of respect.\n\nChrist-like love isn't weakness - it's the most powerful force in the universe. When you love like Jesus, you transform lives.`,
    supportingVerse1: '1 Corinthians 13:4-7',
    supportingVerse1Text: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs.',
    supportingVerse2: '1 John 3:18',
    supportingVerse2Text: 'Dear children, let us not love with words or speech but with actions and in truth.',
  },
  {
    dayNumber: 3,
    gender: 'men',
    language: 'en',
    title: 'Guard Your Heart',
    mainScripture: 'Proverbs 4:23',
    mainScriptureText: 'Above all else, guard your heart, for everything you do flows from it.',
    devotionalContent: `What enters your heart determines what exits your life. Your thoughts, your habits, your entertainment choices - they're not neutral. They shape who you become.\n\nKing Solomon, despite his wisdom, failed to guard his heart. His compromises with foreign women and their gods eventually led him away from the God he once loved passionately. His story is a warning: no man is immune to spiritual drift.\n\nWhat are you allowing into your heart? What shows are you watching? What websites are you visiting? What conversations are you having? These aren't legalistic rules - they're protective boundaries.\n\nYour heart is the wellspring of your life. Pollute it, and everything downstream suffers: your relationship with God, your marriage, your parenting, your work, your friendships.\n\nGuarding your heart means being intentional about what you consume. It means setting boundaries with technology. It means choosing accountability over secrecy. It means fleeing temptation rather than flirting with it.\n\nIt also means filling your heart with what is good. Time in Scripture. Worship. Prayer. Fellowship with other men who challenge you to grow. These aren't obligations - they're life-giving practices that fortify your soul.\n\nYou can't coast spiritually. Either you're intentionally guarding your heart, or you're drifting toward compromise.`,
    supportingVerse1: 'Philippians 4:8',
    supportingVerse1Text: 'Finally, brothers and sisters, whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable - if anything is excellent or praiseworthy - think about such things.',
    supportingVerse2: 'Matthew 6:21',
    supportingVerse2Text: 'For where your treasure is, there your heart will be also.',
  },
  {
    dayNumber: 4,
    gender: 'men',
    language: 'en',
    title: 'Work with Purpose',
    mainScripture: 'Colossians 3:23',
    mainScriptureText: 'Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.',
    devotionalContent: `Your work matters to God. Whether you're in a boardroom or a construction site, behind a computer or a steering wheel, God cares about how you work and why you work.\n\nToo often, men compartmentalize faith and work. Church is for Sunday; work is just about a paycheck. But Scripture says your work is an act of worship when done for God's glory.\n\nThis changes everything. Excellence isn't about impressing your boss - it's about honoring God. Integrity isn't about following company policy - it's about reflecting God's character. Service isn't about climbing the ladder - it's about building God's kingdom.\n\nPaul wrote these words to slaves, people with no career advancement, no benefits, no choice in their work. Yet even they could work "for the Lord." If slaves could find purpose in their labor, how much more can we?\n\nYour job is not your identity, but it is your mission field. The way you speak to coworkers, the honesty in your dealings, the quality of your work - these are testimonies more powerful than words.\n\nAnd when work is frustrating, exhausting, or feels meaningless, remember: you're not ultimately working for a paycheck, a promotion, or recognition. You're working for an audience of One who sees every effort and promises reward.`,
    supportingVerse1: 'Proverbs 22:29',
    supportingVerse1Text: 'Do you see someone skilled in their work? They will serve before kings; they will not serve before officials of low rank.',
    supportingVerse2: '1 Corinthians 10:31',
    supportingVerse2Text: 'So whether you eat or drink or whatever you do, do it all for the glory of God.',
  },
  {
    dayNumber: 5,
    gender: 'men',
    language: 'en',
    title: 'Battle Your Giants',
    mainScripture: '1 Samuel 17:45',
    mainScriptureText: 'David said to the Philistine, "You come against me with sword and spear and javelin, but I come against you in the name of the LORD Almighty, the God of the armies of Israel, whom you have defied."',
    devotionalContent: `Every man faces giants. Not literal nine-foot warriors, but obstacles that seem insurmountable. Addiction. Fear. Financial pressure. Broken relationships. Past failures that haunt you.\n\nThe Israelite army saw Goliath and thought, "He's too big to fight." David saw Goliath and thought, "He's too big to miss." The difference? David remembered who fought beside him.\n\nYour giant may be taunting you today, making you feel inadequate and afraid. It may have defeated you before. It may seem impossible to overcome. But God specializes in impossible victories.\n\nDavid didn't defeat Goliath because he was strong, skilled, or experienced. He won because he trusted in God's strength. His confidence wasn't in his slingshot - it was in his Savior.\n\nWhat giant are you facing? Name it. Don't minimize it, but don't magnify it either. Instead, magnify God. Remember His past faithfulness. Recall the battles He's already won in your life.\n\nThen step forward in faith. Not recklessly, but boldly. Not in your strength, but in His power. God doesn't call you to defeat your giant alone - He calls you to trust Him while He defeats it through you.\n\nThe victory is already won. You just need the courage to step onto the battlefield.`,
    supportingVerse1: 'Romans 8:37',
    supportingVerse1Text: 'No, in all these things we are more than conquerors through him who loved us.',
    supportingVerse2: 'Philippians 4:13',
    supportingVerse2Text: 'I can do all this through him who gives me strength.',
  },
  {
    dayNumber: 6,
    gender: 'men',
    language: 'en',
    title: 'Stand in Integrity',
    mainScripture: 'Proverbs 10:9',
    mainScriptureText: 'Whoever walks in integrity walks securely, but whoever takes crooked paths will be found out.',
    devotionalContent: `Integrity is doing the right thing even when no one is watching. It's who you are in private, not just who you appear to be in public.\n\nIn a world of shortcuts, corner-cutting, and "everyone does it," God calls men to a higher standard. Your character in the dark determines your impact in the light.\n\nIntegrity starts with small choices. Telling the truth even when a lie is easier. Keeping promises even when they become inconvenient. Honoring commitments even when no one would know if you didn't.\n\nThese small choices compound. A man who cheats on his expense report will eventually cheat on his wife. A man who lies about small things will lie about big things. Character isn't built in crisis - it's revealed.\n\nBut here's the promise: integrity brings security. When you walk in truth, you don't have to remember your lies. You don't have to fear being exposed. You can sleep with a clear conscience.\n\nYes, integrity may cost you in the short term. You might lose a deal, miss a promotion, or face criticism. But compromise always costs more in the long run.\n\nBe the man who can be trusted. Let your yes be yes and your no be no. Build a reputation that your children can be proud of and your God is honored by.`,
    supportingVerse1: 'Psalm 15:1-2',
    supportingVerse1Text: 'LORD, who may dwell in your sacred tent? Who may live on your holy mountain? The one whose walk is blameless, who does what is righteous, who speaks the truth from their heart.',
    supportingVerse2: 'Proverbs 11:3',
    supportingVerse2Text: 'The integrity of the upright guides them, but the unfaithful are destroyed by their duplicity.',
  },
  {
    dayNumber: 7,
    gender: 'men',
    language: 'en',
    title: 'Rest in God',
    mainScripture: 'Matthew 11:28',
    mainScriptureText: 'Come to me, all you who are weary and burdened, and I will give you rest.',
    devotionalContent: `Men are wired to provide, protect, and perform. These aren't bad instincts - they're God-given. But they can also drive us to exhaustion, anxiety, and burnout when we forget that we're not God.\n\nJesus' invitation to rest isn't an invitation to laziness. It's an invitation to dependence. To lay down the weight of trying to be enough, do enough, achieve enough on your own.\n\nYou carry burdens God never asked you to carry. The burden of being the perfect father. The perfect husband. The perfect provider. The perfect leader. These expectations - whether self-imposed or placed on you by others - are crushing.\n\nGod doesn't demand perfection. He offers partnership. He doesn't expect you to have all the answers. He wants you to bring your questions to Him.\n\nRest doesn't just mean physical sleep (though you might need that too). It means spiritual surrender. Releasing control. Trusting that God is God and you are not.\n\nIt means Sabbath - setting aside time to simply be with God, not to perform for Him. It means prayer that's honest, not polished. It means admitting weakness, not projecting strength.\n\nThe strongest thing you can do today is rest in God's strength instead of striving in your own. Bring Him your burdens. All of them. He can handle them.`,
    supportingVerse1: 'Psalm 46:10',
    supportingVerse1Text: 'Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.',
    supportingVerse2: 'Isaiah 40:31',
    supportingVerse2Text: 'But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.',
  },
];

// Sample 7-day devotional content for WOMEN
const womenDevotionals: InsertDevotional[] = [
  {
    dayNumber: 1,
    gender: 'women',
    language: 'en',
    title: 'You Are Chosen',
    mainScripture: '1 Peter 2:9',
    mainScriptureText: 'But you are a chosen people, a royal priesthood, a holy nation, God\'s special possession, that you may declare the praises of him who called you out of darkness into his wonderful light.',
    devotionalContent: `Before you were born, God chose you. Not because of anything you would do or achieve, but simply because He delighted in you.\n\nThe world measures your worth by productivity, appearance, accomplishments, or roles. But God's love isn't earned - it's given freely. You are chosen not for what you do, but for who you are: His beloved daughter.\n\nPeter writes to people who felt insignificant, overlooked, and powerless. Yet he reminds them of their true identity: chosen, royal, holy, special. These aren't aspirational goals - they're present realities for everyone in Christ.\n\nYou don't have to prove your worth to God. You don't have to earn your place at His table. You don't have to compete for His attention or affection. You are already chosen.\n\nThis truth transforms how you see yourself and others. When you know you're chosen, you don't need to compare yourself to other women. You don't need to conform to the world's standards. You don't need to perform for approval.\n\nToday, whatever feelings of inadequacy whisper in your ear, silence them with this truth: God chose you. Before the foundation of the world, He decided you were worth dying for. That's not just theology - that's your identity.`,
    supportingVerse1: 'Ephesians 1:4',
    supportingVerse1Text: 'For he chose us in him before the creation of the world to be holy and blameless in his sight.',
    supportingVerse2: 'Zephaniah 3:17',
    supportingVerse2Text: 'The LORD your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.',
  },
  {
    dayNumber: 2,
    gender: 'women',
    language: 'en',
    title: 'Embrace Your Influence',
    mainScripture: 'Proverbs 31:26',
    mainScriptureText: 'She speaks with wisdom, and faithful instruction is on her tongue.',
    devotionalContent: `Your words carry weight. Your influence matters. Whether you realize it or not, people are watching how you live, listening to what you say, and learning from your example.\n\nThe Proverbs 31 woman isn't a impossible standard to achieve - she's an example of wisdom lived out. Her influence isn't about perfection; it's about speaking truth with grace and living with integrity.\n\nYou influence your children by how you respond to stress. You influence your friends by how you speak about others. You influence your workplace by how you handle conflict. You influence your community by how you love your neighbors.\n\nSome women feel their influence is too small to matter. "I'm just a mom." "I'm just in an entry-level position." "I don't have a large platform." But God doesn't measure influence by numbers or titles.\n\nMary influenced the world by saying "yes" to God in a stable. Ruth influenced history by showing loyalty to her mother-in-law. Esther influenced a nation by courageously speaking up. None of them had fame or power - they just had faithfulness.\n\nYour sphere of influence is exactly where God has placed you. Don't despise it. Don't wish for someone else's platform. Steward the influence you have with wisdom, grace, and faithfulness.\n\nEvery conversation is an opportunity to speak life. Every relationship is a chance to reflect Christ's love. Your influence matters.`,
    supportingVerse1: 'Titus 2:3-4',
    supportingVerse1Text: 'Likewise, teach the older women to be reverent in the way they live, not to be slanderers or addicted to much wine, but to teach what is good. Then they can urge the younger women to love their husbands and children.',
    supportingVerse2: 'Colossians 4:6',
    supportingVerse2Text: 'Let your conversation be always full of grace, seasoned with salt, so that you may know how to answer everyone.',
  },
  {
    dayNumber: 3,
    gender: 'women',
    language: 'en',
    title: 'Find Rest in His Presence',
    mainScripture: 'Psalm 46:10',
    mainScriptureText: 'Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.',
    devotionalContent: `When was the last time you were truly still? Not just physically idle, but mentally quiet, emotionally settled, spiritually at rest?\n\nWomen often carry invisible burdens: mental load of managing households, emotional labor of caring for others, constant awareness of a thousand details. Rest feels like a luxury you can't afford.\n\nBut God commands stillness. Not as a suggestion for when life slows down, but as a necessity for spiritual health. "Be still" isn't passive - it's an active choice to stop striving and start trusting.\n\nBeing still means releasing your grip on control. It means admitting you can't do everything, be everything, fix everything. It means trusting that God is God even when your to-do list isn't finished.\n\nThis stillness isn't about achieving perfect peace or eliminating responsibilities. It's about cultivating an inner quiet even in outer chaos. It's finding God's presence in the midst of demands, not just in the absence of them.\n\nPractically, this might mean saying no to good things to protect space for the best thing: time with God. It might mean waking early for quiet before the house stirs. It might mean turning off your phone to truly pray.\n\nIn stillness, you remember who God is. You reconnect with what truly matters. You receive strength to continue. Don't neglect this soul-sustaining practice.`,
    supportingVerse1: 'Psalm 62:5',
    supportingVerse1Text: 'Yes, my soul, find rest in God; my hope comes from him.',
    supportingVerse2: 'Matthew 11:28',
    supportingVerse2Text: 'Come to me, all you who are weary and burdened, and I will give you rest.',
  },
  {
    dayNumber: 4,
    gender: 'women',
    language: 'en',
    title: 'Guard Your Heart',
    mainScripture: 'Proverbs 4:23',
    mainScriptureText: 'Above all else, guard your heart, for everything you do flows from it.',
    devotionalContent: `What you allow into your heart shapes who you become. Your thoughts, your media consumption, your relationships, your inner dialogue - these aren't neutral. They're forming you.\n\nGuarding your heart doesn't mean building walls or becoming hard. It means being intentional about what you allow to influence you. It's protective, not paranoid.\n\nWhat voices are you listening to? Social media influencers? Comparison-inducing content? Gossip-filled conversations? Or God's Word, trusted mentors, and life-giving friendships?\n\nYour heart is the source of your life. When it's filled with bitterness, everything you touch becomes bitter. When it's filled with anxiety, peace eludes you. When it's filled with God's truth, life flows freely.\n\nGuarding your heart means setting boundaries with toxic relationships. It means limiting exposure to content that stirs discontentment. It means choosing truth over lies, especially the lies you tell yourself.\n\nIt also means filling your heart with what is good. Scripture. Worship. Prayer. Community with women who challenge you to grow. These practices don't add to your burden - they lighten it.\n\nYou can't control everything that comes your way, but you can control what stays. Be ruthless in protecting your heart, and generous in filling it with God's truth.`,
    supportingVerse1: 'Philippians 4:8',
    supportingVerse1Text: 'Finally, sisters, whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable - if anything is excellent or praiseworthy - think about such things.',
    supportingVerse2: 'Psalm 119:11',
    supportingVerse2Text: 'I have hidden your word in my heart that I might not sin against you.',
  },
  {
    dayNumber: 5,
    gender: 'women',
    language: 'en',
    title: 'Speak Life',
    mainScripture: 'Proverbs 18:21',
    mainScriptureText: 'The tongue has the power of life and death, and those who love it will eat its fruit.',
    devotionalContent: `Your words create worlds. They build up or tear down. They speak life or death. They heal or wound. And you will experience the fruit of what you speak.\n\nJames says the tongue is a small part of the body that makes great boasts, like a tiny rudder steering a massive ship. Your words set the direction of your life and the lives of those around you.\n\nHow do you speak about yourself? Do you rehearse failures or celebrate growth? Do you focus on flaws or acknowledge strengths? Self-deprecating humor might seem harmless, but words repeated become beliefs internalized.\n\nHow do you speak about your husband? Your children? Your friends? Do you build them up in public and private, or do you vent frustrations and criticize freely? Your words shape not just how others see them, but how they see themselves.\n\nHow do you speak about others in their absence? Gossip feels bonding, but it's poison. It destroys trust, damages reputations, and reveals more about your heart than theirs.\n\nThe good news: you can change your speech today. You can choose blessing over cursing, encouragement over criticism, truth over gossip. You can speak words that bring life.\n\nBefore you speak, pause and ask: Is it true? Is it necessary? Is it kind? Let these filters guard your tongue, and watch life flourish.`,
    supportingVerse1: 'Ephesians 4:29',
    supportingVerse1Text: 'Do not let any unwholesome talk come out of your mouths, but only what is helpful for building others up according to their needs, that it may benefit those who listen.',
    supportingVerse2: 'Proverbs 16:24',
    supportingVerse2Text: 'Gracious words are a honeycomb, sweet to the soul and healing to the bones.',
  },
  {
    dayNumber: 6,
    gender: 'women',
    language: 'en',
    title: 'Trust in Uncertainty',
    mainScripture: 'Proverbs 3:5-6',
    mainScriptureText: 'Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
    devotionalContent: `Uncertainty feels unbearable. Waiting for test results. Wondering about job security. Worrying about a child. Facing an unclear future. You want answers, clarity, control - and God asks you to trust.\n\nTrusting God doesn't mean understanding His plan. It means believing His character even when His ways are mysterious. It means surrendering your need to know for the peace of resting in the One who knows.\n\nLeaning on your own understanding is exhausting. You analyze every angle, consider every outcome, play out every scenario. But human wisdom has limits, and anxiety fills the gaps.\n\nGod doesn't promise to explain everything. He promises to guide you. Not to reveal the full path, but to light the next step. Not to eliminate uncertainty, but to walk through it with you.\n\nSubmitting to God in all your ways means bringing Him every decision, every fear, every question. It means seeking His wisdom in Scripture and prayer. It means listening to His voice through trusted counsel.\n\nAnd here's the promise: He will make your paths straight. Not necessarily smooth or easy, but directed. He will guide you where you need to go.\n\nYou don't need to have it all figured out. You just need to trust the One who does.`,
    supportingVerse1: 'Isaiah 26:3',
    supportingVerse1Text: 'You will keep in perfect peace those whose minds are steadfast, because they trust in you.',
    supportingVerse2: 'Jeremiah 29:11',
    supportingVerse2Text: 'For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.',
  },
  {
    dayNumber: 7,
    gender: 'women',
    language: 'en',
    title: 'Clothe Yourself in Strength',
    mainScripture: 'Proverbs 31:25',
    mainScriptureText: 'She is clothed with strength and dignity; she can laugh at the days to come.',
    devotionalContent: `Strength isn't something you muster up - it's something you put on. Like clothing, it's external to you but covers you completely. And its source is God.\n\nThe Proverbs 31 woman laughs at the future not because she's naive about challenges, but because she's confident in God's faithfulness. Her strength isn't self-generated; it's God-given.\n\nYou face real fears about the future. Financial concerns. Health worries. Relational unknowns. Aging parents. Growing children. The weight of it all can feel crushing.\n\nBut strength and dignity aren't earned through perfect circumstances - they're gifts from a perfect God. You clothe yourself in them daily through prayer, through Scripture, through worship, through community.\n\nThis strength allows you to face hardship without despair. To encounter disappointment without bitterness. To walk through valleys without losing hope. Not because you're strong, but because your God is.\n\nDignity means knowing your worth isn't determined by your circumstances, your appearance, your productivity, or others' opinions. You are valuable because you are God's daughter.\n\nWhen you're clothed in God's strength and dignity, you can laugh at the days to come. Not flippantly, but confidently. Not because you know what will happen, but because you know who holds the future.\n\nPut on strength today. It's waiting for you in God's presence.`,
    supportingVerse1: 'Isaiah 40:31',
    supportingVerse1Text: 'But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.',
    supportingVerse2: 'Ephesians 6:10',
    supportingVerse2Text: 'Finally, be strong in the Lord and in his mighty power.',
  },
];

async function seedDevotionals() {
  console.log('🌱 Starting devotional seed...');
  
  try {
    // Seed men's devotionals
    console.log('📖 Seeding men\'s devotionals (7 days)...');
    for (const devotional of menDevotionals) {
      await db.insert(devotionals).values(devotional).onConflictDoNothing();
    }
    
    // Seed women's devotionals
    console.log('📖 Seeding women\'s devotionals (7 days)...');
    for (const devotional of womenDevotionals) {
      await db.insert(devotionals).values(devotional).onConflictDoNothing();
    }
    
    console.log('✅ Devotional seed complete!');
    console.log('📊 Sample devotionals created:');
    console.log('   - Men: 7 days');
    console.log('   - Women: 7 days');
    console.log('\n⚠️  NOTE: This is sample content. You will need to add the remaining 358 days for each gender (716 total devotionals) to complete the 365-day devotional system.');
    
  } catch (error) {
    console.error('❌ Error seeding devotionals:', error);
    throw error;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDevotionals()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { seedDevotionals };
