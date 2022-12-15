import { PlusCircledIcon } from '@radix-ui/react-icons'

import { styled } from '../../../styles/stitches.config'

export const AddButtonContainer = styled('button', {
  alignItems: 'center',
  marginTop: '$s150',
  marginBottom: '$s400',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '$s75',
  gap: '$s75',
  border: '1px solid $primary100',
  borderRadius: '48px',
  color: '$primary100',
  backgroundColor: '$white',
  display: 'flex',
  fontSize: '$16',
  fontWeight: '$600',
  height: 40,
  justifyContent: 'left',
  width: 'fit-content',
  transition:
    'height maxWidth 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out',

  '@media(hover: hover) and (pointer: fine)': {
    '&:hover': {
      border: '3px solid $primary100',
      color: '$primary100',
      height: 44,
      fontSize: '1.2rem',
    },
  },

  '&:disabled': {
    backgroundColor: '$grey20',
    color: '$grey14',
  },

  '&:not(:disabled)': {
    cursor: 'pointer',
  },
})

export const AddButtonIcon = styled(PlusCircledIcon, {
  width: '16px',
  height: '16px',
})
