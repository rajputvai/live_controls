import produce from 'immer';
import { types } from '../actions/playlistActions';

import { parsePlaylist, playItem, stopItem, queueItem, dequeueItem, updateNowPlaying } from './playlistReducerHelpers';

const INITIAL_STATE = {
  playlist: {},
  status: {},
  currentPlayingItemId: '',
  loading: true,
  items: {},
  noPublishedPlaylistAvailable: false,
  queue: [],
  breakItemIds: [],
  graphicItemIds: [],
};

export default function playlistReducer(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case types.LOADING: {
        draft.loading = true;
        break;
      }

      case types.LOAD_SUCCESS: {
        draft.playlist = action.payload.playlist;
        parsePlaylist(draft, action.payload.playlist.items, action.payload.playlist.id);
        draft.loading = false;
        draft.noPublishedPlaylistAvailable = false;
        break;
      }

      case types.PLAY_ITEM: {
        const { breakId } = action.payload;
        playItem(breakId, draft.items[breakId]);
        draft.currentPlayingItemId = breakId;
        break;
      }

      case types.STOP_ITEM: {
        const { breakId } = action.payload;
        stopItem(draft, draft.items[breakId]);
        draft.currentPlayingItemId = '';
        break;
      }

      case types.QUEUE_ITEM: {
        const { breakId } = action.payload;
        queueItem(draft, draft.items[breakId]);
        break;
      }

      case types.DEQUEUE_ITEM: {
        const { breakId } = action.payload;
        dequeueItem(draft, draft.items[breakId]);
        break;
      }

      case types.UPDATE_NOW_PLAYING:
        updateNowPlaying(state, draft);
        localStorage.setItem(state.playlist.id, JSON.stringify(draft.items));
        break;

      case types.TOGGLE_ITEM:
        draft.items[action.payload.itemId].expanded = !draft.items[action.payload.itemId].expanded;
        break;

      case types.NO_PUBLISHED_PLAYLIST_AVAILABLE:
        draft.loading = false;
        draft.noPublishedPlaylistAvailable = true;
        break;
      default:
    }
  });
}
