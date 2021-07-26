import React from 'react'

import { BankPaymentRequest } from '../../../../@types/import/api/payment.types'
import { DonationStep } from '../../../../constants/enums/DonationStep'
import { DonorType } from '../../../../constants/enums/DonorType'
import { DonationFrequency } from '../../../../constants/enums/RecurringDonation'
import useAllCauses from '../../../../hooks/content/useAllCauses'
import useAllTexts from '../../../../hooks/content/useAllTexts'
import useTypedDispatch from '../../../../hooks/store/useTypedDispatch'
import useTypedSelector from '../../../../hooks/store/useTypedSelector'
import useOnMount from '../../../../hooks/utils/useOnMount'
import { donationActions } from '../../../../store/donation/donation.slice'
import { getCharitiesWithNames } from '../../../../store/payment/payment.api'
import { paymentAsyncActions } from '../../../../store/payment/payment.slice'
import { uiActions } from '../../../../store/ui/ui.slice'
import { NextButton } from '../../../shared/Buttons/NavigationButtons.style'
import { Pane, PaneTitle } from '../../Panes.style'

import { PaymentDetailsWrapper, DetailsRow, BoldText } from './ResultPane.style'

export default function Bank() {
  const {
    sum,
    recurring,
    donorType,
    donor,
    causesDistribution,
  } = useTypedSelector((state) => state.donation)
  const dispatch = useTypedDispatch()
  const texts = useAllTexts()
  const causes = useAllCauses()
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
    }
    dispatch(paymentAsyncActions.createBankPayment(paymentRequest))
  })

  const handleGoToStart = () => {
    dispatch(donationActions.resetState())
    dispatch(donationActions.resetDistribution(causes))
    dispatch(uiActions.setActiveStep(DonationStep.PaymentMethod))
  }

  return (
    <Pane>
      <PaneTitle>{paymentTexts.title}</PaneTitle>
      {paymentTexts.description}
      <PaymentDetailsWrapper>
        <DetailsRow>
          <BoldText>{paymentTexts.sumTitle}</BoldText>
          <p>{sum}</p>
        </DetailsRow>
        <DetailsRow>
          <BoldText>{paymentTexts.kontonummerTitle}</BoldText>
          <p>{paymentTexts.kontonummer}</p>
        </DetailsRow>
        <DetailsRow>
          <BoldText>{paymentTexts.ocrTitle}</BoldText>
          <p>{paymentTexts.ocr}</p>
        </DetailsRow>
      </PaymentDetailsWrapper>
      {paymentTexts.ocrDescription}
      <NextButton onClick={handleGoToStart}>
        {paymentTexts.goBackTitle}
      </NextButton>
    </Pane>
  )
}
