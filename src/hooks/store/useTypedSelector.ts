import { useSelector } from 'react-redux'

import { WidgetStoreState } from '../../store/store'

export default function useTypedSelector<TSelected = unknown>(
  selector: (state: WidgetStoreState) => TSelected
) {
  return useSelector<WidgetStoreState, TSelected>(selector)
}
