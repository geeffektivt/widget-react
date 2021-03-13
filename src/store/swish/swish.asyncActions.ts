import { createAsyncThunk } from '@reduxjs/toolkit'
import { attempt, hasFailed } from 'ts-failure'

import {
  SwishPaymentRequest,
  SwishPaymentStatusRequest,
} from '../../@types/import/api/swish.types'
import AppError from '../../utils/api/appError'

import {
  createSwishPaymentRequest,
  pollSwishPaymentStatusRequest,
} from './swish.api'

export const createSwishPayment = createAsyncThunk(
  'swish/createSwishPayment',
  async (paymentArgs: SwishPaymentRequest, { rejectWithValue }) => {
    const request = createSwishPaymentRequest(paymentArgs)
    const apiResponse = await attempt(request)

    if (hasFailed(apiResponse)) {
      return rejectWithValue(
        AppError.fromError('Failed to create swish payment', apiResponse.error)
      )
    }

    const paymentResponse = apiResponse.body
    if (!paymentResponse) {
      return rejectWithValue(
        new AppError({
          message: 'Got an invalid response when creating swish payment',
          extraData: apiResponse,
        })
      )
    }

    return paymentResponse
  }
)

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
