import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/ErrorOutline';

const styles = {
  errorWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    color: 'red',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
  },
  errorIcon: {
    height: 75,
    width: 75,
  },
};

class Error extends React.PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.errorWrap}>
        <div>
          <ErrorIcon className={classes.errorIcon} />
        </div>
        <div>{this.props.error}</div>
      </div>
    );
  }
}

Error.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.string.isRequired,
};

export default withStyles(styles)(Error);
