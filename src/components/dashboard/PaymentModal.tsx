"use client"

import { useState } from "react"
import { Check, CreditCard, Loader2, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export function PaymentModal({ isOpen, onClose, planName, price }: { isOpen: boolean, onClose: () => void, planName: string, price: string }) {
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)

    const handlePay = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setStep(2)
        }, 2000)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-primary/20">
                <DialogHeader>
                    <DialogTitle>{step === 1 ? "Complete Payment" : "Payment Successful!"}</DialogTitle>
                    <DialogDescription>
                        {step === 1
                            ? `Securely subscribe to the ${planName} plan.`
                            : "Welcome to the pro tier of fitness management."
                        }
                    </DialogDescription>
                </DialogHeader>

                {step === 1 ? (
                    <div className="space-y-6 pt-4">
                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Amount</p>
                                <p className="text-2xl font-bold text-primary">{price}</p>
                            </div>
                            <ShieldCheck className="w-8 h-8 text-primary/40" />
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Card Number</label>
                                <div className="relative">
                                    <Input placeholder="4242 4242 4242 4242" className="pl-10" />
                                    <CreditCard className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Input placeholder="MM/YY" />
                                <Input placeholder="CVC" />
                            </div>
                        </div>

                        <Button className="w-full h-12" onClick={handlePay} disabled={loading}>
                            {loading ? <Loader2 className="animate-spin mr-2" /> : "Pay Now"}
                        </Button>
                        <p className="text-[10px] text-center text-muted-foreground px-4 uppercase tracking-widest">
                            Secure encrypted payment processed by SoluGrow Integrated Payments
                        </p>
                    </div>
                ) : (
                    <div className="py-8 text-center space-y-4">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto animate-in zoom-in">
                            <Check className="w-10 h-10 text-white" />
                        </div>
                        <div>
                            <p className="text-xl font-bold">Thank you for subscribing!</p>
                            <p className="text-sm text-muted-foreground">Your receipt has been sent to your email.</p>
                        </div>
                        <Button className="w-full" onClick={onClose}>Back to Dashboard</Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
