// Libraries
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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

export default withRouter(
  connect(
    mapStateToProps,
    {
      loadEvents,
      selectEvent,
      loadPlaylist,
      noPublishedPlaylistAvailable,
    }
  )(App)
);
