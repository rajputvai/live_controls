export const types = {
  CONNECT: 'LIVE_CONTROLS.WEBSOCKET_CONNECT',
  RECONNECT: 'LIVE_CONTROLS.WEBSOCKET_RECONNECT',
  CONNECTED: 'LIVE_CONTROLS.WEBSOCKET_CONNECTED',
  RECEIVE_MESSAGE: 'LIVE_CONTROLS.RECEIVE_MESSAGE',
  SEND_MESSAGE: 'LIVE_CONTROLS.SEND_MESSAGE',
  SENT_MESSAGE: 'LIVE_CONTROLS.SENT_MESSAGE',
  DISCONNECT: 'LIVE_CONTROLS.WEBSOCKET_DISCONNECT',
  DISCONNECTED: 'LIVE_CONTROLS.WEBSOCKET_DISCONNECTED',
};

export function connectToWebSocket(websocketUrl) {
  return {
    type: types.CONNECT,
    payload: {
      websocketUrl,
    },
  };
}

export function connectedToWebSocket() {
  return {
    type: types.CONNECTED,
  };
}

export function reconnect(feedId) {
  return {
    type: types.RECONNECT,
    payload: {
      feedId,
    },
  };
}

export function receiveMessageFromWebSocket(msg) {
  if (msg.type) {
    return msg;
  }
  return {
    type: 'RECEIVE_MESSAGE',
    payload: msg,
  };
}

export function sendMessage(payload) {
  return {
    type: types.SEND_MESSAGE,
    payload,
  };
}

export function disconnectFromWebSocket() {
  return {
    type: types.DISCONNECT,
  };
}

export function disconnected() {
  return {
    type: types.DISCONNECTED,
  };
}

export function sentMessage() {
  return {
    type: types.SENT_MESSAGE,
  };
}
