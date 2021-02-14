import { removeNullAndUndefined } from './arrayUtils'

export function joinUrlPaths(...paths: (string | null | undefined)[]) {
  const firstIndex = 0
  const lastIndex = paths.length - 1

  return removeNullAndUndefined(paths)
    .map((path, index) => {
      if (index !== firstIndex) {
        path = path.replace(/^\/+/, '')
      }

      if (index !== lastIndex) {
        path = path.replace(/\/+$/, '')
      }

      return path
    })
    .join('/')
}

export function hasUrlParam(param: string) {
  const queryString = window.location.search

  const urlParams = new URLSearchParams(queryString)

  return urlParams.has(param)
}
