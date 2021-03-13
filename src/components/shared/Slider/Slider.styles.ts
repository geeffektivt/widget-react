import { css } from '../../../styles/stitches.config'

export const root = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  touchAction: 'none',
  height: '3rem',

  '&[data-disabled]': {
    opacity: 0.25,
  },
})

export const track = css({
  backgroundColor: '$grey14',
  borderRadius: '9999px',
  flexGrow: 1,
  height: '0.5rem',
  overflow: 'hidden',
  position: 'relative',
})

export const range = css({
  position: 'absolute',
  backgroundColor: '$primary100',
  height: '100%',
})

export const thumb = css({
  backgroundColor: 'white',
  border: '1px solid lightgray',
  borderRadius: '50%',
  display: 'block',
  height: '2rem',
  // pointerEvents: 'none',
  width: '2rem',

  ':focus': {
    borderColor: '$primary100',
    outline: 'none',
  },
})
