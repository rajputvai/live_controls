// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppWrapper from './AppWrapper';
import LoadingGrid from '../../assets/LoadingGrid';
import NoFeedIdAndNoPlaylistId from './NoFeedIdAndNoPlaylistId';

class App extends Component {
  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    if (params.feedId && params.playlistId) {
      this.props.loadEvents(params.feedId, params.playlistId);
    }
  }

  render() {
    const {
      match: { params },
      events,
      selectEvent,
      loadPlaylist,
      noPublishedPlaylistAvailable,
    } = this.props;
    if (!params.feedId || !params.playlistId) {
      return <NoFeedIdAndNoPlaylistId />;
    }
    if (events.loading) {
      return <LoadingGrid />;
    }
    if (events.events.length === 0) {
      return <NoFeedIdAndNoPlaylistId />;
    }
    if (!params.eventId || !(params.eventId in events.byId)) {
      const firstEventId = events.events[0].ref_id;
      window.location.replace(`/${params.feedId}/${params.playlistId}/${firstEventId}`);
      // route get's blocked when for wrong eventId senario, find solution
      // return <Redirect to={`/${params.feedId}/${params.playlistId}/${firstEventId}`} />;
      return null;
    }
    return (
      <AppWrapper
        eventIdInUrl={params.eventId}
        events={events}
        selectEvent={selectEvent}
        loadPlaylist={loadPlaylist}
        noPublishedPlaylistAvailable={noPublishedPlaylistAvailable}
      />
    );
  }
}

App.propTypes = {
  match: PropTypes.object.isRequired,
  loadEvents: PropTypes.func.isRequired,
  selectEvent: PropTypes.func.isRequired,
  loadPlaylist: PropTypes.func.isRequired,
  noPublishedPlaylistAvailable: PropTypes.func.isRequired,
  events: PropTypes.object.isRequired,
};

export default App;
