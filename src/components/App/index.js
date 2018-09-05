// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppWrapper from './AppWrapper';

class App extends Component {
  render() {
    const {
      match: { params },
      events,
      selectEvent,
      loadPlaylist,
    } = this.props;
    if (!params.feedId || !params.playlistId) {
      return '404';
    }
    if (!params.eventId || !(params.eventId in events.byId)) {
      const firstEventId = events.events[0].ref_id;
      window.location.replace(`/${params.feedId}/${params.playlistId}/${firstEventId}`);
      // route get's blocked when for wrong eventId senario, find solution
      // return <Redirect to={`/${params.feedId}/${params.playlistId}/${firstEventId}`} />;
      return null;
    }
    return (
      <AppWrapper eventIdInUrl={params.eventId} events={events} selectEvent={selectEvent} loadPlaylist={loadPlaylist} />
    );
  }
}

App.propTypes = {
  match: PropTypes.object.isRequired,
  selectEvent: PropTypes.func.isRequired,
  loadPlaylist: PropTypes.func.isRequired,
  events: PropTypes.object.isRequired,
};

export default App;
