import React from 'react'

import DonationWidget from './components/DonationWidget'
import PaymentResults from './components/PaymentResults'
import Widget from './components/Widget'
import { useHasPaymentResults } from './hooks/usePaymentResults'
import { hasUrlParam } from './utils/urlUtils'

export default function App() {
  const hasPaymentResults = useHasPaymentResults()

  const hasDonateParam = hasUrlParam('donate')

  if (hasPaymentResults) {
    return <PaymentResults />
  }

  if (hasDonateParam) {
    return (
      <>
        <Widget />
      </>
    )
  }
  return <DonationWidget />
}
