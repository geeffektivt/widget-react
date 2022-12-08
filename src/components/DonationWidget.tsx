import useCurrentStepIndex from 'hooks/ui/useCurrentStepIndex'
import { useMemo } from 'react'

import { DonationStep } from '../constants/enums/DonationStep'
import useAllCauses from '../hooks/content/useAllCauses'
import useTypedDispatch from '../hooks/store/useTypedDispatch'
import useTypedSelector from '../hooks/store/useTypedSelector'
import useCurrentStep from '../hooks/ui/useCurrentStep'
import useOnMount from '../hooks/utils/useOnMount'
import { donationActions } from '../store/donation/donation.slice'
import { selectHasGiftCards } from '../store/giftCards/giftCards.selector'

import { DonationWidgetWrapper } from './DonationWidget.style'
import FlowProgress from './FlowProgress'
import { Slider } from './Slider/Slider'
import DistributionSelectionPane from './panes/DistributionSelectionPane'
import { DonorPane } from './panes/DonorPane/DonorPane'
import { GiftCardsPane } from './panes/GiftCardsPane/GiftCardsPane'
import { MethodPane } from './panes/MethodPane/MethodPane'
import { PaymentPane } from './panes/PaymentPane/PaymentPane'
import { ReferralPane } from './panes/ReferralPane/ReferralPane'
import SummaryPane from './panes/SummaryPane/SummaryPane'

export default function DonationWidget() {
  const dispatch = useTypedDispatch()

  const causes = useAllCauses()

  const currentStep = useCurrentStep()
  const hasGiftCards = useTypedSelector(selectHasGiftCards)
  const previewModeEnabled = useMemo(
    () => hasGiftCards && currentStep === DonationStep.GiftCards,
    [currentStep, hasGiftCards]
  )
  const step = useCurrentStepIndex()
  useOnMount(() => {
    dispatch(donationActions.resetDistribution(causes))
  })

  return (
    <DonationWidgetWrapper css={previewModeEnabled ? { maxWidth: '90%' } : {}}>
      <Slider slideNumber={step}>
        <MethodPane />
        <DonorPane />
        <DistributionSelectionPane />
        <GiftCardsPane />
        <ReferralPane />
        <SummaryPane />
        <PaymentPane />
      </Slider>

      <FlowProgress />
    </DonationWidgetWrapper>
  )
}
