import type { AppContext, AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Head from 'next/head'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '../utils/createEmotionCache'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '../store'
import { Toaster } from 'react-hot-toast'
import type { NextPage } from 'next'
import { AuthConsumer, AuthProvider } from '../contexts/jwt-context'
import { SplashScreen } from '../components/splash-screen'
import Router from 'next/router'
import nProgress from 'nprogress'
import { ApolloProvider } from '@apollo/client'
import { client } from '../lib/apollo/client'
import { createMyTheme } from '../theme'
import { useEffect } from 'react'

interface MyAppProps extends AppProps {
  Component: NextPage
  emotionCache?: EmotionCache
}

Router.events.on('routeChangeStart', nProgress.start)
Router.events.on('routeChangeError', nProgress.done)
Router.events.on('routeChangeComplete', nProgress.done)

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()
const MyApp = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page)
  // useEffect(() => {
  //   gtm.initialize(gtmConfig)
  // }, [])

  return (
    <CacheProvider value={emotionCache}>
      <ApolloProvider client={client}>
        <Head>
          <title>signpod inc</title>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>
        <ReduxProvider store={store}>
          <AuthProvider>
            <ThemeProvider theme={createMyTheme({ mode: 'light' })}>
              <CssBaseline />
              <Toaster position='top-center' />
              <AuthConsumer>
                {(auth) =>
                  !auth.isInitialized ? (
                    <SplashScreen />
                  ) : (
                    getLayout(<Component {...pageProps} />)
                  )
                }
              </AuthConsumer>
            </ThemeProvider>
          </AuthProvider>
        </ReduxProvider>
      </ApolloProvider>
    </CacheProvider>
  )
}

export default MyApp
