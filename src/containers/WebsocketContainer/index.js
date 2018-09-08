import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Websocket from '../../components/Websocket';
import { connectToWebSocket, disconnectFromWebSocket } from '../../actions/webSocketActions';

function mapStateToProps(state) {
  return {
    connected: state.webSocket.connected,
    connecting: state.webSocket.connecting,
    websocketUrl: state.config.config.WEBSOCKET_URL,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ connectToWebSocket, disconnectFromWebSocket }, dispatch);
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Websocket)
);
