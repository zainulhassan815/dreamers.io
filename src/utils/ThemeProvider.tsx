import { ColorScheme, ColorSchemeProvider } from "@mantine/core";
import { useHotkeys, useLocalStorage, useLogger } from "@mantine/hooks";
import React from "react";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "theme-preference",
    defaultValue: "light",
    getInitialValueInEffect: false,
  });

  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  useLogger("ThemeProvider", [colorScheme]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      {children}
    </ColorSchemeProvider>
  );
};

export default ThemeProvider;
