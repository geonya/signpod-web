import { Menu } from '@mui/icons-material'
import { IconButton, styled, Toolbar, Typography } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { sidebarWidth } from './DashboardLayout'

interface DashboardNavbarProps {
  onSidebarToggle: (opened: boolean) => void
  isSidebarOpen: boolean
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${sidebarWidth})`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

export const DashboardNavbar = ({
  isSidebarOpen,
  onSidebarToggle,
}: DashboardNavbarProps) => {
  return (
    <AppBar position='fixed' open={isSidebarOpen}>
      <Toolbar sx={{ minHeight: '4rem', left: 0, px: 2 }}>
        <IconButton
          color='inherit'
          aria-label='open sidebar'
          onClick={() => onSidebarToggle(true)}
          edge='start'
          sx={{ mr: 2, ...(isSidebarOpen && { display: 'none' }) }}
        >
          <Menu fontSize='small' />
        </IconButton>
        <Typography variant='h6' noWrap component='div'>
          SignPod
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
