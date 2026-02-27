import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ColorTheme = "blue" | "gold";

interface ColorThemeContextType {
  theme: ColorTheme;
  setTheme: (t: ColorTheme) => void;
}

const ColorThemeContext = createContext<ColorThemeContextType>({
  theme: "blue",
  setTheme: () => {},
});

const VARS: Record<ColorTheme, Record<string, string>> = {
  blue: {
    "--primary": "216 90% 58%",
    "--accent": "216 90% 58%",
    "--ring": "216 90% 58%",
    "--line-accent": "216 90% 58%",
    "--icon-accent": "216 90% 58%",
    "--glow-primary": "216 90% 58%",
  },
  gold: {
    "--primary": "38 90% 55%",
    "--accent": "38 90% 55%",
    "--ring": "38 90% 55%",
    "--line-accent": "38 90% 55%",
    "--icon-accent": "38 90% 55%",
    "--glow-primary": "38 90% 55%",
  },
};

export function ColorThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ColorTheme>(() => {
    return (localStorage.getItem("color-theme") as ColorTheme) || "blue";
  });

  const setTheme = (t: ColorTheme) => {
    setThemeState(t);
    localStorage.setItem("color-theme", t);
  };

  useEffect(() => {
    const root = document.documentElement;
    const vars = VARS[theme];
    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    root.setAttribute("data-color-theme", theme);
  }, [theme]);

  return (
    <ColorThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ColorThemeContext.Provider>
  );
}

export const useColorTheme = () => useContext(ColorThemeContext);
