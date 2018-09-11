export const types = {
  SET_PLAYER_STATE: 'PLAYER_STATE.SET_PLAYER_STATE',
};

export function setPlayerState(state) {
  return {
    type: types.SET_PLAYER_STATE,
    payload: { state },
  };
}
