import { Box } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'

import { DashboardLayout } from '../components/dashboard/dashboard-layout'

const Home: NextPage = () => {
  // useEffect(() => {
  //   gtm.push({ event: 'page-view' })
  // }, [])
  return (
    <>
      <Head>
        <title>Main | signpod</title>
      </Head>
      <Box></Box>
    </>
  )
}

Home.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Home
