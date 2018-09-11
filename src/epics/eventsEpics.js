import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import axios from '../utilities/axios';
import {
  types,
  loadingEvents,
  loadEventsSuccess,
  loadEventsFailed,
  startIntervalToCalculateRemainingTime,
  calculateRemainingTime,
} from '../actions/eventsActions';

function getUrl({ feedId, playlistId }) {
  return `/live_events/events_in_playlist.json?feed_id=${feedId}&playlist_id=${playlistId}`;
}

const loadEventsEpic = $action =>
  $action.ofType(types.LOAD).mergeMap(action =>
    Observable.fromPromise(axios.get(getUrl(action.payload)))
      .mergeMap(response => [loadEventsSuccess(response.data), startIntervalToCalculateRemainingTime(response.data)])
      .catch(error => Observable.of(loadEventsFailed(error)))
      .startWith(loadingEvents())
  );

const startCalculatingRemainingTimeEpic = $action =>
  $action.ofType(types.START_INTERVAL_TO_CALCULATE_REMAINING_TIME).switchMap(action => {
    if (action.payload.events.events.length > 0) {
      return Observable.interval(1000).mapTo(calculateRemainingTime());
    }
    return Observable.empty();
  });

export default combineEpics(loadEventsEpic, startCalculatingRemainingTimeEpic);
