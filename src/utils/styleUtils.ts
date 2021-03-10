export function pxToRem(px: number): string {
  const baseRemPx = 16
  return `${px / baseRemPx}rem`
}
