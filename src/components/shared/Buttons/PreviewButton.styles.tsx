import { EyeOpenIcon } from '@radix-ui/react-icons'

import { styled } from '../../../styles/stitches.config'

export const PreviewButtonContainer = styled('button', {
  position: 'absolute',
  top: '80%',
  left: '50%',
  transform: 'translateX(-50%)',
  alignItems: 'center',
  margin: 'auto',
  padding: '$s75',
  gap: '$s75',
  border: '1px solid $primary100',
  borderRadius: '48px',
  color: '$primary100',
  backgroundColor: '$white',
  display: 'flex',
  fontSize: '$16',
  fontWeight: '$600',
  height: 32,
  justifyContent: 'left',
  width: 'fit-content',
  transition:
    'height maxWidth 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out',

  '@media(hover: hover) and (pointer: fine)': {
    '&:hover': {
      border: '3px solid $primary100',
      color: '$primary100',
      height: 36,
      fontSize: '1.2rem',
    },
  },

  cursor: 'pointer',
})

export const PreviewButtonIcon = styled(EyeOpenIcon, {
  width: '24px',
  height: '24px',
})
