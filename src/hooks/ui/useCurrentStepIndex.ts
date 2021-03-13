import { DonationStepsOrder } from '../../constants/DonationStepsOrder'

import useCurrentStep from './useCurrentStep'

export default function useCurrentStepIndex() {
  const currentStep = useCurrentStep()
  return DonationStepsOrder.indexOf(currentStep)
}
