import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {
  types,
  reconnect,
  connectToWebSocket,
  connectedToWebSocket,
  receiveMessageFromWebSocket,
  sentMessage,
  disconnectFromWebSocket,
  disconnected,
} from '../actions/webSocketActions';
import TimerDurations from '../constants/timerDurations';

let socket;
const onOpenSubject = new Subject();

const connectSocket = websocketUrl => {
  socket = Observable.webSocket({ url: websocketUrl, openObserver: onOpenSubject });
  return socket;
};

const connectEpic = action$ =>
  action$.ofType(types.CONNECT).switchMap(action =>
    connectSocket(action.payload.websocketUrl)
      .multiplex(() => ({ msg: 'connection' }), () => ({ msg: 'disconnected' }), () => true)
      .takeUntil(action$.ofType(types.DISCONNECTED))
      .map(msg => receiveMessageFromWebSocket(msg))
      .catch(() => Observable.of(reconnect()))
      .merge(
        onOpenSubject.map(connectedToWebSocket),
        action$
          .ofType(types.SEND_MESSAGE)
          .takeUntil(action$.ofType(types.DISCONNECTED))
          .map(action2 => {
            socket.next(action2.payload);
            console.log('Socket message sent at time: ', Date.now());
            return sentMessage();
          }),
        action$.ofType(types.DISCONNECT).map(() => {
          socket.complete();
          return disconnected();
        }),
        action$.ofType(types.RECONNECT).mergeMap(action3 =>
          Observable.of(connectToWebSocket(action3.payload.feedId))
            .delay(TimerDurations.webSocketReconnectTimer)
            .startWith(disconnectFromWebSocket())
        )
      )
  );

export default combineEpics(connectEpic);
