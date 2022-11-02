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
  Pagination,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { Work } from '../../lib/graphql/__generated__'

interface WorkGridListProps {
  works: {
    id: number
    title: string
    description?: string | null
    category?: string | null
    photos: {
      url: string
      alt?: string | null
    }[]
    creator: {
      id: number
      name: string
      email: string
    }
  }[]
}

const BlogPostCardMediaWrapper = styled('div')({
  paddingTop: 'calc(100% * 4 / 4)',
  position: 'relative',
})

export const WorkGridList: FC<WorkGridListProps> = ({ works }) => (
  <Box
    sx={{
      minHeight: '100%',
      p: 3,
    }}
  >
    <Grid container spacing={2}>
      {works.map((work) => (
        <Grid item key={work.id} md={3} sm={6} xs={12}>
          <Card
            sx={{
              height: '100%',
              p: 2,
            }}
          >
            <BlogPostCardMediaWrapper>
              <CardMedia
                image={work.photos[0].url}
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
              <Link variant='h6'>{work.title}</Link>
              <Typography
                color='textSecondary'
                sx={{
                  mt: 1,
                  textOverflow: 'ellipsis',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                }}
                variant='body2'
              >
                {work.description?.slice(0, 100)} ...
              </Typography>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexGrow: 1,
        py: 2,
        mt: 2,
      }}
    >
      <Pagination count={10} />
    </Box>
  </Box>
)
