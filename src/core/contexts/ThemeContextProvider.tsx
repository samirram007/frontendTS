import { createContext, use, useEffect } from "react"

type ThemeProviderProps = {
    children: React.ReactNode
}

type ThemeProviderState = {
    theme: "light"
    setTheme: (theme: "light") => void
}

const initialState: ThemeProviderState = {
    theme: "light",
    setTheme: () => null,
}

const ThemeContext = createContext<ThemeProviderState>(initialState)

export function ThemeContextProvider({ children, ...props }: ThemeProviderProps) {
    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove("dark")
        root.classList.add("light")
        localStorage.setItem("vite-ui-theme", "light")
    }, [])

    return (
        <ThemeContext {...props} value={{ theme: "light", setTheme: () => null }}>
            {children}
        </ThemeContext>
    )
}

export const useTheme = () => {
    const context = use(ThemeContext)
    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeContextProvider")
    return context
}
