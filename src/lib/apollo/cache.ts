import { InMemoryCache } from '@apollo/client'
import { makeVar } from '@apollo/client'
import { User } from '../../types/user'

export const tokenVar = makeVar<string | undefined | null>('')
export const userVar = makeVar<User | null>(null)
export const isAuthenticatedVar = makeVar<boolean>(false)
export const isInitializedVar = makeVar<boolean>(false)

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {},
    },
  },
})

//
