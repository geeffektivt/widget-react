import { styled } from '../../../styles/stitches.config'

export const NextButton = styled('button', {
  alignItems: 'center',
  backgroundColor: '$black',
  border: 'none',
  borderRadius: '60px',
  color: '$white',
  display: 'flex',
  fontSize: '$16',
  fontWeight: '$600',
  height: 60,
  justifyContent: 'center',
  marginTop: '$s200',
  width: '100%',

  '&:disabled': {
    backgroundColor: '$grey20',
  },

  '&:not(:disabled)': {
    cursor: 'pointer',
  },
})
