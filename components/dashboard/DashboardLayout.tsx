import { Box, styled } from '@mui/material'
import { shouldForwardProp } from '@mui/styled-engine'
import { useState } from 'react'
import { DashboardSidebar, DrawerHeader } from './DashboardSidebar'
import { DashboardNavbar } from './DashboradNavbar'

export const sidebarWidth = '17.5rem'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

export const DashBoardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const onSidebarToggle = (opened: boolean) => {
    setSidebarOpen(opened)
  }
  return (
    <>
      <Box
        component='div'
        sx={(theme) => ({
          display: 'flex',
          maxWidth: '100%',
          justifyContent: 'center',
        })}
      >
        <Main open={isSidebarOpen}>
          <DrawerHeader />
          {children}
        </Main>
      </Box>
      <DashboardNavbar
        onSidebarToggle={onSidebarToggle}
        isSidebarOpen={isSidebarOpen}
      />
      <DashboardSidebar
        onSidebarToggle={onSidebarToggle}
        isSidebarOpen={isSidebarOpen}
      />
    </>
  )
}
