import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
};

export type CreateAccountInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type CreateAccountOutput = {
  __typename?: 'CreateAccountOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateWorkInput = {
  category: Scalars['String'];
  description: Scalars['String'];
  title: Scalars['String'];
};

export type CreateWorkOutput = {
  __typename?: 'CreateWorkOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditAccountInput = {
  company?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type EditAccountOutput = {
  __typename?: 'EditAccountOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type FindUserByIdInput = {
  id: Scalars['Int'];
};

export type FindUserByIdOutput = {
  __typename?: 'FindUserByIdOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type LogoutOutput = {
  __typename?: 'LogoutOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type MeOutput = {
  __typename?: 'MeOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: CreateAccountOutput;
  createWork: CreateWorkOutput;
  editAccount: EditAccountOutput;
  login: LoginOutput;
  logout: LogoutOutput;
};


export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};


export type MutationCreateWorkArgs = {
  files?: InputMaybe<Array<Scalars['Upload']>>;
  input: CreateWorkInput;
};


export type MutationEditAccountArgs = {
  file?: InputMaybe<Scalars['Upload']>;
  input: EditAccountInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};

export type Photo = {
  __typename?: 'Photo';
  alt?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
  workId?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  findUserById: FindUserByIdOutput;
  me: MeOutput;
};


export type QueryFindUserByIdArgs = {
  input: FindUserByIdInput;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  password: Scalars['String'];
  refreshToken?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  works?: Maybe<Array<Work>>;
};

export type Work = {
  __typename?: 'Work';
  category?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  creator: User;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  photos: Array<Photo>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UserFragmentFragment = { __typename?: 'User', id: number, name: string, email: string, avatar?: string | null, company?: string | null, createdAt: any, updatedAt: any };

export type CreateAccountMutationVariables = Exact<{
  input: CreateAccountInput;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'CreateAccountOutput', ok: boolean, error?: string | null } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginOutput', ok: boolean, error?: string | null } };

export type EditAccountMutationVariables = Exact<{
  input: EditAccountInput;
  file?: InputMaybe<Scalars['Upload']>;
}>;


export type EditAccountMutation = { __typename?: 'Mutation', editAccount: { __typename?: 'EditAccountOutput', ok: boolean, error?: string | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutOutput', ok: boolean, error?: string | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'MeOutput', ok: boolean, error?: string | null, user?: { __typename?: 'User', id: number, name: string, email: string, avatar?: string | null, company?: string | null, createdAt: any, updatedAt: any } | null } };

export type CreateWorkMutationVariables = Exact<{
  input: CreateWorkInput;
  files: Array<Scalars['Upload']> | Scalars['Upload'];
}>;


export type CreateWorkMutation = { __typename?: 'Mutation', createWork: { __typename?: 'CreateWorkOutput', ok: boolean, error?: string | null } };

export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  name
  email
  avatar
  company
  createdAt
  updatedAt
}
    `;
export const CreateAccountDocument = gql`
    mutation CreateAccount($input: CreateAccountInput!) {
  createAccount(input: $input) {
    ok
    error
  }
}
    `;
export type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, options);
      }
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    ok
    error
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const EditAccountDocument = gql`
    mutation EditAccount($input: EditAccountInput!, $file: Upload) {
  editAccount(input: $input, file: $file) {
    ok
    error
  }
}
    `;
export type EditAccountMutationFn = Apollo.MutationFunction<EditAccountMutation, EditAccountMutationVariables>;

/**
 * __useEditAccountMutation__
 *
 * To run a mutation, you first call `useEditAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editAccountMutation, { data, loading, error }] = useEditAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useEditAccountMutation(baseOptions?: Apollo.MutationHookOptions<EditAccountMutation, EditAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditAccountMutation, EditAccountMutationVariables>(EditAccountDocument, options);
      }
export type EditAccountMutationHookResult = ReturnType<typeof useEditAccountMutation>;
export type EditAccountMutationResult = Apollo.MutationResult<EditAccountMutation>;
export type EditAccountMutationOptions = Apollo.BaseMutationOptions<EditAccountMutation, EditAccountMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    ok
    error
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ok
    error
    user {
      ...UserFragment
    }
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const CreateWorkDocument = gql`
    mutation CreateWork($input: CreateWorkInput!, $files: [Upload!]!) {
  createWork(input: $input, files: $files) {
    ok
    error
  }
}
    `;
export type CreateWorkMutationFn = Apollo.MutationFunction<CreateWorkMutation, CreateWorkMutationVariables>;

/**
 * __useCreateWorkMutation__
 *
 * To run a mutation, you first call `useCreateWorkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorkMutation, { data, loading, error }] = useCreateWorkMutation({
 *   variables: {
 *      input: // value for 'input'
 *      files: // value for 'files'
 *   },
 * });
 */
export function useCreateWorkMutation(baseOptions?: Apollo.MutationHookOptions<CreateWorkMutation, CreateWorkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWorkMutation, CreateWorkMutationVariables>(CreateWorkDocument, options);
      }
export type CreateWorkMutationHookResult = ReturnType<typeof useCreateWorkMutation>;
export type CreateWorkMutationResult = Apollo.MutationResult<CreateWorkMutation>;
export type CreateWorkMutationOptions = Apollo.BaseMutationOptions<CreateWorkMutation, CreateWorkMutationVariables>;