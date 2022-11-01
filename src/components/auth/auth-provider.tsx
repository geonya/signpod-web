import { useReactiveVar } from '@apollo/client'
import { useRouter } from 'next/router'
import { type ReactNode, FC, useEffect } from 'react'
import { ACCESS_TOKEN } from '../../constants'
import {
  isAuthenticatedVar,
  isInitializedVar,
  tokenVar,
  userVar,
} from '../../lib/apollo/cache'
import { useMeLazyQuery, useMeQuery } from '../../lib/graphql/__generated__'
import { getCookieToken } from '../../utils/get-cookie-token'
import { SplashScreen } from '../splash-screen'

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { data } = useMeQuery()

  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    const initialize = async (): Promise<void> => {
      try {
        console.log('페이지 초기화')
        const token = getCookieToken(ACCESS_TOKEN)
        tokenVar(token)
        const user = data?.me.user
        if (user) {
          userVar(user)
          isAuthenticatedVar(true)
          isInitializedVar(true)
        } else {
          isInitializedVar(true)
          isAuthenticatedVar(false)
          userVar(null)
        }
      } catch (error) {
        console.error(error)
        isInitializedVar(false)
        isAuthenticatedVar(false)
        userVar(null)
      }
    }
    initialize()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, router.isReady])

  return <>{useReactiveVar(isInitializedVar) ? children : <SplashScreen />}</>
}
