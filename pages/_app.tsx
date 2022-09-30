import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Head from 'next/head'
import { theme } from '../theme'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '../utils/createEmotionCache'
import { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import { ApolloProvider } from '@apollo/client'
import { GetServerSideProps } from 'next'
import { AuthProvider } from '../lib/auth'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  }
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

function MyApp(props: MyAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props
  // hydration error fix
  const [mount, setMount] = useState(false)
  useEffect(() => {
    setMount(true)
  }, [])

  if (!mount) return <Loader />
  return (
    <AuthProvider>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>signpod inc</title>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </AuthProvider>
  )
}

export default MyApp
