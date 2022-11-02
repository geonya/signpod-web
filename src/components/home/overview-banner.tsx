import { Card } from '@mui/material'
import { type FC } from 'react'

interface OverviewBannerProps {
  onDismiss?: () => void
}

export const OverviewBanner: FC<OverviewBannerProps> = ({
  onDismiss,
  ...other
}) => {
  return (
    <Card
      sx={{
        alignItems: 'center',
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        p: 4,
      }}
      {...other}
    >
      CARD
    </Card>
  )
}
