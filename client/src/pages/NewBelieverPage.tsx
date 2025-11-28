import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, BookOpen, Users, MessageCircle, Church, Calendar, Heart, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface NextStep {
  id: string;
  title: string;
  description: string;
  icon: typeof BookOpen;
  action: string;
  actionRoute: string;
  color: string;
  completed: boolean;
}

interface NewBelieverPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export default function NewBelieverPage({ onNavigate }: NewBelieverPageProps) {
  const [completedSteps, setCompletedSteps] = useState<string[]>(() => {
    const saved = localStorage.getItem('newBelieverProgress');
    return saved ? JSON.parse(saved) : [];
  });

  const nextSteps: NextStep[] = [
    {
      id: 'read-bible',
      title: 'Start Reading the Bible',
      description: 'Begin with the Gospel of John to learn more about Jesus and His teachings.',
      icon: BookOpen,
      action: 'Read John Chapter 1',
      actionRoute: 'bible',
      color: 'from-blue-500 to-indigo-600',
      completed: completedSteps.includes('read-bible')
    },
    {
      id: 'daily-verse',
      title: 'Get Daily Encouragement',
      description: 'Start each day with Scripture to grow your faith and connect with God.',
      icon: Calendar,
      action: 'See Today\'s Verse',
      actionRoute: 'home',
      color: 'from-amber-500 to-orange-600',
      completed: completedSteps.includes('daily-verse')
    },
    {
      id: 'learn-pray',
      title: 'Learn to Pray',
      description: 'Prayer is simply talking to God. He wants to hear from you!',
      icon: MessageCircle,
      action: 'Start Prayer Journey',
      actionRoute: 'discipleship',
      color: 'from-purple-500 to-violet-600',
      completed: completedSteps.includes('learn-pray')
    },
    {
      id: 'join-community',
      title: 'Find a Church Family',
      description: 'Connect with other believers who can encourage you and help you grow.',
      icon: Church,
      action: 'Learn About Church',
      actionRoute: 'discipleship',
      color: 'from-teal-500 to-cyan-600',
      completed: completedSteps.includes('join-community')
    },
    {
      id: 'share-faith',
      title: 'Tell Someone',
      description: 'Share your decision with a friend or family member. Your testimony matters!',
      icon: Users,
      action: 'Share Your Story',
      actionRoute: 'friends',
      color: 'from-rose-500 to-pink-600',
      completed: completedSteps.includes('share-faith')
    },
    {
      id: 'discipleship',
      title: 'Start a Growth Plan',
      description: 'Follow a structured plan to deepen your understanding of faith.',
      icon: Heart,
      action: 'Browse Plans',
      actionRoute: 'discipleship',
      color: 'from-emerald-500 to-green-600',
      completed: completedSteps.includes('discipleship')
    }
  ];

  const markCompleted = (stepId: string, route: string) => {
    const newCompleted = [...completedSteps, stepId];
    setCompletedSteps(newCompleted);
    localStorage.setItem('newBelieverProgress', JSON.stringify(newCompleted));
    
    // Navigate to the appropriate page
    if (route === 'bible') {
      onNavigate('bible', { book: 'John', chapter: 1 });
    } else {
      onNavigate(route);
    }
  };

  const progressPercent = (completedSteps.length / nextSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('home')}
            className="rounded-full bg-gray-100 dark:bg-gray-800"
            data-testid="button-newbeliever-back"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Your Next Steps</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 max-w-lg mx-auto">
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to Your New Life!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Here are some steps to help you grow in your new faith in Jesus Christ.
          </p>
        </motion.div>

        {/* Progress Card */}
        <Card className="p-4 mb-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Your Progress</span>
            <span className="text-sm">{completedSteps.length} of {nextSteps.length} steps</span>
          </div>
          <Progress 
            value={progressPercent} 
            className="h-2 bg-white/30"
          />
          {completedSteps.length === nextSteps.length && (
            <p className="mt-2 text-sm text-emerald-100">
              Amazing! You've completed all the first steps! 🎉
            </p>
          )}
        </Card>

        {/* Scripture Encouragement */}
        <Card className="p-4 mb-6 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
          <p className="text-amber-900 dark:text-amber-100 italic font-serif">
            "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new."
          </p>
          <p className="text-right text-amber-700 dark:text-amber-300 text-sm mt-2 font-medium">
            — 2 Corinthians 5:17
          </p>
        </Card>

        {/* Next Steps List */}
        <div className="space-y-4">
          {nextSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`p-4 transition-all ${
                  step.completed 
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800' 
                    : 'hover-elevate'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0`}>
                    {step.completed ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : (
                      <step.icon className="w-6 h-6 text-white" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                      {step.completed && (
                        <span className="text-xs bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                          Done
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {step.description}
                    </p>
                    
                    {!step.completed && (
                      <Button
                        size="sm"
                        onClick={() => markCompleted(step.id, step.actionRoute)}
                        className={`mt-3 bg-gradient-to-r ${step.color} text-white hover:opacity-90`}
                        data-testid={`button-step-${step.id}`}
                      >
                        {step.action}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Encouragement Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Remember, growth takes time. God is with you every step of the way!
          </p>
          <Button
            variant="outline"
            onClick={() => onNavigate('home')}
            className="mt-4"
            data-testid="button-newbeliever-home"
          >
            Return to Home
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
