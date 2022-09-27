import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
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

const AccountDetails = ({ name, email }: AccountProfileProps) => {
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
      console.log(data)
    },
  })

  return (
    <form autoComplete='off' noValidate>
      <Card>
        <CardHeader title='나의 정보' subheader='Edit Profile' />
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
        <Box sx={{ ...displayFlex, justifyContent: 'flex-end', p: 2 }}>
          <Button color={PRIMARY} variant={CONTAINED}>
            변경하기
          </Button>
        </Box>
      </Card>
    </form>
  )
}
export default AccountDetails
