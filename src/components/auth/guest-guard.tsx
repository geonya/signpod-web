import type { FC, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { isAuthenticatedVar } from '../../lib/apollo/cache'
import { useReactiveVar } from '@apollo/client'

interface GuestGuardProps {
  children: ReactNode
}

export const GuestGuard: FC<GuestGuardProps> = ({ children }) => {
  const router = useRouter()
  const [checked, setChecked] = useState(false)
  const isAuthenticated = useReactiveVar(isAuthenticatedVar)
  useEffect(
    () => {
      if (!router.isReady) {
        return
      }
      // You should remove the "disableGuard" check, because it's meant to be used only in the demo.
      if (isAuthenticated) {
        router.push('/').catch(console.error)
      } else {
        setChecked(true)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady],
  )

  if (!checked) {
    return null
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // not authenticated / authorized.

  return <>{children}</>
}

GuestGuard.propTypes = {
  children: PropTypes.node,
}
