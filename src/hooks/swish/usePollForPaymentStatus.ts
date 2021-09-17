import { useEffect } from 'react'

import { paymentAsyncActions } from '../../store/payment/payment.slice'
import useTypedDispatch from '../store/useTypedDispatch'
import useTypedSelector from '../store/useTypedSelector'
import usePrevious from '../utils/usePrevious'
import useTimeout from '../utils/useTimeout'

export default function usePollForPaymentStatus(pollingIntervalMs = 2000) {
  const dispatch = useTypedDispatch()

  const safeSetTimeout = useTimeout()

  const { paymentStatus, swish } = useTypedSelector((state) => state.payment)
  const { isPollingStatus: isPolling } = swish
  const paymentId = useTypedSelector(
    (state) => state.payment.createPaymentResponse?.id ?? null
  )

  const wasPollingPreviousFrame = usePrevious(isPolling)

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
      dispatch(paymentAsyncActions.pollSwishPaymentStatus({ id: paymentId }))
      return
    }

    if (wasPollingPreviousFrame) {
      safeSetTimeout(() => {
        dispatch(paymentAsyncActions.pollSwishPaymentStatus({ id: paymentId }))
      }, pollingIntervalMs)
    }
  }, [dispatch, paymentId, paymentStatus, isPolling, wasPollingPreviousFrame])

  return {
    isPolling,
    status: paymentStatus,
  }
}
