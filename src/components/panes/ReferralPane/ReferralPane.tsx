import React from 'react'
import { useDispatch } from 'react-redux'

import { ReferralOption } from '../../../@types/import/content/referrals.types'
import useAllReferralOptions from '../../../hooks/content/useAllReferralOptions'
import useAllTexts from '../../../hooks/content/useAllTexts'
import useTypedSelector from '../../../hooks/store/useTypedSelector'
import { referralsActions } from '../../../store/referrals/referrals.slice'
import { uiActions } from '../../../store/ui/ui.slice'
import { NextButton } from '../../shared/Buttons/NavigationButtons.style'
import { Pane, PaneContainer, PaneTitle } from '../Panes.style'

import {
  ReferralButton,
  ReferralsWrapper,
  ReferralButtonsWrapper,
} from './ReferralPane.style'

export function ReferralPane() {
  const dispatch = useDispatch()

  const selectedReferral = useTypedSelector((state) => state.referrals.referral)

  const referralOptions = useAllReferralOptions()

  const allTexts = useAllTexts()
  const paneTexts = allTexts.donations.referral

  function onReferralSelect(referral: ReferralOption) {
    if (referral.id === selectedReferral?.id) {
      dispatch(referralsActions.setReferral(undefined))
    } else {
      dispatch(referralsActions.setReferral(referral))
    }
  }

  function onSkipClick() {
    dispatch(uiActions.goToNextStep())
  }

  return (
    <Pane>
      <PaneContainer>
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
          </ReferralButtonsWrapper>
        </ReferralsWrapper>

        <NextButton onClick={onSkipClick}>
          {selectedReferral === undefined
            ? paneTexts.skipLabel
            : paneTexts.nextLabel}
        </NextButton>
      </PaneContainer>
    </Pane>
  )
}
