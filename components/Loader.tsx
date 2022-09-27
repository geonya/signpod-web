import styled from '@emotion/styled'
import { CircularProgress } from '@mui/material'

const LoaderWrapper = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1301,
  width: '100%',
  height: '100vh',
  display: 'grid',
  placeContent: 'center',
})

const Loader = () => {
  return (
    <LoaderWrapper>
      <CircularProgress />
    </LoaderWrapper>
  )
}

export default Loader
