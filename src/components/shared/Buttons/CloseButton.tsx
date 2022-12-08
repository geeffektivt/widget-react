import { FC } from 'react'

import { CloseButtonContainer, CloseButtonIcon } from './CloseButton.styles'

interface CloseButtonProps {
  onClick?: () => void
}

export const CloseButton: FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <CloseButtonContainer type="reset" onClick={onClick}>
      <CloseButtonIcon />
    </CloseButtonContainer>
  )
}
