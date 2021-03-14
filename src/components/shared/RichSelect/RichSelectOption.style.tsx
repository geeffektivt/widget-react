import { styled } from '../../../styles/stitches.config'

export const Wrapper = styled('div', {
  borderBottom: '1px solid $grey14',
})

export const LabelWrapper = styled('label', {
  cursor: 'pointer',
  display: 'flex',
  padding: '16px 0',
  userSelect: 'none',
})

export const HiddenInput = styled('input', {
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '1px',
})

export const RadioBall = styled('span', {
  background: 'white',
  borderRadius: '50%',
  height: 24,
  position: 'relative',
  width: 24,

  '&::after': {
    border: '1px solid $grey18',
    borderRadius: '50%',
    boxSizing: 'border-box',
    content: '""',
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    transition: 'border 100ms',
    width: '100%',
  },

  [`${HiddenInput}:focus + &`]: {
    '&::after': {
      outline: '1px solid black',
    },
  },

  [`${HiddenInput}:checked + &`]: {
    '&::after': {
      border: '7px solid $primary100',
    },
  },
})

export const HeaderWrapper = styled('span', {
  marginLeft: 10,
  paddingTop: 4,
})

export const HeaderLabel = styled('span', {
  display: 'block',
  fontSize: 14,
  fontWeight: 600,
})

export const HeaderSubLabel = styled('span', {
  color: '$grey20',
  fontSize: 11,
  fontWeight: 300,
})

export const Content = styled('div', {
  boxSizing: 'border-box',
})
