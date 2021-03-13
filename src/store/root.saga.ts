import { all, takeLatest } from 'redux-saga/effects'

import { registerDonationAction } from './donation/donation.actions'
import { registerDonation } from './donation/donation.saga'
import { submitReferralAction } from './referrals/actions'
import { submitReferral } from './referrals/saga'

function* watchAll() {
  yield all([
    takeLatest(registerDonationAction.started.type, registerDonation),
    takeLatest(submitReferralAction.started.type, submitReferral),
  ])
}

export default watchAll
