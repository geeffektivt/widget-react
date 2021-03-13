import { DonationFrequency } from '../../../../../constants/enums/RecurringDonation'
import useTypedSelector from '../../../../../hooks/store/useTypedSelector'
import { Pane, PaneTitle } from '../../../Panes.style'

export default function BankPane() {
  const donationFrequency = useTypedSelector(
    (state) => state.donation.recurring
  )
  const isMonthlySelected = donationFrequency === DonationFrequency.Monthly

  return (
    <Pane>
      <PaneTitle>Tack!</PaneTitle>
    </Pane>
  )
}
