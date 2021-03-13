import { css } from '../../styles/stitches.config'

export const carousel = css({
  flexDirection: 'column',
  width: '100%',
})

export const carouselInner = css({
  transition: 'transform 200ms',
  whiteSpace: 'nowrap',
})

export const carouselItem = css({
  display: 'inline-block',
  verticalAlign: 'top',
  width: '100%',
  whiteSpace: 'normal',
})
