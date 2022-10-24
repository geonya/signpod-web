import { useEffect } from 'react'
import type { NextPage } from 'next'
import NextLink from 'next/link'
import Head from 'next/head'
import { Box, Breadcrumbs, Container, Link, Typography } from '@mui/material'
import { DashboardLayout } from '../../components/dashboard/dashboard-layout'
import { CreateWorkForm } from '../../components/works/work-create-form'

const CreateWork: NextPage = () => {
  useEffect(() => {}, [])

  return (
    <>
      <Head>
        <title>Create Work | signpod</title>
      </Head>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 5,
        }}
      >
        <Container maxWidth='lg'>
          <Box sx={{ mb: 3 }}>
            <Typography variant='h4' color='neutral.600'>
              Create a new work
            </Typography>
            <Breadcrumbs separator='/' sx={{ mt: 1 }}>
              <NextLink href='/' passHref>
                <Link variant='subtitle2'>Home</Link>
              </NextLink>
              <NextLink href='/' passHref>
                <Link color='primary' variant='subtitle2'>
                  Signage
                </Link>
              </NextLink>
              <Typography color='textSecondary' variant='subtitle2'>
                Works
              </Typography>
            </Breadcrumbs>
          </Box>
          <CreateWorkForm />
        </Container>
      </Box>
    </>
  )
}

CreateWork.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default CreateWork
