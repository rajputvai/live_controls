import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Color from '../../utilities/theme/Color';
import DropdownArrow from '../../assets/images/dropdown.png';

const styles = {
  root: {
    flexGrow: 1,
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
  textField: {
    '-webkit-appearance': 'none',
    '-moz-appearance': 'none',
    appearance: 'none',
    height: 30,
    width: 170,
    padding: '5px 22px 5px 10px',
    background: `url(${DropdownArrow}) 96% / 5% no-repeat ${Color.other.o2}`,
    marginLeft: 20,
    fontSize: 16,
    fontWeight: 500,
    color: Color.primary.p2,
    borderRadius: 2,
  },
  rootSubheading: {
    display: 'inline-block',
    color: Color.other.o2,
    marginRight: 20,
  },
  rootButton: {
    fontSize: 18,
  },
};

class Header extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="primary">
          <Toolbar className={classes.rootToolbar}>
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Grid>
                <Typography variant="title" className={classes.rootTitle}>
                  LIVE EVENT
                </Typography>
                <select className={classes.textField}>
                  <option>Live Event 1</option>
                  <option>Live Event 2</option>
                  <option>Live Event 3</option>
                  <option>Live Event 4</option>
                </select>
              </Grid>
              <Grid>
                <Typography variant="body1" className={classes.rootSubheading}>
                  Live event scheduled at: 14:55:29 IST | Time remaining: 00:03:05
                </Typography>
                <Button variant="contained" color="primary" className={classes.rootButton}>
                  LIVE ON
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(Header));
