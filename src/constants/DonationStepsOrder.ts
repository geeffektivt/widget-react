import { DonationStep } from './enums/DonationStep'

export const DonationStepsOrder = [
  DonationStep.PaymentMethod,
  DonationStep.DonorInfo,
  DonationStep.Donation,
  DonationStep.GiftCards,
  DonationStep.Referral,
  DonationStep.Summary,
  DonationStep.Payment,
]
