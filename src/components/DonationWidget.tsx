import useAllCauses from '../hooks/content/useAllCauses'
import useTypedDispatch from '../hooks/store/useTypedDispatch'
import useOnMount from '../hooks/utils/useOnMount'
import { donationActions } from '../store/donation/donation.slice'

import Carousel from './Carousel'
import { DonationWidgetWrapper } from './DonationWidget.style'
import FlowProgress from './FlowProgress'
import DistributionSelectionPane from './panes/DistributionSelectionPane'
import { DonorPane } from './panes/DonorPane/DonorPane'
import { MethodPane } from './panes/MethodPane/MethodPane'
import { PaymentPane } from './panes/PaymentPane/PaymentPane'
import { ReferralPane } from './panes/ReferralPane/ReferralPane'

export default function DonationWidget() {
  const dispatch = useTypedDispatch()

  const causes = useAllCauses()

  useOnMount(() => {
    dispatch(donationActions.resetDistribution(causes))
  })

  return (
    <DonationWidgetWrapper>
      <Carousel>
        <MethodPane />
        <DonorPane />
        <DistributionSelectionPane />
        <ReferralPane />
        <PaymentPane />
      </Carousel>

      <FlowProgress />
    </DonationWidgetWrapper>
  )
}
