import React from 'react'
import { useSelector } from 'react-redux'

import { State } from '../../../store/state'
import { PaymentMethod } from '../../../types/Enums'

import { ResultPane } from './Bank/ResultPane'
import Swish from './Swish'

export function PaymentPane() {
  const method = useSelector((state: State) => state.donation.method)

  switch (method) {
    case PaymentMethod.Bank:
      return <ResultPane />
    case PaymentMethod.Swish:
      return <Swish />
    default:
      return <div>Invalid payment method</div>
  }
}
