"use client"

import * as React from "react"
import { Home, LineChart, Accessibility, Wallet, Settings, LifeBuoy, User, Shapes, BookOpen, Currency } from "lucide-react"
import { NavMain } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"
import { ThemeToggle } from "@/components/sidebar/theme-toggle"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { AccountSwitcher } from "./team-switcher"
import { useMerchant } from "@/hooks/merchant/merchant"
import { usePathname } from "next/navigation"

export function useNavItems() {
  const pathname = usePathname()

  return {
    main: [
      {
        title: "Dashboard",
        url: "/",
        icon: Home,
        isActive: pathname === "/",
        items: [
          { title: "Analytics", url: "/", icon: LineChart }
        ],
      },
      {
        title: "Documentation",
        url: "/docs/integrate",
        icon: BookOpen,
        isActive: pathname.startsWith("/docs"),
        items: [
          { title: "Quick Integrate", url: "/docs/integrate" },
          { title: "Playground", url: "/docs/playground" },
        ],
      },
      {
        title: "Transactions",
        url: "/transactions",
        icon: Wallet,
        isActive: pathname.startsWith("/transactions"),
        items: [
          { title: "Transactions", url: "/transactions" },
          { title: "Subscribers", url: "/transactions/subscribers" }
        ]
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings,
        isActive: pathname.startsWith("/settings"),
        items: [
          { title: "Profile", url: "/settings/", icon: User },
          { title: "Account", url: "/settings/account", icon: Accessibility },
          { title: "Credentials", url: "/settings/credential", icon: Wallet },
          { title: "Billing", url: "/settings/billing", icon: Currency },
          { title: "Display", url: "/settings/display", icon: Shapes },
        ]
      },
      {
        title: "Support",
        url: "#support",
        icon: LifeBuoy,
        isActive: pathname === "#support",
      }
    ]
  }
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { merchant } = useMerchant();
  const navItems = useNavItems()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {merchant && <AccountSwitcher />}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems.main} />
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggle />
        <SidebarSeparator />
        {merchant && <NavUser user={merchant} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}