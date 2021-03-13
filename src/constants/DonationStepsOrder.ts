import { DonationStep } from './enums/DonationStep'

export const DonationStepsOrder = [
  DonationStep.PaymentMethod,
  DonationStep.DonorInfo,
  DonationStep.Donation,
  DonationStep.Referral,
  DonationStep.Payment,
]
