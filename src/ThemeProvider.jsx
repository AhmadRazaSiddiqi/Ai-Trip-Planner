// src/context/ThemeProvider.jsx
import { createContext, useContext, useEffect, useState } from "react"

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light")

  // Set initial theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
    const initial = savedTheme || (systemPrefersDark ? "dark" : "light")

    setTheme(initial)
    document.documentElement.classList.toggle("dark", initial === "dark")
  }, [])

  // Update <html> class and localStorage on theme change
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    localStorage.setItem("theme", theme)
  }, [theme])

  // Watch for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => {
      const systemTheme = mediaQuery.matches ? "dark" : "light"
      const savedTheme = localStorage.getItem("theme")
      if (!savedTheme) setTheme(systemTheme)
    }
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
