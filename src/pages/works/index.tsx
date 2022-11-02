import { useReactiveVar } from '@apollo/client'
import { Add } from '@mui/icons-material'
import { Box, Button, Card, Container, Grid, Typography } from '@mui/material'
import { type NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { DashboardLayout } from '../../components/dashboard/dashboard-layout'
import { SplashScreen } from '../../components/splash-screen'
import { WorkGridList } from '../../components/works/work-grid-list'
import {
  WorkFilters,
  WorkListFilters,
} from '../../components/works/work-list-filters'

import { useMounted } from '../../hooks/use-mounted'
import { userVar } from '../../lib/apollo/cache'
import { useGetWorksQuery } from '../../lib/graphql/__generated__'
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

  const user = useReactiveVar(userVar)
  const { data } = useGetWorksQuery()
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
                  Works, {user ? user.email : 'guest'}
                </Typography>
              </Grid>
              <Grid item>
                <Link href='/works/new' passHref>
                  <Button
                    startIcon={<Add fontSize='small' />}
                    variant='contained'
                  >
                    업로드
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Card>
            <WorkListFilters onChange={handleFiltersChange} />
            {data?.getWorks.works ? (
              <WorkGridList works={data?.getWorks.works} />
            ) : (
              <SplashScreen />
            )}
          </Card>
        </Container>
      </Box>
    </>
  )
}

Works.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Works
