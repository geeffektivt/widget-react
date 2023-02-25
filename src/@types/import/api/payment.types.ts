export interface PaymentRequest {
  isAnonymous: boolean
  name?: string
  companyName?: string
  email?: string
  doTaxDeduction?: boolean
  personalNumber?: string
  organizationNumber?: string
  approvesPrivacyPolicy?: boolean
  doNewsletter?: boolean
  charities: Charity[]
  tip?: number
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

export interface Charity {
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
