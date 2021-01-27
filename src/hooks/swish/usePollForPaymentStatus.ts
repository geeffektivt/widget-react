import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { pollSwishPaymentStatusAction } from '../../store/swish/swish.actions'
import {
  getSwishPaymentStatus,
  getIsPollingSwishPaymentStatus,
  getSwishPaymentId,
} from '../../store/swish/swish.selectors'
import useAppDispatch from '../store/useAppDispatch'
import usePrevious from '../utils/usePrevious'
import useTimeout from '../utils/useTimeout'

export default function usePollForPaymentStatus(pollingIntervalMs = 2000) {
  const dispatch = useAppDispatch()

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

    if (
      paymentStatus === null ||
      paymentStatus === 'PAID' ||
      paymentStatus === 'ERROR' ||
      paymentStatus === 'DECLINED'
    ) {
      return
    }

    const isFirstFrame = wasPollingPreviousFrame === undefined
    if (isFirstFrame) {
      dispatch(pollSwishPaymentStatusAction.started({ id: paymentId }))
      return
    }

    if (wasPollingPreviousFrame) {
      safeSetTimeout(() => {
        dispatch(pollSwishPaymentStatusAction.started({ id: paymentId }))
      }, pollingIntervalMs)
    }
  }, [dispatch, paymentId, paymentStatus, isPolling, wasPollingPreviousFrame])

  return {
    isPolling,
    status: paymentStatus,
  }
}
