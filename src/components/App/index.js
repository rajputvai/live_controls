import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import Color from '../../utilities/theme/Color'
import { MainWrapper } from '../Layout'
import Header from '../Header'

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
});

class App extends Component {

  render() {
    return (
      <MainWrapper>
        <Header />
      </MainWrapper>
    );
  }
}

export default withStyles(styleSheet)(withRouter(App));
