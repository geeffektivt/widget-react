import React from 'react'

import { SwishPaymentStatus } from '../../@types/import/api/payment.types'
import useAllTexts from '../../hooks/content/useAllTexts'
import useTypedDispatch from '../../hooks/store/useTypedDispatch'
import useTypedSelector from '../../hooks/store/useTypedSelector'
import { paymentActions } from '../../store/payment/payment.slice'
import { styled } from '../../styles/stitches.config'
import { BackButton } from '../shared/Buttons/BackButton'
import { LeftButtonContainer } from '../shared/Buttons/ButtonsContainer'
import Spinner from '../shared/Spinner'
import CloseCircle from '../shared/_svg/CloseCircle'
import SwishLogo from '../shared/_svg/SwishLogo'

import Payment from './Payment'
import { PaymentDone } from './PaymentDone'

interface PaymentProps {
  status: SwishPaymentStatus
}

const StyledLogo = styled(SwishLogo, {
  display: 'flex',
  height: 50,
  margin: '0 auto',
  width: 'auto',
})

export default function PaymentSwish({ status }: PaymentProps) {
  const { isPollingStatus } = useTypedSelector((state) => state.payment.swish)
  const texts = useAllTexts()
  const dispatch = useTypedDispatch()
  const swishTexts = texts.donations.swish
  const onBackClick = () => {
    dispatch(paymentActions.resetPaymentStatus())
    dispatch(paymentActions.resetSwishPayment())
  }
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
          <LeftButtonContainer>
            <BackButton onClick={onBackClick} />
          </LeftButtonContainer>
        </Payment>
      )

    case 'PAID':
      return (
        <PaymentDone
          title={swishTexts.paymentSuccessTitle}
          description={swishTexts.paymentSuccessDescription}
        />
      )

    default:
      return null
  }
}
