import produce from 'immer';
import { types } from '../actions/playlistActions';

const INITIAL_STATE = {
  playlist: {},
  loading: true,
};

export default function playlistReducer(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case types.LOAD: {
        draft.loading = true;
        break;
      }

      case types.LOAD_SUCCESS: {
        draft.playlist = action.payload.playlist;
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
