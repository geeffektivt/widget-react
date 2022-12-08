import useAllTexts from '../../../hooks/content/useAllTexts'

import { AddButtonContainer, AddButtonIcon } from './AddButton.styles'

interface AddButtonProps {
  addButtonTitle?: string
  onClick?: () => void
  isAddDisabled?: boolean
}

export const AddButton = ({
  addButtonTitle,
  onClick,
  isAddDisabled = false,
}: AddButtonProps) => {
  const texts = useAllTexts()
  const sharedTexts = texts.donations.shared

  return (
    <AddButtonContainer disabled={isAddDisabled} onClick={onClick}>
      <AddButtonIcon />
      {addButtonTitle ?? sharedTexts.defaultAddButtonTitle}
    </AddButtonContainer>
  )
}
