import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'

import { ReferralOption } from '../../../@types/import/content/referrals.types'
import useAllReferralOptions from '../../../hooks/content/useAllReferralOptions'
import useAllTexts from '../../../hooks/content/useAllTexts'
import useTypedSelector from '../../../hooks/store/useTypedSelector'
import { referralsActions } from '../../../store/referrals/referrals.slice'
import { NavigationButtons } from '../../shared/Buttons/NavigationButtons'
import { Pane, PaneTitle } from '../Panes.style'

import {
  ReferralButton,
  ReferralsWrapper,
  ReferralButtonsWrapper,
  TextInput,
} from './ReferralPane.style'

export function ReferralPane() {
  const dispatch = useDispatch()

  const selectedReferral = useTypedSelector((state) => state.referrals.referral)

  const referralOptions = useAllReferralOptions()

  const allTexts = useAllTexts()
  const paneTexts = allTexts.donations.referral

  const onReferralSelect = (referral: ReferralOption) => {
    if (referral.id === selectedReferral?.id) {
      dispatch(referralsActions.setReferral(undefined))
    } else {
      dispatch(referralsActions.setReferral(referral))
    }
  }

  const onOtherReferralInput = (otherInput: string) => {
    dispatch(
      referralsActions.setReferral({ ...otherReferral, name: otherInput })
    )
  }

  const otherReferralRef = useRef<HTMLInputElement>(null)
  const otherReferral = { id: '0', name: '' }

  return (
    <Pane>
      <PaneTitle>{paneTexts.title}</PaneTitle>

      <ReferralsWrapper>
        <ReferralButtonsWrapper>
          {referralOptions?.map((referral) => (
            <ReferralButton
              key={referral.id}
              onClick={() => onReferralSelect(referral)}
              selected={referral.id === selectedReferral?.id}
            >
              {referral.name}
            </ReferralButton>
          ))}
          <div>
            <TextInput
              name="other"
              type="text"
              placeholder={paneTexts.otherLabel}
              onChange={(e) => onOtherReferralInput(e.target.value)}
              value={selectedReferral?.name ?? ''}
              selected={otherReferral.id === selectedReferral?.id}
              ref={otherReferralRef}
              hidden={otherReferral.id !== selectedReferral?.id}
            />
            {otherReferral.id !== selectedReferral?.id && (
              <ReferralButton
                key={otherReferral.id}
                onClick={() => {
                  onReferralSelect(otherReferral)
                  otherReferralRef.current?.focus()
                  otherReferralRef.current?.select()
                }}
                selected={otherReferral.id === selectedReferral?.id}
              >
                {paneTexts.otherLabel}
              </ReferralButton>
            )}
          </div>
        </ReferralButtonsWrapper>
      </ReferralsWrapper>
      <NavigationButtons
        nextButtonTitle={
          selectedReferral === undefined ? paneTexts.skipLabel : undefined
        }
      />
    </Pane>
  )
}
