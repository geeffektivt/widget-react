import React from 'react'

import { DonationStep } from '../../../../constants/enums/DonationStep'
import { DonationFrequency } from '../../../../constants/enums/RecurringDonation'
import useAllCauses from '../../../../hooks/content/useAllCauses'
import useAllTexts from '../../../../hooks/content/useAllTexts'
import useTypedDispatch from '../../../../hooks/store/useTypedDispatch'
import useTypedSelector from '../../../../hooks/store/useTypedSelector'
import { donationActions } from '../../../../store/donation/donation.slice'
import { paymentActions } from '../../../../store/payment/payment.slice'
import { referralsActions } from '../../../../store/referrals/referrals.slice'
import { uiActions } from '../../../../store/ui/ui.slice'
import { NavigationButtons } from '../../../shared/Buttons/NavigationButtons'
import {
  Pane,
  PaneTitle,
  DetailsWrapper,
  DetailsRow,
  BoldText,
} from '../../Panes.style'

export default function BankSingle() {
  const dispatch = useTypedDispatch()
  const { sum, recurring } = useTypedSelector((state) => state.donation)
  const { createPaymentResponse } = useTypedSelector((state) => state.payment)
  const causes = useAllCauses()

  const texts = useAllTexts()
  const paymentTexts = texts.donations.payment

  const handleGoToStart = () => {
    dispatch(donationActions.resetState())
    dispatch(donationActions.resetDistribution(causes))
    dispatch(paymentActions.resetState())
    dispatch(referralsActions.resetState())
    dispatch(uiActions.setActiveStep(DonationStep.PaymentMethod))
  }
  return (
    <Pane>
      <PaneTitle>{paymentTexts.title}</PaneTitle>
      {paymentTexts.descriptionSingle}
      <DetailsWrapper>
        <DetailsRow>
          <BoldText>{paymentTexts.sumTitle}</BoldText>
          <p>{sum}</p>
        </DetailsRow>
        <DetailsRow>
          <BoldText>{paymentTexts.kontonummerTitle}</BoldText>
          <p>{paymentTexts.kontonummer}</p>
        </DetailsRow>
        <DetailsRow>
          <BoldText>
            {recurring === DonationFrequency.Monthly
              ? paymentTexts.referenceTitleRecurring
              : paymentTexts.referenceTitleSingle}
          </BoldText>
          <p>{createPaymentResponse?.reference}</p>
        </DetailsRow>
      </DetailsWrapper>
      {paymentTexts.recurringSuggestion}
      <NavigationButtons
        nextButtonTitle={paymentTexts.goBackButtonTitle}
        nextButtonOnClick={handleGoToStart}
        showBackButton={false}
      />
    </Pane>
  )
}
