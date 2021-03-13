import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { DonationStep } from '../../constants/enums/DonationStep'
import {
  getNextDonationStep,
  getPreviousDonationStep,
} from '../../utils/donationStepUtils'

import { UIState } from './ui.types'

const initialState: UIState = {
  activeStep: DonationStep.PaymentMethod,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,

  reducers: {
    setActiveStep(state, action: PayloadAction<DonationStep>) {
      state.activeStep = action.payload
    },

    goToNextStep(state) {
      state.activeStep = getNextDonationStep(state.activeStep)
    },

    goToPreviousStep(state) {
      state.activeStep = getPreviousDonationStep(state.activeStep)
    },
  },
})

export const uiActions = uiSlice.actions
export const uiReducer = uiSlice.reducer
