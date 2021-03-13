import { ReferralOption } from '../../@types/import/content/referrals.types'
import referralOptions from '../../content/referrals.json'

// Named as a hook because the idea is to put them in the store later
export default function useAllReferralOptions(): ReferralOption[] {
  return referralOptions
}
