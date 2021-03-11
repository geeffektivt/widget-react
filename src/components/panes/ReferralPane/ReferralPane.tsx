import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useAllTexts from '../../../hooks/content/useAllTexts'
import { nextPane } from '../../../store/layout/actions'
import { submitReferralAction } from '../../../store/referrals/actions'
import { State } from '../../../store/state'
import { ReferralType } from '../../../types/Temp'
import { NextButton } from '../../shared/Buttons/NavigationButtons.style'
import { Pane, PaneContainer, PaneTitle } from '../Panes.style'

import {
  ReferralButton,
  ReferralsWrapper,
  ReferralButtonsWrapper,
} from './ReferralPane.style'

export function ReferralPane() {
  const dispatch = useDispatch()

  const referrals = useSelector((state: State) => state.referrals.referrals)

  const allTexts = useAllTexts()
  const paneTexts = allTexts.donations.referral

  function onReferralSelect(referral: ReferralType) {
    dispatch(submitReferralAction.started(referral.id))
  }

  function onSkipClick() {
    dispatch(nextPane())
  }

  return (
    <Pane>
      <PaneContainer>
        <ReferralsWrapper>
          <PaneTitle>{paneTexts.title}</PaneTitle>

          <ReferralButtonsWrapper>
            {referrals?.map((referral) => (
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
