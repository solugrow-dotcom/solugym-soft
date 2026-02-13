import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center rounded-full border px-4 py-1.5 mb-8 bg-background/50 backdrop-blur-sm">
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                            v1.0 Public Beta
                        </span>
                        <span className="ml-2 text-xs text-muted-foreground">
                            - Now available for all gyms
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                        Manage Your Gym <br />
                        <span className="text-primary">Like a Pro</span>
                    </h1>

                    <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                        The all-in-one platform for gym owners. Automate billing, manage members,
                        track attendance, and grow your business with AI-powered insights.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/auth/signup">
                            <Button size="lg" className="h-12 px-8 text-base">
                                Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="#features">
                            <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                                View Demo
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <span>No credit card required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <span>14-day free trial</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Gradients */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </section>
    )
}
