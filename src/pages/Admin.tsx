import { useState } from "react";
import { Users, FileText, Layout, DollarSign, TrendingUp, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

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

// Mock chart data
const invoiceTrendsData = [
  { month: "Jan", invoices: 45 },
  { month: "Feb", invoices: 52 },
  { month: "Mar", invoices: 61 },
  { month: "Apr", invoices: 58 },
  { month: "May", invoices: 72 },
  { month: "Jun", invoices: 85 },
  { month: "Jul", invoices: 93 },
  { month: "Aug", invoices: 89 },
  { month: "Sep", invoices: 105 },
  { month: "Oct", invoices: 112 },
  { month: "Nov", invoices: 118 },
  { month: "Dec", invoices: 127 },
];

const topUsersData = [
  { name: "Alice W.", invoices: 67 },
  { name: "Jane S.", invoices: 45 },
  { name: "Bob J.", invoices: 38 },
  { name: "John D.", invoices: 23 },
  { name: "Mike R.", invoices: 19 },
];

const monthlyRevenueData = [
  { month: "Jan", revenue: 145000 },
  { month: "Feb", revenue: 158000 },
  { month: "Mar", revenue: 172000 },
  { month: "Apr", revenue: 165000 },
  { month: "May", revenue: 183000 },
  { month: "Jun", revenue: 198000 },
  { month: "Jul", revenue: 215000 },
  { month: "Aug", revenue: 203000 },
  { month: "Sep", revenue: 227000 },
  { month: "Oct", revenue: 241000 },
  { month: "Nov", revenue: 256000 },
  { month: "Dec", revenue: 278000 },
];

const revenueBreakdownData = [
  { name: "Subscriptions", value: 1850000, color: "hsl(var(--primary))" },
  { name: "One-time Purchases", value: 420000, color: "hsl(var(--accent))" },
  { name: "Add-ons", value: 130000, color: "hsl(var(--muted))" },
];

const userGrowthData = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 145 },
  { month: "Mar", users: 178 },
  { month: "Apr", users: 210 },
  { month: "May", users: 245 },
  { month: "Jun", users: 289 },
  { month: "Jul", users: 325 },
  { month: "Aug", users: 367 },
  { month: "Sep", users: 412 },
  { month: "Oct", users: 458 },
  { month: "Nov", users: 502 },
  { month: "Dec", users: 556 },
];

const subscriptionDistributionData = [
  { name: "Free", value: 156, color: "hsl(var(--muted))" },
  { name: "Pro", value: 89, color: "hsl(var(--primary))" },
  { name: "Business", value: 97, color: "hsl(var(--accent))" },
];

const templateUsageData = [
  { name: "Elegant Corporate", usage: 312 },
  { name: "Professional Classic", usage: 234 },
  { name: "Modern Minimal", usage: 189 },
  { name: "Bold Creative", usage: 56 },
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className={`${sidebarCollapsed ? "w-20" : "w-64"} border-r border-border bg-card flex flex-col transition-all duration-300`}>
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className={`${sidebarCollapsed ? "hidden" : "block"}`}>
            <h1 className="text-2xl font-bold text-foreground">Admin</h1>
            <p className="text-sm text-muted-foreground">Dashboard</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`${sidebarCollapsed ? "mx-auto" : ""}`}
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </Button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center ${sidebarCollapsed ? "justify-center" : "gap-3"} px-4 py-3 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
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
            
            <div className="grid gap-6 md:grid-cols-2 mb-6">
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
                  <ChartContainer
                    config={{
                      invoices: {
                        label: "Invoices",
                        color: "hsl(var(--primary))",
                      },
                    }}
                    className="h-[200px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={invoiceTrendsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line 
                          type="monotone" 
                          dataKey="invoices" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2}
                          dot={{ fill: "hsl(var(--primary))" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Users by Invoice Count</CardTitle>
                <CardDescription>Users generating the most invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    invoices: {
                      label: "Invoices",
                      color: "hsl(var(--accent))",
                    },
                  }}
                  className="h-[250px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topUsersData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="invoices" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
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

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue</CardTitle>
                  <CardDescription>Revenue trends over the past year</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      revenue: {
                        label: "Revenue",
                        color: "hsl(var(--primary))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyRevenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                  <CardDescription>Distribution by revenue source</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      subscriptions: {
                        label: "Subscriptions",
                        color: "hsl(var(--primary))",
                      },
                      onetime: {
                        label: "One-time",
                        color: "hsl(var(--accent))",
                      },
                      addons: {
                        label: "Add-ons",
                        color: "hsl(var(--muted))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Pie
                          data={revenueBreakdownData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {revenueBreakdownData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
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
                  <ChartContainer
                    config={{
                      users: {
                        label: "Users",
                        color: "hsl(var(--primary))",
                      },
                    }}
                    className="h-[200px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={userGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line 
                          type="monotone" 
                          dataKey="users" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2}
                          dot={{ fill: "hsl(var(--primary))" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
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
                  <CardTitle>Subscription Distribution</CardTitle>
                  <CardDescription>Users by plan type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      free: {
                        label: "Free",
                        color: "hsl(var(--muted))",
                      },
                      pro: {
                        label: "Pro",
                        color: "hsl(var(--primary))",
                      },
                      business: {
                        label: "Business",
                        color: "hsl(var(--accent))",
                      },
                    }}
                    className="h-[200px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Pie
                          data={subscriptionDistributionData}
                          cx="50%"
                          cy="50%"
                          outerRadius={70}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {subscriptionDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
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

              <Card>
                <CardHeader>
                  <CardTitle>Template Usage</CardTitle>
                  <CardDescription>Most popular templates</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      usage: {
                        label: "Usage",
                        color: "hsl(var(--accent))",
                      },
                    }}
                    className="h-[200px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={templateUsageData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                        <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10} width={100} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="usage" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
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
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
