import { combineReducers } from 'redux';

import events from './eventsReducer';
import playlist from './playlistReducer';

export default combineReducers({
  events,
  playlist,
});
