import { Container, Grid, Typography } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import AccountDetails from '../components/account/AccountDetails'
import AccountProfile from '../components/account/AccountProfile'
import { DashBoardLayout } from '../components/dashboard/DashboardLayout'
import Loader from '../components/Loader'
import { useMe } from '../hooks/useMe'

export default function Account() {
  const { data } = useMe()
  const router = useRouter()
  useEffect(() => {
    if (!data || !data.getMe.user) {
      router.push('/login')
    }
  }, [data, router])
  if (!data || !data.getMe.user) return <Loader />
  return (
    <>
      <Head>
        <title>Main | signpod</title>
      </Head>
      <DashBoardLayout>
        <Container maxWidth='lg'>
          <Typography sx={{ mb: 3 }} variant='h4'>
            내 계정
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile {...data.getMe.user} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountDetails {...data.getMe.user} />
            </Grid>
          </Grid>
        </Container>
      </DashBoardLayout>
    </>
  )
}
