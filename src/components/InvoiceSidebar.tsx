import { Search, FileText, Plus, Menu, X, ChevronLeft, User, CreditCard, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Invoice {
  id: string;
  title: string;
  date: string;
  amount: string;
}

interface InvoiceSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const InvoiceSidebar = ({ isOpen, onToggle }: InvoiceSidebarProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock invoice history
  const invoices: Invoice[] = [
    { id: "1", title: "Web Design for Adamu Musa", date: "Today", amount: "₦50,000" },
    { id: "2", title: "Logo Design", date: "Yesterday", amount: "₦25,000" },
    { id: "3", title: "Mobile App Development", date: "2 days ago", amount: "₦150,000" },
    { id: "4", title: "SEO Services", date: "1 week ago", amount: "₦40,000" },
  ];

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen
          bg-sidebar border-r border-sidebar-border
          flex flex-col z-50
          transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0 w-72" : "-translate-x-full w-0 overflow-hidden"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg text-sidebar-foreground">InvoiceAI</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="hover:bg-sidebar-hover"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>

        {/* New Invoice Button */}
        <div className="p-4">
          <Button className="w-full justify-start gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="h-4 w-4" />
            New Invoice
          </Button>
        </div>

        {/* Search */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-sidebar-accent border-sidebar-border focus-visible:ring-primary"
            />
          </div>
        </div>

        {/* Invoice History */}
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-1 pb-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 mb-2">
              Recent Invoices
            </p>
            {filteredInvoices.map((invoice) => (
              <button
                key={invoice.id}
                className="w-full text-left p-3 rounded-lg hover:bg-sidebar-hover transition-all duration-200 group"
              >
                <div className="flex items-start gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground mt-0.5 group-hover:text-primary transition-colors" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-sidebar-foreground truncate">
                      {invoice.title}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{invoice.date}</span>
                      <span className="text-xs font-medium text-primary">{invoice.amount}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>

        {/* User Profile */}
        <div className="p-4 border-t border-sidebar-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 w-full hover:bg-sidebar-hover p-2 rounded-lg transition-colors">
                <Avatar className="h-10 w-10 border-2 border-primary/20">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
                  <p className="text-xs text-muted-foreground">Currency: NGN (₦)</p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/edit-profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Edit Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/plans")}>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>View Plans</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={() => navigate("/signin")}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
    </>
  );
};

export default InvoiceSidebar;
