import React from 'react'

import { PaymentStatus } from '../../constants/enums/PaymentStatus'
import Payment from '../Payment'
import Dialog from '../shared/Dialog'

export default function Widget() {
  return (
    <Dialog open>
      <Payment status={PaymentStatus.Success} />
    </Dialog>
  )
}
