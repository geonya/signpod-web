import { Button, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from '../components/Link'
import { TEXT_PRIMARY } from '../constants'
import { useMe } from '../hooks/useMe'

const Home: NextPage = () => {
  const { data, loading } = useMe()
  console.log(data)
  return (
    <>
      <Head>
        <title>SignPod | Branding Signage Design</title>
      </Head>
      <Typography color={TEXT_PRIMARY} variant='h4'>
        {data?.getMe.user?.name}
      </Typography>
    </>
  )
}

export default Home
