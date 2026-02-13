"use client"

import { useEffect } from "react"
import { useUser } from "@/hooks/useUser"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function DashboardDispatcher() {
    const { user, profile, loading } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push("/auth/login")
                return
            }

            if (profile?.role === 'platform_admin' || profile?.role === 'super_admin') {
                router.push("/dashboard/super-admin")
            } else if (profile?.role === 'gym_owner') {
                if (profile.gym_id) {
                    router.push("/dashboard/admin")
                } else {
                    router.push("/setup-gym")
                }
            } else if (profile?.role === 'staff') {
                router.push("/dashboard/staff")
            } else if (profile?.role === 'member') {
                router.push("/dashboard/member")
            } else {
                // Fallback
                router.push("/")
            }
        }
    }, [user, profile, loading, router])

    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Redirecting to your dashboard...</p>
            </div>
        </div>
    )
}
