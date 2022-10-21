export interface Notification {
  id: string
  author?: string
  avatar?: string
  company?: string
  createdAt: number
  description?: string
  title?: string
  read?: boolean
  type: string
}
