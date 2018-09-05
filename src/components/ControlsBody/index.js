// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
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

const styles = {
  loadingWrapper: {
    height: '100vh',
    weight: '100vw',
  },
  root: {
    height: 'calc(100vh - 60px)',
  },
  players: {
    // height: '40%',
    display: 'flex',
    padding: '20px 40px',
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
    padding: '0 60px',
  },
  liveLogo: {
    color: Color.primary.p2,
    paddingRight: 60,
    '& span': {
      fontSize: 12,
    },
    '& div': {
      paddingTop: 5,
      '& img': {
        width: 130,
        height: 130,
      },
    },
  },
  controlsSection: {
    padding: '0 20px 10px',
    margin: 10,
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
  },
  tabContent: {
    flex: 'none',
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
};
window.moment = moment;

const LIVE_EVENT_LOGO = 'LIVE_EVENT_LOGO';
const LIVE_LOGO = 'live_logo';
const BREAK_LOGO = 'break_logo';

class ControlsBody extends Component {
  state = { tab: 0, timeRemaining: 0 };

  resetInterval() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      const now = moment();
      const eventStartTime = moment(this.props.selectedEvent.start_time);
      const eventEndTime = moment(this.props.selectedEvent.end_time);
      if (now.isAfter(eventStartTime)) {
        const timeRemaining = eventEndTime.diff(now, 'milliseconds');
        this.setState({ timeRemaining });
      } else {
        this.setState({ timeRemaining: 0 });
      }
    }, 1000);
  }

  componentDidMount() {
    if (this.props.selectedEvent && this.props.selectedEvent.end_time) {
      this.resetInterval();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedEvent && this.props.selectedEvent !== nextProps.selectedEvent) {
      this.resetInterval();
    }
  }

  handleTabChange = (event, value) => this.setState({ tab: value });

  render() {
    const { classes, playlist, sendMessage, selectedEvent, playItem, stopItem, toggleItem } = this.props;
    const liveEventLogoAsset = playlist.items[LIVE_EVENT_LOGO];
    let liveLogoURL = '';
    let breakLogoURL = '';
    if (liveEventLogoAsset && liveEventLogoAsset.break_items && liveEventLogoAsset.break_items.length > 0) {
      liveEventLogoAsset.break_items.forEach(item => {
        if (item.sub_type === LIVE_LOGO) {
          liveLogoURL = item.preview_image;
        } else if (item.sub_type === BREAK_LOGO) {
          breakLogoURL = item.preview_image;
        }
      });
    }

    if (playlist.loading) {
      return (
        <Grid container className={classes.loadingWrapper} alignItems="center" justify="center">
          <Loading />
        </Grid>
      );
    }
    return (
      <div>
        <div className={classes.players}>
          <div>
            <div className={classes.playerTitle}>INPUT SOURCE</div>
            <Player id="live" url={window.live_controls_config.INPUT_SOURCE_URL} globalKey="inputPlayer" />
          </div>
          <div className={classes.playerSpacer}>
            <div className={classes.playerTitle}>PLAYING NOW</div>
            <Player id="out" url={window.live_controls_config.PLAYING_NOW_URL} globalKey="outputPlayer" />
            {this.state.timeRemaining > 0 && (
              <div className={classes.streamTimeRemaining}>
                TIME REMAINING
                <span>{formatDuration(this.state.timeRemaining, false)}</span>
              </div>
            )}
          </div>
          <div className={classes.liveLogo}>
            <span>LIVE LOGO</span>
            <div>
              <img src={liveLogoURL} alt="Live Logo" />
            </div>
          </div>
          <div className={classes.liveLogo}>
            <span>BREAK LOGO</span>
            <div>
              <img src={breakLogoURL} alt="Break Logo" />
            </div>
          </div>
        </div>
        <Paper className={classes.controlsSection}>
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
            <div className={classNames(classes.tabContent, this.state.tab === 1 && classes.fadeLiveBreaks)}>
              <LiveBreaks
                playlist={playlist}
                selectedEvent={selectedEvent}
                sendMessage={sendMessage}
                playItem={playItem}
                stopItem={stopItem}
                updateNowPlaying={this.props.updateNowPlaying}
                toggleItem={toggleItem}
              />
            </div>
            <div className={classNames(classes.tabContent, this.state.tab === 0 && classes.fadeGraphics)}>
              <LiveGraphics />
            </div>
          </Grid>
        </Paper>
      </div>
    );
  }
}

ControlsBody.defaultProps = {
  selectedEvent: null,
};

ControlsBody.propTypes = {
  classes: PropTypes.object.isRequired,
  playlist: PropTypes.object.isRequired,
  selectedEvent: PropTypes.object,
  sendMessage: PropTypes.func.isRequired,
  playItem: PropTypes.func.isRequired,
  stopItem: PropTypes.func.isRequired,
  toggleItem: PropTypes.func.isRequired,
  updateNowPlaying: PropTypes.func.isRequired,
};

export default withStyles(styles)(ControlsBody);
