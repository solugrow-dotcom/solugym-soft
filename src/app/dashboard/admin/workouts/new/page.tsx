"use client"

import { useState } from "react"
import { useUser } from "@/hooks/useUser"
import { insforge } from "@/lib/insforge"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Loader2, Sparkles, Save } from "lucide-react"

export default function CreateWorkoutAI() {
    const { user, profile } = useUser()
    const router = useRouter()

    const [goal, setGoal] = useState("")
    const [experience, setExperience] = useState("Intermediate")
    const [days, setDays] = useState(3)

    const [generatedPlan, setGeneratedPlan] = useState<any>(null)
    const [generating, setGenerating] = useState(false)
    const [saving, setSaving] = useState(false)

    const handleGenerate = async () => {
        if (!goal) return alert("Please enter a goal")

        setGenerating(true)
        try {
            const res = await fetch("/api/ai/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ goal, experience, days }),
            })

            const data = await res.json()
            if (data.error) throw new Error(data.error)

            setGeneratedPlan(data.plan)
        } catch (e: any) {
            alert("AI Generation failed: " + e.message)
        } finally {
            setGenerating(false)
        }
    }

    const handleSave = async () => {
        if (!generatedPlan || !profile?.gym_id) return
        setSaving(true)

        try {
            const { error } = await insforge.from('workouts').insert([{
                gym_id: profile.gym_id,
                member_id: user?.id, // Assign to self? Or let user pick. For MVP assigning to creator initially or null member_id
                creator_id: user?.id,
                name: generatedPlan.name || `${goal} Plan`,
                description: generatedPlan.description,
                exercises: generatedPlan.schedule,
                scheduled_date: new Date()
            }])

            if (error) throw error

            alert("Workout saved successfully!")
            router.push("/dashboard/admin/workouts")
        } catch (e: any) {
            alert("Failed to save: " + e.message)
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">AI Workout Builder</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Trainee Profile</CardTitle>
                        <CardDescription>Enter details to generate a personalized plan</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label>Goal</label>
                            <Input
                                placeholder="e.g. Muscle Gain, Fat Loss, Strength"
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label>Experience Level</label>
                            <select
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label>Days per Week</label>
                            <Input
                                type="number"
                                min={1}
                                max={7}
                                value={days}
                                onChange={(e) => setDays(parseInt(e.target.value))}
                            />
                        </div>

                        <Button className="w-full" onClick={handleGenerate} disabled={generating}>
                            {generating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                            Generate Plan
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    {generatedPlan ? (
                        <Card className="h-full border-primary">
                            <CardHeader>
                                <CardTitle>{generatedPlan.name || "Generated Plan"}</CardTitle>
                                <CardDescription>{generatedPlan.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="max-h-[500px] overflow-y-auto space-y-4">
                                {generatedPlan.schedule?.map((day: any, i: number) => (
                                    <div key={i} className="bg-secondary/20 p-4 rounded-lg">
                                        <h4 className="font-bold text-primary mb-2">{day.day} - {day.focus}</h4>
                                        <ul className="list-disc pl-4 space-y-1 text-sm">
                                            {day.exercises?.map((ex: any, j: number) => (
                                                <li key={j}>
                                                    <span className="font-semibold">{ex.name}</span>: {ex.sets} sets x {ex.reps} reps
                                                    {ex.notes && <span className="text-muted-foreground block text-xs italic">{ex.notes}</span>}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </CardContent>
                            <div className="p-6 pt-0">
                                <Button className="w-full" onClick={handleSave} disabled={saving}>
                                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    <Save className="mr-2 h-4 w-4" /> Save to Database
                                </Button>
                            </div>
                        </Card>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 text-muted-foreground">
                            <Sparkles className="h-12 w-12 mb-4 opacity-50" />
                            <p>Enter details and click Generate to see the magic!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
