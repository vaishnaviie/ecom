import { useEffect, useState } from "react";
import { getActualTheme } from "../utils/utils";

export const useTheme = () => {
  const [theme, setTheme] = useState("default");
  useEffect(() => {
    const actualTheme = getActualTheme(theme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(actualTheme);
    localStorage.setItem("theme", actualTheme);
  }, [theme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem(theme);
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);
  return { theme, setTheme };
};
