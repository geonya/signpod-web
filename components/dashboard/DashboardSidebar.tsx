import { Inbox, Mail } from '@mui/icons-material'
import {
  Divider,
  Drawer,
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
        {['프로젝트 관리', '갤러리', '실시간 상담', '디자인'].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <Inbox /> : <Mail />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ),
        )}
      </List>
    </Drawer>
  )
}
