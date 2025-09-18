// Pastor Service - Biblical guidance using OpenAI
// Using the OpenAI integration blueprint for spiritual counsel

export interface PastorMessage {
  id: string;
  type: 'user' | 'pastor';
  content: string;
  scriptures?: string[];
  timestamp: Date;
}

export interface PastorResponse {
  message: string;
  scriptures?: string[];
  error?: string;
}

class PastorService {
  private apiUrl = '/api/ask-pastor';

  async askPastor(question: string): Promise<PastorResponse> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        message: data.response || "I'm here to help with any spiritual questions you have.",
        scriptures: [
          ...(data.scriptureRef ? [data.scriptureRef] : []),
          ...(data.additionalVerses || [])
        ]
      };
    } catch (error) {
      console.error('Pastor service error:', error);
      return {
        message: "I apologize, but I'm having trouble connecting right now. Please try again in a moment, and I'll be here to help with your spiritual question.",
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Get suggested conversation starters
  getSuggestedQuestions(): string[] {
    return [
      "How can I grow stronger in my faith?",
      "What does the Bible say about anxiety and worry?",
      "How do I know God's will for my life?",
      "I'm struggling with forgiveness. Can you help?",
      "What are practical ways to pray?",
      "How can I trust God during difficult times?",
      "What does it mean to have a personal relationship with Jesus?",
      "How do I handle conflict in a biblical way?"
    ];
  }

  // Get prayer request template
  getPrayerRequestTemplate(need: string): string {
    return `Pastor, I would like prayer for ${need}. Please provide biblical encouragement and a prayer I can use.`;
  }
}

export const pastorService = new PastorService();