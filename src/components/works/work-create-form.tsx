import type { FC } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import {
  Box,
  Button,
  Card,
  CardContent,
  FormHelperText,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import { QuillEditor } from '../quill-editor'
import { File, FileDropzone } from '../file-dropzone'

const categoryOptions = [
  {
    label: 'Healthcare',
    value: 'healthcare',
  },
  {
    label: 'Makeup',
    value: 'makeup',
  },
  {
    label: 'Dress',
    value: 'dress',
  },
  {
    label: 'Skincare',
    value: 'skincare',
  },
  {
    label: 'Jewelry',
    value: 'jewelry',
  },
  {
    label: 'Blouse',
    value: 'blouse',
  },
]

export const CreateWorkForm: FC = (props) => {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const formik = useFormik({
    initialValues: {
      category: '',
      description: '',
      images: [],
      name: '',
      submit: null,
    },
    validationSchema: Yup.object({
      category: Yup.string().max(255),
      description: Yup.string().required(),
      images: Yup.array(),
      name: Yup.string().max(255).required(),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        // NOTE: Make API request
        toast.success('업로드 완료!')
        router.push('/works').catch(console.error)
      } catch (error: any) {
        console.error(error)
        toast.error('Something went wrong!')
        helpers.setStatus({ success: false })
        helpers.setErrors({ submit: error.message })
        helpers.setSubmitting(false)
      }
    },
  })

  const handleDrop = (newFiles: File[]): void => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles])
  }

  const handleRemove = (file: File): void => {
    setFiles((prevFiles) =>
      prevFiles.filter((_file) => _file.path !== file.path),
    )
  }

  const handleRemoveAll = (): void => {
    setFiles([])
  }

  return (
    <form onSubmit={formik.handleSubmit} {...props}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={2} xs={12}>
              <Typography variant='h6'>기본 정보</Typography>
            </Grid>
            <Grid item md={10} xs={12}>
              <TextField
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label='제목'
                name='name'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              <Typography
                color='textSecondary'
                sx={{
                  mb: 2,
                  mt: 3,
                }}
                variant='subtitle2'
              >
                설명
              </Typography>
              <QuillEditor
                onChange={(value: string): void => {
                  formik.setFieldValue('description', value)
                }}
                placeholder='내용을 작성해주세요...'
                sx={{ height: 400 }}
                value={formik.values.description}
              />
              {Boolean(
                formik.touched.description && formik.errors.description,
              ) && (
                <Box sx={{ mt: 2 }}>
                  <FormHelperText error>
                    {formik.errors.description}
                  </FormHelperText>
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={2} xs={12}>
              <Typography variant='h6'>사진</Typography>
              <Typography color='textSecondary' variant='body2' sx={{ mt: 1 }}>
                사진 파일을 업로드해주세요.
              </Typography>
            </Grid>
            <Grid item md={10} xs={12}>
              <FileDropzone
                accept={{
                  'image/*': [],
                }}
                files={files}
                onDrop={handleDrop}
                onRemove={handleRemove}
                onRemoveAll={handleRemoveAll}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant='h6'>업종</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <TextField
                error={Boolean(
                  formik.touched.category && formik.errors.category,
                )}
                fullWidth
                label='업종'
                name='category'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                select
                value={formik.values.category}
              >
                {categoryOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          mx: -1,
          mb: -1,
          mt: 3,
        }}
      >
        <Button
          color='error'
          sx={{
            m: 1,
            mr: 'auto',
          }}
        >
          삭제
        </Button>
        <Button sx={{ m: 1 }} variant='outlined'>
          취소
        </Button>
        <Button sx={{ m: 1 }} type='submit' variant='contained'>
          업로드
        </Button>
      </Box>
    </form>
  )
}
