import { Photo } from './photo'
import { Tag } from './tag'

export interface Work {
  id: string
  category: string
  createdAt: string
  updatedAt: string
  photos: Photo[]
  tags: Tag[]
}
