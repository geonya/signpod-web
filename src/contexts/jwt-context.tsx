import Cookies from 'js-cookie'
import { createContext, type FC, ReactNode, useReducer, useEffect } from 'react'
import { ACCESS_TOKEN, JWT_TOKEN } from '../constants'
import {
  useMeLazyQuery,
  useCreateAccountMutation,
} from '../lib/graphql/__generated__'

type User = {
  email: string
  name: string
  password?: string
}

interface State {
  isInitialized: boolean
  isAuthenticated: boolean
  user: User | null
}

export interface AuthContextValue extends State {
  login: (token?: string | null) => Promise<void>
  logout: () => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
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

const reducer = (state: State, action: Action): State =>
  handler[action.type] ? handler[action.type](state, action) : state

export const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
})

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [me] = useMeLazyQuery()
  const [registerMutation] = useCreateAccountMutation()
  useEffect(() => {
    const initialize = async (): Promise<void> => {
      try {
        const token = Cookies.get(ACCESS_TOKEN)
        if (token) {
          const { data } = await me({ variables: { input: { token } } })
          const user = data?.me.user
          if (user) {
            dispatch({
              type: ActionType.INITIALIZE,
              payload: {
                isAuthenticated: true,
                user: {
                  name: user.name,
                  email: user.email,
                },
              },
            })
          }
        } else {
          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          })
        }
      } catch (error) {
        console.error(error)
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        })
      }
    }
    initialize()
  }, [me])

  const login = async (token?: string | null): Promise<void> => {
    if (token) {
      localStorage.setItem(JWT_TOKEN, token)
      const { data } = await me({ variables: { input: { token } } })
      const user = data?.me.user
      if (user) {
        dispatch({
          type: ActionType.LOGIN,
          payload: {
            user,
          },
        })
      }
    }
  }
  const logout = async (): Promise<void> => {
    localStorage.removeItem(JWT_TOKEN)
    dispatch({ type: ActionType.LOGOUT })
  }

  const register = async (
    email: string,
    password: string,
    name: string,
  ): Promise<void> => {
    const { data } = await registerMutation({
      variables: {
        input: {
          email,
          password,
          name,
        },
      },
    })
    const token = data?.createAccount.token
    if (token) {
      localStorage.setItem(JWT_TOKEN, token)
      const { data } = await me({ variables: { input: { token } } })
      const user = data?.me.user
      if (user) {
        dispatch({
          type: ActionType.REGISTER,
          payload: {
            user,
          },
        })
      }
    }
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export const AuthConsumer = AuthContext.Consumer
