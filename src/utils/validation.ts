import Validate from 'validator'

import {
  BankPaymentRequest,
  Charity,
  PaymentRequest,
  SwishPaymentRequest,
  UpdatePaymentRequest,
} from '../@types/import/api/payment.types'
import TransferDateOptions from '../constants/TransferDateOptions'
import useAllCauses from '../hooks/content/useAllCauses'
import useAllReferralOptions from '../hooks/content/useAllReferralOptions'
import useAllTexts from '../hooks/content/useAllTexts'

export const validateUpdate = (requestArgs: UpdatePaymentRequest) => {
  const texts = useAllTexts()
  const { altATitle, altBTitle, altCTitle } = texts.donations.payment
  if (!requestArgs.id) {
    return false
  }
  if (
    requestArgs.preferredTransferDate &&
    !Validate.isIn(requestArgs.preferredTransferDate, TransferDateOptions)
  ) {
    return false
  }
  if (
    !Validate.isIn(requestArgs.monthlyPaymentMethod, [
      altATitle,
      altBTitle,
      altCTitle,
    ])
  ) {
    return false
  }
  return true
}

const isBoolean = (val: unknown) => val === true || val === false

export const validateSwish = (requestArgs: SwishPaymentRequest) => {
  if (
    requestArgs.phone === undefined ||
    !Validate.matches(requestArgs.phone, /^46\d{9,10}$/)
  ) {
    return false
  }

  return validateCreatePayment(requestArgs)
}

export const validateBank = (requestArgs: BankPaymentRequest) => {
  if (
    requestArgs.reoccursMonthly === undefined ||
    !isBoolean(requestArgs.reoccursMonthly)
  ) {
    return false
  }

  return validateCreatePayment(requestArgs)
}

export const validateCreatePayment = (requestArgs: PaymentRequest) => {
  const referralNames = useAllReferralOptions().map((r) => r.name)
  if (!requestArgs.approvesPrivacyPolicy) {
    return false
  }
  if (
    requestArgs.doTaxDeduction !== undefined &&
    !isBoolean(requestArgs.doTaxDeduction)
  ) {
    return false
  }
  if (!isBoolean(requestArgs.isAnonymous)) {
    return false
  }
  if (
    requestArgs.doTaxDeduction &&
    (!requestArgs.personalNumber ||
      !Validate.matches(requestArgs.personalNumber, /^\d{10}$/))
  ) {
    return false
  }
  if (
    requestArgs.referral !== undefined &&
    !Validate.isIn(requestArgs.referral, referralNames)
  ) {
    return false
  }
  if (
    !requestArgs.isAnonymous &&
    (requestArgs.name === undefined ||
      Validate.isEmpty(requestArgs.name) ||
      requestArgs.email === undefined ||
      Validate.isEmpty(requestArgs.email) ||
      !Validate.isEmail(requestArgs.email))
  ) {
    return false
  }
  if (!validateCharities(requestArgs.charities)) {
    return false
  }

  return true
}

const validateCharities = (charities: Charity[]) => {
  const names = useAllCauses().flatMap((c) => {
    return [c.name, ...c.organizations.map((o) => o.name)]
  })
  return (
    charities &&
    charities.length > 0 &&
    charities.every(
      (c) => Validate.isIn(c.name, names) && Number.isInteger(c.sum)
    )
  )
}
