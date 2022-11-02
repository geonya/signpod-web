import { Box, Container, Divider, Tab, Tabs, Typography } from '@mui/material'
import { type NextPage } from 'next'
import Head from 'next/head'
import { type ChangeEvent, useState } from 'react'
import { AuthGuard } from '../components/auth/auth-guard'
import { DashboardLayout } from '../components/dashboard/dashboard-layout'

const tabs = [
  { label: 'General', value: 'general' },
  { label: 'Billing', value: 'billing' },
  { label: 'Team', value: 'team' },
  { label: 'Notifications', value: 'notifications' },
  { label: 'Security', value: 'security' },
]

const Account: NextPage = () => {
  const [currentTab, setCurrentTab] = useState('general')
  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value)
  }
  return (
    <>
      <Head>
        <title>내 계정 | signpod</title>
      </Head>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 5,
        }}
      >
        <Container maxWidth='lg'>
          <Typography variant='h4'>내 계정</Typography>
          <Tabs
            indicatorColor='primary'
            onChange={handleTabsChange}
            scrollButtons='auto'
            textColor='primary'
            value={currentTab}
            variant='scrollable'
            sx={{ mt: 3 }}
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
          <Divider sx={{ mb: 3 }} />
        </Container>
      </Box>
    </>
  )
}

Account.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default Account
