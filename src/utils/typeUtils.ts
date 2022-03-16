const { toString } = Object.prototype

export function isValidNumber(value: unknown) {
  return typeof value === 'number' && !Number.isNaN(value) && value !== 0
}

export function isObject(obj: unknown): obj is Record<string, unknown> {
  return toString.call(obj) === '[object Object]'
}
