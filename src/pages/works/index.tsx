import { Box } from '@mui/material'
import { type NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { DashboardLayout } from '../../components/dashboard/dashboard-layout'
import { WorkGridList } from '../../components/works/work-grid-list'
import { useMounted } from '../../hooks/use-mounted'
import { Work } from '../../types/work'

const Works: NextPage = () => {
  const isMounted = useMounted()
  const [works, setWorks] = useState<Work[]>([])
  const [page, setPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(16)
  const [filters, setFilters] = useState()

  return (
    <>
      <Head>
        <title>Works | signpod</title>
      </Head>
      <Box>
        <WorkGridList />
      </Box>
    </>
  )
}

Works.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Works
