import { useState, useEffect } from "react";
import { X, Leaf, Sparkles, Heart } from "lucide-react";
import { isAbideOnboardingCompleted, markAbideOnboardingCompleted } from "@/lib/abideStorage";
import { tapHaptic } from "@/lib/nativeEnhancements";

export default function AbideOnboarding() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isAbideOnboardingCompleted()) {
      setShow(true);
    }
  }, []);

  const handleClose = async () => {
    await tapHaptic();
    markAbideOnboardingCompleted();
    setShow(false);
  };

  const handleNext = async () => {
    await tapHaptic();
    if (step < 2) {
      setStep(step + 1);
    } else {
      handleClose();
    }
  };

  if (!show) return null;

  const steps = [
    {
      icon: <Leaf className="w-12 h-12 text-emerald-400" />,
      title: "Welcome to Abide",
      description: "Each day, focus on one fruit of the Spirit. Take 5 minutes to hear God's Word, reflect, and respond."
    },
    {
      icon: <Heart className="w-12 h-12 text-rose-400" />,
      title: "Grow Your Tree",
      description: "Complete your daily Abide session to add fruit to your Tree of Life. Build a streak as you grow in Christ."
    },
    {
      icon: <Sparkles className="w-12 h-12 text-amber-400" />,
      title: "Small Steps, Big Fruit",
      description: "Each session has 4 simple steps: Hear, Reflect, Act, and Pray. Real transformation happens one day at a time."
    }
  ];

  const currentStep = steps[step];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6">
      <div className="relative w-full max-w-sm rounded-3xl bg-gradient-to-br from-emerald-900/90 to-slate-900/90 border border-emerald-700/40 p-6">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-4 p-4 rounded-full bg-black/40">
            {currentStep.icon}
          </div>
          
          <h2 className="text-xl font-bold text-emerald-100 mb-2">
            {currentStep.title}
          </h2>
          
          <p className="text-sm text-slate-300 mb-6">
            {currentStep.description}
          </p>

          {/* Progress dots */}
          <div className="flex gap-2 mb-6">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === step ? "bg-emerald-400" : "bg-slate-600"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-full rounded-full bg-emerald-500 py-3 text-sm font-semibold text-black shadow-lg shadow-emerald-900/60"
          >
            {step < 2 ? "Next" : "Let's Begin"}
          </button>
        </div>
      </div>
    </div>
  );
}
