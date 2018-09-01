import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import {
  types,
  reconnect,
  connectToWebSocket,
  receiveMessageFromWebSocket,
  sentMessage,
  disconnectFromWebSocket,
  disconnected,
} from '../actions/webSocketActions';
import TimerDurations from '../constants/timerDurations';

let socket;

const connectSocket = () => {
  console.log('connecting to websocket');
  socket = Observable.webSocket({
    url: window.live_controls_config.WEBSOCKET_URL,
  });
  console.log('connected to websocket');
  return socket;
};

const connectEpic = action$ =>
  action$.ofType(types.CONNECT).switchMap(action =>
    connectSocket()
      .multiplex(() => '', () => ({ msg: 'disconnected' }), () => true)
      .takeUntil(action$.ofType(types.DISCONNECTED))
      .map(msg => receiveMessageFromWebSocket(msg))
      .catch(() => Observable.of(reconnect()))
      .merge(
        action$
          .ofType(types.SEND_MESSAGE)
          .takeUntil(action$.ofType(types.DISCONNECTED))
          .map(action2 => {
            socket.next(action2.payload);
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
