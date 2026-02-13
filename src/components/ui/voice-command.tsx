"use client"

import { useState } from "react"
import { Mic, MicOff, Volume2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function VoiceCommand() {
    const [isListening, setIsListening] = useState(false)
    const [transcript, setTranscript] = useState("")

    const toggleListening = () => {
        setIsListening(!isListening)
        if (!isListening) {
            setTranscript("Listening for 'Start Workout'...")
            setTimeout(() => setTranscript("Recognized: 'Start Leg Day'"), 2000)
            setTimeout(() => {
                setTranscript("")
                setIsListening(false)
            }, 4000)
        }
    }

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <AnimatePresence>
                {transcript && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute bottom-16 right-0 bg-background/80 backdrop-blur-xl border border-primary/20 p-4 rounded-2xl shadow-2xl min-w-[200px]"
                    >
                        <div className="flex items-center gap-3">
                            <Volume2 className="w-4 h-4 text-primary animate-pulse" />
                            <p className="text-sm font-medium">{transcript}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={toggleListening}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all ${isListening
                        ? 'bg-red-500 text-white animate-pulse shadow-red-500/50'
                        : 'bg-primary text-white shadow-primary/50 hover:scale-105'
                    }`}
            >
                {isListening ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
            </button>
        </div>
    )
}
