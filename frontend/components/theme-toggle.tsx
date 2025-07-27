"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 rounded-lg transition-colors duration-200">
        <Sun className="h-5 w-5" />
      </button>
    )
  }

  return (
    <button
      className="flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
