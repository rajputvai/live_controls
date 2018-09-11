// Libraries
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';

// Components
import LiveBreaks from './LiveBreaks';
import LiveGraphics from './LiveGraphics';
import Player from '../Player';

// Assets
import Loading from '../../assets/svgs/Loading';

// Utils
import Color from '../../utilities/theme/Color';
import { formatDuration } from '../../utilities/timeHelpers';

const styles = theme => ({
  loadingWrapper: {
    height: '100vh',
    weight: '100vw',
  },
  root: {
    height: '100%',
  },
  players: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
  },
  xlPaperHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.secondary.s1,
    padding: '5px 0',
    borderBottom: `solid 2px ${Color.other.o2}`,
    margin: '12px 0 14px',
  },
  playerTitle: {
    fontWeight: 500,
    color: Color.primary.p2,
    paddingBottom: 4,
  },
  streamTimeRemaining: {
    background: '#fff',
    padding: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid 1px #dddddd',
    fontSize: 16,
    color: Color.primary.p2,
    borderRadius: 2,
    '& span': {
      fontSize: 24,
      fontWeight: 500,
      paddingLeft: 10,
    },
  },
  playerSpacer: {
    marginBottom: 20,
    [theme.breakpoints.up('xl')]: {
      marginBottom: 40,
    },
  },
  liveLogo: {
    display: 'flex',
    color: Color.primary.p2,
    paddingRight: 30,
    '& div': {
      marginRight: 5,
      fontSize: 12,
      '& img': {
        width: 31,
        height: 31,
      },
    },
  },
  paper: {
    flex: 1,
    padding: '0 20px 10px',
    margin: '20px 20px 20px 0',
    display: 'flex',
    flexDirection: 'column',
  },
  tabs: {
    borderBottom: `solid 1px ${Color.other.o6}`,
    marginBottom: 20,
  },
  tabLabel: {
    fontSize: 14,
  },
  tabIndicator: {
    height: 3,
  },
  selectedTab: {
    color: Color.secondary.s1,
  },
  tabDefault: {
    display: 'none',
  },
  tabContentWrapper: {
    overflowX: 'hidden',
    flex: 1,
  },
  tabContent: {
    height: '100%',
    width: '100%',
    transition: 'margin .3s ease-in, opacity .3s ease-in', // with slide
    // transition: 'opacity .3s ease-in', // without slide
  },
  fadeLiveBreaks: {
    marginLeft: '-100%',
    opacity: 0.01,
  },
  fadeGraphics: {
    opacity: 0.01,
  },
  logos: {
    display: 'flex',
    marginBottom: 20,
  },
  eventHasEnded: {
    padding: 30,
    textAlign: 'center',
    fontSize: 20,
  },
  logoAssetId: {
    color: '#0085bc',
  },
});
window.moment = moment;

const LIVE_EVENT_LOGO = 'LIVE_EVENT_LOGO';
const LIVE_LOGO = 'live_logo';
const BREAK_LOGO = 'break_logo';

class ControlsBody extends Component {
  state = { tab: 0 };

  handleTabChange = (event, value) => this.setState({ tab: value });

  renderLogos() {
    const { classes, playlist } = this.props;

    if (playlist.noPublishedPlaylistAvailable) {
      return null;
    }

    const liveEventLogoAsset = playlist.items[LIVE_EVENT_LOGO];
    let liveLogoURL = '';
    let liveLogoAssetId = '';
    let breakLogoURL = '';
    let breakLogoAssetId = '';
    if (liveEventLogoAsset && liveEventLogoAsset.break_items && liveEventLogoAsset.break_items.length > 0) {
      liveEventLogoAsset.break_items.forEach(item => {
        if (item.sub_type === LIVE_LOGO) {
          liveLogoAssetId = item.asset_id;
          liveLogoURL = item.preview_image;
        } else if (item.sub_type === BREAK_LOGO) {
          breakLogoAssetId = item.asset_id;
          breakLogoURL = item.preview_image;
        }
      });
    }
    return (
      <div className={classes.logos}>
        <div className={classes.liveLogo}>
          <div>
            <img src={liveLogoURL} alt="Live Logo" />
          </div>
          <div>
            <div className={classes.logoAssetId}>{liveLogoAssetId}</div>
            LIVE LOGO
          </div>
        </div>
        <div className={classes.liveLogo}>
          <div>
            <img src={breakLogoURL} alt="Break Logo" />
          </div>
          <div>
            <div className={classes.logoAssetId}>{breakLogoAssetId}</div>
            BREAK LOGO
          </div>
        </div>
      </div>
    );
  }

