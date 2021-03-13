import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory()

export const submitReferralAction = actionCreator.async<number, boolean, Error>(
  'SUBMIT_REFERRAL'
)
