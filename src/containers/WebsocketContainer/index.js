import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Websocket from '../../components/Websocket';
import { connectToWebSocket, disconnectFromWebSocket } from '../../actions/webSocketActions';

function mapStateToProps(state, ownProps) {
  return {
    connected: state.webSocket.connected,
    connecting: state.webSocket.connecting,
    websocketUrl: state.config.config.WEBSOCKET_URL,
    location: ownProps.location,
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
