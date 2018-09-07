import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ControlsBody from '../../components/ControlsBody';
import { sendMessage } from '../../actions/webSocketActions';

import {
  playItem,
  stopItem,
  queueItem,
  dequeueItem,
  updateNowPlaying,
  toggleItem,
} from '../../actions/playlistActions';

function mapStateToProps(state) {
  return {
    config: state.config.config,
    playlist: state.playlist,
    selectedEvent: state.events.selectedEvent,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      sendMessage,
      playItem,
      stopItem,
      queueItem,
      dequeueItem,
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
