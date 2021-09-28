import React from 'react'

import { BankPaymentRequest } from '../../../../@types/import/api/payment.types'
import { DonorType } from '../../../../constants/enums/DonorType'
import { DonationFrequency } from '../../../../constants/enums/RecurringDonation'
import useAllTexts from '../../../../hooks/content/useAllTexts'
import useTypedDispatch from '../../../../hooks/store/useTypedDispatch'
import useTypedSelector from '../../../../hooks/store/useTypedSelector'
import useOnMount from '../../../../hooks/utils/useOnMount'
import { getCharitiesWithNames } from '../../../../store/payment/payment.api'
import {
  paymentActions,
  paymentAsyncActions,
} from '../../../../store/payment/payment.slice'
import { uiActions } from '../../../../store/ui/ui.slice'
import { BackButton } from '../../../shared/Buttons/BackButton'
import { LeftButtonContainer } from '../../../shared/Buttons/ButtonsContainer'
import Spinner from '../../../shared/Spinner'
import CloseCircle from '../../../shared/_svg/CloseCircle'
import Heading from '../../../shared/_typography/Heading'
import { Pane, CenteredContainer } from '../../Panes.style'

import BankMonthly from './BankMonthly'
import BankSingle from './BankSingle'

export default function Bank() {
  const { recurring, donorType, donor, causesDistribution } = useTypedSelector(
    (state) => state.donation
  )

  const { paymentStatus, isCreatingPayment } = useTypedSelector(
    (state) => state.payment
  )
  const { referral } = useTypedSelector((state) => state.referrals)
  const dispatch = useTypedDispatch()
  const texts = useAllTexts()
  const paymentTexts = texts.donations.payment

  useOnMount(() => {
    const paymentRequest: BankPaymentRequest = {
      isAnonymous: donorType === DonorType.Anonymous,
      name: donor?.name,
      email: donor?.email,
      doTaxDeduction: donor?.taxDeduction,
      personalNumber: donor?.ssn.toString(),
      approvesPrivacyPolicy: donor?.approvesPrivacyPolicy,
      doNewsletter: donor?.newsletter,
      charities: getCharitiesWithNames(causesDistribution),
      reoccursMonthly: recurring === DonationFrequency.Monthly,
      referral: referral?.name,
    }
    dispatch(paymentAsyncActions.createBankPayment(paymentRequest))
  })
  const onBackClick = () => {
    dispatch(paymentActions.resetPaymentStatus())
    dispatch(uiActions.goToPreviousStep())
    window.parent.postMessage('ScrollToTop', 'https://geeffektivt.se/')
  }

  if (isCreatingPayment) {
    return <Spinner />
  }

  switch (paymentStatus) {
    case 'STARTED':
      return <Spinner />
    case 'CREATED':
    case 'PAID':
      return recurring === DonationFrequency.Monthly ? (
        <BankMonthly />
      ) : (
        <BankSingle />
      )
    case 'ERROR':
    case 'CANCELLED':
    case 'DECLINED':
      return (
        <Pane>
          <CenteredContainer>
            <Heading>{paymentTexts.errorTitle}</Heading>
            {paymentTexts.errorDescription}
            <CloseCircle />
            <LeftButtonContainer>
              <BackButton onClick={onBackClick} />
            </LeftButtonContainer>
          </CenteredContainer>
        </Pane>
      )

    default:
      return null
  }
}
