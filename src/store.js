import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import rootReducer from './reducers';
import epics from './epics';

const epicMiddleware = createEpicMiddleware();

<<<<<<< HEAD
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(epicMiddleware)));

export default store;
=======
export default createStore(
  rootReducer,
  compose(
    applyMiddleware(epicMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
>>>>>>> redux dev tools

epicMiddleware.run(epics);
