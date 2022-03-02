import 'react-phone-input-2/lib/style.css'
import { CaptureConsole } from '@sentry/integrations'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import DonationWidget from './components/DonationWidget'
import store from './store/store'

Sentry.init({
  dsn: 'https://1ec35029845c43c89858154e2134bc78@o1010645.ingest.sentry.io/5975237',
  integrations: [
    new Integrations.BrowserTracing(),
    new CaptureConsole({
      // defaults to ['log', 'info', 'warn', 'error', 'debug', 'assert']
      levels: ['error'],
    }),
  ],
  environment: process.env.NODE_ENV,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production <- TODO
  tracesSampleRate: 1.0,
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DonationWidget />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
