import {
  PaymentResponse,
  SwishPaymentStatus,
} from '../../@types/import/api/payment.types'
import AppError from '../../utils/api/appError'

export interface PaymentState {
  readonly paymentStatus: SwishPaymentStatus | null
  readonly createPaymentResponse: PaymentResponse | null
  readonly isCreatingPayment: boolean | null
  readonly isPollingStatus: boolean | null
  readonly pollStatusError: AppError | null
  readonly phoneNumber: string | null
}
