import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Star } from "lucide-react";

interface StudyPlan {
  id: string;
  title: string;
  description: string;
  day: number;
  topic: string;
  scripture: string;
  completed: boolean;
}

export default function BibleStudyPlans() {
  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([]);
  const [currentWeek, setCurrentWeek] = useState(1);

  useEffect(() => {
    generateStudyPlans();
  }, [currentWeek]);

  const studyTopics = [
    {
      topic: "Faith & Trust",
      plans: [
        { title: "Building Faith", scripture: "Hebrews 11:1", description: "Understanding the foundation of faith" },
        { title: "Trusting God", scripture: "Proverbs 3:5-6", description: "Learning to trust in all circumstances" },
        { title: "Faith in Action", scripture: "James 2:14-17", description: "Living out your faith daily" }
      ]
    },
    {
      topic: "Love & Compassion",
      plans: [
        { title: "God's Love", scripture: "1 John 4:8", description: "Experiencing divine love" },
        { title: "Loving Others", scripture: "Matthew 22:39", description: "Showing love to your neighbors" },
        { title: "Compassionate Heart", scripture: "Colossians 3:12", description: "Developing compassion for all" }
      ]
    },
    {
      topic: "Peace & Hope",
      plans: [
        { title: "Inner Peace", scripture: "Philippians 4:7", description: "Finding peace in troubled times" },
        { title: "Hope in Christ", scripture: "Romans 15:13", description: "Anchoring hope in faith" },
        { title: "Peaceful Living", scripture: "Isaiah 26:3", description: "Living with perfect peace" }
      ]
    },
    {
      topic: "Wisdom & Understanding",
      plans: [
        { title: "Seeking Wisdom", scripture: "James 1:5", description: "Asking God for wisdom" },
        { title: "Divine Understanding", scripture: "Proverbs 2:6", description: "Gaining spiritual insight" },
        { title: "Wise Decisions", scripture: "Proverbs 27:14", description: "Making godly choices" }
      ]
    },
    {
      topic: "Forgiveness & Grace",
      plans: [
        { title: "God's Forgiveness", scripture: "1 John 1:9", description: "Receiving divine forgiveness" },
        { title: "Forgiving Others", scripture: "Matthew 6:14-15", description: "Learning to forgive completely" },
        { title: "Living in Grace", scripture: "Ephesians 2:8-9", description: "Understanding amazing grace" }
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
      completed: false
    }));

    setStudyPlans(newPlans);
    localStorage.setItem("gospelAppStudyPlans", JSON.stringify(newPlans));
    localStorage.setItem("gospelAppCurrentWeek", currentWeek.toString());
  };

  const startPlan = (planId: string) => {
    const updatedPlans = studyPlans.map(plan => 
      plan.id === planId ? { ...plan, completed: true } : plan
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

    console.log(`Starting study plan: ${planId}`);
    // todo: implement actual study plan content display
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
    </div>
  );
}