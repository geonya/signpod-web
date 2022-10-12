import { Box, Container, Grid, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { DashBoardLayout } from '../components/dashboard/DashboardLayout'

const Home: NextPage = () => {
  return (
    <DashBoardLayout>
      <h1>Main</h1>
    </DashBoardLayout>
  )
}

export default Home
