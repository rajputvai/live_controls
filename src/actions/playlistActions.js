export const types = {
  LOAD: 'PLAYLIST.LOAD',
  LOADING: 'PLAYLIST.LOADING',
  LOAD_SUCCESS: 'PLAYLIST.LOAD_SUCCESS',
  LOAD_FAILURE: 'PLAYLIST.LOAD_FAILURE',
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
