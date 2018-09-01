import { combineEpics } from 'redux-observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/dom/webSocket';
import 'rxjs/observable/dom/WebSocketSubject';

import eventsEpics from './eventsEpics';
import playlistEpics from './playlistEpics';
import websocketEpics from './websocketEpics';

export default combineEpics(eventsEpics, playlistEpics, websocketEpics);
