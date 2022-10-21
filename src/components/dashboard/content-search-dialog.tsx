import { Close, Search } from '@mui/icons-material'
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import { FC, SyntheticEvent, useState } from 'react'
import { Tip } from './tip'
import * as Yup from 'yup'

interface ContentSearchDialogProps {
  onClose?: () => void
  open?: boolean
}
export const ContentSearchDialog: FC<ContentSearchDialogProps> = ({
  onClose,
  open,
  ...other
}) => {
  const formik = useFormik({
    initialValues: {
      keyword: '',
    },
    validationSchema: Yup.object({
      keyword: Yup.string().min(2, '최소 2자 이상 입력해주세요.'),
    }),
    onSubmit: (value) => {
      console.log(value)
    },
  })

  return (
    <Dialog fullWidth maxWidth='sm' onClose={onClose} open={!!open} {...other}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          px: 3,
          py: 2,
        }}
      >
        <Typography variant='h6'>검색</Typography>
        <IconButton color='inherit' onClick={onClose}>
          <Close fontSize='small' />
        </IconButton>
      </Box>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Tip message='검색할 키워드를 입력하고 엔터를 눌러주세요. ⌨️' />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Search />
                  </InputAdornment>
                ),
              }}
              margin='normal'
              name='keyword'
              type='text'
              label='Search'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.keyword}
              placeholder='Search...'
              sx={{ flex: 10, mr: 1 }}
            />
            <Button
              color='primary'
              type='submit'
              variant='contained'
              disabled={formik.isSubmitting}
              sx={{ flex: 1 }}
            >
              검색
            </Button>
          </Box>
          {formik.errors.keyword && (
            <Box sx={{ ml: 1 }}>
              <FormHelperText error>
                {formik.errors.keyword as string}
              </FormHelperText>
            </Box>
          )}
        </form>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 3,
          }}
        >
          <CircularProgress />
        </Box>
      </DialogContent>
    </Dialog>
  )
}
