export function removeNullAndUndefined<T>(
  list: Array<T | null | undefined> | undefined | null
): T[] {
  const cleanedList =
    list?.filter((item) => item !== null && item !== undefined) ?? []
  return cleanedList as T[]
}
