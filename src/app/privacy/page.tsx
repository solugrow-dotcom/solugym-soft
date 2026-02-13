import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <Link href="/">
                    <Button variant="ghost" className="mb-8 p-0 hover:bg-transparent">
                        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Home
                    </Button>
                </Link>

                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <p className="text-muted-foreground mb-8">Last Updated: February 13, 2026</p>

                <div className="prose prose-invert max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">1. Information We Collect</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            To provide our Gym Management services, SoluGrow collects information essential for gym operations,
                            including member names, contact details, attendance records, and payment information processed through
                            our secure partners.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">2. How We Use Data</h2>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                            <li>To manage gym memberships and subscriptions.</li>
                            <li>To generate AI-powered workout and diet recommendations (with member consent).</li>
                            <li>To process automated billing and generate invoices.</li>
                            <li>To provide customer support and improve platform features.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">3. Data Security</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We use industry-standard encryption and secure cloud infrastructure (via InsForge) to protect your
                            and your members' data. Access is restricted through strict Row Level Security (RLS) policies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">4. AI Features</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            When using AI features like the Workout Generator, data provided is processed by third-party
                            AI models (like Google Gemini). We do not use member data for training these models.
                        </p>
                    </section>

                    <section className="pt-8 border-t border-border">
                        <p className="text-sm text-muted-foreground italic">
                            For any questions regarding this policy, contact us at support@solugrow.site
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
