import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BookOpen, Clock, Star, Check, X } from "lucide-react";

interface StudyPlan {
  id: string;
  title: string;
  description: string;
  day: number;
  topic: string;
  scripture: string;
  scriptureText: string;
  reflectionQuestions: string[];
  prayer: string;
  completed: boolean;
}

export default function BibleStudyPlans() {
  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([]);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);
  const [isStudyOpen, setIsStudyOpen] = useState(false);

  useEffect(() => {
    generateStudyPlans();
  }, [currentWeek]);

  const studyTopics = [
    {
      topic: "Faith & Trust",
      plans: [
        { 
          title: "Building Faith", 
          scripture: "Hebrews 11:1", 
          scriptureText: "Now faith is confidence in what we hope for and assurance about what we do not see.",
          description: "Understanding the foundation of faith",
          reflectionQuestions: [
            "What does faith mean to you personally?",
            "How can you show faith in difficult times?",
            "What are you hoping for that requires faith?"
          ],
          prayer: "Lord, help me to build a stronger faith in You. When I face uncertainty, remind me that You are always faithful. Strengthen my trust in Your perfect plan for my life. Amen."
        },
        { 
          title: "Trusting God", 
          scripture: "Proverbs 3:5-6", 
          scriptureText: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
          description: "Learning to trust in all circumstances",
          reflectionQuestions: [
            "In what areas of life do you struggle to trust God?",
            "How can you surrender your own understanding?",
            "What does it mean to submit to God in your ways?"
          ],
          prayer: "Heavenly Father, I choose to trust You with my whole heart. Help me not to rely on my limited understanding, but to seek Your wisdom in all decisions. Guide my paths according to Your will. Amen."
        },
        { 
          title: "Faith in Action", 
          scripture: "James 2:14-17", 
          scriptureText: "What good is it, my brothers and sisters, if someone claims to have faith but has no deeds? Can such faith save them? Faith by itself, if it is not accompanied by action, is dead.",
          description: "Living out your faith daily",
          reflectionQuestions: [
            "How do your actions reflect your faith?",
            "What practical ways can you demonstrate faith today?",
            "How can you serve others as an expression of your faith?"
          ],
          prayer: "God, help my faith to be more than words. Show me opportunities to demonstrate Your love through my actions. May my life be a living testimony of Your goodness and grace. Amen."
        }
      ]
    },
    {
      topic: "Love & Compassion",
      plans: [
        { 
          title: "God's Love", 
          scripture: "1 John 4:8", 
          scriptureText: "Whoever does not love does not know God, because God is love.",
          description: "Experiencing divine love",
          reflectionQuestions: [
            "How have you experienced God's love in your life?",
            "What does it mean that 'God is love'?",
            "How can you share God's love with others today?"
          ],
          prayer: "Father, thank You for Your perfect love that never fails. Help me to experience Your love more deeply and to reflect that love to everyone I meet. Let Your love transform my heart. Amen."
        },
        { 
          title: "Loving Others", 
          scripture: "Matthew 22:39", 
          scriptureText: "And the second is like it: 'Love your neighbor as yourself.'",
          description: "Showing love to your neighbors",
          reflectionQuestions: [
            "Who are your 'neighbors' that need love?",
            "How do you show love to yourself?",
            "What practical acts of love can you do today?"
          ],
          prayer: "Lord Jesus, teach me to love others the way You love me. Help me to see each person as precious in Your sight. Give me opportunities to show Your love through kindness and compassion. Amen."
        },
        { 
          title: "Compassionate Heart", 
          scripture: "Colossians 3:12", 
          scriptureText: "Therefore, as God's chosen people, holy and dearly loved, clothe yourselves with compassion, kindness, humility, gentleness and patience.",
          description: "Developing compassion for all",
          reflectionQuestions: [
            "What does it mean to 'clothe yourself' with compassion?",
            "How can you practice patience with difficult people?",
            "Where do you need to show more kindness?"
          ],
          prayer: "Compassionate God, develop in me a heart like Yours. Help me to be kind, humble, gentle, and patient with others. May Your love flow through me to bring comfort and hope to those in need. Amen."
        }
      ]
    },
    {
      topic: "Peace & Hope",
      plans: [
        { 
          title: "Inner Peace", 
          scripture: "Philippians 4:7", 
          scriptureText: "And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
          description: "Finding peace in troubled times",
          reflectionQuestions: [
            "What situations in your life need God's peace?",
            "How does God's peace differ from worldly peace?",
            "What guards your heart and mind from worry?"
          ],
          prayer: "Prince of Peace, I need Your peace that surpasses understanding. Calm my anxious thoughts and guard my heart from fear. Help me to rest in Your presence and trust in Your protection. Amen."
        },
        { 
          title: "Hope in Christ", 
          scripture: "Romans 15:13", 
          scriptureText: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.",
          description: "Anchoring hope in faith",
          reflectionQuestions: [
            "What are you hoping for today?",
            "How does trusting God bring joy and peace?",
            "How can you share hope with someone who is struggling?"
          ],
          prayer: "God of hope, fill me with Your joy and peace as I trust in You. Help me to overflow with hope that comes from the Holy Spirit. Use me to bring hope to others who are discouraged. Amen."
        },
        { 
          title: "Peaceful Living", 
          scripture: "Isaiah 26:3", 
          scriptureText: "You will keep in perfect peace those whose minds are steadfast, because they trust in you.",
          description: "Living with perfect peace",
          reflectionQuestions: [
            "What does it mean to have a 'steadfast mind'?",
            "How can you keep your thoughts focused on God?",
            "What areas of life need God's perfect peace?"
          ],
          prayer: "Lord, help me to keep my mind steadfast on You. When worries try to steal my peace, remind me to trust in Your faithfulness. Keep me in perfect peace as I depend on You. Amen."
        }
      ]
    },
    {
      topic: "Wisdom & Understanding",
      plans: [
        { 
          title: "Seeking Wisdom", 
          scripture: "James 1:5", 
          scriptureText: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.",
          description: "Asking God for wisdom",
          reflectionQuestions: [
            "In what situations do you need God's wisdom?",
            "How does God give wisdom 'generously'?",
            "What decisions are you facing that need prayer?"
          ],
          prayer: "Wise God, I need Your wisdom for the decisions I face. Thank You for promising to give wisdom generously when I ask. Help me to seek Your guidance in all things. Amen."
        },
        { 
          title: "Divine Understanding", 
          scripture: "Proverbs 2:6", 
          scriptureText: "For the Lord gives wisdom; from his mouth come knowledge and understanding.",
          description: "Gaining spiritual insight",
          reflectionQuestions: [
            "How does God speak wisdom to you?",
            "What's the difference between knowledge and understanding?",
            "How can you grow in spiritual discernment?"
          ],
          prayer: "Lord, thank You that all true wisdom comes from You. Open my heart to receive Your knowledge and understanding. Help me to discern Your voice and follow Your guidance. Amen."
        },
        { 
          title: "Wise Decisions", 
          scripture: "Proverbs 15:22", 
          scriptureText: "Plans fail for lack of counsel, but with many advisers they succeed.",
          description: "Making godly choices",
          reflectionQuestions: [
            "Who do you turn to for godly counsel?",
            "How do you include God in your planning?",
            "What decisions need wise advisers?"
          ],
          prayer: "Father, help me to seek wise counsel in my decisions. Surround me with people who know You and can offer godly advice. May all my plans succeed according to Your will. Amen."
        }
      ]
    },
    {
      topic: "Forgiveness & Grace",
      plans: [
        { 
          title: "God's Forgiveness", 
          scripture: "1 John 1:9", 
          scriptureText: "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.",
          description: "Receiving divine forgiveness",
          reflectionQuestions: [
            "What does true confession look like?",
            "How does God's faithfulness relate to forgiveness?",
            "What sins do you need to confess today?"
          ],
          prayer: "Merciful God, I confess my sins to You and ask for Your forgiveness. Thank You for being faithful to forgive and cleanse me from all unrighteousness. Help me to walk in Your grace. Amen."
        },
        { 
          title: "Forgiving Others", 
          scripture: "Matthew 6:14-15", 
          scriptureText: "For if you forgive other people when they sin against you, your heavenly Father will also forgive you. But if you do not forgive others their sins, your Father will not forgive your sins.",
          description: "Learning to forgive completely",
          reflectionQuestions: [
            "Who do you need to forgive?",
            "How does receiving God's forgiveness help you forgive others?",
            "What makes forgiveness difficult for you?"
          ],
          prayer: "God of mercy, help me to forgive others as You have forgiven me. Heal any bitterness or resentment in my heart. Give me the strength to extend grace to those who have hurt me. Amen."
        },
        { 
          title: "Living in Grace", 
          scripture: "Ephesians 2:8-9", 
          scriptureText: "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—not by works, so that no one can boast.",
          description: "Understanding amazing grace",
          reflectionQuestions: [
            "What does it mean that salvation is a gift?",
            "How does grace change your relationship with God?",
            "How can you live out of gratitude for grace?"
          ],
          prayer: "Amazing God, thank You for Your incredible grace that saved me. Help me to never take Your gift for granted but to live in humble gratitude for Your love and mercy. Amen."
        }
      ]
    },
    {
      topic: "Kingdom of God & Righteousness",
      plans: [
        { 
          title: "Seeking First the Kingdom", 
          scripture: "Matthew 6:33", 
          scriptureText: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
          description: "Prioritizing God's kingdom in daily life",
          reflectionQuestions: [
            "What does it mean to seek God's kingdom first?",
            "How can you prioritize God's righteousness over worldly concerns?",
            "What 'things' has God promised to provide when you seek Him first?"
          ],
          prayer: "King of kings, help me to seek Your kingdom first in all I do. Let Your righteousness guide my decisions and priorities. I trust You to provide all I need as I put You first. Amen."
        },
        { 
          title: "Citizens of Heaven", 
          scripture: "Philippians 3:20", 
          scriptureText: "But our citizenship is in heaven. And we eagerly await a Savior from there, the Lord Jesus Christ.",
          description: "Living as heavenly citizens on earth",
          reflectionQuestions: [
            "What does it mean that your citizenship is in heaven?",
            "How should heavenly citizenship change how you live on earth?",
            "What are you eagerly awaiting from your Savior?"
          ],
          prayer: "Heavenly Father, remind me that my true citizenship is in heaven with You. Help me to live as a worthy citizen of Your kingdom while I await Christ's return. Amen."
        },
        { 
          title: "Righteousness of God", 
          scripture: "2 Corinthians 5:21", 
          scriptureText: "God made him who had no sin to be sin for us, so that in him we might become the righteousness of God.",
          description: "Understanding our righteousness in Christ",
          reflectionQuestions: [
            "How did Christ's sacrifice make you righteous before God?",
            "What does it mean to 'become the righteousness of God'?",
            "How does knowing your righteousness in Christ change your identity?"
          ],
          prayer: "Righteous God, thank You for making me righteous through Christ's sacrifice. Help me to live in the freedom and identity of being Your righteousness. Amen."
        }
      ]
    },
    {
      topic: "Marriage Growing in Christ",
      plans: [
        { 
          title: "Two Becoming One", 
          scripture: "Ephesians 5:31", 
          scriptureText: "For this reason a man will leave his father and mother and be united to his wife, and the two will become one flesh.",
          description: "Understanding unity in Christian marriage",
          reflectionQuestions: [
            "What does it mean for two to become 'one flesh' in marriage?",
            "How can you and your spouse grow closer to God together?",
            "What habits strengthen your spiritual unity as a couple?"
          ],
          prayer: "Lord, help us to truly become one in our marriage, united in purpose and faith. Strengthen our bond through Your love and guide us to grow together in You. Amen."
        },
        { 
          title: "Love Like Christ", 
          scripture: "Ephesians 5:25", 
          scriptureText: "Husbands, love your wives, just as Christ loved the church and gave himself up for her.",
          description: "Sacrificial love in marriage",
          reflectionQuestions: [
            "How did Christ demonstrate His love for the church?",
            "What does sacrificial love look like in your marriage?",
            "How can you put your spouse's needs before your own today?"
          ],
          prayer: "Jesus, teach us to love each other with sacrificial love like You showed the church. Help us to serve and cherish one another selflessly. Amen."
        },
        { 
          title: "Praying Together", 
          scripture: "Matthew 18:20", 
          scriptureText: "For where two or three gather in my name, there am I with them.",
          description: "The power of united prayer in marriage",
          reflectionQuestions: [
            "How does praying together strengthen your marriage?",
            "What promises does Jesus give when couples pray together?",
            "What can you and your spouse pray about together today?"
          ],
          prayer: "Father, draw us together in prayer as a couple. Help us to seek You together and experience Your presence in our marriage through united prayer. Amen."
        }
      ]
    },
    {
      topic: "Overcoming Anxiety",
      plans: [
        { 
          title: "Casting Your Cares", 
          scripture: "1 Peter 5:7", 
          scriptureText: "Cast all your anxiety on him because he cares for you.",
          description: "Learning to give anxiety to God",
          reflectionQuestions: [
            "What anxieties are you carrying that need to be cast on God?",
            "How does knowing God cares for you help with anxiety?",
            "What does it practically look like to 'cast' your anxiety on God?"
          ],
          prayer: "Caring God, I cast all my anxieties on You because I know You care for me deeply. Help me to trust You with my worries and rest in Your love. Amen."
        },
        { 
          title: "Peace Over Worry", 
          scripture: "Philippians 4:6-7", 
          scriptureText: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
          description: "Finding peace through prayer",
          reflectionQuestions: [
            "What situations cause you the most anxiety?",
            "How can prayer with thanksgiving change your perspective on problems?",
            "What does God's peace that 'transcends understanding' feel like?"
          ],
          prayer: "Prince of Peace, instead of being anxious, I bring my requests to You with thanksgiving. Guard my heart and mind with Your peace that surpasses understanding. Amen."
        },
        { 
          title: "Fear Not", 
          scripture: "Isaiah 41:10", 
          scriptureText: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
          description: "God's presence overcomes fear",
          reflectionQuestions: [
            "What fears does God want you to release today?",
            "How does God's presence with you combat anxiety?",
            "In what ways has God strengthened and helped you in the past?"
          ],
          prayer: "Almighty God, when fear tries to overwhelm me, remind me that You are with me. Strengthen me and uphold me with Your righteous right hand. I will not fear. Amen."
        }
      ]
    },
    {
      topic: "Releasing Worry",
      plans: [
        { 
          title: "Tomorrow's Troubles", 
          scripture: "Matthew 6:34", 
          scriptureText: "Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.",
          description: "Living one day at a time",
          reflectionQuestions: [
            "What future concerns are stealing your peace today?",
            "How can you focus on today rather than tomorrow's problems?",
            "What does it mean that 'each day has enough trouble of its own'?"
          ],
          prayer: "Heavenly Father, help me to live one day at a time and not worry about tomorrow. Give me grace for today and trust in Your provision for the future. Amen."
        },
        { 
          title: "God's Care for You", 
          scripture: "Matthew 6:26", 
          scriptureText: "Look at the birds of the air; they do not sow or reap or store away in barns, and yet your heavenly Father feeds them. Are you not much more valuable than they?",
          description: "Trusting in God's provision",
          reflectionQuestions: [
            "What can you learn from how God cares for the birds?",
            "How does knowing your value to God help reduce worry?",
            "What areas of provision do you need to trust God with?"
          ],
          prayer: "Providing God, if You care for the birds of the air, how much more will You care for me? Help me to trust Your provision and not worry about my needs. Amen."
        },
        { 
          title: "Perfect Love Casts Out Fear", 
          scripture: "1 John 4:18", 
          scriptureText: "There is no fear in love. But perfect love drives out fear, because fear has to do with punishment. The one who fears is not made perfect in love.",
          description: "God's love conquers worry and fear",
          reflectionQuestions: [
            "How does experiencing God's perfect love reduce fear and worry?",
            "What punishment or consequences are you afraid of?",
            "How can you grow in experiencing God's perfect love?"
          ],
          prayer: "God of perfect love, let Your love drive out all fear and worry from my heart. Help me to rest in Your love and not fear punishment or consequences. Amen."
        }
      ]
    },
    {
      topic: "The Holy Spirit's Role",
      plans: [
        { 
          title: "Helper and Counselor", 
          scripture: "John 14:16-17", 
          scriptureText: "And I will ask the Father, and he will give you another advocate to help you and be with you forever—the Spirit of truth. The world cannot accept him, because it neither sees him nor knows him. But you know him, for he lives with you and will be in you.",
          description: "The Spirit as our divine helper",
          reflectionQuestions: [
            "How does the Holy Spirit help you in your daily life?",
            "What does it mean that the Spirit of truth lives in you?",
            "How can you be more aware of the Spirit's presence and guidance?"
          ],
          prayer: "Holy Spirit, thank You for being my helper and counselor. Help me to be more aware of Your presence and to rely on Your guidance in all things. Amen."
        },
        { 
          title: "Fruit of the Spirit", 
          scripture: "Galatians 5:22-23", 
          scriptureText: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law.",
          description: "The Spirit produces character in us",
          reflectionQuestions: [
            "Which fruit of the Spirit do you most need to develop?",
            "How does the Holy Spirit produce this fruit in your life?",
            "What areas of your character need the Spirit's work?"
          ],
          prayer: "Spirit of God, produce Your fruit in my life - love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control. Transform my character to be like Christ. Amen."
        },
        { 
          title: "Power to Witness", 
          scripture: "Acts 1:8", 
          scriptureText: "But you will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth.",
          description: "The Spirit empowers us to share Christ",
          reflectionQuestions: [
            "What power does the Holy Spirit give for witnessing?",
            "Who in your 'Jerusalem' needs to hear about Christ?",
            "How can you rely on the Spirit's power to share your faith?"
          ],
          prayer: "Powerful Spirit, give me the power and boldness to be Your witness wherever You place me. Use me to share Christ's love with those around me. Amen."
        }
      ]
    },
    {
      topic: "Clinging to God",
      plans: [
        { 
          title: "God Our Refuge", 
          scripture: "Psalm 46:1", 
          scriptureText: "God is our refuge and strength, an ever-present help in trouble.",
          description: "Finding safety in God's presence",
          reflectionQuestions: [
            "When do you most need to run to God as your refuge?",
            "How has God been your strength in difficult times?",
            "What does it mean that God is 'ever-present' in trouble?"
          ],
          prayer: "God, my refuge and strength, I cling to You in every trouble. Thank You for being ever-present and available whenever I need You. Be my safe place. Amen."
        },
        { 
          title: "Hold Fast to God", 
          scripture: "Deuteronomy 10:20", 
          scriptureText: "Fear the Lord your God and serve him. Hold fast to him and take your oaths in his name.",
          description: "Staying close to God through all seasons",
          reflectionQuestions: [
            "What does it mean to 'hold fast' to God?",
            "How can you serve God faithfully in your current season?",
            "What helps you stay close to God when life gets difficult?"
          ],
          prayer: "Lord God, I choose to hold fast to You and serve You faithfully. Keep me close to You through every season of life. I will not let go of You. Amen."
        },
        { 
          title: "Abiding in Christ", 
          scripture: "John 15:4", 
          scriptureText: "Remain in me, as I also remain in you. No branch can bear fruit by itself; it must remain in the vine. Neither can you bear fruit unless you remain in me.",
          description: "Staying connected to Jesus for spiritual life",
          reflectionQuestions: [
            "What does it mean to 'remain' or abide in Christ?",
            "How do you stay spiritually connected to Jesus daily?",
            "What fruit is God wanting to produce through your life?"
          ],
          prayer: "Jesus, my vine, help me to remain in You always. I cannot bear spiritual fruit without staying connected to You. Keep me close to Your heart. Amen."
        }
      ]
    },
    {
      topic: "Trusting in Christ",
      plans: [
        { 
          title: "Christ Our Rock", 
          scripture: "1 Corinthians 10:4", 
          scriptureText: "And drank the same spiritual drink; for they drank from the spiritual rock that accompanied them, and that rock was Christ.",
          description: "Christ as our firm foundation",
          reflectionQuestions: [
            "How is Christ like a rock in your life?",
            "What storms have you weathered because you trusted in Christ?",
            "How can you build your life more firmly on Christ?"
          ],
          prayer: "Christ my Rock, I build my life on You as my firm foundation. When storms come, help me to stand strong because I trust in You completely. Amen."
        },
        { 
          title: "Trust in the Lord", 
          scripture: "Psalm 37:3", 
          scriptureText: "Trust in the Lord and do good; dwell in the land and enjoy safe pasture.",
          description: "Active trust that leads to blessing",
          reflectionQuestions: [
            "How can you actively trust the Lord while doing good?",
            "What 'safe pasture' has God provided for you?",
            "What good works is God calling you to do in trust?"
          ],
          prayer: "Lord, I choose to trust in You and do the good works You have prepared for me. Thank You for the safe pasture and provision You give. Amen."
        },
        { 
          title: "Jesus Our Savior", 
          scripture: "Acts 4:12", 
          scriptureText: "Salvation is found in no one else, for there is no other name under heaven given to mankind by which we must be saved.",
          description: "Complete trust in Christ alone for salvation",
          reflectionQuestions: [
            "Why is Jesus the only way of salvation?",
            "How does trusting in Christ alone for salvation bring peace?",
            "What false saviors or securities do you need to stop trusting?"
          ],
          prayer: "Jesus, my only Savior, I trust in You alone for my salvation. There is no other name by which I can be saved. I put my complete trust in You. Amen."
        }
      ]
    },
    {
      topic: "Salvation Through Christ",
      plans: [
        { 
          title: "God's Gift of Salvation", 
          scripture: "Romans 6:23", 
          scriptureText: "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.",
          description: "Understanding salvation as God's free gift",
          reflectionQuestions: [
            "Why do our sins deserve death?",
            "How is eternal life a gift rather than something earned?",
            "What does it mean that this gift comes through Christ Jesus?"
          ],
          prayer: "God of grace, thank You for the gift of eternal life through Christ Jesus. I don't deserve this gift, but I gratefully receive it by faith. Amen."
        },
        { 
          title: "Jesus the Way", 
          scripture: "John 14:6", 
          scriptureText: "Jesus answered, 'I am the way and the truth and the life. No one comes to the Father except through me.'",
          description: "Christ as the only path to God",
          reflectionQuestions: [
            "How is Jesus the way to the Father?",
            "What makes Jesus different from other religious leaders?",
            "How do you share this truth with others who might disagree?"
          ],
          prayer: "Jesus, You are the way, the truth, and the life. Thank You for being the only path to the Father. Help me to walk in Your way always. Amen."
        },
        { 
          title: "New Creation in Christ", 
          scripture: "2 Corinthians 5:17", 
          scriptureText: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
          description: "The transformation of salvation",
          reflectionQuestions: [
            "What does it mean to be a 'new creation' in Christ?",
            "What old things has God taken away from your life?",
            "How can you live out your new identity in Christ?"
          ],
          prayer: "Creator God, thank You for making me a new creation in Christ. Help me to live out of my new identity and let go of the old ways. Amen."
        }
      ]
    },
    {
      topic: "Witnessing to Others",
      plans: [
        { 
          title: "Ready to Give an Answer", 
          scripture: "1 Peter 3:15", 
          scriptureText: "But in your hearts revere Christ as Lord. Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have. But do this with gentleness and respect.",
          description: "Being prepared to share your faith",
          reflectionQuestions: [
            "What reason would you give for the hope you have in Christ?",
            "How can you share your faith with gentleness and respect?",
            "Who in your life might be asking about your hope?"
          ],
          prayer: "Lord Christ, prepare my heart to always be ready to share the reason for my hope in You. Help me to speak with gentleness and respect to all who ask. Amen."
        },
        { 
          title: "Let Your Light Shine", 
          scripture: "Matthew 5:16", 
          scriptureText: "In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven.",
          description: "Living as a witness through good deeds",
          reflectionQuestions: [
            "How does your life shine God's light to others?",
            "What good deeds can point people to your Heavenly Father?",
            "Who around you needs to see Christ's light through you?"
          ],
          prayer: "Father in heaven, let my light shine before others through good deeds that bring You glory. Use my life as a witness to Your goodness and love. Amen."
        },
        { 
          title: "Go and Tell", 
          scripture: "Mark 16:15", 
          scriptureText: "He said to them, 'Go into all the world and preach the gospel to all creation.'",
          description: "The great commission to share the gospel",
          reflectionQuestions: [
            "What is your role in sharing the gospel with the world?",
            "Who in your sphere of influence needs to hear the good news?",
            "How can you 'go' and share Christ where you are?"
          ],
          prayer: "Jesus, You have commanded us to go and share the gospel. Give me courage and opportunities to share Your good news with those around me. Amen."
        }
      ]
    },
    {
      topic: "Obedience to God",
      plans: [
        { 
          title: "Love Shows Obedience", 
          scripture: "John 14:15", 
          scriptureText: "If you love me, keep my commands.",
          description: "Obedience as an expression of love for God",
          reflectionQuestions: [
            "How does keeping God's commands show your love for Him?",
            "Which of Jesus' commands do you find most challenging to obey?",
            "What motivates you to obey God - love or duty?"
          ],
          prayer: "Jesus, because I love You, I want to keep Your commands. Help me to obey You not from duty alone but from a heart of love for You. Amen."
        },
        { 
          title: "Better Than Sacrifice", 
          scripture: "1 Samuel 15:22", 
          scriptureText: "But Samuel replied: 'Does the Lord delight in burnt offerings and sacrifices as much as in obeying the Lord? To obey is better than sacrifice, and to heed is better than the fat of rams.'",
          description: "God values obedience over religious ritual",
          reflectionQuestions: [
            "Why is obedience better than sacrifice in God's eyes?",
            "Are there areas where you're offering 'sacrifices' instead of simple obedience?",
            "What is God asking you to obey that you've been avoiding?"
          ],
          prayer: "Lord, I want to offer You obedience rather than empty sacrifices. Help me to heed Your voice and obey what You're asking of me. Amen."
        },
        { 
          title: "Walking in God's Ways", 
          scripture: "Deuteronomy 10:12", 
          scriptureText: "And now, Israel, what does the Lord your God ask of you but to fear the Lord your God, to walk in obedience to him, to love him, to serve the Lord your God with all your heart and with all your soul.",
          description: "Complete obedience with heart and soul",
          reflectionQuestions: [
            "What does it mean to fear the Lord?",
            "How can you walk in obedience to God with your whole heart?",
            "In what ways can you serve God with all your heart and soul?"
          ],
          prayer: "Lord my God, I want to fear You, walk in obedience to You, love You, and serve You with all my heart and soul. Help me to hold nothing back. Amen."
        }
      ]
    },
    {
      topic: "Praying in Faith",
      plans: [
        { 
          title: "Faith-Filled Prayer", 
          scripture: "Mark 11:24", 
          scriptureText: "Therefore I tell you, whatever you ask for in prayer, believe that you have received it, and it will be yours.",
          description: "Praying with confident faith",
          reflectionQuestions: [
            "What does it mean to believe you have received what you pray for?",
            "How can you grow in faith when you pray?",
            "What requests are you bringing to God with faith today?"
          ],
          prayer: "God, increase my faith when I pray to You. Help me to believe confidently in Your power to answer and Your love to provide what's best for me. Amen."
        },
        { 
          title: "Praying God's Will", 
          scripture: "1 John 5:14", 
          scriptureText: "This is the confidence we have in approaching God: that if we ask anything according to his will, he hears us.",
          description: "Aligning our prayers with God's will",
          reflectionQuestions: [
            "How can you know God's will when you pray?",
            "What confidence does praying according to God's will give you?",
            "How do you surrender your will to God's will in prayer?"
          ],
          prayer: "Father, help me to pray according to Your will, not just my desires. Give me confidence that You hear me when I align my heart with Yours. Amen."
        },
        { 
          title: "Persistent Prayer", 
          scripture: "Luke 18:1", 
          scriptureText: "Then Jesus told his disciples a parable to show them that they should always pray and not give up.",
          description: "Never giving up in prayer",
          reflectionQuestions: [
            "What does it mean to 'always pray and not give up'?",
            "How do you persevere when prayers seem unanswered?",
            "What requests have you been tempted to stop praying about?"
          ],
          prayer: "Lord, teach me to always pray and never give up. When prayers seem unanswered, help me to persist in faith, trusting Your perfect timing. Amen."
        }
      ]
    },
    {
      topic: "Worshipping for a Lifetime",
      plans: [
        { 
          title: "Spirit and Truth", 
          scripture: "John 4:24", 
          scriptureText: "God is spirit, and his worshipers must worship in the Spirit and in truth.",
          description: "True worship from the heart",
          reflectionQuestions: [
            "What does it mean to worship in spirit and in truth?",
            "How is heart worship different from just external worship?",
            "What truths about God inspire your worship most?"
          ],
          prayer: "God, I want to worship You in spirit and in truth. Help my worship to come from my heart and be based on who You really are. Amen."
        },
        { 
          title: "Living Sacrifice", 
          scripture: "Romans 12:1", 
          scriptureText: "Therefore, I urge you, brothers and sisters, in view of God's mercy, to offer your bodies as a living sacrifice, holy and pleasing to God—this is your true and proper worship.",
          description: "Worship as a way of life",
          reflectionQuestions: [
            "How is your whole life an act of worship?",
            "What does it mean to offer your body as a living sacrifice?",
            "How can your daily activities become worship to God?"
          ],
          prayer: "Merciful God, I offer my whole life to You as worship. Help me to live as a living sacrifice, holy and pleasing to You in all I do. Amen."
        },
        { 
          title: "Declare His Glory", 
          scripture: "Psalm 96:3", 
          scriptureText: "Declare his glory among the nations, his marvelous deeds among all peoples.",
          description: "Worship that proclaims God's greatness",
          reflectionQuestions: [
            "How can you declare God's glory to others?",
            "What marvelous deeds of God can you share with people?",
            "How does worship naturally lead to evangelism?"
          ],
          prayer: "Glorious God, I want to declare Your glory and marvelous deeds to everyone around me. Let my worship overflow into testimony of Your goodness. Amen."
        }
      ]
    },
    {
      topic: "When Temptation Strikes",
      plans: [
        { 
          title: "Way of Escape", 
          scripture: "1 Corinthians 10:13", 
          scriptureText: "No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear. But when you are tempted, he will also provide a way out so that you can endure it.",
          description: "God provides escape from temptation",
          reflectionQuestions: [
            "What temptations do you face most often?",
            "How has God provided a way of escape from temptation before?",
            "What does it mean that God won't let you be tempted beyond what you can bear?"
          ],
          prayer: "Faithful God, when temptation comes, help me to look for and take the way of escape You provide. I trust that You won't allow more than I can bear. Amen."
        },
        { 
          title: "Submit and Resist", 
          scripture: "James 4:7", 
          scriptureText: "Submit yourselves, then, to God. Resist the devil, and he will flee from you.",
          description: "The two-step approach to overcoming temptation",
          reflectionQuestions: [
            "What does it mean to submit yourself to God during temptation?",
            "How can you actively resist the devil's temptations?",
            "What promise does God give when you resist the devil?"
          ],
          prayer: "God, I submit myself to You completely. Give me strength to resist the devil's temptations, knowing that he will flee when I stand firm in You. Amen."
        },
        { 
          title: "Word as Weapon", 
          scripture: "Matthew 4:4", 
          scriptureText: "Jesus answered, 'It is written: Man shall not live on bread alone, but on every word that comes from the mouth of God.'",
          description: "Using Scripture to overcome temptation like Jesus did",
          reflectionQuestions: [
            "How did Jesus use Scripture to overcome temptation?",
            "What Bible verses can you memorize to help fight specific temptations?",
            "How does God's Word give you strength to resist sin?"
          ],
          prayer: "Lord Jesus, like You used Scripture to overcome temptation, help me to know and use Your Word as my weapon against the enemy's attacks. Amen."
        }
      ]
    },
    {
      topic: "Living Through Tragedy",
      plans: [
        { 
          title: "God Our Comfort", 
          scripture: "2 Corinthians 1:3-4", 
          scriptureText: "Praise be to the God and Father of our Lord Jesus Christ, the Father of compassion and the God of all comfort, who comforts us in all our troubles, so that we can comfort those in any trouble with the comfort we ourselves receive from God.",
          description: "Finding comfort in God during difficult times",
          reflectionQuestions: [
            "How has God been your comfort in times of trouble?",
            "How can your experience of God's comfort help others?",
            "What troubles do you need God's comfort for today?"
          ],
          prayer: "God of all comfort, thank You for being my source of comfort in every trouble. Help me to share the comfort I receive from You with others who are suffering. Amen."
        },
        { 
          title: "Beauty from Ashes", 
          scripture: "Isaiah 61:3", 
          scriptureText: "And provide for those who grieve in Zion—to bestow on them a crown of beauty instead of ashes, the oil of joy instead of mourning, and a garment of praise instead of a spirit of despair.",
          description: "God's ability to bring good from tragedy",
          reflectionQuestions: [
            "What ashes in your life need to become beauty?",
            "How can mourning be transformed into joy?",
            "What would a garment of praise look like in your current situation?"
          ],
          prayer: "God of restoration, take the ashes of my pain and create beauty. Transform my mourning into joy and my despair into praise. I trust Your power to redeem. Amen."
        },
        { 
          title: "All Things for Good", 
          scripture: "Romans 8:28", 
          scriptureText: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
          description: "Trusting God's purpose in all circumstances",
          reflectionQuestions: [
            "How can God work even tragedy for good?",
            "What does it mean to be 'called according to his purpose'?",
            "How do you trust God's goodness when life doesn't make sense?"
          ],
          prayer: "Sovereign God, I believe that You work all things for good for those who love You. Help me to trust Your purpose even when I can't understand Your ways. Amen."
        }
      ]
    },
    {
      topic: "God's Faithful Provision",
      plans: [
        { 
          title: "Daily Bread", 
          scripture: "Matthew 6:11", 
          scriptureText: "Give us today our daily bread.",
          description: "Trusting God for daily provision",
          reflectionQuestions: [
            "What does 'daily bread' represent beyond just food?",
            "How does asking for daily bread teach dependence on God?",
            "What daily provisions do you need to trust God for?"
          ],
          prayer: "Provider God, I ask You to give me my daily bread - all that I need for today. Help me to depend on You day by day for Your faithful provision. Amen."
        },
        { 
          title: "God Will Supply", 
          scripture: "Philippians 4:19", 
          scriptureText: "And my God will meet all your needs according to the riches of his glory in Christ Jesus.",
          description: "God's promise to meet all our needs",
          reflectionQuestions: [
            "What's the difference between wants and needs in God's provision?",
            "How do the riches of God's glory relate to His provision?",
            "What needs are you trusting God to supply right now?"
          ],
          prayer: "God of abundant riches, I trust You to meet all my needs according to Your glorious riches in Christ Jesus. Help me to distinguish between wants and needs. Amen."
        },
        { 
          title: "Seek First the Kingdom", 
          scripture: "Matthew 6:32-33", 
          scriptureText: "For the pagans run after all these things, and your heavenly Father knows that you need them. But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
          description: "Priority leads to provision",
          reflectionQuestions: [
            "How does seeking God's kingdom first affect His provision?",
            "What things are you tempted to 'run after' instead of trusting God?",
            "How does knowing that God knows your needs bring peace?"
          ],
          prayer: "Heavenly Father, You know all my needs before I ask. Help me to seek Your kingdom first, trusting that You will provide all I need as I put You first. Amen."
        }
      ]
    }
  ];

  const generateStudyPlans = () => {
    // Get saved plans or generate new ones
    const savedPlans = localStorage.getItem("gospelAppStudyPlans");
    const savedWeek = localStorage.getItem("gospelAppCurrentWeek");
    
    if (savedPlans && savedWeek === currentWeek.toString()) {
      setStudyPlans(JSON.parse(savedPlans));
      return;
    }

    // Generate random topic for this week
    const randomTopic = studyTopics[Math.floor(Math.random() * studyTopics.length)];
    
    const newPlans: StudyPlan[] = randomTopic.plans.map((plan, index) => ({
      id: `week${currentWeek}-day${index + 1}`,
      title: plan.title,
      description: plan.description,
      day: index + 1,
      topic: randomTopic.topic,
      scripture: plan.scripture,
      scriptureText: plan.scriptureText,
      reflectionQuestions: plan.reflectionQuestions,
      prayer: plan.prayer,
      completed: false
    }));

    setStudyPlans(newPlans);
    localStorage.setItem("gospelAppStudyPlans", JSON.stringify(newPlans));
    localStorage.setItem("gospelAppCurrentWeek", currentWeek.toString());
  };

  const startPlan = (planId: string) => {
    const plan = studyPlans.find(p => p.id === planId);
    if (plan && !plan.completed) {
      setSelectedPlan(plan);
      setIsStudyOpen(true);
    }
  };

  const completePlan = () => {
    if (!selectedPlan) return;
    
    const updatedPlans = studyPlans.map(plan => 
      plan.id === selectedPlan.id ? { ...plan, completed: true } : plan
    );
    
    setStudyPlans(updatedPlans);
    localStorage.setItem("gospelAppStudyPlans", JSON.stringify(updatedPlans));

    // Check if all plans completed, generate new week
    if (updatedPlans.every(plan => plan.completed)) {
      setTimeout(() => {
        const newWeek = currentWeek + 1;
        setCurrentWeek(newWeek);
        localStorage.setItem("gospelAppCurrentWeek", newWeek.toString());
      }, 1000);
    }

    setIsStudyOpen(false);
    setSelectedPlan(null);
  };

  const getDayColor = (day: number, completed: boolean) => {
    if (completed) return "from-green-100 to-green-200 border-green-300";
    
    switch (day) {
      case 1: return "from-blue-100 to-blue-200 border-blue-300";
      case 2: return "from-purple-100 to-purple-200 border-purple-300";
      case 3: return "from-orange-100 to-orange-200 border-orange-300";
      default: return "from-gray-100 to-gray-200 border-gray-300";
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-primary mb-2">3-Day Bible Study Plans</h2>
        <p className="text-sm text-muted-foreground">
          Topic: <span className="font-medium">{studyPlans[0]?.topic}</span>
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {studyPlans.map((plan) => (
          <Card 
            key={plan.id}
            className={`cursor-pointer hover-elevate transition-all bg-gradient-to-br ${getDayColor(plan.day, plan.completed)}`}
            onClick={() => !plan.completed && startPlan(plan.id)}
            data-testid={`plan-day${plan.day}`}
          >
            <CardContent className="p-3 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-1">
                  {plan.completed ? (
                    <Star className="w-4 h-4 text-green-600 fill-current" />
                  ) : (
                    <BookOpen className="w-4 h-4 text-primary" />
                  )}
                  <Clock className="w-3 h-3 text-muted-foreground" />
                </div>
                
                <div>
                  <h3 className="font-bold text-sm text-primary">
                    Day {plan.day}
                  </h3>
                  <p className="text-xs font-medium text-muted-foreground">
                    {plan.title}
                  </p>
                </div>

                <div className="text-xs text-muted-foreground text-center">
                  <p className="font-medium">{plan.scripture}</p>
                </div>

                {!plan.completed && (
                  <Button 
                    size="sm" 
                    className="mt-1 h-6 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      startPlan(plan.id);
                    }}
                    data-testid={`button-start-day${plan.day}`}
                  >
                    Start
                  </Button>
                )}
                
                {plan.completed && (
                  <span className="text-xs text-green-600 font-medium">
                    Completed ✓
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Study Plan Detail Modal */}
      <Dialog open={isStudyOpen} onOpenChange={setIsStudyOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="dialog-study-plan">
          {selectedPlan && (
            <>
              <DialogHeader>
                <DialogTitle className="text-center text-2xl font-bold text-primary">
                  Day {selectedPlan.day}: {selectedPlan.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 mt-4">
                {/* Scripture Section */}
                <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg text-primary mb-2">Today's Scripture</h3>
                  <p className="text-sm font-medium text-muted-foreground mb-3">
                    {selectedPlan.scripture}
                  </p>
                  <blockquote className="text-lg italic text-primary border-l-4 border-primary pl-4 leading-relaxed">
                    "{selectedPlan.scriptureText}"
                  </blockquote>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-bold text-lg text-primary mb-2">Study Focus</h3>
                  <p className="text-muted-foreground">
                    {selectedPlan.description}
                  </p>
                </div>

                {/* Reflection Questions */}
                <div>
                  <h3 className="font-bold text-lg text-primary mb-3">Reflection Questions</h3>
                  <div className="space-y-3">
                    {selectedPlan.reflectionQuestions.map((question, index) => (
                      <div key={index} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
                          {index + 1}
                        </span>
                        <p className="text-muted-foreground">{question}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prayer */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg text-primary mb-3">Prayer for Today</h3>
                  <p className="text-muted-foreground italic leading-relaxed">
                    {selectedPlan.prayer}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={completePlan}
                    className="flex-1"
                    data-testid="button-complete-study"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Complete Study
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsStudyOpen(false)}
                    data-testid="button-close-study"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}