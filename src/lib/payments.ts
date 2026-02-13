export const PAYMENT_PLANS = {
    BASIC: {
        id: 'basic',
        name: 'Basic',
        price: 999,
        features: ['Up to 100 members', 'Basic Reports', 'Support via Email']
    },
    PRO: {
        id: 'pro',
        name: 'Pro',
        price: 1999,
        features: ['Up to 500 members', 'AI Workout Generator', 'Attendance Tracker', 'Priority Support']
    },
    ENTERPRISE: {
        id: 'enterprise',
        name: 'Enterprise',
        price: 2999,
        features: ['Unlimited members', 'Full AI Suite', 'Multi-gym support', 'Dedicated Account Manager']
    }
}

export async function createSubscription(planId: string, provider: 'stripe' | 'razorpay') {
    // Logic to call backend API or third party provider
    console.log(`Creating ${planId} subscription via ${provider}`)
    return { id: `sub_${Math.random().toString(36).substr(2, 9)}`, success: true }
}
