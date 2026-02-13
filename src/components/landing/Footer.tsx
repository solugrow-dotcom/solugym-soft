import Link from "next/link"
import { Dumbbell, Github, Twitter, Linkedin } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-secondary/20 py-12 border-t">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <Dumbbell className="h-6 w-6 text-primary" />
                            <span className="text-xl font-bold">SoluGrow</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            The complete operating system for modern gyms and fitness centers.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-medium mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#features" className="hover:text-primary">Features</Link></li>
                            <li><Link href="#pricing" className="hover:text-primary">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-primary">Changelog</Link></li>
                            <li><Link href="#" className="hover:text-primary">Documentation</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary">About Us</Link></li>
                            <li><Link href="#" className="hover:text-primary">Careers</Link></li>
                            <li><Link href="#" className="hover:text-primary">Blog</Link></li>
                            <li><Link href="#contact" className="hover:text-primary">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-primary">Cookie Policy</Link></li>
                        </ul>
                    </div>

                    <div id="contact">
                        <h4 className="font-medium mb-4">Contact Us</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>Email: solugrow@gmail.com</li>
                            <li>Phone: +91-9719408937</li>
                            <li>Address: U.P, India</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © 2026 SoluGrow Software. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary"><Github className="h-5 w-5" /></Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin className="h-5 w-5" /></Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
