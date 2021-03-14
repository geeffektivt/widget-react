import { css, keyframes } from '../../../styles/stitches.config'

const ldsEllipsis1 = keyframes({
  '0%': { transform: 'scale(0)' },
  '100%': { transform: 'scale(1)' },
})

const ldsEllipsis2 = keyframes({
  '0%': { transform: 'translate(0, 0)' },
  '100%': { transform: 'translate(24px, 0)' },
})

const ldsEllipsis3 = keyframes({
  '0%': { transform: 'scale(1)' },
  '100%': { transform: 'scale(0)' },
})

export const spinner = css({
  height: '80px',
  margin: '0 auto',
  position: 'relative',
  width: '80px',

  div: {
    backgroundColor: '$grey700',
    borderRadius: '50%',
    height: '13px',
    position: 'absolute',
    top: '33px',
    width: '13px',
  },

  'div:nth-child(1)': {
    animation: `${ldsEllipsis1} 0.6s infinite`,
    left: '8px',
  },

  'div:nth-child(2)': {
    animation: `${ldsEllipsis2} 0.6s infinite`,
    left: '8px',
  },

  'div:nth-child(3)': {
    animation: `${ldsEllipsis2} 0.6s infinite`,
    left: '32px',
  },

  'div:nth-child(4)': {
    animation: `${ldsEllipsis3} 0.6s infinite`,
    left: '56px',
  },
})
