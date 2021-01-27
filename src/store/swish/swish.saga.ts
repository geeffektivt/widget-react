import { SagaIterator } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { Attempt, attempt, hasFailed } from 'ts-failure'
import { Action } from 'typescript-fsa'

import { SwishPaymentResponse } from '../../@types/import/api/swish.types'
import { ApiResponse } from '../../utils/api/apiHelpers'
import AppError, { isAppError } from '../../utils/api/appError'

import {
  createSwishPaymentAction,
  CreateSwishPaymentActionArgs,
} from './swish.actions'
import { createSwishPaymentRequest } from './swish.api'

export function* createSwishPaymentSaga(
  action: Action<CreateSwishPaymentActionArgs>
): SagaIterator<void> {
  const createPaymentArgs = action.payload

  const request = createSwishPaymentRequest(createPaymentArgs)
  const apiResponse: Attempt<ApiResponse<SwishPaymentResponse>> = yield call(
    attempt,
    request
  )

  if (hasFailed(apiResponse)) {
    yield put(
      createSwishPaymentAction.failed({
        params: createPaymentArgs,
        error: isAppError(apiResponse.error)
          ? apiResponse.error
          : AppError.fromError('', apiResponse.error),
      })
    )
    return
  }

  const paymentResponse = apiResponse.body
  if (!paymentResponse) {
    yield put(
      createSwishPaymentAction.failed({
        params: createPaymentArgs,
        error: new AppError({
          message: 'Failed to create swish payment',
          extraData: apiResponse,
        }),
      })
    )
    return
  }

  yield put(
    createSwishPaymentAction.done({
      params: action.payload,
      result: paymentResponse,
    })
  )
}
