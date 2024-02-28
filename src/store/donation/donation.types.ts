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
  chosenOrganizationId?: string
  chosenCauseId?: string
}

export interface Donor {
  name: string
  companyName: string
  email: string
  taxDeduction: boolean
  approvesPrivacyPolicy: boolean
  ssn: string
  organizationNumber: string
  newsletter: boolean
}

export interface BaseDistribution {
  id: string
  name: string
  isLocked: boolean
  share: number
  sum: number
}

export interface CauseDistribution extends BaseDistribution {
  shareType: ShareType
  lastOrganizationRoundRobinIndex: number
  organizationsDistribution: OrganizationDistribution[]
}

export type OrganizationDistribution = BaseDistribution
