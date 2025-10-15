import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Send, Book, Heart, Loader2, BookOpen, MessageCircle } from "lucide-react";
import { pastorService, type PastorMessage } from "../services/pastorService";
import { useTranslations } from "@/lib/translations";

interface AskPastorProps {
  onClose?: () => void;
  language?: string;
}

export default function AskPastor({ onClose, language = "en" }: AskPastorProps) {
  const t = useTranslations(language);
  const [messages, setMessages] = useState<PastorMessage[]>([
    {
      id: '1',
      type: 'pastor',
      content: t.pastorGreeting,
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
        scriptures: response.scriptures,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, pastorMessage]);
    } catch (error) {
      const errorMessage: PastorMessage = {
        id: (Date.now() + 1).toString(),
        type: 'pastor',
        content: t.technicalDifficulty,
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

  const handlePrayerRequest = (need: string) => {
    const prayerTemplate = pastorService.getPrayerRequestTemplate(need);
    setCurrentQuestion(prayerTemplate);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendQuestion();
    }
  };

  const suggestedQuestions = pastorService.getSuggestedQuestions();

  return (
    <div className="flex flex-col h-full max-h-[80vh]">
      <DialogHeader className="pb-4">
        <DialogTitle className="text-center text-2xl font-bold text-primary flex items-center justify-center gap-2">
          <Heart className="w-6 h-6" />
          {t.askTheAIPastor}
        </DialogTitle>
        <p className="text-center text-sm text-muted-foreground">
          {t.aiPoweredGuidance}
        </p>
        <p className="text-center text-xs text-muted-foreground/80 italic pt-1 border-t">
          {t.aiDisclaimer}
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
                  <span className="text-sm font-medium text-primary">{t.pastor}</span>
                </div>
              )}
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
              {/* Scripture References */}
              {message.type === 'pastor' && message.scriptures && message.scriptures.length > 0 && (
                <div className="mt-3 pt-2 border-t border-primary/20">
                  <div className="flex items-center gap-1 mb-2">
                    <BookOpen className="w-3 h-3 text-primary" />
                    <span className="text-xs font-medium text-primary">{t.scriptureReferences}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {message.scriptures.map((scripture, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                      >
                        <Book className="w-3 h-3" />
                        {scripture}
                      </span>
                    ))}
                  </div>
                </div>
              )}
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
                <span className="text-sm font-medium text-primary">{t.pastor}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">{t.seekingWisdom}</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions and Prayer Requests (show if no user questions yet) */}
      {messages.length <= 1 && (
        <div className="mb-4 space-y-4">
          {/* Prayer Request Quick Actions */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">{t.needPrayerFor}</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: "healing", label: t.healing },
                { key: "guidance", label: t.guidance },
                { key: "strength", label: t.strength },
                { key: "peace", label: t.peace }
              ].map((need, index) => (
                <Button
                  key={need.key}
                  variant="outline"
                  size="sm"
                  className="text-left justify-start h-auto py-2 text-xs"
                  onClick={() => handlePrayerRequest(need.key)}
                  data-testid={`button-prayer-${need.key}`}
                >
                  <MessageCircle className="w-3 h-3 mr-1" />
                  {need.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Common Questions */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">{t.commonQuestionsHelp}</p>
            <div className="grid grid-cols-1 gap-2">
              {suggestedQuestions.slice(0, 4).map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-left justify-start h-auto py-2 text-xs"
                  onClick={() => handleSuggestedQuestion(question)}
                  data-testid={`button-suggested-${index}`}
                >
                  <Heart className="w-3 h-3 mr-1" />
                  {question}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t pt-4">
        <div className="flex gap-2">
          <Textarea
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.askAnythingFaith}
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
          {t.guidanceRootedGodsWord}
        </p>
      </div>
    </div>
  );
}