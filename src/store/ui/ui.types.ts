import { DonationStep } from '../../constants/enums/DonationStep'

export interface UIState {
  readonly activeStep: DonationStep
}
