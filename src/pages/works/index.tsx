import { Add, PlusOne } from '@mui/icons-material'
import { Box, Button, Card, Container, Grid, Typography } from '@mui/material'
import { type NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { DashboardLayout } from '../../components/dashboard/dashboard-layout'
import MyLink from '../../components/link'
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
          py: 5,
        }}
      >
        <Container maxWidth='xl'>
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent='space-between' spacing={3}>
              <Grid item>
                <Typography variant='h4' color='neutral.600'>
                  Works
                </Typography>
              </Grid>
              <Grid item>
                <MyLink href='/works/new' passHref>
                  <Button
                    component='a'
                    startIcon={<Add fontSize='small' />}
                    variant='contained'
                  >
                    업로드
                  </Button>
                </MyLink>
              </Grid>
            </Grid>
          </Box>
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
