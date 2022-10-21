import {
  AttachMoney,
  BrowseGallery,
  CalendarViewMonth,
  Chat,
  Check,
  Close,
  ContentPaste,
  CreditCard,
  Drafts,
  Home,
  LocalPostOffice,
  Lock,
  Mail,
  Newspaper,
  Person,
  ReceiptRounded,
  Share,
  ShoppingBag,
  ShoppingCart,
  SupervisedUserCircle,
} from '@mui/icons-material'
import {
  Box,
  Chip,
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
import PropTypes from 'prop-types'

interface DashboardSidebarProps {
  onClose?: () => void
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
        title: t('Overview'),
        path: '/dashboard',
        icon: <Home fontSize='small' />,
      },
      {
        title: t('Analytics'),
        path: '/dashboard/analytics',
        icon: <Home fontSize='small' />,
      },
      {
        title: t('Finance'),
        path: '/dashboard/finance',
        icon: <Home fontSize='small' />,
      },
      {
        title: t('Logistics'),
        path: '/dashboard/logistics',
        icon: <Home fontSize='small' />,
        chip: (
          <Chip
            color='secondary'
            label={
              <Typography
                sx={{
                  fontSize: '10px',
                  fontWeight: '600',
                }}
              >
                NEW
              </Typography>
            }
            size='small'
          />
        ),
      },
      {
        title: t('Account'),
        path: '/dashboard/account',
        icon: <Person fontSize='small' />,
      },
    ],
  },
  {
    title: t('Management'),
    items: [
      {
        title: t('Customers'),
        path: '/dashboard/customers',
        icon: <Person fontSize='small' />,
        children: [
          {
            title: t('List'),
            path: '/dashboard/customers',
          },
          {
            title: t('Details'),
            path: '/dashboard/customers/1',
          },
          {
            title: t('Edit'),
            path: '/dashboard/customers/1/edit',
          },
        ],
      },
      {
        title: t('Products'),
        path: '/dashboard/products',
        icon: <ShoppingBag fontSize='small' />,
        children: [
          {
            title: t('List'),
            path: '/dashboard/products',
          },
          {
            title: t('Create'),
            path: '/dashboard/products/new',
          },
        ],
      },
      {
        title: t('Orders'),
        icon: <ShoppingCart fontSize='small' />,
        path: '/dashboard/orders',
        children: [
          {
            title: t('List'),
            path: '/dashboard/orders',
          },
          {
            title: t('Details'),
            path: '/dashboard/orders/1',
          },
        ],
      },
      {
        title: t('Invoices'),
        path: '/dashboard/invoices',
        icon: <ReceiptRounded fontSize='small' />,
        children: [
          {
            title: t('List'),
            path: '/dashboard/invoices',
          },
          {
            title: t('Details'),
            path: '/dashboard/invoices/1',
          },
        ],
      },
    ],
  },
  {
    title: t('Platforms'),
    items: [
      {
        title: t('Job Listings'),
        path: '/dashboard/jobs',
        icon: <LocalPostOffice fontSize='small' />,
        children: [
          {
            title: t('Browse'),
            path: '/dashboard/jobs',
          },
          {
            title: t('Details'),
            path: '/dashboard/jobs/companies/1',
          },
          {
            title: t('Create'),
            path: '/dashboard/jobs/new',
          },
        ],
      },
      {
        title: t('Social Media'),
        path: '/dashboard/social',
        icon: <Share fontSize='small' />,
        children: [
          {
            title: t('Profile'),
            path: '/dashboard/social/profile',
          },
          {
            title: t('Feed'),
            path: '/dashboard/social/feed',
          },
        ],
      },
      {
        title: t('Blog'),
        path: '/blog',
        icon: <Newspaper fontSize='small' />,
        children: [
          {
            title: t('Post List'),
            path: '/blog',
          },
          {
            title: t('Post Details'),
            path: '/blog/1',
          },
          {
            title: t('Post Create'),
            path: '/blog/new',
          },
        ],
      },
    ],
  },
  {
    title: t('Apps'),
    items: [
      {
        title: t('Kanban'),
        path: '/dashboard/kanban',
        icon: <ContentPaste fontSize='small' />,
      },
      {
        title: t('Mail'),
        path: '/dashboard/mail',
        icon: <Mail fontSize='small' />,
      },
      {
        title: t('Chat'),
        path: '/dashboard/chat',
        icon: <Chat fontSize='small' />,
      },
      {
        title: t('Calendar'),
        path: '/dashboard/calendar',
        icon: <CalendarViewMonth fontSize='small' />,
      },
    ],
  },
  {
    title: t('Pages'),
    items: [
      {
        title: t('Auth'),
        path: '/authentication',
        icon: <Lock fontSize='small' />,
        children: [
          {
            title: t('Register'),
            path: '/authentication/register?disableGuard=true',
          },
          {
            title: t('Login'),
            path: '/authentication/login?disableGuard=true',
          },
        ],
      },
      {
        title: t('Pricing'),
        path: '/dashboard/pricing',
        icon: <CreditCard fontSize='small' />,
      },
      {
        title: t('Checkout'),
        path: '/checkout',
        icon: <AttachMoney fontSize='small' />,
      },
      {
        title: t('Contact'),
        path: '/contact',
        icon: <Drafts fontSize='small' />,
      },
      {
        title: t('Error'),
        path: '/error',
        icon: <Close fontSize='small' />,
        children: [
          {
            title: '401',
            path: '/401',
          },
          {
            title: '404',
            path: '/404',
          },
          {
            title: '500',
            path: '/500',
          },
        ],
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
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
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
        </Box>
        <Divider
          sx={{
            borderColor: '#2D3748', // dark divider
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

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
}
