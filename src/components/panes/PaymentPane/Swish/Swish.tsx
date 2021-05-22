import PhoneInput from 'react-phone-input-2'

import 'react-phone-input-2/lib/style.css'
import useAllTexts from '../../../../hooks/content/useAllTexts'
import useTypedDispatch from '../../../../hooks/store/useTypedDispatch'
import useTypedSelector from '../../../../hooks/store/useTypedSelector'
import { swishActions } from '../../../../store/swish/swish.slice'
import { uiActions } from '../../../../store/ui/ui.slice'
import { NextButton } from '../../../shared/Buttons/NavigationButtons.style'
import SwishLogoPrimary from '../../../shared/_svg/SwishLogo/SwishLogoPrimary'
import { Pane } from '../../Panes.style'

import { Container, PhoneInputContainer, LogoContainer } from './Swish.style'

export default function Swish() {
  const dispatch = useTypedDispatch()
  const number = useTypedSelector((state) => state.swish.number)
  const onNumberChange = (n: string) => dispatch(swishActions.setNumber(n))
  const texts = useAllTexts()
  const paneTexts = texts.donations.swish
  const onNextClick = () => {
    dispatch(uiActions.goToNextStep())
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
            value={number}
            onChange={onNumberChange}
            onlyCountries={['se']}
            disableDropdown
            countryCodeEditable={false}
            autoFormat
            defaultMask="..-... .. ..."
            alwaysDefaultMask
          />
        </PhoneInputContainer>
      </Container>
      <NextButton onClick={onNextClick}>Next</NextButton>
    </Pane>
  )
}
