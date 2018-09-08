import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {
  types,
  connectToWebSocket,
  connectedToWebSocket,
  receiveMessageFromWebSocket,
  sentMessage,
  disconnected,
} from '../actions/webSocketActions';
import TimerDurations from '../constants/timerDurations';

let webSocketSubject;
let onOpenSubject = new Subject();
let onCloseSubject = new Subject();

const connectSocket = websocketUrl => {
  onOpenSubject = new Subject();
  onCloseSubject = new Subject();
  webSocketSubject = Observable.webSocket({
    url: websocketUrl,
    openObserver: onOpenSubject,
    closeObserver: onCloseSubject,
  });
  return webSocketSubject;
};

const connectEpic = action$ =>
  action$.ofType(types.CONNECT).switchMap(action =>
    connectSocket(action.payload.websocketUrl)
      .catch(() =>
        Observable.of(connectToWebSocket(action.payload.websocketUrl)).delay(TimerDurations.webSocketReconnectTimer)
      )
      .map(data => receiveMessageFromWebSocket(data))
  );

const connectedEpic = action$ =>
  action$.ofType(types.CONNECT).switchMap(() => onOpenSubject.mapTo(connectedToWebSocket()));

const sendMessageEpic = action$ =>
  action$.ofType(types.SEND_MESSAGE).map(action => {
    webSocketSubject.next(action.payload);
    console.log('Socket message sent at time: ', Date.now());
    return sentMessage();
  });

const disconnectEpic = action$ =>
  action$.ofType(types.DISCONNECT).map(() => {
    webSocketSubject.complete();
    return disconnected();
  });

export default combineEpics(connectEpic, connectedEpic, sendMessageEpic, disconnectEpic);
