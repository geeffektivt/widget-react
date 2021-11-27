import { ChangeEvent } from 'react'

import { styled } from '../../../styles/stitches.config'

export interface TextInputProps extends TextInputWrapperProps {
  type: string
  name?: string
  placeholder?: string
  defaultValue?: string | number
  selectOnClick?: boolean
  innerRef?: React.Ref<HTMLInputElement>
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  value?: string | number | readonly string[]
  inputMode?: 'tel' | 'decimal' | 'text' | 'numeric' | 'email'
  valid?: boolean
  showWarning?: boolean
  label?: string
  denomination?: string
}

export interface TextInputWrapperProps {
  valid?: boolean
}

export const Label = styled('span', {
  height: '100%',
  position: 'absolute',
  left: '12px',
  top: '0',
  color: 'black',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 'normal',
})

export const TextInputWrapper = styled('div', {
  display: 'block',
  marginBottom: '5px',
  marginTop: '5px',
  fontSize: '1em',
  borderRadius: '5px',
  boxSizing: 'border-box',
  position: 'relative',

  transition: 'box-shadow 180ms',
  '&::focus-within': {
    boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.3)',
  },
  variants: {
    valid: {
      true: {
        border: '1px solid $grey18',
      },
      false: {
        border: '1px solid red',
      },
    },
  },
})

export const Denomination = styled('span', {
  height: '100%',
  position: 'absolute',
  right: '12px',
  top: '0',
  color: '$grey18',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 'normal',
})

export const TextInputField = styled('input', {
  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    appearance: 'none',
    margin: '0',
  },
  '&[type="number"]': {
    appearance: 'textfield',
  },
  fontSize: 'inherit',
  padding: '1.3em',
  border: 'none',
  boxSizing: 'border-box',
  width: '100%',
  background: 'transparent',
  boxShadow: 'none',
  position: 'relative',
  zIndex: '2',
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

export const WarningContainer = styled('div', {
  padding: '1.3em',
  position: 'absolute',
  right: '0',
  top: '0',
})
