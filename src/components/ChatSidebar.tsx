import { useState, useRef, useEffect } from 'react';
import { Send, Trash2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChat, Message } from '@/hooks/useChat';

export function ChatSidebar() {
  const [input, setInput] = useState('');
  const { messages, isLoading, sendMessage, clearMessages } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-playfair font-semibold text-card-foreground">Book Assistant</h2>
              <p className="text-xs text-muted-foreground">Ask me anything about books</p>
            </div>
          </div>
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearMessages}
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-playfair font-semibold text-lg mb-2 text-card-foreground">
              Start a conversation
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Ask for book recommendations, discuss literature, or get help finding your next read
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <MessageBubble key={index} message={message} />
            ))}
            {isLoading && (
              <div className="flex gap-2 items-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-primary-foreground animate-pulse" />
                </div>
                <div className="flex gap-1 items-center p-3 rounded-lg bg-muted">
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-background">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about books..."
            disabled={isLoading}
            className="flex-1 bg-card border-border"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-glow"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-2 items-start ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser 
          ? 'bg-secondary' 
          : 'bg-gradient-to-br from-primary to-accent shadow-glow'
      }`}>
        {isUser ? (
          <span className="text-sm font-medium text-secondary-foreground">You</span>
        ) : (
          <Sparkles className="w-4 h-4 text-primary-foreground" />
        )}
      </div>
      <div className={`max-w-[85%] p-3 rounded-lg ${
        isUser 
          ? 'bg-secondary text-secondary-foreground' 
          : 'bg-muted text-card-foreground'
      }`}>
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}
