"use client"

import { useEffect, useState } from "react"
import { insforge } from "@/lib/insforge"
import { User } from "@supabase/supabase-js"

type Profile = {
    id: string
    role: 'platform_admin' | 'super_admin' | 'gym_owner' | 'staff' | 'member'
    gym_id: string | null
    full_name: string | null
    avatar_url: string | null
}

export function useUser() {
    const [user, setUser] = useState<User | null>(null)
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getUser() {
            try {
                const { data: { user } } = await insforge.auth.getUser()
                setUser(user)

                if (user) {
                    const { data, error } = await insforge
                        .from('profiles')
                        .select('*')
                        .eq('id', user.id)
                        .single()

                    if (!error && data) {
                        setProfile(data as Profile)
                    }
                }
            } catch (error) {
                console.error("Error loading user", error)
            } finally {
                setLoading(false)
            }
        }

        getUser()

        const { data: authListener } = insforge.auth.onAuthStateChange(async (event, session) => {
            setUser(session?.user ?? null)
            if (session?.user) {
                const { data } = await insforge
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single()
                setProfile(data as Profile)
            } else {
                setProfile(null)
            }
            setLoading(false)
        })

        return () => {
            authListener.subscription.unsubscribe()
        }
    }, [])

    return { user, profile, loading }
}
