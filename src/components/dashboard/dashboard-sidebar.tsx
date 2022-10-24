import {
  AttachMoney,
  CalendarViewMonth,
  Chat,
  Check,
  Close,
  ContentPaste,
  CreditCard,
  Drafts,
  Home,
  ListAlt,
  LocalPostOffice,
  Lock,
  Mail,
  Newspaper,
  Person,
  ReceiptRounded,
  Share,
  ShoppingBag,
  ShoppingCart,
  Storefront,
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
import { DashboardSidebarSection } from './dashboard-sidebar-section'
import PropTypes from 'prop-types'
import { SIDEBAR_WIDTH } from '../../constants'

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
    title: t('Signage'),
    items: [
      {
        title: t('포트폴리오'),
        path: '/works',
        icon: <Home fontSize='small' />,
      },
      {
        title: t('제작 문의'),
        path: '/contact',
        icon: <Drafts fontSize='small' />,
        chip: (
          <Chip
            color='primary'
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
        title: t('스토어'),
        path: '/store',
        icon: <Storefront fontSize='small' />,
        children: [
          {
            title: t('브랜딩'),
            path: '/store/branding',
          },
          {
            title: t('현판'),
            path: '/store/signboard',
          },
          {
            title: t('자재'),
            path: '/store/material',
          },
        ],
      },
    ],
  },
  {
    title: t('Account'),
    items: [
      {
        title: t('내 계정'),
        path: '/account',
        icon: <Person fontSize='small' />,
      },
      // {
      //   title: t('Customers'),
      //   path: '/customers',
      //   icon: <Person fontSize='small' />,
      //   children: [
      //     {
      //       title: t('List'),
      //       path: '/customers',
      //     },
      //     {
      //       title: t('Details'),
      //       path: '/customers/1',
      //     },
      //     {
      //       title: t('Edit'),
      //       path: '/customers/1/edit',
      //     },
      //   ],
      // },
      // {
      //   title: t('Products'),
      //   path: '/products',
      //   icon: <ShoppingBag fontSize='small' />,
      //   children: [
      //     {
      //       title: t('List'),
      //       path: '/products',
      //     },
      //     {
      //       title: t('Create'),
      //       path: '/products/new',
      //     },
      //   ],
      // },
      // {
      //   title: t('Orders'),
      //   icon: <ShoppingCart fontSize='small' />,
      //   path: '/orders',
      //   children: [
      //     {
      //       title: t('List'),
      //       path: '/orders',
      //     },
      //     {
      //       title: t('Details'),
      //       path: '/orders/1',
      //     },
      //   ],
      // },
      {
        title: t('견적서'),
        path: '/estimates',
        icon: <ReceiptRounded fontSize='small' />,
      },
      {
        title: t('일정 관리'),
        path: '/todo',
        icon: <ListAlt fontSize='small' />,
      },
    ],
  },
  // {
  //   title: t('Platforms'),
  //   items: [
  //     {
  //       title: t('Job Listings'),
  //       path: '/jobs',
  //       icon: <LocalPostOffice fontSize='small' />,
  //       children: [
  //         {
  //           title: t('Browse'),
  //           path: '/jobs',
  //         },
  //         {
  //           title: t('Details'),
  //           path: '/jobs/companies/1',
  //         },
  //         {
  //           title: t('Create'),
  //           path: '/jobs/new',
  //         },
  //       ],
  //     },
  //     {
  //       title: t('Social Media'),
  //       path: '/social',
  //       icon: <Share fontSize='small' />,
  //       children: [
  //         {
  //           title: t('Profile'),
  //           path: '/social/profile',
  //         },
  //         {
  //           title: t('Feed'),
  //           path: '/social/feed',
  //         },
  //       ],
  //     },
  //     {
  //       title: t('Blog'),
  //       path: '/blog',
  //       icon: <Newspaper fontSize='small' />,
  //       children: [
  //         {
  //           title: t('Post List'),
  //           path: '/blog',
  //         },
  //         {
  //           title: t('Post Details'),
  //           path: '/blog/1',
  //         },
  //         {
  //           title: t('Post Create'),
  //           path: '/blog/new',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   title: t('Apps'),
  //   items: [
  //     {
  //       title: t('Kanban'),
  //       path: '/kanban',
  //       icon: <ContentPaste fontSize='small' />,
  //     },
  //     {
  //       title: t('Mail'),
  //       path: '/mail',
  //       icon: <Mail fontSize='small' />,
  //     },
  //     {
  //       title: t('Chat'),
  //       path: '/chat',
  //       icon: <Chat fontSize='small' />,
  //     },
  //     {
  //       title: t('Calendar'),
  //       path: '/calendar',
  //       icon: <CalendarViewMonth fontSize='small' />,
  //     },
  //   ],
  // },
  // {
  //   title: t('Pages'),
  //   items: [
  //     {
  //       title: t('Auth'),
  //       path: '/authentication',
  //       icon: <Lock fontSize='small' />,
  //       children: [
  //         {
  //           title: t('Register'),
  //           path: '/authentication/register?disableGuard=true',
  //         },
  //         {
  //           title: t('Login'),
  //           path: '/authentication/login?disableGuard=true',
  //         },
  //       ],
  //     },
  //     {
  //       title: t('Pricing'),
  //       path: '/pricing',
  //       icon: <CreditCard fontSize='small' />,
  //     },
  //     {
  //       title: t('Checkout'),
  //       path: '/checkout',
  //       icon: <AttachMoney fontSize='small' />,
  //     },
  //     {
  //       title: t('Contact'),
  //       path: '/contact',
  //       icon: <Drafts fontSize='small' />,
  //     },
  //     {
  //       title: t('Error'),
  //       path: '/error',
  //       icon: <Close fontSize='small' />,
  //       children: [
  //         {
  //           title: '401',
  //           path: '/401',
  //         },
  //         {
  //           title: '404',
  //           path: '/404',
  //         },
  //         {
  //           title: '500',
  //           path: '/500',
  //         },
  //       ],
  //     },
  //   ],
  // },
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
      <Scrollbar sx={{ height: '100%' }}>
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
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
        <Box
          sx={{
            px: 2,
            position: 'sticky',
            bottom: 10,
            left: 0,
            right: 0,
            mx: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'background.default',
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
            borderRightColor: 'divider',
            borderRightStyle: 'solid',
            borderRightWidth: (theme) =>
              theme.palette.mode === 'dark' ? 1 : 0,
            width: SIDEBAR_WIDTH,
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
        sx: {
          width: SIDEBAR_WIDTH,
        },
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
