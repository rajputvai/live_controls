// Libraries
import { connect } from 'react-redux';

// Actions
import { loadEvents, selectEvent } from '../../actions/eventsActions';
import { loadPlaylist, noPublishedPlaylistAvailable } from '../../actions/playlistActions';

// Assets
import App from '../../components/App';

function mapStateToProps(state) {
  return {
    events: state.events,
    playlist: state.playlist,
  };
}

export default connect(
  mapStateToProps,
  {
    loadEvents,
    selectEvent,
    loadPlaylist,
    noPublishedPlaylistAvailable,
  }
)(App);
