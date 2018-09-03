import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import rootReducer from './reducers';
import epics from './epics';

const epicMiddleware = createEpicMiddleware();

export default createStore(
  rootReducer,
  compose(
    applyMiddleware(epicMiddleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

epicMiddleware.run(epics);
