import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import 'core-js/fn/array/includes';

import store from './store';
import theme from './utilities/theme';
import './utilities/styles/animations.css';

import AppContainer from './containers/AppContainer';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <AppContainer />
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
