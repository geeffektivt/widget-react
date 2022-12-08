import { createSelector } from 'reselect'

import { WidgetStoreState } from '../store'

const giftCardsSlice = (state: WidgetStoreState) => state.giftCards

export const selectGiftCards = createSelector(
  giftCardsSlice,
  (state) => state.giftCards
)

export const selectHasGiftCards = createSelector(
  giftCardsSlice,
  (state) => state.giftCards.length > 0
)
