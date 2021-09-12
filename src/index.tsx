import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import { Provider } from 'react-redux'

// This file defines base styles and should be imported before all components
import './index.css'

import DonationWidget from './components/DonationWidget'
import store from './store/store'

ReactGA.initialize('UA-193196713-1', {
  debug: true,
  gaOptions: {
    cookieDomain: 'https://geeffektivt.se',
    cookieFlags: 'SameSite=None; Secure',
  },
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DonationWidget />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
