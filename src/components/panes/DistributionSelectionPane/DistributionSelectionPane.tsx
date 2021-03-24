/* eslint-disable jsx-a11y/label-has-associated-control */

import {
  Cause,
  Organization,
} from '../../../@types/import/content/organizations.types'
import { ShareType } from '../../../constants/enums/ShareType'
import useAllCauses from '../../../hooks/content/useAllCauses'
import useTypedDispatch from '../../../hooks/store/useTypedDispatch'
import useTypedSelector from '../../../hooks/store/useTypedSelector'
import useRequestAnimationFrame from '../../../hooks/utils/useRequestAnimationFrame'
import { donationActions } from '../../../store/donation/donation.slice'
import { uiActions } from '../../../store/ui/ui.slice'
import { NextButton } from '../../shared/Buttons/NavigationButtons.style'
import Slider from '../../shared/_inputs/Slider'
import { Pane } from '../Panes.style'

import {
  CausesAccordion,
  CausesAccordionButton,
  CausesAccordionHeader,
  CausesAccordionItem,
  CausesAccordionPanel,
} from './CausesAccordion'
import DonationSumPanel from './DonationSumPanel'

export default function DistributionSelectionPane() {
  const dispatch = useTypedDispatch()
  const safeRequestAnimationFrame = useRequestAnimationFrame()

  const allCauses = useAllCauses()
  const causesDistribution = useTypedSelector(
    (state) => state.donation.causesDistribution
  )

  function onCauseSliderChange(cause: Cause, value: number) {
    safeRequestAnimationFrame(() => {
      dispatch(
        donationActions.updateCauseShare({
          causeId: cause.id,
          causeShare: value,
        })
      )
    })
  }

  function onCauseLockChange(cause: Cause, isLocked: boolean) {
    dispatch(
      donationActions.updateCauseShareLock({
        causeId: cause.id,
        isLocked,
      })
    )
  }

  function onCauseShareTypeChange(cause: Cause, shareType: ShareType) {
    dispatch(
      donationActions.updateCauseShareType({
        causeId: cause.id,
        shareType,
      })
    )
  }

  function onOrganizationSliderChange(
    cause: Cause,
    organization: Organization,
    value: number
  ) {
    safeRequestAnimationFrame(() => {
      dispatch(
        donationActions.updateOrganizationShare({
          causeId: cause.id,
          organizationId: organization.id,
          organizationShare: value,
        })
      )
    })
  }

  function onOrganizationLockChange(
    cause: Cause,
    organization: Organization,
    isLocked: boolean
  ) {
    dispatch(
      donationActions.updateOrganizationShareLock({
        causeId: cause.id,
        organizationId: organization.id,
        isLocked,
      })
    )
  }

  function onNextClick() {
    dispatch(uiActions.goToNextStep())
  }

  return (
    <Pane>
      <CausesAccordion type="multiple">
        {allCauses.map((cause, causeIndex) => {
          const causeDistribution = causesDistribution[causeIndex]
          const inputId = `cause-${cause.id}`

          return (
            <CausesAccordionItem key={cause.id} value={cause.id}>
              <CausesAccordionHeader>
                <span>{cause.name}</span> -{' '}
                <output htmlFor={inputId}>{causeDistribution.share}%</output>
                <label>
                  <input
                    type="checkbox"
                    checked={causeDistribution.isLocked}
                    onChange={(event) =>
                      onCauseLockChange(cause, event.currentTarget.checked)
                    }
                  />
                  Lås
                </label>
                <CausesAccordionButton>Expand</CausesAccordionButton>
                <Slider
                  id={inputId}
                  min={0}
                  max={100}
                  step={1}
                  value={causeDistribution.share}
                  disabled={causeDistribution.isLocked}
                  onChange={(event) =>
                    onCauseSliderChange(
                      cause,
                      parseInt(event.currentTarget.value, 10)
                    )
                  }
                />
              </CausesAccordionHeader>

              <CausesAccordionPanel style={{ paddingLeft: '1rem' }}>
                <label>
                  <input
                    type="checkbox"
                    checked={causeDistribution.shareType === ShareType.Standard}
                    onChange={(event) =>
                      onCauseShareTypeChange(
                        cause,
                        event.currentTarget.checked
                          ? ShareType.Standard
                          : ShareType.Custom
                      )
                    }
                  />
                  Låt oss välja
                </label>

                {cause.organizations.map((organization, organizationIndex) => {
                  const organizationDistribution =
                    causeDistribution.organizationsDistribution[
                      organizationIndex
                    ]

                  return (
                    <div key={organization.id}>
                      <div>
                        {organization.name}
                        <label>
                          <input
                            type="checkbox"
                            checked={organizationDistribution.isLocked}
                            onChange={(event) =>
                              onOrganizationLockChange(
                                cause,
                                organization,
                                event.currentTarget.checked
                              )
                            }
                          />
                          Lås
                        </label>
                      </div>

                      <Slider
                        disabled={
                          causeDistribution.shareType === ShareType.Standard ||
                          organizationDistribution.isLocked
                        }
                        min={0}
                        max={100}
                        value={organizationDistribution.share}
                        onChange={(event) =>
                          onOrganizationSliderChange(
                            cause,
                            organization,
                            parseInt(event.currentTarget.value, 10)
                          )
                        }
                      />
                    </div>
                  )
                })}
              </CausesAccordionPanel>
            </CausesAccordionItem>
          )
        })}
      </CausesAccordion>

      <DonationSumPanel />

      <NextButton onClick={onNextClick}>Next</NextButton>
    </Pane>
  )
}
