import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useAllTexts from '../../../hooks/content/useAllTexts'
import {
  selectPaymentMethod,
  setRecurring,
} from '../../../store/donation/actions'
import { nextPane } from '../../../store/layout/actions'
import { State } from '../../../store/state'
import { PaymentMethod, RecurringDonation } from '../../../types/Enums'
import { RichSelect } from '../../shared/RichSelect/RichSelect'
import { RichSelectOption } from '../../shared/RichSelect/RichSelectOption'
import { Pane } from '../Panes.style'

import {
  MethodWrapper,
  MethodButton,
  InfoText,
  RecurringSelectWrapper,
} from './MethodPane.style'

export function MethodPane() {
  const dispatch = useDispatch()
  const selectedRecurringType = useSelector(
    (state: State) => state.donation.recurring
  )

  const texts = useAllTexts()

  const paneTexts = texts.donations.method

  const isRecurringSelected =
    selectedRecurringType === RecurringDonation.RECURRING

  function selectMethod(method: PaymentMethod) {
    dispatch(selectPaymentMethod(method))
    dispatch(nextPane())
  }

  return (
    <Pane>
      <InfoText>{paneTexts.info}</InfoText>

      <RecurringSelectWrapper>
        <RichSelect
          name="recurring"
          selected={selectedRecurringType}
          onChange={(value) => dispatch(setRecurring(value))}
        >
          <RichSelectOption
            label={paneTexts.monthlyPaymentLabel}
            sublabel={paneTexts.monthlyPaymentSubLabel}
            value={RecurringDonation.RECURRING}
          />
          <RichSelectOption
            label={paneTexts.singlePaymentLabel}
            value={RecurringDonation.NON_RECURRING}
          />
        </RichSelect>
      </RecurringSelectWrapper>

      <MethodWrapper>
        <MethodButton
          aria-label={paneTexts.bankAriaLabel}
          paymentType="bank"
          onClick={() => selectMethod(PaymentMethod.Bank)}
        />

        <MethodButton
          aria-label={paneTexts.swishAriaLabel}
          disabled={isRecurringSelected}
          paymentType="swish"
          onClick={() => selectMethod(PaymentMethod.Swish)}
        >
          {isRecurringSelected && paneTexts.notAvailableForMonthlyLabel}
        </MethodButton>
      </MethodWrapper>
    </Pane>
  )
}
