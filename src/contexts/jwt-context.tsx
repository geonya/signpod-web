import { useRouter } from 'next/router'
import { createContext, type FC, ReactNode, useReducer, useEffect } from 'react'
import { ACCESS_TOKEN } from '../constants'
import { useMounted } from '../hooks/use-mounted'
import { tokenVar } from '../lib/apollo/cache'

import {
  useMeLazyQuery,
  useCreateAccountMutation,
  useLogoutMutation,
  useLoginMutation,
} from '../lib/graphql/__generated__'
import { getCookieToken } from '../utils/get-cookie-token'

type User = {
  id: number
  email: string
  name: string
  password?: string
  avatar?: string | null
  company?: string | null
}

interface LoginInput {
  email: string
  password: string
}

interface State {
  isInitialized: boolean
  isAuthenticated: boolean
  user: User | null
}

export interface AuthContextValue extends State {
  login: (loginInput: LoginInput) => Promise<void>
  logout: (userId: number) => Promise<void>
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
  payload: {}
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
    return {
      ...state,
      isAuthenticated: true,
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
  const isMounted = useMounted()
  const router = useRouter()
  const [state, dispatch] = useReducer(reducer, initialState)
  const [me] = useMeLazyQuery()
  const [registerMutation] = useCreateAccountMutation()
  const [logoutMutation] = useLogoutMutation({
    onCompleted: () => {
      console.log('hi')
      router.push('/login')
    },
  })

  const [loginMutation, { loading }] = useLoginMutation({
    onCompleted: (result) => {
      if (result.login.ok && result.login.token) {
        tokenVar(result.login.token)
        if (isMounted()) {
          const returnUrl =
            (router.query.returnUrl as string | undefined) || '/'
          router.push(returnUrl).catch(console.error)
        }
      } else if (result.login.error) {
        if (isMounted()) {
          // formik.setStatus({ success: false })
          // formik.setErrors({ submit: result.login.error })
          // formik.setSubmitting(false)
        }
      }
    },
  })

  useEffect(() => {
    const initialize = async (): Promise<void> => {
      const token = getCookieToken(ACCESS_TOKEN)
      try {
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        })
        if (token) {
          tokenVar(token)
          const { data } = await me()
          const user = data?.me.user
          if (user) {
            dispatch({
              type: ActionType.INITIALIZE,
              payload: {
                isAuthenticated: true,
                user,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = async (loginInput: LoginInput): Promise<void> => {
    await loginMutation({
      variables: {
        input: {
          ...loginInput,
        },
      },
    })
    const { data } = await me()
    const user = data?.me.user
    // dispatch({
    //   type: ActionType.LOGIN,
    //   payload: {
    //     // user,
    //   },
    // })
  }
  const logout = async (userId: number): Promise<void> => {
    await logoutMutation({
      variables: {
        input: {
          id: userId,
        },
      },
    })

    dispatch({ type: ActionType.LOGOUT })
  }

  const register = async (
    email: string,
    password: string,
    name: string,
  ): Promise<void> => {
    dispatch({
      type: ActionType.REGISTER,
      payload: {},
    })
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export const AuthConsumer = AuthContext.Consumer
