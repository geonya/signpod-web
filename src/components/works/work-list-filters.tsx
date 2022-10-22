import { FC, useState } from 'react'
import { useUpdateEffect } from '../../hooks/use-update-effect'

interface WorkFilters {
  name?: string
  category: string[]
  status: string[]
}

interface FilterItem {
  label: string
  field: 'name' | 'category' | 'status'
  value: unknown
  displayValue?: unknown
}

const categoryOptions = [
  {
    label: '병/의원',
    value: 'medical',
  },
  {
    label: '기업/관공서',
    value: 'company',
  },
  {
    label: '카페/요식업',
    value: 'food',
  },
]

const statusOptions = [
  {
    label: '공개',
    value: 'public',
  },
  {
    label: '비공개',
    value: 'private',
  },
]

interface WorkListFiltersProps {
  onChange?: (filter: WorkFilters) => void
}

export const WorkListFilters: FC<WorkListFiltersProps> = ({
  onChange,
  ...other
}) => {
  const [queryValue, setQueryValue] = useState('')
  const [filterItems, setFilterItems] = useState<FilterItem[]>([])

  useUpdateEffect(() => {
    const filters: WorkFilters = {
      name: undefined,
      category: [],
      status: [],
    }
    filterItems.map((item) => {
      switch (item.field) {
        case 'name':
          filters.name = item.value as string
          break
        case 'category':
          filters.category.push(item.value as string)
          break
        case 'status':
          filters.status.push(item.value as string)
          break
      }
    })
    onChange?.(filters)
  }, [filterItems])

  const handleDelete = (filterItem: FilterItem): void => {}
  return <div {...other}></div>
}
