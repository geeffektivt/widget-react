import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import { donationReducer } from './donation/donation.slice'
import { paymentReducer } from './payment/payment.slice'
import { referralsReducer } from './referrals/referrals.slice'
import { uiReducer } from './ui/ui.slice'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    donation: donationReducer,
    ui: uiReducer,
    payment: paymentReducer,
    referrals: referralsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
})

export type WidgetStoreState = ReturnType<typeof store.getState>
export type WidgetStoreDispatch = typeof store.dispatch

export default store
