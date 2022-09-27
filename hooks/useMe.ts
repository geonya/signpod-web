import { useGetMeQuery } from '../lib/graphql/__generated__'

export const useMe = () => {
  return useGetMeQuery()
}
