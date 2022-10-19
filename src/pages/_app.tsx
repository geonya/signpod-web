import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Head from 'next/head'
import { theme } from '../theme'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '../utils/createEmotionCache'
import { FC, useEffect, useState } from 'react'
import { gtm } from '../lib/gtm'
import { gtmConfig } from '../config'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '../store'
import { Toaster } from 'react-hot-toast'
import type { NextPage } from 'next'
import { AuthConsumer } from '../contexts/jwt-context'
import { SplashScreen } from '../components/splash-screen'
import Router from 'next/router'
import nProgress from 'nprogress'

type MyAppProps = AppProps & {
  Component: NextPage
  emotionCache?: EmotionCache
}

Router.events.on('routeChangeStart', nProgress.start)
Router.events.on('routeChangeError', nProgress.done)
Router.events.on('routeChangeComplete', nProgress.done)

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()
const MyApp: FC<MyAppProps> = (props) => {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props

  const getLayout = Component.getLayout ?? ((page) => page)

  useEffect(() => {
    gtm.initialize(gtmConfig)
  }, [])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>signpod inc</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
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
      </ReduxProvider>
    </CacheProvider>
  )
}

export default MyApp
