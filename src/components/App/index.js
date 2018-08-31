import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Color from '../../utilities/theme/Color';
import { MainWrapper } from '../Layout';
import HeaderContainer from '../../containers/HeaderContainer';
import ControlsBodyContainer from '../../containers/ControlsBodyContainer';
import Loading from '../../assets/svgs/Loading';

const styleSheet = theme => ({
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

class App extends Component {
  state = { configLoading: true };

  async componentDidMount() {
    const response = await axios.get('/config.json');
    window.live_controls_config = response.data;
    this.setState({ configLoading: false });
    this.props.loadEvents();
  }

  render() {
    const { classes } = this.props;
    if (this.state.configLoading) {
      return (
        <Grid container className={classes.loadingWrapper} alignItems="center" justify="center">
          <Loading />
        </Grid>
      );
    }
    return (
      <MainWrapper>
        <HeaderContainer />
        <ControlsBodyContainer />
      </MainWrapper>
    );
  }
}

App.propTypes = {
  loadEvents: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(withRouter(App));
