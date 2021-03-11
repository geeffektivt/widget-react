import useAppDispatch from '../../../hooks/store/useAppDispatch'
import { nextPane } from '../../../store/layout/actions'
import { NextButton } from '../../shared/Buttons/NavigationButtons.style'
import { Pane } from '../Panes.style'

export default function DistributionSelectionPane() {
  const dispatch = useAppDispatch()

  function onNextClick() {
    dispatch(nextPane())
  }

  return (
    <Pane>
      Lots of sliders and stuff
      <NextButton onClick={onNextClick}>Next</NextButton>
    </Pane>
  )
}
