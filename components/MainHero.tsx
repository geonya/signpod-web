import React from 'react'
import { Button, Flex, Text, View } from '@aws-amplify/ui-react'
import { IconPhoneCall } from '@tabler/icons'

export default function MainHero() {
  return (
    <View width='100%' position='relative'>
      <Flex
        backgroundImage={
          'https://img.freepik.com/premium-psd/logo-mockup-modern-white-building_145275-143.jpg'
        }
        gap='1rem'
        direction='column'
        width='100%'
        justifyContent='center'
        alignItems='center'
        overflow='hidden'
        position='relative'
        padding={{ small: '1rem', medium: '10rem' }}
        backgroundColor='rgba(0,0,0,0.5)'
      >
        <Flex
          gap='24px'
          direction='column'
          justifyContent='center'
          alignItems='center'
          grow='1'
          basis='228px'
          alignSelf='stretch'
          position='relative'
          padding='0px 0px 0px 0px'
        >
          <Text
            fontFamily='Inter'
            fontSize='1rem'
            fontWeight='700'
            color='rgba(255,255,255,1)'
            lineHeight='24px'
            textAlign='center'
            display='flex'
            shrink='0'
            alignSelf='stretch'
            position='relative'
            padding='0px 0px 0px 0px'
            whiteSpace='pre-wrap'
          >
            LOREM IPSUM
          </Text>
          <Flex
            gap='16px'
            direction='column'
            shrink='0'
            alignSelf='stretch'
            position='relative'
          >
            <Text
              fontFamily='Inter'
              fontSize='24px'
              fontWeight='400'
              color='rgba(255,255,255,1)'
              lineHeight='30px'
              textAlign='center'
              display='flex'
              shrink='0'
              alignSelf='stretch'
              position='relative'
              whiteSpace='pre-wrap'
            >
              Ut enim ad minim veniam quis nostrud
            </Text>
            <Text
              fontFamily='Inter'
              fontSize='16px'
              fontWeight='400'
              color='rgba(255,255,255,1)'
              lineHeight='24px'
              textAlign='center'
              display='flex'
              letterSpacing='0.01px'
              shrink='0'
              alignSelf='stretch'
              position='relative'
              padding='0px 0px 0px 0px'
              whiteSpace='pre-wrap'
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco.
            </Text>
          </Flex>
          <Button
            display='flex'
            gap='0.5rem'
            width='fit-content'
            justifyContent='center'
            alignItems='center'
            shrink='0'
            position='relative'
            isDisabled={false}
            variation='primary'
          >
            <IconPhoneCall size={20} />
            상담 문의
          </Button>
        </Flex>
      </Flex>
    </View>
  )
}
