import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { type FC } from 'react'
import { useAuth } from '../../hooks/use-auth'
import { useMounted } from '../../hooks/use-mounted'
import * as Yup from 'yup'
import { Facebook, Google } from '@mui/icons-material'
import { useLoginMutation } from '../../lib/graphql/__generated__'

export const JwtLogin: FC = () => {
  const isMounted = useMounted()
  const router = useRouter()
  const { login } = useAuth()
  const [loginMutation, { loading }] = useLoginMutation({
    onCompleted: (result) => {
      if (result.login.ok || result.login.token) {
        login(result.login.token)
        if (isMounted()) {
          const returnUrl =
            (router.query.returnUrl as string | undefined) || '/'
          router.push(returnUrl).catch(console.error)
        }
      } else if (result.login.error) {
        if (isMounted()) {
          formik.setStatus({ success: false })
          formik.setErrors({ submit: result.login.error })
          formik.setSubmitting(false)
        }
      }
    },
  })
  const formik = useFormik({
    initialValues: {
      email: (router.query.email as string) || '',
      password: '',
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('이메일 형식이 올바르지 않습니다.')
        .max(255)
        .required('이메일을 입력해주세요'),
      password: Yup.string().max(255).required('비밀번호를 입력해주세요'),
    }),
    onSubmit: async ({ email, password }, helpers): Promise<void> => {
      try {
        await loginMutation({
          variables: {
            input: {
              email,
              password,
            },
          },
        })
      } catch (error: any) {
        console.error(error)
        if (isMounted()) {
          helpers.setStatus({ success: false })
          helpers.setErrors({ submit: error.message })
          helpers.setSubmitting(false)
        }
      }
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
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
        />
        <TextField
          error={Boolean(formik.touched.password && formik.errors.password)}
          fullWidth
          helperText={formik.touched.password && formik.errors.password}
          label='Password'
          margin='normal'
          name='password'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type='password'
          value={formik.values.password}
        />
        {formik.errors.submit && (
          <Box sx={{ mt: 3 }}>
            <FormHelperText error>
              {formik.errors.submit as string}
            </FormHelperText>
          </Box>
        )}
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

      <Box sx={{ mt: 2 }}>
        <Alert severity='info'>
          <div>
            Test 이메일 : <b>test@test.com</b> 비밀번호 : <b>1234</b>
          </div>
        </Alert>
      </Box>
    </form>
  )
}
