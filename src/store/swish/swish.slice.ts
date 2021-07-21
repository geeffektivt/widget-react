import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import AppError from '../../utils/api/appError'

import {
  createSwishPayment,
  pollSwishPaymentStatus,
} from './swish.asyncActions'
import { SwishState } from './swish.types'

const initialState: SwishState = {
  phoneNumber: null,

  createPaymentResponse: null,
  paymentStatus: null,

  createPaymentError: null,
  pollStatusError: null,

  isCreatingPayment: false,
  isPollingStatus: false,
}

export const swishSlice = createSlice({
  name: 'swish',
  initialState,

  reducers: {
    setPhoneNumber(state, action: PayloadAction<string>) {
      state.phoneNumber = action.payload
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createSwishPayment.pending, (state) => {
        state.isCreatingPayment = true
        state.createPaymentError = null
      })
      .addCase(createSwishPayment.fulfilled, (state, action) => {
        state.isCreatingPayment = false
        state.createPaymentResponse = action.payload
        state.paymentStatus = 'CREATED'
      })
      .addCase(createSwishPayment.rejected, (state, action) => {
        state.isCreatingPayment = false
        state.createPaymentError = action.payload as AppError
      })

    builder
      .addCase(pollSwishPaymentStatus.pending, (state) => {
        state.isPollingStatus = true
      })
      .addCase(pollSwishPaymentStatus.fulfilled, (state, action) => {
        state.isPollingStatus = false
        state.paymentStatus = action.payload.status
      })
      .addCase(pollSwishPaymentStatus.rejected, (state, action) => {
        state.isPollingStatus = false
        state.pollStatusError = action.payload as AppError
      })
  },
})

export const swishReducer = swishSlice.reducer
export const swishActions = swishSlice.actions
export const swishAsyncActions = { createSwishPayment, pollSwishPaymentStatus }
