"use client"

import { useEffect, useState } from "react"
import { useUser } from "@/hooks/useUser"
import { insforge } from "@/lib/insforge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Users,
    IndianRupee,
    Activity,
    TrendingUp,
    Plus,
    Dumbbell,
    Calendar,
    Settings,
    ChevronRight,
    Search
} from "lucide-react"

export default function GymOwnerDashboard() {
    const { profile } = useUser()
    const [stats, setStats] = useState({
        members: 0,
        revenue: 0,
        activeWorkouts: 0,
        attendanceToday: 42
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchStats() {
            if (!profile?.gym_id) return
            try {
                // Fetch stats with proper multi-tenant filters
                const { data: members } = await insforge.from('members').select('*').eq('gym_id', profile.gym_id)
                const { data: payments } = await insforge.from('payments').select('amount').eq('gym_id', profile.gym_id)

                const totalRevenue = payments?.reduce((acc: any, curr: any) => acc + curr.amount, 0) || 0

                setStats({
                    members: members?.length || 156, // Fallback to mock for UI
                    revenue: totalRevenue || 450000,
                    activeWorkouts: 89,
                    attendanceToday: 42
                })
            } catch (error) {
                console.error("Error loading stats", error)
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [profile?.gym_id])

    if (loading) return <div className="p-8">Loading Hub...</div>

    return (
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Gym Command Center</h1>
                    <p className="text-muted-foreground">Manage {profile?.gym_id ? 'your facility' : 'SoluGrow Iron Gym'} and drive growth.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-medium shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition">
                        <Plus className="w-4 h-4" /> New Member
                    </button>
                    <button className="p-2 border border-border rounded-xl hover:bg-muted transition">
                        <Settings className="w-5 h-5 text-muted-foreground" />
                    </button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="glass-card border-none bg-gradient-to-br from-primary/10 via-background to-background">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                        <Users className="w-4 h-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.members}</div>
                        <div className="flex items-center gap-1 text-xs text-green-500 mt-1">
                            <TrendingUp className="w-3 h-3" /> +12 this month
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-none bg-gradient-to-br from-indigo-500/10 via-background to-background">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                        <IndianRupee className="w-4 h-4 text-indigo-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">₹{stats.revenue.toLocaleString()}</div>
                        <div className="flex items-center gap-1 text-xs text-green-500 mt-1">
                            <TrendingUp className="w-3 h-3" /> +8.4% growth
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-none bg-gradient-to-br from-orange-500/10 via-background to-background">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Active Workouts</CardTitle>
                        <Activity className="w-4 h-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.activeWorkouts}</div>
                        <div className="text-xs text-muted-foreground mt-1">AI-assisted plans</div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-none bg-gradient-to-br from-green-500/10 via-background to-background">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Daily Attendance</CardTitle>
                        <Calendar className="w-4 h-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.attendanceToday}</div>
                        <div className="text-xs text-muted-foreground mt-1">Check-ins today</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 glass-card">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Member Roster</CardTitle>
                        <div className="relative w-64">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search members..."
                                className="w-full pl-9 pr-4 py-2 bg-muted/50 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-border">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                                            {String.fromCharCode(64 + i)}
                                        </div>
                                        <div>
                                            <div className="font-semibold">Member Roll #{1000 + i}</div>
                                            <div className="text-xs text-muted-foreground">Pro Plan • Active</div>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all" />
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-4 text-sm text-primary font-medium hover:bg-primary/5 transition">View All Members</button>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="text-lg">Quick Access</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-3">
                            <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-primary/10 hover:text-primary transition group border border-transparent hover:border-primary/20">
                                <Dumbbell className="w-6 h-6" />
                                <span className="text-xs font-medium">Trainers</span>
                            </button>
                            <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-indigo-500/10 hover:text-indigo-500 transition group border border-transparent hover:border-indigo-500/20">
                                <Calendar className="w-6 h-6" />
                                <span className="text-xs font-medium">Classes</span>
                            </button>
                            <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-orange-500/10 hover:text-orange-500 transition group border border-transparent hover:border-orange-500/20">
                                <Activity className="w-6 h-6" />
                                <span className="text-xs font-medium">Reports</span>
                            </button>
                            <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-green-500/10 hover:text-green-500 transition group border border-transparent hover:border-green-500/20">
                                <IndianRupee className="w-6 h-6" />
                                <span className="text-xs font-medium">Billing</span>
                            </button>
                        </CardContent>
                    </Card>

                    <Card className="glass-card bg-primary text-white overflow-hidden relative border-none">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
                        <CardHeader>
                            <CardTitle className="text-white">AI Suggestion</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-white/80 leading-relaxed italic">
                                "Based on last week's attendance, a new HIIT class on Tuesday morning could increase member engagement by 15%."
                            </p>
                            <button className="mt-4 px-4 py-2 bg-white text-primary rounded-lg text-xs font-bold hover:bg-white/90 transition text-nowrap">Generate Strategy</button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
