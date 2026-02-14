"use client"

import { motion } from "framer-motion"

export function DashboardMockup() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative mt-20 mx-auto max-w-5xl group"
        >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-orange-500/50 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative rounded-xl border border-white/10 bg-black/40 backdrop-blur-2xl p-4 shadow-2xl">
                {/* Simulated Dashboard Header */}
                <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="w-48 h-4 bg-white/5 rounded-full" />
                </div>

                {/* Simulated Dashboard Content */}
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-3 space-y-4">
                        <div className="h-24 bg-primary/10 rounded-lg border border-primary/20 p-4">
                            <div className="w-12 h-2 bg-primary/40 rounded mb-4" />
                            <div className="w-20 h-4 bg-primary/60 rounded" />
                        </div>
                        <div className="h-24 bg-white/5 rounded-lg border border-white/10" />
                        <div className="h-24 bg-white/5 rounded-lg border border-white/10" />
                    </div>
                    <div className="col-span-9 space-y-4">
                        <div className="h-48 bg-white/5 rounded-lg border border-white/10 p-6 flex items-end gap-3">
                            <div className="flex-1 h-3/4 bg-primary/20 rounded-t" />
                            <div className="flex-1 h-1/2 bg-primary/30 rounded-t" />
                            <div className="flex-1 h-full bg-primary/40 rounded-t" />
                            <div className="flex-1 h-2/3 bg-primary/20 rounded-t" />
                            <div className="flex-1 h-4/5 bg-primary/30 rounded-t" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="h-32 bg-white/5 rounded-lg border border-white/10" />
                            <div className="h-32 bg-white/5 rounded-lg border border-white/10" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
