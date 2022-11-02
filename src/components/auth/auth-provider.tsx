import type { FC, ReactNode } from 'react'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { getCookieToken } from '../../utils/get-cookie-token'
import { ACCESS_TOKEN } from '../../constants'
import { useMeLazyQuery } from '../../lib/graphql/__generated__'
import {
  isAuthenticatedVar,
  isInitializedVar,
  userVar,
} from '../../lib/apollo/cache'
import { SplashScreen } from '../splash-screen'
import { useReactiveVar } from '@apollo/client'

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [getMe, { data }] = useMeLazyQuery()
  const isInitialized = useReactiveVar(isInitializedVar)

  useEffect(() => {
    const initialize = async (): Promise<void> => {
      console.log('initializing...')
      try {
        const accessToken = getCookieToken(ACCESS_TOKEN)
        await getMe()
        const user = data?.me.user
        if (accessToken && user) {
          isInitializedVar(true)
          isAuthenticatedVar(true)
          userVar(user)
        } else {
          isInitializedVar(true)
          isAuthenticatedVar(false)
          userVar(null)
        }
      } catch (err) {
        console.error(err)
        isInitializedVar(false)
        isAuthenticatedVar(false)
        userVar(null)
      }
    }

    initialize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return <>{isInitialized ? children : <SplashScreen />}</>
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
