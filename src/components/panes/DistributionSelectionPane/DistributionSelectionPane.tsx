import React from 'react'

import useAllCauses from '../../../hooks/content/useAllCauses'
import useAllTexts from '../../../hooks/content/useAllTexts'
import useTypedSelector from '../../../hooks/store/useTypedSelector'
import { isValidNumber } from '../../../utils/typeUtils'
import { NavigationButtons } from '../../shared/Buttons/NavigationButtons'
import { InfoText } from '../../shared/_typography/Text/InfoText'
import { Pane } from '../Panes.style'

import CauseDistribution from './CauseDistribution'
import { CausesAccordion } from './CausesAccordion'
import DonationSumPanel from './DonationSumPanel'

export default function DistributionSelectionPane() {
  const allCauses = useAllCauses()
  const causesDistribution = useTypedSelector(
    (state) => state.donation.causesDistribution
  )
  const sum = useTypedSelector((state) => state.donation.sum)
  const texts = useAllTexts()

  const paneTexts = texts.donations.distributionSelection
  return (
    <Pane>
      <InfoText>{paneTexts.info}</InfoText>
      <DonationSumPanel sum={sum} causesDistribution={causesDistribution} />
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
      <NavigationButtons isNextDisabled={!isValidNumber(sum)} />
    </Pane>
  )
}
