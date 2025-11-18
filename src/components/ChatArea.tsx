import { Send, Sparkles, FileText, DollarSign, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const ChatArea = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "I'll create that invoice for you. I've generated an invoice for ₦50,000 to Adamu Musa for web design services. Would you like to preview it or make any changes?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, response]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-chat-bg relative overflow-hidden">
      {messages.length === 0 && (
        <>
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Gradient Orbs */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-500" />
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
            
            {/* Floating Invoice Icons */}
            <div className="absolute top-20 left-[10%] animate-float">
              <FileText className="h-8 w-8 text-primary/30" />
            </div>
            <div className="absolute top-40 right-[15%] animate-float-delayed">
              <DollarSign className="h-10 w-10 text-accent/30" />
            </div>
            <div className="absolute bottom-32 left-[20%] animate-float">
              <FileText className="h-6 w-6 text-primary/20" />
            </div>
            <div className="absolute bottom-20 right-[25%] animate-float-delayed">
              <DollarSign className="h-7 w-7 text-accent/20" />
            </div>
          </div>
        </>
      )}
      
      {messages.length === 0 ? (
        /* Welcome Screen - ChatGPT Style */
        <div className="flex-1 flex flex-col items-center px-4 py-8 relative z-10 overflow-y-auto">
          <div className="w-full max-w-4xl space-y-6 my-auto">
            <div className="text-center space-y-4 mb-8">
              <div className="relative inline-block">
                <Sparkles className="h-16 w-16 text-primary mx-auto mb-6 animate-pulse" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full animate-ping" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Welcome to InvoiceAI
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Create professional invoices in seconds with AI. Just describe what you need.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="relative mb-8">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Try: "Create an invoice for ₦50,000 to Adamu Musa for web design services"'
                className="min-h-[80px] max-h-[200px] pr-12 resize-none bg-background border-border focus-visible:ring-primary rounded-2xl text-base shadow-lg"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim()}
                className="absolute right-3 bottom-3 h-10 w-10 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-50 transition-all duration-200"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground text-center mb-8">
              Press Enter to send, Shift + Enter for new line
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 hover:bg-card/70 transition-all duration-300 hover:scale-105">
                <Zap className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">Generate invoices in seconds with AI</p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 hover:bg-card/70 transition-all duration-300 hover:scale-105">
                <FileText className="h-8 w-8 text-accent mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Professional</h3>
                <p className="text-sm text-muted-foreground">Beautiful, ready-to-send formats</p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 hover:bg-card/70 transition-all duration-300 hover:scale-105">
                <Clock className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Smart Tracking</h3>
                <p className="text-sm text-muted-foreground">Keep track of all your invoices</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Chat View */
        <>
          <ScrollArea className="flex-1 px-4">
            <div className="max-w-3xl mx-auto py-8">
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-2xl px-6 py-4 rounded-2xl transition-all duration-200 ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-chat-bubble text-chat-bubble-foreground"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      <span className="text-xs opacity-70 mt-2 block">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-border bg-background">
            <div className="max-w-3xl mx-auto p-4">
              <form onSubmit={handleSubmit} className="relative">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe your invoice (e.g., Create an invoice for ₦50,000 to Adamu Musa for web design)..."
                  className="min-h-[60px] max-h-[200px] pr-12 resize-none bg-muted border-border focus-visible:ring-primary rounded-xl"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim()}
                  className="absolute right-2 bottom-2 h-10 w-10 rounded-lg bg-primary hover:bg-primary/90 disabled:opacity-50 transition-all duration-200"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Press Enter to send, Shift + Enter for new line
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatArea;
