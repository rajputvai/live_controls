import produce from 'immer';
import { types } from '../actions/webSocketActions';

const intialState = {
  connecting: true,
  connected: false,
};

export default function socketReducer(state = intialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case types.CONNECT:
        draft.connecting = true;
        draft.connected = false;
        break;

      case types.CONNECTED:
        draft.connected = true;
        draft.connecting = false;
        break;

      case types.SENT_MESSAGE:
        console.log('sent message');
        break;

      case types.DISCONNECTED:
        draft.connected = false;
        draft.connecting = false;
        break;

      default:
    }
  });
}
