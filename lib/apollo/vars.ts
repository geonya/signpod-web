import { makeVar } from '@apollo/client'
import { JWT_TOKEN } from '../../constants'

export const isAuthenticatedVar = makeVar(true)
export const loginFn = (token: string | null) => {
  if (token) {
    localStorage.setItem(JWT_TOKEN, token)
    isAuthenticatedVar(true)
  }
}
export const logoutFn = () => {
  localStorage.removeItem(JWT_TOKEN)
  isAuthenticatedVar(false)
}
