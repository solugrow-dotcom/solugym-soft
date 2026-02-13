"use client"

import { useEffect, useState } from "react"
import { useUser } from "@/hooks/useUser"
import { insforge } from "@/lib/insforge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Plus } from "lucide-react"

export default function MembersPage() {
    const { user, profile } = useUser()
    const [members, setMembers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")

    useEffect(() => {
        async function fetchMembers() {
            if (!profile?.gym_id) return

            const { data, error } = await insforge
                .from('members')
                .select(`
          *,
          user:user_id(full_name, avatar_url, role)
        `)
                .eq('gym_id', profile.gym_id)

            if (!error && data) {
                setMembers(data)
            }
            setLoading(false)
        }

        if (profile?.gym_id) fetchMembers()
    }, [profile?.gym_id])

    const filteredMembers = members.filter(m =>
        m.user?.full_name?.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Members</h2>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Member
                </Button>
            </div>

            <div className="flex items-center space-x-2">
                <Input
                    placeholder="Search members..."
                    className="max-w-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="ghost" size="icon">
                    <Search className="h-4 w-4" />
                </Button>
            </div>

            <div className="grid gap-4">
                {loading ? (
                    <div>Loading...</div>
                ) : filteredMembers.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No members found.</div>
                ) : (
                    filteredMembers.map((member) => (
                        <Card key={member.id} className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                                    {member.user?.full_name?.charAt(0) || "U"}
                                </div>
                                <div>
                                    <p className="font-semibold">{member.user?.full_name || "Unknown User"}</p>
                                    <p className="text-xs text-muted-foreground">Joined: {new Date(member.join_date).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div>
                                <span className={`px-2 py-1 rounded-full text-xs ${member.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                    {member.status}
                                </span>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
