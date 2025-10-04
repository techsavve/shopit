"use client"
import { Separator } from "@/components/ui/separator"
import { WalletForm } from "./_components/wallet-form"

export default function SettingsWalletPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Wallet</h3>
        <p className="text-sm text-muted-foreground">
          Customize the Wallet of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <Separator />
      <WalletForm />
    </div>
  )
}
