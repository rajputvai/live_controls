import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import 'core-js/fn/array/includes';

import store from './store';
import theme from './utilities/theme';

import AppContainer from './containers/AppContainer';
import ConfigLoaderContainer from './containers/ConfigLoaderContainer';
import WebsocketContainer from './containers/WebsocketContainer';

localStorage.clear();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <ConfigLoaderContainer>
          <WebsocketContainer>
            <Switch>
              <Route path="/:feedId/:playlistId/:eventId" component={AppContainer} />
              <Route path="/:feedId/:playlistId" component={AppContainer} />
              <Route component={AppContainer} />
            </Switch>
          </WebsocketContainer>
        </ConfigLoaderContainer>
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
