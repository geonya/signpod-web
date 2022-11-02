import { useEffect } from 'react'
import type { NextPage } from 'next'
import NextLink from 'next/link'
import Head from 'next/head'
import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { gtm } from '../lib/gtm'
import { DashboardLayout } from '../components/dashboard/dashboard-layout'

const NotFound: NextPage = () => {
  const theme = useTheme()
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      <Head>
        <title>404 Error | signpod</title>
      </Head>
      <Box
        component='main'
        sx={{
          alignItems: 'center',
          backgroundColor: 'background.paper',
          display: 'flex',
          flexGrow: 1,
          py: '80px',
        }}
      >
        <Container maxWidth='lg'>
          <Typography
            align='center'
            variant={mobileDevice ? 'h5' : 'h1'}
            mb={3}
          >
            404 Error
          </Typography>
          <Typography
            align='center'
            color='textSecondary'
            sx={{ mt: 0.5 }}
            variant='subtitle2'
          >
            현재 페이지가 공사 중이거나 존재하지 않는 것 같아요!
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 6,
            }}
          >
            <Box
              alt='Under development'
              component='img'
              src={`/static/error/error404_${theme.palette.mode}.svg`}
              sx={{
                height: 'auto',
                maxWidth: '100%',
                width: 400,
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 6,
            }}
          >
            <NextLink href='/' passHref>
              <Button component='a' variant='outlined'>
                메인 페이지로 이동하기
              </Button>
            </NextLink>
          </Box>
        </Container>
      </Box>
    </>
  )
}
NotFound.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default NotFound
