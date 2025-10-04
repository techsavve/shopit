"use client"

import { Separator } from "@/components/ui/separator"
import { ProfileForm } from "./_components/profile-form"
import { NotificationsForm } from "./_components/notifications-form"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"

export default function SettingsProfilePage() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">
          Update your profile and notification preferences.
        </p>
      </div>
      <Separator />

      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="pt-4">
            <ProfileForm />
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="pt-4">
            <NotificationsForm />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
