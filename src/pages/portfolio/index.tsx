import { Box, Container, Grid, Pagination } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { DashBoardLayout } from '../../components/dashboard/DashboardLayout'
import PortfolioCard from '../../components/portfolio/PortfolioCard'
import { portfolios } from '../../__mock__/portfolios'

const PortFolio = () => {
  const router = useRouter()
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
                <Grid
                  item
                  key={i}
                  lg={3}
                  md={6}
                  sm={12}
                  onClick={() => router.push(`/portfolio/${portfolio.title}`)}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  <PortfolioCard portfolio={portfolio} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 5,
            }}
          >
            <Pagination color='primary' count={10} size='small' />
          </Box>
        </Container>
      </Box>
    </DashBoardLayout>
  )
}

export default PortFolio
