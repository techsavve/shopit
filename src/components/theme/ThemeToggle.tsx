"use client"

import { useTheme } from "next-themes"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export function TestControls() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <Button
        variant="secondary"
        onClick={() =>
          setTheme(theme === "dark" ? "light" : "dark")
        }
      >
        Toggle Theme
      </Button>

      <Button
        onClick={() =>
          toast.success("Toast is working 🎉")
        }
      >
        Show Toast
      </Button>
    </div>
  )
}
 