import useTypedSelector from '../store/useTypedSelector'

export default function useCurrentStep() {
  return useTypedSelector((state) => state.ui.activeStep)
}
