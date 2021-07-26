import React from 'react'

import { SwishPaymentStatus } from '../../@types/import/api/payment.types'
import { PaymentMethod } from '../../constants/enums/PaymentMethod'
import useTypedSelector from '../../hooks/store/useTypedSelector'

import PaymentCreated from './components/PaymentCreated'
import PaymentFailed from './components/PaymentFailed'
import PaymentSuccess from './components/PaymentSuccess'

interface PaymentProps {
  status: SwishPaymentStatus
}

export default function Payment({ status }: PaymentProps) {
  const { method } = useTypedSelector((state) => state.donation)
  if (method === PaymentMethod.Bank) {
    return <PaymentSuccess />
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
