export interface TopicData {
  topic: string;
  verses: { 
    ref: string;
    text: string;
  }[];
}

export const BIBLE_TOPICS: TopicData[] = [
  {
    topic: "Kingdom of God",
    verses: [
      { ref: "Matthew 6:33", text: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you." },
      { ref: "Romans 14:17", text: "For the kingdom of God is not meat and drink; but righteousness, and peace, and joy in the Holy Ghost." },
      { ref: "Luke 17:20-21", text: "The kingdom of God cometh not with observation: Neither shall they say, Lo here! or, lo there! for, behold, the kingdom of God is within you." },
      { ref: "Mark 1:15", text: "The time is fulfilled, and the kingdom of God is at hand: repent ye, and believe the gospel." },
      { ref: "John 3:3", text: "Except a man be born again, he cannot see the kingdom of God." },
    ]
  },
  {
    topic: "Salvation",
    verses: [
      { ref: "Ephesians 2:8-9", text: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast." },
      { ref: "Romans 10:9", text: "That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved." },
      { ref: "Acts 4:12", text: "Neither is there salvation in any other: for there is none other name under heaven given among men, whereby we must be saved." },
      { ref: "John 3:16", text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life." },
      { ref: "Titus 3:5", text: "Not by works of righteousness which we have done, but according to his mercy he saved us, by the washing of regeneration, and renewing of the Holy Ghost." },
    ]
  },
  {
    topic: "Faith",
    verses: [
      { ref: "Hebrews 11:1", text: "Now faith is the substance of things hoped for, the evidence of things not seen." },
      { ref: "Romans 10:17", text: "So then faith cometh by hearing, and hearing by the word of God." },
      { ref: "Mark 11:22", text: "And Jesus answering saith unto them, Have faith in God." },
      { ref: "2 Corinthians 5:7", text: "For we walk by faith, not by sight." },
      { ref: "Hebrews 11:6", text: "But without faith it is impossible to please him: for he that cometh to God must believe that he is, and that he is a rewarder of them that diligently seek him." },
    ]
  },
  {
    topic: "Love",
    verses: [
      { ref: "1 Corinthians 13:4-7", text: "Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up, Doth not behave itself unseemly, seeketh not her own, is not easily provoked, thinketh no evil; Rejoiceth not in iniquity, but rejoiceth in the truth; Beareth all things, believeth all things, hopeth all things, endureth all things." },
      { ref: "John 13:34-35", text: "A new commandment I give unto you, That ye love one another; as I have loved you, that ye also love one another. By this shall all men know that ye are my disciples, if ye have love one to another." },
      { ref: "1 John 4:8", text: "He that loveth not knoweth not God; for God is love." },
      { ref: "Romans 13:10", text: "Love worketh no ill to his neighbour: therefore love is the fulfilling of the law." },
      { ref: "Matthew 22:37-39", text: "Jesus said unto him, Thou shalt love the Lord thy God with all thy heart, and with all thy soul, and with all thy mind. This is the first and great commandment. And the second is like unto it, Thou shalt love thy neighbour as thyself." },
    ]
  },
  {
    topic: "Hope",
    verses: [
      { ref: "Jeremiah 29:11", text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end." },
      { ref: "Romans 15:13", text: "Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost." },
      { ref: "Psalm 42:11", text: "Why art thou cast down, O my soul? and why art thou disquieted within me? hope thou in God: for I shall yet praise him, who is the health of my countenance, and my God." },
      { ref: "Hebrews 6:19", text: "Which hope we have as an anchor of the soul, both sure and stedfast, and which entereth into that within the veil." },
      { ref: "Romans 5:5", text: "And hope maketh not ashamed; because the love of God is shed abroad in our hearts by the Holy Ghost which is given unto us." },
    ]
  },
  {
    topic: "Forgiveness",
    verses: [
      { ref: "Colossians 3:13", text: "Forbearing one another, and forgiving one another, if any man have a quarrel against any: even as Christ forgave you, so also do ye." },
      { ref: "Ephesians 4:32", text: "And be ye kind one to another, tenderhearted, forgiving one another, even as God for Christ's sake hath forgiven you." },
      { ref: "1 John 1:9", text: "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness." },
      { ref: "Matthew 6:14-15", text: "For if ye forgive men their trespasses, your heavenly Father will also forgive you: But if ye forgive not men their trespasses, neither will your Father forgive your trespasses." },
      { ref: "Luke 23:34", text: "Then said Jesus, Father, forgive them; for they know not what they do." },
    ]
  },
  {
    topic: "Prayer",
    verses: [
      { ref: "1 Thessalonians 5:17", text: "Pray without ceasing." },
      { ref: "Matthew 6:6", text: "But thou, when thou prayest, enter into thy closet, and when thou hast shut thy door, pray to thy Father which is in secret; and thy Father which seeth in secret shall reward thee openly." },
      { ref: "Philippians 4:6", text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God." },
      { ref: "James 5:16", text: "The effectual fervent prayer of a righteous man availeth much." },
      { ref: "1 John 5:14", text: "And this is the confidence that we have in him, that, if we ask any thing according to his will, he heareth us." },
    ]
  },
  {
    topic: "Holy Spirit",
    verses: [
      { ref: "Acts 1:8", text: "But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth." },
      { ref: "John 14:26", text: "But the Comforter, which is the Holy Ghost, whom the Father will send in my name, he shall teach you all things, and bring all things to your remembrance, whatsoever I have said unto you." },
      { ref: "Romans 8:26", text: "Likewise the Spirit also helpeth our infirmities: for we know not what we should pray for as we ought: but the Spirit itself maketh intercession for us with groanings which cannot be uttered." },
      { ref: "Galatians 5:22-23", text: "But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, Meekness, temperance: against such there is no law." },
      { ref: "1 Corinthians 6:19", text: "What? know ye not that your body is the temple of the Holy Ghost which is in you, which ye have of God, and ye are not your own?" },
    ]
  },
  {
    topic: "Healing",
    verses: [
      { ref: "Isaiah 53:5", text: "But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed." },
      { ref: "Jeremiah 30:17", text: "For I will restore health unto thee, and I will heal thee of thy wounds, saith the LORD." },
      { ref: "Psalm 103:2-3", text: "Bless the LORD, O my soul, and forget not all his benefits: Who forgiveth all thine iniquities; who healeth all thy diseases." },
      { ref: "James 5:14-15", text: "Is any sick among you? let him call for the elders of the church; and let them pray over him, anointing him with oil in the name of the Lord: And the prayer of faith shall save the sick, and the Lord shall raise him up." },
      { ref: "Exodus 15:26", text: "I am the LORD that healeth thee." },
    ]
  },
  {
    topic: "Courage",
    verses: [
      { ref: "Joshua 1:9", text: "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest." },
      { ref: "Deuteronomy 31:6", text: "Be strong and of a good courage, fear not, nor be afraid of them: for the LORD thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee." },
      { ref: "Psalm 27:14", text: "Wait on the LORD: be of good courage, and he shall strengthen thine heart: wait, I say, on the LORD." },
      { ref: "2 Timothy 1:7", text: "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind." },
      { ref: "Isaiah 41:10", text: "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness." },
    ]
  },
  {
    topic: "Strength",
    verses: [
      { ref: "Philippians 4:13", text: "I can do all things through Christ which strengtheneth me." },
      { ref: "Isaiah 40:31", text: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint." },
      { ref: "Psalm 46:1", text: "God is our refuge and strength, a very present help in trouble." },
      { ref: "Nehemiah 8:10", text: "For the joy of the LORD is your strength." },
      { ref: "2 Corinthians 12:9", text: "And he said unto me, My grace is sufficient for thee: for my strength is made perfect in weakness." },
    ]
  },
  {
    topic: "Peace",
    verses: [
      { ref: "Philippians 4:7", text: "And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus." },
      { ref: "John 14:27", text: "Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid." },
      { ref: "Isaiah 26:3", text: "Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee." },
      { ref: "Romans 5:1", text: "Therefore being justified by faith, we have peace with God through our Lord Jesus Christ." },
      { ref: "Colossians 3:15", text: "And let the peace of God rule in your hearts, to the which also ye are called in one body; and be ye thankful." },
    ]
  },
  {
    topic: "Joy",
    verses: [
      { ref: "Nehemiah 8:10", text: "The joy of the LORD is your strength." },
      { ref: "Psalm 16:11", text: "Thou wilt shew me the path of life: in thy presence is fulness of joy; at thy right hand there are pleasures for evermore." },
      { ref: "John 15:11", text: "These things have I spoken unto you, that my joy might remain in you, and that your joy might be full." },
      { ref: "Romans 15:13", text: "Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost." },
      { ref: "Galatians 5:22", text: "But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith." },
    ]
  },
  {
    topic: "Spiritual Warfare",
    verses: [
      { ref: "Ephesians 6:11-13", text: "Put on the whole armour of God, that ye may be able to stand against the wiles of the devil. For we wrestle not against flesh and blood, but against principalities, against powers, against the rulers of the darkness of this world, against spiritual wickedness in high places. Wherefore take unto you the whole armour of God, that ye may be able to withstand in the evil day, and having done all, to stand." },
      { ref: "2 Corinthians 10:4", text: "For the weapons of our warfare are not carnal, but mighty through God to the pulling down of strong holds." },
      { ref: "James 4:7", text: "Submit yourselves therefore to God. Resist the devil, and he will flee from you." },
      { ref: "1 Peter 5:8", text: "Be sober, be vigilant; because your adversary the devil, as a roaring lion, walketh about, seeking whom he may devour." },
      { ref: "Romans 8:37", text: "Nay, in all these things we are more than conquerors through him that loved us." },
    ]
  },
  {
    topic: "Wisdom",
    verses: [
      { ref: "James 1:5", text: "If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him." },
      { ref: "Proverbs 9:10", text: "The fear of the LORD is the beginning of wisdom: and the knowledge of the holy is understanding." },
      { ref: "Proverbs 3:13", text: "Happy is the man that findeth wisdom, and the man that getteth understanding." },
      { ref: "Colossians 2:3", text: "In whom are hid all the treasures of wisdom and knowledge." },
      { ref: "Proverbs 4:7", text: "Wisdom is the principal thing; therefore get wisdom: and with all thy getting get understanding." },
    ]
  },
  {
    topic: "Trust",
    verses: [
      { ref: "Proverbs 3:5-6", text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths." },
      { ref: "Psalm 37:5", text: "Commit thy way unto the LORD; trust also in him; and he shall bring it to pass." },
      { ref: "Isaiah 26:4", text: "Trust ye in the LORD for ever: for in the LORD JEHOVAH is everlasting strength." },
      { ref: "Nahum 1:7", text: "The LORD is good, a strong hold in the day of trouble; and he knoweth them that trust in him." },
      { ref: "Psalm 56:3", text: "What time I am afraid, I will trust in thee." },
    ]
  },
  {
    topic: "Provision",
    verses: [
      { ref: "Matthew 6:26", text: "Behold the fowls of the air: for they sow not, neither do they reap, nor gather into barns; yet your heavenly Father feedeth them. Are ye not much better than they?" },
      { ref: "Philippians 4:19", text: "But my God shall supply all your need according to his riches in glory by Christ Jesus." },
      { ref: "Psalm 23:1", text: "The LORD is my shepherd; I shall not want." },
      { ref: "Matthew 6:33", text: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you." },
      { ref: "2 Corinthians 9:8", text: "And God is able to make all grace abound toward you; that ye, always having all sufficiency in all things, may abound to every good work." },
    ]
  },
  {
    topic: "Freedom",
    verses: [
      { ref: "John 8:36", text: "If the Son therefore shall make you free, ye shall be free indeed." },
      { ref: "Galatians 5:1", text: "Stand fast therefore in the liberty wherewith Christ hath made us free, and be not entangled again with the yoke of bondage." },
      { ref: "2 Corinthians 3:17", text: "Now the Lord is that Spirit: and where the Spirit of the Lord is, there is liberty." },
      { ref: "Romans 8:2", text: "For the law of the Spirit of life in Christ Jesus hath made me free from the law of sin and death." },
      { ref: "John 8:32", text: "And ye shall know the truth, and the truth shall make you free." },
    ]
  },
  {
    topic: "Humility",
    verses: [
      { ref: "Philippians 2:3", text: "Let nothing be done through strife or vainglory; but in lowliness of mind let each esteem other better than themselves." },
      { ref: "James 4:6", text: "But he giveth more grace. Wherefore he saith, God resisteth the proud, but giveth grace unto the humble." },
      { ref: "1 Peter 5:6", text: "Humble yourselves therefore under the mighty hand of God, that he may exalt you in due time." },
      { ref: "Proverbs 22:4", text: "By humility and the fear of the LORD are riches, and honour, and life." },
      { ref: "Matthew 23:12", text: "And whosoever shall exalt himself shall be abased; and he that shall humble himself shall be exalted." },
    ]
  },
  {
    topic: "Grace",
    verses: [
      { ref: "2 Corinthians 12:9", text: "And he said unto me, My grace is sufficient for thee: for my strength is made perfect in weakness." },
      { ref: "Ephesians 2:8", text: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God." },
      { ref: "Romans 5:20", text: "But where sin abounded, grace did much more abound." },
      { ref: "Titus 2:11", text: "For the grace of God that bringeth salvation hath appeared to all men." },
      { ref: "Hebrews 4:16", text: "Let us therefore come boldly unto the throne of grace, that we may obtain mercy, and find grace to help in time of need." },
    ]
  },
  {
    topic: "Obedience",
    verses: [
      { ref: "John 14:15", text: "If ye love me, keep my commandments." },
      { ref: "1 Samuel 15:22", text: "Behold, to obey is better than sacrifice, and to hearken than the fat of rams." },
      { ref: "James 1:22", text: "But be ye doers of the word, and not hearers only, deceiving your own selves." },
      { ref: "Deuteronomy 11:27", text: "A blessing, if ye obey the commandments of the LORD your God, which I command you this day." },
      { ref: "Acts 5:29", text: "Then Peter and the other apostles answered and said, We ought to obey God rather than men." },
    ]
  },
  {
    topic: "Repentance",
    verses: [
      { ref: "Acts 3:19", text: "Repent ye therefore, and be converted, that your sins may be blotted out, when the times of refreshing shall come from the presence of the Lord." },
      { ref: "2 Chronicles 7:14", text: "If my people, which are called by my name, shall humble themselves, and pray, and seek my face, and turn from their wicked ways; then will I hear from heaven, and will forgive their sin, and will heal their land." },
      { ref: "Luke 13:3", text: "I tell you, Nay: but, except ye repent, ye shall all likewise perish." },
      { ref: "Ezekiel 18:30", text: "Repent, and turn yourselves from all your transgressions; so iniquity shall not be your ruin." },
      { ref: "2 Peter 3:9", text: "The Lord is not slack concerning his promise, as some men count slackness; but is longsuffering to us-ward, not willing that any should perish, but that all should come to repentance." },
    ]
  },
  {
    topic: "Patience",
    verses: [
      { ref: "Romans 12:12", text: "Rejoicing in hope; patient in tribulation; continuing instant in prayer." },
      { ref: "James 1:4", text: "But let patience have her perfect work, that ye may be perfect and entire, wanting nothing." },
      { ref: "Galatians 6:9", text: "And let us not be weary in well doing: for in due season we shall reap, if we faint not." },
      { ref: "Hebrews 10:36", text: "For ye have need of patience, that, after ye have done the will of God, ye might receive the promise." },
      { ref: "Colossians 1:11", text: "Strengthened with all might, according to his glorious power, unto all patience and longsuffering with joyfulness." },
    ]
  },
  {
    topic: "Righteousness",
    verses: [
      { ref: "Matthew 5:6", text: "Blessed are they which do hunger and thirst after righteousness: for they shall be filled." },
      { ref: "Proverbs 21:21", text: "He that followeth after righteousness and mercy findeth life, righteousness, and honour." },
      { ref: "2 Timothy 2:22", text: "Flee also youthful lusts: but follow righteousness, faith, charity, peace, with them that call on the Lord out of a pure heart." },
      { ref: "Romans 6:13", text: "Neither yield ye your members as instruments of unrighteousness unto sin: but yield yourselves unto God, as those that are alive from the dead, and your members as instruments of righteousness unto God." },
      { ref: "Psalm 37:6", text: "And he shall bring forth thy righteousness as the light, and thy judgment as the noonday." },
    ]
  },
  {
    topic: "Thankfulness",
    verses: [
      { ref: "1 Thessalonians 5:18", text: "In every thing give thanks: for this is the will of God in Christ Jesus concerning you." },
      { ref: "Psalm 100:4", text: "Enter into his gates with thanksgiving, and into his courts with praise: be thankful unto him, and bless his name." },
      { ref: "Colossians 3:17", text: "And whatsoever ye do in word or deed, do all in the name of the Lord Jesus, giving thanks to God and the Father by him." },
      { ref: "Philippians 4:6", text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God." },
      { ref: "Ephesians 5:20", text: "Giving thanks always for all things unto God and the Father in the name of our Lord Jesus Christ." },
    ]
  },
  {
    topic: "Eternal Life",
    verses: [
      { ref: "John 3:16", text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life." },
      { ref: "John 10:28", text: "And I give unto them eternal life; and they shall never perish, neither shall any man pluck them out of my hand." },
      { ref: "1 John 5:11-12", text: "And this is the record, that God hath given to us eternal life, and this life is in his Son. He that hath the Son hath life; and he that hath not the Son of God hath not life." },
      { ref: "Romans 6:23", text: "For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord." },
      { ref: "John 17:3", text: "And this is life eternal, that they might know thee the only true God, and Jesus Christ, whom thou hast sent." },
    ]
  },
  {
    topic: "Perseverance",
    verses: [
      { ref: "James 1:12", text: "Blessed is the man that endureth temptation: for when he is tried, he shall receive the crown of life, which the Lord hath promised to them that love him." },
      { ref: "Hebrews 12:1", text: "Wherefore seeing we also are compassed about with so great a cloud of witnesses, let us lay aside every weight, and the sin which doth so easily beset us, and let us run with patience the race that is set before us." },
      { ref: "2 Timothy 4:7", text: "I have fought a good fight, I have finished my course, I have kept the faith." },
      { ref: "Revelation 2:10", text: "Be thou faithful unto death, and I will give thee a crown of life." },
      { ref: "1 Corinthians 9:24", text: "Know ye not that they which run in a race run all, but one receiveth the prize? So run, that ye may obtain." },
    ]
  },
  {
    topic: "Worship",
    verses: [
      { ref: "John 4:24", text: "God is a Spirit: and they that worship him must worship him in spirit and in truth." },
      { ref: "Psalm 95:6", text: "O come, let us worship and bow down: let us kneel before the LORD our maker." },
      { ref: "Revelation 4:11", text: "Thou art worthy, O Lord, to receive glory and honour and power: for thou hast created all things, and for thy pleasure they are and were created." },
      { ref: "Psalm 29:2", text: "Give unto the LORD the glory due unto his name; worship the LORD in the beauty of holiness." },
      { ref: "Romans 12:1", text: "I beseech you therefore, brethren, by the mercies of God, that ye present your bodies a living sacrifice, holy, acceptable unto God, which is your reasonable service." },
    ]
  },
  {
    topic: "Generosity",
    verses: [
      { ref: "2 Corinthians 9:7", text: "Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver." },
      { ref: "Proverbs 11:25", text: "The liberal soul shall be made fat: and he that watereth shall be watered also himself." },
      { ref: "Luke 6:38", text: "Give, and it shall be given unto you; good measure, pressed down, and shaken together, and running over, shall men give into your bosom." },
      { ref: "Acts 20:35", text: "I have shewed you all things, how that so labouring ye ought to support the weak, and to remember the words of the Lord Jesus, how he said, It is more blessed to give than to receive." },
      { ref: "Proverbs 19:17", text: "He that hath pity upon the poor lendeth unto the LORD; and that which he hath given will he pay him again." },
    ]
  },
  {
    topic: "Contentment",
    verses: [
      { ref: "Philippians 4:11-12", text: "Not that I speak in respect of want: for I have learned, in whatsoever state I am, therewith to be content. I know both how to be abased, and I know how to abound: every where and in all things I am instructed both to be full and to be hungry, both to abound and to suffer need." },
      { ref: "1 Timothy 6:6", text: "But godliness with contentment is great gain." },
      { ref: "Hebrews 13:5", text: "Let your conversation be without covetousness; and be content with such things as ye have: for he hath said, I will never leave thee, nor forsake thee." },
      { ref: "Psalm 37:16", text: "A little that a righteous man hath is better than the riches of many wicked." },
      { ref: "Proverbs 15:16", text: "Better is little with the fear of the LORD than great treasure and trouble therewith." },
    ]
  },
  {
    topic: "Guidance",
    verses: [
      { ref: "Psalm 32:8", text: "I will instruct thee and teach thee in the way which thou shalt go: I will guide thee with mine eye." },
      { ref: "Proverbs 3:6", text: "In all thy ways acknowledge him, and he shall direct thy paths." },
      { ref: "Isaiah 58:11", text: "And the LORD shall guide thee continually, and satisfy thy soul in drought, and make fat thy bones: and thou shalt be like a watered garden, and like a spring of water, whose waters fail not." },
      { ref: "Psalm 25:9", text: "The meek will he guide in judgment: and the meek will he teach his way." },
      { ref: "John 16:13", text: "Howbeit when he, the Spirit of truth, is come, he will guide you into all truth." },
    ]
  },
  {
    topic: "Protection",
    verses: [
      { ref: "Psalm 91:11", text: "For he shall give his angels charge over thee, to keep thee in all thy ways." },
      { ref: "Proverbs 18:10", text: "The name of the LORD is a strong tower: the righteous runneth into it, and is safe." },
      { ref: "Psalm 121:7-8", text: "The LORD shall preserve thee from all evil: he shall preserve thy soul. The LORD shall preserve thy going out and thy coming in from this time forth, and even for evermore." },
      { ref: "2 Thessalonians 3:3", text: "But the Lord is faithful, who shall stablish you, and keep you from evil." },
      { ref: "Psalm 34:7", text: "The angel of the LORD encampeth round about them that fear him, and delivereth them." },
    ]
  },
  {
    topic: "Deliverance",
    verses: [
      { ref: "Psalm 34:17", text: "The righteous cry, and the LORD heareth, and delivereth them out of all their troubles." },
      { ref: "2 Timothy 4:18", text: "And the Lord shall deliver me from every evil work, and will preserve me unto his heavenly kingdom." },
      { ref: "Psalm 50:15", text: "And call upon me in the day of trouble: I will deliver thee, and thou shalt glorify me." },
      { ref: "2 Corinthians 1:10", text: "Who delivered us from so great a death, and doth deliver: in whom we trust that he will yet deliver us." },
      { ref: "Psalm 18:2", text: "The LORD is my rock, and my fortress, and my deliverer; my God, my strength, in whom I will trust." },
    ]
  },
  {
    topic: "Victory",
    verses: [
      { ref: "1 Corinthians 15:57", text: "But thanks be to God, which giveth us the victory through our Lord Jesus Christ." },
      { ref: "1 John 5:4", text: "For whatsoever is born of God overcometh the world: and this is the victory that overcometh the world, even our faith." },
      { ref: "Romans 8:37", text: "Nay, in all these things we are more than conquerors through him that loved us." },
      { ref: "2 Corinthians 2:14", text: "Now thanks be unto God, which always causeth us to triumph in Christ." },
      { ref: "Deuteronomy 20:4", text: "For the LORD your God is he that goeth with you, to fight for you against your enemies, to save you." },
    ]
  },
  {
    topic: "Renewal",
    verses: [
      { ref: "2 Corinthians 5:17", text: "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new." },
      { ref: "Romans 12:2", text: "And be not conformed to this world: but be ye transformed by the renewing of your mind." },
      { ref: "Titus 3:5", text: "Not by works of righteousness which we have done, but according to his mercy he saved us, by the washing of regeneration, and renewing of the Holy Ghost." },
      { ref: "Psalm 51:10", text: "Create in me a clean heart, O God; and renew a right spirit within me." },
      { ref: "Lamentations 3:22-23", text: "It is of the LORD'S mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness." },
    ]
  },
  {
    topic: "Unity",
    verses: [
      { ref: "Psalm 133:1", text: "Behold, how good and how pleasant it is for brethren to dwell together in unity!" },
      { ref: "Ephesians 4:3", text: "Endeavouring to keep the unity of the Spirit in the bond of peace." },
      { ref: "1 Corinthians 1:10", text: "Now I beseech you, brethren, by the name of our Lord Jesus Christ, that ye all speak the same thing, and that there be no divisions among you; but that ye be perfectly joined together in the same mind and in the same judgment." },
      { ref: "Colossians 3:14", text: "And above all these things put on charity, which is the bond of perfectness." },
      { ref: "John 17:21", text: "That they all may be one; as thou, Father, art in me, and I in thee, that they also may be one in us: that the world may believe that thou hast sent me." },
    ]
  },
  {
    topic: "Mercy",
    verses: [
      { ref: "Micah 6:8", text: "He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?" },
      { ref: "Matthew 5:7", text: "Blessed are the merciful: for they shall obtain mercy." },
      { ref: "Lamentations 3:22", text: "It is of the LORD'S mercies that we are not consumed, because his compassions fail not." },
      { ref: "Psalm 103:8", text: "The LORD is merciful and gracious, slow to anger, and plenteous in mercy." },
      { ref: "Ephesians 2:4", text: "But God, who is rich in mercy, for his great love wherewith he loved us." },
    ]
  },
  {
    topic: "Discipleship",
    verses: [
      { ref: "Matthew 28:19-20", text: "Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost: Teaching them to observe all things whatsoever I have commanded you." },
      { ref: "Luke 9:23", text: "And he said to them all, If any man will come after me, let him deny himself, and take up his cross daily, and follow me." },
      { ref: "John 8:31", text: "Then said Jesus to those Jews which believed on him, If ye continue in my word, then are ye my disciples indeed." },
      { ref: "Matthew 16:24", text: "Then said Jesus unto his disciples, If any man will come after me, let him deny himself, and take up his cross, and follow me." },
      { ref: "John 15:8", text: "Herein is my Father glorified, that ye bear much fruit; so shall ye be my disciples." },
    ]
  },
  {
    topic: "Holiness",
    verses: [
      { ref: "1 Peter 1:15-16", text: "But as he which hath called you is holy, so be ye holy in all manner of conversation; Because it is written, Be ye holy; for I am holy." },
      { ref: "Hebrews 12:14", text: "Follow peace with all men, and holiness, without which no man shall see the Lord." },
      { ref: "2 Corinthians 7:1", text: "Having therefore these promises, dearly beloved, let us cleanse ourselves from all filthiness of the flesh and spirit, perfecting holiness in the fear of God." },
      { ref: "1 Thessalonians 4:7", text: "For God hath not called us unto uncleanness, but unto holiness." },
      { ref: "Leviticus 20:7", text: "Sanctify yourselves therefore, and be ye holy: for I am the LORD your God." },
    ]
  },
  {
    topic: "Testimony",
    verses: [
      { ref: "1 Peter 3:15", text: "But sanctify the Lord God in your hearts: and be ready always to give an answer to every man that asketh you a reason of the hope that is in you with meekness and fear." },
      { ref: "Mark 16:15", text: "And he said unto them, Go ye into all the world, and preach the gospel to every creature." },
      { ref: "Matthew 5:16", text: "Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven." },
      { ref: "Acts 1:8", text: "But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me." },
      { ref: "Revelation 12:11", text: "And they overcame him by the blood of the Lamb, and by the word of their testimony." },
    ]
  },
  {
    topic: "Tithing and Giving",
    verses: [
      { ref: "Malachi 3:10", text: "Bring ye all the tithes into the storehouse, that there may be meat in mine house, and prove me now herewith, saith the LORD of hosts, if I will not open you the windows of heaven, and pour you out a blessing, that there shall not be room enough to receive it." },
      { ref: "2 Corinthians 9:6", text: "But this I say, He which soweth sparingly shall reap also sparingly; and he which soweth bountifully shall reap also bountifully." },
      { ref: "Luke 6:38", text: "Give, and it shall be given unto you; good measure, pressed down, and shaken together, and running over." },
      { ref: "Proverbs 3:9-10", text: "Honour the LORD with thy substance, and with the firstfruits of all thine increase: So shall thy barns be filled with plenty, and thy presses shall burst out with new wine." },
      { ref: "Matthew 6:21", text: "For where your treasure is, there will your heart be also." },
    ]
  },
  {
    topic: "Marriage",
    verses: [
      { ref: "Ephesians 5:25", text: "Husbands, love your wives, even as Christ also loved the church, and gave himself for it." },
      { ref: "Genesis 2:24", text: "Therefore shall a man leave his father and his mother, and shall cleave unto his wife: and they shall be one flesh." },
      { ref: "1 Corinthians 13:4-7", text: "Charity suffereth long, and is kind; charity envieth not...Beareth all things, believeth all things, hopeth all things, endureth all things." },
      { ref: "Proverbs 18:22", text: "Whoso findeth a wife findeth a good thing, and obtaineth favour of the LORD." },
      { ref: "Hebrews 13:4", text: "Marriage is honourable in all, and the bed undefiled." },
    ]
  },
  {
    topic: "Parenting",
    verses: [
      { ref: "Proverbs 22:6", text: "Train up a child in the way he should go: and when he is old, he will not depart from it." },
      { ref: "Ephesians 6:4", text: "And, ye fathers, provoke not your children to wrath: but bring them up in the nurture and admonition of the Lord." },
      { ref: "Deuteronomy 6:6-7", text: "And these words, which I command thee this day, shall be in thine heart: And thou shalt teach them diligently unto thy children." },
      { ref: "Proverbs 29:17", text: "Correct thy son, and he shall give thee rest; yea, he shall give delight unto thy soul." },
      { ref: "Colossians 3:21", text: "Fathers, provoke not your children to anger, lest they be discouraged." },
    ]
  },
  {
    topic: "Friendship",
    verses: [
      { ref: "Proverbs 17:17", text: "A friend loveth at all times, and a brother is born for adversity." },
      { ref: "Proverbs 27:17", text: "Iron sharpeneth iron; so a man sharpeneth the countenance of his friend." },
      { ref: "John 15:13", text: "Greater love hath no man than this, that a man lay down his life for his friends." },
      { ref: "Proverbs 18:24", text: "A man that hath friends must shew himself friendly: and there is a friend that sticketh closer than a brother." },
      { ref: "Ecclesiastes 4:9-10", text: "Two are better than one; because they have a good reward for their labour. For if they fall, the one will lift up his fellow." },
    ]
  },
];
