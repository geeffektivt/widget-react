import { styled } from '../../../../styles/stitches.config'

export const FlexContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
})

export const AccordionContainer = styled(FlexContainer, {
  justifyContent: 'space-between',

  variants: {
    hasOrganizations: {
      false: {
        borderTop: '1px solid $grey200',
        marginTop: '$s200',
        paddingTop: '$s200',
      },
    },
  },
})

export const LockButton = styled('button', {
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
})
