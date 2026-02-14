export const config = {
  runtime: "nodejs",
};

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@insforge/sdk'

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const apiUrl = process.env.NEXT_PUBLIC_INSFORGE_API_URL
    const apiKey = process.env.NEXT_PUBLIC_INSFORGE_API_KEY

    // If config is missing, bypass auth checks to prevent crash
    if (!apiUrl || !apiKey) {
        return res
    }

    // Create a client for the middleware
    const insforge = createClient({
        baseUrl: apiUrl,
        anonKey: apiKey,
    })

    try {
        // Check auth state
        const { data: { session } } = await insforge.auth.getSession()

        // Protected routes
        if (req.nextUrl.pathname.startsWith('/dashboard')) {
            if (!session) {
                return NextResponse.redirect(new URL('/auth/login', req.url))
            }
        }
    } catch (e) {
        // If auth check fails, allow request to proceed or redirect to login
        // For safety, we'll allow it to proceed ensuring the app doesn't break
        console.error('Middleware auth check failed:', e)
    }

    return res
}

export const config = {
    matcher: ['/dashboard/:path*', '/setup-gym'],
}
