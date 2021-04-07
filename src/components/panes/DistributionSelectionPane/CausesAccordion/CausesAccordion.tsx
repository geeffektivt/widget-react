import { Root, Item, Header, Button, Panel } from '@radix-ui/react-accordion'

import { styled } from '../../../../styles/stitches.config'

export const CausesAccordion = styled(Root, {})

export const CausesAccordionItem = styled(Item, {
  '&:not(:first-child)': {
    marginTop: '$s150',
  },
})

export const CausesAccordionHeader = styled(Header, {})

export const CausesAccordionButton = styled(Button, {})

export const CausesAccordionPanel = styled(Panel, {
  padding: '$s100',
  paddingRight: 0,
})
