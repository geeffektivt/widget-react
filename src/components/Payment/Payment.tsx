import React, { ReactNode } from 'react'

import { CenteredContainer, Pane } from '../panes/Panes.style'
import Heading from '../shared/_typography/Heading'
import Text from '../shared/_typography/Text'

interface PaymentProps {
  title: string
  description: string
  children: ReactNode
}

export default function Payment({
  title,
  description,
  children,
}: PaymentProps) {
  return (
    <Pane>
      <CenteredContainer>
        <Heading>{title}</Heading>
        <Text>{description}</Text>
        {children}
      </CenteredContainer>
    </Pane>
  )
}
