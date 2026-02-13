import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <Link href="/">
                    <Button variant="ghost" className="mb-8 p-0 hover:bg-transparent">
                        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Home
                    </Button>
                </Link>

                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                <p className="text-muted-foreground mb-8">Effective Date: February 13, 2026</p>

                <div className="prose prose-invert max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">1. Agreement to Terms</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            By accessing or using SoluGrow, you agree to be bound by these terms. Our platform is a SaaS product
                            designed for gym owners to manage their fitness facilities and members.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">2. Subscription & Payments</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            SoluGrow offers monthly and yearly plans. Fees are non-refundable unless specified otherwise.
                            Failure to pay may result in suspension of service and data access.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">3. Use Conditions</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            You are responsible for all activity under your account. You agree not to:
                            - Illegal use of data or member harassment.
                            - Attempting to reverse-engineer the platform.
                            - Reselling the software without a partnership agreement.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-primary">4. Data Ownership</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Gym owners retain ownership of their data. SoluGrow has the right to use aggregated, anonymized
                            data to improve system performance and insights.
                        </p>
                    </section>

                    <section className="pt-8 border-t border-border">
                        <p className="text-sm text-muted-foreground italic">
                            By using our platform, you acknowledge that you have read and understood these terms.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
