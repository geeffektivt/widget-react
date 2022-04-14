import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ReferralOption } from '../../@types/import/content/referrals.types'

import { ReferralsState } from './referrals.types'

const initialState: ReferralsState = {
  referral: undefined,
  textInput: '',
}

export const referralsSlice = createSlice({
  name: 'referrals',
  initialState,

  reducers: {
    setReferral(state, action: PayloadAction<ReferralOption | undefined>) {
      state.referral = action.payload
    },
    setTextInput(state, action: PayloadAction<string>) {
      state.textInput = action.payload
    },
    resetState() {
      return initialState
    },
  },
})

export const referralsActions = referralsSlice.actions
export const referralsReducer = referralsSlice.reducer
