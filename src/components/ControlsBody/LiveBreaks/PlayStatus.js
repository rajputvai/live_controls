import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import { formatDuration } from '../../../utilities/timeHelpers';

const styles = {
  playStatus: {
    textAlign: 'left',
  },
  timeRemainingLabel: {
    fontSize: 11,
  },
  timeRemaining: {
    fontSize: 13,
  },
};

class PlayStatus extends React.Component {
  componentDidMount() {}

  render() {
    const { item, classes } = this.props;

    if (item.stopped) {
      return (
        <div className={classes.playStatus}>
          <div>STOPPED</div>
        </div>
      );
    }
    if (item.playing) {
      return (
        <div className={classes.playStatus}>
          <div className={classes.timeRemainingLabel}>Time remaining</div>
          <div className={classes.timeRemaining}>{formatDuration(item.timeRemaining, false)}</div>
        </div>
      );
    }
    if (item.played) {
      return (
        <div className={classes.playStatus}>
          <div>PLAYED</div>
        </div>
      );
    }
    if (!item.playing && !item.played && !item.stopped) {
      return (
        <div className={classes.playStatus}>
          <div>NOT PLAYED</div>
        </div>
      );
    }
    return null;
  }
}

PlayStatus.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlayStatus);
