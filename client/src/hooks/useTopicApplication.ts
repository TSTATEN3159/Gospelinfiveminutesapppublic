import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface TopicApplicationInput {
  topic: string;
  references: string[];
  translation?: string;
}

interface TopicApplicationResponse {
  success: boolean;
  application?: string;
  error?: string;
}

export function useTopicApplication() {
  return useMutation<TopicApplicationResponse, Error, TopicApplicationInput>({
    mutationFn: async (payload) => {
      const res = await apiRequest("POST", "/api/topic-application", payload);
      if (!res.ok) throw new Error("Failed to generate application");
      return res.json();
    },
  });
}
