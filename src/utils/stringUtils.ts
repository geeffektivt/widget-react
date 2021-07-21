export function caseInsensitiveContains(
  a: string | undefined | null,
  b: string | undefined | null
) {
  if (typeof a !== 'string' || typeof b !== 'string') {
    return false
  }

  return a.toLowerCase().includes(b.toLowerCase())
}
