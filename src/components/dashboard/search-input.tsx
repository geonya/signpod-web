import { Search } from '@mui/icons-material'
import { alpha, InputBase, styled } from '@mui/material'
import { useFormik } from 'formik'
import { type FC } from 'react'
import * as Yup from 'yup'

const SearchBox = styled('form')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'primary',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

export const SearchInput: FC = () => {
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
    <SearchBox onSubmit={formik.handleSubmit}>
      <SearchIconWrapper>
        <Search color='primary' />
      </SearchIconWrapper>
      <StyledInputBase
        type='text'
        name='keyword'
        placeholder='Search…'
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.keyword}
      />
    </SearchBox>
  )
}
