import { ArrowBack, Facebook, Google } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormHelperText,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import * as Yup from 'yup'
import { TEXT_SECONDARY } from '../constants'
import { useAuth } from '../hooks/use-auth'
import { useLoginMutation } from '../lib/graphql/__generated__'
import NextLink from 'next/link'
import { Logo } from '../components/logo'
import { JwtLogin } from '../components/authentication/jwt-login'

const Login: NextPage = () => {
  const auth = useAuth()
  const router = useRouter()
  const { disableGuard } = router.query
  const [loginError, setLoginError] = useState('')

  const [login, { loading }] = useLoginMutation({
    onCompleted(data) {
      if (data.login.ok && data.login.token && auth) {
        auth.loginFn(data.login.token)
        router.push('/')
      } else if (data.login.error) {
        setLoginError(data.login.error)
      }
    },
  })

  const formik = useFormik({
    initialValues: {
      email: (router.query.email as string) || '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('이메일 형식이 올바르지 않습니다.')
        .max(255)
        .required('이메일을 입력해주세요'),
      password: Yup.string().max(255).required('비밀번호를 입력해주세요'),
    }),
    onSubmit: async (data) => {
      login({ variables: { input: { ...data } } })
    },
  })
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
              xs: '60px',
              md: '120px',
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
              mb: 4,
              p: 2,
              '& > img': {
                height: 32,
                width: 'auto',
                flexGrow: 0,
                flexShrink: 0,
              },
            }}
          >
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
                <Typography variant='h4'>Log in</Typography>
                <Typography
                  color='textSecondary'
                  sx={{ mt: 2 }}
                  variant='body2'
                >
                  Sign in on signpod
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
                <NextLink
                  href={
                    disableGuard
                      ? `/authentication/register?disableGuard=${disableGuard}`
                      : '/authentication/register'
                  }
                  passHref
                >
                  <Link color='textSecondary' variant='body2'>
                    Create new account
                  </Link>
                </NextLink>
              </div>
            </Card>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color='textPrimary' variant='h4'>
                로그인
              </Typography>
              <Typography color='textSecondary' gutterBottom variant='body2'>
                이메일 / 소셜 로그인
              </Typography>
              {Boolean(loginError) && (
                <FormHelperText error>{loginError}</FormHelperText>
              )}
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Button
                  color='info'
                  fullWidth
                  startIcon={<Facebook />}
                  onClick={() => formik.handleSubmit()}
                  size='large'
                >
                  FaceBook Login
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  color='info'
                  fullWidth
                  onClick={() => formik.handleSubmit()}
                  size='large'
                  startIcon={<Google />}
                  variant='contained'
                >
                  Google Login
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            >
              <Typography align='center' color='textSecondary' variant='body1'>
                또는 이메일로 로그인
              </Typography>

              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label='Email Address'
                margin='normal'
                name='email'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type='email'
                value={formik.values.email}
                variant='outlined'
              />
              <TextField
                error={Boolean(
                  formik.touched.password && formik.errors.password,
                )}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label='Password'
                margin='normal'
                name='password'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type='password'
                value={formik.values.password}
                variant='outlined'
              />
              <Box sx={{ py: 2 }}>
                <Button
                  color='primary'
                  disabled={formik.isSubmitting || loading}
                  fullWidth
                  size='large'
                  type='submit'
                  variant='contained'
                >
                  로그인 하기
                </Button>
              </Box>
            </Box>
            <Typography color={TEXT_SECONDARY} variant='body2'>
              아이디가 없으신가요?{' '}
              <Link
                href='/register'
                variant='subtitle2'
                underline='hover'
                sx={{
                  cursor: 'pointer',
                }}
              >
                회원가입 하기
              </Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  )
}

export default Login
