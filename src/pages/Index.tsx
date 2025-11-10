import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import InvoiceSidebar from "@/components/InvoiceSidebar";
import ChatArea from "@/components/ChatArea";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
              className="hover:bg-muted"
            >
              <Menu className="h-5 w-5" />
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
