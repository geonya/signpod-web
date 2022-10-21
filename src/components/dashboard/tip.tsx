import { Lightbulb } from '@mui/icons-material'
import { styled, Typography } from '@mui/material'
import { type FC } from 'react'
import PropTypes from 'prop-types'

interface TipProps {
  message: string
}
const TipRoot = styled('div')(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.neutral![800]
      : theme.palette.neutral![100],
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  padding: theme.spacing(1),
}))

export const Tip: FC<TipProps> = (props) => {
  const { message } = props

  return (
    <TipRoot>
      <Lightbulb
        sx={{
          color: 'text.secondary',
          mr: 1,
        }}
        fontSize='small'
      />
      <Typography
        color='textSecondary'
        sx={{
          '& span': {
            fontWeight: 700,
          },
        }}
        variant='caption'
      >
        <span>Tip.</span> {message}
      </Typography>
    </TipRoot>
  )
}

Tip.propTypes = {
  message: PropTypes.string.isRequired,
}
