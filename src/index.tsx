import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { Widget } from "./components/Widget";
import * as serviceWorker from "./serviceWorker";
import { State } from "./store/state";
import { donationReducer } from "./store/donation/reducer";
import { layoutReducer } from "./store/layout/reducer";
import { errorReducer } from "./store/error/reducer";
import { Host } from "./components/Host";
import watchAll from "./store/root.saga";
import { referralReducer } from "./store/referrals/reducer";

const rootReducer = combineReducers<State>({
  donation: donationReducer,
  layout: layoutReducer,
  error: errorReducer,
  referrals: referralReducer,
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(watchAll);

ReactDOM.render(
  <React.StrictMode>
    <Host>
      <Provider store={store}>
        <Widget />
      </Provider>
    </Host>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
