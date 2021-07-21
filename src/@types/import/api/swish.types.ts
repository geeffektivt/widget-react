export interface SwishPaymentRequest {
  isAnonymous: boolean
  phone: string
  name?: string
  email?: string
  doTaxDeduction?: boolean
  approvesPrivacyPolicy?: boolean
  doNewsletter?: boolean
  charities: Charity[]
}

interface Charity {
  name: string
  sum: number
}

export interface SwishPaymentResponse {
  id: string
}

export interface SwishPaymentStatusRequest {
  id: SwishPaymentResponse['id']
}

export type SwishPaymentStatus =
  | 'CREATED'
  | 'STARTED'
  | 'PAID'
  | 'DECLINED'
  | 'ERROR'
  | 'CANCELLED'

export interface SwishPaymentStatusResponse {
  id: SwishPaymentResponse['id']
  status: SwishPaymentStatus
  paymentType: string
}

export interface SwishPaymentRedirectQueries {
  _: unknown
}
