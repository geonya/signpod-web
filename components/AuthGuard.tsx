import { useReactiveVar } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { isAuthenticatedVar } from '../lib/apollo/vars'
import Loader from './Loader'

interface AuthGuardProps {
  children: React.ReactNode
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter()
  const ignore = useRef(false)
  const isAuthenticated = useReactiveVar(isAuthenticatedVar)
  const [checked, setChecked] = useState(false)
  useEffect(() => {
    if (!router.isReady) return
    if (ignore.current) return
    ignore.current = true
    if (!isAuthenticated) {
      console.error('Not Authenticated!, Redirecting...')
      router
        .replace({
          pathname: '/login',
          query: router.asPath !== '/' ? { continueUrl: router.asPath } : {},
        })
        .catch(console.error)
    } else {
      setChecked(true)
    }
  }, [router, isAuthenticated])
  if (router.asPath.includes('login')) {
    router.replace({
      pathname: '/',
      query: router.asPath === '/' ? { continueUrl: router.asPath } : {},
    })
  }
  if (!checked) {
    return <Loader />
  }
  return <>{children}</>
}
export default AuthGuard
