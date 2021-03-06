import { DonorType } from '../../constants/enums/DonorType'
import { PaymentMethod } from '../../constants/enums/PaymentMethod'
import { DonationFrequency } from '../../constants/enums/RecurringDonation'
import { ShareType } from '../../constants/enums/ShareType'

export interface DonationState {
  recurring: DonationFrequency

  method: PaymentMethod | null

  donorType: DonorType
  donor?: Donor

  sum: number | null

  lastCauseRoundRobinIndex: number
  causesDistribution: CauseDistribution[]
}

export interface Donor {
  name: string
  email: string
  taxDeduction: boolean
  ssn: number
  newsletter: boolean
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
