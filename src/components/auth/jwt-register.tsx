import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { type FC } from 'react'
import { useCreateAccountMutation } from '../../lib/graphql/__generated__'
import * as Yup from 'yup'
import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import { useMounted } from '../../hooks/use-mounted'

export const JwtRegister: FC = () => {
  const isMounted = useMounted()
  const router = useRouter()
  const [createAccount, { loading }] = useCreateAccountMutation({
    onCompleted: (result) => {
      if (result.createAccount.ok) {
        if (isMounted()) {
          const returnUrl =
            (router.query.returnUrl as string | undefined) || '/'
          router.push(returnUrl).catch(console.error)
        }
      } else if (result.createAccount.error) {
        if (isMounted()) {
          formik.setStatus({ success: false })
          formik.setErrors({ submit: result.createAccount.error })
          formik.setSubmitting(false)
        }
      }
    },
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      policy: false,
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[a-zA-Z0-9]{2,10}$/g, '영문이나 숫자만 사용해주세요.')
        .max(10, '10자 이하만 가능합니다.')
        .min(2, '2자 이상 입력해주세요')
        .required('이름을 입력해주세요'),
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
    onSubmit: async ({ name, password, email }, helpers) => {
      try {
        await createAccount({
          variables: {
            input: {
              name,
              password,
              email,
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
      <TextField
        error={Boolean(formik.touched.name && formik.errors.name)}
        fullWidth
        helperText={formik.touched.name && formik.errors.name}
        label='이름'
        margin='normal'
        name='name'
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      <TextField
        error={Boolean(formik.touched.email && formik.errors.email)}
        fullWidth
        helperText={formik.touched.email && formik.errors.email}
        label='이메일 주소'
        margin='normal'
        name='email'
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <TextField
        type='password'
        error={Boolean(formik.touched.password && formik.errors.password)}
        fullWidth
        helperText={formik.touched.password && formik.errors.password}
        label='비밀번호'
        margin='normal'
        name='password'
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.password}
      />

      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          ml: -1,
          mt: 2,
        }}
      >
        <Checkbox
          checked={formik.values.policy}
          name='policy'
          onChange={formik.handleChange}
        />
        <Typography color='textSecondary' variant='body2'>
          I have read the{' '}
          <Link component='a' href='#'>
            Terms and Conditions
          </Link>
        </Typography>
      </Box>
      {Boolean(formik.touched.policy && formik.errors.policy) && (
        <FormHelperText error>{formik.errors.policy}</FormHelperText>
      )}
      {formik.errors.submit && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>
            {formik.errors.submit as string}
          </FormHelperText>
        </Box>
      )}
      <Box sx={{ mt: 2 }}>
        <Button
          disabled={formik.isSubmitting || loading}
          fullWidth
          size='large'
          type='submit'
          variant='contained'
        >
          가입하기
        </Button>
      </Box>
    </form>
  )
}
