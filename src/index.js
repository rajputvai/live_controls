import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import theme from './utilities/theme';

import registerServiceWorker from './registerServiceWorker';

import App from './containers/App';

ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
