import { DonationStep } from '../../constants/enums/DonationStep'
import useAllCauses from '../../hooks/content/useAllCauses'
import useAllTexts from '../../hooks/content/useAllTexts'
import useTypedDispatch from '../../hooks/store/useTypedDispatch'
import { donationActions } from '../../store/donation/donation.slice'
import { paymentActions } from '../../store/payment/payment.slice'
import { referralsActions } from '../../store/referrals/referrals.slice'
import { uiActions } from '../../store/ui/ui.slice'
import { styled } from '../../styles/stitches.config'
import { NavigationButtons } from '../shared/Buttons/NavigationButtons'
import CheckCircle from '../shared/_svg/CheckCircle'

import Payment from './Payment'

interface PaymentDoneProps {
  title: string
  description: string
}

const StyledCheckCircle = styled(CheckCircle, {
  display: 'flex',
  height: 100,
  margin: '$s100 auto',
  width: 100,
})

export const PaymentDone = ({ title, description }: PaymentDoneProps) => {
  const dispatch = useTypedDispatch()
  const handleGoToStart = () => {
    dispatch(donationActions.resetState())
    dispatch(donationActions.resetDistribution(causes))
    dispatch(paymentActions.resetState())
    dispatch(referralsActions.resetState())
    dispatch(uiActions.setActiveStep(DonationStep.PaymentMethod))
  }
  const texts = useAllTexts()
  const causes = useAllCauses()
  const paymentTexts = texts.donations.payment

  return (
    <Payment title={title} description={description}>
      <StyledCheckCircle />
      <NavigationButtons
        nextButtonTitle={paymentTexts.goBackButtonTitle}
        nextButtonOnClick={handleGoToStart}
        showBackButton={false}
      />
    </Payment>
  )
}
