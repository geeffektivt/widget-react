import React from 'react'

import { DonationStep } from '../../../../../constants/enums/DonationStep'
import useAllCauses from '../../../../../hooks/content/useAllCauses'
import useAllTexts from '../../../../../hooks/content/useAllTexts'
import useTypedDispatch from '../../../../../hooks/store/useTypedDispatch'
import useTypedSelector from '../../../../../hooks/store/useTypedSelector'
import { donationActions } from '../../../../../store/donation/donation.slice'
import { uiActions } from '../../../../../store/ui/ui.slice'
import { NextButton } from '../../../../shared/Buttons/NavigationButtons.style'
import { Pane, PaneTitle } from '../../../Panes.style'
import {
  PaymentDetailsWrapper,
  DetailsRow,
  BoldText,
} from '../ResultPane.style'

export default function BankPane() {
  const sum = useTypedSelector((state) => state.donation.sum)
  const dispatch = useTypedDispatch()
  const texts = useAllTexts()
  const causes = useAllCauses()
  const paymentTexts = texts.donations.payment
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
