/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React from 'react'
import {
  Button,
  Flex,
  Image,
  Text,
  useBreakpointValue,
  View,
} from '@aws-amplify/ui-react'
import { IconPhoneCall } from '@tabler/icons'

export default function MainHero(props) {
  const { overrides, ...rest } = props
  const breakPoints = useBreakpointValue({
    base: 'base',
    small: 'small',
    medium: 'medium',
    large: 'large',
  })
  console.log(breakPoints)
  return (
    <View width='100%' position='relative' {...rest} {...overrides}>
      <Image
        position='absolute'
        top='0%'
        bottom='0%'
        height='100%'
        left='0%'
        right='0%'
        width='100%'
        padding='0px 0px 0px 0px'
        src='https://img.freepik.com/premium-psd/logo-mockup-modern-white-building_145275-143.jpg'
      />
      <Flex
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
          objectFit='cover'
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
            direction='column'
            justifyContent='flex-start'
            shrink='0'
            alignSelf='stretch'
            objectFit='cover'
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
            objectFit='cover'
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
              direction='column'
              justifyContent='flex-start'
              shrink='0'
              alignSelf='stretch'
              objectFit='cover'
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
              direction='column'
              justifyContent='flex-start'
              letterSpacing='0.01px'
              shrink='0'
              alignSelf='stretch'
              objectFit='cover'
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
