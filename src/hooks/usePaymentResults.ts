import { SwishPaymentRedirectQueries } from '../@types/import/api/payment.types'

export default function usePaymentResults(): SwishPaymentRedirectQueries | null {
  return null
}

export function useHasPaymentResults() {
  return usePaymentResults() !== null
}
