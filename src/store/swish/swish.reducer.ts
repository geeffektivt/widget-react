import produce, { Draft } from 'immer'
import { Action } from 'redux'
import { isType } from 'typescript-fsa'

import {
  createSwishPaymentAction,
  pollSwishPaymentStatusAction,
} from './swish.actions'
import { SwishState } from './swish.types'

const initialState: SwishState = {
  createPaymentResponse: null,
  paymentStatus: null,

  createPaymentError: null,
  pollStatusError: null,

  isCreatingPayment: false,
  isPollingStatus: false,
}

function swishReducer(draft: Draft<SwishState>, action: Action) {
  if (isType(action, createSwishPaymentAction.started)) {
    draft.isCreatingPayment = true
    draft.createPaymentError = null
  } else if (isType(action, createSwishPaymentAction.failed)) {
    draft.isCreatingPayment = false
    draft.createPaymentError = action.payload.error
  } else if (isType(action, createSwishPaymentAction.done)) {
    draft.isCreatingPayment = false
    draft.createPaymentResponse = action.payload.result
  } else if (isType(action, pollSwishPaymentStatusAction.started)) {
    draft.isPollingStatus = true
  } else if (isType(action, pollSwishPaymentStatusAction.failed)) {
    draft.isPollingStatus = false
    draft.pollStatusError = action.payload.error
  } else if (isType(action, pollSwishPaymentStatusAction.done)) {
    draft.isPollingStatus = false
    draft.paymentStatus = action.payload.result.status
  }
}

export default produce(swishReducer, initialState)
