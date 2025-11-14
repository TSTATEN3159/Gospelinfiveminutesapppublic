import { useQuery } from "@tanstack/react-query";
import { readingPlansService } from "@/services/readingPlansService";

export function useReadingPlansQuery() {
  return useQuery({
    queryKey: ["/api/reading-plans"],
    queryFn: () => readingPlansService.getPlans(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
