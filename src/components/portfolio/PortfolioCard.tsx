import { LockClock, ThumbUp } from '@mui/icons-material'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from '@mui/material'
import { displayFlex, TEXT_PRIMARY } from '../../constants'

interface IPortfolio {
  title: string
  photo: string
  description: string
}

interface PortfolioCardProps {
  portfolio: IPortfolio
}

const PortfolioCard = ({ portfolio, ...rest }: PortfolioCardProps) => {
  return (
    <Card
      sx={(theme) => ({
        ...displayFlex,
        flexDirection: 'column',
        height: '100%',
      })}
      variant='outlined'
    >
      <CardContent>
        <Box sx={{ ...displayFlex, justifyContent: 'center', pb: 3 }}>
          <CardMedia
            component='img'
            height={300}
            image={portfolio.photo}
            alt='Portfolio'
          />
        </Box>
        <Typography
          align='center'
          color={TEXT_PRIMARY}
          gutterBottom
          variant='h5'
        >
          {portfolio.title}
        </Typography>
        <Typography align='center' color={TEXT_PRIMARY} variant='body1'>
          {portfolio.description}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <LockClock color='action' />
            <Typography
              color='textSecondary'
              display='inline'
              sx={{ pl: 1 }}
              variant='body2'
            >
              2시간 전 업로드
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <ThumbUp color='action' />
            <Typography
              color='textSecondary'
              display='inline'
              sx={{ pl: 1 }}
              variant='body2'
            >
              추천
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  )
}

export default PortfolioCard
