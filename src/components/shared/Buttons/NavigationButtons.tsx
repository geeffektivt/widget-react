import useAllTexts from '../../../hooks/content/useAllTexts'
import useTypedDispatch from '../../../hooks/store/useTypedDispatch'
import { uiActions } from '../../../store/ui/ui.slice'
import { styled } from '../../../styles/stitches.config'

import { BackButton } from './BackButton'
import { NextButton } from './NextButton'

export const ButtonsContainer = styled('div', {
  marginTop: '$s200',
  display: 'flex',
  justifyContent: 'center',

  variants: {
    showBackButton: {
      true: {
        justifyContent: 'space-between',
      },
    },
  },
})

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
  }
  const onNextClick = () => {
    dispatch(uiActions.goToNextStep())
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
