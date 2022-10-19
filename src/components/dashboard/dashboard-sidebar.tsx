import { BrowseGallery, Check } from '@mui/icons-material'
import {
  Box,
  Divider,
  Drawer,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useRouter } from 'next/router'
import { FC, ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { type TFunction, useTranslation } from 'react-i18next'
import { Scrollbar } from '../scrollbar'
import NextLink from 'next/link'
import { Logo } from '../logo'
import { DashboardSidebarSection } from './dashboard-sidebar-section'

interface DashboardSidebarProps {
  onClose: () => void
  open?: boolean
}

interface Item {
  title: string
  children?: Item[]
  chip?: ReactNode
  icon?: ReactNode
  path?: string
}

interface Section {
  title: string
  items: Item[]
}

const getSections = (t: TFunction): Section[] => [
  {
    title: t('General'),
    items: [
      {
        title: t('포트폴리오'),
        path: '/portfolio',
        icon: <BrowseGallery fontSize='small' />,
      },
    ],
  },
]

export const DashboardSidebar: FC<DashboardSidebarProps> = ({
  onClose,
  open,
}) => {
  const router = useRouter()
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))
  const { t } = useTranslation()
  const sections = useMemo(() => getSections(t), [t])

  const handlePathChange = () => {
    if (!router.isReady) return
    if (open) {
      onClose?.()
    }
  }
  useEffect(
    handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, router.asPath],
  )

  const content = (
    <>
      <Scrollbar
        sx={{
          height: '100%',
          '& .simplebar-content': {
            height: '100%',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <div>
            <NextLink href='/'>
              <Box
                sx={{
                  p: 3,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Logo
                  sx={{
                    height: 42,
                    width: 42,
                    mr: 2,
                  }}
                />
                <Typography variant='h6' color='inherit'>
                  signpod
                </Typography>
              </Box>
            </NextLink>
            <Box sx={{ px: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  cursor: 'pointer',
                  px: 3,
                  py: '11px',
                  borderRadius: 1,
                }}
              >
                <div>
                  <Typography color='inherit' variant='subtitle1'>
                    signpod inc
                  </Typography>
                  <Typography color='neutral.400' variant='body2'>
                    {t('Plan')} : VIP
                  </Typography>
                </div>
                <Check
                  sx={{
                    color: 'neutral.500',
                    width: 14,
                    height: 14,
                  }}
                />
              </Box>
            </Box>
          </div>
        </Box>
        <Divider
          sx={{
            borderColor: '#2D3748', // dark divider
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {sections.map((section) => (
            <DashboardSidebarSection
              key={section.title}
              path={router.asPath}
              sx={{
                mt: 2,
                '& + &': {
                  mt: 2,
                },
              }}
              {...section}
            />
          ))}
        </Box>
      </Scrollbar>
    </>
  )
  if (lgUp) {
    return (
      <Drawer
        anchor='left'
        open
        onClose={onClose}
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            borderRightColor: 'divider',
            borderRightStyle: 'solid',
            borderRightWidth: (theme) =>
              theme.palette.mode === 'dark' ? 1 : 0,
            color: '#FFFFFF',
            width: 280,
          },
        }}
        variant='permanent'
      >
        {content}
      </Drawer>
    )
  }
  return (
    <Drawer
      anchor='left'
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { backgroundColor: 'neutral.900', color: '#FFFFFF', width: 280 },
      }}
      sx={{
        zIndex: (theme) => theme.zIndex.appBar + 100,
      }}
      variant='temporary'
    >
      {content}
    </Drawer>
  )
}
