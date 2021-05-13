import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import { donationReducer } from './donation/donation.slice'
import { referralsReducer } from './referrals/referrals.slice'
import { swishReducer } from './swish/swish.slice'
import { uiReducer } from './ui/ui.slice'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    donation: donationReducer,
    ui: uiReducer,
    swish: swishReducer,
    referrals: referralsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
})

export type WidgetStoreState = ReturnType<typeof store.getState>
export type WidgetStoreDispatch = typeof store.dispatch

export default store
