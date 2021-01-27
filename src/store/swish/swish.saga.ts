import { SagaIterator } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { Attempt, attempt, hasFailed } from 'ts-failure'
import { Action } from 'typescript-fsa'

import {
  SwishPaymentResponse,
  SwishPaymentStatusRequest,
  SwishPaymentStatusResponse,
} from '../../@types/import/api/swish.types'
import { ApiResponse } from '../../utils/api/apiHelpers'
import AppError from '../../utils/api/appError'

import {
  createSwishPaymentAction,
  CreateSwishPaymentActionArgs,
  pollSwishPaymentStatusAction,
} from './swish.actions'
import {
  createSwishPaymentRequest,
  pollSwishPaymentStatusRequest,
} from './swish.api'

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
        error: AppError.fromError(
          'Failed to create swish payment',
          apiResponse.error
        ),
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
          message: 'Got an invalid response when creating swish payment',
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

export function* pollSwishPaymentStatusSaga(
  action: Action<SwishPaymentStatusRequest>
): SagaIterator<void> {
  const pollArgs = action.payload

  const request = pollSwishPaymentStatusRequest(pollArgs)
  const apiResponse: Attempt<
    ApiResponse<SwishPaymentStatusResponse>
  > = yield call(attempt, request)

  if (hasFailed(apiResponse)) {
    yield put(
      pollSwishPaymentStatusAction.failed({
        params: pollArgs,
        error: AppError.fromError(
          'Failed to fetch swish payment status',
          apiResponse.error
        ),
      })
    )
    return
  }

  const statusResponse = apiResponse.body
  if (!statusResponse) {
    yield put(
      pollSwishPaymentStatusAction.failed({
        params: pollArgs,
        error: new AppError({
          message: 'Got an invalid response from swish payment status',
          extraData: apiResponse,
        }),
      })
    )
    return
  }

  yield put(
    pollSwishPaymentStatusAction.done({
      params: pollArgs,
      result: statusResponse,
    })
  )
}
