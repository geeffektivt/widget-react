import React from 'react'

import { PaymentMethod } from '../../../constants/enums/PaymentMethod'
import useTypedSelector from '../../../hooks/store/useTypedSelector'

import BankPane from './Bank/BankPane'
import Swish from './Swish'

export function PaymentPane() {
  const method = useTypedSelector((state) => state.donation.method)

  switch (method) {
    case PaymentMethod.Bank:
      return <BankPane />
    case PaymentMethod.Swish:
      return <Swish />
    default:
      return <div>Invalid payment method</div>
  }
}
