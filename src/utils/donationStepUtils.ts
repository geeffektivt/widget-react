import { DonationStepsOrder } from '../constants/DonationStepsOrder'
import { DonationStep } from '../constants/enums/DonationStep'

export function getNextDonationStep(step: DonationStep) {
  const stepIndex = DonationStepsOrder.indexOf(step)
  return DonationStepsOrder[
    Math.min(DonationStepsOrder.length - 1, stepIndex + 1)
  ]
}

export function getPreviousDonationStep(step: DonationStep) {
  const stepIndex = DonationStepsOrder.indexOf(step)
  return DonationStepsOrder[Math.max(0, stepIndex - 1)]
}
