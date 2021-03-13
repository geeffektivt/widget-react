import { useDispatch } from 'react-redux'

import { WidgetStoreDispatch } from '../../store/store'

export default function useTypedDispatch() {
  return useDispatch<WidgetStoreDispatch>()
}
