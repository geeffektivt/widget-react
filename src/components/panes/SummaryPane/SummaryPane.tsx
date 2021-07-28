import React from 'react'

import { DonorType } from '../../../constants/enums/DonorType'
import { DonationFrequency } from '../../../constants/enums/RecurringDonation'
import useAllTexts from '../../../hooks/content/useAllTexts'
import useTypedDispatch from '../../../hooks/store/useTypedDispatch'
import useTypedSelector from '../../../hooks/store/useTypedSelector'
import { getCharitiesWithNames } from '../../../store/payment/payment.api'
import { uiActions } from '../../../store/ui/ui.slice'
import { NextButton } from '../../shared/Buttons/NavigationButtons.style'
import {
  Pane,
  PaneTitle,
  DetailsWrapper,
  DetailsRow,
  BoldText,
  DetailsSubRow,
} from '../Panes.style'

const SummaryPane = () => {
  const {
    donor,
    sum,
    causesDistribution,
    donorType,
    method,
    recurring,
  } = useTypedSelector((state) => state.donation)
  const dispatch = useTypedDispatch()
  const texts = useAllTexts()
  const summaryTexts = texts.donations.summary
  const donorTexts = texts.donations.donor
  const handleSubmit = () => dispatch(uiActions.goToNextStep())

  return (
    <Pane>
      <PaneTitle>{summaryTexts.title}</PaneTitle>
      <DetailsWrapper>
        <DetailsRow>
          <BoldText>{summaryTexts.paymentMethodTitle}</BoldText>
          <p>{method}</p>
        </DetailsRow>
        <DetailsRow>
          <BoldText>{summaryTexts.recurringTitle}</BoldText>
          <p>
            {recurring === DonationFrequency.Monthly
              ? summaryTexts.recurringYes
              : summaryTexts.recurringNo}
          </p>
        </DetailsRow>
        {donor && donorType === DonorType.Donor && (
          <>
            <DetailsRow>
              <BoldText>{donorTexts.namePlaceholder}</BoldText>
              <p>{donor.name}</p>
            </DetailsRow>
            <DetailsRow>
              <BoldText>{donorTexts.emailPlaceholder}</BoldText>
              <p>{donor.email}</p>
            </DetailsRow>
            <DetailsRow>
              <BoldText>{donorTexts.taxDeductionLabel}</BoldText>
              <p>
                {donor.taxDeduction
                  ? summaryTexts.yesLabel
                  : summaryTexts.noLabel}
              </p>
            </DetailsRow>
            <DetailsRow>
              <BoldText>{donorTexts.ssnPlaceholder}</BoldText>
              <p>{donor.ssn}</p>
            </DetailsRow>
            <DetailsRow>
              <BoldText>{donorTexts.newsletterLabel}</BoldText>
              <p>
                {donor.newsletter
                  ? summaryTexts.yesLabel
                  : summaryTexts.noLabel}
              </p>
            </DetailsRow>
          </>
        )}
        <DetailsRow>
          <BoldText>{summaryTexts.sumTitle}</BoldText>
          <p>{sum}</p>
        </DetailsRow>
        {getCharitiesWithNames(causesDistribution).map((c) => (
          <DetailsSubRow key={c.name}>
            <p>{c.name}</p>
            <p>{`${c.sum} kr`}</p>
          </DetailsSubRow>
        ))}
      </DetailsWrapper>
      <NextButton onClick={handleSubmit}>{summaryTexts.submitLabel}</NextButton>
    </Pane>
  )
}

export default SummaryPane
