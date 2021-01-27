import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import AppEntryPoint from './AppEntryPoint'
import { Host } from './components/Host'
import { donationReducer } from './store/donation/reducer'
import { errorReducer } from './store/error/reducer'
import { layoutReducer } from './store/layout/reducer'
import { referralReducer } from './store/referrals/reducer'
import watchAll from './store/root.saga'
import { State } from './store/state'

const rootReducer = combineReducers<State>({
  donation: donationReducer,
  layout: layoutReducer,
  error: errorReducer,
  referrals: referralReducer,
})

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)
sagaMiddleware.run(watchAll)

ReactDOM.render(
  <React.StrictMode>
    <Host>
      <Provider store={store}>
        <AppEntryPoint />
      </Provider>
    </Host>
  </React.StrictMode>,
  document.getElementById('root')
)
