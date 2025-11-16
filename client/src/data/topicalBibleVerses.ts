/**
 * Local storage of KJV Bible verses for all topical Bible topics
 * This eliminates API dependency and ensures offline functionality
 */

export interface LocalBibleVerse {
  reference: string;
  text: string;
  version: "KJV";
}

export const TOPICAL_BIBLE_VERSES: Record<string, LocalBibleVerse[]> = {
  "kingdom-of-god": [
    {
      reference: "Matthew 6:33",
      text: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
      version: "KJV"
    },
    {
      reference: "Romans 14:17",
      text: "For the kingdom of God is not meat and drink; but righteousness, and peace, and joy in the Holy Ghost.",
      version: "KJV"
    },
    {
      reference: "Luke 17:20-21",
      text: "And when he was demanded of the Pharisees, when the kingdom of God should come, he answered them and said, The kingdom of God cometh not with observation: Neither shall they say, Lo here! or, lo there! for, behold, the kingdom of God is within you.",
      version: "KJV"
    }
  ],
  "salvation": [
    {
      reference: "John 3:16",
      text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
      version: "KJV"
    },
    {
      reference: "Ephesians 2:8-9",
      text: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.",
      version: "KJV"
    },
    {
      reference: "Romans 10:9-10",
      text: "That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved. For with the heart man believeth unto righteousness; and with the mouth confession is made unto salvation.",
      version: "KJV"
    }
  ],
  "faith": [
    {
      reference: "Hebrews 11:1",
      text: "Now faith is the substance of things hoped for, the evidence of things not seen.",
      version: "KJV"
    },
    {
      reference: "2 Corinthians 5:7",
      text: "For we walk by faith, not by sight.",
      version: "KJV"
    },
    {
      reference: "Romans 1:17",
      text: "For therein is the righteousness of God revealed from faith to faith: as it is written, The just shall live by faith.",
      version: "KJV"
    }
  ],
  "love": [
    {
      reference: "1 Corinthians 13:4-7",
      text: "Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up, Doth not behave itself unseemly, seeketh not her own, is not easily provoked, thinketh no evil; Rejoiceth not in iniquity, but rejoiceth in the truth; Beareth all things, believeth all things, hopeth all things, endureth all things.",
      version: "KJV"
    },
    {
      reference: "John 13:34-35",
      text: "A new commandment I give unto you, That ye love one another; as I have loved you, that ye also love one another. By this shall all men know that ye are my disciples, if ye have love one to another.",
      version: "KJV"
    },
    {
      reference: "1 John 4:7-8",
      text: "Beloved, let us love one another: for love is of God; and every one that loveth is born of God, and knoweth God. He that loveth not knoweth not God; for God is love.",
      version: "KJV"
    }
  ],
  "holy-spirit": [
    {
      reference: "John 14:16-17",
      text: "And I will pray the Father, and he shall give you another Comforter, that he may abide with you for ever; Even the Spirit of truth; whom the world cannot receive, because it seeth him not, neither knoweth him: but ye know him; for he dwelleth with you, and shall be in you.",
      version: "KJV"
    },
    {
      reference: "Galatians 5:22-23",
      text: "But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, Meekness, temperance: against such there is no law.",
      version: "KJV"
    },
    {
      reference: "Acts 1:8",
      text: "But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth.",
      version: "KJV"
    }
  ],
  "forgiveness": [
    {
      reference: "Ephesians 4:32",
      text: "And be ye kind one to another, tenderhearted, forgiving one another, even as God for Christ's sake hath forgiven you.",
      version: "KJV"
    },
    {
      reference: "1 John 1:9",
      text: "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.",
      version: "KJV"
    },
    {
      reference: "Matthew 6:14-15",
      text: "For if ye forgive men their trespasses, your heavenly Father will also forgive you: But if ye forgive not men their trespasses, neither will your Father forgive your trespasses.",
      version: "KJV"
    }
  ],
  "healing": [
    {
      reference: "James 5:14-15",
      text: "Is any sick among you? let him call for the elders of the church; and let them pray over him, anointing him with oil in the name of the Lord: And the prayer of faith shall save the sick, and the Lord shall raise him up; and if he have committed sins, they shall be forgiven him.",
      version: "KJV"
    },
    {
      reference: "Psalm 103:2-3",
      text: "Bless the LORD, O my soul, and forget not all his benefits: Who forgiveth all thine iniquities; who healeth all thy diseases.",
      version: "KJV"
    },
    {
      reference: "Isaiah 53:4-5",
      text: "Surely he hath borne our griefs, and carried our sorrows: yet we did esteem him stricken, smitten of God, and afflicted. But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed.",
      version: "KJV"
    }
  ],
  "wisdom": [
    {
      reference: "James 1:5",
      text: "If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.",
      version: "KJV"
    },
    {
      reference: "Proverbs 3:5-6",
      text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
      version: "KJV"
    },
    {
      reference: "Colossians 1:9-10",
      text: "For this cause we also, since the day we heard it, do not cease to pray for you, and to desire that ye might be filled with the knowledge of his will in all wisdom and spiritual understanding; That ye might walk worthy of the Lord unto all pleasing, being fruitful in every good work, and increasing in the knowledge of God.",
      version: "KJV"
    }
  ],
  "peace": [
    {
      reference: "Philippians 4:6-7",
      text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.",
      version: "KJV"
    },
    {
      reference: "John 14:27",
      text: "Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.",
      version: "KJV"
    },
    {
      reference: "Isaiah 26:3",
      text: "Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.",
      version: "KJV"
    }
  ],
  "joy": [
    {
      reference: "Nehemiah 8:10",
      text: "Then he said unto them, Go your way, eat the fat, and drink the sweet, and send portions unto them for whom nothing is prepared: for this day is holy unto our LORD: neither be ye sorry; for the joy of the LORD is your strength.",
      version: "KJV"
    },
    {
      reference: "John 15:11",
      text: "These things have I spoken unto you, that my joy might remain in you, and that your joy might be full.",
      version: "KJV"
    },
    {
      reference: "1 Peter 1:8",
      text: "Whom having not seen, ye love; in whom, though now ye see him not, yet believing, ye rejoice with joy unspeakable and full of glory.",
      version: "KJV"
    }
  ],
  "prayer": [
    {
      reference: "Philippians 4:6",
      text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.",
      version: "KJV"
    },
    {
      reference: "Matthew 6:9-13",
      text: "After this manner therefore pray ye: Our Father which art in heaven, Hallowed be thy name. Thy kingdom come, Thy will be done in earth, as it is in heaven. Give us this day our daily bread. And forgive us our debts, as we forgive our debtors. And lead us not into temptation, but deliver us from evil: For thine is the kingdom, and the power, and the glory, for ever. Amen.",
      version: "KJV"
    },
    {
      reference: "1 Thessalonians 5:17",
      text: "Pray without ceasing.",
      version: "KJV"
    }
  ],
  "strength": [
    {
      reference: "Isaiah 40:29-31",
      text: "He giveth power to the faint; and to them that have no might he increaseth strength. Even the youths shall faint and be weary, and the young men shall utterly fall: But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.",
      version: "KJV"
    },
    {
      reference: "2 Corinthians 12:9-10",
      text: "And he said unto me, My grace is sufficient for thee: for my strength is made perfect in weakness. Most gladly therefore will I rather glory in my infirmities, that the power of Christ may rest upon me. Therefore I take pleasure in infirmities, in reproaches, in necessities, in persecutions, in distresses for Christ's sake: for when I am weak, then am I strong.",
      version: "KJV"
    },
    {
      reference: "Philippians 4:13",
      text: "I can do all things through Christ which strengtheneth me.",
      version: "KJV"
    }
  ],
  "provision": [
    {
      reference: "Matthew 6:31-34",
      text: "Therefore take no thought, saying, What shall we eat? or, What shall we drink? or, Wherewithal shall we be clothed? (For after all these things do the Gentiles seek:) for your heavenly Father knoweth that ye have need of all these things. But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you. Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself. Sufficient unto the day is the evil thereof.",
      version: "KJV"
    },
    {
      reference: "Philippians 4:19",
      text: "But my God shall supply all your need according to his riches in glory by Christ Jesus.",
      version: "KJV"
    },
    {
      reference: "Psalm 23:1",
      text: "The LORD is my shepherd; I shall not want.",
      version: "KJV"
    }
  ],
  "hope": [
    {
      reference: "Romans 15:13",
      text: "Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost.",
      version: "KJV"
    },
    {
      reference: "Hebrews 6:19",
      text: "Which hope we have as an anchor of the soul, both sure and stedfast, and which entereth into that within the veil.",
      version: "KJV"
    },
    {
      reference: "1 Peter 1:3",
      text: "Blessed be the God and Father of our Lord Jesus Christ, which according to his abundant mercy hath begotten us again unto a lively hope by the resurrection of Jesus Christ from the dead.",
      version: "KJV"
    }
  ],
  "obedience": [
    {
      reference: "John 14:15",
      text: "If ye love me, keep my commandments.",
      version: "KJV"
    },
    {
      reference: "James 1:22",
      text: "But be ye doers of the word, and not hearers only, deceiving your own selves.",
      version: "KJV"
    },
    {
      reference: "Deuteronomy 10:12-13",
      text: "And now, Israel, what doth the LORD thy God require of thee, but to fear the LORD thy God, to walk in all his ways, and to love him, and to serve the LORD thy God with all thy heart and with all thy soul, To keep the commandments of the LORD, and his statutes, which I command thee this day for thy good?",
      version: "KJV"
    }
  ],
  "repentance": [
    {
      reference: "Acts 3:19",
      text: "Repent ye therefore, and be converted, that your sins may be blotted out, when the times of refreshing shall come from the presence of the Lord.",
      version: "KJV"
    },
    {
      reference: "2 Corinthians 7:10",
      text: "For godly sorrow worketh repentance to salvation not to be repented of: but the sorrow of the world worketh death.",
      version: "KJV"
    },
    {
      reference: "1 John 1:9",
      text: "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.",
      version: "KJV"
    }
  ],
  "fear-and-courage": [
    {
      reference: "Joshua 1:9",
      text: "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.",
      version: "KJV"
    },
    {
      reference: "2 Timothy 1:7",
      text: "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.",
      version: "KJV"
    },
    {
      reference: "Psalm 27:1",
      text: "The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?",
      version: "KJV"
    }
  ],
  "humility": [
    {
      reference: "Philippians 2:3-5",
      text: "Let nothing be done through strife or vainglory; but in lowliness of mind let each esteem other better than themselves. Look not every man on his own things, but every man also on the things of others. Let this mind be in you, which was also in Christ Jesus.",
      version: "KJV"
    },
    {
      reference: "James 4:6",
      text: "But he giveth more grace. Wherefore he saith, God resisteth the proud, but giveth grace unto the humble.",
      version: "KJV"
    },
    {
      reference: "1 Peter 5:5-6",
      text: "Likewise, ye younger, submit yourselves unto the elder. Yea, all of you be subject one to another, and be clothed with humility: for God resisteth the proud, and giveth grace to the humble. Humble yourselves therefore under the mighty hand of God, that he may exalt you in due time.",
      version: "KJV"
    }
  ],
  "holiness": [
    {
      reference: "1 Peter 1:15-16",
      text: "But as he which hath called you is holy, so be ye holy in all manner of conversation; Because it is written, Be ye holy; for I am holy.",
      version: "KJV"
    },
    {
      reference: "1 Thessalonians 4:3-4",
      text: "For this is the will of God, even your sanctification, that ye should abstain from fornication: That every one of you should know how to possess his vessel in sanctification and honour.",
      version: "KJV"
    },
    {
      reference: "Hebrews 12:14",
      text: "Follow peace with all men, and holiness, without which no man shall see the Lord.",
      version: "KJV"
    }
  ],
  "spiritual-warfare": [
    {
      reference: "Ephesians 6:10-12",
      text: "Finally, my brethren, be strong in the Lord, and in the power of his might. Put on the whole armour of God, that ye may be able to stand against the wiles of the devil. For we wrestle not against flesh and blood, but against principalities, against powers, against the rulers of the darkness of this world, against spiritual wickedness in high places.",
      version: "KJV"
    },
    {
      reference: "2 Corinthians 10:3-5",
      text: "For though we walk in the flesh, we do not war after the flesh: (For the weapons of our warfare are not carnal, but mighty through God to the pulling down of strong holds;) Casting down imaginations, and every high thing that exalteth itself against the knowledge of God, and bringing into captivity every thought to the obedience of Christ.",
      version: "KJV"
    },
    {
      reference: "1 Peter 5:8-9",
      text: "Be sober, be vigilant; because your adversary the devil, as a roaring lion, walketh about, seeking whom he may devour: Whom resist stedfast in the faith, knowing that the same afflictions are accomplished in your brethren that are in the world.",
      version: "KJV"
    }
  ],
  "faithfulness": [
    {
      reference: "Lamentations 3:22-23",
      text: "It is of the LORD's mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.",
      version: "KJV"
    },
    {
      reference: "Galatians 6:9",
      text: "And let us not be weary in well doing: for in due season we shall reap, if we faint not.",
      version: "KJV"
    },
    {
      reference: "Matthew 25:21",
      text: "His lord said unto him, Well done, thou good and faithful servant: thou hast been faithful over a few things, I will make thee ruler over many things: enter thou into the joy of thy lord.",
      version: "KJV"
    }
  ],
  "trust": [
    {
      reference: "Proverbs 3:5-6",
      text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
      version: "KJV"
    },
    {
      reference: "Psalm 37:3-5",
      text: "Trust in the LORD, and do good; so shalt thou dwell in the land, and verily thou shalt be fed. Delight thyself also in the LORD: and he shall give thee the desires of thine heart. Commit thy way unto the LORD; trust also in him; and he shall bring it to pass.",
      version: "KJV"
    },
    {
      reference: "Isaiah 12:2",
      text: "Behold, God is my salvation; I will trust, and not be afraid: for the LORD JEHOVAH is my strength and my song; he also is become my salvation.",
      version: "KJV"
    }
  ],
  "gods-will": [
    {
      reference: "Romans 12:1-2",
      text: "I beseech you therefore, brethren, by the mercies of God, that ye present your bodies a living sacrifice, holy, acceptable unto God, which is your reasonable service. And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.",
      version: "KJV"
    },
    {
      reference: "1 Thessalonians 4:3",
      text: "For this is the will of God, even your sanctification, that ye should abstain from fornication.",
      version: "KJV"
    },
    {
      reference: "Proverbs 16:9",
      text: "A man's heart deviseth his way: but the LORD directeth his steps.",
      version: "KJV"
    }
  ],
  "grace": [
    {
      reference: "Ephesians 2:8-9",
      text: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.",
      version: "KJV"
    },
    {
      reference: "Titus 2:11-12",
      text: "For the grace of God that bringeth salvation hath appeared to all men, Teaching us that, denying ungodliness and worldly lusts, we should live soberly, righteously, and godly, in this present world.",
      version: "KJV"
    },
    {
      reference: "2 Corinthians 12:9",
      text: "And he said unto me, My grace is sufficient for thee: for my strength is made perfect in weakness. Most gladly therefore will I rather glory in my infirmities, that the power of Christ may rest upon me.",
      version: "KJV"
    }
  ],
  "mercy": [
    {
      reference: "Psalm 103:8-12",
      text: "The LORD is merciful and gracious, slow to anger, and plenteous in mercy. He will not always chide: neither will he keep his anger for ever. He hath not dealt with us after our sins; nor rewarded us according to our iniquities. For as the heaven is high above the earth, so great is his mercy toward them that fear him. As far as the east is from the west, so far hath he removed our transgressions from us.",
      version: "KJV"
    },
    {
      reference: "Micah 7:18-19",
      text: "Who is a God like unto thee, that pardoneth iniquity, and passeth by the transgression of the remnant of his heritage? he retaineth not his anger for ever, because he delighteth in mercy. He will turn again, he will have compassion upon us; he will subdue our iniquities; and thou wilt cast all their sins into the depths of the sea.",
      version: "KJV"
    },
    {
      reference: "Luke 6:36",
      text: "Be ye therefore merciful, as your Father also is merciful.",
      version: "KJV"
    }
  ],
  "evangelism": [
    {
      reference: "Matthew 28:18-20",
      text: "And Jesus came and spake unto them, saying, All power is given unto me in heaven and in earth. Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost: Teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you always, even unto the end of the world. Amen.",
      version: "KJV"
    },
    {
      reference: "Romans 1:16",
      text: "For I am not ashamed of the gospel of Christ: for it is the power of God unto salvation to every one that believeth; to the Jew first, and also to the Greek.",
      version: "KJV"
    },
    {
      reference: "Acts 1:8",
      text: "But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth.",
      version: "KJV"
    }
  ],
  "perseverance": [
    {
      reference: "James 1:2-4",
      text: "My brethren, count it all joy when ye fall into divers temptations; Knowing this, that the trying of your faith worketh patience. But let patience have her perfect work, that ye may be perfect and entire, wanting nothing.",
      version: "KJV"
    },
    {
      reference: "Hebrews 12:1-3",
      text: "Wherefore seeing we also are compassed about with so great a cloud of witnesses, let us lay aside every weight, and the sin which doth so easily beset us, and let us run with patience the race that is set before us, Looking unto Jesus the author and finisher of our faith; who for the joy that was set before him endured the cross, despising the shame, and is set down at the right hand of the throne of God. For consider him that endured such contradiction of sinners against himself, lest ye be wearied and faint in your minds.",
      version: "KJV"
    },
    {
      reference: "Romans 5:3-5",
      text: "And not only so, but we glory in tribulations also: knowing that tribulation worketh patience; And patience, experience; and experience, hope: And hope maketh not ashamed; because the love of God is shed abroad in our hearts by the Holy Ghost which is given unto us.",
      version: "KJV"
    }
  ],
  "thankfulness": [
    {
      reference: "1 Thessalonians 5:18",
      text: "In every thing give thanks: for this is the will of God in Christ Jesus concerning you.",
      version: "KJV"
    },
    {
      reference: "Colossians 3:15-17",
      text: "And let the peace of God rule in your hearts, to the which also ye are called in one body; and be ye thankful. Let the word of Christ dwell in you richly in all wisdom; teaching and admonishing one another in psalms and hymns and spiritual songs, singing with grace in your hearts to the Lord. And whatsoever ye do in word or deed, do all in the name of the Lord Jesus, giving thanks to God and the Father by him.",
      version: "KJV"
    },
    {
      reference: "Psalm 100:4",
      text: "Enter into his gates with thanksgiving, and into his courts with praise: be thankful unto him, and bless his name.",
      version: "KJV"
    }
  ],
  "church": [
    {
      reference: "Ephesians 4:11-16",
      text: "And he gave some, apostles; and some, prophets; and some, evangelists; and some, pastors and teachers; For the perfecting of the saints, for the work of the ministry, for the edifying of the body of Christ: Till we all come in the unity of the faith, and of the knowledge of the Son of God, unto a perfect man, unto the measure of the stature of the fulness of Christ: That we henceforth be no more children, tossed to and fro, and carried about with every wind of doctrine, by the sleight of men, and cunning craftiness, whereby they lie in wait to deceive; But speaking the truth in love, may grow up into him in all things, which is the head, even Christ: From whom the whole body fitly joined together and compacted by that which every joint supplieth, according to the effectual working in the measure of every part, maketh increase of the body unto the edifying of itself in love.",
      version: "KJV"
    },
    {
      reference: "Acts 2:42-47",
      text: "And they continued stedfastly in the apostles' doctrine and fellowship, and in breaking of bread, and in prayers. And fear came upon every soul: and many wonders and signs were done by the apostles. And all that believed were together, and had all things common; And sold their possessions and goods, and parted them to all men, as every man had need. And they, continuing daily with one accord in the temple, and breaking bread from house to house, did eat their meat with gladness and singleness of heart, Praising God, and having favour with all the people. And the Lord added to the church daily such as should be saved.",
      version: "KJV"
    },
    {
      reference: "Hebrews 10:24-25",
      text: "And let us consider one another to provoke unto love and to good works: Not forsaking the assembling of ourselves together, as the manner of some is; but exhorting one another: and so much the more, as ye see the day approaching.",
      version: "KJV"
    }
  ],
  "word-of-god": [
    {
      reference: "2 Timothy 3:16-17",
      text: "All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness: That the man of God may be perfect, thoroughly furnished unto all good works.",
      version: "KJV"
    },
    {
      reference: "Hebrews 4:12",
      text: "For the word of God is quick, and powerful, and sharper than any twoedged sword, piercing even to the dividing asunder of soul and spirit, and of the joints and marrow, and is a discerner of the thoughts and intents of the heart.",
      version: "KJV"
    },
    {
      reference: "Psalm 119:105",
      text: "Thy word is a lamp unto my feet, and a light unto my path.",
      version: "KJV"
    }
  ],
  "end-times": [
    {
      reference: "Matthew 24:30-31",
      text: "And then shall appear the sign of the Son of man in heaven: and then shall all the tribes of the earth mourn, and they shall see the Son of man coming in the clouds of heaven with power and great glory. And he shall send his angels with a great sound of a trumpet, and they shall gather together his elect from the four winds, from one end of heaven to the other.",
      version: "KJV"
    },
    {
      reference: "1 Thessalonians 4:16-17",
      text: "For the Lord himself shall descend from heaven with a shout, with the voice of the archangel, and with the trump of God: and the dead in Christ shall rise first: Then we which are alive and remain shall be caught up together with them in the clouds, to meet the Lord in the air: and so shall we ever be with the Lord.",
      version: "KJV"
    },
    {
      reference: "Revelation 21:1-4",
      text: "And I saw a new heaven and a new earth: for the first heaven and the first earth were passed away; and there was no more sea. And I John saw the holy city, new Jerusalem, coming down from God out of heaven, prepared as a bride adorned for her husband. And I heard a great voice out of heaven saying, Behold, the tabernacle of God is with men, and he will dwell with them, and they shall be his people, and God himself shall be with them, and be their God. And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away.",
      version: "KJV"
    }
  ],
  "heaven": [
    {
      reference: "Revelation 21:3-4",
      text: "And I heard a great voice out of heaven saying, Behold, the tabernacle of God is with men, and he will dwell with them, and they shall be his people, and God himself shall be with them, and be their God. And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away.",
      version: "KJV"
    },
    {
      reference: "John 14:2-3",
      text: "In my Father's house are many mansions: if it were not so, I would have told you. I go to prepare a place for you. And if I go and prepare a place for you, I will come again, and receive you unto myself; that where I am, there ye may be also.",
      version: "KJV"
    },
    {
      reference: "Philippians 3:20-21",
      text: "For our conversation is in heaven; from whence also we look for the Saviour, the Lord Jesus Christ: Who shall change our vile body, that it may be fashioned like unto his glorious body, according to the working whereby he is able even to subdue all things unto himself.",
      version: "KJV"
    }
  ],
  "hell": [
    {
      reference: "Matthew 25:31-46",
      text: "When the Son of man shall come in his glory, and all the holy angels with him, then shall he sit upon the throne of his glory: And before him shall be gathered all nations: and he shall separate them one from another, as a shepherd divideth his sheep from the goats: And he shall set the sheep on his right hand, but the goats on the left. Then shall the King say unto them on his right hand, Come, ye blessed of my Father, inherit the kingdom prepared for you from the foundation of the world: For I was an hungred, and ye gave me meat: I was thirsty, and ye gave me drink: I was a stranger, and ye took me in: Naked, and ye clothed me: I was sick, and ye visited me: I was in prison, and ye came unto me. Then shall the righteous answer him, saying, Lord, when saw we thee an hungred, and fed thee? or thirsty, and gave thee drink? When saw we thee a stranger, and took thee in? or naked, and clothed thee? Or when saw we thee sick, or in prison, and came unto thee? And the King shall answer and say unto them, Verily I say unto you, Inasmuch as ye have done it unto one of the least of these my brethren, ye have done it unto me. Then shall he say also unto them on the left hand, Depart from me, ye cursed, into everlasting fire, prepared for the devil and his angels: For I was an hungred, and ye gave me no meat: I was thirsty, and ye gave me no drink: I was a stranger, and ye took me not in: naked, and ye clothed me not: sick, and in prison, and ye visited me not. Then shall they also answer him, saying, Lord, when saw we thee an hungred, or athirst, or a stranger, or naked, or sick, or in prison, and did not minister unto thee? Then shall he answer them, saying, Verily I say unto you, Inasmuch as ye did it not to one of the least of these, ye did it not to me. And these shall go away into everlasting punishment: but the righteous into life eternal.",
      version: "KJV"
    },
    {
      reference: "Revelation 20:11-15",
      text: "And I saw a great white throne, and him that sat on it, from whose face the earth and the heaven fled away; and there was found no place for them. And I saw the dead, small and great, stand before God; and the books were opened: and another book was opened, which is the book of life: and the dead were judged out of those things which were written in the books, according to their works. And the sea gave up the dead which were in it; and death and hell delivered up the dead which were in them: and they were judged every man according to their works. And death and hell were cast into the lake of fire. This is the second death. And whosoever was not found written in the book of life was cast into the lake of fire.",
      version: "KJV"
    },
    {
      reference: "Hebrews 9:27",
      text: "And as it is appointed unto men once to die, but after this the judgment.",
      version: "KJV"
    }
  ],
  "temptation": [
    {
      reference: "1 Corinthians 10:13",
      text: "There hath no temptation taken you but such as is common to man: but God is faithful, who will not suffer you to be tempted above that ye are able; but will with the temptation also make a way to escape, that ye may be able to bear it.",
      version: "KJV"
    },
    {
      reference: "James 1:13-15",
      text: "Let no man say when he is tempted, I am tempted of God: for God cannot be tempted with evil, neither tempteth he any man: But every man is tempted, when he is drawn away of his own lust, and enticed. Then when lust hath conceived, it bringeth forth sin: and sin, when it is finished, bringeth forth death.",
      version: "KJV"
    },
    {
      reference: "Hebrews 4:15-16",
      text: "For we have not an high priest which cannot be touched with the feeling of our infirmities; but was in all points tempted like as we are, yet without sin. Let us therefore come boldly unto the throne of grace, that we may obtain mercy, and find grace to help in time of need.",
      version: "KJV"
    }
  ],
  "parenting": [
    {
      reference: "Ephesians 6:4",
      text: "And, ye fathers, provoke not your children to wrath: but bring them up in the nurture and admonition of the Lord.",
      version: "KJV"
    },
    {
      reference: "Proverbs 22:6",
      text: "Train up a child in the way he should go: and when he is old, he will not depart from it.",
      version: "KJV"
    },
    {
      reference: "Deuteronomy 6:6-7",
      text: "And these words, which I command thee this day, shall be in thine heart: And thou shalt teach them diligently unto thy children, and shalt talk of them when thou sittest in thine house, and when thou walkest by the way, and when thou liest down, and when thou risest up.",
      version: "KJV"
    }
  ],
  "serving": [
    {
      reference: "Mark 10:43-45",
      text: "But so shall it not be among you: but whosoever will be great among you, shall be your minister: And whosoever of you will be the chiefest, shall be servant of all. For even the Son of man came not to be ministered unto, but to minister, and to give his life a ransom for many.",
      version: "KJV"
    },
    {
      reference: "1 Peter 4:10",
      text: "As every man hath received the gift, even so minister the same one to another, as good stewards of the manifold grace of God.",
      version: "KJV"
    },
    {
      reference: "Galatians 5:13",
      text: "For, brethren, ye have been called unto liberty; only use not liberty for an occasion to the flesh, but by love serve one another.",
      version: "KJV"
    }
  ],
  "generosity": [
    {
      reference: "2 Corinthians 9:6-8",
      text: "But this I say, He which soweth sparingly shall reap also sparingly; and he which soweth bountifully shall reap also bountifully. Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver. And God is able to make all grace abound toward you; that ye, always having all sufficiency in all things, may abound to every good work.",
      version: "KJV"
    },
    {
      reference: "Acts 20:35",
      text: "I have shewed you all things, how that so labouring ye ought to support the weak, and to remember the words of the Lord Jesus, how he said, It is more blessed to give than to receive.",
      version: "KJV"
    },
    {
      reference: "Proverbs 11:24-25",
      text: "There is that scattereth, and yet increaseth; and there is that withholdeth more than is meet, but it tendeth to poverty. The liberal soul shall be made fat: and he that watereth shall be watered also himself.",
      version: "KJV"
    }
  ],
  "work": [
    {
      reference: "Colossians 3:23-24",
      text: "And whatsoever ye do, do it heartily, as to the Lord, and not unto men; Knowing that of the Lord ye shall receive the reward of the inheritance: for ye serve the Lord Christ.",
      version: "KJV"
    },
    {
      reference: "1 Corinthians 10:31",
      text: "Whether therefore ye eat, or drink, or whatsoever ye do, do all to the glory of God.",
      version: "KJV"
    },
    {
      reference: "Proverbs 16:3",
      text: "Commit thy works unto the LORD, and thy thoughts shall be established.",
      version: "KJV"
    }
  ],
  "marriage": [
    {
      reference: "Ephesians 5:25-33",
      text: "Husbands, love your wives, even as Christ also loved the church, and gave himself for it; That he might sanctify and cleanse it with the washing of water by the word, That he might present it to himself a glorious church, not having spot, or wrinkle, or any such thing; but that it should be holy and without blemish. So ought men to love their wives as their own bodies. He that loveth his wife loveth himself. For no man ever yet hated his own flesh; but nourisheth and cherisheth it, even as the Lord the church: For we are members of his body, of his flesh, and of his bones. For this cause shall a man leave his father and mother, and shall be joined unto his wife, and they two shall be one flesh. This is a great mystery: but I speak concerning Christ and the church. Nevertheless let every one of you in particular so love his wife even as himself; and the wife see that she reverence her husband.",
      version: "KJV"
    },
    {
      reference: "Genesis 2:24",
      text: "Therefore shall a man leave his father and his mother, and shall cleave unto his wife: and they shall be one flesh.",
      version: "KJV"
    },
    {
      reference: "1 Peter 3:7",
      text: "Likewise, ye husbands, dwell with them according to knowledge, giving honour unto the wife, as unto the weaker vessel, and as being heirs together of the grace of life; that your prayers be not hindered.",
      version: "KJV"
    }
  ],
  "suffering": [
    {
      reference: "Romans 8:18",
      text: "For I reckon that the sufferings of this present time are not worthy to be compared with the glory which shall be revealed in us.",
      version: "KJV"
    },
    {
      reference: "1 Peter 4:12-13",
      text: "Beloved, think it not strange concerning the fiery trial which is to try you, as though some strange thing happened unto you: But rejoice, inasmuch as ye are partakers of Christ's sufferings; that, when his glory shall be revealed, ye may be glad also with exceeding joy.",
      version: "KJV"
    },
    {
      reference: "2 Corinthians 4:16-18",
      text: "For which cause we faint not; but though our outward man perish, yet the inward man is renewed day by day. For our light affliction, which is but for a moment, worketh for us a far more exceeding and eternal weight of glory; While we look not at the things which are seen, but at the things which are not seen: for the things which are seen are temporal; but the things which are not seen are eternal.",
      version: "KJV"
    }
  ]
};
