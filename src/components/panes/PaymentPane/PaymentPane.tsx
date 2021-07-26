import React from 'react'

import { PaymentMethod } from '../../../constants/enums/PaymentMethod'
import useTypedSelector from '../../../hooks/store/useTypedSelector'

import Bank from './Bank'
import Swish from './Swish'

export function PaymentPane() {
  const { method } = useTypedSelector((state) => state.donation)

  switch (method) {
    case PaymentMethod.Bank:
      return <Bank />
    case PaymentMethod.Swish:
      return <Swish />
    default:
      return <div>Invalid payment method</div>
  }
}
