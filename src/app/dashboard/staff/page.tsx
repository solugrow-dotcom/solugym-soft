"use client"

import { useState } from "react"
import { useUser } from "@/hooks/useUser"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Search, UserCheck, Users, XCircle } from "lucide-react"

export default function StaffDashboard() {
    const { profile } = useUser()
    const [search, setSearch] = useState("")
    const [lastCheckin, setLastCheckin] = useState<any>(null)

    const handleCheckIn = (member: any) => {
        setLastCheckin(member)
        setTimeout(() => setLastCheckin(null), 3000)
    }

    const mockMembers = [
        { id: '1', name: 'Rahul Sharma', status: 'active', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul' },
        { id: '2', name: 'Ananya Iyer', status: 'active', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya' },
        { id: '3', name: 'Vikram Singh', status: 'expired', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram' },
    ]

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Staff Central</h1>
                    <p className="text-muted-foreground">Quick check-ins and member verification.</p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-medium">{profile?.full_name}</p>
                    <p className="text-xs text-muted-foreground">Front Desk Staff</p>
                </div>
            </div>

            <div className="grid md:grid-cols-12 gap-8">
                <main className="md:col-span-8 space-y-6">
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Search className="w-5 h-5 text-primary" />
                                Member Search
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Input
                                placeholder="Search by name, ID or mobile..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="h-12 text-lg"
                            />

                            <div className="space-y-3">
                                {mockMembers.map((member) => (
                                    <div key={member.id} className="p-4 rounded-xl border border-white/5 bg-white/5 flex items-center justify-between group hover:border-primary/50 transition">
                                        <div className="flex items-center gap-4">
                                            <img src={member.photo} alt={member.name} className="w-12 h-12 rounded-full bg-muted" />
                                            <div>
                                                <p className="font-bold">{member.name}</p>
                                                <div className="flex items-center gap-2">
                                                    <span className={`w-2 h-2 rounded-full ${member.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                                                    <span className="text-xs uppercase tracking-wider text-muted-foreground">{member.status} Member</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            variant={member.status === 'active' ? 'default' : 'outline'}
                                            disabled={member.status !== 'active'}
                                            onClick={() => handleCheckIn(member)}
                                        >
                                            Check In
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </main>

                <aside className="md:col-span-4 space-y-6">
                    <Card className="glass-card overflow-hidden">
                        <CardHeader className="bg-primary/10">
                            <CardTitle className="text-lg">Last Check-in</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            {lastCheckin ? (
                                <div className="text-center space-y-4 animate-in zoom-in duration-300">
                                    <div className="relative inline-block">
                                        <img src={lastCheckin.photo} className="w-24 h-24 rounded-full mx-auto border-4 border-green-500" />
                                        <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1">
                                            <CheckCircle2 className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold uppercase">{lastCheckin.name}</p>
                                        <p className="text-green-500 font-medium">Access Granted</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    <UserCheck className="w-12 h-12 mx-auto mb-2 opacity-20" />
                                    <p>Ready to check-in...</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-2 gap-4">
                        <Card className="glass-card p-4 text-center">
                            <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                            <p className="text-2xl font-bold">24</p>
                            <p className="text-xs text-muted-foreground">Currently In</p>
                        </Card>
                        <Card className="glass-card p-4 text-center">
                            <UserCheck className="w-6 h-6 text-green-500 mx-auto mb-2" />
                            <p className="text-2xl font-bold">142</p>
                            <p className="text-xs text-muted-foreground">Daily Total</p>
                        </Card>
                    </div>
                </aside>
            </div>
        </div>
    )
}
