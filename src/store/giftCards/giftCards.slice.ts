import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

import { GiftCard, GiftCardsState } from './giftCards.types'

const initialState: GiftCardsState = {
  giftCards: [],
  errors: {},
  showAllOrganisation: false,
}

export const giftCardSlice = createSlice({
  name: 'giftCard',
  initialState,

  reducers: {
    resetState() {
      return initialState
    },
    addGiftCard(state, action: PayloadAction<GiftCard>) {
      const id = action.payload.id || uuidv4()

      state.giftCards.push({ ...action.payload, id })
    },

    updateGiftCard(state, action: PayloadAction<GiftCard>) {
      state.giftCards = state.giftCards.map((giftCard) => {
        if (giftCard.id === action.payload.id) {
          return { ...giftCard, ...action.payload }
        }
        return giftCard
      })
    },

    removeGiftCard(state, action: PayloadAction<GiftCard>) {
      state.giftCards = state.giftCards?.filter(
        (giftCard) => giftCard.id !== action.payload.id
      )
    },

    showHideAllOrganisation(state) {
      state.showAllOrganisation = !state.showAllOrganisation
    },
  },
})

export const giftCardsActions = giftCardSlice.actions
export const giftCardsReducer = giftCardSlice.reducer
