import { Close, Menu, Search } from '@mui/icons-material'
import {
  Box,
  IconButton,
  styled,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
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
      <Toolbar sx={{ left: 0, px: 2, minHeight: navBarHeight }}>
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
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title='search'>
          <IconButton color='inherit' sx={{ ml: 1 }}>
            <Search />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}
