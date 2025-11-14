import { useMutation } from "@tanstack/react-query";
import { triviaService, TriviaResponse, TriviaGenerateParams } from "@/services/triviaService";

export function useBibleTriviaMutation() {
  return useMutation<TriviaResponse, Error, TriviaGenerateParams>({
    mutationFn: (params: TriviaGenerateParams) => triviaService.generateQuiz(params),
  });
}
