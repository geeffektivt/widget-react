type BaseRequest = {
  isAnonymous: boolean
  name?: string
  email?: string
  approvesPrivacyPolicy?: boolean
  doNewsletter?: boolean
  charities: Charity[]
  tip?: number
  referral?: string
}

type IndividualPaymentDetails = {
  _sourceType: 'individual'
  doTaxDeduction?: boolean
  personalNumber?: string
}

type CompanyPaymentDetails = {
  _sourceType: 'company'
  companyName?: string
  organizationNumber?: string
}

type BankPaymentDetails = {
  _paymentType: 'bank'
  reoccursMonthly: boolean
}

type SwishPaymentDetails = {
  _paymentType: 'swish'
  phone?: string
}

export type BankPaymentRequest =
  | (BaseRequest & BankPaymentDetails & IndividualPaymentDetails)
  | (BaseRequest & BankPaymentDetails & CompanyPaymentDetails)

export type SwishPaymentRequest =
  | (BaseRequest & SwishPaymentDetails & IndividualPaymentDetails)
  | (BaseRequest & SwishPaymentDetails & CompanyPaymentDetails)

export type PaymentRequest = BankPaymentRequest | SwishPaymentRequest

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
