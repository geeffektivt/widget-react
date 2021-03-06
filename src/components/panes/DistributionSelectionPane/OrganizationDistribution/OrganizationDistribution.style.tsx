import { styled } from '../../../../styles/stitches.config'

export const Container = styled('div', {
  '&:not(:last-child)': { paddingBottom: '$s100' },

  variants: {
    isEnabled: {
      false: {
        opacity: '0.25',
      },
    },
  },
})
