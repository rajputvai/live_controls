export const types = {
  LOAD: 'PLAYLIST.LOAD',
  LOADING: 'PLAYLIST.LOADING',
  LOAD_SUCCESS: 'PLAYLIST.LOAD_SUCCESS',
  LOAD_FAILURE: 'PLAYLIST.LOAD_FAILURE',
  PLAY_ITEM: 'PLAYLIST.PLAY_ITEM',
  STOP_ITEM: 'PLAYLIST.STOP_ITEM',
  UPDATE_NOW_PLAYING: 'PLAYLIST.UPDATE_NOW_PLAYING',
  TOGGLE_ITEM: 'PLAYLIST.TOGGLE_ITEM',
  NO_PUBLISHED_PLAYLIST_AVAILABLE: 'PLAYLIST.NO_PUBLISHED_PLAYLIST_AVAILABLE',
};

export function loadPlaylist(playlistId) {
  return {
    type: types.LOAD,
    payload: {
      playlistId,
    },
  };
}

export function loadingPlaylist() {
  return {
    type: types.LOADING,
  };
}

export function loadPlaylistSuccess(playlist) {
  return {
    type: types.LOAD_SUCCESS,
    payload: {
      playlist,
    },
  };
}

export function playItem(eventId, playlistId, breakId) {
  return {
    type: types.PLAY_ITEM,
    payload: {
      eventId,
      playlistId,
      breakId,
    },
  };
}

export function stopItem(eventId, playlistId, breakId) {
  return {
    type: types.STOP_ITEM,
    payload: {
      eventId,
      playlistId,
      breakId,
    },
  };
}

export function updateNowPlaying() {
  return {
    type: types.UPDATE_NOW_PLAYING,
  };
}

export function toggleItem(itemId) {
  return {
    type: types.TOGGLE_ITEM,
    payload: {
      itemId,
    },
  };
}

export function noPublishedPlaylistAvailable() {
  return {
    type: types.NO_PUBLISHED_PLAYLIST_AVAILABLE,
  };
}
