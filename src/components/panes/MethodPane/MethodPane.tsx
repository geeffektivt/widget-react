import React from 'react'

import { PaymentMethod } from '../../../constants/enums/PaymentMethod'
import { DonationFrequency } from '../../../constants/enums/RecurringDonation'
import useAllTexts from '../../../hooks/content/useAllTexts'
import useTypedDispatch from '../../../hooks/store/useTypedDispatch'
import useTypedSelector from '../../../hooks/store/useTypedSelector'
import { donationActions } from '../../../store/donation/donation.slice'
import { uiActions } from '../../../store/ui/ui.slice'
import { RichSelect } from '../../shared/RichSelect/RichSelect'
import { RichSelectOption } from '../../shared/RichSelect/RichSelectOption'
import { InfoText } from '../../shared/_typography/Text/InfoText'
import { Pane } from '../Panes.style'

import {
  MethodWrapper,
  MethodButton,
  RecurringSelectWrapper,
} from './MethodPane.style'

export function MethodPane() {
  const dispatch = useTypedDispatch()
  const selectedDonationFrequency = useTypedSelector(
    (state) => state.donation.recurring
  )

  const texts = useAllTexts()

  const paneTexts = texts.donations.method

  const isMonthlySelected =
    selectedDonationFrequency === DonationFrequency.Monthly

  function onDonationFrequencyChange(donationFrequency: DonationFrequency) {
    dispatch(donationActions.setDonationFrequency(donationFrequency))
  }

  function onPaymentMethodSelect(method: PaymentMethod) {
    dispatch(donationActions.setPaymentMethod(method))
    dispatch(uiActions.goToNextStep())
  }

  return (
    <Pane>
      <InfoText>{paneTexts.info}</InfoText>

      <RecurringSelectWrapper>
        <RichSelect
          name="recurring"
          selected={selectedDonationFrequency}
          onChange={onDonationFrequencyChange}
        >
          <RichSelectOption
            label={paneTexts.monthlyPaymentLabel}
            sublabel={paneTexts.monthlyPaymentSubLabel}
            value={DonationFrequency.Monthly}
          />
          <RichSelectOption
            label={paneTexts.singlePaymentLabel}
            value={DonationFrequency.Single}
          />
        </RichSelect>
      </RecurringSelectWrapper>

      <MethodWrapper>
        <MethodButton
          aria-label={paneTexts.bankAriaLabel}
          paymentType="bank"
          onClick={() => onPaymentMethodSelect(PaymentMethod.Bank)}
        />

        <MethodButton
          aria-label={paneTexts.swishAriaLabel}
          disabled={isMonthlySelected}
          paymentType="swish"
          onClick={() => onPaymentMethodSelect(PaymentMethod.Swish)}
        >
          {isMonthlySelected && paneTexts.notAvailableForMonthlyLabel}
        </MethodButton>
      </MethodWrapper>
    </Pane>
  )
}
