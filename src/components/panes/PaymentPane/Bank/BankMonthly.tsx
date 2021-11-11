import { MenuItem, InputLabel } from '@material-ui/core'
import React, { useState } from 'react'

import { UpdatePaymentRequest } from '../../../../@types/import/api/payment.types'
import TransferDateOptions from '../../../../constants/TransferDateOptions'
import { DonationFrequency } from '../../../../constants/enums/RecurringDonation'
import useAllTexts from '../../../../hooks/content/useAllTexts'
import useTypedDispatch from '../../../../hooks/store/useTypedDispatch'
import useTypedSelector from '../../../../hooks/store/useTypedSelector'
import {
  paymentActions,
  paymentAsyncActions,
} from '../../../../store/payment/payment.slice'
import Payment from '../../../Payment'
import { BackButton } from '../../../shared/Buttons/BackButton'
import { LeftButtonContainer } from '../../../shared/Buttons/ButtonsContainer'
import { NavigationButtons } from '../../../shared/Buttons/NavigationButtons'
import { PrimaryLink } from '../../../shared/Link/PrimaryLink'
import { RichSelect } from '../../../shared/RichSelect/RichSelect'
import { RichSelectOption } from '../../../shared/RichSelect/RichSelectOption'
import Spinner from '../../../shared/Spinner'
import CheckCircle from '../../../shared/_svg/CheckCircle'
import CloseCircle from '../../../shared/_svg/CloseCircle'
import {
  Pane,
  Paragraph,
  PaneTitle,
  DetailsWrapper,
  DetailsRow,
  BoldText,
  CenteredContainer,
  ErrorMessage,
} from '../../Panes.style'

import { StyledSelect } from './BankMonthly.style'

export default function BankMonthly() {
  const [isDirty, setIsDirty] = useState(false)
  const { sum, recurring } = useTypedSelector((state) => state.donation)
  const dispatch = useTypedDispatch()

  const { createPaymentResponse, bank } = useTypedSelector(
    (state) => state.payment
  )
  const {
    preferredTransferDate,
    monthlyPaymentMethod,
    isUpdatingPayment,
    hasUpdatedPayment,
    updatePaymentError,
  } = bank
  const texts = useAllTexts()
  const paymentTexts = texts.donations.payment

  const handleConfirm = () => {
    setIsDirty(true)
    if (monthlyPaymentMethod) {
      const paymentRequest: UpdatePaymentRequest = {
        id: createPaymentResponse?.id ?? '',
        monthlyPaymentMethod: monthlyPaymentMethod ?? '',
        preferredTransferDate,
      }
      dispatch(paymentAsyncActions.updateBankPayment(paymentRequest))
    }
  }
  const handleChange = (value: string) =>
    dispatch(paymentActions.setPreferredTransferDate(value))
  const handlePaymentAlternativeChange = (value: string) =>
    dispatch(paymentActions.setMonthlyPaymentMethod(value))
  const onBackClick = () => dispatch(paymentActions.resetupdatePaymentError())
  if (isUpdatingPayment) {
    return <Spinner />
  }
  if (hasUpdatedPayment) {
    return (
      <Payment
        title={paymentTexts.paymentRegistredTitle}
        description={paymentTexts.paymentRegistredDescription}
      >
        <CheckCircle />
      </Payment>
    )
  }
  if (updatePaymentError) {
    return (
      <Payment
        title={paymentTexts.paymentRegistrationFailedTitle}
        description={paymentTexts.paymentRegistrationFailedDescription}
      >
        <CloseCircle />
        <LeftButtonContainer>
          <BackButton onClick={onBackClick} />
        </LeftButtonContainer>
      </Payment>
    )
  }
  return (
    <Pane>
      <PaneTitle>{paymentTexts.title}</PaneTitle>
      <Paragraph>{paymentTexts.descriptionMonthly}</Paragraph>
      <RichSelect
        name="monthlyPaymentMethod"
        selected={monthlyPaymentMethod}
        onChange={(value) => value && handlePaymentAlternativeChange(value)}
      >
        <RichSelectOption
          label={paymentTexts.altATitle}
          value={paymentTexts.altATitle}
        >
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
          <Pane>{paymentTexts.altADescription}</Pane>
        </RichSelectOption>
        <RichSelectOption
          label={paymentTexts.altBTitle}
          value={paymentTexts.altBTitle}
        >
          <Pane>
            <Paragraph>{paymentTexts.altBDescription}</Paragraph>
            <Paragraph>{paymentTexts.altBWarning}</Paragraph>
            <Paragraph>
              <BoldText>
                Önskar du att betalningen dras på ett särskilt datum varje
                månad?
              </BoldText>
            </Paragraph>
            <Paragraph>
              <InputLabel id="select-date-label">Välj datum</InputLabel>
            </Paragraph>
            <StyledSelect
              labelId="select-date-label"
              id="preferred-transfer-date"
              value={preferredTransferDate}
              onChange={(
                e: React.ChangeEvent<{
                  name?: string | undefined
                  value: unknown
                }>
              ) => handleChange((e.target.value as string) ?? '')}
            >
              {TransferDateOptions.map((o) => (
                <MenuItem key={o} value={o}>
                  {o}
                </MenuItem>
              ))}
            </StyledSelect>
          </Pane>
        </RichSelectOption>
        <RichSelectOption
          label={paymentTexts.altCTitle}
          value={paymentTexts.altCTitle}
        >
          <Pane>
            <Paragraph>{paymentTexts.altCDescription}</Paragraph>
            <Paragraph>
              Använd där
              <BoldText>{` ditt betalarnummmer: ${createPaymentResponse?.reference}`}</BoldText>
            </Paragraph>
            <PrimaryLink href={paymentTexts.altCLink}>
              {paymentTexts.altCLinkText}
            </PrimaryLink>
          </Pane>
        </RichSelectOption>
      </RichSelect>
      {isDirty && monthlyPaymentMethod === undefined && (
        <CenteredContainer>
          <ErrorMessage>
            {paymentTexts.monthlyPaymentMethodValidationError}
          </ErrorMessage>
        </CenteredContainer>
      )}
      <NavigationButtons
        nextButtonTitle={paymentTexts.confirmButtonTitle}
        nextButtonOnClick={handleConfirm}
        showBackButton={false}
        isNextDisabled={isDirty && monthlyPaymentMethod === undefined}
      />
    </Pane>
  )
}
