"use client"
import { Separator } from "@/components/ui/separator"
import { DisplayForm } from "./display-form"

export default function SettingsDisplayPage() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Turn items on or off to control what&apos;s displayed in the app.
      </p>
      <Separator />
      <DisplayForm />
    </div>
  )
}
