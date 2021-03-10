import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

// This file defines base styles and should be imported before all components
import './index.css'

import DonationWidget from './components/DonationWidget'
import { donationReducer } from './store/donation/reducer'
import { errorReducer } from './store/error/reducer'
import { layoutReducer } from './store/layout/reducer'
import { referralReducer } from './store/referrals/reducer'
import watchAll from './store/root.saga'
import { State } from './store/state'
import swishReducer from './store/swish/swish.reducer'

const rootReducer = combineReducers<State>({
  donation: donationReducer,
  layout: layoutReducer,
  error: errorReducer,
  referrals: referralReducer,
  swish: swishReducer,
})

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(watchAll)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DonationWidget />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
