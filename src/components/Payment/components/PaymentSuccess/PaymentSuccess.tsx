import React from 'react'

import Accordion, { AccordionItem } from '../../../shared/Accordion'
import CheckCircle from '../../../shared/_svg/CheckCircle'
import Heading from '../../../shared/_typography/Heading'
import Text from '../../../shared/_typography/Text'

import * as styles from './PaymentSuccess.styles'

export default function PaymentSuccess() {
  const title = 'Payment success'
  const description = 'Thanks!'

  const accordionItems = [
    { id: 'id-1', title: 'Item 1', content: 'Content 1' },
    { id: 'id-2', title: 'Item 2', content: 'Content 2' },
    { id: 'id-3', title: 'Item 3', content: 'Content 3' },
    { id: 'id-4', title: 'Item 4', content: 'Content 4' },
  ]

  return (
    <>
      <Heading className={styles.title()}>{title}</Heading>

      <Text className={styles.description()}>{description}</Text>

      <CheckCircle className={styles.icon()} />

      <Accordion>
        {accordionItems.map((item) => (
          <AccordionItem key={item.id} id={item.id} title={item.title}>
            {item.content}
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}
