import React from 'react'
import { useDispatch } from 'react-redux'

import { ReferralOption } from '../../../@types/import/content/referrals.types'
import useAllReferralOptions from '../../../hooks/content/useAllReferralOptions'
import useAllTexts from '../../../hooks/content/useAllTexts'
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

  const referralOptions = useAllReferralOptions()

  const allTexts = useAllTexts()
  const paneTexts = allTexts.donations.referral

  function onReferralSelect(referral: ReferralOption) {
    // dispatch(submitReferralAction.started(referral.id))
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
              >
                {referral.name}
              </ReferralButton>
            ))}
          </ReferralButtonsWrapper>
        </ReferralsWrapper>

        <NextButton onClick={onSkipClick}>{paneTexts.skipLabel}</NextButton>
      </PaneContainer>
    </Pane>
  )
}
