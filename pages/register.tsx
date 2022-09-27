import { ArrowBack } from '@mui/icons-material'
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
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
import {
  CONTAINED,
  displayFlex,
  LARGE,
  NORMAL,
  OUTLINED,
  PRIMARY,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
} from '../constants'
import { useCreateAccountMutation } from '../lib/graphql/__generated__'

const Register: NextPage = () => {
  const router = useRouter()
  const [registerError, setRegisterError] = useState('')
  const [createAccount] = useCreateAccountMutation({
    onCompleted: (result) => {
      if (result.createAccount.ok) {
        router.push({
          pathname: '/login',
          query: {
            email: formik.values.email,
          },
        })
      } else if (result.createAccount.error) {
        setRegisterError(result.createAccount.error)
      }
    },
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      policy: false,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[a-zA-Z0-9]{2,10}$/g, '영문이나 숫자만 사용해주세요.')
        .max(10, '10자 이하만 가능합니다.')
        .min(2, '2자 이상 입력해주세요')
        .required('이메일을 입력해주세요'),
      email: Yup.string()
        .email('이메일 형식이 올바르지 않습니다.')
        .max(255)
        .required('이메일을 입력해주세요'),
      password: Yup.string()
        .min(4, '비밀번호는 4자 이상 입력해주세요')
        .max(16)
        .required('비밀번호를 입력해주세요'),
      policy: Yup.boolean().oneOf([true], '개인정보보호정책에 동의해주세요.'),
    }),
    onSubmit: async ({ name, password, email }) => {
      await createAccount({
        variables: {
          input: {
            name,
            password,
            email,
          },
        },
      })
    },
  })
  return (
    <>
      <Head>
        <title>회원가입 | signpod</title>
      </Head>
      <Box
        component='main'
        sx={{
          ...displayFlex,
          alignItems: 'center',
          flexGrow: 1,
          minHeight: '100%',
        }}
      >
        <Container maxWidth='sm'>
          <Link href='/'>
            <Button startIcon={<ArrowBack fontSize='small' />}>메인으로</Button>
          </Link>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color={TEXT_PRIMARY} variant='h4'>
                회원 가입
              </Typography>
              <Typography color={TEXT_SECONDARY} gutterBottom variant='body2'>
                Use your email to create a new account
              </Typography>
              {Boolean(registerError) && (
                <FormHelperText error>{registerError}</FormHelperText>
              )}
            </Box>
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label='이름'
              margin={NORMAL}
              name='name'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              variant={OUTLINED}
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label='이메일 주소'
              margin={NORMAL}
              name='email'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              variant={OUTLINED}
            />
            <TextField
              type='password'
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label='비밀번호'
              margin={NORMAL}
              name='password'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              variant={OUTLINED}
            />
            <Box sx={{ ...displayFlex, alignItems: 'center' }}>
              <Checkbox
                checked={formik.values.policy}
                name='policy'
                onChange={formik.handleChange}
              />
              <Typography color={TEXT_SECONDARY} variant='body2'>
                동의합니다. <Link href='#'>Terms and Conditions</Link>
              </Typography>
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>{formik.errors.policy}</FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color={PRIMARY}
                disabled={formik.isSubmitting}
                fullWidth
                size={LARGE}
                type='submit'
                variant={CONTAINED}
              >
                가입 하기
              </Button>
            </Box>
            <Typography color={TEXT_SECONDARY} variant='body2'>
              이미 회원이신가요?{' '}
              <Link
                href='/login'
                variant='subtitle2'
                underline='hover'
                sx={{
                  cursor: 'pointer',
                }}
              >
                로그인 하기
              </Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  )
}

export default Register
