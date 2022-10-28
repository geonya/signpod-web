import { ApolloClient, ApolloLink, from, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { createUploadLink } from 'apollo-upload-client'
import { tokenVar } from './vars'

const uploadHttpLink = createUploadLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://api.signpod.app/graphql'
      : 'http://localhost:4000/graphql',
  credentials:
    process.env.NODE_ENV === 'production' ? 'same-origin' : 'include',
})

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }: { headers: any }) => {
    let token: string | null = null
    if (typeof window !== 'undefined') {
      token = tokenVar()
    }
    return {
      headers: {
        ...headers,
        authorization: token,
      },
    }
  })
  return forward(operation)
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const linkChain = from([authLink, errorLink, uploadHttpLink])

export const client = new ApolloClient({
  link: linkChain,
  ssrMode: typeof window === 'undefined',
  cache: new InMemoryCache(),
})
