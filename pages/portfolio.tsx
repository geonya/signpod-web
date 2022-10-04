import { Box, Container, Grid } from '@mui/material'
import Head from 'next/head'
import { DashBoardLayout } from '../components/dashboard/DashboardLayout'
import PortfolioCard from '../components/portfolio/PortfolioCard'
import { portfolios } from '../__mock__/portfolios'

const PortFolio = () => {
  return (
    <DashBoardLayout>
      <Head>
        <title>Portfolio | signpod</title>
      </Head>
      <Box component='main' sx={{ flex: 1 }}>
        <Container maxWidth={false}>
          {/* product list toolbar */}
          <Box>
            <Grid container spacing={3}>
              {portfolios.map((portfolio, i) => (
                <Grid item key={i} lg={3} md={6} sm={12}>
                  <PortfolioCard portfolio={portfolio} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </DashBoardLayout>
  )
}

export default PortFolio
