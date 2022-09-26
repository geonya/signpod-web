import '../styles/globals.css'
import '@aws-amplify/ui-react/styles.css'
import config from '../src/aws-exports'
import { Amplify } from 'aws-amplify'
Amplify.configure(config)

import { ThemeProvider } from '@aws-amplify/ui-react'

import type { AppProps } from 'next/app'
import { studioTheme } from '../src/ui-components'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={studioTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
