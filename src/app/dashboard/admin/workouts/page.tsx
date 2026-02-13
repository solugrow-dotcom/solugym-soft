"use client"

import { useEffect, useState } from "react"
import { useUser } from "@/hooks/useUser"
import { insforge } from "@/lib/insforge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Dumbbell } from "lucide-react"
import Link from "next/link"

export default function WorkoutsPage() {
    const { user, profile } = useUser()
    const [workouts, setWorkouts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchWorkouts() {
            if (!profile?.gym_id) return

            const { data, error } = await insforge
                .from('workouts')
                .select(`
          *,
          member:member_id(full_name)
        `)
                .eq('gym_id', profile.gym_id)
                .order('created_at', { ascending: false })

            if (!error && data) {
                setWorkouts(data)
            }
            setLoading(false)
        }

        if (profile?.gym_id) fetchWorkouts()
    }, [profile?.gym_id])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Workouts Database</h2>
                <Link href="/dashboard/admin/workouts/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> New AI Workout
                    </Button>
                </Link>
            </div>

            {loading ? (
                <div>Loading workouts...</div>
            ) : workouts.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                    <Dumbbell className="mx-auto h-12 w-12 opacity-50 mb-4" />
                    <p>No workouts found. Generate one with AI!</p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {workouts.map((workout) => (
                        <Card key={workout.id}>
                            <CardHeader>
                                <CardTitle>{workout.name || "Untitled Workout"}</CardTitle>
                                <p className="text-xs text-muted-foreground">
                                    Assigned to: {workout.member?.full_name || "Unassigned"}
                                </p>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground line-clamp-3">
                                    {workout.description}
                                </p>
                                <div className="mt-4 flex justify-between items-center text-xs">
                                    <span className="bg-secondary/40 px-2 py-1 rounded">
                                        {workout.exercises?.length || 0} exercises
                                    </span>
                                    <span className="text-muted-foreground">
                                        {new Date(workout.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
