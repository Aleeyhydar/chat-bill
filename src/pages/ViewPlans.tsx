import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const plans = [
  {
    name: "Free",
    price: "₦0",
    period: "/month",
    description: "Perfect for getting started with basic invoicing",
    features: [
      "Up to 10 invoices per month",
      "Basic invoice templates",
      "Email support",
      "Standard AI assistance",
      "1 company profile",
    ],
    limitations: [
      "No custom branding",
      "No advanced templates",
      "Basic analytics",
    ],
    current: true,
  },
  {
    name: "Pro",
    price: "₦15,000",
    period: "/month",
    description: "For growing businesses that need more power",
    popular: true,
    features: [
      "Unlimited invoices",
      "All invoice templates",
      "Priority email & chat support",
      "Advanced AI features",
      "Up to 5 company profiles",
      "Custom branding & logo",
      "Advanced analytics dashboard",
      "Automated payment reminders",
      "Multi-currency support",
      "Export to PDF, Excel, CSV",
    ],
    limitations: [],
    current: false,
  },
  {
    name: "Business",
    price: "₦45,000",
    period: "/month",
    description: "Complete solution for established enterprises",
    features: [
      "Everything in Pro",
      "Unlimited company profiles",
      "Dedicated account manager",
      "Phone support",
      "Custom API access",
      "Advanced team collaboration",
      "Role-based permissions",
      "Custom invoice workflows",
      "White-label options",
      "SLA guarantee",
      "Advanced integrations",
      "Custom training & onboarding",
    ],
    limitations: [],
    current: false,
  },
];

const ViewPlans = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const handleUpgrade = (planName: string) => {
    toast.success(`Upgrade to ${planName} initiated! Redirecting to payment...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Choose Your Plan</h1>
          <p className="text-muted-foreground mt-1">Select the perfect plan for your business needs</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-2 p-1 bg-muted rounded-lg">
            <Button
              variant={billingCycle === "monthly" ? "default" : "ghost"}
              size="sm"
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </Button>
            <Button
              variant={billingCycle === "yearly" ? "default" : "ghost"}
              size="sm"
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly
              <Badge variant="secondary" className="ml-2 bg-primary/20 text-primary">
                Save 20%
              </Badge>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${
                plan.popular
                  ? "border-primary shadow-lg shadow-primary/20 scale-105"
                  : plan.current
                  ? "border-accent"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              {plan.current && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge variant="secondary" className="px-4 py-1">
                    Current Plan
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-6">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-sm">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="flex-1">
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="pt-6">
                {plan.current ? (
                  <Button variant="outline" className="w-full" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleUpgrade(plan.name)}
                  >
                    {plan.name === "Free" ? "Downgrade" : "Upgrade to " + plan.name}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Need a custom plan?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            For enterprises with specific requirements, we offer customized solutions tailored to your needs.
            Contact our sales team to discuss your unique use case.
          </p>
          <Button size="lg" variant="outline">
            Contact Sales
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewPlans;
