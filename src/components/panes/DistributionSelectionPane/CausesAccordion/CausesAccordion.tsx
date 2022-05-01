import { Root, Item, Header, Trigger, Content } from '@radix-ui/react-accordion'

import { keyframes, styled } from '../../../../styles/stitches.config'

export const CausesAccordion = styled(Root, {})

export const CausesAccordionItem = styled(Item, {
  marginTop: '$s150',

  '&:last-child': {
    marginBottom: '$s150',
  },
})

export const CausesAccordionHeader = styled(Header, {})

export const CausesAccordionTrigger = styled(Trigger, {
  backgroundColor: 'transparent',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  color: 'black',
})

export const CausesAccordionChevron = styled(Header, {
  transition: 'transform 300ms',
  display: 'inherit',

  '&[data-state="open"]': {
    transform: 'rotate(180deg)',
  },
})

const open = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-accordion-content-height)' },
})

const close = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: 0 },
})

export const CausesAccordionContent = styled(Content, {
  padding: '$s100',
  paddingRight: 0,
  position: 'relative',
  overflow: 'hidden',
  '&[data-state="open"]': { animation: `${open} 200ms ease-out forwards` },
  '&[data-state="closed"]': { animation: `${close} 200ms ease-out forwards` },
})
