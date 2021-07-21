import React from 'react'

import { SwishPaymentStatus } from '../../@types/import/api/swish.types'

import PaymentFailed from './components/PaymentFailed'
import PaymentStarted from './components/PaymentStarted'
import PaymentSuccess from './components/PaymentSuccess'

interface PaymentProps {
  status: SwishPaymentStatus
}

export default function Payment({ status }: PaymentProps) {
  switch (status) {
    case 'CREATED':
      return <PaymentStarted />

    case 'STARTED':
      return <PaymentStarted />

    case 'ERROR':
      return <PaymentFailed />

    case 'CANCELLED':
      return <PaymentFailed />

    case 'DECLINED':
      return <PaymentFailed />

    case 'PAID':
      return <PaymentSuccess />

    default:
      return null
  }
}
