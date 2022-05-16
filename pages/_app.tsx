import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { CacheProvider } from '@emotion/react';
import { EmotionCache } from '@emotion/cache';

import createEmotionCache from '@/utils/createEmotionCache';
import { lightTheme } from '@/styles/theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { GlobalStore } from '@/context/GlobalStore';

const clientSideEmotionCache = createEmotionCache();

type MyAppProps = AppProps & {
  emotionCache: EmotionCache;
};

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <GlobalStore>
          <CssBaseline />
          <Component {...pageProps} />
        </GlobalStore>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
