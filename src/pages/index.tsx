import { Box, Container, Grid, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { DashboardLayout } from '../components/dashboard/dashboard-layout'
import { GridList1 } from '../components/gallery/gird-list-1'
import { useAuth } from '../hooks/use-auth'
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
      <Container disableGutters>
        <GridList1 />
      </Container>
    </>
  )
}

Home.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Home
