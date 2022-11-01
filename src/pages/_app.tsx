import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Head from 'next/head'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '../utils/createEmotionCache'

import { Toaster } from 'react-hot-toast'
import type { NextPage } from 'next'

import Router from 'next/router'
import nProgress from 'nprogress'
import { ApolloProvider } from '@apollo/client'
import { client } from '../lib/apollo/client'
import { createMyTheme } from '../theme'
import { AuthProvider } from '../components/auth/auth-provider'

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
        <ThemeProvider theme={createMyTheme({ mode: 'light' })}>
          <CssBaseline />
          <Toaster position='top-center' />
          <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
        </ThemeProvider>
      </ApolloProvider>
    </CacheProvider>
  )
}

export default MyApp
