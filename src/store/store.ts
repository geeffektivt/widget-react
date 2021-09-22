import GoogleAnalyticsGtag, {
  trackEvent,
} from '@redux-beacon/google-analytics-gtag'
import { configureStore } from '@reduxjs/toolkit'
import { createMiddleware } from 'redux-beacon'
import createSagaMiddleware from 'redux-saga'

import { donationReducer } from './donation/donation.slice'
import { paymentReducer } from './payment/payment.slice'
import { referralsReducer } from './referrals/referrals.slice'
import { uiReducer } from './ui/ui.slice'

const goToPreviousStep = trackEvent(
  (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _action: { [key: string]: any },
    _prevState: WidgetStoreState,
    nextState: WidgetStoreState
  ) => {
    return {
      category: 'stepChange',
      action: 'goToPreviousStep',
      value: nextState.ui.activeStep,
    }
  }
)
const goToNextStep = trackEvent(
  (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _action: { [key: string]: any },
    _prevState: WidgetStoreState,
    nextState: WidgetStoreState
  ) => {
    return {
      category: 'stepChange',
      action: 'goToNextStep',
      value: nextState.ui.activeStep,
    }
  }
)

const eventsMap = {
  'ui/goToNextStep': goToNextStep,
  'ui/goToPreviousStep': goToPreviousStep,
}

const trackingId = 'UA-193196713-1'
const ga = GoogleAnalyticsGtag(trackingId)

const gaMiddleware = createMiddleware(eventsMap, ga)

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    donation: donationReducer,
    ui: uiReducer,
    payment: paymentReducer,
    referrals: referralsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gaMiddleware).concat(sagaMiddleware),
})

export type WidgetStoreState = ReturnType<typeof store.getState>
export type WidgetStoreDispatch = typeof store.dispatch

export default store
