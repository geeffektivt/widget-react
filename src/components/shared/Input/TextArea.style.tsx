import { styled } from '../../../styles/stitches.config'

import { GeneralInputProps } from './TextInput.style'

export interface TextAreaProps extends GeneralInputProps<HTMLTextAreaElement> {
  valid?: boolean
}

export const TextAreaField = styled('textarea', {
  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    appearance: 'none',
    margin: '0',
  },
  '&[type="number"]': {
    appearance: 'textfield',
  },
  fontSize: '1rem',
  padding: '1.3em',
  border: 'none',
  boxSizing: 'border-box',
  height: '300px',
  width: '100%',
  background: 'transparent',
  boxShadow: 'none',
  position: 'relative',
  zIndex: '2',
  resize: 'none',
  borderRadius: '5px',
  display: 'block',
  transition: 'box-shadow 180ms',
  '&:focus': {
    outline: 'none',
    boxShadow: '0px 0px 0px 1.5px $secondary200',
  },

  variants: {
    denomination: {
      true: {
        paddingRight: '30px',
      },
    },
    label: {
      true: {
        textAlign: 'right',
      },
      false: {
        textAlign: 'left',
      },
    },
  },
})
