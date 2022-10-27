import { useState, createContext, type ReactNode, FC, useEffect } from 'react'
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
} from '@apollo/client'
import { User } from '../../lib/graphql/__generated__'

interface AuthProviderProps {
  children: ReactNode
}

interface State {
  isInitialized: boolean
  isAuthenticated: boolean
  user: User | null
}

enum ActionType {
  INITIALIZE = 'INITIALIZE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  REGISTER = 'REGISTER',
}
type InitializeAction = {
  type: ActionType.INITIALIZE
  payload: {
    isAuthenticated: boolean
    user: User | null
  }
}

type LoginAction = {
  type: ActionType.LOGIN
  payload: {
    user: User
  }
}

type LogoutAction = {
  type: ActionType.LOGOUT
}

type RegisterAction = {
  type: ActionType.REGISTER
  payload: {
    user: User
  }
}

type Action = InitializeAction | LoginAction | LogoutAction | RegisterAction

type Handler = (state: State, action: any) => State

export interface AuthContextValue extends State {
  login: (token?: string | null) => Promise<void>
  logout: () => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
}

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
}

const handler: Record<ActionType, Handler> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    const { isAuthenticated, user } = action.payload
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    }
  },
  LOGIN: (state: State, action: LoginAction): State => {
    const { user } = action.payload
    return {
      ...state,
      isAuthenticated: true,
      user,
    }
  },
  LOGOUT: (state: State): State => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state: State, action: RegisterAction): State => {
    const { user } = action.payload
    return {
      ...state,
      isAuthenticated: true,
      user,
    }
  },
}

export const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
})

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null)

  useEffect(() => {
    const initialize = async (): Promise<void> => {
      try {
        console.log()
      } catch (error) {}
    }
    initialize()
  }, [])

  const isLoggedIn = (): boolean => {
    if (authToken) {
      return true
    } else {
      return false
    }
  }

  const getAuthHeaders = () => {
    if (!authToken) return null
    return {
      authorization: `Bearer ${authToken}`,
    }
  }

  const createApolloClient = () => {
    const link = new HttpLink({
      uri: 'http://localhost:4000/graphql',
      headers: getAuthHeaders(),
    })

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    })
  }

  return (
    // <AuthContext.Provider value={{}}>
    <ApolloProvider client={createApolloClient()}>{children}</ApolloProvider>
    // </AuthContext.Provider>
  )
}

export const AuthConsumer = AuthContext.Consumer
