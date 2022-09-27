import { Box, Container, Grid, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import AccountDetails from '../components/account/AccountDetails'
import AccountProfile from '../components/account/AccountProfile'
import Loader from '../components/Loader'
import { useMe } from '../hooks/useMe'

const Home: NextPage = () => {
  const { data } = useMe()
  if (!data || !data.getMe.user) return <Loader />
  return (
    <>
      <Head>
        <title>SignPod | Branding Signage Design</title>
      </Head>
      <Box component='main' sx={{ flexGrow: 1, py: 8 }}>
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
      </Box>
    </>
  )
}

export default Home
