import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, PlayCircle } from "lucide-react"
import { DashboardMockup } from "./DashboardMockup"
import { motion } from "framer-motion"

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#020202]">
            {/* Cinematic Background Image Overlay */}
            <div
                className="absolute inset-0 z-0 opacity-40 mix-blend-overlay"
                style={{
                    backgroundImage: 'url("/cinematic_gym_background.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center rounded-full border border-white/10 px-4 py-1.5 mb-8 bg-white/5 backdrop-blur-xl">
                            <span className="text-xs font-semibold uppercase tracking-widest text-[#F59E0B]">
                                Next-Gen OS
                            </span>
                            <div className="mx-2 w-[1px] h-3 bg-white/20" />
                            <span className="text-xs text-white/60">
                                Powering Modern Fitness Centers
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 text-white leading-[1.1]">
                            SoluGrow: <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40">
                                Smart Gym Management Software
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                            Manage members, payments, workouts, and operations in one secure platform.
                            Build your fitness empire with data-driven simplicity.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href="/auth/signup">
                                <Button size="lg" className="h-14 px-10 text-base bg-[#F59E0B] hover:bg-[#D97706] text-black font-semibold rounded-full transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                                    Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="#demo">
                                <Button size="lg" variant="outline" className="h-14 px-10 text-base border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-full backdrop-blur-md">
                                    Request Demo <PlayCircle className="ml-2 h-4 w-4 opacity-50" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    <DashboardMockup />
                </div>
            </div>

            {/* Premium Highlights */}
            <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#F59E0B]/10 rounded-full blur-[120px] opacity-40 -z-10" />
            <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-30 -z-10" />
        </section>
    )
}
