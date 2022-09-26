import { useBreakpointValue } from '@aws-amplify/ui-react'
import type { NextPage } from 'next'
import Head from 'next/head'
import TopBar from '../components/TopBar'
import {
  Features4x1,
  HeroLayout2,
  NavBar,
  MainHero,
} from '../src/ui-components'
import RNavBar from '../src/ui-components/RNavBar'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>SignPod | 브랜드를 빛내줄 디자인</title>
      </Head>
      <TopBar />
      <MainHero />
      <Features4x1 width='100%'></Features4x1>
    </div>
  )
}

export default Home
