import { useDispatch } from 'react-redux'

import { ReferralOption } from '../../../@types/import/content/referrals.types'
import useAllReferralOptions from '../../../hooks/content/useAllReferralOptions'
import useAllTexts from '../../../hooks/content/useAllTexts'
import useTypedSelector from '../../../hooks/store/useTypedSelector'
import { referralsActions } from '../../../store/referrals/referrals.slice'
import { NavigationButtons } from '../../shared/Buttons/NavigationButtons'
import { Pane, PaneTitle } from '../Panes.style'

import ReferralInput from './ReferralInput'
import {
  ReferralButton,
  ReferralsWrapper,
  ReferralButtonsWrapper,
} from './ReferralPane.style'

export function ReferralPane() {
  const dispatch = useDispatch()

  const { referral: selectedReferral, textInput } = useTypedSelector(
    (state) => state.referrals
  )

  const referralOptions = useAllReferralOptions()

  const allTexts = useAllTexts()
  const paneTexts = allTexts.donations.referral
  const sharedTexts = allTexts.donations.shared

  const onReferralSelect = (referral: ReferralOption) => {
    dispatch(referralsActions.setTextInput(''))
    if (referral.id === selectedReferral?.id) {
      dispatch(referralsActions.setReferral(undefined))
    } else {
      dispatch(referralsActions.setReferral(referral))
    }
  }

  const onReferralInput = (value: string) => {
    dispatch(referralsActions.setTextInput(value))
  }

  return (
    <Pane>
      <PaneTitle>{paneTexts.title}</PaneTitle>

      <ReferralsWrapper>
        <ReferralButtonsWrapper>
          {referralOptions?.map((referral) => {
            const selected = referral.id === selectedReferral?.id
            return referral.editable ? (
              <ReferralInput
                key={referral.id}
                onChange={onReferralInput}
                onReferralSelect={onReferralSelect}
                referral={referral}
                selected={selected}
                value={selected ? textInput : referral.name}
              ></ReferralInput>
            ) : (
              <ReferralButton
                key={referral.id}
                onClick={() => onReferralSelect(referral)}
                selected={referral.id === selectedReferral?.id}
              >
                {referral.name}
              </ReferralButton>
            )
          })}
        </ReferralButtonsWrapper>
      </ReferralsWrapper>
      <NavigationButtons
        nextButtonTitle={
          selectedReferral === undefined
            ? sharedTexts.defaultSkipLabel
            : undefined
        }
      />
    </Pane>
  )
}
