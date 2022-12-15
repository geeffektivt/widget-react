import { CrossCircledIcon } from '@radix-ui/react-icons'

import { styled } from '../../../styles/stitches.config'

export const CloseButtonContainer = styled('button', {
  color: '$primary100',
  border: 'none',
  backgroundColor: '$white',
  display: 'flex',
  marginLeft: 'auto',
  marginTop: '$s75',
  marginBottom: '$s75',
  padding: '0px',
  justifyContent: 'right',
  width: 'fit-content',
  height: 'fit-content',
  cursor: 'pointer',
})

export const CloseButtonIcon = styled(CrossCircledIcon, {
  width: '24px',
  height: '24px',
  borderRadius: '24px',
  transition: 'color 0.2s ease-in-out, backgroundColor 0.2s ease-in-out',

  '@media(hover: hover) and (pointer: fine)': {
    '&:hover': {
      color: '$white',
      backgroundColor: '$primary100',
    },
  },
})
