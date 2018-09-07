import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import LoadingGrid from '../../assets/LoadingGrid';
import Color from '../../utilities/theme/Color';

const styles = theme => ({
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

class ConfigLoader extends React.Component {
  componentDidMount() {
    this.props.loadConfig();
  }

  render() {
    const { config } = this.props;

    if (config.loading) {
      return <LoadingGrid />;
    }

    if (!config.loading && !config.loaded) {
      return <div>Unable to load configuration...</div>;
    }

    if (config.loaded) {
      return this.props.children;
    }

    return null;
  }
}

ConfigLoader.propTypes = {
  loadConfig: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConfigLoader);
