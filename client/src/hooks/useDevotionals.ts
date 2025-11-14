import { useQuery } from "@tanstack/react-query";
import { devotionalsService, DevotionalPlan } from "@/services/devotionalsService";

export function useDevotionalPlanQuery() {
  return useQuery<DevotionalPlan, Error>({
    queryKey: ["/api/devotionals/365"],
    queryFn: () => devotionalsService.getPlan(),
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 1,
  });
}
