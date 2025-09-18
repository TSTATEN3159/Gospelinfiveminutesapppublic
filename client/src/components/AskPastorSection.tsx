import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, MessageCircle, Book } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  // OpenAI Pastor API Integration  
  const askPastorMutation = useMutation({
    mutationFn: async (question: string) => {
      const response = await fetch("/api/ask-pastor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      return response.json();
    },
    onSuccess: (data: any, question) => {
      if (data.success) {
        const pastorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "pastor",
          content: data.response,
          timestamp: new Date(),
          scriptureRef: data.scriptureRef
        };
        setMessages(prev => [...prev, pastorMessage]);
      } else {
        // Show both toast and add message to chat history
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "pastor",
          content: "I'm having trouble connecting right now. Please try again in a moment, and I'll be here to help with your spiritual question.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
        
        toast({
          title: "AI Pastor Unavailable",
          description: "I'm having trouble connecting right now. Please try again in a moment, and I'll be here to help with your spiritual question.",
          variant: "destructive"
        });
      }
    },
    onError: (error) => {
      console.error("Ask Pastor error:", error);
      
      // Add error message to chat history
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "pastor",
        content: "I'm having trouble connecting right now. Please try again in a moment, and I'll be here to help with your spiritual question.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "AI Pastor Unavailable",
        description: "I'm having trouble connecting right now. Please try again in a moment, and I'll be here to help with your spiritual question.",
        variant: "destructive"
      });
    }
  });

  const handleSendMessage = () => {
    if (!currentMessage.trim() || askPastorMutation.isPending) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: currentMessage,
      timestamp: new Date()
    };

    const questionToSend = currentMessage;
    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");
    
    // Call OpenAI API via server route
    askPastorMutation.mutate(questionToSend);
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
          Ask the AI Pastor
        </CardTitle>
        <p className="text-muted-foreground">
          Ask any question about the Bible and receive Scripture-based guidance from AI trained on biblical principles
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
                  <div className="flex items-center gap-1 mt-2">
                    <Book className="w-3 h-3 opacity-80" />
                    <p className="text-xs opacity-80 font-medium">{message.scriptureRef}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {askPastorMutation.isPending && (
            <div className="flex justify-start" data-testid="loading-pastor">
              <div className="bg-secondary p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">AI Pastor is seeking wisdom in Scripture...</p>
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
            disabled={askPastorMutation.isPending}
            data-testid="textarea-question"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!currentMessage.trim() || askPastorMutation.isPending}
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