import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  TextField,
} from '@mui/material'
import { useFormik } from 'formik'
import {
  CONTAINED,
  displayFlex,
  NORMAL,
  OUTLINED,
  PRIMARY,
} from '../../constants'
import * as Yup from 'yup'

import { AccountProfileProps } from './account.interfaces'
import {
  useEditAccountMutation,
  useLogoutMutation,
} from '../../lib/graphql/__generated__'
import { useState } from 'react'
import { gql, useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'
import { isAuthenticatedVar } from '../../lib/apollo/vars'

const AccountDetails = ({ id, name, email }: AccountProfileProps) => {
  const client = useApolloClient()
  const router = useRouter()
  const [editError, setEditError] = useState('')
  const [editAccount, { loading }] = useEditAccountMutation({
    onCompleted(data) {
      if (data.editAccount.ok) {
        client.writeFragment({
          id: `User:${id}`,
          fragment: gql`
            fragment editedUser on User {
              name
              email
            }
          `,
          data: {
            email: formik.values.email,
            name: formik.values.name,
          },
        })
      } else if (data.editAccount.error) {
        setEditError(data.editAccount.error)
      }
    },
  })
  const formik = useFormik({
    initialValues: {
      name,
      email,
      password: '',
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
      password: Yup.string().min(4, '비밀번호는 4자 이상 입력해주세요').max(16),
    }),
    onSubmit: async (data) => {
      await editAccount({
        variables: {
          input: {
            id,
            ...(data.name && data.name !== name && { name: data.name }),
            ...(data.email && data.email !== email && { email: data.email }),
            ...(data.password && { password: data.password }),
          },
        },
      })
    },
  })

  const [logout, { loading: logoutLoading }] = useLogoutMutation({
    onCompleted(data) {
      if (data.logout.ok) {
        isAuthenticatedVar(false)
        router.push('/login')
        client.clearStore()
      } else if (data.logout.error) {
        setEditError(data.logout.error)
      }
    },
  })

  return (
    <form autoComplete='off' onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader title='나의 정보' subheader='Edit Profile' />
        {Boolean(editError) && (
          <FormHelperText error>{editError}</FormHelperText>
        )}
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
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
            </Grid>
            <Grid item md={6} xs={12}>
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
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                type='password'
                error={Boolean(
                  formik.touched.password && formik.errors.password,
                )}
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
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{ ...displayFlex, justifyContent: 'flex-end', p: 2 }}
          gap='1rem'
        >
          <Button
            type='submit'
            color={PRIMARY}
            variant={CONTAINED}
            disabled={formik.isSubmitting || loading}
          >
            변경하기
          </Button>
          <Button
            color='error'
            variant={CONTAINED}
            onClick={() => logout()}
            disabled={logoutLoading}
          >
            로그아웃
          </Button>
        </Box>
      </Card>
    </form>
  )
}
export default AccountDetails
