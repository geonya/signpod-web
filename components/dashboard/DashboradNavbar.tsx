import { Close, Menu } from '@mui/icons-material'
import { IconButton, styled, Toolbar, Typography } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { navBarHeight } from './DashboardLayout'

interface DashboardNavbarProps {
  onSidebarToggle: () => void
  isSidebarOpen: boolean
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({}))

export const DashboardNavbar = ({
  isSidebarOpen,
  onSidebarToggle,
}: DashboardNavbarProps) => {
  return (
    <AppBar position='fixed' open={isSidebarOpen}>
      <Toolbar sx={{ height: navBarHeight, left: 0, px: 2 }}>
        <IconButton
          color='inherit'
          aria-label='open sidebar'
          onClick={() => onSidebarToggle()}
          edge='start'
          sx={{ mr: 2 }}
        >
          {isSidebarOpen ? <Close /> : <Menu />}
        </IconButton>
        <Typography variant='h6' noWrap component='div'>
          SignPod
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
