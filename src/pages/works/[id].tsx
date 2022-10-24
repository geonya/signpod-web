import { NextPage } from 'next'
import { DashboardLayout } from '../../components/dashboard/dashboard-layout'

const WorkDetail: NextPage = () => {
  return <>WorkDetail</>
}

WorkDetail.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default WorkDetail
