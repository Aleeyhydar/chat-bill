import { useState } from "react";
import { Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import InvoiceSidebar from "@/components/InvoiceSidebar";
import ChatArea from "@/components/ChatArea";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [menuHovered, setMenuHovered] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar */}
      <InvoiceSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-border bg-background">
          {!sidebarOpen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              onMouseEnter={() => setMenuHovered(true)}
              onMouseLeave={() => setMenuHovered(false)}
              className="hover:bg-muted"
            >
            {menuHovered ? (
                <Menu className="h-6 w-6" />
              ) : (
                <Sparkles className="h-6 w-6 text-primary" />
              )}
            </Button>
          )}
          <h1 className="text-lg font-semibold text-foreground lg:hidden">InvoiceAI</h1>
          {!sidebarOpen && <div className="w-10 lg:hidden" />}
        </header>

        {/* Chat Area */}
        <ChatArea />
      </div>
    </div>
  );
};

export default Index;
