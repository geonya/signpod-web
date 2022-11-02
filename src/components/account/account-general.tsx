import { gql, useReactiveVar } from '@apollo/client'
import { AccountCircle } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import { FC, useEffect, useState } from 'react'
import { userVar } from '../../lib/apollo/cache'
import * as Yup from 'yup'
import { useEditAccountMutation } from '../../lib/graphql/__generated__'
import toast from 'react-hot-toast'
import { TFile } from '../../types/file'
import { client } from '../../lib/apollo/client'
import { useRouter } from 'next/router'
import Image from 'next/image'

export const AccountGeneral: FC = (props) => {
  const router = useRouter()
  const user = useReactiveVar(userVar)
  const [editAccountMutation] = useEditAccountMutation({
    context: {
      headers: {
        'apollo-require-preflight': true,
      },
    },
    onCompleted(data) {
      if (data.editAccount.ok && user) {
        client.writeFragment({
          id: `User:${user.id}`,
          fragment: gql`
            fragment user on User {
              name
              avatar
              email
              company
            }
          `,
          data: {
            email: formik.values.email,
            name: formik.values.name,
            company: formik.values.company,
            avatar: preview || user.avatar || '',
          },
        })
      }
    },
  })
  const [file, setFile] = useState<TFile | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const handleFileUpload = (file: TFile | null) => {
    if (file) {
      setFile(file)
      setPreview(URL.createObjectURL(file))
    }
  }
  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      company: user?.company || '',
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required(),
      email: Yup.string().email().max(255).required(),
      company: Yup.string().max(255),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await editAccountMutation({
          variables: {
            input: {
              ...(values.name !== user?.name && { name: values.name }),
              ...(values.email !== user?.email && { email: values.email }),
              ...(values.company !== user?.company && {
                company: values.company,
              }),
            },
            file,
          },
        })
        toast.success('업로드 완료!')
      } catch (error: any) {
        console.error(error)
        toast.error('에러 발생!')
        helpers.setStatus({ success: false })
        helpers.setErrors({ submit: error.message })
        helpers.setSubmitting(false)
      }
    },
  })
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(preview as string)
    }
  }, [preview])
  return (
    <Box sx={{ mt: 4 }} {...props}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant='h6'>기본 정보</Typography>
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
              component='form'
              onSubmit={formik.handleSubmit}
            >
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <Avatar
                  src={preview || user?.avatar || ''}
                  sx={{
                    height: 64,
                    mr: 2,
                    width: 64,
                    bgcolor: 'transparent',
                  }}
                  component='a'
                  href={user?.avatar || preview || ''}
                  target='__blank'
                >
                  <AccountCircle fontSize='large' color='action' />
                </Avatar>
                <Button component='label'>
                  사진 업로드
                  <input
                    hidden
                    accept='image/*'
                    type='file'
                    onChange={(event) =>
                      handleFileUpload(
                        event.currentTarget.files
                          ? event.currentTarget.files[0]
                          : null,
                      )
                    }
                  />
                </Button>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  mt: 3,
                  alignItems: 'center',
                }}
              >
                <TextField
                  name='name'
                  label='이름'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  error={Boolean(formik.touched.name && formik.errors.name)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  required
                  size='medium'
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  mt: 3,
                  alignItems: 'center',
                }}
              >
                <TextField
                  name='email'
                  label='이메일'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  required
                  size='medium'
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  my: 3,
                  alignItems: 'center',
                }}
              >
                <TextField
                  name='company'
                  label='회사'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.company}
                  error={Boolean(
                    formik.touched.company && formik.errors.company,
                  )}
                  fullWidth
                  helperText={formik.touched.company && formik.errors.company}
                  size='medium'
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                  }}
                />
              </Box>
              <Button color='info' variant='outlined' type='submit'>
                프로필 변경
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant='h6'>계정 삭제</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Typography sx={{ mb: 3 }} variant='body2'>
                한 번 삭제하면 복구가 불가능합니다.
              </Typography>
              <Button color='error' variant='outlined'>
                계정 삭제
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}
