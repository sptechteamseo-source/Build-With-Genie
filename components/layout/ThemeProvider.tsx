"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    // Sync React state with whatever the head script already set on <html>
    const stored = localStorage.getItem("genie-theme");
    if (stored === "light" || stored === "dark") {
      setThemeState(stored);
    }
  }, []);

  function setTheme(next: Theme) {
    setThemeState(next);
    localStorage.setItem("genie-theme", next);
    document.documentElement.setAttribute("data-theme", next);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
