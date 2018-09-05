import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import axios from '../utilities/axios';
import { types as eventsActionTypes, loadingEvents, loadEventsSuccess } from '../actions/eventsActions';

function getUrl() {
  const feedId = window.live_controls_config.FEED_ID;
  const playlistId = window.live_controls_config.PLAYLIST_ID;
  return `/live_events/events_in_playlist.json?feed_id=${feedId}&playlist_id=${playlistId}`;
}

const loadEventsEpic = $action =>
  $action.ofType(eventsActionTypes.LOAD).mergeMap(() =>
    Observable.fromPromise(axios.get(getUrl()))
      .mergeMap(response => [loadEventsSuccess(response.data)])
      .startWith(loadingEvents())
  );

export default combineEpics(loadEventsEpic);
