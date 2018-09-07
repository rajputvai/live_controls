import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import axios from 'axios';

import { types, loadingConfig, loadedConfig } from '../actions/configActions';

const loadConfigEpic = action$ =>
  action$.ofType(types.LOAD_CONFIG).mergeMap(() =>
    Observable.fromPromise(axios.get('/config.json'))
      .map(response => loadedConfig(response.data))
      .startWith(loadingConfig())
  );

export default combineEpics(loadConfigEpic);
