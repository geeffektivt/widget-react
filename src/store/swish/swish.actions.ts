import actionCreatorFactory from 'typescript-fsa'

import {
  SwishPaymentRequest,
  SwishPaymentResponse,
  SwishPaymentStatusRequest,
  SwishPaymentStatusResponse,
} from '../../@types/import/api/swish.types'
import AppError from '../../utils/api/appError'

const actionFactory = actionCreatorFactory('swish')

export type CreateSwishPaymentActionArgs = SwishPaymentRequest

export const createSwishPaymentAction = actionFactory.async<
  CreateSwishPaymentActionArgs,
  SwishPaymentResponse,
  AppError
>('CREATE_SWISH_PAYMENT')

export const pollSwishPaymentStatusAction = actionFactory.async<
  SwishPaymentStatusRequest,
  SwishPaymentStatusResponse,
  AppError
>('POLL_SWISH_PAYMENT_STATUS')
