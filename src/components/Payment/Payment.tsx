import React from 'react'

import { SwishPaymentStatus } from '../../@types/import/api/payment.types'
import useTypedSelector from '../../hooks/store/useTypedSelector'

import PaymentCreated from './components/PaymentCreated'
import PaymentFailed from './components/PaymentFailed'
import PaymentSuccess from './components/PaymentSuccess'

interface PaymentProps {
  status: SwishPaymentStatus
}

export default function Payment({ status }: PaymentProps) {
  const { isPollingStatus } = useTypedSelector((state) => state.payment)
  if (isPollingStatus) {
    return <PaymentCreated />
  }
  switch (status) {
    case 'STARTED':
    case 'CREATED':
      return <PaymentCreated />

    case 'ERROR':
    case 'CANCELLED':
    case 'DECLINED':
      return <PaymentFailed />

    case 'PAID':
      return <PaymentSuccess />

    default:
      return null
  }
}
