// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

// Actions
import { loadEvents, selectEvent } from '../../actions/eventsActions';
import { loadPlaylist, noPublishedPlaylistAvailable } from '../../actions/playlistActions';

// Assets
import axiosInstance from '../../utilities/axios';
import App from '../../components/App';
import { connectToWebSocket, disconnectFromWebSocket } from '../../actions/webSocketActions';
import LoadingGrid from '../../assets/LoadingGrid';
import Color from '../../utilities/theme/Color';

const styles = theme => ({
  '@global': {
    html: {
      boxSizing: 'border-box',
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit',
    },
    body: {
      margin: 0,
      background: Color.primary.p5,
      color: Color.primary.p3,
      lineHeight: '1.2',
      overflowX: 'hidden',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      fontSize: 14,
      fontFamily: theme.typography.fontFamily,
    },
  },
});

class AppContainer extends Component {
  state = { configLoading: true };

  async componentDidMount() {
    const response = await axios.get('/config.json');
    window.live_controls_config = response.data;
    axiosInstance.defaults.baseURL = response.data.API_URL;
    axiosInstance.defaults.params = { auth_token: response.data.AUTH_TOKEN };
    this.setState({ configLoading: false });
    this.props.connectToWebSocket();
  }

  renderApp = props => {
    const { events } = this.props;
    return (
      <App
        {...props}
        events={events}
        loadEvents={this.props.loadEvents}
        selectEvent={this.props.selectEvent}
        loadPlaylist={this.props.loadPlaylist}
        noPublishedPlaylistAvailable={this.props.noPublishedPlaylistAvailable}
      />
    );
  };

  render() {
    if (this.state.configLoading) {
      return <LoadingGrid />;
    }
    return (
      <Switch>
        <Route path="/:feedId/:playlistId/:eventId" render={this.renderApp} />
        <Route path="/:feedId/:playlistId" render={this.renderApp} />
        <Route render={this.renderApp} />
      </Switch>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.events,
    playlist: state.playlist,
  };
}

AppContainer.propTypes = {
  loadEvents: PropTypes.func.isRequired,
  connectToWebSocket: PropTypes.func.isRequired,
  events: PropTypes.object.isRequired,
  selectEvent: PropTypes.func.isRequired,
  loadPlaylist: PropTypes.func.isRequired,
  noPublishedPlaylistAvailable: PropTypes.func.isRequired,
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    {
      loadEvents,
      connectToWebSocket,
      disconnectFromWebSocket,
      selectEvent,
      loadPlaylist,
      noPublishedPlaylistAvailable,
    }
  )
)(AppContainer);
