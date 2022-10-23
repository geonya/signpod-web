import { Search } from '@mui/icons-material'
import { Box } from '@mui/material'
import { ChangeEvent, FC, KeyboardEvent, useMemo, useState } from 'react'
import { useUpdateEffect } from '../../hooks/use-update-effect'

interface WorkFilters {
  name?: string
  category: string[]
  status: string[]
}

interface FilterItem {
  label: '이름' | '카테고리' | '상태'
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
    filterItems.forEach((item) => {
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

  const handleDelete = (filterItem: FilterItem): void => {
    setFilterItems((prev) =>
      prev.filter(
        (item) =>
          !(filterItem.field === item.field && filterItem.value === item.value),
      ),
    )
  }

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQueryValue(event.target.value)
  }

  const handleQueryKeyup = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.code === 'Enter' && queryValue) {
      const filterItem = filterItems.find((item) => item.field === 'name')
      if (filterItem) {
        setFilterItems((prev) =>
          prev.map((item) => {
            if (item.field === 'name') {
              return {
                ...item,
                value: queryValue,
              }
            }
            return item
          }),
        )
      } else {
        setFilterItems((prev) => [
          ...prev,
          { label: '이름', field: 'name', value: queryValue },
        ])
      }
      setQueryValue('')
    }
  }

  const handleCategoryChange = (values: string[]): void => {
    setFilterItems((prev) => {
      const valuesFound: string[] = []
      const newFilterItems = prev.filter((item) => {
        if (item.field !== 'category') {
          return true
        }
        const found = values.includes(item.value as string)
        if (found) {
          valuesFound.push(item.value as string)
        }
        return found
      })
      if (values.length === valuesFound.length) {
        return newFilterItems
      }
      values.forEach((value) => {
        if (!valuesFound.includes(value)) {
          const option = categoryOptions.find(
            (option) => option.value === value,
          )
          newFilterItems.push({
            label: '카테고리',
            field: 'category',
            value,
            displayValue: option!.label,
          })
        }
      })
      return newFilterItems
    })
  }
  const handleStatusChange = (values: string[]): void => {
    setFilterItems((prev) => {
      const valuesFound: string[] = []
      const newFilterItems = prev.filter((item) => {
        if (item.field !== 'status') {
          return true
        }
        const found = values.includes(item.value as string)
        if (found) {
          valuesFound.push(item.value as string)
        }
        return found
      })
      if (values.length === valuesFound.length) {
        return newFilterItems
      }
      values.forEach((value) => {
        if (!valuesFound.includes(value)) {
          const option = statusOptions.find((option) => option.value === value)
          newFilterItems.push({
            label: '상태',
            field: 'status',
            value,
            displayValue: option!.label,
          })
        }
      })
      return newFilterItems
    })
  }

  // prevent re-render issues
  const categoryValues = useMemo(
    () =>
      filterItems
        .filter((filterItems) => filterItems.field === 'category')
        .map((filterItems) => filterItems.value) as string[],
    [filterItems],
  )

  const statusValues = useMemo(
    () =>
      filterItems
        .filter((filterItems) => filterItems.field === 'status')
        .map((filterItems) => filterItems.value) as string[],
    [filterItems],
  )

  return (
    <div {...other}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          p: 2,
        }}
      >
        <Search fontSize='small' />
        <Box sx={{ flexGrow: 1, ml: 3 }} />
      </Box>
    </div>
  )
}
