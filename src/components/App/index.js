// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

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
      // const eventsFilteredByTime = events.events.sort((e1, e2) => new Date(e1.start_time) - new Date(e2.start_time));
      const upcomingEvent = events.events.find(event => new Date(event.start_time) > new Date());
      if (upcomingEvent) {
        return <Redirect to={`/${params.feedId}/${params.playlistId}/${upcomingEvent.ref_id}`} />;
      }
      const lastEventId = events.events[events.events.length - 1].ref_id;
      return <Redirect to={`/${params.feedId}/${params.playlistId}/${lastEventId}`} />;
    }
    return (
      <AppWrapper
        feedIdInUrl={params.feedId}
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
