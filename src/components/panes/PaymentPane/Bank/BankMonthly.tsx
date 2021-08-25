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
import Chevron from '../../../shared/_svg/Chevron'
import { CauseTitle } from '../../DistributionSelectionPane/CauseDistribution/CauseDistribution.style'
import {
  CausesAccordion,
  CausesAccordionItem,
  CausesAccordionHeader,
  CausesAccordionButton,
  CausesAccordionChevron,
  CausesAccordionPanel,
} from '../../DistributionSelectionPane/CausesAccordion'
import {
  Pane,
  Paragraph,
  PrimaryLink,
  PaneTitle,
  DetailsWrapper,
  DetailsRow,
  BoldText,
} from '../../Panes.style'

export default function BankMonthly() {
  const { sum, recurring } = useTypedSelector((state) => state.donation)
  const causes = useAllCauses()
  const dispatch = useTypedDispatch()

  const { createPaymentResponse } = useTypedSelector((state) => state.payment)
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
      {paymentTexts.descriptionMonthly}
      <CausesAccordion type="single">
        <CausesAccordionItem value="A">
          <CausesAccordionHeader>
            <CausesAccordionButton>
              <CausesAccordionChevron>
                <Chevron />
              </CausesAccordionChevron>
              <CauseTitle>{paymentTexts.altATitle}</CauseTitle>
            </CausesAccordionButton>
          </CausesAccordionHeader>
          <CausesAccordionPanel>
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
          </CausesAccordionPanel>
        </CausesAccordionItem>
        <CausesAccordionItem value="B">
          <CausesAccordionHeader>
            <CausesAccordionButton>
              <CausesAccordionChevron>
                <Chevron />
              </CausesAccordionChevron>
              <CauseTitle>{paymentTexts.altBTitle}</CauseTitle>
            </CausesAccordionButton>
          </CausesAccordionHeader>
          <CausesAccordionPanel>
            <Paragraph>{paymentTexts.altBDescription}</Paragraph>
            <Paragraph>
              Använd där
              <BoldText>{` ditt betalarnummmer: ${createPaymentResponse?.reference}`}</BoldText>
            </Paragraph>
            <PrimaryLink href={paymentTexts.altBLink}>
              {paymentTexts.altBLinkText}
            </PrimaryLink>
          </CausesAccordionPanel>
        </CausesAccordionItem>
        <CausesAccordionItem value="C">
          <CausesAccordionHeader>
            <CausesAccordionButton>
              <CausesAccordionChevron>
                <Chevron />
              </CausesAccordionChevron>
              <CauseTitle>{paymentTexts.altCTitle}</CauseTitle>
            </CausesAccordionButton>
          </CausesAccordionHeader>
          <CausesAccordionPanel>
            <Paragraph>{paymentTexts.altCDescription}</Paragraph>
            <Paragraph>{paymentTexts.altCWarning}</Paragraph>
          </CausesAccordionPanel>
        </CausesAccordionItem>
      </CausesAccordion>
      <NavigationButtons
        nextButtonTitle={paymentTexts.goBackTitle}
        nextButtonOnClick={handleGoToStart}
        showBackButton={false}
      />
    </Pane>
  )
}
