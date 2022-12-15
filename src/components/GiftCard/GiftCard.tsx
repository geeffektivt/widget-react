import { FC } from 'react'

import useTypedDispatch from '../../hooks/store/useTypedDispatch'
import { giftCardsActions } from '../../store/giftCards/giftCards.slice'
import { GiftCard } from '../../store/giftCards/giftCards.types'
import { CloseButton } from '../shared/Buttons/CloseButton'

import { GiftCardContainer, GiftCardWrapper } from './GiftCard.styles'
import { GiftCardForm } from './GiftCardForm'
import { GiftCardPreview } from './GiftCardPreview/GiftCardPreview'

interface GiftCardElementProps {
  giftCard: GiftCard
}

export const GiftCardElement: FC<GiftCardElementProps> = ({ giftCard }) => {
  const dispatch = useTypedDispatch()

  const onCloseCard = () => {
    dispatch(giftCardsActions.removeGiftCard(giftCard))
  }

  return (
    <GiftCardWrapper>
      <CloseButton onClick={onCloseCard} />
      <GiftCardContainer>
        <GiftCardForm giftCard={giftCard} />
        <GiftCardPreview giftCard={giftCard} />
      </GiftCardContainer>
    </GiftCardWrapper>
  )
}
