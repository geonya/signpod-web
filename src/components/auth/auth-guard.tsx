import type { FC, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { SplashScreen } from '../splash-screen'
import { isAuthenticatedVar } from '../../lib/apollo/cache'

interface AuthGuardProps {
  children: ReactNode
}

export const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(
    () => {
      if (!router.isReady) {
        return
      }
      if (!isAuthenticatedVar()) {
        router
          .push({
            pathname: '/login',
            query: { returnUrl: router.asPath },
          })
          .catch(console.error)
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

  return <>{children}</>
}

AuthGuard.propTypes = {
  children: PropTypes.node,
}
