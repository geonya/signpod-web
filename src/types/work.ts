import { GetWorksQuery } from '../lib/graphql/__generated__'

export type Work = Omit<
  NonNullable<GetWorksQuery['getWorks']['works']>,
  '__typename'
>
