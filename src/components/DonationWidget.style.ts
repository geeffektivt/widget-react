import { styled } from '../styles/stitches.config'

export const DonationWidgetWrapper = styled('div', {
  fontFamily: 'Roboto,Arial,sans-serif',
  fontWeight: 300,

  '& *, & ::after, & ::before': {
    boxSizing: 'border-box',
  },
})
