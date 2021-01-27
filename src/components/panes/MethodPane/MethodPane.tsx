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

export const MethodPane: React.FC = () => {
  const dispatch = useDispatch()
  const recurring = useSelector((state: State) => state.donation.recurring)

  const texts = useAllTexts()

  const paneTexts = texts.donations.method

  const selectMethod = (method: PaymentMethod) => {
    dispatch(selectPaymentMethod(method))
    dispatch(nextPane())
  }

  return (
    <Pane>
      <InfoText>{paneTexts.info}</InfoText>
      <RecurringSelectWrapper>
        <RichSelect
          selected={recurring}
          onChange={(value: RecurringDonation) => dispatch(setRecurring(value))}
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
          className="bank"
          onClick={() => selectMethod(PaymentMethod.Bank)}
        />
        <MethodButton
          className="swish"
          onClick={() => selectMethod(PaymentMethod.Swish)}
        >
          {paneTexts.swishPercentage}
        </MethodButton>
      </MethodWrapper>
    </Pane>
  )
}
