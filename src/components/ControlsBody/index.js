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

// Assets
import Loading from '../../assets/svgs/Loading';

// Utils
import Color from '../../utilities/theme/Color';

const styles = {
  headerSpacer: {
    marginTop: 60,
  },
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
    height: 270,
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
    const { classes, playlist, sendMessage, selectedEvent } = this.props;
    if (playlist.loading) {
      return (
        <Grid container className={classes.loadingWrapper} alignItems="center" justify="center">
          <Loading />
        </Grid>
      );
    }
    return (
      <div>
        <div className={classes.headerSpacer} />
        <div className={classes.players}>players and logos</div>
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
              <LiveBreaks sendMessage={sendMessage} selectedEvent={selectedEvent} playlist={playlist} />
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
  selectedEvent: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired,
};

export default withStyles(styles)(ControlsBody);
