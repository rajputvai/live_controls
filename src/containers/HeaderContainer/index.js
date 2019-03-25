import { connect } from 'react-redux';

import Header from '../../components/Header';
import { sendMessage } from '../../actions/webSocketActions';
import { setLiveOn } from '../../actions/eventsActions';

function mapStateToProps(state) {
  return {
    events: state.events,
    playerState: state.playerState,
  };
}

export default connect(
  mapStateToProps,
  { sendMessage, setLiveOn }
)(Header);
