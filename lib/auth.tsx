import { ApolloProvider } from '@apollo/client'
import { createContext, useContext, useEffect, useState } from 'react'
import { JWT_TOKEN } from '../constants'
import { initializeApollo } from './apollo/client'
import * as jwt from 'jsonwebtoken'
import { useRouter } from 'next/router'

interface AuthProviderProps {
  children: React.ReactNode
}

interface ContextTypes {
  craeteApolloClient: () => void
  isLoggedIn: () => boolean
  loginFn: (token: string) => void
  logoutFn: () => void
  getToken: () => void
}

const authContext = createContext<ContextTypes | null>(null)

export const useAuth = () => {
  return useContext(authContext)
}
export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useProvideAuth()
  const router = useRouter()
  useEffect(() => {
    auth.getToken()
    const isAuthenticated = auth.isLoggedIn()
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
  }, [router, auth])
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
      const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_PRIVATE_KEY!)
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
    const token = localStorage.getItem(JWT_TOKEN)
    setToken(token)
  }

  const craeteApolloClient = () => {
    return initializeApollo(token)
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
    getToken,
    craeteApolloClient,
    isLoggedIn,
    loginFn,
    logoutFn,
  }
}
