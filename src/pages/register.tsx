import { Box, Card, Container, Divider, Link, Typography } from '@mui/material'
import { NextPage } from 'next'
import Head from 'next/head'
import { JwtRegister } from '../components/auth/jwt-register'
import NextLink from 'next/link'
import { Logo } from '../components/logo'
import { GuestGuard } from '../components/auth/guest-guard'

const Register: NextPage = () => {
  return (
    <>
      <Head>
        <title>회원가입 | signpod</title>
      </Head>
      <Box
        component='main'
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Container
          maxWidth='sm'
          sx={{
            py: {
              xs: '0px',
              md: '0px',
            },
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? 'neutral.900' : 'neutral.100',
              borderColor: 'divider',
              borderRadius: 1,
              borderStyle: 'solid',
              borderWidth: 1,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              mb: 2,
              p: 2,
            }}
          >
            <Typography color='textSecondary' variant='caption'>
              📝 사인팟 회원가입 페이지
            </Typography>
          </Box>
          <Card elevation={16} sx={{ p: 4 }}>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <NextLink href='/' passHref>
                <a>
                  <Logo
                    sx={{
                      height: 40,
                      width: 40,
                    }}
                  />
                </a>
              </NextLink>
              <Typography variant='h4'>회원가입</Typography>
              <Typography color='textSecondary' sx={{ mt: 2 }} variant='body2'>
                Register on signpod.app
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              <JwtRegister />
            </Box>
            <Divider sx={{ my: 3 }} />
            <div>
              <NextLink href={'/login'} passHref>
                <div>
                  <Typography color='textSecondary' variant='body2'>
                    회원가입 하셨나요?{' '}
                    <NextLink href={'/login'} passHref>
                      <Link>로그인</Link>
                    </NextLink>
                  </Typography>
                </div>
              </NextLink>
            </div>
          </Card>
        </Container>
      </Box>
    </>
  )
}
Register.getLayout = (page) => <GuestGuard>{page}</GuestGuard>

export default Register
