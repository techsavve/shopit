"use client"

import { usePathname } from "next/navigation"
import { useAccount } from "@/hooks/account/account"

interface PageInfo {
  title: string
  description: string
  icon?: React.ReactNode
}

export function PageHeader() {
  const pathname = usePathname()
  const { account } = useAccount()

  const getPageInfo = (): PageInfo => {
    switch (pathname) {
      case "/":
        return {
          title: "Dashboard Overview",
          description: "Welcome back! Here's what's happening with your business today."
        }
      case "/transactions":
        return {
          title: "Transactions",
          description: "View and manage all your payment transactions"
        }
      case "/transactions/subscribers":
        return {
          title: "Subscribers",
          description: "Manage your recurring payment subscribers"
        }
      case "/settings":
      case "/settings/":
        return {
          title: "Settings",
          description: "Update your profile and notification preferences"
        }
      case "/settings/account":
        return {
          title: "Account Settings",
          description: "Manage your account configuration and preferences"
        }
      case "/settings/credential":
        return {
          title: "Credentials",
          description: "Manage your API keys and authentication settings"
        }
      case "/settings/billing":
        return {
          title: "Billing",
          description: "View and manage your billing information and payment methods"
        }
      case "/settings/display":
        return {
          title: "Display Settings",
          description: "Customize your dashboard appearance and preferences"
        }
      default:
        // Extract title from pathname for dynamic routes
        const segments = pathname.split('/').filter(Boolean)
        const lastSegment = segments[segments.length - 1]
        const title = lastSegment 
          ? lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, ' ')
          : "Page"
        
        return {
          title,
          description: `Manage your ${title.toLowerCase()}`
        }
    }
  }

  const pageInfo = getPageInfo()

  return (
    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {pageInfo.title}
    </h1>
  )
}
