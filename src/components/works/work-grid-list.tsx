import type { FC } from 'react'
import { format, subHours, subMinutes, subSeconds } from 'date-fns'
import {
  Avatar,
  Box,
  Card,
  CardMedia,
  Chip,
  Grid,
  Link,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'

const now = new Date()

const posts = [
  {
    id: '24b76cac9as128cd949747080',
    author: {
      avatar: '/static/avatar.jpeg',
      name: 'Geony',
    },
    category: 'Signage',
    cover: '/static/mock-images/ilown.jpeg',
    publishedAt: subMinutes(subSeconds(now, 16), 45).getTime(),
    readTime: '5 min',
    shortDescription:
      'Aliquam dapibus elementum nulla at malesuada. Ut mi nisl, aliquet non mollis vel, feugiat non nibh. Vivamus sit amet tristique dui. Praesent in bibendum arcu, at placerat augue. Nam varius fermentum diam, at tristique libero ultrices non. Praesent scelerisque diam vitae posuere dignissim. In et purus ac sapien posuere accumsan sit amet id diam. Pellentesque sit amet nulla ante. Maecenas nec leo vitae quam volutpat pretium id vitae augue.',
    title: '천주교 일원동 성당',
  },
  {
    id: 'a9c19d0caf2ca91020saacd1f',
    author: {
      avatar: '/static/avatar.jpeg',
      name: 'Geony',
    },
    category: 'Signage',
    cover: '/static/mock-images/seok.jpeg',
    publishedAt: subHours(subMinutes(subSeconds(now, 29), 51), 6).getTime(),
    readTime: '6 min',
    shortDescription:
      'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi in turpis ac quam luctus interdum. Nullam ac lorem ligula. Integer sed massa bibendum, blandit ipsum et, iaculis augue. Curabitur nec enim eget dolor tincidunt posuere eget nec dolor. Ut ullamcorper dignissim arcu vel laoreet. Sed ligula dolor, vulputate quis eros ac, maximus pharetra orci. Aenean lobortis volutpat vehicula. Suspendisse vel nunc enim. Cras ultrices metus libero, non aliquam diam condimentum vel. Vestibulum arcu leo, consectetur id diam a, semper elementum odio. Proin eleifend volutpat sapien tempor bibendum. Etiam sagittis nulla sit amet aliquam sollicitudin.',
    title: '서울석치과',
  },
  {
    id: '44df90cbf89963zb8aa625c7d',
    author: {
      avatar: '/static/avatar.jpeg',
      name: 'Geony',
    },
    category: 'Signage',
    cover: '/static/mock-images/ilown.jpeg',
    publishedAt: subHours(subMinutes(subSeconds(now, 6), 46), 16).getTime(),
    readTime: '3 min',
    shortDescription:
      'Praesent eget leo mauris. Morbi ac vulputate nibh. In hac habitasse platea dictumst. Praesent fermentum lacus eleifend erat cursus, congue rhoncus mi porta. Mauris rhoncus mollis nisl, vitae tempus tortor. Proin sit amet feugiat felis. Donec nunc urna, pretium sed viverra vel, blandit at urna. Integer pharetra placerat mauris, at fringilla arcu dignissim a. Morbi nec fermentum purus. Integer vel justo interdum lectus euismod bibendum.',
    title: '천주교 일원동 성당',
  },
  {
    id: 'a9c19d0caf2ca91020asacd1f',
    author: {
      avatar: '/static/avatar.jpeg',
      name: 'Geony',
    },
    category: 'Signage',
    cover: '/static/mock-images/seok.jpeg',
    publishedAt: subHours(subMinutes(subSeconds(now, 29), 51), 6).getTime(),
    readTime: '6 min',
    shortDescription:
      'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi in turpis ac quam luctus interdum. Nullam ac lorem ligula. Integer sed massa bibendum, blandit ipsum et, iaculis augue. Curabitur nec enim eget dolor tincidunt posuere eget nec dolor. Ut ullamcorper dignissim arcu vel laoreet. Sed ligula dolor, vulputate quis eros ac, maximus pharetra orci. Aenean lobortis volutpat vehicula. Suspendisse vel nunc enim. Cras ultrices metus libero, non aliquam diam condimentum vel. Vestibulum arcu leo, consectetur id diam a, semper elementum odio. Proin eleifend volutpat sapien tempor bibendum. Etiam sagittis nulla sit amet aliquam sollicitudin.',
    title: '서울석치과',
  },
  {
    id: '24b76cac9a128cd9497s47080',
    author: {
      avatar: '/static/avatar.jpeg',
      name: 'Geony',
    },
    category: 'Signage',
    cover: '/static/mock-images/ilown.jpeg',
    publishedAt: subMinutes(subSeconds(now, 16), 45).getTime(),
    readTime: '5 min',
    shortDescription:
      'Aliquam dapibus elementum nulla at malesuada. Ut mi nisl, aliquet non mollis vel, feugiat non nibh. Vivamus sit amet tristique dui. Praesent in bibendum arcu, at placerat augue. Nam varius fermentum diam, at tristique libero ultrices non. Praesent scelerisque diam vitae posuere dignissim. In et purus ac sapien posuere accumsan sit amet id diam. Pellentesque sit amet nulla ante. Maecenas nec leo vitae quam volutpat pretium id vitae augue.',
    title: '천주교 일원동 성당',
  },
  {
    id: 'a9c19d0caf2ca91020daacd1f',
    author: {
      avatar: '/static/avatar.jpeg',
      name: 'Geony',
    },
    category: 'Signage',
    cover: '/static/mock-images/seok.jpeg',
    publishedAt: subHours(subMinutes(subSeconds(now, 29), 51), 6).getTime(),
    readTime: '6 min',
    shortDescription:
      'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi in turpis ac quam luctus interdum. Nullam ac lorem ligula. Integer sed massa bibendum, blandit ipsum et, iaculis augue. Curabitur nec enim eget dolor tincidunt posuere eget nec dolor. Ut ullamcorper dignissim arcu vel laoreet. Sed ligula dolor, vulputate quis eros ac, maximus pharetra orci. Aenean lobortis volutpat vehicula. Suspendisse vel nunc enim. Cras ultrices metus libero, non aliquam diam condimentum vel. Vestibulum arcu leo, consectetur id diam a, semper elementum odio. Proin eleifend volutpat sapien tempor bibendum. Etiam sagittis nulla sit amet aliquam sollicitudin.',
    title: '서울석치과',
  },
  {
    id: '44df90cbf89963b8aa62z5c7d',
    author: {
      avatar: '/static/avatar.jpeg',
      name: 'Geony',
    },
    category: 'Signage',
    cover: '/static/mock-images/ilown.jpeg',
    publishedAt: subHours(subMinutes(subSeconds(now, 6), 46), 16).getTime(),
    readTime: '3 min',
    shortDescription:
      'Praesent eget leo mauris. Morbi ac vulputate nibh. In hac habitasse platea dictumst. Praesent fermentum lacus eleifend erat cursus, congue rhoncus mi porta. Mauris rhoncus mollis nisl, vitae tempus tortor. Proin sit amet feugiat felis. Donec nunc urna, pretium sed viverra vel, blandit at urna. Integer pharetra placerat mauris, at fringilla arcu dignissim a. Morbi nec fermentum purus. Integer vel justo interdum lectus euismod bibendum.',
    title: '천주교 일원동 성당',
  },
  {
    id: 'a9c19d0caf2ca91020aacd1df',
    author: {
      avatar: '/static/avatar.jpeg',
      name: 'Geony',
    },
    category: 'Signage',
    cover: '/static/mock-images/seok.jpeg',
    publishedAt: subHours(subMinutes(subSeconds(now, 29), 51), 6).getTime(),
    readTime: '6 min',
    shortDescription:
      'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi in turpis ac quam luctus interdum. Nullam ac lorem ligula. Integer sed massa bibendum, blandit ipsum et, iaculis augue. Curabitur nec enim eget dolor tincidunt posuere eget nec dolor. Ut ullamcorper dignissim arcu vel laoreet. Sed ligula dolor, vulputate quis eros ac, maximus pharetra orci. Aenean lobortis volutpat vehicula. Suspendisse vel nunc enim. Cras ultrices metus libero, non aliquam diam condimentum vel. Vestibulum arcu leo, consectetur id diam a, semper elementum odio. Proin eleifend volutpat sapien tempor bibendum. Etiam sagittis nulla sit amet aliquam sollicitudin.',
    title: '서울석치과',
  },
]

const BlogPostCardMediaWrapper = styled('div')({
  paddingTop: 'calc(100% * 4 / 4)',
  position: 'relative',
})

export const WorkGridList: FC = () => (
  <Box
    sx={{
      minHeight: '100%',
      p: 3,
    }}
  >
    <Grid container spacing={2}>
      {posts.map((post) => (
        <Grid item key={post.id} md={3} sm={6} xs={12}>
          <Card
            sx={{
              height: '100%',
              p: 2,
            }}
          >
            <BlogPostCardMediaWrapper>
              <CardMedia
                image={post.cover}
                sx={{
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  width: '100%',
                  cursor: 'pointer',
                }}
              />
            </BlogPostCardMediaWrapper>
            <Box sx={{ mt: 2, cursor: 'pointer' }}>
              <Link variant='h6'>{post.title}</Link>
              <Typography
                color='textSecondary'
                sx={{
                  height: 72,
                  mt: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                }}
                variant='body2'
              >
                {post.shortDescription}
              </Typography>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
)
