import React from 'react'

import { BankPaymentRequest } from '../../../../@types/import/api/payment.types'
import { IS_IN_COMPANY_MODE } from '../../../../config'
import { DonorType } from '../../../../constants/enums/DonorType'
import { DonationFrequency } from '../../../../constants/enums/RecurringDonation'
import useAllTexts from '../../../../hooks/content/useAllTexts'
import useTypedDispatch from '../../../../hooks/store/useTypedDispatch'
import useTypedSelector from '../../../../hooks/store/useTypedSelector'
import useOnMount from '../../../../hooks/utils/useOnMount'
import {
  getCharitiesWithNames,
  getReferralName,
} from '../../../../store/payment/payment.api'
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
  const { referral, textInput } = useTypedSelector((state) => state.referrals)
  const dispatch = useTypedDispatch()
  const texts = useAllTexts()
  const paymentTexts = texts.donations.payment
  const tipId = texts.donations.tip.id

  useOnMount(() => {
    const tip = causesDistribution.find((c) => c.id === tipId)?.sum

    const baseRequest = {
      _paymentType: 'bank' as const,
      isAnonymous: donorType === DonorType.Anonymous,
      name: donor?.name,
      email: donor?.email,
      approvesPrivacyPolicy: donor?.approvesPrivacyPolicy,
      doNewsletter: donor?.newsletter,
      charities: getCharitiesWithNames(causesDistribution, tipId),
      tip,
      referral: getReferralName(referral, textInput),
      reoccursMonthly: recurring === DonationFrequency.Monthly,
    }

    const paymentRequest: BankPaymentRequest = IS_IN_COMPANY_MODE
      ? {
          ...baseRequest,
          _sourceType: 'company',
          companyName: donor?.companyName,
          organizationNumber: donor?.organizationNumber,
        }
      : {
          ...baseRequest,
          _sourceType: 'individual',
          doTaxDeduction: donor?.taxDeduction,
          personalNumber: donor?.ssn,
        }

    dispatch(paymentAsyncActions.createBankPayment(paymentRequest))
  })
  const onBackClick = () => {
    dispatch(paymentActions.resetPaymentStatus())
    dispatch(uiActions.goToPreviousStep())
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
