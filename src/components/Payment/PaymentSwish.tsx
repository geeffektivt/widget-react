import React from 'react'

import { SwishPaymentStatus } from '../../@types/import/api/payment.types'
import useAllTexts from '../../hooks/content/useAllTexts'
import useTypedSelector from '../../hooks/store/useTypedSelector'
import { styled } from '../../styles/stitches.config'
import Spinner from '../shared/Spinner'
import CheckCircle from '../shared/_svg/CheckCircle'
import CloseCircle from '../shared/_svg/CloseCircle'
import SwishLogo from '../shared/_svg/SwishLogo'

import Payment from './Payment'

interface PaymentProps {
  status: SwishPaymentStatus
}

const StyledCheckCircle = styled(CheckCircle, {
  display: 'flex',
  height: 100,
  margin: '$s100 auto',
  width: 100,
})
const StyledLogo = styled(SwishLogo, {
  display: 'flex',
  height: 50,
  margin: '0 auto',
  width: 'auto',
})

export default function PaymentSwish({ status }: PaymentProps) {
  const { isPollingStatus } = useTypedSelector((state) => state.payment.swish)
  const texts = useAllTexts()
  const swishTexts = texts.donations.swish

  if (isPollingStatus) {
    return (
      <Payment
        title={swishTexts.paymentCreatedTitle}
        description={swishTexts.paymentCreatedDescription}
      >
        <>
          <Spinner />
          <StyledLogo />
        </>
      </Payment>
    )
  }
  switch (status) {
    case 'STARTED':
    case 'CREATED':
      return (
        <Payment
          title={swishTexts.paymentCreatedTitle}
          description={swishTexts.paymentCreatedDescription}
        >
          <>
            <Spinner />
            <StyledLogo />
          </>
        </Payment>
      )

    case 'ERROR':
    case 'CANCELLED':
    case 'DECLINED':
      return (
        <Payment
          title={swishTexts.paymentFailedTitle}
          description={swishTexts.paymentFailedDescription}
        >
          <CloseCircle />
        </Payment>
      )

    case 'PAID':
      return (
        <Payment
          title={swishTexts.paymentSuccessTitle}
          description={swishTexts.paymentSuccessDescription}
        >
          <StyledCheckCircle />
        </Payment>
      )

    default:
      return null
  }
}
