import { Root, Indicator } from '@radix-ui/react-progress'
import { useSelector } from 'react-redux'

import { State } from '../../store/state'
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
  const currentPane = useSelector((state: State) => state.layout.paneNumber)
  const totalPanes = 5

  const progressPercentage = (currentPane / totalPanes) * 100

  return (
    <StyledProgressRoot value={currentPane} max={totalPanes}>
      <StyledIndicator style={{ width: `${progressPercentage}%` }} />
    </StyledProgressRoot>
  )
}
