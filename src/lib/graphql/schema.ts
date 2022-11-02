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

const WORK_FRAGMENT = gql`
  fragment WorkFrgament on Work {
    id
    title
    description
    createdAt
    updatedAt
    category
    creator {
      id
      name
      email
      avatar
    }
    photos {
      id
      url
      alt
    }
  }
`

const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on Photo {
    id
    url
    alt
    workId
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
  mutation EditAccount($input:EditAccountInput!, $file:Upload) {
    editAccount(input:$input, file:$file) {
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

  query GetWorks {
    getWorks {
      ok
      error
      works {
        ...WorkFrgament
      }
    }
    ${WORK_FRAGMENT}
  }
`
