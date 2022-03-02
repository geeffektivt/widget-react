import { configureStore, Middleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import { DonationStep } from '../constants/enums/DonationStep'

import { donationReducer } from './donation/donation.slice'
import { paymentReducer } from './payment/payment.slice'
import { referralsReducer } from './referrals/referrals.slice'
import { uiReducer } from './ui/ui.slice'

const postMessageMiddleware: Middleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    if (process.env.NODE_ENV === 'production') {
      const { donation, ui } = getState()
      if (action.type === 'ui/goToNextStep') {
        const nextStep = ui.activeStep + 1
        const eventData = {
          action: `Proceeded to ${DonationStep[nextStep]}`,
          category: 'stepChange',
          label: donation.recurring,
          value:
            nextStep === DonationStep.Payment
              ? donation.sum ?? undefined
              : undefined,
        }
        window.parent.postMessage(eventData, 'https://geeffektivt.se/')
        window.parent.postMessage('scrollToTop', 'https://geeffektivt.se/')
      }
      if (action.type === 'ui/goToPreviousStep') {
        const eventData = {
          action: `Went back to ${DonationStep[ui.activeStep - 1]}`,
          category: 'stepChange',
          label: donation.recurring,
        }
        window.parent.postMessage(eventData, 'https://geeffektivt.se/')
        window.parent.postMessage('scrollToTop', 'https://geeffektivt.se/')
      }
    }

    return next(action)
  }

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    donation: donationReducer,
    ui: uiReducer,
    payment: paymentReducer,
    referrals: referralsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postMessageMiddleware).concat(sagaMiddleware),
})

export type WidgetStoreState = ReturnType<typeof store.getState>
export type WidgetStoreDispatch = typeof store.dispatch

export default store
