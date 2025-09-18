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
          scripture: "Proverbs 27:14", 
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