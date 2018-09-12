// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MainWrapper } from '../Layout';
import HeaderContainer from '../../containers/HeaderContainer';
import ControlsBodyContainer from '../../containers/ControlsBodyContainer';

class AppWrapper extends Component {
  state = {};

  getLatestPlaylistId(eventId) {
    const {
      events: { byId },
    } = this.props;

    const playlists = byId[eventId].playlists;
    const publishedPlaylists = playlists.filter(playlist => playlist.state === 'published');
    const orderedByLatest = publishedPlaylists.sort((p1, p2) => p2.id - p1.id);
    if (orderedByLatest.length > 0) {
      return orderedByLatest[0].id;
    }
    return '';
  }

  selectEventAndLoadPlaylist(feedId, eventId) {
    this.props.selectEvent(eventId);
    const idToFetch = this.getLatestPlaylistId(eventId);
    if (idToFetch) {
      this.props.loadPlaylist(feedId, idToFetch);
    } else {
      this.props.noPublishedPlaylistAvailable();
    }
  }

  componentDidMount() {
    this.selectEventAndLoadPlaylist(this.props.feedIdInUrl, this.props.eventIdInUrl);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.eventIdInUrl !== nextProps.eventIdInUrl) {
      this.selectEventAndLoadPlaylist(nextProps.feedIdInUrl, nextProps.eventIdInUrl);
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
  feedIdInUrl: PropTypes.string.isRequired,
  events: PropTypes.object.isRequired,
  selectEvent: PropTypes.func.isRequired,
  loadPlaylist: PropTypes.func.isRequired,
  noPublishedPlaylistAvailable: PropTypes.func.isRequired,
};

export default AppWrapper;
