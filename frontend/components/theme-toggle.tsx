"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { toast } from "react-hot-toast"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    
    // Apply custom theme classes to body
    if (newTheme === "dark") {
      document.body.classList.add('dark-theme')
      document.body.classList.remove('light-theme')
      toast.success('Dark mode enabled!')
    } else {
      document.body.classList.add('light-theme')
      document.body.classList.remove('dark-theme')
      toast.success('Light mode enabled!')
    }
  }

  if (!mounted) {
    return (
      <button className="flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 rounded-lg transition-colors duration-200">
        <Sun className="h-5 w-5" />
      </button>
    )
  }

  return (
    <button
      className="flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 rounded-lg transition-colors duration-200 group"
      onClick={handleThemeChange}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 group-hover:scale-110 transition-transform" />
      ) : (
        <Sun className="h-5 w-5 group-hover:scale-110 transition-transform" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
