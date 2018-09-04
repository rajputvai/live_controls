// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MuiIconButton from '@material-ui/core/IconButton';
import StopIcon from '@material-ui/icons/Stop';

// Assets
import IconButton from '../../../assets/IconButton';
import PlayIcon from '../../../assets/svgs/Play';
import ForceRescueIcon from '../../../assets/svgs/ForceRescue';
import QueueBreakIcon from '../../../assets/svgs/QueueBreak';
import Color from '../../../utilities/theme/Color';
import animations from '../../../constants/animations';

// Utils
import { formatDuration } from '../../../utilities/timeHelpers';

const playingStyle = {
  backgroundColor: '#a8effe',
  opacity: '1 !important',
  '&$rescued': {
    backgroundColor: '#ffd0d6',
    borderColor: '#df041f',
  },
};
const playedStyle = {
  opacity: 0.7,
  backgroundColor: '#adcadb',
};
const rescuedStyle = {
  opacity: 0.7,
  borderColor: '#df041f !important',
};
const comingUpNextStyle = {
  backgroundColor: '#b7fed5 !important',
  '-webkit-animation': 'flash linear 1.5s infinite',
  animation: 'flash linear 1.5s infinite',
};

const styles = {
  expandIcons: {
    color: '#000',
    fontSize: 18,
    marginRight: 14,
  },
  root: {
    color: Color.primary.p2,
    '& > div:last-child': {
      marginBottom: 20,
    },
  },
  breakRow: {
    backgroundColor: Color.other.o2,
    border: `solid 1px ${Color.other.o8}`,
    borderRadius: 4,
    padding: '0 20px',
    '& > div': {
      width: '20%',
    },
    '& > div:first-child': {
      paddingLeft: 14,
      width: '40%',
    },
  },
  breakItemsWrapper: {},
  breakItemsRow: {
    padding: '0 20px',
    position: 'relative',
    '&:before': {
      content: '""',
      position: 'absolute',
      margin: '0 20px',
      height: '100%',
      width: 'calc(100% - 40px)',
      top: 0,
      left: 0,
      backgroundColor: Color.other.o2,
      border: `solid 1px ${Color.other.o8}`,
      borderTop: 'none',
      borderRadius: 4,
    },
    '& > div': {
      width: '20%',
      zIndex: 2,
    },
    '& > div:first-child': {
      width: '40%',
      paddingLeft: 20,
    },
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
  },
  divider: {
    margin: '0 10px',
  },
  breakIndex: {
    marginRight: 20,
  },
  disabledActionIcons: {
    opacity: 0.5,
  },
  subType: {
    borderRadius: 30,
    border: 'solid 1px #f06292',
    color: '#f06292',
    padding: '2px 10px',
  },
  playingBreak: playingStyle,
  playingItem: {
    '&:before': playingStyle,
  },
  playedBreak: playedStyle,
  playedItem: {
    '&:before': playedStyle,
  },
  comingUpNextBreak: comingUpNextStyle,
  comingUpNextItem: {
    '&:before': comingUpNextStyle,
  },
  ...animations.flash,
};

class BreaksRow extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.item !== nextProps.item || this.props.currentPlayingItemId !== nextProps.currentPlayingItemId;
  }

  getClassname = () => {
    const { classes, item } = this.props;

    const classnames = [classes.breakRow];

    if (item.playing) {
      classnames.push(classes.playingBreak);
    } else if (item.played) {
      classnames.push(classes.playedBreak);
    }

    return classnames.join(' ');
  };

  getMediaItemClassname = mediaItem => {
    const { classes } = this.props;

    const classnames = [classes.breakItemsRow];

    if (mediaItem.playing) {
      classnames.push(classes.playingItem);
    } else if (mediaItem.played) {
      classnames.push(classes.playedItem);
    } else if (mediaItem.comingUpNext) {
      classnames.push(classes.comingUpNextItem);
    }

    return classnames.join(' ');
  };

  toggleItem = event => {
    event.stopPropagation();
    this.props.toggleItem(this.props.item.asset_id);
  };

  playItem = () => {
    this.props.playItem(this.props.item.asset_id);
  };

  stopItem = () => {
    this.props.stopItem(this.props.item.asset_id);
  };

  render() {
    const { classes, item, currentPlayingItemId } = this.props;

    const isPlayDisabled = item.played || (currentPlayingItemId && currentPlayingItemId !== item.asset_id);

    return (
      <div className={classes.root}>
        <Grid container className={this.getClassname()} alignItems="center">
          <Grid container alignItems="center">
            <IconButton
              type={item.expanded ? 'removeCircle' : 'addCircle'}
              className={classes.expandIcons}
              onClick={this.toggleItem}
            />
            <span className={classes.title}>{item.title}</span> <span className={classes.divider}>|</span>{' '}
            <span>{formatDuration(item.duration)}</span>
          </Grid>
          <div />
          <div className={classes.cell}>NOT PLAYED</div>
          <div>
            {item.playing ? (
              <MuiIconButton
                onClick={this.stopItem}
                className={isPlayDisabled ? classes.disabledActionIcons : ''}
                disabled={isPlayDisabled}
              >
                <StopIcon />
              </MuiIconButton>
            ) : (
              <MuiIconButton
                onClick={this.playItem}
                className={isPlayDisabled ? classes.disabledActionIcons : ''}
                disabled={isPlayDisabled}
              >
                <PlayIcon />
              </MuiIconButton>
            )}
            <MuiIconButton disabled>
              <ForceRescueIcon className={classes.disabledActionIcons} />
            </MuiIconButton>
            <MuiIconButton disabled>
              <QueueBreakIcon className={classes.disabledActionIcons} />
            </MuiIconButton>
          </div>
        </Grid>
        {item.expanded &&
          item.break_items.map((breakItem, breakIndex) => (
            <Grid key={breakItem.id} container className={this.getMediaItemClassname(breakItem)} alignItems="center">
              <Grid container alignItems="center">
                <div className={classes.breakIndex}>{breakIndex + 1}</div>
                <span className={classes.title}>{breakItem.title}</span> <span className={classes.divider}>|</span>{' '}
                <span>{formatDuration(breakItem.duration)}</span>
              </Grid>
              <div>
                <span className={classes.subType}>{breakItem.sub_type}</span>
              </div>
              <div>NOT PLAYED</div>
              <div>
                <MuiIconButton disabled>
                  <PlayIcon className={classes.disabledActionIcons} />
                </MuiIconButton>
                <MuiIconButton disabled>
                  <ForceRescueIcon className={classes.disabledActionIcons} />
                </MuiIconButton>
                <MuiIconButton disabled>
                  <IconButton type="delete" />
                </MuiIconButton>
              </div>
            </Grid>
          ))}
      </div>
    );
  }
}

BreaksRow.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  playItem: PropTypes.func.isRequired,
  stopItem: PropTypes.func.isRequired,
  toggleItem: PropTypes.func.isRequired,
  currentPlayingItemId: PropTypes.string.isRequired,
};

export default withStyles(styles)(BreaksRow);
