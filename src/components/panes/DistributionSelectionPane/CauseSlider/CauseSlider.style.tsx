import { styled } from '../../../../styles/stitches.config'

export const FlexContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
})

export const AccordionContainer = styled(FlexContainer, {
  justifyContent: 'space-between',
})

export const LockButton = styled('button', {
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
})
