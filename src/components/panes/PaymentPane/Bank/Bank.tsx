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
import {
  paymentActions,
  paymentAsyncActions,
} from '../../../../store/payment/payment.slice'
import { referralsActions } from '../../../../store/referrals/referrals.slice'
import { uiActions } from '../../../../store/ui/ui.slice'
import { NavigationButtons } from '../../../shared/Buttons/NavigationButtons'
import Spinner from '../../../shared/Spinner'
import CloseCircle from '../../../shared/_svg/CloseCircle'
import Heading from '../../../shared/_typography/Heading'
import {
  Pane,
  CenteredContainer,
  PaneTitle,
  DetailsWrapper,
  DetailsRow,
  BoldText,
} from '../../Panes.style'

export default function Bank() {
  const {
    sum,
    recurring,
    donorType,
    donor,
    causesDistribution,
  } = useTypedSelector((state) => state.donation)

  const {
    paymentStatus,
    isCreatingPayment,
    createPaymentResponse,
  } = useTypedSelector((state) => state.payment)
  const { referral } = useTypedSelector((state) => state.referrals)
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
      referral: referral?.name,
    }
    dispatch(paymentAsyncActions.createBankPayment(paymentRequest))
  })

  const handleGoToStart = () => {
    dispatch(donationActions.resetState())
    dispatch(donationActions.resetDistribution(causes))
    dispatch(paymentActions.resetState())
    dispatch(referralsActions.resetState())
    dispatch(uiActions.setActiveStep(DonationStep.PaymentMethod))
  }

  if (isCreatingPayment) {
    return <Spinner />
  }

  switch (paymentStatus) {
    case 'STARTED':
    case 'CREATED':
    case 'PAID':
      return (
        <Pane>
          <PaneTitle>{paymentTexts.title}</PaneTitle>
          {paymentTexts.description}
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
          {recurring === DonationFrequency.Monthly
            ? paymentTexts.referenceTitleRecurringDescription
            : paymentTexts.referenceTitleSingleDescription}
          <NavigationButtons
            nextButtonTitle={paymentTexts.goBackTitle}
            nextButtonOnClick={handleGoToStart}
            showBackButton={false}
          />
        </Pane>
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
          </CenteredContainer>
        </Pane>
      )

    default:
      return null
  }
}
