// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Color from '../../utilities/theme/Color';

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
  welcome: {
    fontSize: 22,
    fontWeight: 500,
    textAlign: 'center',
    margin: 40,
    letterSpacing: 1,
  },
  note: {
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 1,
  },
};

function NoFeedIdAndNoPlaylistId(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="primary">
        <Toolbar className={classes.rootToolbar}>
          <Grid container alignItems="center">
            <Typography variant="title" className={classes.rootTitle}>
              LIVE EVENT
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
      <div>
        <div className={classes.welcome}>Welcome to Live Events controller.</div>
        <div className={classes.note}>No events have been published.</div>
      </div>
    </div>
  );
}

NoFeedIdAndNoPlaylistId.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NoFeedIdAndNoPlaylistId);
