import Link from "next/link"
import { Dumbbell, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-[#020202] py-20 border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center space-x-2">
                            <Dumbbell className="h-8 w-8 text-primary" />
                            <span className="text-2xl font-bold text-white tracking-tighter">SoluGrow</span>
                        </Link>
                        <p className="text-white/40 font-light leading-relaxed">
                            The complete operating system for modern gyms and fitness centers.
                            Automate your business, focus on your members.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-6">Explore</h4>
                        <ul className="space-y-4 text-sm text-white/40">
                            <li><Link href="#features" className="hover:text-primary transition-colors">Features</Link></li>
                            <li><Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                            <li><Link href="/auth/signup" className="hover:text-primary transition-colors">Get Started</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Success Stories</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-white/40">
                            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link href="#contact" className="hover:text-primary transition-colors">Support</Link></li>
                        </ul>
                    </div>

                    <div id="contact space-y-6">
                        <h4 className="font-semibold text-white mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-sm text-white/40">
                            <li className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-primary" />
                                <span>solugrow@gmail.com</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-primary" />
                                <span>pintuclub51@gmail.com</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-primary" />
                                <span>+91 9719408937</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span>U.P, India</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6">
                    <p className="text-sm text-white/20 font-light">
                        © {new Date().getFullYear()} SoluGrow Software. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-white/20 hover:text-primary transition-colors text-sm">Twitter</Link>
                        <Link href="#" className="text-white/20 hover:text-primary transition-colors text-sm">LinkedIn</Link>
                        <Link href="#" className="text-white/20 hover:text-primary transition-colors text-sm">GitHub</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
