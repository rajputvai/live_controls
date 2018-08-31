import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import axios from '../utilities/axios';
import { types, loadingEvents, loadEventsSuccess } from '../actions/events';

const loadEventsEpic = $action =>
  $action.ofType(types.LOAD).mergeMap(() =>
    Observable.fromPromise(axios.get(window.live_controls_config.API_URL))
      .map(response => loadEventsSuccess(response.data))
      .startWith(loadingEvents())
  );

export default combineEpics(loadEventsEpic);
