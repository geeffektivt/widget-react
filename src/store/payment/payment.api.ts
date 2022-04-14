import {
  PaymentResponse,
  PaymentRequest,
  SwishPaymentStatusRequest,
  SwishPaymentStatusResponse,
  UpdatePaymentRequest,
} from '../../@types/import/api/payment.types'
import { ReferralOption } from '../../@types/import/content/referrals.types'
import { ShareType } from '../../constants/enums/ShareType'
import { get, post } from '../../services/apiService'
import { ApiResponse } from '../../utils/api/apiHelpers'
import { joinUrlPaths } from '../../utils/urlUtils'
import { CauseDistribution } from '../donation/donation.types'

export async function updatePaymentRequest(
  requestArgs: UpdatePaymentRequest
): Promise<ApiResponse> {
  if (process.env.REACT_APP_USE_DEV_DATA === 'true') {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return new ApiResponse(undefined, {})
  }

  const url = joinUrlPaths(process.env.REACT_APP_API_URL, '/updatePaymentBank')
  return post(url, { body: requestArgs })
}

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

  const url = joinUrlPaths(process.env.REACT_APP_API_URL, path)
  return post<PaymentResponse>(url, { body: requestArgs })
}

export const getCharitiesWithNames = (
  charities: CauseDistribution[],
  excludeId?: string
) => {
  return charities
    .filter((c) => (excludeId ? c.id !== excludeId : true))
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

export const getReferralName = (
  referral?: ReferralOption,
  textInput?: string
) => {
  return referral
    ? referral?.name +
        (textInput && textInput.trim().length > 0 ? `: ${textInput}` : '')
    : undefined
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

  const url = joinUrlPaths(
    process.env.REACT_APP_API_URL,
    `/paymentStatus?id=${requestArgs.id}`
  )
  return get<SwishPaymentStatusResponse>(url)
}
