import { MeQuery } from '../lib/graphql/__generated__'

export type User = Omit<NonNullable<MeQuery['me']['user']>, '__typename'>
