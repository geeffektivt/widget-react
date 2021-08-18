import {
  PaymentResponse,
  PaymentRequest,
  SwishPaymentStatusRequest,
  SwishPaymentStatusResponse,
} from '../../@types/import/api/payment.types'
import { API_URL } from '../../config/api'
import { ShareType } from '../../constants/enums/ShareType'
import { get, post } from '../../services/apiService'
import { ApiResponse } from '../../utils/api/apiHelpers'
import { joinUrlPaths } from '../../utils/urlUtils'
import { CauseDistribution } from '../donation/donation.types'

export async function createPaymentRequest(
  path: string,
  requestArgs: PaymentRequest
): Promise<ApiResponse<PaymentResponse>> {
  if (process.env.REACT_APP_USE_DEV_DATA === 'true') {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return new ApiResponse(undefined, {
      body: {
        id: 'fake-id',
        reference: '202107301111',
      },
    })
  }

  const url = joinUrlPaths(API_URL, path)
  return post<PaymentResponse>(url, { body: requestArgs })
}

export const getCharitiesWithNames = (charities: CauseDistribution[]) => {
  return charities
    .flatMap((c) => {
      if (c.shareType === ShareType.Standard) {
        return { name: c.name, sum: c.sum }
      }
      return c.organizationsDistribution.map((o) => ({
        name: o.name,
        sum: o.sum,
      }))
    })
    .filter((c) => c.sum !== 0)
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
