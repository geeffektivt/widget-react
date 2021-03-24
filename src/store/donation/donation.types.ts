import { DonorType } from '../../constants/enums/DonorType'
import { PaymentMethod } from '../../constants/enums/PaymentMethod'
import { DonationFrequency } from '../../constants/enums/RecurringDonation'
import { ShareType } from '../../constants/enums/ShareType'

export interface DonationState {
  recurring: DonationFrequency

  method: PaymentMethod | null

  donorType: DonorType
  // donorInformation: DonorInformation | null
  // donorId: DonorId | null

  sum: number | null

  lastCauseRoundRobinIndex: number
  causesDistribution: CauseDistribution[]
}

export interface BaseDistribution {
  id: string
  share: number
  isLocked: boolean
}

export interface CauseDistribution extends BaseDistribution {
  shareType: ShareType
  lastOrganizationRoundRobinIndex: number
  organizationsDistribution: OrganizationDistribution[]
}

export type OrganizationDistribution = BaseDistribution
