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
import { FileDropzone } from '../file-dropzone'
import { categoryOptions } from './work-category-options'
import { useCreateWorkMutation } from '../../lib/graphql/__generated__'
import { TFile } from '../../types/file'

export interface DroppedFile {
  file: TFile
  url?: string
  alt?: string
}

export const CreateWorkForm: FC = (props) => {
  const router = useRouter()

  const [droppedFiles, setDroppedFiles] = useState<DroppedFile[]>([])
  const [createWorkMutation] = useCreateWorkMutation({
    context: {
      headers: {
        'apollo-require-preflight': true,
      },
    },
    onCompleted: () => {
      router.push('/works').catch(console.error)
    },
  })
  const formik = useFormik({
    initialValues: {
      category: '',
      description: '',
      title: '',
      submit: null,
    },
    validationSchema: Yup.object({
      title: Yup.string().max(255).required(),
      category: Yup.string().required(),
      description: Yup.string().required(),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      const files: TFile[] = droppedFiles.map((droppedFile) => droppedFile.file)
      try {
        await createWorkMutation({
          variables: {
            input: {
              title: values.title,
              description: values.description,
              category: values.category,
            },
            files,
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

  const handleDrop = (newFiles: TFile[]): void => {
    const newDroppedFiles: DroppedFile[] = newFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }))
    setDroppedFiles((prevFiles) => [...prevFiles, ...newDroppedFiles])
  }

  const handleRemove = (droppedFile: DroppedFile): void => {
    setDroppedFiles((prevFiles) =>
      prevFiles.filter((prevDroppedFile) => {
        URL.revokeObjectURL(prevDroppedFile.url as string)
        return prevDroppedFile.file.path !== droppedFile.file.path
      }),
    )
  }

  const handleRemoveAll = (): void => {
    droppedFiles.map((droppedFile) =>
      URL.revokeObjectURL(droppedFile.url as string),
    )
    setDroppedFiles([])
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
                error={Boolean(formik.touched.title && formik.errors.title)}
                fullWidth
                helperText={formik.touched.title && formik.errors.title}
                label='제목'
                name='title'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.title}
                sx={{ mb: 3 }}
              />
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
                files={droppedFiles}
                onDrop={handleDrop}
                onRemove={handleRemove}
                onRemoveAll={handleRemoveAll}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 3 }}></Card>
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
