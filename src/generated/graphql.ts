import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddNoteInput = {
  activityId: Scalars['ID'];
  content: Scalars['String'];
};

export type AuthResponseType = {
  __typename?: 'AuthResponseType';
  access_token?: Maybe<Scalars['String']>;
  user?: Maybe<UserType>;
};

export type Call = {
  __typename?: 'Call';
  call_type: Scalars['String'];
  created_at: Scalars['String'];
  direction: Scalars['String'];
  duration: Scalars['Float'];
  from: Scalars['String'];
  id: Scalars['ID'];
  is_archived: Scalars['Boolean'];
  notes: Array<Note>;
  to: Scalars['String'];
  via: Scalars['String'];
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addNote: Call;
  archiveCall: Call;
  login: AuthResponseType;
  refreshToken: AuthResponseType;
};


export type MutationAddNoteArgs = {
  input: AddNoteInput;
};


export type MutationArchiveCallArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};

export type Note = {
  __typename?: 'Note';
  content: Scalars['String'];
  id: Scalars['ID'];
};

export type PaginatedCalls = {
  __typename?: 'PaginatedCalls';
  hasNextPage: Scalars['Boolean'];
  nodes?: Maybe<Array<Call>>;
  totalCount: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  call?: Maybe<Call>;
  me: UserType;
  paginatedCalls: PaginatedCalls;
};


export type QueryCallArgs = {
  id: Scalars['ID'];
};


export type QueryPaginatedCallsArgs = {
  limit?: Maybe<Scalars['Float']>;
  offset?: Maybe<Scalars['Float']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onUpdatedCall?: Maybe<Call>;
};

export type UserType = {
  __typename?: 'UserType';
  id: Scalars['String'];
  username: Scalars['String'];
};

export type CallInfoQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CallInfoQuery = (
  { __typename?: 'Query' }
  & { call?: Maybe<(
    { __typename?: 'Call' }
    & Pick<Call, 'id' | 'direction' | 'from' | 'to' | 'duration' | 'via' | 'is_archived' | 'call_type' | 'created_at'>
    & { notes: Array<(
      { __typename?: 'Note' }
      & Pick<Note, 'id' | 'content'>
    )> }
  )> }
);

export type CallListQueryVariables = Exact<{
  offset: Scalars['Float'];
  limit: Scalars['Float'];
}>;


export type CallListQuery = (
  { __typename?: 'Query' }
  & { paginatedCalls: (
    { __typename?: 'PaginatedCalls' }
    & Pick<PaginatedCalls, 'totalCount' | 'hasNextPage'>
    & { nodes?: Maybe<Array<(
      { __typename?: 'Call' }
      & Pick<Call, 'id' | 'direction' | 'from' | 'to' | 'is_archived' | 'call_type' | 'created_at'>
    )>> }
  ) }
);

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthResponseType' }
    & Pick<AuthResponseType, 'access_token'>
    & { user?: Maybe<(
      { __typename?: 'UserType' }
      & Pick<UserType, 'id' | 'username'>
    )> }
  ) }
);

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = (
  { __typename?: 'Mutation' }
  & { refreshToken: (
    { __typename?: 'AuthResponseType' }
    & Pick<AuthResponseType, 'access_token'>
    & { user?: Maybe<(
      { __typename?: 'UserType' }
      & Pick<UserType, 'id' | 'username'>
    )> }
  ) }
);


export const CallInfoDocument = gql`
    query CallInfo($id: ID!) {
  call(id: $id) {
    id
    direction
    from
    to
    duration
    via
    is_archived
    call_type
    created_at
    notes {
      id
      content
    }
  }
}
    `;

/**
 * __useCallInfoQuery__
 *
 * To run a query within a React component, call `useCallInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useCallInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCallInfoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCallInfoQuery(baseOptions: Apollo.QueryHookOptions<CallInfoQuery, CallInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CallInfoQuery, CallInfoQueryVariables>(CallInfoDocument, options);
      }
export function useCallInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CallInfoQuery, CallInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CallInfoQuery, CallInfoQueryVariables>(CallInfoDocument, options);
        }
export type CallInfoQueryHookResult = ReturnType<typeof useCallInfoQuery>;
export type CallInfoLazyQueryHookResult = ReturnType<typeof useCallInfoLazyQuery>;
export type CallInfoQueryResult = Apollo.QueryResult<CallInfoQuery, CallInfoQueryVariables>;
export const CallListDocument = gql`
    query CallList($offset: Float!, $limit: Float!) {
  paginatedCalls(offset: $offset, limit: $limit) {
    nodes {
      id
      direction
      from
      to
      is_archived
      call_type
      created_at
    }
    totalCount
    hasNextPage
  }
}
    `;

/**
 * __useCallListQuery__
 *
 * To run a query within a React component, call `useCallListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCallListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCallListQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useCallListQuery(baseOptions: Apollo.QueryHookOptions<CallListQuery, CallListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CallListQuery, CallListQueryVariables>(CallListDocument, options);
      }
export function useCallListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CallListQuery, CallListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CallListQuery, CallListQueryVariables>(CallListDocument, options);
        }
export type CallListQueryHookResult = ReturnType<typeof useCallListQuery>;
export type CallListLazyQueryHookResult = ReturnType<typeof useCallListLazyQuery>;
export type CallListQueryResult = Apollo.QueryResult<CallListQuery, CallListQueryVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    access_token
    user {
      id
      username
    }
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
export const RefreshTokenDocument = gql`
    mutation RefreshToken {
  refreshToken {
    access_token
    user {
      id
      username
    }
  }
}
    `;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;