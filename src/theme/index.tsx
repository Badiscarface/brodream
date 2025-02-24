'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { usePathname } from 'next/navigation';

// mui
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import * as locales from '@mui/material/locale';

// emotion
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

// stylis
import rtlPlugin from 'stylis-plugin-rtl';
// import { prefixer } from "stylis";

// custom theme
import palette from './palette';
import typography from './typography';
import breakpoints from './breakpoints';
import shape from './shape';
import componentsOverride from './overrides';

ThemeRegistry.propTypes = {
  children: PropTypes.node.isRequired,
};

const Localization = (lang: string) => {
  switch (lang) {
    case 'ar':
      return 'arEG';
    case 'fr':
      return 'frFR';
    case 'en':
      return 'enUS';
    default:
      return 'frFR';
  }
};

export default function ThemeRegistry({ ...props }) {
  const pathName = usePathname();
  const segments = pathName?.split('/');
  const lang = segments[1];
  const locale = Localization(lang);
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const styleCache = createCache({
    key: dir === 'rtl' ? 'muirtl' : 'css',
    stylisPlugins: dir === 'rtl' ? [rtlPlugin] : [],
  });
  const customTheme = () =>
    createTheme(
      {
        palette: { ...palette.light, mode: 'light' },

        direction: dir,
        typography: typography,
        // shadows: mode === "dark" ? shadows.dark : shadows.light,
        shape,
        breakpoints,
        // customShadows:
        //   mode === "dark" ? customShadows.light : customShadows.dark,
      },
      locales[locale]
    );
  return (
    <CacheProvider value={styleCache}>
      <ThemeProvider
        theme={{
          ...customTheme(),
          components: componentsOverride(customTheme()),
        }}>
        <main dir={dir}>
          <CssBaseline />
          {props.children}
        </main>
      </ThemeProvider>
    </CacheProvider>
  );
}
