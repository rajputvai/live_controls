import { connect } from 'react-redux';

import ControlsBody from '../../components/ControlsBody';
import { sendMessage } from '../../actions/webSocketActions';

function mapStateToProps(state) {
  return { playlist: state.playlist, selectedEvent: state.events.selectedEvent };
}

export default connect(
  mapStateToProps,
  { sendMessage }
)(ControlsBody);
