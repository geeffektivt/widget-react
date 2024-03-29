import React from 'react'

import {
  Cause,
  Organization,
} from '../../../../@types/import/content/organizations.types'
import useTypedDispatch from '../../../../hooks/store/useTypedDispatch'
import useRequestAnimationFrame from '../../../../hooks/utils/useRequestAnimationFrame'
import { donationActions } from '../../../../store/donation/donation.slice'
import { OrganizationDistribution as OrganizationDistributionType } from '../../../../store/donation/donation.types'
import { Link } from '../../../shared/Link/Link'
import { ToolTip } from '../../../shared/ToolTip/ToolTip'
import ToolTipIcon from '../../../shared/ToolTip/ToolTipIcon'
import { Paragraph } from '../../Panes.style'
import CauseSlider from '../CauseSlider/CauseSlider'

import { Container } from './OrganizationDistribution.style'

interface OrganizationDistributionProps {
  cause: Cause
  organization: Organization
  organizationDistribution: OrganizationDistributionType
  isEnabled: boolean
}

export default function OrganizationDistribution({
  cause,
  organization,
  organizationDistribution,
  isEnabled,
}: OrganizationDistributionProps) {
  const dispatch = useTypedDispatch()
  const safeRequestAnimationFrame = useRequestAnimationFrame()
  const causeId = cause.id
  const organizationId = organization.id

  const onSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedShare = parseInt(event.currentTarget.value, 10)

    safeRequestAnimationFrame(() => {
      dispatch(
        donationActions.updateOrganizationShare({
          causeId,
          organizationId,
          organizationShare: updatedShare,
        })
      )
    })
  }

  const onLockButtonChange = () => {
    dispatch(
      donationActions.updateOrganizationShareLock({
        causeId,
        organizationId,
        isLocked: !organizationDistribution.isLocked,
      })
    )
  }

  return (
    <Container isEnabled={isEnabled}>
      <CauseSlider
        isLocked={organizationDistribution.isLocked}
        sum={organizationDistribution.sum}
        disabled={!isEnabled}
        share={organizationDistribution.share}
        onLockButtonChange={onLockButtonChange}
        onSliderChange={onSliderChange}
      >
        <div>
          <span>{organization.name}</span>
          <ToolTip
            text={
              <>
                <Paragraph>{organization.shortDescription}</Paragraph>
                <Paragraph>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href={organization.infoUrl}
                  >
                    Läs mer
                  </Link>
                </Paragraph>
              </>
            }
          >
            <ToolTipIcon />
          </ToolTip>
        </div>
      </CauseSlider>
    </Container>
  )
}
