import { combineEpics } from 'redux-observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/dom/webSocket';
import 'rxjs/observable/dom/WebSocketSubject';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/empty';

import configLoaderEpics from './configLoaderEpics';
import eventsEpics from './eventsEpics';
import playlistEpics from './playlistEpics';
import websocketEpics from './websocketEpics';

export default combineEpics(configLoaderEpics, eventsEpics, playlistEpics, websocketEpics);
