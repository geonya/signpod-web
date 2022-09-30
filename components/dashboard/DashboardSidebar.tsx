import { ChevronLeft, Inbox, Mail } from '@mui/icons-material'
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { navBarHeight, sidebarWidth } from './DashboardLayout'

interface DashboardSidebarProps {
  isSidebarOpen: boolean
}

export const DashboardSidebar = ({ isSidebarOpen }: DashboardSidebarProps) => {
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
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <Inbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
