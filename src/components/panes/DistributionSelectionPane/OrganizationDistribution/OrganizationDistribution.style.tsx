import { styled } from '../../../../styles/stitches.config'

export const Container = styled('div', {
  '&:not(:last-child)': { paddingBottom: '$s100' },
})
