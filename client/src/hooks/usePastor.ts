import { useMutation } from "@tanstack/react-query";
import { pastorService, PastorResponse } from "@/services/pastorService";

export function useAskPastorMutation() {
  return useMutation<PastorResponse, Error, string>({
    mutationFn: (question: string) => pastorService.askPastor(question),
  });
}
