"use client"
import { Sidebar } from "@/components/dashboard/Sidebar"
import { VoiceCommand } from "@/components/ui/voice-command"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-background flex">
            <Sidebar />
            <main className="flex-1 md:ml-64 p-8 overflow-y-auto">
                {children}
            </main>
            <VoiceCommand />
        </div>
    )
}
