import { Inbox, Mail } from '@mui/icons-material'
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { useRouter } from 'next/router'
import { navBarHeight, sidebarWidth } from './DashboardLayout'

interface DashboardSidebarProps {
  isSidebarOpen: boolean
}

export const DashboardSidebar = ({ isSidebarOpen }: DashboardSidebarProps) => {
  const router = useRouter()
  return (
    <Drawer
      sx={{
        marginTop: navBarHeight,
        width: sidebarWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarWidth,
          marginTop: navBarHeight,
          boxSizing: 'border-box',
        },
      }}
      variant='persistent'
      anchor='left'
      open={isSidebarOpen}
    >
      <List>
        <ListItem disablePadding onClick={() => router.push('/portfolio')}>
          <ListItemButton>
            <ListItemIcon>
              <Inbox />
            </ListItemIcon>
            <ListItemText primary={'포트폴리오'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  )
}
