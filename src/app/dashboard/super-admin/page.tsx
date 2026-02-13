"use client"

import { useEffect, useState } from "react"
import { insforge } from "@/lib/insforge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, IndianRupee, TrendingUp, ShieldCheck, Settings, Globe, Search, MoreVertical } from "lucide-react"

export default function SuperAdminDashboard() {
    const [stats, setStats] = useState({
        totalGyms: 14,
        activeGyms: 12,
        totalRevenue: 28000,
        totalMembers: 1420
    })
    const [gyms, setGyms] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchStats() {
            try {
                const { data: gymData } = await insforge.from('gyms').select('*')
                if (gymData) setGyms(gymData)
            } catch (error) {
                console.error("Error fetching stats", error)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    if (loading) return <div className="p-8">Loading Platform Metrics...</div>

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <ShieldCheck className="w-8 h-8 text-primary" />
                        Platform Control Center
                    </h1>
                    <p className="text-muted-foreground">Global monitoring and infrastructure management.</p>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition border border-white/5"><Settings className="w-5 h-5" /></button>
                    <button className="p-2 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition border border-white/5"><Globe className="w-5 h-5" /></button>
                </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
                {[
                    { label: "Partnered Gyms", value: stats.totalGyms, icon: Building2, sub: "Across 4 regions" },
                    { label: "Global Members", value: stats.totalMembers, icon: Users, sub: "142 new today" },
                    { label: "Monthly Revenue", value: `₹${stats.totalRevenue.toLocaleString()}`, icon: IndianRupee, sub: "+18% this month" },
                    { label: "System Health", value: "99.9%", icon: TrendingUp, sub: "All services operational" },
                ].map((item, i) => (
                    <Card key={i} className="glass-card overflow-hidden group">
                        <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <item.icon className="w-24 h-24" />
                        </div>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium uppercase tracking-widest opacity-60">{item.label}</CardTitle>
                            <item.icon className="w-4 h-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold tracking-tight">{item.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 glass-card">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Partner Management</CardTitle>
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
                            <input className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary w-64" placeholder="Search gyms..." />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold border-b border-white/5">
                                    <tr>
                                        <th className="px-4 py-4">Gym Identity</th>
                                        <th className="px-4 py-4">Status</th>
                                        <th className="px-4 py-4">Usage</th>
                                        <th className="px-4 py-4">Revenue Share</th>
                                        <th className="px-4 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {gyms.map((gym) => (
                                        <tr key={gym.id} className="group hover:bg-white/5 transition-colors">
                                            <td className="px-4 py-4">
                                                <p className="font-bold">{gym.name}</p>
                                                <p className="text-[10px] text-muted-foreground uppercase">{gym.city}, {gym.state}</p>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${gym.status === 'active' ? 'bg-green-500/20 text-green-500 border border-green-500/20' : 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/20'}`}>
                                                    {gym.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                    <div className="h-full bg-primary" style={{ width: '65%' }} />
                                                </div>
                                                <p className="text-[10px] text-muted-foreground mt-1">65% Capacity</p>
                                            </td>
                                            <td className="px-4 py-4 font-mono font-bold">₹{(stats.totalRevenue / gyms.length).toFixed(2)}</td>
                                            <td className="px-4 py-4 text-right">
                                                <button className="p-1 rounded hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"><MoreVertical className="w-4 h-4" /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="text-lg">Subscription Distribution</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { label: "Enterprise", count: 4, color: "bg-primary" },
                                { label: "Professional", count: 8, color: "bg-blue-500" },
                                { label: "Essential", count: 2, color: "bg-purple-500" },
                            ].map((plan, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                        <span>{plan.label}</span>
                                        <span>{((plan.count / 14) * 100).toFixed(0)}%</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full">
                                        <div className={`h-full ${plan.color} rounded-full`} style={{ width: `${(plan.count / 14) * 100}%` }} />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="glass-card bg-primary text-white p-6 relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="font-bold text-xl mb-1">New Signup Request</h3>
                            <p className="text-sm opacity-80 mb-4 font-medium underline underline-offset-4 cursor-pointer">'Muscle Mansion' is waiting for verification.</p>
                            <button className="w-full py-2 bg-white text-primary font-bold rounded-lg text-sm">Review Application</button>
                        </div>
                        <Building2 className="absolute -bottom-4 -right-4 w-24 h-24 opacity-20 rotate-12" />
                    </Card>
                </div>
            </div>
        </div>
    )
}
