import { ColorScheme } from "@mantine/core";
import React, { createContext, useContext } from "react";
import useThemeSwitcher from "./use-theme-switcher";

interface ThemeContextValue {
  selectedTheme: ColorScheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  selectedTheme: "dark",
  toggleTheme: () => {},
});

const useThemeContext = () => useContext(ThemeContext);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const DefaultThemeContext = useThemeSwitcher();

  return (
    <ThemeContext.Provider value={DefaultThemeContext}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export { useThemeContext };
