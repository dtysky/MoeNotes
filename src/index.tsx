/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 23 Oct 2017
 * Description:
 */
import 'rxjs';
import * as React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {createLogger} from 'redux-logger';
import {createEpicMiddleware} from 'redux-observable';
import {isImmutable} from 'immutable';

import config from './config';
import rootReducer from './reducers';
import rootAction from './actions';
import APP from './APP';

const middleware = [createEpicMiddleware(rootAction)];

if (config.devMode) {
  middleware.push(createLogger({
    stateTransformer: state => {
      const newState = {};
      for (const i of Object.keys(state)) {
        if (isImmutable(state[i])) {
          newState[i] = state[i].toJS();
        } else {
          newState[i] = state[i];
        }
      }
      return newState;
    }
  }));
}

declare const window: any;

const store = createStore(
  rootReducer,
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)(
    applyMiddleware(...middleware)
  )
);

render(
  <Provider store={store}>
    <APP />
  </Provider>,
  document.getElementById('container')
);
