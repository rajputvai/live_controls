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

import Color from '../../utilities/theme/Color';
import { isLiveOnForEvent, setLiveOnForEvent } from '../../utilities/localStorageHelpers';

const styles = {
  root: {
    flexGrow: 1,
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

class Header extends Component {
  state = { anchorEl: null, isLiveOn: false };

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

  handleMenuItemClick = eventId => () => this.setState({ eventId, anchorEl: null });

  getLiveMessage = (selectedEvent, value) => {
    const startTime = Date.now();
    console.log('requesting player for snapshot at: ', startTime);
    window.inputPlayer.takescreenshot(pts => {
      console.log('type: ', value);
      // window.inputPlayer.pause();
      console.log('pts', pts);
      const endTime = Date.now();
      console.log('pts received from player at: ', endTime);
      console.log('time taken to get pts from player: ', endTime - startTime);
      this.props.sendMessage({
        trigger_type: 'live',
        command: 'on',
        params: {
          live_event_id: 'AMAGI_LIVE_001',
          timestamp: pts,
          jpeg_buffer: '??',
        },
      });
      setLiveOnForEvent(selectedEvent.ref_id, value);
      this.setState({ isLiveOn: value === 'on' });
    });
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

  renderContent() {
    const {
      classes,
      events: { selectedEvent, loading },
    } = this.props;
    let content;
    if (loading) {
      content = 'Loading...';
    } else {
      content = (
        <Fragment>
          <Typography variant="body1" className={classes.rootSubheading}>
            Live event scheduled at: 14:55:29 IST | Time remaining: 00:03:05
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classNames(classes.rootButton, this.state.isLiveOn && classes.liveOffBtn)}
            onClick={this.handleLiveToggle}
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
};

export default withStyles(styles)(withRouter(Header));
