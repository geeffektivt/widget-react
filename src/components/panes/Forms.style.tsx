import { styled } from '../../styles/stitches.config'

export const Container = styled('div', {
  marginBottom: '$s50',
  marginTop: '$s50',
})

export const InputFieldWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})
export const SmallInputFieldWrapper = styled(InputFieldWrapper, {
  fontSize: '$12',
})

export const TextField = styled('input', {
  padding: '$s25',
  display: 'block',
  margin: '$s25',
  fontSize: '$12',
  border: '1px solid $gray18',
  borderRadius: '5px',
  boxSizing: 'border-box',
})

export const CheckboxWrapper = styled('label', {
  alignItems: 'center',
  display: 'flex',
  paddingTop: '$s50',

  '&:hover': {
    cursor: 'pointer',
  },
})

export const CheckBox = styled('input', {
  marginLeft: '$s50',

  '&:hover': {
    cursor: 'pointer',
    opacity: '0.5',
  },
})

export const CheckboxLabel = styled('p', {
  display: 'inline-block',
  fontSize: '$12',
  marginLeft: '$s25',
})
