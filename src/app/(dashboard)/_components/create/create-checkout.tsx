"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/icons"
import { useAccount } from "@/hooks/account/account"
import { 
  Wallet, 
  CheckCircle, 
  Shield, 
  Clock, 
  CreditCard, 
  Lock,
  Sparkles,
  Zap
} from "lucide-react"

export function CheckoutForm({ onClose }: { onClose: () => void }) {
  const { onboarding, setOnboarding, createAccount } = useAccount()
  const [isConnecting, setIsConnecting] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'connecting' | 'pending' | 'processing' | 'success'>('idle')
  const [walletAddress, setWalletAddress] = useState<string>('')

  // Simulated dapp connection
  const connectWallet = async () => {
    setIsConnecting(true)
    setPaymentStatus('connecting')
    
    // Simulate wallet connection delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Generate wallet address client-side only to avoid hydration mismatch
    const mockAddress = '0x' + Array.from({ length: 40 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('')
    
    setWalletAddress(mockAddress)
    setPaymentStatus('pending')
    setIsConnecting(false)
  }

  const handlePayment = async () => {
    if (!onboarding) return
    
    setIsProcessing(true)
    setPaymentStatus('processing')
    
    try {
      // Simulate blockchain payment
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create account after successful payment
      await createAccount({ ...onboarding, plan: "standard" })
      setPaymentStatus('success')
    } catch (error) {
      console.error('Payment failed:', error)
      setPaymentStatus('pending')
    } finally {
      setIsProcessing(false)
    }
  }

  const paymentAmount = 20 // $20/month
  const packageName = 'Monthly'
  
  return (
    <div className="px-12 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#00BCD4] to-cyan-600 mb-4">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Complete Your Subscription
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Secure payment via decentralized blockchain
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Summary Card */}
          <Card className="lg:col-span-2 border-2 border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
            <CardHeader className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Payment Summary
                </CardTitle>
                <Badge className="bg-[#00BCD4] text-white text-[10px] px-2 py-0.5">
                  <Lock className="w-2.5 h-2.5 mr-1" />
                  Secure
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Package Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00BCD4] to-cyan-600 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 capitalize">
                        {packageName} Package
                      </span>
                      <Badge variant="outline" className="text-[10px]">
                        Monthly
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      All features included
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
                      ${paymentAmount}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      per month
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200 dark:border-slate-800" />

                {/* Total */}
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    Total Amount
                  </span>
                  <div className="text-right">
                    <div className="text-xl font-bold text-[#00BCD4]">
                      ${paymentAmount}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                      Due today
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Payment Method
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Step 1 of 2
                  </span>
                </div>

                {!walletAddress ? (
                  <Button
                    onClick={connectWallet}
                    disabled={isConnecting}
                    className="w-full h-11 bg-gradient-to-r from-[#00BCD4] to-cyan-600 hover:from-[#00BCD4]/90 hover:to-cyan-600/90 text-white font-medium shadow-lg shadow-[#00BCD4]/25"
                  >
                    {isConnecting ? (
                      <>
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Wallet className="mr-2 h-4 w-4" />
                        Connect Wallet
                      </>
                    )}
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg border-2 border-[#00BCD4] bg-[#00BCD4]/5 dark:bg-[#00BCD4]/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#00BCD4] flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                            Wallet Connected
                          </p>
                          <p className="text-[10px] text-slate-600 dark:text-slate-400 font-mono truncate">
                            {walletAddress}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="w-full h-11 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-medium shadow-lg shadow-emerald-500/25"
                    >
                      {isProcessing ? (
                        <>
                          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Pay ${paymentAmount} / Month
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Security & Benefits Sidebar */}
          <Card className="border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <CardHeader className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <CardTitle className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00BCD4]" />
                Why Choose Us
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                    Secure Payments
                  </p>
                  <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">
                    Powered by blockchain technology
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                    Instant Access
                  </p>
                  <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">
                    Unlock features immediately
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                    Premium Support
                  </p>
                  <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">
                    24/7 customer assistance
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-4">
                <p className="text-[10px] text-slate-500 dark:text-slate-400 text-center">
                  <Lock className="w-3 h-3 inline mr-1" />
                  Your payment is secured by blockchain
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Status Indicator */}
        {(paymentStatus === 'connecting' || paymentStatus === 'processing') && (
          <div className="flex items-center justify-center gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
            <Icons.spinner className="h-5 w-5 animate-spin text-[#00BCD4]" />
            <div className="text-center">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                {paymentStatus === 'connecting' ? 'Connecting to wallet...' : 'Processing your payment...'}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                This may take a few seconds
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
