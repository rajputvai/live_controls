import { combineReducers } from 'redux';

import config from './configReducer';
import events from './eventsReducer';
import playlist from './playlistReducer';
import webSocket from './webSocketReducer';
import playerState from './playerStateReducer';

export default combineReducers({
  config,
  events,
  playlist,
  webSocket,
  playerState,
});
