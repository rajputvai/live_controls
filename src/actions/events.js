export const types = {
  LOAD: 'EVENTS.LOAD',
  LOADING: 'EVENTS.LOADING',
  LOAD_SUCCESS: 'EVENTS.LOAD_SUCCESS',
  LOAD_FAILURE: 'EVENTS.LOAD_FAILURE',
};

export function loadEvents() {
  return {
    type: types.LOAD_SUCCESS,
  };
}

export function loadingEvents() {
  return {
    type: types.LOADING,
  };
}

export function loadEventsSuccess(events) {
  return {
    type: types.LOAD_SUCCESS,
    payload: {
      events,
    },
  };
}
