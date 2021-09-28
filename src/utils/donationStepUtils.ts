import { DonationStepsOrder } from '../constants/DonationStepsOrder'
import { DonationStep } from '../constants/enums/DonationStep'

export const getNextDonationStep = (step: DonationStep) => {
  const stepIndex = DonationStepsOrder.indexOf(step)
  return DonationStepsOrder[
    Math.min(DonationStepsOrder.length - 1, stepIndex + 1)
  ]
}

export const getPreviousDonationStep = (step: DonationStep) => {
  const stepIndex = DonationStepsOrder.indexOf(step)
  return DonationStepsOrder[Math.max(0, stepIndex - 1)]
}
