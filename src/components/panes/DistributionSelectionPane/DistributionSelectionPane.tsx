import useAllCauses from '../../../hooks/content/useAllCauses'
import useTypedDispatch from '../../../hooks/store/useTypedDispatch'
import useTypedSelector from '../../../hooks/store/useTypedSelector'
import { uiActions } from '../../../store/ui/ui.slice'
import { NextButton } from '../../shared/Buttons/NavigationButtons.style'
import { Pane } from '../Panes.style'

import CauseDistribution from './CauseDistribution'
import { CausesAccordion } from './CausesAccordion'
import DonationSumPanel from './DonationSumPanel'

export default function DistributionSelectionPane() {
  const dispatch = useTypedDispatch()

  const allCauses = useAllCauses()
  const causesDistribution = useTypedSelector(
    (state) => state.donation.causesDistribution
  )

  function onNextClick() {
    dispatch(uiActions.goToNextStep())
  }

  return (
    <Pane>
      <DonationSumPanel />
      <CausesAccordion type="multiple">
        {allCauses.map((cause, causeIndex) => {
          const causeDistribution = causesDistribution[causeIndex]

          return (
            <CauseDistribution
              key={cause.id}
              cause={cause}
              causeDistribution={causeDistribution}
            />
          )
        })}
      </CausesAccordion>

      <NextButton onClick={onNextClick}>Next</NextButton>
    </Pane>
  )
}
