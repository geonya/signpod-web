import { ApolloClient, ApolloLink, from, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { createUploadLink } from 'apollo-upload-client'

const uploadHttpLink = createUploadLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://signpod-back-kmjnhjkr4a-du.a.run.app/graphql'
      : 'http://localhost:8080/graphql',
  credentials: 'include',
})

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }: { headers: any }) => {
    return {
      headers: {
        ...headers,
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

const additiveLink = from([authLink, errorLink, uploadHttpLink])

const client = new ApolloClient({
  link: additiveLink,
  ssrMode: typeof window === 'undefined',
  cache: new InMemoryCache(),
})

export default client
