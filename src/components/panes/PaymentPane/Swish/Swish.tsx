import PhoneInput from 'react-phone-input-2'

import 'react-phone-input-2/lib/style.css'
import useAllTexts from '../../../../hooks/content/useAllTexts'
import useTypedDispatch from '../../../../hooks/store/useTypedDispatch'
import useTypedSelector from '../../../../hooks/store/useTypedSelector'
import usePollForPaymentStatus from '../../../../hooks/swish/usePollForPaymentStatus'
import {
  swishActions,
  swishAsyncActions,
} from '../../../../store/swish/swish.slice'
import Payment from '../../../Payment'
import { NextButton } from '../../../shared/Buttons/NavigationButtons.style'
import SwishLogoPrimary from '../../../shared/_svg/SwishLogo/SwishLogoPrimary'
import { Pane } from '../../Panes.style'

import { Container, PhoneInputContainer, LogoContainer } from './Swish.style'

export default function Swish() {
  const dispatch = useTypedDispatch()
  const { phoneNumber, paymentStatus } = useTypedSelector(
    (state) => state.swish
  )
  const sum = useTypedSelector((state) => state.donation.sum)
  const texts = useAllTexts()
  const paneTexts = texts.donations.swish

  const onPhoneNumberChange = (n: string) =>
    dispatch(swishActions.setPhoneNumber(n))
  const onNextClick = () => {
    // TODO: set correct data
    const paymentRequest = {
      amount: sum ?? 0,
      isOnMobile: false,
      mobilePhoneNumber: phoneNumber ?? '',
      reference: '',
    }
    dispatch(swishAsyncActions.createSwishPayment(paymentRequest))
  }

  usePollForPaymentStatus()

  if (paymentStatus !== null) {
    return (
      <Pane>
        <Container>
          <Payment status={paymentStatus} />
        </Container>
      </Pane>
    )
  }

  return (
    <Pane>
      <Container>
        <LogoContainer>
          <SwishLogoPrimary />
        </LogoContainer>
        {paneTexts.title}
        <PhoneInputContainer>
          <PhoneInput
            country="se"
            value={phoneNumber}
            onChange={onPhoneNumberChange}
            onlyCountries={['se']}
            disableDropdown
            countryCodeEditable={false}
            autoFormat
            defaultMask="..-... .. ..."
            alwaysDefaultMask
          />
        </PhoneInputContainer>
      </Container>
      <NextButton onClick={onNextClick}>{paneTexts.payTitle}</NextButton>
    </Pane>
  )
}
