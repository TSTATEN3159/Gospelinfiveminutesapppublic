import { useState, useEffect } from "react";

interface User {
  firstName: string;
  lastName: string;
}

interface GreetingHeaderProps {
  user?: User;
}

export default function GreetingHeader({ user }: GreetingHeaderProps) {
  const [greeting, setGreeting] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      let greetingText = "";
      let period = "";

      if (hour >= 5 && hour < 12) {
        greetingText = "Good morning";
        period = "morning";
      } else if (hour >= 12 && hour < 18) {
        greetingText = "Good afternoon";
        period = "afternoon";
      } else {
        greetingText = "Good evening";
        period = "evening";
      }

      setGreeting(greetingText);
      setTimeOfDay(period);
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const getGradientClass = () => {
    switch (timeOfDay) {
      case "morning":
        return "from-yellow-100 to-orange-100";
      case "afternoon":
        return "from-blue-100 to-sky-100";
      case "evening":
        return "from-purple-100 to-pink-100";
      default:
        return "from-gray-100 to-gray-200";
    }
  };

  return (
    <div 
      className={`bg-gradient-to-r ${getGradientClass()} p-6 text-center rounded-lg mb-8`}
      data-testid="greeting-header"
    >
      <h1 className="text-3xl font-bold text-primary mb-2">
        {greeting}{user ? `, ${user.firstName}` : ""}!
      </h1>
      <p className="text-lg text-muted-foreground">
        Welcome to your daily spiritual journey
      </p>
    </div>
  );
}