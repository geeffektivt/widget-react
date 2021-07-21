import { createSelector } from 'reselect'

import { WidgetStoreState } from '../store'

import { SwishState } from './swish.types'

function getSwishState(storeState: WidgetStoreState): SwishState {
  return storeState.swish
}

export const getIsPollingSwishPaymentStatus = createSelector(
  getSwishState,
  (state) => state.isPollingStatus
)

export const getSwishPaymentStatus = createSelector(
  getSwishState,
  (state) => state.paymentStatus
)

export const getSwishPaymentId = createSelector(
  getSwishState,
  (state) => state.createPaymentResponse?.id ?? null
)
