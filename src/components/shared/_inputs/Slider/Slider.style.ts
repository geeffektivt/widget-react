import { CSS, css } from '../../../../styles/stitches.config'

const trackHeight = '0.5rem'
const thumbSize = '1.5rem'

export const sliderRoot = css({
  '--value': '0', // Set through JS

  height: thumbSize,
  position: 'relative',
  zIndex: 0,

  '&[data-disabled=true]': {
    opacity: 0.25,
  },
})

const thumbStyle: CSS = {
  appearance: 'none',
  backgroundColor: '$primary100',
  borderRadius: '50%',
  border: '1px solid',
  borderColor: '$primary100',
  height: thumbSize,
  transform: 'scale(1)',
  width: thumbSize,
}

export const sliderInput = css({
  appearance: 'none',
  background: 'transparent',

  height: thumbSize,
  margin: 0,
  outline: 'none',
  position: 'absolute',
  top: 0,
  width: '100%',
  zIndex: 1,

  '&::-webkit-slider-thumb': {
    ...thumbStyle,
  },

  '&::-moz-range-thumb': {
    ...thumbStyle,
  },

  '&::-ms-thumb': {
    ...thumbStyle,
  },

  '&:not(:disabled)': {
    cursor: 'grab',
  },

  '&:not(:disabled):active': {
    cursor: 'grabbing',
  },

  '&:not(:disabled):hover::-webkit-slider-thumb': {
    transform: 'scale(1.1)',
  },
})

export const sliderProgress = css({
  '--clip-start': '0',
  '--clip-end': 'calc(100% - var(--value) * 1%)',
  '--clip': 'inset(-20px var(--clip-end) -20px var(--clip-start))',

  backgroundColor: '$grey14',
  borderRadius: 999,
  height: trackHeight,
  left: 0,
  pointerEvents: 'none',
  position: 'absolute',
  right: 0,
  top: '0.5rem',
  zIndex: 0,

  '&::before': {
    backgroundColor: '$primary100',
    borderRadius: 'inherit',
    clipPath: 'var(--clip)',
    content: '""',
    inset: 0,
    position: 'absolute',
    zIndex: 1,
  },
})
