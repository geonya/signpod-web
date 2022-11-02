import { Box, Button, Container, Paper, Typography } from '@mui/material'
import { type FC } from 'react'
import Carousel from 'react-material-ui-carousel'

type Item = {
  name: string
  description: string
  href: string
}

export const MainCarousel: FC = () => {
  return (
    <Container maxWidth='xl'>
      <Carousel
        autoPlay
        navButtonsAlwaysVisible
        cycleNavigation
        animation='slide'
        swipe
        fullHeightHover
      >
        {items.map((item, index) => {
          return <Slide item={item} key={index} />
        })}
      </Carousel>
    </Container>
  )
}

interface SlideProps {
  item: Item
}
function Slide({ item }: SlideProps) {
  return (
    <Paper
      sx={{
        height: 300,
        p: 6,
      }}
      elevation={10}
    >
      <Typography variant='h5'>{item.name}</Typography>
      <br />
      <Typography>{item.description}</Typography>

      <Button component='a' href={item.href} target='_blank' rel='noreferrer'>
        Check it out!
      </Button>
    </Paper>
  )
}

const items: Item[] = [
  {
    name: 'Lear Music Reader',
    description: 'A PDF Reader specially designed for musicians.',
    href: 'https://github.com/Learus/Lear-Music-Reader',
  },
  {
    name: 'Hash Code 2019',
    description:
      'My Solution on the 2019 Hash Code by Google Slideshow problem.',
    href: 'https://github.com/Learus/HashCode2019',
  },
  {
    name: 'Terrio',
    description: 'A exciting mobile game game made in the Unity Engine.',
    href: 'https://play.google.com/store/apps/details?id=com.Brewery.Terrio',
  },
  {
    name: 'React Carousel',
    description: 'A Generic carousel UI component for React using material ui.',
    href: 'https://github.com/Learus/react-material-ui-carousel',
  },
]
