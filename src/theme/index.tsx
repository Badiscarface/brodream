"use client";
import * as React from "react";
import { usePathname } from "next/navigation";

// mui
import { Shadows, ThemeProvider, Theme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import * as locales from "@mui/material/locale";

// emotion
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useSelector } from "@/redux";
import { themeMode } from "@/redux/slices/settings/selectors";
// stylis
import rtlPlugin from "stylis-plugin-rtl";
import { PaletteMode } from "@mui/material";
// custom theme
import palette from "./palette";
import shadows, { customShadows } from "./shadows";
import typography from "./typography";
import breakpoints from "./breakpoints";
import shape from "./shape";
import componentsOverride from "./overrides";

// Extended Theme type with custom shadows
declare module "@mui/material/styles" {
  interface Theme {
    customShadows: CustomShadows;
  }
  interface ThemeOptions {
    customShadows?: CustomShadows;
  }
}

interface CustomShadows {
  z1: string;
  z8: string;
  z12: string;
  z16: string;
  z20: string;
  z24: string;
  primary: string;
  secondary: string;
  info: string;
  success: string;
  warning: string;
  error: string;
}

const Localization = (lang: string) => {
  switch (lang) {
    case "ar":
      return "arEG";
    case "fr":
      return "frFR";
    case "en":
      return "enUS";
    default:
      return "frFR";
  }
};

interface ThemeRegistryProps {
  children: React.ReactNode;
}

export default function ThemeRegistry({ children }: ThemeRegistryProps) {
  const pathName = usePathname();
  const mode: PaletteMode = useSelector(themeMode);
  const segments = pathName?.split("/") || [];
  const lang = segments[1] || "en";
  const locale = Localization(lang);
  const dir = lang === "ar" ? "rtl" : "ltr";

  const styleCache = createCache({
    key: dir === "rtl" ? "muirtl" : "css",
    stylisPlugins: dir === "rtl" ? [rtlPlugin] : [],
  });

  const customTheme = () =>
    createTheme(
      {
        palette: { ...palette[mode], mode },
        direction: dir,
        typography,
        shadows: (mode !== "dark" ? shadows.light : shadows.dark) as Shadows,
        shape,
        breakpoints,
        customShadows: (mode !== "dark"
          ? customShadows.light
          : customShadows.dark) as CustomShadows,
      },
      locales[locale as keyof typeof locales]
    );

  return (
    <CacheProvider value={styleCache}>
      <ThemeProvider
        theme={{
          ...customTheme(),
          components: componentsOverride(customTheme()),
        }}
      >
        <main dir={dir}>
          <CssBaseline />
          {children}
        </main>
      </ThemeProvider>
    </CacheProvider>
  );
}
