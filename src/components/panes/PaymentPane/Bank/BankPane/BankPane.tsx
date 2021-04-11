import { DonationFrequency } from '../../../../../constants/enums/RecurringDonation'
import useAllTexts from '../../../../../hooks/content/useAllTexts'
import useTypedSelector from '../../../../../hooks/store/useTypedSelector'
import { Pane, PaneTitle } from '../../../Panes.style'
import {
  PaymentDetailsWrapper,
  DetailsRow,
  BoldText,
} from '../ResultPane.style'

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
          <BoldText>{paymentTexts.kontonummerTitle}</BoldText>
          <p>{paymentTexts.kontonummer}</p>
        </DetailsRow>
        <DetailsRow>
          <BoldText>{paymentTexts.ocrTitle}</BoldText>
          <p>{paymentTexts.ocr}</p>
        </DetailsRow>
      </PaymentDetailsWrapper>
      {paymentTexts.ocrDescription}
    </Pane>
  )
}
