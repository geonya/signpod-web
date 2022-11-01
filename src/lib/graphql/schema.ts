import { gql } from '@apollo/client'

const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    name
    email
    avatar
    company
    createdAt
    updatedAt
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

  query Me {
    me {
      ok
      error
      user {
        ...UserFragment
      }
    }
    ${USER_FRAGMENT}
  }
  

  mutation CreateWork($input:CreateWorkInput!, $files:[Upload!]!) {
    createWork(input:$input, files:$files) {
      ok
      error
    }
  }

`
