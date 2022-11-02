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
    <Box
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth='xl'>
        <Box sx={{ mb: 4 }}>
          <Grid container justifyContent='space-between' spacing={3}>
            <Grid item>
              <Typography variant='h4'>Branding x Signage</Typography>
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
                다운로드
              </Button>
              <TextField
                defaultValue='week'
                label='Period'
                select
                size='small'
                sx={{ m: 1 }}
              >
                <MenuItem value='week'>Last week</MenuItem>
                <MenuItem value='month'>Last month</MenuItem>
                <MenuItem value='year'>Last year</MenuItem>
              </TextField>
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
    </Box>
  )
}
