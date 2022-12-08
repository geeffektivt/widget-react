import { MouseEventHandler } from 'react'

import useAllTexts from '../../../hooks/content/useAllTexts'

import {
  PreviewButtonContainer,
  PreviewButtonIcon,
} from './PreviewButton.styles'

interface PreviewButtonProps {
  previewButtonTitle?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  isAddDisabled?: boolean
}

export const PreviewButton = ({
  previewButtonTitle,
  onClick,
  isAddDisabled = false,
}: PreviewButtonProps) => {
  const texts = useAllTexts()
  const sharedTexts = texts.donations.shared

  return (
    <PreviewButtonContainer disabled={isAddDisabled} onClick={onClick}>
      <PreviewButtonIcon />
      {previewButtonTitle ?? sharedTexts.defaultPreviewButtonTitle}
    </PreviewButtonContainer>
  )
}
