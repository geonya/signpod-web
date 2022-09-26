import { Flex, Image, SearchField, Text } from '@aws-amplify/ui-react'
import { IconBell, IconBrandReact, IconNotification } from '@tabler/icons'

export default function TopBar() {
  return (
    <Flex
      id='topBar'
      gap='1rem'
      width='100%'
      height='4rem'
      justifyContent='space-between'
      alignItems='center'
      padding='0 2rem'
    >
      <Flex
        id='logo'
        width='fit-content'
        justifyContent='center'
        alignItems='center'
        gap='0.5rem'
        shrink={1}
        fontSize={{ base: '1rem', medium: '1.3rem' }}
      >
        <IconBrandReact size='1.5rem' />
        <Text>signpod</Text>
      </Flex>
      <Flex
        id='menu'
        gap='0.5rem'
        alignItems='center'
        fontSize={{ base: '0.6rem', medium: '0.8rem' }}
      >
        <Text>Sigange</Text>
        <Text>Sigange</Text>
        <Text>Sigange</Text>
        <Text>Sigange</Text>
      </Flex>
      <Flex id='search' alignItems='center'>
        <SearchField size='small' placeholder='Search...' label='search' />
      </Flex>
      <Flex id='avatar' alignItems='center'>
        <IconBell size='1.5rem' />
        <Image
          src='https://avatars.githubusercontent.com/u/39020648?v=4'
          width='2rem'
          borderRadius='50%'
          alt='avatar'
        />
      </Flex>
    </Flex>
  )
}
