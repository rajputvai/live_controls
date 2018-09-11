import React from 'react';
import PropTypes from 'prop-types';

import Error from '../Error';
import LoadingGrid from '../../assets/LoadingGrid';

class Websocket extends React.Component {
  componentDidMount() {
    this.props.connectToWebSocket(this.props.websocketUrl);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.wasConnected && !this.props.connected && nextProps.connected) {
      window.location.reload();
    }
  }

  componentWillUnmount() {
    this.props.disconnectFromWebSocket();
  }

  render() {
    if (this.props.connecting) {
      return <LoadingGrid />;
    }
    if (!this.props.connected) {
      return <Error error="Unable to connect to websocket server" />;
    }
    if (this.props.connected) {
      return this.props.children;
    }
    return null;
  }
}

Websocket.propTypes = {
  children: PropTypes.object.isRequired,
  connected: PropTypes.bool.isRequired,
  connecting: PropTypes.bool.isRequired,
  wasConnected: PropTypes.bool.isRequired,
  connectToWebSocket: PropTypes.func.isRequired,
  disconnectFromWebSocket: PropTypes.func.isRequired,
  websocketUrl: PropTypes.string.isRequired,
};

export default Websocket;
