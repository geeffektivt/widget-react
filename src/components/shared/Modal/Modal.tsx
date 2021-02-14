import {
  Modal as MaterialModal,
  ModalProps as MaterialModalProps,
} from '@material-ui/core'
import React, { ReactNode } from 'react'

import ModalContainer from './styled/ModalContainer.style'
import ModalContent from './styled/ModalContent.style'

interface ModalProps extends Omit<MaterialModalProps, 'children'> {
  children: ReactNode
}

export default function Modal({ children, ...props }: ModalProps) {
  return (
    <MaterialModal {...props}>
      <ModalContainer>
        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </MaterialModal>
  )
}
