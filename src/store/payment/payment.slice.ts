import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit'

import AppError from '../../utils/api/appError'

import {
  createSwishPayment,
  createBankPayment,
  pollSwishPaymentStatus,
  updateBankPayment,
} from './payment.asyncActions'
import { PaymentState } from './payment.types'

const initialState: PaymentState = {
  isCreatingPayment: null,
  paymentStatus: null,
  createPaymentResponse: null,
  swish: {
    isPollingStatus: null,
    pollStatusError: null,
    phoneNumber: null,
  },
  bank: {
    isUpdatingPayment: false,
    hasUpdatedPayment: false,
    updatePaymentError: null,
    preferredTransferDate: '',
    monthlyPaymentMethod: '',
  },
}

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPhoneNumber(state, action: PayloadAction<string>) {
      state.swish.phoneNumber = action.payload
    },
    setPreferredTransferDate(state, action: PayloadAction<string>) {
      state.bank.preferredTransferDate = action.payload
    },
    setMonthlyPaymentMethod(state, action: PayloadAction<string>) {
      state.bank.preferredTransferDate = ''
      state.bank.monthlyPaymentMethod = action.payload
    },
    resetState() {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(pollSwishPaymentStatus.pending, (state) => {
        state.swish.isPollingStatus = true
      })
      .addCase(pollSwishPaymentStatus.fulfilled, (state, action) => {
        state.swish.isPollingStatus = false
        state.paymentStatus = action.payload.status
      })
      .addCase(pollSwishPaymentStatus.rejected, (state, action) => {
        state.swish.isPollingStatus = false
        state.swish.pollStatusError = action.payload as AppError
      })
      .addCase(updateBankPayment.pending, (state) => {
        state.bank.isUpdatingPayment = true
      })
      .addCase(updateBankPayment.fulfilled, (state) => {
        state.bank.isUpdatingPayment = false
        state.bank.hasUpdatedPayment = true
      })
      .addCase(updateBankPayment.rejected, (state, action) => {
        state.bank.isUpdatingPayment = false
        state.bank.updatePaymentError = action.payload as AppError
      })
      .addMatcher(
        isAnyOf(createSwishPayment.pending, createBankPayment.pending),
        (state) => {
          state.isCreatingPayment = true
          state.paymentStatus = 'STARTED'
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
  updateBankPayment,
  pollSwishPaymentStatus,
}
