"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Icons } from "@/components/icons"
import { useAccount } from "@/hooks/account/account"
import { cn } from "@/lib/utils"

const PAYMENT_DURATION = 15 * 60 // 15 minutes in seconds

const USDT_WALLET_ADDRESS = "0xYourBSCWalletAddressHere"
const AMOUNT_USDT = 20.0 // Adjust based on selected plan

export function CheckoutForm() {
  const { isProgressLoading, createAccount, onboarding, setOnboarding } = useAccount()

  const [timeLeft, setTimeLeft] = useState(PAYMENT_DURATION)
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    if (timeLeft <= 0) {
      setExpired(true)
      return
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
  }

  const handleConfirmPayment = () => {
    if (!onboarding) return
    createAccount({ ...onboarding })
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="pb-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Complete Payment</h2>
        <p className="mt-1 text-sm text-gray-600">
          Send <strong>{AMOUNT_USDT} USDT</strong> to the wallet address below to activate your plan.
        </p>
      </div>

      <div className="space-y-4 py-6 h-[445px] overflow-y-auto">
        <div className="p-4 border rounded-md space-y-3 bg-muted/30">
          <div className="text-sm font-medium">Payment Amount</div>
          <div className="text-lg font-semibold">{AMOUNT_USDT} USDT</div>

          <div className="text-sm font-medium mt-4">Network</div>
          <div className="text-base text-foreground">Binance Smart Chain (BSC)</div>

          <div className="text-sm font-medium mt-4">Wallet Address</div>
          <div className="text-xs font-mono p-2 bg-muted rounded border select-all">
            {USDT_WALLET_ADDRESS}
          </div>

          {/* Optionally add a QR code here */}
          {/* <img src="/api/generate-qr?value=..." alt="QR Code" /> */}

          <div className="text-sm font-medium mt-4">Time Remaining</div>
          <div
            className={cn(
              "text-xl font-semibold",
              expired ? "text-red-500" : "text-green-600"
            )}
          >
            {expired ? "Expired" : formatTime(timeLeft)}
          </div>
        </div>

        {expired && (
          <p className="text-sm text-red-600">
            This payment session has expired. Please go back and choose your plan again.
          </p>
        )}
      </div>

      <DialogFooter>
        <Button variant="outline" type="button" onClick={() => setOnboarding("pricing")}>
          Back
        </Button>
        <Button
          type="submit"
          onClick={handleConfirmPayment}
          disabled={expired || isProgressLoading}
        >
          {isProgressLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Confirm Payment
        </Button>
      </DialogFooter>
    </form>
  )
}
