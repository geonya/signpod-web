import {
  AccountCircle,
  Menu,
  Notifications,
  Person,
  Search,
} from '@mui/icons-material'
import {
  AppBar,
  AppBarProps,
  Avatar,
  Badge,
  Box,
  ButtonBase,
  IconButton,
  styled,
  Toolbar,
  Tooltip,
} from '@mui/material'
import { FC, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { AccountPopover } from './account-popover'
import { SIDEBAR_WIDTH } from '../../constants'
import { NotificationsPopover } from './notifications-popover'
import { ContentSearchDialog } from './content-search-dialog'

interface DashboardNavbarProps extends AppBarProps {
  onOpenSidebar?: () => void
}

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...(theme.palette.mode === 'light'
    ? { boxShadow: theme.shadows[3] }
    : {
        backgroundColor: theme.palette.background.paper,
        borderBottomColor: theme.palette.divider,
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        boxShadow: 'none',
      }),
}))

export const DashboardNavbar: FC<DashboardNavbarProps> = ({
  onOpenSidebar,
  ...other
}) => {
  const SearchButton = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const handleOpenSearchDialog = () => {
      setOpenDialog(true)
    }
    const handleCloseSearchDialog = () => {
      setOpenDialog(false)
    }
    return (
      <>
        <Tooltip title='Search'>
          <IconButton onClick={handleOpenSearchDialog} sx={{ ml: 1 }}>
            <Search fontSize='small' />
          </IconButton>
        </Tooltip>
        <ContentSearchDialog
          onClose={handleCloseSearchDialog}
          open={openDialog}
        />
      </>
    )
  }
  const NotiButton = () => {
    const anchorRef = useRef<HTMLButtonElement | null>(null)
    const [unread, setUnread] = useState(0)
    const [openPopover, setOpenPopover] = useState(false)
    const handleOpenPopover = (): void => {
      setOpenPopover(true)
    }
    const handleClosePopover = (): void => {
      setOpenPopover(false)
    }
    const handleUpdateUnread = (value: number): void => {
      setUnread(value)
    }
    return (
      <>
        <Tooltip title='Notifications'>
          <IconButton
            ref={anchorRef}
            sx={{ ml: 1 }}
            onClick={handleOpenPopover}
          >
            <Badge color='error' variant='dot' badgeContent={unread}>
              <Notifications fontSize='medium' />
            </Badge>
          </IconButton>
        </Tooltip>
        <NotificationsPopover
          anchorEl={anchorRef.current}
          onClose={handleClosePopover}
          onUpdateUnread={handleUpdateUnread}
          open={openPopover}
        />
      </>
    )
  }
  const AccountButton = () => {
    const anchorRef = useRef<HTMLButtonElement | null>(null)
    const [openPopover, setOpenPopover] = useState<boolean>(false)
    // To get the user from the authContext, you can use
    // `const { user } = useAuth();`
    const user = {
      avatar: '/static/avatar.jpeg',
      name: 'geony',
      company: '사인팟',
    }
    const handleOpenPopover = (): void => {
      setOpenPopover(true)
    }

    const handleClosePopover = (): void => {
      setOpenPopover(false)
    }

    return (
      <>
        <Box
          component={ButtonBase}
          onClick={handleOpenPopover}
          ref={anchorRef}
          sx={{
            alignItems: 'center',
            display: 'flex',
            ml: 2,
          }}
        >
          <Avatar
            sx={{
              height: 40,
              width: 40,
            }}
            src={''}
          >
            <Person />
          </Avatar>
        </Box>
        <AccountPopover
          anchorEl={anchorRef.current}
          onClose={handleClosePopover}
          open={openPopover}
        />
      </>
    )
  }

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: SIDEBAR_WIDTH,
          },
          width: {
            lg: `calc(100% - ${SIDEBAR_WIDTH}px)`,
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onOpenSidebar}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none',
              },
            }}
          >
            <Menu fontSize='small' />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <SearchButton />
          <NotiButton />
          <AccountButton />
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  )
}

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
}
