"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

interface ThemeContextValue {
    theme: Theme;
    resolved: ResolvedTheme;
    setTheme: (theme: Theme) => void;
    toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): ResolvedTheme {
    return "dark";
}

function applyTheme(resolved: ResolvedTheme) {
    if (resolved === "dark") {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
}

function getInitialTheme(): Theme {
    if (typeof window === "undefined") return "dark";
    return (localStorage.getItem("theme") as Theme | null) || "dark";
}

function resolveTheme(theme: Theme): ResolvedTheme {
    return theme === "system" ? getSystemTheme() : theme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(getInitialTheme);
    const [resolved, setResolved] = useState<ResolvedTheme>(() =>
        resolveTheme(getInitialTheme())
    );

    // Apply theme class on mount and when resolved changes
    useEffect(() => {
        applyTheme(resolved);
    }, [resolved]);

    // Listen for system preference changes
    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: light)");
        function onChange() {
            if (theme === "system") {
                const res = getSystemTheme();
                setResolved(res);
                applyTheme(res);
            }
        }
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, [theme]);

    const setTheme = useCallback((next: Theme) => {
        setThemeState(next);
        if (next === "system") {
            localStorage.removeItem("theme");
            const res = getSystemTheme();
            setResolved(res);
            applyTheme(res);
        } else {
            localStorage.setItem("theme", next);
            setResolved(next);
            applyTheme(next);
        }
    }, []);

    const toggle = useCallback(() => {
        setTheme(resolved === "dark" ? "light" : "dark");
    }, [resolved, setTheme]);

    return (
        <ThemeContext.Provider value={{ theme, resolved, setTheme, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
    return ctx;
}
