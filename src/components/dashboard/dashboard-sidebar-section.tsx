import { List } from '@mui/material'
import type { FC } from 'react'

interface Item {
  path?: string
  icon?: string
  chip?: string
  info?: string
  children?: Item[]
  title: string
}

interface DashboardSidebarSectionProps {
  items: Item[]
  path: string
  title: string
}

interface RenderNavItemProps {
  depth?: number
  items: Item[]
  path: string
}

interface ReduceChildRoutesProps {
  acc: JSX.Element[]
  depth: number
  item: Item
  path: string
}

const reduceChildRoutes = ({
  acc,
  depth,
  item,
  path,
}: ReduceChildRoutesProps) => {
  const key = `${item.title}-${depth}`
  const partialMatch = item.path ? path.includes(item.path) : false
  const exactMatch = path.split('?')[0] === item.path
  return acc
}

const renderNavItem = ({
  depth = 0,
  items,
  path,
}: RenderNavItemProps): JSX.Element => (
  <List disablePadding>
    {items.reduce(
      (acc: JSX.Element[], item) =>
        reduceChildRoutes({ acc, depth, item, path }),
      [],
    )}
  </List>
)

export const DashboardSidebarSection: FC<DashboardSidebarSectionProps> = ({
  items,
  path,
  title,
  ...other
}) => {
  return <List></List>
}
