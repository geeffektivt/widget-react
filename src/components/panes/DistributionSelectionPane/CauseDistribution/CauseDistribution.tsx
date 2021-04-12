import { Cause } from '../../../../@types/import/content/organizations.types'
import { ShareType } from '../../../../constants/enums/ShareType'
import useTypedDispatch from '../../../../hooks/store/useTypedDispatch'
import useRequestAnimationFrame from '../../../../hooks/utils/useRequestAnimationFrame'
import { donationActions } from '../../../../store/donation/donation.slice'
import { CauseDistribution as CauseDistributionType } from '../../../../store/donation/donation.types'
import Slider from '../../../shared/_inputs/Slider'
import Chevron from '../../../shared/_svg/Chevron'
import {
  CausesAccordionButton,
  CausesAccordionChevron,
  CausesAccordionHeader,
  CausesAccordionItem,
  CausesAccordionPanel,
} from '../CausesAccordion'
import OrganizationDistribution from '../OrganizationDistribution'

import { AccordionContainer, CauseTitle } from './CauseDistribution.style'

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

  const causeId = cause.id
  const inputId = `cause-${causeId}`

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

  function onLockCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(
      donationActions.updateCauseShareLock({
        causeId,
        isLocked: event.currentTarget.checked,
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
        <AccordionContainer>
          <CausesAccordionButton>
            <CausesAccordionChevron>
              <Chevron />
            </CausesAccordionChevron>
            <CauseTitle>{cause.name}</CauseTitle>
          </CausesAccordionButton>
          <div>
            <label>
              <input
                type="checkbox"
                checked={causeDistribution.isLocked}
                onChange={onLockCheckboxChange}
              />
              Lås
            </label>

            <output htmlFor={inputId}> {causeDistribution.share}%</output>
          </div>
        </AccordionContainer>

        <div>
          <Slider
            id={inputId}
            min={0}
            max={100}
            step={1}
            value={causeDistribution.share}
            disabled={causeDistribution.isLocked}
            onChange={onSliderChange}
          />
        </div>
      </CausesAccordionHeader>

      <CausesAccordionPanel>
        <label>
          <input
            type="checkbox"
            checked={causeDistribution.shareType === ShareType.Standard}
            onChange={onShareTypeChange}
          />
          {cause.standardOrganizationShareText}
        </label>

        {cause.organizations.map((organization, index) => (
          <OrganizationDistribution
            key={organization.id}
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
