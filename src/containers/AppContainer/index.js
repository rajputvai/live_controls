// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

// Actions
import { loadEvents, selectEvent } from '../../actions/eventsActions';
import { loadPlaylist } from '../../actions/playlistActions';

// Assets
import axiosInstance from '../../utilities/axios';
import App from '../../components/App';
import { connectToWebSocket, disconnectFromWebSocket } from '../../actions/webSocketActions';
import Loading from '../../assets/svgs/Loading';
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
  loadingWrapper: {
    height: '100vh',
    width: '100vw',
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
    this.props.loadEvents();
    this.props.connectToWebSocket();
  }

  renderApp = props => {
    const { events } = this.props;
    return (
      <App {...props} events={events} selectEvent={this.props.selectEvent} loadPlaylist={this.props.loadPlaylist} />
    );
  };

  render() {
    const { classes, events } = this.props;
    if (this.state.configLoading || events.loading) {
      return (
        <Grid container className={classes.loadingWrapper} alignItems="center" justify="center">
          <Loading />
        </Grid>
      );
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
  classes: PropTypes.object.isRequired,
  loadEvents: PropTypes.func.isRequired,
  connectToWebSocket: PropTypes.func.isRequired,
  events: PropTypes.object.isRequired,
  selectEvent: PropTypes.func.isRequired,
  loadPlaylist: PropTypes.func.isRequired,
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { loadEvents, connectToWebSocket, disconnectFromWebSocket, selectEvent, loadPlaylist }
  )
)(AppContainer);
