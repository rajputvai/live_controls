import { produce } from 'immer';

import { types } from '../actions/playerStateActions';

const initialState = {
  state: 0,
  isPlaying: false,
};

// possible values of vxg player readyState:
// 0 - PLAYER_STOPPED
// 1 - PLAYER_CONNECTING
// 2 - PLAYER_PLAYING
// 3 - PLAYER_STOPPING

export default function playerStateReducer(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case types.SET_PLAYER_STATE:
        draft.state = action.payload.state;
        draft.isPlaying = action.payload.state === 2;
        break;
      default:
    }
  });
}
