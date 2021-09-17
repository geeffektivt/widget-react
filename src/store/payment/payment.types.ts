import {
  PaymentResponse,
  SwishPaymentStatus,
} from '../../@types/import/api/payment.types'
import AppError from '../../utils/api/appError'

export interface PaymentState {
  readonly swish: SwishPaymentState
  readonly bank: BankPaymentState
  readonly paymentStatus: SwishPaymentStatus | null
  readonly isCreatingPayment: boolean | null
  readonly createPaymentResponse: PaymentResponse | null
}

interface SwishPaymentState {
  readonly isPollingStatus: boolean | null
  readonly pollStatusError: AppError | null
  readonly phoneNumber: string | null
}
interface BankPaymentState {
  readonly isUpdatingPayment: boolean
  readonly hasUpdatedPayment: boolean
  readonly updatePaymentError: AppError | null
  readonly preferredTransferDate: string
  readonly monthlyPaymentMethod: string
}
