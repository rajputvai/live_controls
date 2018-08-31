import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

// import axios from '../utilities/axios';
import { types, loadEventsSuccess } from '../actions/events';

const loadEventsEpic = $action =>
  $action
    .ofType(types.LOAD)
    .mergeMap(action =>
      Observable.fromPromise(Promise.resolve([{ id: 1 }, { id: 2 }])).map(response => loadEventsSuccess(response.data))
    );

export default combineEpics(loadEventsEpic);
