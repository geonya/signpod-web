import { Search } from '@mui/icons-material'
import { Box, Chip, Divider, Input, Typography } from '@mui/material'
import { ChangeEvent, FC, KeyboardEvent, useMemo, useState } from 'react'
import { useUpdateEffect } from '../../hooks/use-update-effect'
import { MultiSelect } from '../multi-select'

export interface WorkFilters {
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
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        <Search fontSize='small' />
        <Input
          disableUnderline
          fullWidth
          onChange={handleQueryChange}
          onKeyUp={handleQueryKeyup}
          placeholder='검색하기'
          value={queryValue}
          sx={{ ml: 3 }}
        />
      </Box>
      <Divider />
      {filterItems.length > 0 ? (
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            p: 2,
          }}
        >
          {filterItems.map((filterItem, i) => (
            <Chip
              key={i}
              label={
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    '& span': {
                      fontWeight: 600,
                    },
                  }}
                >
                  <>
                    <span>{filterItem.label}</span>:{' '}
                    {filterItem.displayValue || filterItem.value}
                  </>
                </Box>
              }
              onDelete={(): void => handleDelete(filterItem)}
              sx={{ m: 1 }}
              variant='outlined'
            />
          ))}
        </Box>
      ) : (
        <Box sx={{ p: 3 }}>
          <Typography color='textSecondary' variant='subtitle2'>
            적용된 필터가 없습니다.
          </Typography>
        </Box>
      )}
      <Divider />
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          p: 1,
        }}
      >
        <MultiSelect
          label='업종'
          onChange={handleCategoryChange}
          options={categoryOptions}
          value={categoryValues}
        />
        <MultiSelect
          label='소재'
          onChange={handleCategoryChange}
          options={categoryOptions}
          value={categoryValues}
        />
        <MultiSelect
          label='공개'
          onChange={handleStatusChange}
          options={statusOptions}
          value={statusValues}
        />
      </Box>
    </div>
  )
}
