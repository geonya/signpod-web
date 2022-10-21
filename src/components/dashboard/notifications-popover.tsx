import {
  Avatar,
  Box,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  Tooltip,
  Typography,
} from '@mui/material'
import { useEffect, useMemo, useState, type FC } from 'react'
import { Notification } from '../../types/notification'
import { format, subDays, subHours } from 'date-fns'
import { AccountCircle, Chat, Close, Mail } from '@mui/icons-material'
import { Scrollbar } from '../scrollbar'

interface NotificationsPopoverProps {
  anchorEl: null | Element
  onClose?: () => void
  onUpdateUnread?: (value: number) => void
  open?: boolean
}

const now = new Date()

const mockData: Notification[] = [
  {
    id: '5e8883f1b51cc1956a5a1ec0',
    author: 'Geony',
    avatar: '/static/avatar.jpeg',
    createdAt: subHours(now, 2).getTime(),
    read: false,
    title: 'New Chat Message',
    description: 'Hello',
    type: 'chat',
  },
]
const getNotificationContent = (
  notification: Notification,
): JSX.Element | null => {
  switch (notification.type) {
    case 'chat':
      return (
        <>
          <ListItemAvatar sx={{ mt: 0.5 }}>
            <Avatar>
              <Chat fontSize='small' />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexWrap: 'wrap',
                }}
              >
                <Typography variant='subtitle2' sx={{ mr: 0.5 }}>
                  새로운 메시지
                </Typography>
                <Typography variant='body2'>
                  {notification.description}
                </Typography>
              </Box>
            }
            secondary={
              <Typography color='textSecondary' variant='caption'>
                {format(notification.createdAt, 'MMM dd, h:mm a')}
              </Typography>
            }
            sx={{ my: 0 }}
          />
        </>
      )
    default:
      return null
  }
}

export const NotificationsPopover: FC<NotificationsPopoverProps> = ({
  anchorEl,
  onClose,
  onUpdateUnread,
  open,
  ...other
}) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockData)
  const unread = useMemo(
    () =>
      notifications.reduce(
        (acc, notification) => acc + (notification.read ? 0 : 1),
        0,
      ),
    [notifications],
  )

  useEffect(() => {
    onUpdateUnread?.(unread)
  }, [onUpdateUnread, unread])

  const handleMarkAllAsRead = (): void => {
    setNotifications((prevState) =>
      prevState.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  const handleRemoveOne = (notificationId: string) => {
    setNotifications((prevState) =>
      prevState.filter((notification) => notification.id !== notificationId),
    )
  }

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 380 } }}
      transitionDuration={0}
      {...other}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          px: 3,
          py: 2,
        }}
      >
        <Typography color='inherit' variant='h6'>
          알림
        </Typography>
        <Tooltip title='Mark all as read'>
          <IconButton
            onClick={handleMarkAllAsRead}
            size='small'
            sx={{ color: 'inherit' }}
          >
            <Mail fontSize='small' />
          </IconButton>
        </Tooltip>
      </Box>
      {notifications.length === 0 ? (
        <Box sx={{ p: 2 }}>
          <Typography variant='subtitle2'>새로운 알림이 없습니다.</Typography>
        </Box>
      ) : (
        <Scrollbar sx={{ maxHeight: 400 }}>
          <List disablePadding>
            {notifications.map((notification) => (
              <ListItem
                divider
                key={notification.id}
                sx={{
                  alignItems: 'flex-start',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                  '& .MuiListItemSecondaryAction-root': {
                    top: '24%',
                  },
                }}
                secondaryAction={
                  <Tooltip title='Remove'>
                    <IconButton
                      edge='end'
                      onClick={() => handleRemoveOne(notification.id)}
                      size='small'
                    >
                      <Close sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Tooltip>
                }
              >
                {getNotificationContent(notification)}
              </ListItem>
            ))}
          </List>
        </Scrollbar>
      )}
    </Popover>
  )
}
