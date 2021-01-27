import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Validator from 'validator'

import {
  registerDonationAction,
  setSum,
  setShareType,
} from '../../../store/donation/actions'
import { State } from '../../../store/state'
import { PaymentMethod, ShareType } from '../../../types/Enums'
import { NextButton } from '../../shared/Buttons/NavigationButtons.style'
import { TextInput } from '../../shared/Input/TextInput'
import { RichSelect } from '../../shared/RichSelect/RichSelect'
import { RichSelectOption } from '../../shared/RichSelect/RichSelectOption'
import { Pane, PaneContainer } from '../Panes.style'

import { SumWrapper } from './DonationPane.style'
import { SharesSelection } from './ShareSelection'
import { SharesSum } from './SharesSum'

interface DonationFormValues {
  recurring: string
  customShare: string
  sum: string
}

export const DonationPane: React.FC = () => {
  const dispatch = useDispatch()
  const shareType = useSelector((state: State) => state.donation.shareType)
  const donationMethod = useSelector((state: State) => state.donation.method)
  const donationValid = useSelector((state: State) => state.donation.isValid)

  const {
    register,
    watch,
    errors,
    handleSubmit,
  } = useForm<DonationFormValues>()
  const watchAllFields = watch()

  useEffect(() => {
    /**
     * TODO:
     * Handle errors, set donation valid
     */

    const values = watchAllFields
    if (values.sum)
      dispatch(setSum(Validator.isInt(values.sum) ? parseInt(values.sum) : 0))
  }, [dispatch, errors, watchAllFields])

  function onSubmit() {
    dispatch(registerDonationAction.started(undefined))
  }

  return (
    <Pane>
      <PaneContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          {donationMethod === PaymentMethod.Swish && (
            <SumWrapper>
              <TextInput
                label="Sum"
                denomination="kr"
                name="sum"
                type="tel"
                placeholder="0"
                innerRef={register({
                  required: true,
                  validate: (val) => Validator.isInt(val) && val > 0,
                })}
              />
            </SumWrapper>
          )}

          <RichSelect
            selected={shareType}
            onChange={(type: ShareType) => dispatch(setShareType(type))}
          >
            <RichSelectOption
              label="Bruk vår anbefalte fordeling"
              sublabel="La midlene dine bli brukt der GiveWell mener det trengs"
              value={ShareType.STANDARD}
            />
            <RichSelectOption
              label="Jeg vil velge fordeling selv"
              sublabel="Valgt blant våre anbefalte organisasjoner"
              value={ShareType.CUSTOM}
            >
              <SharesSelection />
              <SharesSum />
            </RichSelectOption>
          </RichSelect>
          <NextButton type="submit" disabled={!donationValid}>
            Neste
          </NextButton>
        </form>
      </PaneContainer>
    </Pane>
  )
}
