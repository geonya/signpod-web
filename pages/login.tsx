import { ArrowBack, Facebook, Google } from '@mui/icons-material'
import {
  Box,
  Button,
  Container,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import * as Yup from 'yup'
import Link from '../components/Link'
import { TEXT_SECONDARY } from '../constants'
import { isAuthenticatedVar } from '../lib/apollo/vars'
import { useLoginMutation } from '../lib/graphql/__generated__'

const Login: NextPage = () => {
  const router = useRouter()
  const [loginError, setLoginError] = useState('')
  const [login] = useLoginMutation({
    onCompleted(data) {
      if (data.login.ok) {
        isAuthenticatedVar(true)
        router.push({
          pathname: '/',
        })
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
          alignItems: 'center',
          flexGrow: 1,
          display: 'flex',
          minHeight: '100%',
        }}
      >
        <Container maxWidth='sm'>
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
                  disabled={formik.isSubmitting}
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
