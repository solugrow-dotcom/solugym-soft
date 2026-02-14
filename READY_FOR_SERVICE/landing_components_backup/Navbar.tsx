import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dumbbell } from "lucide-react"

export function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <Dumbbell className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        SoluGrow
                    </span>
                </Link>

                <div className="hidden md:flex items-center space-x-8">
                    <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
                        Features
                    </Link>
                    <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
                        Pricing
                    </Link>
                    <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
                        Contact
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    <Link href="/auth/login">
                        <Button variant="ghost">Login</Button>
                    </Link>
                    <Link href="/auth/signup">
                        <Button>Get Started</Button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}
