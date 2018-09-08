export const types = {
  LOAD: 'EVENTS.LOAD',
  LOADING: 'EVENTS.LOADING',
  LOAD_SUCCESS: 'EVENTS.LOAD_SUCCESS',
  LOAD_FAILURE: 'EVENTS.LOAD_FAILURE',
  SELECT_EVENT: 'EVENTS.SELECT_EVENTS',
  START_INTERVAL_TO_CALCULATE_REMAINING_TIME: 'EVENTS.START_INTERVAL_TO_CALCULATE_REMAINING_TIME',
  CALCULATE_REMAINING_TIME: 'EVENTS.CALCULATE_REMAINING_TIME',
};

export function loadEvents(feedId, playlistId) {
  return {
    type: types.LOAD,
    payload: {
      feedId,
      playlistId,
    },
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

export function loadEventsFailed() {
  return {
    type: types.LOAD_FAILURE,
  };
}

export function selectEvent(eventId) {
  return {
    type: types.SELECT_EVENT,
    payload: {
      eventId,
    },
  };
}

export function startIntervalToCalculateRemainingTime(events) {
  return {
    type: types.START_INTERVAL_TO_CALCULATE_REMAINING_TIME,
    payload: {
      events,
    },
  };
}

export function calculateRemainingTime() {
  return {
    type: types.CALCULATE_REMAINING_TIME,
  };
}
