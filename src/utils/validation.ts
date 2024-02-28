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
import useAllTexts from '../hooks/content/useAllTexts'

export const validateUpdate = (requestArgs: UpdatePaymentRequest) => {
  const texts = useAllTexts()
  const { altATitle, altBTitle, altCTitle } = texts.donations.payment
  if (!requestArgs.id) {
    console.error('validateUpdate: id not valid', [JSON.stringify(requestArgs)])
    return false
  }
  if (
    requestArgs.preferredTransferDate &&
    !Validate.isIn(requestArgs.preferredTransferDate, TransferDateOptions)
  ) {
    console.error('validateUpdate: preferredTransferDate not valid', [
      JSON.stringify(requestArgs),
    ])
    return false
  }
  if (
    !Validate.isIn(requestArgs.monthlyPaymentMethod, [
      altATitle,
      altBTitle,
      altCTitle,
    ])
  ) {
    console.error('validateUpdate: monthlyPaymentMethod not valid', [
      JSON.stringify(requestArgs),
    ])
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
    console.error('validateSwish: phone not valid', [
      JSON.stringify(requestArgs),
    ])
    return false
  }

  return validateCreatePayment(requestArgs)
}

export const validateBank = (requestArgs: BankPaymentRequest) => {
  if (
    requestArgs.reoccursMonthly === undefined ||
    !isBoolean(requestArgs.reoccursMonthly)
  ) {
    console.error('validateBank: reoccursMonthly not valid', [
      JSON.stringify(requestArgs),
    ])
    return false
  }

  return validateCreatePayment(requestArgs)
}

export const validateCreatePayment = (requestArgs: PaymentRequest) => {
  if (!requestArgs.approvesPrivacyPolicy) {
    console.error('validateCreatePayment: approvesPrivacyPolicy not valid', [
      JSON.stringify(requestArgs),
    ])
    return false
  }
  if (!isBoolean(requestArgs.isAnonymous)) {
    console.error('validateCreatePayment: isAnonymous not valid', [
      JSON.stringify(requestArgs),
    ])
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
    console.error('validateCreatePayment: name or email not valid', [
      JSON.stringify(requestArgs),
    ])
    return false
  }
  if (requestArgs.tip && !Number.isInteger(requestArgs.tip)) {
    console.error('validateCreatePayment: tip not valid', [
      JSON.stringify(requestArgs),
    ])
    return false
  }
  if (!validateCharities(requestArgs.charities, requestArgs.tip)) {
    console.error('validateCreatePayment: charities not valid', [
      JSON.stringify(requestArgs),
    ])
    return false
  }

  if (requestArgs._sourceType === 'individual') {
    if (
      requestArgs.doTaxDeduction !== undefined &&
      !isBoolean(requestArgs.doTaxDeduction)
    ) {
      console.error('validateCreatePayment: doTaxDeduction not valid', [
        JSON.stringify(requestArgs),
      ])
      return false
    }
    if (
      requestArgs.doTaxDeduction &&
      (!requestArgs.personalNumber ||
        !Validate.matches(requestArgs.personalNumber, /^\d{10}$|^\d{12}$/))
    ) {
      console.error('validateCreatePayment: personalNumber not valid', [
        JSON.stringify(requestArgs),
      ])
      return false
    }
  }

  return true
}

const validateCharities = (charities: Charity[], tip: number | undefined) => {
  const names = useAllCauses().flatMap((c) => {
    return [c.name, ...c.organizations.map((o) => o.name)]
  })
  return (
    ((charities && charities.length > 0) || (tip ?? 0) > 0) &&
    charities.every(
      (c) => Validate.isIn(c.name, names) && Number.isInteger(c.sum)
    )
  )
}
