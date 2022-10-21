import { Box, Card, Container, Divider, Link, Typography } from '@mui/material'
import { NextPage } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import { Logo } from '../components/logo'
import { JwtLogin } from '../components/auth/jwt-login'
import { GuestGuard } from '../components/auth/auth-guard'

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login | signpod</title>
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
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? 'neutral.900' : 'neutral.100',
              borderColor: 'divider',
              borderRadius: 1,
              borderStyle: 'solid',
              borderWidth: 1,
              mb: 2,
              p: 2,
            }}
          >
            <Typography color='textSecondary' variant='caption'>
              사인팟에 오신걸 환영해요 🎉 로그인하여 더 다양한 혜택을
              누려보세요!
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
              <Typography variant='h4'>로그인</Typography>
              <Typography color='textSecondary' sx={{ mt: 2 }} variant='body2'>
                Welcome signpod.app
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              <JwtLogin />
            </Box>
            <Divider sx={{ my: 3 }} />
            <div>
              <Typography color='textSecondary' variant='body2'>
                아이디가 없으신가요?{' '}
                <NextLink href={'/register'} passHref>
                  <Link>회원가입</Link>
                </NextLink>
              </Typography>
            </div>
          </Card>
        </Container>
      </Box>
    </>
  )
}

Login.getLayout = (page) => <GuestGuard>{page}</GuestGuard>

export default Login
