import {
  SwishPaymentRequest,
  SwishPaymentResponse,
  SwishPaymentStatusRequest,
  SwishPaymentStatusResponse,
} from '../../@types/import/api/swish.types'
import { API_URL } from '../../config/api'
import { get, post } from '../../services/apiService'
import { ApiResponse } from '../../utils/api/apiHelpers'
import { joinUrlPaths } from '../../utils/urlUtils'

export async function createSwishPaymentRequest(
  requestArgs: SwishPaymentRequest
): Promise<ApiResponse<SwishPaymentResponse>> {
  if (process.env.REACT_APP_USE_DEV_DATA === 'true') {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return new ApiResponse(undefined, {
      body: {
        id: 'fake-id',
      },
    })
  }

  const url = joinUrlPaths(API_URL, '/paymentSwishTest')
  return post<SwishPaymentResponse>(url, { body: requestArgs })
}

export async function pollSwishPaymentStatusRequest(
  requestArgs: SwishPaymentStatusRequest
): Promise<ApiResponse<SwishPaymentStatusResponse>> {
  if (process.env.REACT_APP_USE_DEV_DATA === 'true') {
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (Math.random() > 0.5) {
      return new ApiResponse<SwishPaymentStatusResponse>(undefined, {
        body: {
          status: 'CREATED',
          id: 'fake-id',
          paymentType: 'swish',
        },
      })
    }

    if (window.location.search.includes('payment=error')) {
      return new ApiResponse<SwishPaymentStatusResponse>(undefined, {
        body: {
          status: 'ERROR',
          id: 'fake-id',
          paymentType: 'swish',
        },
      })
    }

    if (window.location.search.includes('payment=declined')) {
      return new ApiResponse<SwishPaymentStatusResponse>(undefined, {
        body: {
          status: 'DECLINED',
          id: 'fake-id',
          paymentType: 'swish',
        },
      })
    }

    return new ApiResponse<SwishPaymentStatusResponse>(undefined, {
      body: {
        status: 'PAID',
        id: 'fake-id',
        paymentType: 'swish',
      },
    })
  }

  const url = joinUrlPaths(API_URL, `/paymentStatus?id=${requestArgs.id}`)
  return get<SwishPaymentStatusResponse>(url)
}
