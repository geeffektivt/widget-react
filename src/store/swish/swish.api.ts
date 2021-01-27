import {
  SwishPaymentResponse,
  SwishPaymentStatusRequest,
  SwishPaymentStatusResponse,
} from '../../@types/import/api/swish.types'
import { API_URL } from '../../config/api'
import { get, post } from '../../services/apiService'
import { ApiResponse } from '../../utils/api/apiHelpers'
import { joinUrlPaths } from '../../utils/urlUtils'

import { CreateSwishPaymentActionArgs } from './swish.actions'

export async function createSwishPaymentRequest(
  requestArgs: CreateSwishPaymentActionArgs
): Promise<ApiResponse<SwishPaymentResponse>> {
  if (process.env.USE_DEV_DATA === 'true') {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return new ApiResponse(undefined, {
      body: {
        paymentId: 'fake-id',
        paymentRequestToken: 'fake-token',
        status: null,
      },
    })
  }

  const url = joinUrlPaths(API_URL, '/payment/swish')
  return post<SwishPaymentResponse>(url, { body: requestArgs })
}

export async function pollSwishPaymentStatusRequest(
  requestArgs: SwishPaymentStatusRequest
): Promise<ApiResponse<SwishPaymentStatusResponse>> {
  if (process.env.USE_DEV_DATA === 'true') {
    await new Promise((resolve) => setTimeout(resolve, 500))

    return new ApiResponse(undefined, {
      body: {
        status: 'CREATED',
      },
    })
  }

  const url = joinUrlPaths(API_URL, '/payment/swish', requestArgs.id)
  return get<SwishPaymentStatusResponse>(url)
}
