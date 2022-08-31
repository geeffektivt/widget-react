import { attempt, hasFailed } from 'ts-failure'

import {
  RequestOptions,
  ApiResponse,
  parseRequestOptions,
  parseResponseData,
} from '../utils/api/apiHelpers'
import AppError from '../utils/api/appError'

export async function apiRequest<T = unknown>(
  url: string,
  options: RequestOptions = {}
) {
  const response = await fetch(url, parseRequestOptions(options))

  const responseData = await attempt(parseResponseData<T>(response))

  if (hasFailed(responseData)) {
    console.error('Failed to parse response', JSON.stringify(responseData))
    throw AppError.fromError('Failed to parse response', responseData.error, {
      extraData: responseData,
    })
  }

  if (response.ok !== true) {
    console.error('Response not ok', JSON.stringify(responseData))
    throw AppError.fromResponse(response, { extraData: responseData })
  }

  return new ApiResponse(response, responseData)
}

export function get<T = unknown>(url: string, options?: RequestOptions) {
  return apiRequest<T>(url, { ...options, method: 'GET' })
}

export function post<T = unknown>(url: string, options?: RequestOptions) {
  return apiRequest<T>(url, { ...options, method: 'POST' })
}
