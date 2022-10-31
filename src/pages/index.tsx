import { Box } from '@mui/material'
import type { GetServerSideProps, NextPage } from 'next'
import cookies from 'next-cookies'
import Head from 'next/head'
import { useEffect } from 'react'

import { DashboardLayout } from '../components/dashboard/dashboard-layout'
import { ACCESS_TOKEN } from '../constants'
import { useAuth } from '../hooks/use-auth'
import { tokenVar } from '../lib/apollo/vars'

interface HomeProps {
  token?: string | null
}

const Home: NextPage<HomeProps> = ({ token }) => {
  // useEffect(() => {
  //   gtm.push({ event: 'page-view' })
  // }, [])

  const { isAuthenticated, user } = useAuth()
  console.log(user)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Head>
        <title>Main | signpod</title>
      </Head>
      <Box>{isAuthenticated ? 'Your Are Logged In!' : 'GUEST PAGE'}</Box>
    </>
  )
}

Home.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Home
