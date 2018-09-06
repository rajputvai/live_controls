// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MainWrapper } from '../Layout';
import HeaderContainer from '../../containers/HeaderContainer';
import ControlsBodyContainer from '../../containers/ControlsBodyContainer';

class AppWrapper extends Component {
  state = {};

  getLatestPlaylistId() {
    const {
      events: { byId },
      eventIdInUrl,
    } = this.props;

    const playlists = byId[eventIdInUrl].playlists;
    const publishedPlaylists = playlists.filter(playlist => playlist.state === 'published');
    const orderedByLatest = publishedPlaylists.sort((p1, p2) => p2.id - p1.id);
    if (orderedByLatest.length > 0) {
      return orderedByLatest[0].id;
    }
    return '';
  }

  selectEventAndLoadPlaylist(eventId) {
    this.props.selectEvent(eventId);
    const idToFetch = this.getLatestPlaylistId();
    if (idToFetch) {
      this.props.loadPlaylist(idToFetch);
    } else {
      this.props.noPublishedPlaylistAvailable();
    }
  }

  componentDidMount() {
    this.selectEventAndLoadPlaylist(this.props.eventIdInUrl);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.eventIdInUrl !== nextProps.eventIdInUrl) {
      this.selectEventAndLoadPlaylist(nextProps.eventIdInUrl);
    }
  }

  render() {
    return (
      <MainWrapper>
        <HeaderContainer />
        <ControlsBodyContainer />
      </MainWrapper>
    );
  }
}

AppWrapper.propTypes = {
  eventIdInUrl: PropTypes.string.isRequired,
  events: PropTypes.object.isRequired,
  selectEvent: PropTypes.func.isRequired,
  loadPlaylist: PropTypes.func.isRequired,
  noPublishedPlaylistAvailable: PropTypes.func.isRequired,
};

export default AppWrapper;
