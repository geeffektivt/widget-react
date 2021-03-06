import { Root, Item, Header, Button, Panel } from '@radix-ui/react-accordion'
import React, { ReactNode } from 'react'

import * as styles from './Accordion.styles'

type AccordionItemType = {
  id: string
  title: string
  children: ReactNode | string
}

export function AccordionItem({ id, title, children }: AccordionItemType) {
  return (
    <Item className={styles.item} key={id} value={id}>
      <Header className={styles.itemHeader}>
        <Button className={styles.itemButton}>{title}</Button>
      </Header>

      <Panel className={styles.itemPanel}>{children}</Panel>
    </Item>
  )
}

interface AccordionProps {
  children: ReactNode
  type?: 'single' | 'multiple'
}

export default function Accordion({
  children,
  type = 'single',
}: AccordionProps) {
  return <Root type={type}>{children}</Root>
}
