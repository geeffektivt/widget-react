import produce, { Draft } from 'immer'
import { Action } from 'redux'
import { isType } from 'typescript-fsa'

import { createSwishPaymentAction } from './swish.actions'
import { SwishState } from './swish.types'

const initialState: SwishState = {
  createPaymentResponse: null,
  paymentStatus: null,

  createPaymentError: null,

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
  }
}

export default produce(swishReducer, initialState)
