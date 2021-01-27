import React from 'react'

import DonationWidget from './components/DonationWidget'
import PaymentResults from './components/PaymentResults'
import { useHasPaymentResults } from './hooks/usePaymentResults'

export default function App() {
  const hasPaymentResults = useHasPaymentResults()

  if (hasPaymentResults) {
    return <PaymentResults />
  }

  return <DonationWidget />
}
