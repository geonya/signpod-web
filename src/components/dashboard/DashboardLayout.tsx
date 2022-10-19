import { Box, styled } from '@mui/material'
import { useState } from 'react'
import { DashboardSidebar } from './DashboardSidebar'
import { DashboardNavbar } from './DashboradNavbar'

export const sidebarWidth = '17.5rem'
export const navBarHeight = '4rem'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const Wrapper = styled('div')(() => ({
  display: 'flex',
  maxWidth: '100%',
  justifyContent: 'center',
}))

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginTop: navBarHeight,
}))

export const DashBoardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const onSidebarToggle = () => {
    setSidebarOpen((prev) => !prev)
  }
  return (
    <>
      <Wrapper>
        <Main>{children}</Main>
      </Wrapper>
      <DashboardNavbar
        onSidebarToggle={onSidebarToggle}
        isSidebarOpen={isSidebarOpen}
      />
      <DashboardSidebar isSidebarOpen={isSidebarOpen} />
    </>
  )
}
