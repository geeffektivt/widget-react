import { styled } from '../../../styles/stitches.config'

export const NextButton = styled('button', {
  alignItems: 'center',
  backgroundColor: '$primary100',
  border: 'none',
  borderRadius: '60px',
  color: '$white',
  display: 'flex',
  fontSize: '$16',
  fontWeight: '$600',
  height: 60,
  justifyContent: 'center',
  width: '100%',
  maxWidth: '230px',
  transition:
    'background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out',

  '@media(hover: hover) and (pointer: fine)': {
    '&:hover': {
      backgroundColor: '$white',
      border: '3px solid $primary100',
      color: '$primary100',
    },
  },

  '&:disabled': {
    backgroundColor: '$grey20',
  },

  '&:not(:disabled)': {
    cursor: 'pointer',
  },
})
