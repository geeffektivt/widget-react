import React from 'react'

import { PaymentStatus } from '../../types/Enums'
import Payment from '../Payment'
import Dialog from '../shared/Dialog'

export default function Widget() {
  return (
    <Dialog open>
      <Payment status={PaymentStatus.Success} />
    </Dialog>
  )
}
