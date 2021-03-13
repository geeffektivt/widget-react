import { Root, Indicator } from '@radix-ui/react-progress'

import { DonationStepsOrder } from '../../constants/DonationStepsOrder'
import useCurrentStepIndex from '../../hooks/ui/useCurrentStepIndex'
import { styled } from '../../styles/stitches.config'

const StyledProgressRoot = styled(Root, {
  height: '$progressBarHeight',
  position: 'relative',
})

const StyledIndicator = styled(Indicator, {
  backgroundColor: '$primary100',
  height: '100%',
  position: 'absolute',
  // transition: 'width 0.1s',
})

export default function FlowProgress() {
  const currentStepIndex = useCurrentStepIndex()
  const totalPanes = DonationStepsOrder.length

  const progressPercentage = (currentStepIndex / totalPanes) * 100

  return (
    <StyledProgressRoot value={currentStepIndex} max={totalPanes}>
      <StyledIndicator style={{ width: `${progressPercentage}%` }} />
    </StyledProgressRoot>
  )
}
