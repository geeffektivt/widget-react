import { Root, Item, Header, Button, Panel } from '@radix-ui/react-accordion'

import { styled } from '../../../../styles/stitches.config'

export const CausesAccordion = styled(Root, {})

export const CausesAccordionItem = styled(Item, {
  '&:not(:first-child)': {
    marginTop: '$s150',
  },

  '&:last-child': {
    marginBottom: '$s150',
  },
})

export const CausesAccordionHeader = styled(Header, {})

export const CausesAccordionButton = styled(Button, {
  backgroundColor: 'transparent',
  border: 'none',
  padding: 10,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
})

export const CausesAccordionChevron = styled(Header, {
  transition: 'transform 300ms',
  display: 'inherit',

  '&[data-state="open"]': {
    transform: 'rotate(180deg)',
  },
})

export const CausesAccordionPanel = styled(Panel, {
  padding: '$s100',
  paddingRight: 0,
})
