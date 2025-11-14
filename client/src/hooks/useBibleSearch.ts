import { useMutation } from "@tanstack/react-query";
import { bibleSearchService, BibleSearchResponse } from "@/services/bibleSearchService";

export function useBibleSearchMutation() {
  return useMutation<BibleSearchResponse, Error, string>({
    mutationFn: (query: string) => bibleSearchService.search(query),
  });
}
