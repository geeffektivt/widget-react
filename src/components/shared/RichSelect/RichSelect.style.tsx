import { styled } from '../../../styles/stitches.config'

export const RichSelectWrapper = styled('div', {
  borderRadius: 5,
  padding: '0 12px',
  border: '1px solid $grey18',

  '& > :last-child': {
    borderBottom: 'none',
  },
})
