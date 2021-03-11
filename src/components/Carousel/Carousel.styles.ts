import { css } from '../../styles/stitches.config'

export const carousel = css({
  flexDirection: 'column',
  margin: '0 auto',
  maxWidth: '$contentMaxWidth',
  overflowX: 'hidden',
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
})
