import { ColorScheme } from "@mantine/core";
import { useColorScheme, useLocalStorage, useLogger } from "@mantine/hooks";
import { useEffect, useState } from "react";

const pickTheme = (
  systemTheme: ColorScheme | null | undefined,
  savedTheme: ColorScheme | null | undefined,
  defaultTheme: ColorScheme
): ColorScheme => {
  if (savedTheme && (savedTheme === "dark" || savedTheme === "light"))
    return savedTheme;
  if (systemTheme && (systemTheme === "dark" || systemTheme === "light"))
    return systemTheme;
  return defaultTheme;
};

const useThemeSwitcher = (): {
  selectedTheme: ColorScheme;
  toggleTheme: () => void;
} => {
  const systemTheme = useColorScheme();
  const [savedTheme, saveTheme] = useLocalStorage<ColorScheme>({
    key: "theme-preference",
  });
  const [selectedTheme, setTheme] = useState<ColorScheme>(systemTheme);

  useEffect(
    () => setTheme(pickTheme(systemTheme, savedTheme, selectedTheme)),
    [systemTheme, savedTheme]
  );

  const toggleTheme = () => {
    saveTheme(theme => (theme === "dark" ? "light" : "dark"));
  };

  return { selectedTheme, toggleTheme };
};

export default useThemeSwitcher;
