import actionCreatorFactory from 'typescript-fsa'

import {
  SwishPaymentRequest,
  SwishPaymentResponse,
} from '../../@types/import/api/swish.types'
import AppError from '../../utils/api/appError'

const actionFactory = actionCreatorFactory('swish')

export type CreateSwishPaymentActionArgs = SwishPaymentRequest

export const createSwishPaymentAction = actionFactory.async<
  CreateSwishPaymentActionArgs,
  SwishPaymentResponse,
  AppError
>('CREATE_SWISH_PAYMENT')
