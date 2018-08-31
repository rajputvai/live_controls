import produce from 'immer';
import { types } from '../actions/events';

const INITIAL_STATE = {
  events: [],
};

export default function eventsReducer(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case types.EVENTS_LOADED: {
        draft.events = action.payload.events;
        break;
      }
      default:
    }
  });
}
