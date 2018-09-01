import produce from 'immer';
import { types } from '../actions/eventsActions';

import { isLiveOnForEvent } from '../utilities/localStorageHelpers';

const INITIAL_STATE = {
  events: [],
  byId: {},
  selectedEvent: null,
  loading: true,
  isLiveOn: false,
};

export default function eventsReducer(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case types.LOAD: {
        draft.loading = true;
        break;
      }

      case types.LOAD_SUCCESS: {
        draft.events = action.payload.events.events;
        action.payload.events.events.forEach(event => {
          draft.byId[event.ref_id] = event;
        });
        if (!draft.selectedEvent) {
          draft.selectedEvent = action.payload.events.events[0];
          draft.isLiveOn = isLiveOnForEvent(action.payload.events.events[0].ref_id);
        }
        draft.loading = false;
        break;
      }

      case types.SELECT_EVENT: {
        draft.selectedEvent = draft.byId[action.payload.eventId];
        break;
      }

      default:
    }
  });
}
