import { styled } from '../../../styles/stitches.config'
import { pxToRem } from '../../../utils/styleUtils'

export const MethodWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

export const TextWrapper = styled('div', {
  display: 'flex',
  marginBottom: '$s100',
  marginTop: '$s100',
})

export const InfoText = styled('p', {
  color: '$grey20',
  fontSize: '$12',
  lineHeight: '150%',
  margin: 0,
})

export const MethodButton = styled('button', {
  alignItems: 'center',
  backgroundColor: '$white',
  border: 0,
  boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.15)',
  boxSizing: 'border-box',
  color: '$grey20',
  display: 'flex',
  fontStyle: 'italic',
  height: pxToRem(80),
  justifyContent: 'flex-end',
  marginBottom: 15,
  paddingRight: '2em',
  position: 'relative',
  transition: 'box-shadow 90ms, opacity 150ms',
  userSelect: 'none',
  width: '100%',

  '&:active': {
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  },

  '&:disabled': {
    opacity: 0.5,
  },

  '&:not(:disabled)': {
    cursor: 'pointer',
  },

  '&::after, &::before': {
    backgroundColor: '$white',
    content: '""',
    height: '30%',
    position: 'absolute',
    right: '$s100',
    width: 2,
  },

  '&::after': {
    top: '50%',
    transform: 'rotate(45deg)',
    transformOrigin: 'center top',
  },

  '&::before': {
    bottom: '50%',
    transform: 'rotate(-45deg)',
    transformOrigin: 'center bottom',
  },

  '&:not(:disabled)::after, &:not(:disabled)::before': {
    backgroundColor: '$primary100',
    transition: 'background-color 150ms',
  },

  variants: {
    paymentType: {
      bank: {
        backgroundImage: `url('https://storage.googleapis.com/widget-react/bank.png')`,
        backgroundPosition: '16px center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '120px 60px',
      },

      swish: {
        backgroundImage: `url('https://storage.googleapis.com/widget-react/swish-logotype.svg')`,
        backgroundPosition: '16px center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '120px 36.5px',
      },
    },
  },
})

export const RecurringSelectWrapper = styled('div', {
  paddingBottom: 15,
  paddingTop: 10,
})
