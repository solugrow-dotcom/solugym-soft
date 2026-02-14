"use client"
import { useState } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useUser } from "@/hooks/useUser"
import { LayoutDashboard, Users, UserCog, Settings, Shield, Dumbbell, Calendar, CreditCard, LogOut, Menu, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { insforge } from "@/lib/insforge"
import { useRouter } from "next/navigation"

export function Sidebar() {
    const pathname = usePathname()
    const { profile } = useUser()
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const handleLogout = async () => {
        await insforge.auth.signOut()
        router.push("/")
    }

    const gymOwnerLinks = [
        { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
        { label: "Members", href: "/dashboard/admin/members", icon: Users },
        { label: "Staff", href: "/dashboard/admin/staff", icon: UserCog },
        { label: "Workouts", href: "/dashboard/admin/workouts", icon: Dumbbell },
        { label: "Attendance", href: "/dashboard/admin/attendance", icon: Calendar },
        { label: "Billing", href: "/dashboard/admin/billing", icon: CreditCard },
        { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
    ]

    const superAdminLinks = [
        { label: "Overview", href: "/dashboard/super-admin", icon: LayoutDashboard },
        { label: "Gyms", href: "/dashboard/super-admin/gyms", icon: Dumbbell },
        { label: "Subscriptions", href: "/dashboard/super-admin/subscriptions", icon: CreditCard },
        { label: "Vault", href: "/dashboard/super-admin/vault", icon: Shield },
    ]

    const memberLinks = [
        { label: "My Dashboard", href: "/dashboard/member", icon: LayoutDashboard },
        { label: "My Workouts", href: "/dashboard/member/workouts", icon: Dumbbell },
        { label: "Diets", href: "/dashboard/member/diets", icon: Calendar },
        { label: "Profile", href: "/dashboard/member/profile", icon: UserCog },
    ]

    const staffLinks = [
        { label: "Check-in Desk", href: "/dashboard/staff", icon: UserCheck },
        { label: "Members", href: "/dashboard/admin/members", icon: Users },
        { label: "Attendance", href: "/dashboard/admin/attendance", icon: Calendar },
    ]

    let links: any[] = []
    if (profile?.role === 'gym_owner') links = gymOwnerLinks
    else if (profile?.role === 'super_admin') links = superAdminLinks
    else if (profile?.role === 'member') links = memberLinks
    else if (profile?.role === 'staff') links = staffLinks
    else links = []

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-card">
            <div className="p-6">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                    SoluGrow
                </h1>
                <p className="text-xs text-muted-foreground mt-1">Gym Management OS</p>
            </div>

            <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                {links.map((link) => {
                    const Icon = link.icon
                    return (
                        <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start gap-3",
                                    pathname === link.href ? "bg-primary/10 text-primary" : "text-muted-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {link.label}
                            </Button>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t">
                <Button variant="ghost" className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-500/10" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    Logout
                </Button>
            </div>
        </div>
    )

    return (
        <>
            {/* Mobile Trigger */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Menu className="h-4 w-4" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 sm:max-w-xs">
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:flex flex-col w-64 border-r bg-card h-screen fixed left-0 top-0">
                <SidebarContent />
            </div>
        </>
    )
}
