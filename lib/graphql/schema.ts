import { gql } from '@apollo/client'

const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    name
    email
  }
`

gql`
  mutation CreateAccount($input: CreateAccountInput!) {
    createAccount(input: $input) {
      ok
      error
    }
  }

  mutation Login($input: LoginInput!) {
    login(input: $input) {
      ok
      error
      token
    }
  }

  query GetMe {
    getMe {
      ok
      error
      user {
        ...UserFragment
      }
    }
    ${USER_FRAGMENT}
  }

`
