import React from 'react'

import { Cause } from '../../../../@types/import/content/organizations.types'
import { ShareType } from '../../../../constants/enums/ShareType'
import useTypedDispatch from '../../../../hooks/store/useTypedDispatch'
import useTypedSelector from '../../../../hooks/store/useTypedSelector'
import useRequestAnimationFrame from '../../../../hooks/utils/useRequestAnimationFrame'
import { donationActions } from '../../../../store/donation/donation.slice'
import { CauseDistribution as CauseDistributionType } from '../../../../store/donation/donation.types'
import Chevron from '../../../shared/_svg/Chevron'
import Info from '../../../shared/_svg/Info'
import CauseSlider from '../CauseSlider/CauseSlider'
import {
  CausesAccordionButton,
  CausesAccordionChevron,
  CausesAccordionHeader,
  CausesAccordionItem,
  CausesAccordionPanel,
} from '../CausesAccordion'
import OrganizationDistribution from '../OrganizationDistribution'

import {
  CauseTitle,
  Overlay,
  ShareTypeContainer,
} from './CauseDistribution.style'

interface CauseDistributionProps {
  cause: Cause
  causeDistribution: CauseDistributionType
}

export default function CauseDistribution({
  cause,
  causeDistribution,
}: CauseDistributionProps) {
  const dispatch = useTypedDispatch()
  const safeRequestAnimationFrame = useRequestAnimationFrame()
  const sum = useTypedSelector((state) => state.donation.sum)

  const causeId = cause.id

  function onSliderChange(event: React.ChangeEvent<HTMLInputElement>) {
    const updatedShare = parseInt(event.currentTarget.value, 10)

    safeRequestAnimationFrame(() => {
      dispatch(
        donationActions.updateCauseShare({
          causeId,
          causeShare: updatedShare,
        })
      )
    })
  }

  const onLockButtonChange = () => {
    dispatch(
      donationActions.updateCauseShareLock({
        causeId,
        isLocked: !causeDistribution.isLocked,
      })
    )
  }

  function onShareTypeChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(
      donationActions.updateCauseShareType({
        causeId: cause.id,
        shareType: event.currentTarget.checked
          ? ShareType.Standard
          : ShareType.Custom,
      })
    )
  }

  return (
    <CausesAccordionItem value={cause.id}>
      <CausesAccordionHeader>
        <CauseSlider
          isLocked={causeDistribution.isLocked}
          share={causeDistribution.share}
          sum={sum}
          onLockButtonChange={onLockButtonChange}
          onSliderChange={onSliderChange}
        >
          <CausesAccordionButton>
            <CausesAccordionChevron>
              <Chevron />
            </CausesAccordionChevron>
            <CauseTitle>{cause.name}</CauseTitle>
          </CausesAccordionButton>
        </CauseSlider>
      </CausesAccordionHeader>

      <CausesAccordionPanel>
        <ShareTypeContainer>
          <label>
            <input
              type="checkbox"
              checked={causeDistribution.shareType === ShareType.Standard}
              onChange={onShareTypeChange}
            />
            {cause.standardOrganizationShareText}
          </label>
        </ShareTypeContainer>
        {causeDistribution.shareType === ShareType.Standard && (
          <Overlay>
            <Info />
            {cause.standardOrganizationShareExplanation}
          </Overlay>
        )}

        {cause.organizations.map((organization, index) => (
          <OrganizationDistribution
            key={organization.id}
            sum={causeDistribution.share}
            cause={cause}
            organization={organization}
            organizationDistribution={
              causeDistribution.organizationsDistribution[index]
            }
            isEnabled={causeDistribution.shareType === ShareType.Custom}
          />
        ))}
      </CausesAccordionPanel>
    </CausesAccordionItem>
  )
}
