import { Box, Card, Container } from '@mui/material'
import { type NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { DashboardLayout } from '../../components/dashboard/dashboard-layout'
import { WorkGridList } from '../../components/works/work-grid-list'
import {
  WorkFilters,
  WorkListFilters,
} from '../../components/works/work-list-filters'
import { useMounted } from '../../hooks/use-mounted'
import { Work } from '../../types/work'

const Works: NextPage = () => {
  const isMounted = useMounted()
  const [works, setWorks] = useState<Work[]>([])
  const [page, setPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(16)
  const [filters, setFilters] = useState<WorkFilters>({
    name: undefined,
    category: [],
    status: [],
  })

  const handleFiltersChange = () => {}

  return (
    <>
      <Head>
        <title>Works | signpod</title>
      </Head>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth='xl'>
          <Card>
            <WorkListFilters onChange={handleFiltersChange} />
            <WorkGridList />
          </Card>
        </Container>
      </Box>
    </>
  )
}

Works.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Works
