import { Report } from '@mui/icons-material'
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { useState, type FC } from 'react'
import { OverviewBanner } from './overview-banner'

export const HomeHero: FC = (props) => {
  const [displayBanner, setDisplayBanner] = useState(true)
  const handleDismissBanner = () => {
    setDisplayBanner(false)
  }
  const theme = useTheme()
  return (
    <Container maxWidth='xl'>
      <Box sx={{ mb: 4 }}>
        <Grid container justifyContent='space-between' spacing={3}>
          <Grid item>
            <Typography variant='h5'>Branding x Signage = Signpod</Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: 'flex',
              alignItems: 'center',
              m: -1,
            }}
          >
            <Button
              startIcon={<Report fontSize='small' />}
              sx={{ m: 1 }}
              variant='outlined'
            >
              이용 안내
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={4}>
        {displayBanner && (
          <Grid item xs={12}>
            <OverviewBanner onDismiss={handleDismissBanner} />
          </Grid>
        )}
      </Grid>
    </Container>
  )
}
