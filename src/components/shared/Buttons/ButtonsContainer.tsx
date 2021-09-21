import { styled } from '../../../styles/stitches.config'

const ButtonsContainer = styled('div', {
  marginTop: '$s200',
  display: 'flex',
  justifyContent: 'center',

  variants: {
    showBackButton: {
      true: {
        justifyContent: 'space-between',
      },
    },
  },
})

export const LeftButtonContainer = styled('div', {
  alignSelf: 'start',
})

export default ButtonsContainer
