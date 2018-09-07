import { combineReducers } from 'redux';

import config from './configReducer';
import events from './eventsReducer';
import playlist from './playlistReducer';
import webSocket from './webSocketReducer';

export default combineReducers({
  config,
  events,
  playlist,
  webSocket,
});
