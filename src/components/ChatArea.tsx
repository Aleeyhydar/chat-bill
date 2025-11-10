import { Send, Sparkles } from "lucide-react";
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
    <div className="flex flex-col h-screen bg-chat-bg">
      {messages.length === 0 ? (
        /* Welcome Screen - ChatGPT Style */
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="w-full max-w-3xl space-y-8">
            <div className="text-center space-y-4 mb-12">
              <Sparkles className="h-16 w-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Welcome to InvoiceAI
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                I'm here to help you create professional invoices. Just describe what you need, for example: "Create an invoice for ₦50,000 to Adamu Musa for web design services."
              </p>
            </div>

            <form onSubmit={handleSubmit} className="relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your invoice (e.g., Create an invoice for ₦50,000 to Adamu Musa for web design)..."
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
            <p className="text-xs text-muted-foreground text-center">
              Press Enter to send, Shift + Enter for new line
            </p>
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
