import {
  DialogProps as DialogOwnProps,
  Root,
  Trigger,
  Overlay,
  Content,
  Close,
} from '@radix-ui/react-dialog'
import React, { ReactNode } from 'react'

import * as styles from './Dialog.styles'

interface DialogProps extends DialogOwnProps {
  close?: ReactNode | string
  trigger?: ReactNode | string

  children: ReactNode
}

export default function Dialog({
  close,
  trigger,

  children,

  ...dialogOwnProps
}: DialogProps) {
  return (
    <Root {...dialogOwnProps}>
      {trigger && <Trigger>{trigger}</Trigger>}

      <Overlay className={styles.overlay()} />

      <Content className={styles.content()}>
        {children}

        {close && <Close>{close}</Close>}
      </Content>
    </Root>
  )
}
