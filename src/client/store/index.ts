import { compose, createStore, applyMiddleware, Store, Middleware } from 'redux';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

import rootReducer from '../reducers';
import { asyncMiddleware } from '../model/middleware';

export function configureStore (initState: {}) {
  let composeEnhancers = compose;
  const enhancers: any[] = [];
  const middleware: Middleware[] = [
    thunk,
    reduxImmutableStateInvariant()
  ];

  if (typeof window !== 'undefined' && typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }

  const store = createStore(
    rootReducer,
    initState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
