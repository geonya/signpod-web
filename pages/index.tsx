import { Button } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>SignPod | Branding Signage Design</title>
      </Head>
      <div>
        <Button variant='contained'>Hello World</Button>
      </div>
    </>
  )
}

export default Home
