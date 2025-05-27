import { AppProps } from 'next/app';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '@/lib/theme';

// Client-side cache, shared for the whole session of the user in the browser
const clientSideEmotionCache = createCache({ key: 'css' });

export default function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }: AppProps & { emotionCache?: any }) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
} 