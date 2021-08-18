import React, { useCallback } from 'react'
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

  const otherReferralRef = useCallback((inputElement: HTMLInputElement) => {
    setTimeout(() => {
      inputElement?.focus()
      if (selectedReferral?.name === '') {
        inputElement?.select()
      }
    }, 150)
  }, [])

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
          {otherReferral.id !== selectedReferral?.id && (
            <ReferralButton
              key={otherReferral.id}
              onClick={() => {
                onReferralSelect(otherReferral)
              }}
              selected={otherReferral.id === selectedReferral?.id}
            >
              {paneTexts.otherLabel}
            </ReferralButton>
          )}
          {otherReferral.id === selectedReferral?.id && (
            <TextInput
              name="other"
              type="text"
              placeholder={paneTexts.otherLabel}
              onChange={(e) => onOtherReferralInput(e.target.value)}
              value={selectedReferral?.name}
              selected={otherReferral.id === selectedReferral?.id}
              ref={otherReferralRef}
            />
          )}
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
