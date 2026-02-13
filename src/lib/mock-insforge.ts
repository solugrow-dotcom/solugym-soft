export const mockData = {
    user: {
        id: "mock-user-id",
        email: "demo@solugrow.com",
        role: "authenticated"
    },
    profile: {
        id: "mock-user-id",
        full_name: "Demo User",
        role: "gym_owner" as const,
        gym_id: "mock-gym-id",
        avatar_url: null
    },
    gym: {
        id: "mock-gym-id",
        name: "Demo Iron Gym",
        owner_id: "mock-user-id",
        status: "active" as const,
        created_at: new Date().toISOString()
    },
    stats: {
        members: 156,
        revenue: 450000,
        activeWorkouts: 89
    },
    members: [
        { id: 'm1', full_name: 'Rahul Sharma', status: 'active', plan: 'Pro', last_checkin: '2026-02-13T08:00:00Z' },
        { id: 'm2', full_name: 'Ananya Iyer', status: 'active', plan: 'Basic', last_checkin: '2026-02-12T18:30:00Z' },
        { id: 'm3', full_name: 'Vikram Singh', status: 'expired', plan: 'Pro', last_checkin: '2026-01-15T10:00:00Z' },
    ]
}

class MockSupabaseClient {
    auth = {
        getUser: async () => ({ data: { user: mockData.user }, error: null }),
        getSession: async () => ({ data: { session: { user: mockData.user } }, error: null }),
        signInWithPassword: async () => ({ data: { user: mockData.user, session: {} }, error: null }),
        signUp: async () => ({ data: { user: mockData.user, session: {} }, error: null }),
        signOut: async () => ({ error: null }),
        onAuthStateChange: (callback: any) => {
            callback('SIGNED_IN', { user: mockData.user })
            return { data: { subscription: { unsubscribe: () => { } } } }
        }
    }

    from(table: string) {
        return new MockQueryBuilder(table)
    }

    ai = {
        chat: {
            completions: {
                create: async () => ({
                    choices: [{
                        message: {
                            content: JSON.stringify({
                                name: "Mock AI Workout",
                                description: "Chest & Triceps Focus",
                                schedule: [
                                    { day: "Day 1", focus: "Chest", exercises: [{ name: "Bench Press", sets: "3", reps: "12" }] }
                                ]
                            })
                        }
                    }]
                })
            }
        }
    }
}

class MockQueryBuilder {
    table: string

    constructor(table: string) {
        this.table = table
    }

    select(columns?: string, options?: any) { return this }
    insert(data: any) { return this }
    update(data: any) { return this }
    eq(column: string, value: any) { return this }
    single() { return this.execute(true) }

    async then(resolve: any, reject: any) {
        const result = await this.execute(false)
        return resolve(result)
    }

    async execute(single = false) {
        let data: any = []

        switch (this.table) {
            case 'profiles':
                data = single ? mockData.profile : [mockData.profile]
                break
            case 'gyms':
                data = single ? mockData.gym : [mockData.gym, { ...mockData.gym, id: 'g2', name: 'Power Fitness' }]
                break
            case 'members':
                data = mockData.members.map(m => ({ ...m, gym_id: mockData.gym.id }))
                if (single) data = data[0]
                break
            case 'invoices':
                data = [{ amount: mockData.stats.revenue }]
                break
            case 'workouts':
                data = new Array(mockData.stats.activeWorkouts).fill({ name: "Daily Shred" })
                break
            default:
                data = single ? {} : []
        }

        return { data, error: null, count: Array.isArray(data) ? data.length : 1 }
    }
}

export const mockInsforge = new MockSupabaseClient() as any
