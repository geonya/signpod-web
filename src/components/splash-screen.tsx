import type { FC } from 'react'
import { Box, CircularProgress } from '@mui/material'
import { Logo } from './logo'
import { keyframes } from '@emotion/react'

const bounce1 = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 1px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`

const bounce3 = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 3px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`

export const SplashScreen: FC = () => (
  <Box
    sx={{
      position: 'fixed',
      left: 0,
      top: 0,
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'neutral.800',
      opacity: 0.9,
      p: 3,
      zIndex: 2000,
    }}
  >
    {/* <Logo
      sx={{
        height: 80,
        width: 80,
        '& path:nth-child(1)': {
          animation: `${bounce1} 1s ease-in-out infinite`,
        },
        '& path:nth-child(3)': {
          animation: `${bounce3} 1s ease-in-out infinite`,
        },
      }}
    /> */}
    <CircularProgress size={77} disableShrink />
  </Box>
)
