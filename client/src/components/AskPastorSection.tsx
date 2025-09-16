import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, MessageCircle } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "pastor";
  content: string;
  timestamp: Date;
  scriptureRef?: string;
}

interface AskPastorSectionProps {
  backgroundImage?: string;
}

export default function AskPastorSection({ backgroundImage }: AskPastorSectionProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // todo: remove mock functionality - replace with OpenAI API
  const mockPastorResponses = [
    {
      content: "Thank you for your question about faith during difficult times. In Matthew 17:20, Jesus tells us that with faith as small as a mustard seed, we can move mountains. This teaches us that even small faith can accomplish great things when placed in God's hands.",
      scriptureRef: "Matthew 17:20"
    },
    {
      content: "Your question about God's love is beautiful. Romans 8:38-39 reminds us that nothing can separate us from God's love - not trouble, hardship, or any circumstance. His love for you is unchanging and eternal.",
      scriptureRef: "Romans 8:38-39"
    },
    {
      content: "What a wonderful question about prayer! In 1 Thessalonians 5:17, Paul encourages us to 'pray continually.' This means we can talk to God throughout our day, sharing our joys, concerns, and gratitude with Him.",
      scriptureRef: "1 Thessalonians 5:17"
    }
  ];

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");
    setIsLoading(true);

    // todo: remove mock functionality - replace with OpenAI API
    setTimeout(() => {
      const randomResponse = mockPastorResponses[Math.floor(Math.random() * mockPastorResponses.length)];
      const pastorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "pastor",
        content: randomResponse.content,
        timestamp: new Date(),
        scriptureRef: randomResponse.scriptureRef
      };
      
      setMessages(prev => [...prev, pastorMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="relative overflow-hidden min-h-[500px] flex flex-col" data-testid="card-askPastor">
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      
      <CardHeader className="relative z-10 flex-shrink-0">
        <CardTitle className="flex items-center gap-2 text-xl">
          <MessageCircle className="w-6 h-6 text-primary" />
          Ask the Pastor
        </CardTitle>
        <p className="text-muted-foreground">
          Ask any question about the Bible and receive Scripture-based guidance
        </p>
      </CardHeader>

      <CardContent className="relative z-10 flex-1 flex flex-col space-y-4">
        <div className="flex-1 space-y-3 min-h-[250px] max-h-[300px] overflow-y-auto" data-testid="messages-container">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Ask me anything about God's word, and I'll help you find answers in Scripture.</p>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              data-testid={`message-${message.role}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                {message.scriptureRef && (
                  <p className="text-xs mt-2 opacity-80 font-medium">📖 {message.scriptureRef}</p>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-secondary p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Textarea
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask your Bible question here..."
            rows={2}
            className="resize-none"
            disabled={isLoading}
            data-testid="textarea-question"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!currentMessage.trim() || isLoading}
            size="icon"
            className="h-auto"
            data-testid="button-send"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}