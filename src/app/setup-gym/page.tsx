"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { insforge } from "@/lib/insforge"
import { useUser } from "@/hooks/useUser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function SetupGymPage() {
    const { user, profile, loading: userLoading } = useUser()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [phone, setPhone] = useState("")

    useEffect(() => {
        if (!userLoading && !user) {
            router.push("/auth/login")
        }
        if (!userLoading && profile?.gym_id) {
            router.push("/dashboard/admin")
        }
    }, [user, profile, userLoading, router])

    const handleCreateGym = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) return

        setLoading(true)

        try {
            // 1. Create Gym
            const { data: gym, error: gymError } = await insforge
                .from('gyms')
                .insert([
                    {
                        name,
                        address,
                        city,
                        state,
                        phone,
                        owner_id: user.id,
                    },
                ])
                .select()
                .single()

            if (gymError) throw gymError

            // 2. Update Profile with gym_id (Though RLS might block if not explicitly allowed, 
            // check policy: "Users can update own profile" is enabled. owning a gym is allowed.)
            const { error: profileError } = await insforge
                .from('profiles')
                .update({ gym_id: gym.id })
                .eq('id', user.id)

            if (profileError) throw profileError

            // 3. Create Subscription (14 day trial)
            const trialEnd = new Date()
            trialEnd.setDate(trialEnd.getDate() + 14)

            const { error: subError } = await insforge
                .from('subscriptions')
                .insert([
                    {
                        gym_id: gym.id,
                        plan_id: 'pro',
                        status: 'trial',
                        end_date: trialEnd.toISOString()
                    }
                ])

            if (subError) console.error("Subscription create error (non-critical):", subError)

            alert("Gym created successfully!")
            router.push("/dashboard/admin")
        } catch (error: any) {
            alert(error.message || "Failed to create gym")
        } finally {
            setLoading(false)
        }
    }

    if (userLoading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" /></div>

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-background p-4">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Setup Your Gym</CardTitle>
                    <CardDescription>
                        Tell us about your fitness center to get started.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleCreateGym} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="name">Gym Name</label>
                            <Input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Iron Temple Gym" />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="address">Address</label>
                            <Input required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Fitness St." />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="city">City</label>
                                <Input required value={city} onChange={(e) => setCity(e.target.value)} placeholder="Mumbai" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="state">State</label>
                                <Input required value={state} onChange={(e) => setState(e.target.value)} placeholder="Maharashtra" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="phone">Phone Number</label>
                            <Input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 9876543210" />
                        </div>

                        <Button className="w-full mt-6" type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Gym & Start Trial
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
