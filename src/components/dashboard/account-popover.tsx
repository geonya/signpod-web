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
import type { FC } from 'react'
import toast from 'react-hot-toast'
import PropTypes from 'prop-types'
import { useReactiveVar } from '@apollo/client'
import { isAuthenticatedVar, userVar } from '../../lib/apollo/cache'
import { useLogoutMutation } from '../../lib/graphql/__generated__'
import { useRouter } from 'next/router'

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
  const user = useReactiveVar(userVar)
  const router = useRouter()
  const [logoutMutation] = useLogoutMutation({
    onCompleted: (data) => {
      if (data.logout.ok) {
        router.push('/')
      }
    },
  })
  const handleLogout = async (): Promise<void> => {
    try {
      onClose?.()
      if (user) {
        logoutMutation({ variables: { input: { id: user.id } } })
        userVar(null)
        isAuthenticatedVar(false)
      }
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
          src={user?.avatar || ''}
          sx={{
            height: 40,
            width: 40,
          }}
        >
          <AccountCircle fontSize='small' />
        </Avatar>
        <Box sx={{ ml: 1 }}>
          <Typography variant='body1'>{user?.name || '익명'}</Typography>
          <Typography color='textSecondary' variant='body2'>
            {user?.company || '익명'}
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
