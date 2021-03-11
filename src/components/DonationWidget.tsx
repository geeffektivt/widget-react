import { useDispatch, useSelector } from 'react-redux'

import useOnMount from '../hooks/utils/useOnMount'
import { fetchOrganizationsAction } from '../store/layout/actions'
import { fetchReferralsAction } from '../store/referrals/actions'
import { State } from '../store/state'

import Carousel from './Carousel'
import { DonationWidgetWrapper } from './DonationWidget.style'
import FlowProgress from './FlowProgress'
import DistributionSelectionPane from './panes/DistributionSelectionPane'
import { DonorPane } from './panes/DonorPane/DonorPane'
import { MethodPane } from './panes/MethodPane/MethodPane'
import { PaymentPane } from './panes/PaymentPane/PaymentPane'
import { ReferralPane } from './panes/ReferralPane/ReferralPane'

export default function DonationWidget() {
  const dispatch = useDispatch()
  const answeredReferal = useSelector(
    (state: State) => state.layout.answeredReferral
  )

  useOnMount(() => {
    dispatch(fetchOrganizationsAction.started(undefined))
    dispatch(fetchReferralsAction.started(undefined))
  })

  return (
    <DonationWidgetWrapper>
      <Carousel>
        <MethodPane />
        <DonorPane />
        <DistributionSelectionPane />
        {answeredReferal !== true && <ReferralPane />}
        <PaymentPane />
      </Carousel>

      <FlowProgress />
    </DonationWidgetWrapper>
  )
}
