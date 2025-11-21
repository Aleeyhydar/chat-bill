import { useState } from "react";
import { Users, FileText, Layout, DollarSign, TrendingUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

// Mock data
const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "active", invoiceCount: 23, plan: "Pro" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "active", invoiceCount: 45, plan: "Business" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "inactive", invoiceCount: 8, plan: "Free" },
  { id: 4, name: "Alice Williams", email: "alice@example.com", status: "active", invoiceCount: 67, plan: "Pro" },
];

const mockTemplates = [
  { id: 1, name: "Professional Classic", enabled: true, usageCount: 234 },
  { id: 2, name: "Modern Minimal", enabled: true, usageCount: 189 },
  { id: 3, name: "Bold Creative", enabled: false, usageCount: 56 },
  { id: 4, name: "Elegant Corporate", enabled: true, usageCount: 312 },
];

const navItems = [
  { id: "users", label: "User Management", icon: Users },
  { id: "invoices", label: "Invoice Analytics", icon: FileText },
  { id: "templates", label: "Template Manager", icon: Layout },
  { id: "revenue", label: "Revenue Overview", icon: DollarSign },
  { id: "analytics", label: "Analytics", icon: TrendingUp },
];

export default function Admin() {
  const [activeSection, setActiveSection] = useState("users");
  const [invoiceTimeRange, setInvoiceTimeRange] = useState("all");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col">
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold text-foreground">Admin</h1>
          <p className="text-sm text-muted-foreground">Dashboard</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card px-8 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Dashboard Overview</h2>
          <Badge variant="secondary">Admin Access</Badge>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-8 space-y-12">
          {/* User Management Section */}
          <section id="users" className="scroll-mt-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-foreground mb-2">User Management</h2>
              <p className="text-muted-foreground">Manage users, subscriptions, and account status</p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
                <CardDescription>Overview of registered users and their activity</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Invoices</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === "active" ? "default" : "secondary"}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.invoiceCount}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.plan}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Disable</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>

          {/* Invoice Analytics Section */}
          <section id="invoices" className="scroll-mt-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-foreground mb-2">Invoice Analytics</h2>
              <p className="text-muted-foreground">Track invoice generation and trends</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Total Invoices</CardTitle>
                  <CardDescription>Generated invoices across all users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl font-bold text-foreground">1,247</div>
                    <div className="flex gap-2">
                      {["daily", "weekly", "monthly", "all"].map((range) => (
                        <Button
                          key={range}
                          variant={invoiceTimeRange === range ? "default" : "outline"}
                          size="sm"
                          onClick={() => setInvoiceTimeRange(range)}
                        >
                          {range.charAt(0).toUpperCase() + range.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {invoiceTimeRange === "daily" && "+12 from yesterday"}
                    {invoiceTimeRange === "weekly" && "+89 from last week"}
                    {invoiceTimeRange === "monthly" && "+234 from last month"}
                    {invoiceTimeRange === "all" && "All time total"}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Invoice Trends</CardTitle>
                  <CardDescription>Monthly invoice generation over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center border border-dashed border-border rounded-lg">
                    <p className="text-muted-foreground">Chart Placeholder</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Template Manager Section */}
          <section id="templates" className="scroll-mt-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Template Manager</h2>
                <p className="text-muted-foreground">Manage available invoice templates</p>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add New Template
              </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockTemplates.map((template) => (
                <Card key={template.id}>
                  <CardHeader>
                    <div className="h-32 bg-muted rounded-lg mb-4 flex items-center justify-center">
                      <p className="text-muted-foreground text-sm">Template Preview</p>
                    </div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription>{template.usageCount} times used</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {template.enabled ? "Enabled" : "Disabled"}
                      </span>
                      <Switch checked={template.enabled} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Add New Template</CardTitle>
                <CardDescription>Upload or create a new invoice template</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                  <Layout className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">Drop template files here or click to browse</p>
                  <Button variant="outline">Browse Files</Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Revenue Overview Section */}
          <section id="revenue" className="scroll-mt-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-foreground mb-2">Revenue Overview</h2>
              <p className="text-muted-foreground">Track subscription revenue and growth</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Revenue</CardTitle>
                  <CardDescription>All-time earnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-foreground">₦2.4M</div>
                  <p className="text-sm text-muted-foreground mt-2">+18% from last year</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue</CardTitle>
                  <CardDescription>Current month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-foreground">₦187K</div>
                  <p className="text-sm text-muted-foreground mt-2">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Subscriptions</CardTitle>
                  <CardDescription>Paying users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-foreground">342</div>
                  <p className="text-sm text-muted-foreground mt-2">+24 this month</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>Monthly revenue over the past year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-lg">
                  <p className="text-muted-foreground">Chart Placeholder</p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Analytics Overview Section */}
          <section id="analytics" className="scroll-mt-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-foreground mb-2">Analytics Overview</h2>
              <p className="text-muted-foreground">Platform usage and growth metrics</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>New registrations over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center border border-dashed border-border rounded-lg">
                    <p className="text-muted-foreground">Chart Placeholder</p>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">This Week</span>
                      <span className="font-medium">+34 users</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">This Month</span>
                      <span className="font-medium">+127 users</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Template Usage</CardTitle>
                  <CardDescription>Most popular templates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center border border-dashed border-border rounded-lg">
                    <p className="text-muted-foreground">Chart Placeholder</p>
                  </div>
                  <div className="mt-4 space-y-2">
                    {mockTemplates.slice(0, 3).map((template) => (
                      <div key={template.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{template.name}</span>
                        <span className="font-medium">{template.usageCount}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subscription Distribution</CardTitle>
                  <CardDescription>Users by plan type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center border border-dashed border-border rounded-lg">
                    <p className="text-muted-foreground">Chart Placeholder</p>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Free</span>
                      <span className="font-medium">156</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Pro</span>
                      <span className="font-medium">89</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Business</span>
                      <span className="font-medium">97</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
