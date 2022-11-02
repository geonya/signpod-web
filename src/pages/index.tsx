import { useReactiveVar } from '@apollo/client'
import { Stack } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { DashboardLayout } from '../components/dashboard/dashboard-layout'
import { HomeHero } from '../components/home/home-hero'
import { MainCarousel } from '../components/home/main-carousel'
import { userVar } from '../lib/apollo/cache'
import { useMeQuery } from '../lib/graphql/__generated__'

const Home: NextPage = () => {
  const { data, refetch } = useMeQuery()
  const router = useRouter()
  const user = useReactiveVar(userVar)
  useEffect(
    () => {
      if (!router.isReady) {
        return
      }
      refetch()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady],
  )
  return (
    <>
      <Head>
        <title>Main | signpod</title>
      </Head>
      <Stack
        component='main'
        sx={{
          flexGrow: 1,
          py: 5,
        }}
        spacing={5}
      >
        <HomeHero />
        <MainCarousel />
      </Stack>
    </>
  )
}

Home.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Home
