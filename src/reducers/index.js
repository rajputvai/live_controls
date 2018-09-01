import { combineReducers } from 'redux';

import events from './eventsReducer';
import playlist from './playlistReducer';
import webSocketReducer from './webSocketReducer';

export default combineReducers({
  events,
  playlist,
  webSocketReducer,
});
