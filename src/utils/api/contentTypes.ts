import { caseInsensitiveEquals } from '../stringUtils'

export const ContentTypeHeader = 'Content-Type'

export const ContentTypes = {
  Json: 'application/json',
}

export function isResponseContentType(response: Response, contentType: string) {
  return caseInsensitiveEquals(
    response.headers.get(ContentTypeHeader),
    contentType
  )
}
