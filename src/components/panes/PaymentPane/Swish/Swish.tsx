import PhoneInput from 'react-phone-input-2'

import 'react-phone-input-2/lib/style.css'
import { DonorType } from '../../../../constants/enums/DonorType'
import { ShareType } from '../../../../constants/enums/ShareType'
import useAllTexts from '../../../../hooks/content/useAllTexts'
import useTypedDispatch from '../../../../hooks/store/useTypedDispatch'
import useTypedSelector from '../../../../hooks/store/useTypedSelector'
import usePollForPaymentStatus from '../../../../hooks/swish/usePollForPaymentStatus'
import { CauseDistribution } from '../../../../store/donation/donation.types'
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
  const { donorType, donor, causesDistribution } = useTypedSelector(
    (state) => state.donation
  )
  const texts = useAllTexts()
  const paneTexts = texts.donations.swish

  const onPhoneNumberChange = (n: string) =>
    dispatch(swishActions.setPhoneNumber(n))
  const onNextClick = () => {
    const paymentRequest = {
      isAnonymous: donorType === DonorType.Anonymous,
      phone: phoneNumber ?? '',
      name: donor?.name,
      email: donor?.email,
      doTaxDeduction: donor?.taxDeduction,
      approvesPrivacyPolicy: donor?.approvesPrivacyPolicy,
      doNewsletter: donor?.newsletter,
      charities: getCharitiesWithNames(causesDistribution),
    }
    dispatch(swishAsyncActions.createSwishPayment(paymentRequest))
  }

  const getCharitiesWithNames = (charities: CauseDistribution[]) => {
    return charities.flatMap((c) => {
      if (c.shareType === ShareType.Standard) {
        return { name: c.name, sum: c.share }
      }
      return c.organizationsDistribution.map((o) => ({
        name: o.name,
        sum: o.share,
      }))
    })
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
