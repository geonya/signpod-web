import {
  AccountCircle,
  Engineering,
  Logout,
  SwapHoriz,
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
} from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../../hooks/use-auth'
import PropTypes from 'prop-types'

interface AccountPopoverProps {
  anchorEl: null | Element
  onClose?: () => void
  open?: boolean
}

export const AccountPopover: FC<AccountPopoverProps> = ({
  anchorEl,
  onClose,
  open,
  ...other
}) => {
  const { logout } = useAuth()
  const router = useRouter()
  const user = {
    avatar: '/static/avatar.jpeg',
    name: 'geony',
    company: '사인팟',
  }
  const handleLogout = async (): Promise<void> => {
    try {
      onClose?.()
      await logout()
      router.push('/login')
    } catch (error) {
      console.error(error)
      toast.error('로그아웃 에러')
    }
  }
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom',
      }}
      keepMounted
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 300 } }}
      transitionDuration={0}
      {...other}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 40,
            width: 40,
          }}
        >
          <AccountCircle fontSize='small' />
        </Avatar>
        <Box sx={{ ml: 1 }}>
          <Typography variant='body1'>{user.name}</Typography>
          <Typography color='textSecondary' variant='body2'>
            {user.company}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ my: 1 }}>
        <NextLink href='/social/profile' passHref>
          <MenuItem component='a'>
            <ListItemIcon>
              <AccountCircle fontSize='small' />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant='body1'>Profile</Typography>}
            />
          </MenuItem>
        </NextLink>
        <NextLink href='/account' passHref>
          <MenuItem component='a'>
            <ListItemIcon>
              <Engineering fontSize='small' />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant='body1'>Settings</Typography>}
            />
          </MenuItem>
        </NextLink>
        <NextLink href='/' passHref>
          <MenuItem component='a'>
            <ListItemIcon>
              <SwapHoriz fontSize='small' />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant='body1'>Change organization</Typography>
              }
            />
          </MenuItem>
        </NextLink>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant='body1'>Logout</Typography>}
          />
        </MenuItem>
      </Box>
    </Popover>
  )
}

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
}
