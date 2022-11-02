import {
  Box,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  styled,
} from '@mui/material'
import { FC, ReactNode, useState } from 'react'
import PropTypes from 'prop-types'
import { DashboardNavbar } from './dashboard-navbar'
import { DashboardSidebar } from './dashboard-sidebar'
import { SIDEBAR_WIDTH } from '../../constants'
import { FileCopy, Phone, Save, Share } from '@mui/icons-material'

interface DashboardLayoutProps {
  children?: ReactNode
}
const actions = [
  { icon: <Phone />, name: '전화하기' },
  { icon: <Share />, name: '공유하기' },
  { icon: <FileCopy />, name: '복사하기' },
]

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: SIDEBAR_WIDTH,
  },
}))

export const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onOpenSidebar={(): void => setIsSidebarOpen(true)} />
      <DashboardSidebar
        onClose={(): void => setIsSidebarOpen(false)}
        open={isSidebarOpen}
      />
      <SpeedDial
        ariaLabel='SpeedDial basic example'
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </>
  )
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
}
