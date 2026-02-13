"use client"

import { useEffect, useState } from "react"
import { useUser } from "@/hooks/useUser"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, CreditCard, Dumbbell, Flame, TrendingUp, Zap } from "lucide-react"
import { PaymentModal } from "@/components/dashboard/PaymentModal"
import { motion } from "framer-motion"

export default function MemberPortal() {
    const { profile } = useUser()
    const [isPaymentOpen, setIsPaymentOpen] = useState(false)
    const [stats, setStats] = useState({
        attendanceCount: 12,
        nextClass: "Zumba - Today 6:00 PM",
        planName: "Basic Membership",
        daysRemaining: 14
    })

    return (
        <div className="p-8 space-y-8 max-w-6xl mx-auto pb-24">
            <PaymentModal
                isOpen={isPaymentOpen}
                onClose={() => setIsPaymentOpen(false)}
                planName="Pro Annual"
                price="₹19,999"
            />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Hello, {profile?.full_name || 'Warrior'}!</h1>
                    <p className="text-muted-foreground">Level 12 • 430 XP to next level</p>
                </motion.div>
                <div className="flex gap-2">
                    <button className="px-6 py-2 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:scale-105 transition">Check In</button>
                    <button className="px-6 py-2 rounded-xl border border-primary/20 bg-primary/5 text-primary font-medium hover:bg-primary/10 transition">Book Class</button>
                </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
                <Card className="glass-card cursor-pointer hover:border-primary/50 transition" onClick={() => setIsPaymentOpen(true)}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium uppercase tracking-widest opacity-60">Status</CardTitle>
                        <Zap className="w-4 h-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.planName}</div>
                        <p className="text-xs text-primary font-medium mt-1">Upgrade Now →</p>
                    </CardContent>
                </Card>

                <Card className="glass-card">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium uppercase tracking-widest opacity-60">Streak</CardTitle>
                        <Flame className="w-4 h-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5 Days</div>
                        <p className="text-xs text-muted-foreground mt-1">Don't break the chain!</p>
                    </CardContent>
                </Card>

                <Card className="glass-card">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium uppercase tracking-widest opacity-60">Calories</CardTitle>
                        <TrendingUp className="w-4 h-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2,450</div>
                        <p className="text-xs text-muted-foreground mt-1">82% of daily goal</p>
                    </CardContent>
                </Card>

                <Card className="glass-card">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium uppercase tracking-widest opacity-60">Next Up</CardTitle>
                        <Clock className="w-4 h-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-bold truncate">Zumba @ 6PM</div>
                        <p className="text-xs text-muted-foreground mt-1">In 2 hours</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid md:grid-cols-12 gap-8">
                <div className="md:col-span-8 space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Dumbbell className="w-6 h-6 text-primary" />
                        Today's AI Workout
                    </h2>
                    <Card className="glass-card border-l-4 border-l-primary overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Dumbbell className="w-24 h-24" />
                        </div>
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-bold mb-1">Hypertrophy: Chest & Triceps</h3>
                            <p className="text-muted-foreground mb-6">Focus on eccentric control and mind-muscle connection.</p>

                            <div className="space-y-4">
                                {[
                                    { name: "Incline DB Press", sets: "4", reps: "8-12", tip: "3 sec negative" },
                                    { name: "Weighted Dips", sets: "3", reps: "AMRAP", tip: "Lean forward for chest" },
                                    { name: "Cable Flyes", sets: "3", reps: "15", tip: "High volume pump" },
                                ].map((ex, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                                        <div>
                                            <p className="font-bold">{ex.name}</p>
                                            <p className="text-xs text-muted-foreground">{ex.tip}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-mono text-primary font-bold">{ex.sets} x {ex.reps}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="mt-8 w-full h-12 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:opacity-90 transition">
                                START TRACKING SESSION
                            </button>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-4 space-y-6">
                    <h2 className="text-xl font-bold">Body Progress</h2>
                    <Card className="glass-card p-6">
                        <div className="space-y-6">
                            {[
                                { label: "Weight", value: "72.4 kg", target: "70 kg", progress: 70 },
                                { label: "Body Fat", value: "15.2%", target: "12%", progress: 40 },
                                { label: "Muscle Mass", value: "34.1 kg", target: "36 kg", progress: 85 },
                            ].map((stat, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium">{stat.label}</span>
                                        <span className="text-muted-foreground">{stat.value} / {stat.target}</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${stat.progress}%` }}
                                            className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="glass-card p-4 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
                        <h3 className="font-bold mb-1">Refer a Friend</h3>
                        <p className="text-xs text-muted-foreground mb-4">Get 1 month free for every new joiner!</p>
                        <button className="w-full py-2 bg-white text-black text-xs font-bold rounded-lg uppercase tracking-wider">SHARE CODE: SOLU700</button>
                    </Card>
                </div>
            </div>
        </div>
    )
}
