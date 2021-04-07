import {
  Cause,
  Organization,
} from '../../../../@types/import/content/organizations.types'
import useTypedDispatch from '../../../../hooks/store/useTypedDispatch'
import useRequestAnimationFrame from '../../../../hooks/utils/useRequestAnimationFrame'
import { donationActions } from '../../../../store/donation/donation.slice'
import { OrganizationDistribution as OrganizationDistributionType } from '../../../../store/donation/donation.types'
import Slider from '../../../shared/_inputs/Slider'

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
  const inputId = `organization-${causeId}-${organizationId}`

  function onSliderChange(event: React.ChangeEvent<HTMLInputElement>) {
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

  function onLockChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(
      donationActions.updateOrganizationShareLock({
        causeId,
        organizationId,
        isLocked: event.currentTarget.checked,
      })
    )
  }

  return (
    <div>
      <div>
        <span>{organization.name} - </span>
        <output htmlFor={inputId}>{organizationDistribution.share}%</output>

        <label>
          <input
            type="checkbox"
            checked={organizationDistribution.isLocked}
            onChange={onLockChange}
          />
          Lås
        </label>
      </div>

      <Slider
        id={inputId}
        disabled={!isEnabled || organizationDistribution.isLocked}
        min={0}
        max={100}
        value={organizationDistribution.share}
        onChange={onSliderChange}
      />
    </div>
  )
}
