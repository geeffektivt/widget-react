import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit'

import AppError from '../../utils/api/appError'

import {
  createSwishPayment,
  createBankPayment,
  pollSwishPaymentStatus,
} from './payment.asyncActions'
import { PaymentState } from './payment.types'

const initialState: PaymentState = {
  paymentStatus: null,
  createPaymentResponse: null,
  isCreatingPayment: null,
  isPollingStatus: null,
  pollStatusError: null,
  phoneNumber: null,
  preferredTransferDate: '',
  monthlyPaymentMethod: '',
}

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPhoneNumber(state, action: PayloadAction<string>) {
      state.phoneNumber = action.payload
    },
    setPreferredTransferDate(state, action: PayloadAction<string>) {
      state.preferredTransferDate = action.payload
    },
    setMonthlyPaymentMethod(state, action: PayloadAction<string>) {
      state.monthlyPaymentMethod = action.payload
    },
    resetState() {
      return initialState
    },
  },
  extraReducers: (builder) => {
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
      .addMatcher(
        isAnyOf(createSwishPayment.pending, createBankPayment.pending),
        (state) => {
          state.isCreatingPayment = true
        }
      )
      .addMatcher(
        isAnyOf(createSwishPayment.fulfilled, createBankPayment.fulfilled),
        (state, action) => {
          state.isCreatingPayment = false
          state.createPaymentResponse = action.payload
          state.paymentStatus = 'CREATED'
        }
      )
      .addMatcher(
        isAnyOf(createSwishPayment.rejected, createBankPayment.rejected),
        (state) => {
          state.isCreatingPayment = false
          state.paymentStatus = 'ERROR'
        }
      )
  },
})

export const paymentReducer = paymentSlice.reducer
export const paymentActions = paymentSlice.actions
export const paymentAsyncActions = {
  createSwishPayment,
  createBankPayment,
  pollSwishPaymentStatus,
}
