import { Organization } from '../@types/import/content/organizations.types'
import { PaymentMethod } from '../constants/enums/PaymentMethod'
import { DonationFrequency } from '../constants/enums/RecurringDonation'
import { ShareType } from '../constants/enums/ShareType'
import { OrganizationShare } from '../types/Temp'

export interface Layout {
  privacyPolicy: boolean
  paneNumber: number
  answeredReferral?: boolean
  height: number
  loading: boolean
  organizations?: Organization[]
}

export interface DonationInput {
  method?: PaymentMethod
  sum?: number
  shareType: ShareType
  recurring: DonationFrequency
  donor?: Donor
  shares: OrganizationShare[]
}

export interface Donation extends DonationInput {
  kid?: string
  paymentProviderURL?: string
  isValid: boolean
}

export interface DonorInput {
  name?: string
  email?: string
  taxDeduction?: boolean
  approvesPrivacyPolicy?: boolean
  ssn?: string
  newsletter?: boolean
}

export interface Donor extends DonorInput {
  donorID?: number
}
