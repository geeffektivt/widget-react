import { styled } from '../../../styles/stitches.config'

export const ReferralsWrapper = styled('div', {
  margin: '$s200 0',
})

export const ReferralButtonsWrapper = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: '$s75',
})

export const TextInput = styled('input', {
  borderRadius: '5px',
  backgroundColor: '$white',
  border: '1px solid',
  borderColor: '$primary100',
  fontSize: '$14',
  padding: '$s100',

  variants: {
    selected: {
      true: {
        backgroundColor: '$primary100',
        color: '$white',

        '&::placeholder': {
          color: '$white',
          opacity: '0.7',
        },
      },
    },
  },
})

export const ReferralButton = styled('button', {
  textAlign: 'left',
  borderRadius: '5px',
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
