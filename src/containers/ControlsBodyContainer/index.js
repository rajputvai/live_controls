import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ControlsBody from '../../components/ControlsBody';
import { sendMessage } from '../../actions/webSocketActions';

import { playBreak, stopItem, updateNowPlaying, toggleItem } from '../../actions/playlistActions';

function mapStateToProps(state) {
  return {
    playlist: state.playlist,
    selectedEvent: state.events.selectedEvent,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      sendMessage,
      playBreak,
      stopItem,
      updateNowPlaying,
      toggleItem,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlsBody);
