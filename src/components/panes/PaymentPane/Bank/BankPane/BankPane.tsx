import { DonationFrequency } from '../../../../../constants/enums/RecurringDonation'
import useAllTexts from '../../../../../hooks/content/useAllTexts'
import useTypedSelector from '../../../../../hooks/store/useTypedSelector'
import { Pane, PaneTitle } from '../../../Panes.style'
import { PaymentDetailsWrapper, DetailsRow } from '../ResultPane.style'

export default function BankPane() {
  const donationFrequency = useTypedSelector(
    (state) => state.donation.recurring
  )
  const isMonthlySelected = donationFrequency === DonationFrequency.Monthly
  const texts = useAllTexts()
  const paymentTexts = texts.donations.payment
  return (
    <Pane>
      <PaneTitle>{paymentTexts.title}</PaneTitle>
      {paymentTexts.description}
      <PaymentDetailsWrapper>
        <DetailsRow>
          <span>{paymentTexts.kontonummerTitle}</span>
          <span>{paymentTexts.kontonummer}</span>
        </DetailsRow>
        <DetailsRow>
          <span>{paymentTexts.ocrTitle}</span>
          <span>{paymentTexts.ocr}</span>
        </DetailsRow>
      </PaymentDetailsWrapper>
      {paymentTexts.ocrDescription}
    </Pane>
  )
}
