import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, MessageSquare, Book, BookOpenCheck, ShieldCheck, Copy, Trash2 } from "lucide-react";
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

  const quickPrompts = [
    "How can I grow stronger in my faith?",
    "What does the Bible say about anxiety?",
    "How do I know God's will for my life?"
  ];

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <Card className="relative overflow-hidden h-[600px] flex flex-col shadow-lg border-2" data-testid="card-askPastor">
      {backgroundImage && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
        </>
      )}
      
      <CardHeader className="relative z-10 flex-shrink-0 bg-gradient-to-r from-primary/10 to-transparent border-b">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarFallback className="bg-primary/10 text-primary">
              <BookOpenCheck className="w-6 h-6" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2 text-xl text-white">
              <MessageSquare className="w-5 h-5" />
              AI Pastor
            </CardTitle>
            <p className="text-white/90 text-sm">
              Scripture-based guidance powered by biblical wisdom
            </p>
          </div>
          {messages.length > 0 && (
            <Button 
              onClick={clearChat}
              size="icon"
              variant="ghost"
              className="text-white/80"
              data-testid="button-clear-chat"
              aria-label="Clear conversation"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="relative z-10 flex-1 flex flex-col p-6 space-y-4">
        <div className="flex-1 space-y-3 overflow-y-auto" data-testid="messages-container" aria-live="polite">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 mx-4">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-gray-900 mb-2">Welcome! I'm here to help</h3>
                <p className="text-gray-700 text-sm mb-4">Ask me anything about God's word, and I'll help you find answers in Scripture.</p>
                <div className="space-y-2">
                  <p className="text-xs text-gray-600 font-medium">Try these questions:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {quickPrompts.map((prompt, index) => (
                      <Badge 
                        key={index}
                        variant="secondary" 
                        className="cursor-pointer hover-elevate text-xs"
                        onClick={() => setCurrentMessage(prompt)}
                        data-testid={`prompt-${index}`}
                      >
                        {prompt}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              data-testid={`message-${message.role}`}
            >
              <div
                className={`max-w-[85%] p-4 rounded-xl shadow-sm ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white/95 backdrop-blur-sm text-gray-900 border border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm leading-relaxed flex-1">{message.content}</p>
                  <Button 
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 opacity-60 flex-shrink-0"
                    onClick={() => navigator.clipboard.writeText(message.content)}
                    data-testid={`copy-message-${message.id}`}
                    aria-label="Copy message"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {message.scriptureRef && (
                      <Badge variant="outline" className="text-xs bg-blue-50 border-blue-200">
                        <Book className="w-3 h-3 mr-1" />
                        {message.scriptureRef}
                      </Badge>
                    )}
                  </div>
                  <time className="text-xs opacity-60">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </time>
                </div>
              </div>
            </div>
          ))}
          
          {askPastorMutation.isPending && (
            <div className="flex justify-start" data-testid="loading-pastor">
              <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex space-x-1 mb-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
                <p className="text-xs text-gray-600">AI Pastor is seeking wisdom in Scripture...</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
          <div className="flex gap-3 mb-3">
            <Textarea
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask your Bible question here..."
              rows={2}
              className="resize-none bg-transparent border-gray-300"
              disabled={askPastorMutation.isPending}
              data-testid="textarea-question"
              aria-label="Ask your Bible question"
              maxLength={500}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!currentMessage.trim() || askPastorMutation.isPending}
              size="icon"
              className="h-auto"
              data-testid="button-send"
              aria-label="Send question"
            >
              {askPastorMutation.isPending ? (
                <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-gray-600">
              <ShieldCheck className="w-3 h-3" />
              <span>Biblically guided AI responses</span>
            </div>
            <span className="text-gray-500">{currentMessage.length}/500</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}