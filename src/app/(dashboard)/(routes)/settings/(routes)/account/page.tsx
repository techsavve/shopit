"use client"
import { Separator } from "@/components/ui/separator"
import { AccountForm } from "./_components/account-form"

export default function SettingsAccountPage() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Update your account settings. Set your preferred language and timezone.
      </p>
      <Separator />
      <AccountForm />
    </div>
  )
}