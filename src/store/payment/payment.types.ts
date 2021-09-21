import {
  PaymentResponse,
  SwishPaymentStatus,
} from '../../@types/import/api/payment.types'
import AppError from '../../utils/api/appError'

export interface PaymentState {
  readonly swish: SwishPaymentState
  readonly bank: BankPaymentState
  readonly paymentStatus: SwishPaymentStatus | undefined
  readonly isCreatingPayment: boolean
  readonly createPaymentResponse: PaymentResponse | undefined
}

interface SwishPaymentState {
  readonly isPollingStatus: boolean
  readonly pollStatusError: AppError | undefined
  readonly phoneNumber: string | undefined
}
interface BankPaymentState {
  readonly isUpdatingPayment: boolean
  readonly hasUpdatedPayment: boolean
  readonly updatePaymentError: AppError | undefined
  readonly preferredTransferDate: string | undefined
  readonly monthlyPaymentMethod: string | undefined
}
