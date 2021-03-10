import { styled } from '../../../styles/stitches.config'

export const NextButton = styled('button', {
  alignItems: 'center',
  backgroundColor: '$black',
  border: 'none',
  color: '$white',
  display: 'flex',
  fontSize: '$14',
  fontWeight: '$600',
  height: 45,
  justifyContent: 'center',
  marginTop: '$s200',
  width: '100%',

  ':disabled': {
    backgroundColor: '$grey20',
  },

  ':not(:disabled)': {
    cursor: 'pointer',
  },

  ':not(:disabled):hover': {},
})
