import React from 'react'

import { PaymentStatus } from '../../types/Enums'
import Spinner from '../shared/Spinner'
import SwishLogo from '../shared/_svg/SwishLogo'

interface PaymentProps {
  status: PaymentStatus
}

export default function Payment({ status }: PaymentProps) {
  switch (status) {
    case PaymentStatus.Started:
      return (
        <>
          <h1>Payment started</h1>

          <Spinner />

          <SwishLogo />
        </>
      )

    case PaymentStatus.Failed:
      return <h1>Payment failed</h1>

    case PaymentStatus.Success:
      return <h1>Payment suceess</h1>

    default:
      return null
  }
}
