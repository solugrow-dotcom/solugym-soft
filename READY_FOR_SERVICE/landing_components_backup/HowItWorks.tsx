import { motion } from "framer-motion"

const steps = [
    {
        id: "01",
        title: "Create Account",
        description: "Register your business and secure your dedicated gym portal instantly."
    },
    {
        id: "02",
        title: "Add Gym, Members & Staff",
        description: "Easily bulk import members and set up your staff roles with smart permissions."
    },
    {
        id: "03",
        title: "Start Managing Digitally",
        description: "Automate billing, track attendance, and use AI to optimize your gym operations."
    }
]

export function HowItWorks() {
    return (
        <section className="py-32 bg-[#020202] border-y border-white/5">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">
                        Simple Onboarding
                    </h2>
                    <p className="text-white/50 text-xl font-light">
                        Getting started with SoluGrow is effortless. Follow these three simple steps to modernize your gym.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {steps.map((step, index) => (
                        <div key={index} className="relative p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                            <div className="text-4xl font-bold text-primary opacity-20 mb-6">{step.id}</div>
                            <h3 className="text-2xl font-semibold mb-4 text-white">{step.title}</h3>
                            <p className="text-white/40 leading-relaxed font-light">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
