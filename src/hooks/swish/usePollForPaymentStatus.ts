import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import {
  getSwishPaymentStatus,
  getIsPollingSwishPaymentStatus,
  getSwishPaymentId,
} from '../../store/swish/swish.selectors'
import { swishAsyncActions } from '../../store/swish/swish.slice'
import useTypedDispatch from '../store/useTypedDispatch'
import usePrevious from '../utils/usePrevious'
import useTimeout from '../utils/useTimeout'

export default function usePollForPaymentStatus(pollingIntervalMs = 2000) {
  const dispatch = useTypedDispatch()

  const safeSetTimeout = useTimeout()

  const paymentStatus = useSelector(getSwishPaymentStatus)
  const isPolling = useSelector(getIsPollingSwishPaymentStatus)
  const wasPollingPreviousFrame = usePrevious(isPolling)

  const paymentId = useSelector(getSwishPaymentId)

  useEffect(() => {
    if (!paymentId) {
      return
    }

    if (isPolling) {
      return
    }

    if (paymentStatus !== 'CREATED' && paymentStatus !== 'STARTED') {
      return
    }

    const isFirstFrame = !isPolling && !wasPollingPreviousFrame
    if (isFirstFrame) {
      dispatch(swishAsyncActions.pollSwishPaymentStatus({ id: paymentId }))
      return
    }

    if (wasPollingPreviousFrame) {
      safeSetTimeout(() => {
        dispatch(swishAsyncActions.pollSwishPaymentStatus({ id: paymentId }))
      }, pollingIntervalMs)
    }
  }, [dispatch, paymentId, paymentStatus, isPolling, wasPollingPreviousFrame])

  return {
    isPolling,
    status: paymentStatus,
  }
}
