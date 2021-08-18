import { useState } from 'react'
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
import ErrorField from '../../../shared/Error/ErrorField'
import SwishLogoPrimary from '../../../shared/_svg/SwishLogo/SwishLogoPrimary'
import { Pane, CenteredContainer } from '../../Panes.style'

import { PhoneInputContainer, LogoContainer } from './Swish.style'

export default function Swish() {
  const [isDirty, setIsDirty] = useState(false)
  const dispatch = useTypedDispatch()
  const { paymentStatus, phoneNumber } = useTypedSelector(
    (state) => state.payment
  )
  const { donorType, donor, causesDistribution } = useTypedSelector(
    (state) => state.donation
  )
  const { referral } = useTypedSelector((state) => state.referrals)
  const texts = useAllTexts()
  const paneTexts = texts.donations.swish

  const onPhoneNumberChange = (n: string) =>
    dispatch(paymentActions.setPhoneNumber(n))

  const onNextClick = () => {
    setIsDirty(true)
    if (validPhoneNumber(phoneNumber)) {
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
        referral: referral?.name,
      }
      dispatch(paymentAsyncActions.createSwishPayment(paymentRequest))
    }
  }
  const validPhoneNumber = (value: string | null) => {
    if (value === null || value === '') {
      return false
    }
    if (value.match(/\d{11,13}/)) {
      return true
    }
    return false
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
            isValid={!isDirty || validPhoneNumber}
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
      {isDirty && !validPhoneNumber(phoneNumber) && (
        <CenteredContainer>
          <ErrorField text={paneTexts.phoneNumberValidationError} />
        </CenteredContainer>
      )}

      <NavigationButtons
        nextButtonTitle={paneTexts.payTitle}
        nextButtonOnClick={onNextClick}
        isNextDisabled={isDirty && !validPhoneNumber(phoneNumber)}
        showBackButton={false}
      />
    </Pane>
  )
}
