import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

const plans = [
    {
        name: "Basic",
        price: "₹999",
        features: ["Up to 50 Members", "Member Management", "Attendance Tracking", "Basic Reports", "Secure Login"],
    },
    {
        name: "Pro",
        price: "₹1,999",
        features: ["Up to 200 Members", "Automated Billing", "WhatsApp Reminders", "Staff Accounts", "Lead Management"],
    },
    {
        name: "Elite",
        price: "₹2,999",
        features: ["Unlimited Members", "AI Workout Generator", "AI Fitness Coach", "Multi-Gym Support", "Priority Support", "Advanced Analytics"],
    },
]

export function Pricing() {
    return (
        <section id="pricing" className="py-32 bg-[#020202]">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">Transparent Pricing</h2>
                    <p className="text-white/50 text-xl font-light">
                        Simple plans tailored for every stage of your gym's growth.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan) => (
                        <Card key={plan.name} className="bg-white/[0.03] border-white/10 backdrop-blur-2xl flex flex-col hover:border-primary/50 transition-all duration-500">
                            <CardHeader className="text-center pt-10">
                                <CardTitle className="text-xl font-medium text-white/60 mb-2">{plan.name}</CardTitle>
                                <div className="mt-4">
                                    <span className="text-5xl font-bold text-white tracking-tighter">{plan.price}</span>
                                    <span className="text-white/40 ml-2">/month</span>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 px-8">
                                <div className="w-full h-[1px] bg-white/5 my-8" />
                                <ul className="space-y-4">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3">
                                            <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                                                <Check className="h-3 w-3 text-primary" />
                                            </div>
                                            <span className="text-sm text-white/60 font-light">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter className="pb-10 px-8">
                                <Button className="w-full h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all">
                                    Get Started with {plan.name}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
