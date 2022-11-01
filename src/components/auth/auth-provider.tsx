import { useReactiveVar } from '@apollo/client'
import { type ReactNode, FC, useEffect } from 'react'
import { ACCESS_TOKEN } from '../../constants'
import {
  isAuthenticatedVar,
  isInitializedVar,
  tokenVar,
  userVar,
} from '../../lib/apollo/cache'
import {
  useMeLazyQuery,
  useRefreshTokenMutation,
} from '../../lib/graphql/__generated__'
import { getCookieToken } from '../../utils/get-cookie-token'
import { SplashScreen } from '../splash-screen'

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [getMe] = useMeLazyQuery()

  useEffect(() => {
    const initialize = async (): Promise<void> => {
      try {
        const { data } = await getMe()
        const user = data?.me.user
        const token = getCookieToken(ACCESS_TOKEN)
        tokenVar(token)
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
  }, [])

  return <>{useReactiveVar(isInitializedVar) ? children : <SplashScreen />}</>
}
