import { Box, Container, Grid, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { DashboardLayout } from '../components/dashboard/dashboard-layout'
import { gtm } from '../lib/gtm'

const Home: NextPage = () => {
  // useEffect(() => {
  //   gtm.push({ event: 'page-view' })
  // }, [])
  return (
    <>
      <Head>
        <title>Main | signpod</title>
      </Head>
      <Box>Main</Box>
    </>
  )
}

Home.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Home
