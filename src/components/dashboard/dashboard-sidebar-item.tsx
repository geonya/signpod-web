import { Box, Button, Collapse, ListItem, ListItemProps } from '@mui/material'
import { FC, ReactNode, useState } from 'react'
import PropTypes from 'prop-types'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import NextLink from 'next/link'

interface DashboardSidebarItemProps extends ListItemProps {
  active?: boolean
  children?: ReactNode
  chip?: ReactNode
  depth: number
  icon?: ReactNode
  info?: ReactNode
  open?: boolean
  path?: string
  title: string
}

export const DashboardSidebarItem: FC<DashboardSidebarItemProps> = ({
  active,
  children,
  chip,
  depth,
  icon,
  info,
  open: openProp,
  path,
  title,
  ...other
}) => {
  const [open, setOpen] = useState(openProp)
  const handleToggle = (): void => {
    setOpen((prev) => !prev)
  }
  let paddingLeft = 24

  if (depth > 0) {
    paddingLeft = 32 + 8 * depth
  }

  if (children) {
    return (
      <ListItem
        disableGutters
        sx={{ display: 'block', mb: 0.5, py: 0, px: 2 }}
        {...other}
      >
        <Button
          endIcon={
            !open ? (
              <ChevronRight fontSize='small' />
            ) : (
              <ChevronLeft fontSize='small' />
            )
          }
          disableRipple
          onClick={handleToggle}
          startIcon={icon}
          sx={{
            color: active ? 'secondary.main' : 'neutral.300',
            justifyContent: 'flex-start',
            pl: `${paddingLeft}px`,
            pr: 3,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255, 0.08)',
            },
            '& .MuiButton-startIcon': {
              color: active ? 'secondary.main' : 'neutral.400',
            },
            '& .MuiButton-endIcon': {
              color: 'neutral.400',
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
          {info}
        </Button>
        <Collapse in={open} sx={{ mt: 0.5 }}>
          {children}
        </Collapse>
      </ListItem>
    )
  }

  return (
    <ListItem disableGutters sx={{ display: 'flex', mb: 0.5, py: 0, px: 2 }}>
      <NextLink href={path as string} passHref>
        <Button
          component='a'
          startIcon={icon}
          endIcon={chip}
          disableRipple
          sx={{
            borderRadius: 1,
            color: 'neutral.300',
            justifyContent: 'flex-start',
            pl: `${paddingLeft}px`,
            pr: 3,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            ...(active && {
              backgroundColor: 'rgba(255,255,255, 0.08)',
              color: 'secondary.main',
              fontWeight: 'fontWeightBold',
            }),
            '& .MuiButton-startIcon': {
              color: active ? 'secondary.main' : 'neutral.400',
            },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255, 0.08)',
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
          {info}
        </Button>
      </NextLink>
    </ListItem>
  )
}

DashboardSidebarItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  depth: PropTypes.number.isRequired,
  icon: PropTypes.node,
  info: PropTypes.node,
  open: PropTypes.bool,
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
}

DashboardSidebarItem.defaultProps = {
  active: false,
  open: false,
}
