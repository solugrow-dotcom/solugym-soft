import { Navbar } from "@/components/landing/Navbar"
import { Hero } from "@/components/landing/Hero"
import { Features } from "@/components/landing/Features"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { Pricing } from "@/components/landing/Pricing"
import { Footer } from "@/components/landing/Footer"
import { AIChatWidget } from "@/components/landing/AIChatWidget"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020202]">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Footer />
      <AIChatWidget />
    </main>
  )
}
