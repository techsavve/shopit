"use client"
import { Separator } from "@/components/ui/separator"
import { NotificationsForm } from "../(profile)/_components/notifications-form"
import BillingForm from "./_component/billing_form"

export default function SettingsBillingsPage() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Configure how you receive notifications.
      </p>
      <Separator />
      <BillingForm />
    </div>
  )
}
