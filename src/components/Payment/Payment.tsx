import React from 'react'

import { PaymentStatus } from '../../types/Enums'

import PaymentFailed from './components/PaymentFailed'
import PaymentStarted from './components/PaymentStarted'
import PaymentSuccess from './components/PaymentSuccess'

interface PaymentProps {
  status: PaymentStatus
}

export default function Payment({ status }: PaymentProps) {
  switch (status) {
    case PaymentStatus.Started:
      return <PaymentStarted />

    case PaymentStatus.Failed:
      return <PaymentFailed />

    case PaymentStatus.Success:
      return <PaymentSuccess />

    default:
      return null
  }
}
