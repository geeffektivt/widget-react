import { createSelector } from 'reselect'

import { State } from '../state'

import { SwishState } from './swish.types'

function getSwishState(storeState: State): SwishState {
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
  (state) => state.createPaymentResponse?.paymentId ?? null
)
