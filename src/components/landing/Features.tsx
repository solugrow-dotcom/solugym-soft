import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CreditCard, CalendarCheck, Activity, BarChart3, Bot } from "lucide-react"

const features = [
    {
        title: "Member Management",
        description: "Easily add, track, and manage members. View profiles, attendance history, and membership status in one place.",
        icon: Users,
    },
    {
        title: "Automated Billing",
        description: "Set up recurring payments with Razorpay & Stripe. Auto-generate invoices and track payment status.",
        icon: CreditCard,
    },
    {
        title: "Attendance Tracking",
        description: "QR code check-in system for members. Track peak hours and member consistency securely.",
        icon: CalendarCheck,
    },
    {
        title: "AI Workout Builder",
        description: "Generate personalized workout plans and diet charts for members using our advanced Gemini AI integration.",
        icon: Activity,
    },
    {
        title: "Advanced Reports",
        description: "Visual dashboards for revenue, churn rate, and active members. Make data-driven decisions.",
        icon: BarChart3,
    },
    {
        title: "24/7 AI Support",
        description: "Built-in AI chatbot to answer member queries about gym timings, plans, and equipment instantly.",
        icon: Bot,
    },
]

export function Features() {
    return (
        <section id="features" className="py-24 bg-secondary/20">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Everything You Need to Run Your Gym</h2>
                    <p className="text-muted-foreground text-lg">
                        SoluGrow replaces multiple tools with one unified operating system for your fitness business.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="bg-background/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                    <feature.icon className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="text-xl">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
