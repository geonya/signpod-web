import type { FC, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useReactiveVar } from '@apollo/client'
import { isAuthenticatedVar } from '../../lib/apollo/cache'
import { SplashScreen } from '../splash-screen'

interface AuthGuardProps {
  children: ReactNode
}

export const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const router = useRouter()
  const [checked, setChecked] = useState(false)
  const isAuthenticated = useReactiveVar(isAuthenticatedVar)
  useEffect(
    () => {
      if (!router.isReady) {
        return
      }
      // You should remove the "disableGuard" check, because it's meant to be used only in the demo.
      if (!isAuthenticated) {
        router.push('/login').catch(console.error)
      } else {
        setChecked(true)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady],
  )

  if (!checked) {
    return <SplashScreen />
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // not authenticated / authorized.

  return <>{children}</>
}

AuthGuard.propTypes = {
  children: PropTypes.node,
}
