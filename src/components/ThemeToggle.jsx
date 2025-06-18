// src/components/ThemeToggle.jsx
import { useTheme } from "@/ThemeProvider.jsx"
import { Moon, Sun } from "lucide-react"
import { Switch } from "@radix-ui/react-switch"
import { cn } from "@/lib/utils" // optional if you're using clsx or cn utility

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex items-center gap-2">
      <Sun
        className={cn(
          "h-5 w-5",
          theme === "light" ? "opacity-100" : "opacity-50"
        )}
      />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
        className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-muted transition-colors duration-200 ease-in-out focus:outline-none"
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-primary shadow ring-0 transition duration-200 ease-in-out",
            theme === "dark" ? "translate-x-5" : "translate-x-0"
          )}
        />
      </Switch>
      <Moon
        className={cn(
          "h-5 w-5",
          theme === "dark" ? "opacity-100" : "opacity-50"
        )}
      />
    </div>
  )
}
