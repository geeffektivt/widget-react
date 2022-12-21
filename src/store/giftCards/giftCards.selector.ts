import { createSelector } from 'reselect'

import { WidgetStoreState } from '../store'
import { GiftCard } from './giftCards.types'

const isGiftCardValid = (giftCard: GiftCard) => {
  if (giftCard.receiverName === '') {
    return false
  }

  if (giftCard.receiverEmail === '') {
    return false
  }
  return true
}

const giftCardsSlice = (state: WidgetStoreState) => state.giftCards

export const selectGiftCards = createSelector(
  giftCardsSlice,
  (state) => state.giftCards
)

export const selectHasGiftCards = createSelector(
  giftCardsSlice,
  (state) => state.giftCards.length > 0
)

export const validateGiftCards = createSelector(giftCardsSlice, (state) =>
  state.giftCards?.every(isGiftCardValid)
)
