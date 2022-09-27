import { ArrowBack, Facebook, Google } from '@mui/icons-material'
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import * as Yup from 'yup'
import Link from '../components/Link'

const Login: NextPage = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('이메일 형식이 올바르지 않습니다.')
        .max(255)
        .required('이메일을 입력해주세요'),
      password: Yup.string().max(255).required('비밀번호를 입력해주세요'),
    }),
    onSubmit: () => {
      Router.push('/').catch(console.error)
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
          <Link href='/' passHref>
            <Button component='a' startIcon={<ArrowBack fontSize='small' />}>
              메인으로
            </Button>
          </Link>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color='textPrimary' variant='h4'>
                로그인
              </Typography>
              <Typography color='textSecondary' gutterBottom variant='body2'>
                이메일 / 소셜 로그인
              </Typography>
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
            <Typography color='textSecondary' variant='body2'>
              이미 회원이신가요?{' '}
              <Link
                href='/register'
                variant='subtitle2'
                underline='hover'
                sx={{
                  cursor: 'pointer',
                }}
              >
                회원가입
              </Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  )
}

export default Login