  renderLiveBreaks() {
    const {
      playlist,
      sendMessage,
      selectedEvent,
      playItem,
      stopItem,
      queueItem,
      dequeueItem,
      toggleItem,
      playerState,
    } = this.props;
    return (
      <LiveBreaks
        playlist={playlist}
        selectedEvent={selectedEvent}
        sendMessage={sendMessage}
        playItem={playItem}
        stopItem={stopItem}
        queueItem={queueItem}
        dequeueItem={dequeueItem}
        updateNowPlaying={this.props.updateNowPlaying}
        toggleItem={toggleItem}
        playerState={playerState}
      />
    );
  }

  renderLiveGraphics() {
    const { playlist, sendMessage, selectedEvent, playItem, stopItem, toggleItem, playerState } = this.props;
    return (
      <LiveGraphics
        playlist={playlist}
        selectedEvent={selectedEvent}
        sendMessage={sendMessage}
        playItem={playItem}
        stopItem={stopItem}
        updateNowPlaying={this.props.updateNowPlaying}
        toggleItem={toggleItem}
        playerState={playerState}
      />
    );
  }

  renderSmallScreenLayout() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Tabs
          value={this.state.tab}
          onChange={this.handleTabChange}
          classes={{ root: classes.tabs, indicator: classes.tabIndicator }}
          className="row"
        >
          <Tab
            classes={{ selected: classes.selectedTab }}
            label={<span className={classes.tabLabel}>LIVE BREAKS</span>}
          />
          <Tab
            classes={{ selected: classes.selectedTab }}
            label={<span className={classes.tabLabel}>LIVE GRAPHICS</span>}
          />
        </Tabs>
        <Grid container wrap="nowrap" className={classes.tabContentWrapper}>
          {this.state.tab === 0 && this.renderLiveBreaks()}
          {this.state.tab === 1 && this.renderLiveGraphics()}
        </Grid>
      </Paper>
    );
  }

  renderLargeScreenLayout() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Paper className={classes.paper}>
          <div className={classes.xlPaperHeader}>LIVE BREAKS</div>
          <Grid container wrap="nowrap" className={classes.tabContentWrapper}>
            {this.renderLiveBreaks()}
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <div className={classes.xlPaperHeader}>LIVE GRAPHICS</div>
          <Grid container wrap="nowrap" className={classes.tabContentWrapper}>
            {this.renderLiveGraphics()}
          </Grid>
        </Paper>
      </Fragment>
    );
  }

  render() {
    const { classes, playlist, width, config, setPlayerState } = this.props;

    if (playlist.loading) {
      return (
        <Grid container className={classes.loadingWrapper} alignItems="center" justify="center">
          <Loading />
        </Grid>
      );
    }

    return (
      <Grid container className={classes.root}>
        <div className={classes.players}>
          {this.renderLogos()}
          <div>
            <div className={classes.playerTitle}>INPUT SOURCE</div>
            <Player
              id="live"
              url={config.INPUT_SOURCE_URL}
              latency={config.VXG_PLAYER_LATENCY}
              globalKey="inputPlayer"
              setPlayerState={setPlayerState}
            />
          </div>
          <div className={classes.playerSpacer} />
          <div className={classes.playerTitle}>PLAYING NOW</div>
          <Player
            id="out"
            url={config.PLAYING_NOW_URL}
            latency={config.VXG_PLAYER_LATENCY}
            globalKey="outputPlayer"
            setPlayerState={setPlayerState}
          />
          {this.props.selectedEvent.timeRemainingTillEventStart <= 0 &&
            this.props.selectedEvent.timeRemainingTillEventEnd > 0 && (
              <div className={classes.streamTimeRemaining}>
                TIME REMAINING
                <span>{formatDuration(this.props.selectedEvent.timeRemainingTillEventEnd, false)}</span>
              </div>
            )}
        </div>
        {this.props.selectedEvent.timeRemainingTillEventEnd > 0 ? (
          <Fragment>
            {width !== 'xl' && this.renderSmallScreenLayout()}
            {width === 'xl' && this.renderLargeScreenLayout()}
          </Fragment>
        ) : (
          <Paper className={classes.paper}>
            <div className={classes.eventHasEnded}>The event has ended.</div>
          </Paper>
        )}
      </Grid>
    );
  }
}

ControlsBody.defaultProps = {
  selectedEvent: null,
};

ControlsBody.propTypes = {
  config: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  playlist: PropTypes.object.isRequired,
  selectedEvent: PropTypes.object,
  sendMessage: PropTypes.func.isRequired,
  playItem: PropTypes.func.isRequired,
  stopItem: PropTypes.func.isRequired,
  queueItem: PropTypes.func.isRequired,
  dequeueItem: PropTypes.func.isRequired,
  toggleItem: PropTypes.func.isRequired,
  updateNowPlaying: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  playerState: PropTypes.object.isRequired,
  setPlayerState: PropTypes.func.isRequired,
};

export default withWidth()(withStyles(styles)(ControlsBody));
