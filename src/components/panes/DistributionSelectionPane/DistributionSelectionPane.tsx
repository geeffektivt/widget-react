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
import Slider from '../../shared/Slider'
import { Pane } from '../Panes.style'

import {
  CausesAccordion,
  CausesAccordionButton,
  CausesAccordionHeader,
  CausesAccordionItem,
  CausesAccordionPanel,
} from './CausesAccordion'

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
        donationActions.updateCauseDistribution({
          causeId: cause.id,
          causeShare: value,
        })
      )
    })
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

  function onNextClick() {
    dispatch(uiActions.goToNextStep())
  }

  return (
    <Pane>
      <CausesAccordion type="multiple">
        {allCauses.map((cause, causeIndex) => {
          const causeDistribution = causesDistribution[causeIndex]

          return (
            <CausesAccordionItem key={cause.id} value={cause.id}>
              <CausesAccordionHeader>
                <span>{cause.name}</span> -{' '}
                <span>{causeDistribution.share}%</span>
                <CausesAccordionButton>Expand</CausesAccordionButton>
                <Slider
                  min={0}
                  max={100}
                  value={[causeDistribution.share]}
                  onValueChange={([value]) => onCauseSliderChange(cause, value)}
                />
              </CausesAccordionHeader>

              <CausesAccordionPanel style={{ paddingLeft: '1rem' }}>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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
                </label>

                {cause.organizations.map((organization, organizationIndex) => (
                  <div key={organization.id}>
                    <span>{organization.name}</span>

                    <Slider
                      disabled={
                        causeDistribution.shareType === ShareType.Standard
                      }
                      min={0}
                      max={100}
                      value={[
                        causeDistribution.organizationsDistribution[
                          organizationIndex
                        ].share,
                      ]}
                      onValueChange={([value]) =>
                        onOrganizationSliderChange(cause, organization, value)
                      }
                    />
                  </div>
                ))}
              </CausesAccordionPanel>
            </CausesAccordionItem>
          )
        })}
      </CausesAccordion>

      <NextButton onClick={onNextClick}>Next</NextButton>
    </Pane>
  )
}
