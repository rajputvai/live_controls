import { playItem, stopItem, queueItem, dequeueItem, playGraphics, stopGraphics } from "./playlistActions";

export const types = {
  CONNECT: 'LIVE_CONTROLS.WEBSOCKET_CONNECT',
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

export function receiveMessageFromWebSocket(msg) {
  if (msg.trigger_type === "break") {
    switch (msg.command) {
      case "start":
        return playItem(msg.params.live_event_id, msg.params.break_name);

      case "stop":
        return stopItem(msg.params.live_event_id, msg.params.break_name);
      
      case "queue":
        return queueItem(msg.params.live_event_id, msg.params.break_name);

      case "dequeue":
        return dequeueItem(msg.params.live_event_id, msg.params.break_name);
    }
  } else if (msg.trigger_type === "graphic") {
    switch (msg.command) {
      case "start":
        return playGraphics(msg.params.live_event_id, msg.params.graphic_name);

      case "stop":
        return stopGraphics(msg.params.live_event_id, msg.params.graphic_name);
    }
  }
  // if (msg.type) {
  //   return msg;
  // }
  // return {
  //   type: 'RECEIVE_MESSAGE',
  //   payload: msg,
  // };
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
