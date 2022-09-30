import { ApolloProvider } from '@apollo/client'
import { createContext, useEffect, useState } from 'react'
import { JWT_TOKEN } from '../constants'
import { initializeApollo } from './apollo/client'
import * as jwt from 'jsonwebtoken'
import { useRouter } from 'next/router'

interface AuthProviderProps {
  children: React.ReactNode
}

const authContext = createContext({})

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useProvideAuth()
  const router = useRouter()
  const isAuthenticated = auth.isLoggedIn()
  useEffect(() => {
    if (isAuthenticated) {
      if (
        router.pathname.includes('login') ||
        router.pathname.includes('register')
      ) {
        router.replace({ pathname: '/' })
        return
      }
    } else {
      if (
        !router.pathname.includes('login') &&
        !router.pathname.includes('register')
      ) {
        router.replace({ pathname: '/login' })
      }
    }
  }, [isAuthenticated, router])
  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.craeteApolloClient()}>
        {children}
      </ApolloProvider>
    </authContext.Provider>
  )
}

function useProvideAuth() {
  const [token, setToken] = useState<string | null>(null)

  const isLoggedIn = () => {
    if (!token) return false
    try {
      const decoded = jwt.verify(token, process.env.PRIVATE_KEY!)
      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const getToken = () => {
    if (!token) return null
    return { [JWT_TOKEN]: token || '' }
  }

  const craeteApolloClient = () => {
    return initializeApollo(getToken())
  }

  const loginFn = (token: string) => {
    setToken(token)
    localStorage.setItem(JWT_TOKEN, token)
  }

  const logoutFn = () => {
    setToken(null)
    localStorage.removeItem(JWT_TOKEN)
  }

  return {
    craeteApolloClient,
    isLoggedIn,
    loginFn,
    logoutFn,
  }
}