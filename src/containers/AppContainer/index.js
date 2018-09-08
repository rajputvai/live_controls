// Libraries
import { connect } from 'react-redux';

// Actions
import { loadEvents, selectEvent } from '../../actions/eventsActions';
import { loadPlaylist, noPublishedPlaylistAvailable } from '../../actions/playlistActions';

// Assets
import App from '../../components/App';

function mapStateToProps(state, ownProps) {
  return {
    events: state.events,
    playlist: state.playlist,
    location: ownProps.location,
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
