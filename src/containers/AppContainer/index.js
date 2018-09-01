import { connect } from 'react-redux';

import App from '../../components/App';
import { loadEvents } from '../../actions/eventsActions';
import { connectToWebSocket, disconnectFromWebSocket } from '../../actions/webSocketActions';

export default connect(
  null,
  { loadEvents, connectToWebSocket, disconnectFromWebSocket }
)(App);
