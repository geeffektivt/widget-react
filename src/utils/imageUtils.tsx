export const getCausesPoster = (imgUrls: string | string[]): string => {
  const url =
    typeof imgUrls === 'string'
      ? imgUrls
      : imgUrls[Math.floor(Math.random() * imgUrls.length)]
  return url
}
