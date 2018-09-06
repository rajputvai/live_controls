// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Loading from './svgs/Loading';

const styles = {
  loadingWrapper: {
    height: '100vh',
    width: '100vw',
  },
};

function LoadingGrid(props) {
  const { classes } = props;
  return (
    <Grid container className={classes.loadingWrapper} alignItems="center" justify="center">
      <Loading />
    </Grid>
  );
}

LoadingGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoadingGrid);
