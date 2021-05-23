import {
  SwishPaymentResponse,
  SwishPaymentStatus,
} from '../../@types/import/api/swish.types'
import AppError from '../../utils/api/appError'

export interface SwishState {
  readonly phoneNumber: string | null

  readonly createPaymentResponse: SwishPaymentResponse | null
  readonly paymentStatus: SwishPaymentStatus | null

  readonly createPaymentError: AppError | null
  readonly pollStatusError: AppError | null

  readonly isCreatingPayment: boolean
  readonly isPollingStatus: boolean
}
