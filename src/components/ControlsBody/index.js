// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';

// Components
import LiveBreaks from './LiveBreaks';
import LiveGraphics from './LiveGraphics';
import Player from '../Player';

// Assets
import Loading from '../../assets/svgs/Loading';

// Utils
import Color from '../../utilities/theme/Color';

const styles = {
  paper: {
    padding: 20,
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
  players: {
    display: 'flex',
    padding: '40px 40px 20px 40px',
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
  loadingWrapper: {
    height: '100vh',
    weight: '100vw',
  },
};

class ControlsBody extends Component {
  state = { tab: 0 };

  handleTabChange = (event, value) => this.setState({ tab: value });

  render() {
    const { classes, playlist } = this.props;
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
            <Player id="live" url={window.live_controls_config.INPUT_SOURCE} />
          </div>
          <div className={classes.playerSpacer}>
            <div className={classes.playerTitle}>PLAYING NOW</div>
            <Player id="out" url={window.live_controls_config.PLAYING_NOW_URL} />
            <div className={classes.streamTimeRemaining}>
              TIME REMAINING
              <span>00:15:30:48</span>
            </div>
          </div>
          <div className={classes.liveLogo}>
            <span>LIVE LOGO</span>
            <div>
              <img />
            </div>
          </div>
          <div className={classes.liveLogo}>
            <span>BREAK LOGO</span>
            <div>
              <img />
            </div>
          </div>
        </div>
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
            <div className={classNames(classes.tabContent, this.state.tab === 1 && classes.fadeLiveBreaks)}>
              <LiveBreaks playlist={playlist} />
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

ControlsBody.propTypes = {
  classes: PropTypes.object.isRequired,
  playlist: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlsBody);
