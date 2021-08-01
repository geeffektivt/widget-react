import { styled } from '../../../styles/stitches.config'

export const ReferralsWrapper = styled('div', {
  margin: '$s200 0',
})

export const ReferralButtonsWrapper = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: '$s75',
})

export const ReferralButton = styled('button', {
  backgroundColor: '$white',
  border: '1px solid',
  borderColor: '$primary100',
  cursor: 'pointer',
  fontSize: '$14',
  padding: '$s100',

  '&:hover': {
    backgroundColor: '$primary100',
    color: '$white',
    opacity: '0.4',
  },

  variants: {
    selected: {
      true: {
        backgroundColor: '$primary100',
        color: '$white',
      },
    },
  },
})
