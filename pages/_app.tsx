import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Head from 'next/head'
import { theme } from '../theme'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '../utils/createEmotionCache'
import { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apollo/client'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

function MyApp(props: MyAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props

  const apolloClient = useApollo(pageProps)

  // hydration error fix
  const [mount, setMount] = useState(false)
  useEffect(() => {
    setMount(true)
  }, [])
  if (!mount) return <Loader />

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>signpod inc</title>
            <meta
              name='viewport'
              content='initial-scale=1, width=device-width'
            />
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </CacheProvider>
      </ApolloProvider>
    </>
  )
}

export default MyApp
