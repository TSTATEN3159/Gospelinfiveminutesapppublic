import { useMutation } from '@tanstack/react-query';
import { verseInsightsService } from '@/services/verseInsightsService';

export function useVersePassageMutation() {
  return useMutation({
    mutationFn: (reference: string) => verseInsightsService.fetchPassage(reference),
  });
}

export function usePlainMeaningMutation() {
  return useMutation({
    mutationFn: ({ verse, reference }: { verse: string; reference: string }) =>
      verseInsightsService.getPlainMeaning({ verse, reference }),
  });
}

export function useInstantApplicationMutation() {
  return useMutation({
    mutationFn: ({ verse, reference }: { verse: string; reference: string }) =>
      verseInsightsService.getInstantApplication({ verse, reference }),
  });
}
