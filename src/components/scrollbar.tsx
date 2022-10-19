import 'simplebar/dist/simplebar.min.css'
import type { MutableRefObject } from 'react'
import { forwardRef } from 'react'
import SimpleBar from 'simplebar-react'
import type { Theme } from '@mui/material'
import { styled } from '@mui/material/styles'
import type { SxProps } from '@mui/system'

interface ScrollbarProps extends SimpleBar.Props {
  ref: MutableRefObject<SimpleBar>
  sx?: SxProps<Theme>
}

const ScrollbarRoot = styled(SimpleBar)``

export const Scrollbar = forwardRef<
  MutableRefObject<SimpleBar>,
  ScrollbarProps
>((props, ref) => {
  return (
    //@ts-ignore
    <ScrollbarRoot ref={ref} {...props} />
  )
})

Scrollbar.displayName = 'Scrollbar'
