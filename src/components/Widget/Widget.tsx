import React from 'react'

import { PaymentStatus } from '../../types/Enums'
import Payment from '../Payment'
import Modal from '../shared/Modal'

export default function Widget() {
  return (
    <Modal open>
      <Payment status={PaymentStatus.Started} />
    </Modal>
  )
}
