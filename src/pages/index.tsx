import { useReactiveVar } from '@apollo/client'
import { Box } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import { DashboardLayout } from '../components/dashboard/dashboard-layout'
import { isAuthenticatedVar, userVar } from '../lib/apollo/cache'

const Home: NextPage = () => {
  // useEffect(() => {
  //   gtm.push({ event: 'page-view' })
  // }, [])
  return (
    <>
      <Head>
        <title>Main | signpod</title>
      </Head>
      <Box>
        {useReactiveVar(isAuthenticatedVar)
          ? 'Your Are Logged In!'
          : 'GUEST PAGE'}
      </Box>
    </>
  )
}

Home.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Home
