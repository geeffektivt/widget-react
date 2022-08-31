import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit'
import { attempt, hasFailed } from 'ts-failure'

import {
  PaymentRequest,
  PaymentResponse,
  BankPaymentRequest,
  SwishPaymentRequest,
  SwishPaymentStatusRequest,
  UpdatePaymentRequest,
} from '../../@types/import/api/payment.types'
import AppError from '../../utils/api/appError'
import {
  validateBank,
  validateSwish,
  validateUpdate,
} from '../../utils/validation'

import {
  createPaymentRequest,
  pollSwishPaymentStatusRequest,
  updatePaymentRequest,
} from './payment.api'

const isBank = (
  paymentArgs: SwishPaymentRequest | BankPaymentRequest
): paymentArgs is BankPaymentRequest =>
  (paymentArgs as BankPaymentRequest).reoccursMonthly !== undefined

const createPayment = <T extends PaymentRequest>(path: string) =>
  createAsyncThunk(
    'payment/createPayment',
    async (paymentArgs: T, { rejectWithValue }) => {
      const bank = isBank(paymentArgs)
      const valid = bank
        ? validateBank(paymentArgs as unknown as BankPaymentRequest)
        : validateSwish(paymentArgs)
      if (!valid) {
        console.error('Create payment not valid', JSON.stringify(paymentArgs))
        return rejectWithValue(
          AppError.fromError(
            'Failed to create payment',
            'Request arguments were not valid'
          )
        )
      }
      const request = createPaymentRequest(path, paymentArgs)
      const apiResponse = await attempt(request)

      if (hasFailed(apiResponse)) {
        console.error('Create payment failed', JSON.stringify(apiResponse))
        return rejectWithValue(
          AppError.fromError('Failed to create payment', apiResponse.error)
        )
      }

      const paymentResponse = apiResponse.body
      if (!paymentResponse) {
        console.error(
          'Create payment returned invalid response',
          JSON.stringify(apiResponse)
        )
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

export const updateBankPayment = createAsyncThunk(
  'payment/updatePayment',
  async (paymentArgs: UpdatePaymentRequest, { rejectWithValue }) => {
    const valid = validateUpdate(paymentArgs)
    if (!valid) {
      console.error(
        'Update bank payment not valid',
        JSON.stringify(paymentArgs)
      )
      return rejectWithValue(
        AppError.fromError(
          'Failed to update payment',
          'Request arguments were not valid'
        )
      )
    }
    const request = updatePaymentRequest(paymentArgs)
    const apiResponse = await attempt(request)

    if (hasFailed(apiResponse)) {
      console.error('Update bank payment failed', JSON.stringify(apiResponse))
      return rejectWithValue(
        AppError.fromError('Failed to update payment', apiResponse.error)
      )
    }

    return apiResponse.body
  }
)

export const pollSwishPaymentStatus = createAsyncThunk(
  'swish/pollSwishPaymentStatus',
  async (pollArgs: SwishPaymentStatusRequest, { rejectWithValue }) => {
    const request = pollSwishPaymentStatusRequest(pollArgs)
    const apiResponse = await attempt(request)

    if (hasFailed(apiResponse)) {
      console.error('Swish payment failed', JSON.stringify(apiResponse))
      return rejectWithValue(
        AppError.fromError(
          'Failed to fetch swish payment status',
          apiResponse.error
        )
      )
    }

    const statusResponse = apiResponse.body
    if (!statusResponse) {
      console.error(
        'Swish payment returned invalid response',
        JSON.stringify(apiResponse)
      )
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
