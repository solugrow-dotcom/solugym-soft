import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Users, CreditCard, CalendarCheck, Activity, BarChart3, Bot,
    Bell, MessageSquare, Megaphone, Smartphone, UserCheck,
    ShieldCheck, ClipboardList, Utensils, Zap, Database,
    Lock, LayoutDashboard
} from "lucide-react"

const features = [
    { title: "Member Management", icon: Users, description: "Full member lifecycle management from onboarding to retention." },
    { title: "Staff & Trainer Management", icon: UserCheck, description: "Track performance, schedules, and payroll for your fitness team." },
    { title: "Attendance Tracking", icon: CalendarCheck, description: "Secure QR-based check-ins and real-time attendance logs." },
    { title: "Plans & Subscriptions", icon: Zap, description: "Create flexible membership tiers and recurring billing cycles." },
    { title: "Payments & Invoicing", icon: CreditCard, description: "Integrated payment gateways with auto-generated digital invoices." },
    { title: "Automated Reminders", icon: Bell, description: "WhatsApp & Email alerts for membership expiry and fee due dates." },
    { title: "Lead Management", icon: Megaphone, description: "CRM for tracking potential members and follow-up activities." },
    { title: "Offers & Campaigns", icon: Zap, description: "Run marketing promotions to attract new members." },
    { title: "Reports & Analytics", icon: BarChart3, description: "Deep insights into revenue, churn, and gym growth metrics." },
    { title: "Workout Planner", icon: Activity, description: "Professional workout builder for trainers and members." },
    { title: "Diet Plans", icon: Utensils, description: "Nutritional tracking and custom meal planning tools." },
    { title: "Progress Tracking", icon: BarChart3, description: "Body metrics, weight tracking, and performance charts." },
    { title: "Class Scheduling", icon: CalendarCheck, description: "Manage group classes, spin sessions, and personal training." },
    { title: "AI Gym Assistant", icon: Bot, description: "Smart dashboard insights for owners to optimize operations." },
    { title: "AI Fitness Coach", icon: Smartphone, description: "AI-powered workout adjustments for members on the go." },
    { title: "AI Support Bot", icon: MessageSquare, description: "24/7 automated support for member inquiries." },
    { title: "Multi-Gym Support", icon: LayoutDashboard, description: "Manage multiple branches from a single admin account." },
    { title: "Secure Access Control", icon: Lock, description: "Role-based permissions and enterprise-grade security." },
]

export function Features() {
    return (
        <section id="features" className="py-32 bg-[#020202] relative">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">
                        Built for Performance
                    </h2>
                    <p className="text-white/50 text-xl font-light">
                        SoluGrow provides a complete operating system designed to automate every aspect of your fitness business.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <Card key={index} className="bg-white/[0.03] border-white/5 backdrop-blur-2xl hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 group">
                            <CardHeader className="pb-2">
                                <div className="h-12 w-12 rounded-2xl bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <feature.icon className="h-6 w-6 text-[#F59E0B]" />
                                </div>
                                <CardTitle className="text-xl text-white font-medium">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-white/40 leading-relaxed font-light">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[150px] pointer-events-none -z-0" />
        </section>
    )
}
