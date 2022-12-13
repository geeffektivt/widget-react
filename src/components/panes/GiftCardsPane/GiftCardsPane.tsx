import useAllTexts from '../../../hooks/content/useAllTexts'
import useTypedDispatch from '../../../hooks/store/useTypedDispatch'
import useTypedSelector from '../../../hooks/store/useTypedSelector'
import { selectGiftCards } from '../../../store/giftCards/giftCards.selector'
import { giftCardsActions } from '../../../store/giftCards/giftCards.slice'
import { GiftCardElement } from '../../GiftCard/GiftCard'
import { AddButton } from '../../shared/Buttons/AddButton'
import { NavigationButtons } from '../../shared/Buttons/NavigationButtons'
import { PaneTitle } from '../Panes.style'

import { GiftCardsPaneWrapper } from './GiftCardsPane.styles'

export const GiftCardsPane = () => {
  const allTexts = useAllTexts()
  const paneTexts = allTexts.donations.giftCards
  const sharedTexts = allTexts.donations.shared

  const giftCards = useTypedSelector(selectGiftCards)
  const dispatch = useTypedDispatch()
  const onAddGiftCard = () => {
    dispatch(
      giftCardsActions.addGiftCard({
        receiverName: '',
        receiverEmail: '',
      })
    )
  }

  return (
    <GiftCardsPaneWrapper>
      <PaneTitle>{paneTexts.title}</PaneTitle>
      {giftCards.map((giftCard) => (
        <GiftCardElement key={giftCard.id} giftCard={giftCard} />
      ))}

      <AddButton
        addButtonTitle={paneTexts.addGiftCardButtonTitle}
        onClick={onAddGiftCard}
      />
      <NavigationButtons
        nextButtonTitle={
          giftCards?.length
            ? sharedTexts.defaultNextButtonTitle
            : sharedTexts.defaultSkipLabel
        }
      />
    </GiftCardsPaneWrapper>
  )
}
