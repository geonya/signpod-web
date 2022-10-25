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
      token
    }
  }

  mutation Login($input: LoginInput!) {
    login(input: $input) {
      ok
      error
      token
    }
  }
  mutation EditAccount($input:EditAccountInput!) {
    editAccount(input:$input) {
      ok
      error
    }
  }

  mutation Logout {
    logout {
      ok
      error
    }
  }

  query Me($input:MeInput!) {
    me(input:$input) {
      ok
      error
      user {
        ...UserFragment
      }
    }
    ${USER_FRAGMENT}
  }
  

  mutation CreateWork($input:CreateWorkInput!) {
    createWork(input:$input) {
      ok
      error
    }
  }

`
