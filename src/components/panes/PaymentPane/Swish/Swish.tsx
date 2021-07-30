import PhoneInput from 'react-phone-input-2'

import 'react-phone-input-2/lib/style.css'
import { SwishPaymentRequest } from '../../../../@types/import/api/payment.types'
import { DonorType } from '../../../../constants/enums/DonorType'
import useAllTexts from '../../../../hooks/content/useAllTexts'
import useTypedDispatch from '../../../../hooks/store/useTypedDispatch'
import useTypedSelector from '../../../../hooks/store/useTypedSelector'
import usePollForPaymentStatus from '../../../../hooks/swish/usePollForPaymentStatus'
import { getCharitiesWithNames } from '../../../../store/payment/payment.api'
import {
  paymentAsyncActions,
  paymentActions,
} from '../../../../store/payment/payment.slice'
import Payment from '../../../Payment'
import { NavigationButtons } from '../../../shared/Buttons/NavigationButtons'
import SwishLogoPrimary from '../../../shared/_svg/SwishLogo/SwishLogoPrimary'
import { Pane, CenteredContainer } from '../../Panes.style'

import { PhoneInputContainer, LogoContainer } from './Swish.style'

export default function Swish() {
  const dispatch = useTypedDispatch()
  const { paymentStatus, phoneNumber } = useTypedSelector(
    (state) => state.payment
  )
  const { donorType, donor, causesDistribution } = useTypedSelector(
    (state) => state.donation
  )
  const texts = useAllTexts()
  const paneTexts = texts.donations.swish

  const onPhoneNumberChange = (n: string) =>
    dispatch(paymentActions.setPhoneNumber(n))
  const onNextClick = () => {
    const paymentRequest: SwishPaymentRequest = {
      isAnonymous: donorType === DonorType.Anonymous,
      phone: phoneNumber ?? '',
      name: donor?.name,
      email: donor?.email,
      doTaxDeduction: donor?.taxDeduction,
      personalNumber: donor?.ssn.toString(),
      approvesPrivacyPolicy: donor?.approvesPrivacyPolicy,
      doNewsletter: donor?.newsletter,
      charities: getCharitiesWithNames(causesDistribution),
    }
    dispatch(paymentAsyncActions.createSwishPayment(paymentRequest))
  }

  usePollForPaymentStatus()

  if (paymentStatus !== null) {
    return (
      <Pane>
        <CenteredContainer>
          <Payment status={paymentStatus} />
        </CenteredContainer>
      </Pane>
    )
  }

  return (
    <Pane>
      <CenteredContainer>
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
      </CenteredContainer>
      <NavigationButtons
        nextButtonTitle={paneTexts.payTitle}
        nextButtonOnClick={onNextClick}
        showBackButton={false}
      />
    </Pane>
  )
}
