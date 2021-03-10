import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { nextPane } from '../../../store/layout/actions'
import { submitReferralAction } from '../../../store/referrals/actions'
import { State } from '../../../store/state'
import { NextButton } from '../../shared/Buttons/NavigationButtons.style'
import { Pane, PaneContainer, PaneTitle } from '../Panes.style'

import {
  ReferralButton,
  ReferralsWrapper,
  ReferralButtonsWrapper,
} from './ReferralPane.style'

export function ReferralPane() {
  const referrals = useSelector((state: State) => state.referrals.referrals)
  const dispatch = useDispatch()

  return (
    <Pane>
      <PaneContainer>
        <ReferralsWrapper>
          <PaneTitle>Hvor hørte du om oss?</PaneTitle>

          {/* TODO: Handle other input */}
          <ReferralButtonsWrapper>
            {referrals?.map((ref) => (
              <ReferralButton
                key={ref.id}
                onClick={() => dispatch(submitReferralAction.started(ref.id))}
              >
                {ref.name}
              </ReferralButton>
            ))}
          </ReferralButtonsWrapper>
        </ReferralsWrapper>
        <NextButton onClick={() => dispatch(nextPane())}>Hopp over</NextButton>
      </PaneContainer>
    </Pane>
  )
}
