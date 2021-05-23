export interface SwishPaymentRequest {
  amount: number
  isOnMobile: boolean
  mobilePhoneNumber?: string
  /** Internal payment reference */
  reference: string
}

export interface SwishPaymentResponse {
  status: SwishPaymentStatus
  paymentId: string
  paymentRequestToken: string
}

export interface SwishPaymentStatusRequest {
  id: SwishPaymentResponse['paymentId']
}

export type SwishPaymentStatus = 'CREATED' | 'PAID' | 'DECLINED' | 'ERROR'

export interface SwishPaymentStatusResponse {
  status: SwishPaymentStatus
}

export interface SwishPaymentRedirectQueries {
  _: unknown
}
