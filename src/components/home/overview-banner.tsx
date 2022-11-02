import { Box, Button, Card, Chip, Typography } from '@mui/material'
import Image from 'next/image'
import { type FC } from 'react'

interface OverviewBannerProps {
  onDismiss?: () => void
}

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

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
      <Image
        src='/static/banner-illustration.png'
        alt=''
        layout='fixed'
        width={200}
        height={200}
        priority={true}
      />

      <div>
        <div>
          <Chip color='secondary' label='New' />
        </div>
        <Typography color='inherit' sx={{ mt: 2 }} variant='h4'>
          사인팟 새로운 홈페이지에 오신걸 환영해요!
        </Typography>
        <Typography color='inherit' sx={{ mt: 1 }} variant='subtitle2'>
          한 차원 높은 웹 어플리케이션!
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button color='secondary' onClick={onDismiss} variant='contained'>
            배너 끄기
          </Button>
        </Box>
      </div>
    </Card>
  )
}
