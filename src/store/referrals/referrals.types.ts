import { ReferralOption } from '../../@types/import/content/referrals.types'

export interface ReferralsState {
  readonly referral?: ReferralOption
  readonly textInput: string
}
