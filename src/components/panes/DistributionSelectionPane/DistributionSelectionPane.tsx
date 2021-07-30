import useAllCauses from '../../../hooks/content/useAllCauses'
import useTypedSelector from '../../../hooks/store/useTypedSelector'
import { NavigationButtons } from '../../shared/Buttons/NavigationButtons'
import { Pane } from '../Panes.style'

import CauseDistribution from './CauseDistribution'
import { CausesAccordion } from './CausesAccordion'
import DonationSumPanel from './DonationSumPanel'

export default function DistributionSelectionPane() {
  const allCauses = useAllCauses()
  const causesDistribution = useTypedSelector(
    (state) => state.donation.causesDistribution
  )

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
      <NavigationButtons />
    </Pane>
  )
}
