import React from 'react'

import useAllTexts from '../../../hooks/content/useAllTexts'
import useTypedDispatch from '../../../hooks/store/useTypedDispatch'
import { uiActions } from '../../../store/ui/ui.slice'

import { BackButton } from './BackButton'
import ButtonsContainer from './ButtonsContainer'
import { NextButton } from './NextButton'

interface NavigationButtonsProps {
  nextButtonTitle?: string
  nextButtonOnClick?: () => void
  isNextDisabled?: boolean
  showBackButton?: boolean
  formId?: string
}

export const NavigationButtons = ({
  nextButtonTitle,
  nextButtonOnClick,
  showBackButton = true,
  isNextDisabled = false,
  formId,
}: NavigationButtonsProps) => {
  const dispatch = useTypedDispatch()
  const texts = useAllTexts()
  const sharedTexts = texts.donations.shared

  const onBackClick = () => {
    dispatch(uiActions.goToPreviousStep())
    window.parent.postMessage('ScrollToTop', 'https://geeffektivt.se/')
  }
  const onNextClick = () => {
    dispatch(uiActions.goToNextStep())
    window.parent.postMessage('ScrollToTop', 'https://geeffektivt.se/')
  }
  return (
    <ButtonsContainer showBackButton={showBackButton}>
      {showBackButton && <BackButton onClick={onBackClick} />}
      <NextButton
        form={formId}
        type="submit"
        disabled={isNextDisabled}
        onClick={nextButtonOnClick ?? onNextClick}
      >
        {nextButtonTitle ?? sharedTexts.defaultNextButtonTitle}
      </NextButton>
    </ButtonsContainer>
  )
}
