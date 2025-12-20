"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useSidebar } from "@/components/ui/sidebar"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const { state } = useSidebar()
    const isCollapsed = state === "collapsed"
    const [mounted, setMounted] = React.useState(false)

    // Avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true)
    }, [])

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    if (!mounted) {
        return (
            <Button
                variant="ghost"
                size="sm"
                className={`w-full ${isCollapsed ? "justify-center px-2" : "justify-start gap-2"}`}
            >
                <div className="h-4 w-4" />
                {!isCollapsed && <span>Toggle theme</span>}
            </Button>
        )
    }

    const isDark = theme === "dark"

    if (isCollapsed) {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleTheme}
                            className="w-full justify-center px-2"
                        >
                            {isDark ? (
                                <Sun className="h-4 w-4 text-yellow-500" />
                            ) : (
                                <Moon className="h-4 w-4 text-slate-600" />
                            )}
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        {isDark ? "Switch to light mode" : "Switch to dark mode"}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="w-full justify-start gap-2 px-2"
        >
            {isDark ? (
                <>
                    <Sun className="h-4 w-4 text-yellow-500" />
                    <span>Light Mode</span>
                </>
            ) : (
                <>
                    <Moon className="h-4 w-4 text-slate-600" />
                    <span>Dark Mode</span>
                </>
            )}
        </Button>
    )
}
