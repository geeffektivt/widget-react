export interface PaymentRequest {
  isAnonymous: boolean
  name?: string
  email?: string
  doTaxDeduction?: boolean
  personalNumber?: string
  approvesPrivacyPolicy?: boolean
  doNewsletter?: boolean
  charities: Charity[]
  referral?: string
}
export interface BankPaymentRequest extends PaymentRequest {
  reoccursMonthly: boolean
}

export interface SwishPaymentRequest extends PaymentRequest {
  phone?: string
}

export interface UpdatePaymentRequest {
  id: PaymentResponse['id']
  monthlyPaymentMethod: string
  preferredTransferDate?: string
}

interface Charity {
  name: string
  sum: number
}

export interface PaymentResponse {
  id: string
  reference: string
}

export interface SwishPaymentStatusRequest {
  id: PaymentResponse['id']
}

export type SwishPaymentStatus =
  | 'CREATED'
  | 'STARTED'
  | 'PAID'
  | 'DECLINED'
  | 'ERROR'
  | 'CANCELLED'

export interface SwishPaymentStatusResponse {
  id: PaymentResponse['id']
  status: SwishPaymentStatus
  paymentType: string
}
