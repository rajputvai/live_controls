import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import axios from '../utilities/axios';
import { types as eventsActionTypes, loadingEvents, loadEventsSuccess } from '../actions/eventsActions';
import { loadPlaylist } from '../actions/playlistActions';

function getUrl() {
  const feedId = window.live_controls_config.FEED_ID;
  const playlistId = window.live_controls_config.PLAYLIST_ID;
  return `/live_events/events_in_playlist.json?feed_id=${feedId}&playlist_id=${playlistId}`;
}

function getLatestPlaylist(events) {
  const playlists = events.events[0].playlists;
  const publishedPlaylists = playlists.filter(playlist => playlist.state === 'published');
  const orderedByLatest = publishedPlaylists.sort((p1, p2) => p2.id - p1.id);
  if (orderedByLatest.length > 0) {
    return orderedByLatest[0].id;
  }
  return 3521;
}

const loadEventsEpic = $action =>
  $action.ofType(eventsActionTypes.LOAD).mergeMap(() =>
    Observable.fromPromise(axios.get(getUrl()))
      .mergeMap(response => [loadEventsSuccess(response.data), loadPlaylist(getLatestPlaylist(response.data))])
      .startWith(loadingEvents())
  );

export default combineEpics(loadEventsEpic);
