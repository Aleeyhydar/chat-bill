import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Check, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

const invoiceTemplates = [
  { id: 1, name: "Modern Minimal", preview: "Clean lines, spacious layout with accent colors" },
  { id: 2, name: "Professional Classic", preview: "Traditional business format with structured sections" },
  { id: 3, name: "Bold & Colorful", preview: "Vibrant design with eye-catching headers" },
  { id: 4, name: "Elegant Corporate", preview: "Sophisticated style with refined typography" },
  { id: 5, name: "Creative Studio", preview: "Artistic layout with unique visual elements" },
];

const colorCombinations = [
  { id: 1, name: "Purple Passion", primary: "#8B5CF6", secondary: "#6366F1" },
  { id: 2, name: "Ocean Blue", primary: "#0EA5E9", secondary: "#06B6D4" },
  { id: 3, name: "Forest Green", primary: "#10B981", secondary: "#059669" },
  { id: 4, name: "Sunset Orange", primary: "#F59E0B", secondary: "#EF4444" },
  { id: 5, name: "Royal Purple", primary: "#7C3AED", secondary: "#A855F7" },
  { id: 6, name: "Midnight Black", primary: "#1F2937", secondary: "#374151" },
];

const EditProfile = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [selectedColor, setSelectedColor] = useState(1);
  const [customPrimaryColor, setCustomPrimaryColor] = useState("#8B5CF6");
  const [customSecondaryColor, setCustomSecondaryColor] = useState("#6366F1");

  const handleSave = () => {
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Edit Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and profile picture</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="" alt="Profile" />
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">JPG, PNG or GIF, max 5MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+234 123 456 7890" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue="123 Business Street, Lagos" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="company" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Details</CardTitle>
                <CardDescription>Manage your business information and branding</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="h-24 w-24 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Logo
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">PNG or SVG, max 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" placeholder="Your Company Ltd" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID / Registration Number</Label>
                    <Input id="taxId" placeholder="123456789" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input id="industry" placeholder="Technology, Consulting, etc." />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="companyAddress">Company Address</Label>
                    <Input id="companyAddress" placeholder="123 Business Plaza, Lagos, Nigeria" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" type="url" placeholder="https://yourcompany.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyEmail">Company Email</Label>
                    <Input id="companyEmail" type="email" placeholder="info@yourcompany.com" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Invoice Templates</CardTitle>
                <CardDescription>Choose a template design for your invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {invoiceTemplates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedTemplate === template.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {selectedTemplate === template.id && (
                        <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center z-20">
                          <Check className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                      <div className="aspect-[3/4] bg-background rounded border border-border mb-3 overflow-hidden relative">
                        {template.id === 1 && (
                          <div className="w-full h-full overflow-hidden">
                            <div style={{ 
                              transform: 'scale(0.37)', 
                              transformOrigin: 'top left', 
                              width: '270%',
                              '--user-primary-color': selectedColor && selectedColor !== 0 ? colorCombinations.find(c => c.id === selectedColor)?.primary : customPrimaryColor,
                              '--user-secondary-color': selectedColor && selectedColor !== 0 ? colorCombinations.find(c => c.id === selectedColor)?.secondary : customSecondaryColor,
                              '--user-bg-color': '#ffffff',
                              '--user-text-color': '#222222',
                              '--user-border-color': '#e0e0e0',
                            } as React.CSSProperties}>
                              <div style={{ 
                                background: 'var(--user-bg-color)', 
                                color: 'var(--user-text-color)', 
                                maxWidth: '850px', 
                                margin: 'auto', 
                                padding: '30px', 
                                borderRadius: '14px', 
                                fontFamily: '"Inter", sans-serif', 
                                border: '1px solid var(--user-border-color)' 
                              }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                                  <div style={{ display: 'flex', gap: '20px' }}>
                                    <div style={{ width: '70px', height: '70px', borderRadius: '8px', background: 'var(--user-border-color)' }}></div>
                                    <div>
                                      <h2 style={{ margin: 0, fontSize: '20px', color: 'var(--user-primary-color)' }}>Company Name</h2>
                                      <p style={{ margin: '2px 0', fontSize: '14px' }}>Company Address, City</p>
                                      <p style={{ margin: '2px 0', fontSize: '14px' }}>email@example.com</p>
                                      <p style={{ margin: '2px 0', fontSize: '14px' }}>+000 000 0000</p>
                                    </div>
                                  </div>
                                  <div style={{ textAlign: 'right' }}>
                                    <h1 style={{ margin: 0, fontSize: '26px', color: 'var(--user-primary-color)' }}>INVOICE</h1>
                                    <p style={{ margin: '2px 0', fontSize: '14px' }}>Invoice #: INV-0001</p>
                                    <p style={{ margin: '2px 0', fontSize: '14px' }}>Date: 2025-01-01</p>
                                    <p style={{ margin: '2px 0', fontSize: '14px' }}>Due: On Receipt</p>
                                    <p style={{ marginTop: '10px', fontWeight: 'bold', color: 'var(--user-primary-color)', margin: '2px 0', fontSize: '14px' }}>Balance Due: ₦0</p>
                                  </div>
                                </div>

                                <div style={{ marginTop: '30px' }}>
                                  <h3 style={{ marginBottom: '8px', fontSize: '16px', color: 'var(--user-primary-color)' }}>Bill To</h3>
                                  <p style={{ margin: 0, fontSize: '14px' }}>Client Name</p>
                                  <p style={{ margin: 0, fontSize: '14px' }}>Client Contact</p>
                                </div>

                                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '25px' }}>
                                  <thead>
                                    <tr>
                                      <th style={{ background: 'var(--user-primary-color)', color: '#fff', padding: '10px', fontSize: '14px', textAlign: 'left' }}>Description</th>
                                      <th style={{ background: 'var(--user-primary-color)', color: '#fff', padding: '10px', fontSize: '14px', textAlign: 'left' }}>Rate</th>
                                      <th style={{ background: 'var(--user-primary-color)', color: '#fff', padding: '10px', fontSize: '14px', textAlign: 'left' }}>Qty</th>
                                      <th style={{ background: 'var(--user-primary-color)', color: '#fff', padding: '10px', fontSize: '14px', textAlign: 'left' }}>Total</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td style={{ padding: '12px', borderBottom: '1px solid var(--user-border-color)', fontSize: '14px' }}>Service Example</td>
                                      <td style={{ padding: '12px', borderBottom: '1px solid var(--user-border-color)', fontSize: '14px' }}>₦100</td>
                                      <td style={{ padding: '12px', borderBottom: '1px solid var(--user-border-color)', fontSize: '14px' }}>1</td>
                                      <td style={{ padding: '12px', borderBottom: '1px solid var(--user-border-color)', fontSize: '14px' }}>₦100</td>
                                    </tr>
                                  </tbody>
                                </table>

                                <div style={{ textAlign: 'right', marginTop: '25px' }}>
                                  <p style={{ margin: '5px 0', fontSize: '14px' }}>Subtotal: ₦100</p>
                                  <p style={{ margin: '5px 0', fontSize: '14px' }}>Discount: ₦0</p>
                                  <h3 style={{ color: 'var(--user-primary-color)', fontSize: '18px', margin: '5px 0' }}>Total: ₦100</h3>
                                </div>

                                <div style={{ marginTop: '30px' }}>
                                  <h3 style={{ color: 'var(--user-primary-color)', marginBottom: '8px', fontSize: '16px' }}>Payment Info</h3>
                                  <p style={{ margin: 0, fontSize: '14px' }}>Bank Name, Account Name, Account Number</p>
                                </div>

                                <div style={{ marginTop: '50px', textAlign: 'center', fontSize: '13px', color: 'var(--user-secondary-color)' }}>
                                  <p>Thank you for your business!</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {template.id === 2 && (
                          <div className="w-full h-full overflow-hidden">
                            <div style={{ 
                              transform: 'scale(0.37)', 
                              transformOrigin: 'top left', 
                              width: '270%',
                              '--user-primary-color': selectedColor && selectedColor !== 0 ? colorCombinations.find(c => c.id === selectedColor)?.primary : customPrimaryColor,
                              '--user-secondary-color': selectedColor && selectedColor !== 0 ? colorCombinations.find(c => c.id === selectedColor)?.secondary : customSecondaryColor,
                              '--user-bg-color': '#ffffff',
                              '--user-text-color': '#333333',
                              '--user-border-color': '#dddddd',
                            } as React.CSSProperties}>
                              <div style={{ 
                                background: 'var(--user-bg-color)', 
                                color: 'var(--user-text-color)', 
                                padding: '40px',
                                maxWidth: '850px',
                                margin: 'auto',
                                border: '1px solid var(--user-border-color)',
                                borderRadius: '10px',
                                fontFamily: '"Georgia", serif'
                              }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid var(--user-border-color)', paddingBottom: '25px', marginBottom: '30px' }}>
                                  <div style={{ display: 'flex', gap: '15px' }}>
                                    <div style={{ width: '70px', height: '70px', background: 'var(--user-border-color)', borderRadius: '6px' }}></div>
                                    <div>
                                      <h1 style={{ margin: 0, fontSize: '24px', color: 'var(--user-primary-color)' }}>Company Name</h1>
                                      <p style={{ margin: '2px 0', fontSize: '14px' }}>123 Business Avenue, City</p>
                                      <p style={{ margin: '2px 0', fontSize: '14px' }}>email@example.com</p>
                                      <p style={{ margin: '2px 0', fontSize: '14px' }}>+123 456 7890</p>
                                    </div>
                                  </div>
                                  <div>
                                    <table style={{ fontSize: '14px' }}>
                                      <tbody>
                                        <tr><td style={{ padding: '3px 8px' }}>Invoice #:</td><td style={{ padding: '3px 8px' }}>INV-001</td></tr>
                                        <tr><td style={{ padding: '3px 8px' }}>Date:</td><td style={{ padding: '3px 8px' }}>2025-01-01</td></tr>
                                        <tr><td style={{ padding: '3px 8px' }}>Due:</td><td style={{ padding: '3px 8px' }}>On Receipt</td></tr>
                                        <tr><td style={{ padding: '3px 8px' }}>Balance Due:</td><td style={{ padding: '3px 8px', fontWeight: 'bold', color: 'var(--user-primary-color)' }}>₦0</td></tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>

                                <div style={{ marginTop: '25px' }}>
                                  <h2 style={{ fontSize: '18px', marginBottom: '10px', color: 'var(--user-primary-color)', borderBottom: '1px solid var(--user-border-color)', paddingBottom: '5px' }}>Bill To</h2>
                                  <p style={{ margin: '2px 0', fontSize: '14px' }}>Client Name</p>
                                  <p style={{ margin: '2px 0', fontSize: '14px' }}>Client Contact</p>
                                </div>

                                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                                  <thead>
                                    <tr>
                                      <th style={{ background: 'var(--user-primary-color)', color: '#fff', padding: '12px', fontSize: '14px', textAlign: 'left' }}>Description</th>
                                      <th style={{ background: 'var(--user-primary-color)', color: '#fff', padding: '12px', fontSize: '14px', textAlign: 'left' }}>Rate</th>
                                      <th style={{ background: 'var(--user-primary-color)', color: '#fff', padding: '12px', fontSize: '14px', textAlign: 'left' }}>Qty</th>
                                      <th style={{ background: 'var(--user-primary-color)', color: '#fff', padding: '12px', fontSize: '14px', textAlign: 'left' }}>Total</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td style={{ padding: '12px', borderBottom: '1px solid var(--user-border-color)', fontSize: '14px' }}>Example Service</td>
                                      <td style={{ padding: '12px', borderBottom: '1px solid var(--user-border-color)', fontSize: '14px' }}>₦100</td>
                                      <td style={{ padding: '12px', borderBottom: '1px solid var(--user-border-color)', fontSize: '14px' }}>1</td>
                                      <td style={{ padding: '12px', borderBottom: '1px solid var(--user-border-color)', fontSize: '14px' }}>₦100</td>
                                    </tr>
                                  </tbody>
                                </table>

                                <div style={{ marginTop: '25px', width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                                  <table style={{ width: '300px' }}>
                                    <tbody>
                                      <tr><td style={{ padding: '6px 0', fontSize: '14px' }}>Subtotal:</td><td style={{ padding: '6px 0', fontSize: '14px' }}>₦100</td></tr>
                                      <tr><td style={{ padding: '6px 0', fontSize: '14px' }}>Discount:</td><td style={{ padding: '6px 0', fontSize: '14px' }}>₦0</td></tr>
                                      <tr><td style={{ padding: '6px 0', fontSize: '14px' }}>Total:</td><td style={{ padding: '6px 0', fontSize: '18px', fontWeight: 'bold', color: 'var(--user-primary-color)' }}>₦100</td></tr>
                                    </tbody>
                                  </table>
                                </div>

                                <div style={{ marginTop: '25px' }}>
                                  <h2 style={{ fontSize: '18px', marginBottom: '10px', color: 'var(--user-primary-color)', borderBottom: '1px solid var(--user-border-color)', paddingBottom: '5px' }}>Payment Information</h2>
                                  <p style={{ margin: '2px 0', fontSize: '14px' }}>Bank Name — Account Number — Account Name</p>
                                </div>

                                <p style={{ marginTop: '50px', textAlign: 'center', fontSize: '13px', color: 'var(--user-secondary-color)' }}>
                                  Thank you for your business.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                        {template.id === 3 && (
                          <div className="space-y-2 text-[4px]">
                            <div className="bg-gradient-to-r from-primary/30 to-primary/10 p-2 rounded-t space-y-1">
                              <div className="w-12 h-2 bg-primary rounded" />
                              <div className="w-8 h-1 bg-primary/50 rounded" />
                            </div>
                            <div className="px-1 space-y-2">
                              <div className="flex gap-2">
                                <div className="flex-1 space-y-1">
                                  <div className="w-full h-1 bg-muted rounded" />
                                  <div className="w-3/4 h-1 bg-muted rounded" />
                                </div>
                                <div className="flex-1 space-y-1">
                                  <div className="w-full h-1 bg-muted rounded" />
                                  <div className="w-3/4 h-1 bg-muted rounded" />
                                </div>
                              </div>
                              <div className="bg-primary/5 rounded p-1.5 space-y-1">
                                <div className="flex justify-between">
                                  <div className="w-10 h-1 bg-primary/50 rounded" />
                                  <div className="w-6 h-1 bg-primary/50 rounded" />
                                </div>
                                <div className="flex justify-between">
                                  <div className="w-12 h-1 bg-muted rounded" />
                                  <div className="w-6 h-1 bg-muted rounded" />
                                </div>
                              </div>
                              <div className="flex justify-end">
                                <div className="bg-primary/20 px-2 py-1 rounded">
                                  <div className="w-8 h-1 bg-primary rounded" />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {template.id === 4 && (
                          <div className="space-y-2 text-[4px]">
                            <div className="flex justify-between items-center pb-2 border-b-2 border-foreground/20">
                              <div className="w-10 h-2 bg-foreground/10 rounded" />
                              <div className="w-8 h-1.5 bg-muted rounded" />
                            </div>
                            <div className="grid grid-cols-2 gap-3 my-2">
                              <div className="space-y-1">
                                <div className="w-8 h-1 bg-foreground/30 rounded font-semibold" />
                                <div className="w-full h-1 bg-muted/60 rounded" />
                                <div className="w-3/4 h-1 bg-muted/60 rounded" />
                              </div>
                              <div className="space-y-1 text-right">
                                <div className="w-8 h-1 bg-foreground/30 rounded ml-auto" />
                                <div className="w-full h-1 bg-muted/60 rounded" />
                                <div className="w-3/4 h-1 bg-muted/60 rounded ml-auto" />
                              </div>
                            </div>
                            <div className="space-y-1 mt-3">
                              <div className="flex justify-between py-1 border-b border-border">
                                <div className="w-12 h-1 bg-muted/70 rounded" />
                                <div className="w-8 h-1 bg-muted/70 rounded" />
                              </div>
                              <div className="flex justify-between py-1">
                                <div className="w-10 h-1 bg-muted rounded" />
                                <div className="w-6 h-1 bg-muted rounded" />
                              </div>
                            </div>
                            <div className="flex justify-end mt-2 pt-2 border-t-2 border-foreground/20">
                              <div className="w-10 h-1.5 bg-foreground/20 rounded" />
                            </div>
                          </div>
                        )}
                        {template.id === 5 && (
                          <div className="space-y-2 text-[4px]">
                            <div className="relative">
                              <div className="absolute top-0 right-0 w-8 h-8 bg-primary/10 rounded-full -mr-4 -mt-2" />
                              <div className="relative z-10 space-y-1">
                                <div className="w-12 h-2 bg-gradient-to-r from-primary to-primary/50 rounded" />
                                <div className="w-8 h-1 bg-muted rounded" />
                              </div>
                            </div>
                            <div className="flex gap-2 my-3">
                              <div className="w-2 h-12 bg-gradient-to-b from-primary/30 to-transparent rounded" />
                              <div className="flex-1 space-y-2">
                                <div className="space-y-1">
                                  <div className="w-full h-1 bg-muted rounded" />
                                  <div className="w-3/4 h-1 bg-muted rounded" />
                                </div>
                                <div className="bg-muted/30 rounded p-1.5 space-y-1">
                                  <div className="flex justify-between">
                                    <div className="w-10 h-1 bg-muted rounded" />
                                    <div className="w-6 h-1 bg-primary/50 rounded" />
                                  </div>
                                  <div className="flex justify-between">
                                    <div className="w-8 h-1 bg-muted rounded" />
                                    <div className="w-6 h-1 bg-primary/50 rounded" />
                                  </div>
                                </div>
                                <div className="flex justify-end">
                                  <div className="w-10 h-1.5 bg-gradient-to-r from-primary/50 to-primary rounded" />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold text-foreground">{template.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{template.preview}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Color Combination</CardTitle>
                <CardDescription>Select colors that match your brand</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-3 text-foreground">Preset Combinations</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {colorCombinations.map((combo) => (
                      <div
                        key={combo.id}
                        onClick={() => setSelectedColor(combo.id)}
                        className={`relative p-3 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedColor === combo.id
                            ? "border-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        {selectedColor === combo.id && (
                          <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                            <Check className="h-3 w-3 text-primary-foreground" />
                          </div>
                        )}
                        <div className="flex gap-2 mb-2">
                          <div
                            className="h-12 flex-1 rounded"
                            style={{ backgroundColor: combo.primary }}
                          />
                          <div
                            className="h-12 flex-1 rounded"
                            style={{ backgroundColor: combo.secondary }}
                          />
                        </div>
                        <p className="text-xs font-medium text-center text-foreground">{combo.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h4 className="text-sm font-medium mb-3 text-foreground">Custom Colors</h4>
                  <p className="text-sm text-muted-foreground mb-4">Create your own color combination using the color pickers</p>
                  <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <Label htmlFor="primaryColor" className="text-center">Primary Color</Label>
                      <div className="relative">
                        <Input
                          id="primaryColor"
                          type="color"
                          value={customPrimaryColor}
                          onChange={(e) => {
                            setCustomPrimaryColor(e.target.value);
                            setSelectedColor(0);
                          }}
                          className="h-24 w-24 cursor-pointer rounded-full p-1 border-4 border-border shadow-lg hover:scale-105 transition-transform"
                        />
                      </div>
                      <Input
                        type="text"
                        value={customPrimaryColor}
                        onChange={(e) => {
                          setCustomPrimaryColor(e.target.value);
                          setSelectedColor(0);
                        }}
                        placeholder="#8B5CF6"
                        className="w-32 font-mono text-sm text-center"
                      />
                    </div>
                    <div className="flex flex-col items-center gap-3">
                      <Label htmlFor="secondaryColor" className="text-center">Secondary Color</Label>
                      <div className="relative">
                        <Input
                          id="secondaryColor"
                          type="color"
                          value={customSecondaryColor}
                          onChange={(e) => {
                            setCustomSecondaryColor(e.target.value);
                            setSelectedColor(0);
                          }}
                          className="h-24 w-24 cursor-pointer rounded-full p-1 border-4 border-border shadow-lg hover:scale-105 transition-transform"
                        />
                      </div>
                      <Input
                        type="text"
                        value={customSecondaryColor}
                        onChange={(e) => {
                          setCustomSecondaryColor(e.target.value);
                          setSelectedColor(0);
                        }}
                        placeholder="#6366F1"
                        className="w-32 font-mono text-sm text-center"
                      />
                    </div>
                  </div>
                  <div className="mt-6 p-3 rounded-lg border border-border bg-muted/30 max-w-md mx-auto">
                    <p className="text-xs text-muted-foreground mb-2 text-center">Preview</p>
                    <div className="flex gap-2">
                      <div
                        className="h-10 flex-1 rounded shadow-sm"
                        style={{ backgroundColor: customPrimaryColor }}
                      />
                      <div
                        className="h-10 flex-1 rounded shadow-sm"
                        style={{ backgroundColor: customSecondaryColor }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom Template Upload</CardTitle>
                <CardDescription>Import your own invoice template design</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">
                        Drop your template file here or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Supports HTML, PDF, or DOCX files (max 10MB)
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                  <h4 className="text-sm font-semibold text-foreground">Template Requirements:</h4>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Must include placeholders for invoice data (number, date, items, totals)</li>
                    <li>Should be responsive and printer-friendly</li>
                    <li>Can include your custom branding and styling</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Regional Settings</CardTitle>
                <CardDescription>Configure your currency and location preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Default Currency</Label>
                    <Input id="currency" defaultValue="NGN (₦)" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input id="timezone" defaultValue="Africa/Lagos" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Input id="language" defaultValue="English" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Input id="dateFormat" defaultValue="DD/MM/YYYY" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Invoice Defaults</CardTitle>
                <CardDescription>Set default values for your invoices</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="paymentTerms">Payment Terms (days)</Label>
                    <Input id="paymentTerms" type="number" defaultValue="30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxRate">Default Tax Rate (%)</Label>
                    <Input id="taxRate" type="number" defaultValue="7.5" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="notes">Default Invoice Notes</Label>
                    <Input id="notes" placeholder="Thank you for your business!" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => navigate("/")}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
