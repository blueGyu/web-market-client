"use client";

import { DarkModeRounded, LightModeRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const body = document.body.classList;
    const storageTheme = localStorage.getItem("theme");
    if (storageTheme !== null) {
      if (storageTheme === "dark") {
        setIsDark(true);
        body.add("dark");
        return;
      }

      body.remove("dark");
      return;
    }

    const systemTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (systemTheme) {
      setIsDark(true);
      body.add("dark");
      localStorage.setItem("theme", "dark");
      return;
    }

    body.remove("dark");
    localStorage.setItem("theme", "light");
  }, []);

  const handleTheme = () => {
    if (!isDark) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }

    setIsDark(!isDark);
    document.body.classList.toggle("dark");
  };

  return (
    <div
      className="flex justify-center items-center size-7"
      onClick={handleTheme}
    >
      {isDark ? <LightModeRounded /> : <DarkModeRounded />}
    </div>
  );
}
