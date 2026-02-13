import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

const plans = [
    {
        name: "Basic",
        price: "₹999",
        description: "Essential tools for small gyms starting out.",
        features: ["Up to 50 Members", "Member Management", "Attendance Tracking", "Basic Reports"],
    },
    {
        name: "Pro",
        price: "₹1999",
        description: "Perfect for growing fitness centers.",
        features: ["Up to 200 Members", "Automated Billing", "Payment Gateway Integration", "SMS/WhatsApp Reminders", "Staff Accounts"],
        popular: true,
    },
    {
        name: "Enterprise",
        price: "₹2999",
        description: "Advanced features for large gyms & chains.",
        features: ["Unlimited Members", "AI Workout Generator", "Advanced Analytics", "Custom Branding", "Priority Support", "Multi-branch Support"],
    },
]

export function Pricing() {
    return (
        <section id="pricing" className="py-24">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h2>
                    <p className="text-muted-foreground text-lg">
                        Choose the plan that fits your gym's size and needs. No hidden fees.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <Card key={plan.name} className={`flex flex-col ${plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border'}`}>
                            <CardHeader>
                                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                <CardDescription>{plan.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="mb-6">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className="text-muted-foreground">/month</span>
                                </div>
                                <ul className="space-y-3">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                                    Choose {plan.name}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
