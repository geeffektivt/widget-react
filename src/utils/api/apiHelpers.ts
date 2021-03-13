import { isObject } from '../typeUtils'

import {
  ContentTypeHeader,
  ContentTypes,
  isResponseContentType,
} from './contentTypes'

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: RequestInit['body'] | unknown
}

export interface ResponseData<T = unknown> {
  body?: T | null
  bodyStr?: string | null
}

export class ApiResponse<T = unknown> implements ResponseData<T> {
  rawResponse?: Response
  status: number

  body
  bodyStr

  static async fromResponse<TT>(response: Response) {
    return new ApiResponse(response, await parseResponseData<TT>(response))
  }

  constructor(response: Response | undefined, responseData: ResponseData<T>) {
    this.rawResponse = response
    this.status = response?.status || 0

    this.body = responseData.body
    this.bodyStr = responseData.bodyStr
  }
}

export function parseRequestOptions(options: RequestOptions): RequestInit {
  const optionsClone = {
    headers: {},
    ...options,
  }

  const isBodyFormData = optionsClone.body instanceof FormData
  const shouldStringifyBodyAsJSON = isObject(options.body) && !isBodyFormData

  if (shouldStringifyBodyAsJSON) {
    optionsClone.body = JSON.stringify(optionsClone.body)
    optionsClone.headers[ContentTypeHeader as keyof HeadersInit] =
      ContentTypes.Json
  }

  optionsClone.credentials = optionsClone.credentials || 'same-origin'

  return optionsClone as RequestInit
}

export async function parseResponseData<T>(response: Response) {
  if (isResponseContentType(response, ContentTypes.Json)) {
    return { body: (await response.clone().json()) as T, bodyStr: null }
  }

  return { body: null, bodyStr: await response.clone().text() }
}
