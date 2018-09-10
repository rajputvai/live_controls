import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import classNames from 'classnames';
import moment from 'moment';

import Color from '../../utilities/theme/Color';
import { isLiveOnForEvent, setLiveOnForEvent } from '../../utilities/localStorageHelpers';
import { formatDuration } from '../../utilities/timeHelpers';

const styles = {
  root: {
    paddingTop: 60,
  },
  rootToolbar: {
    minHeight: 60,
  },
  rootTitle: {
    fontSize: 20,
    color: Color.other.o2,
    textTransform: 'uppercase',
    display: 'inline-block',
  },
  flex: {
    flex: 1,
  },
  rootSubheading: {
    color: Color.other.o2,
    marginRight: 20,
  },
  rootButton: {
    fontSize: 18,
  },
  eventsSelect: {
    backgroundColor: Color.other.o2,
    marginLeft: 30,
    borderRadius: 2,
    padding: '0 0 0 14px',
    '&:hover': {
      backgroundColor: Color.other.o9,
    },
    '& svg': {
      marginLeft: 30,
    },
  },
  liveOffBtn: {
    backgroundColor: 'red',
    color: 'white',
    '&:hover': {
      backgroundColor: '#c70303',
    },
  },
};

function getEventStartTime(time) {
  return moment(time).format('HH:mm:ss');
}

class Header extends Component {
  state = { anchorEl: null, isLiveOn: false };

  liveOffAutomaticallyAfterEndTime = () => {
    const { selectedEvent } = this.props.events;
    if (this.state.isLiveOn && selectedEvent.timeRemainingTillEventEnd < 0) {
      this.getLiveMessage(selectedEvent.ref_id, 'off');
    }
  };

  componentDidMount() {
    setInterval(this.liveOffAutomaticallyAfterEndTime, 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.events.selectedEvent !== nextProps.events.selectedEvent) {
      this.setState({ isLiveOn: isLiveOnForEvent(nextProps.events.selectedEvent.ref_id) });
    }
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  handleMenuItemClick = eventId => () => {
    const {
      history,
      match: { params },
    } = this.props;
    history.push(`/${params.feedId}/${params.playlistId}/${eventId}`);
    this.setState({ anchorEl: null });
  };

  getLiveMessage = (selectedEventId, value) => {
    const startTime = Date.now();
    console.log('requesting player for snapshot at: ', startTime);
    const timestamp = window.inputPlayer.getPTSVideo();
    console.log('type: ', value);
    console.log('pts', timestamp);
    const endTime = Date.now();
    console.log('pts received from player at: ', endTime);
    console.log('time taken to get pts from player: ', endTime - startTime);
    this.props.sendMessage({
      trigger_type: 'live',
      command: this.state.isLiveOn ? 'off' : 'on',
      params: {
        live_event_id: selectedEventId,
        timestamp,
        jpeg_buffer: '??',
      },
    });
    setLiveOnForEvent(selectedEventId, value);
    this.setState({ isLiveOn: value === 'on' });
  };

  handleLiveToggle = () => {
    const {
      events: { selectedEvent },
    } = this.props;
    console.log('on click: ', Date.now());
    if (this.state.isLiveOn) {
      this.getLiveMessage(selectedEvent.ref_id, 'off');
    } else {
      this.getLiveMessage(selectedEvent.ref_id, 'on');
    }
  };

  renderRemainingTime() {
    const { timeRemainingTillEventStart } = this.props.events.selectedEvent;
    if (timeRemainingTillEventStart <= 0) {
      return null;
    }
    return (
      <Fragment>
        {' '}
        | Time remaining: <span>{formatDuration(timeRemainingTillEventStart, false)}</span>
      </Fragment>
    );
  }

  renderContent() {
    const {
      classes,
      events: { selectedEvent, loading },
      playerState,
    } = this.props;
    let content;
    if (loading) {
      content = 'Loading...';
    } else {
      content = (
        <Fragment>
          <Typography variant="body1" className={classes.rootSubheading}>
            Live event scheduled at: {getEventStartTime(selectedEvent.start_time)} ({selectedEvent.timezone})
            {this.renderRemainingTime()}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classNames(classes.rootButton, this.state.isLiveOn && classes.liveOffBtn)}
            onClick={this.handleLiveToggle}
            disabled={selectedEvent.timeRemainingTillEventEnd < 0 || !playerState.isPlaying}
          >
            {this.state.isLiveOn ? 'LIVE OFF' : 'LIVE ON'}
          </Button>
        </Fragment>
      );
    }
    return (
      <Grid container alignItems="center">
        <Typography variant="title" className={classes.rootTitle}>
          LIVE EVENT
        </Typography>
        <Button className={classes.eventsSelect} onClick={this.handleClick} size="small">
          {loading ? 'Loading...' : selectedEvent.name}
          <ArrowDropDownIcon />
        </Button>
        <div className={classes.flex} />
        {content}
      </Grid>
    );
  }

  render() {
    const {
      classes,
      events: { events, selectedEvent, loading },
    } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="primary">
          <Toolbar className={classes.rootToolbar}>
            {this.renderContent()}
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={this.handleClose}
              classes={{ paper: classes.paper }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              {!loading &&
                events.map(event => (
                  <MenuItem
                    key={event.ref_id}
                    selected={selectedEvent.ref_id === event.ref_id}
                    onClick={this.handleMenuItemClick(event.ref_id)}
                  >
                    {event.name}
                  </MenuItem>
                ))}
            </Popover>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  events: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  playerState: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Header));
