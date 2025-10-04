"use client"

import {
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
  type LucideIcon,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

type Project = {
  name: string
  url: string
  icon: LucideIcon
  status?: "active" | "archived" | "shared"
}

export function NavProjects({ projects }: { projects: Project[] }) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="text-sm font-semibold text-muted-foreground tracking-wide">
        Projects
      </SidebarGroupLabel>

      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              className="flex items-center justify-between group hover:bg-muted/50 transition-colors rounded-md"
            >
              <a href={item.url} className="flex items-center gap-3 flex-1 py-2 px-2">
                <item.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium truncate">{item.name}</span>
              </a>
            </SidebarMenuButton>

            {/* Dropdown Actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction
                  showOnHover
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">More options</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-52 rounded-lg shadow-lg"
                side={isMobile ? "bottom" : "right"}
                align="start"
              >
                <DropdownMenuItem asChild>
                  <a href={item.url} className="flex items-center gap-2">
                    <Folder className="h-4 w-4 text-muted-foreground" />
                    <span>View Project</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="h-4 w-4 text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-700 focus:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}

        {/* More Section */}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70 hover:text-foreground hover:bg-muted/40 transition-colors">
            <MoreHorizontal className="h-4 w-4" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
