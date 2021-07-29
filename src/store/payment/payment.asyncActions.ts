import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit'
import { attempt, hasFailed } from 'ts-failure'

import {
  PaymentRequest,
  PaymentResponse,
  BankPaymentRequest,
  SwishPaymentRequest,
  SwishPaymentStatusRequest,
} from '../../@types/import/api/payment.types'
import AppError from '../../utils/api/appError'

import {
  createPaymentRequest,
  pollSwishPaymentStatusRequest,
} from './payment.api'

const createPayment = <T extends PaymentRequest>(path: string) =>
  createAsyncThunk(
    'payment/createPayment',
    async (paymentArgs: T, { rejectWithValue }) => {
      const request = createPaymentRequest(path, paymentArgs)
      const apiResponse = await attempt(request)

      if (hasFailed(apiResponse)) {
        return rejectWithValue(
          AppError.fromError('Failed to create payment', apiResponse.error)
        )
      }

      const paymentResponse = apiResponse.body
      if (!paymentResponse) {
        return rejectWithValue(
          new AppError({
            message: 'Got an invalid response when creating payment',
            extraData: apiResponse,
          })
        )
      }

      return paymentResponse
    }
  )
export const createSwishPayment: AsyncThunk<
  PaymentResponse,
  SwishPaymentRequest,
  Record<string, unknown>
> = createPayment('/paymentSwish')
export const createBankPayment: AsyncThunk<
  PaymentResponse,
  BankPaymentRequest,
  Record<string, unknown>
> = createPayment('/paymentBank')

export const pollSwishPaymentStatus = createAsyncThunk(
  'swish/pollSwishPaymentStatus',
  async (pollArgs: SwishPaymentStatusRequest, { rejectWithValue }) => {
    const request = pollSwishPaymentStatusRequest(pollArgs)
    const apiResponse = await attempt(request)

    if (hasFailed(apiResponse)) {
      return rejectWithValue(
        AppError.fromError(
          'Failed to fetch swish payment status',
          apiResponse.error
        )
      )
    }

    const statusResponse = apiResponse.body
    if (!statusResponse) {
      return rejectWithValue(
        new AppError({
          message: 'Got an invalid response from swish payment status',
          extraData: apiResponse,
        })
      )
    }

    return statusResponse
  }
)
