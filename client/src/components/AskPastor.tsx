import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Send, Book, Heart, Loader2 } from "lucide-react";
import { pastorService, type PastorMessage } from "../services/pastorService";

interface AskPastorProps {
  onClose?: () => void;
}

export default function AskPastor({ onClose }: AskPastorProps) {
  const [messages, setMessages] = useState<PastorMessage[]>([
    {
      id: '1',
      type: 'pastor',
      content: "Hello! I'm here to provide biblical guidance and spiritual counsel. What's on your heart today? Whether you're facing challenges, have questions about faith, or need prayer, I'm here to help with God's wisdom.",
      timestamp: new Date()
    }
  ]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendQuestion = async () => {
    if (!currentQuestion.trim() || isLoading) return;

    const userMessage: PastorMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: currentQuestion.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentQuestion('');
    setIsLoading(true);

    try {
      const response = await pastorService.askPastor(userMessage.content);
      
      const pastorMessage: PastorMessage = {
        id: (Date.now() + 1).toString(),
        type: 'pastor',
        content: response.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, pastorMessage]);
    } catch (error) {
      const errorMessage: PastorMessage = {
        id: (Date.now() + 1).toString(),
        type: 'pastor',
        content: "I apologize for the technical difficulty. Please know that God hears your heart even when technology fails. Feel free to try your question again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setCurrentQuestion(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendQuestion();
    }
  };

  const suggestedQuestions = pastorService.getSuggestedQuestions().slice(0, 4);

  return (
    <div className="flex flex-col h-full max-h-[80vh]">
      <DialogHeader className="pb-4">
        <DialogTitle className="text-center text-2xl font-bold text-primary flex items-center justify-center gap-2">
          <Heart className="w-6 h-6" />
          Ask the Pastor
        </DialogTitle>
        <p className="text-center text-sm text-muted-foreground">
          Biblical guidance and spiritual counsel for life's questions
        </p>
      </DialogHeader>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-0">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                message.type === 'user'
                  ? 'bg-primary text-primary-foreground ml-4'
                  : 'bg-gradient-to-r from-blue-50 to-purple-50 text-foreground mr-4'
              }`}
            >
              {message.type === 'pastor' && (
                <div className="flex items-center gap-2 mb-2">
                  <Book className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Pastor</span>
                </div>
              )}
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
              <p className="text-xs opacity-70 mt-2">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl px-4 py-3 mr-4">
              <div className="flex items-center gap-2 mb-2">
                <Book className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Pastor</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Seeking wisdom in Scripture...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions (show if no user questions yet) */}
      {messages.length <= 1 && (
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">Common questions I can help with:</p>
          <div className="grid grid-cols-1 gap-2">
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-left justify-start h-auto py-2 text-xs"
                onClick={() => handleSuggestedQuestion(question)}
                data-testid={`button-suggested-${index}`}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t pt-4">
        <div className="flex gap-2">
          <Textarea
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about faith, life, or the Bible..."
            className="flex-1 resize-none min-h-[44px] max-h-32"
            rows={1}
            disabled={isLoading}
            data-testid="textarea-pastor-question"
          />
          <Button
            onClick={handleSendQuestion}
            disabled={!currentQuestion.trim() || isLoading}
            size="icon"
            className="h-11 w-11"
            data-testid="button-send-question"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Guidance rooted in God's Word • Press Enter to send
        </p>
      </div>
    </div>
  );
}