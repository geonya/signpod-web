import { Common } from './common'
import { Photo } from './photo'
import { Work } from './work'

export interface Tag extends Common {
  name: string
  slug: string
  photos?: Photo[]
  works?: Work[]
}
