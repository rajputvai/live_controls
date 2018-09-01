import produce from 'immer';
import { types } from '../actions/webSocketActions';

const intialState = {
  connected: false,
};

export default function socketReducer(state = intialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case types.CONNECTED:
        draft.connected = true;
        break;
      case types.DISCONNECTED:
        draft.connected = false;
        break;
      case types.SENT_MESSAGE:
        console.log('sent message');
        break;
      default:
    }
  });
}
