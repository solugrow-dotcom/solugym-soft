"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AIChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { role: "bot", content: "Hi 👋 I’m SoluGrow AI. Ask me anything about gym management or pricing." }
    ])

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="mb-4 w-80 md:w-96 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/5 bg-primary/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                    <Bot className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white">SoluGrow AI</p>
                                    <p className="text-[10px] text-primary">Always Active</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Chat Body */}
                        <div className="h-96 p-4 overflow-y-auto space-y-4">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.role === 'bot' ? 'justify-start' : 'justify-end'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'bot'
                                            ? 'bg-white/5 text-white/80 rounded-tl-none'
                                            : 'bg-primary text-white rounded-tr-none'
                                        }`}>
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-white/5 bg-white/5">
                            <div className="relative">
                                <input
                                    placeholder="Type your question..."
                                    className="w-full bg-black/40 border border-white/10 rounded-full py-2 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-primary/50"
                                />
                                <button className="absolute right-2 top-1.5 h-7 w-7 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform">
                                    <Send className="h-3.5 w-3.5 text-white" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="h-14 w-14 rounded-full bg-[#F59E0B] flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:scale-110 transition-transform group"
            >
                {isOpen ? <X className="h-6 w-6 text-black" /> : <MessageSquare className="h-6 w-6 text-black group-hover:animate-pulse" />}
            </button>
        </div>
    )
}
