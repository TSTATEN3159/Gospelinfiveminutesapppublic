import { useQuery } from "@tanstack/react-query";

interface TriviaStats {
  userId: string;
  displayName: string;
  dailyStreak: number;
  lastDailyDate: string | null;
  dailyCrowns: number;
  highestTitle: "None" | "Bible Student" | "Bible Scholar" | "Bible Expert" | "Defender of the Faith";
  mastery: {
    oldTestament: number;
    gospels: number;
    epistles: number;
    prophecy: number;
    peopleOfGod: number;
    geography: number;
  };
  powerUps: {
    secondChance: number;
    revealScripture: number;
    removeTwo: number;
  };
}

export function useTriviaHomeStats() {
  const { data: stats, isLoading } = useQuery<TriviaStats>({
    queryKey: ["/api/trivia/stats"],
  });

  return {
    stats,
    isLoading,
    streakDays: stats?.dailyStreak ?? 0,
    dailyCrowns: stats?.dailyCrowns ?? 0,
    highestTitle: stats?.highestTitle === "None" ? "Getting Started" : stats?.highestTitle ?? "Getting Started",
  };
}
