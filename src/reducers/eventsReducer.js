import produce from 'immer';
import moment from 'moment';

import { types } from '../actions/eventsActions';

import { isLiveOnForEvent } from '../utilities/localStorageHelpers';

const INITIAL_STATE = {
  events: [],
  byId: {},
  selectedEvent: null,
  loading: true,
  isLiveOn: false,
};

function getRemainingTime(draft) {
  const now = moment();
  draft.selectedEvent.timeRemainingTillEventStart = moment(draft.selectedEvent.start_time).diff(now, 'milliseconds');
  draft.selectedEvent.timeRemainingTillEventEnd = moment(draft.selectedEvent.end_time).diff(now, 'milliseconds');
}

export default function eventsReducer(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case types.LOAD: {
        draft.loading = true;
        break;
      }

      case types.LOAD_SUCCESS: {
        draft.events = action.payload.events.events;
        draft.loading = false;
        if (draft.events.length === 0) {
          break;
        }
        action.payload.events.events.forEach(event => {
          event.ref_id = event.event_id; // ! ref_id was changed to event_id in backend, we continue to use it as ref_id to keep the change minimal
          draft.byId[event.ref_id] = event;
        });
        if (!draft.selectedEvent) {
          draft.selectedEvent = action.payload.events.events[0];
          draft.isLiveOn = isLiveOnForEvent(action.payload.events.events[0].ref_id);
          getRemainingTime(draft);
        }
        break;
      }

      case types.LOAD_FAILURE: {
        draft.loading = false;
        break;
      }

      case types.SELECT_EVENT: {
        draft.selectedEvent = draft.byId[action.payload.eventId];
        draft.isLiveOn = isLiveOnForEvent(action.payload.eventId);
        break;
      }

      case types.CALCULATE_REMAINING_TIME: {
        getRemainingTime(draft);
        break;
      }

      case types.SET_LIVE_ON:
        draft.isLiveOn = action.payload.liveOn;
        break;

      default:
    }
  });
}
