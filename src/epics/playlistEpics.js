import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import axios from '../utilities/axios';
import { types, loadingPlaylist, loadPlaylistSuccess } from '../actions/playlistActions';

function getUrl(playlistId) {
  return `/playlist/break.json?playlist_id=${playlistId}&feed_id=14&auth_token=RxqYxQC2qGw8tjzKsWB4`;
}
const loadPlaylistEpic = $action =>
  $action.ofType(types.LOAD).mergeMap(action =>
    Observable.fromPromise(axios.get(getUrl(action.payload.playlistId)))
      .map(response => loadPlaylistSuccess(response.data))
      .startWith(loadingPlaylist())
  );

export default combineEpics(loadPlaylistEpic);
