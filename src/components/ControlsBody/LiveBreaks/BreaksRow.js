// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MuiIconButton from '@material-ui/core/IconButton';

// Assets
import IconButton from '../../../assets/IconButton';
import PlayIcon from '../../../assets/svgs/Play';
import StopIcon from '../../../assets/svgs/Stop';
import ForceRescueIcon from '../../../assets/svgs/ForceRescue';
import QueueBreakIcon from '../../../assets/svgs/QueueBreak';
import Color from '../../../utilities/theme/Color';
import animations from '../../../constants/animations';

// Utils
import { formatDuration } from '../../../utilities/timeHelpers';

const playingStyle = {
  backgroundColor: '#a8effe',
  opacity: '1 !important',
  '&$rescuedStyle': {
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
  message: {
    margin: '0px 5px',
    padding: 5,
    backgroundColor: '#fff',
    border: '1px solid #333',
    display: 'inline-block',
    fontStyle: 'italic',
    borderRadius: 10,
  },
  rescuedStyle,
  ...animations.flash,
};

class BreaksRow extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.item !== nextProps.item ||
      this.props.currentPlayingItemId !== nextProps.currentPlayingItemId ||
      this.props.queue !== nextProps.queue
    );
  }

  getClassname = () => {
    const { classes, item } = this.props;

    const classnames = [classes.breakRow];

    if (item.playing) {
      classnames.push(classes.playingBreak);
    } else if (item.played || item.stopped) {
      classnames.push(classes.playedBreak);
    }

    return classnames.join(' ');
  };

  getMediaItemClassname = mediaItem => {
    const { classes } = this.props;

    const classnames = [classes.breakItemsRow];

    if (mediaItem.playing) {
      classnames.push(classes.playingItem);
    } else if (mediaItem.played || mediaItem.stopped) {
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
    if (this.props.currentPlayingItemId !== '') {
      this.props.stopItem(this.props.currentPlayingItemId);
    }
    this.props.playItem(this.props.item.asset_id);
  };

  stopItem = () => {
    this.props.stopItem(this.props.item.asset_id);
  };

  queueItem = () => {
    this.props.queueItem(this.props.item.asset_id);
  };

  dequeueItem = () => {
    this.props.dequeueItem(this.props.item.asset_id);
  };

  render() {
    const { classes, item, queue, currentPlayingItemId } = this.props;

    const isPlayDisabled = item.stopped || item.played;
    const queued = queue.indexOf(item.asset_id) > -1;
    const someBreakPlaying = currentPlayingItemId !== '';

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
          <div className={classes.cell}>
            {item.stopped && 'STOPPED'}
            {item.playing && 'PLAYING'}
            {item.played && 'PLAYED'}
            {!item.playing && !item.played && !item.stopped && 'NOT PLAYED'}
          </div>
          {!queued ? (
            <div>
              {item.playing ? (
                <MuiIconButton onClick={this.stopItem}>
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
              <MuiIconButton disabled={isPlayDisabled || !someBreakPlaying || item.playing} onClick={this.queueItem}>
                <QueueBreakIcon className={isPlayDisabled && classes.disabledActionIcons} />
              </MuiIconButton>
            </div>
          ) : (
            <div>
              <span className={classes.message}>This break has been queued ({queue.indexOf(item.asset_id) + 1})</span>
              <MuiIconButton onClick={this.dequeueItem}>
                <QueueBreakIcon />
              </MuiIconButton>
            </div>
          )}
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
              <div>
                {breakItem.stopped && 'STOPPED'}
                {breakItem.playing && 'PLAYING'}
                {breakItem.played && 'PLAYED'}
                {!breakItem.playing && !breakItem.played && !breakItem.stopped && 'NOT PLAYED'}
              </div>
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
  queueItem: PropTypes.func.isRequired,
  dequeueItem: PropTypes.func.isRequired,
  toggleItem: PropTypes.func.isRequired,
  currentPlayingItemId: PropTypes.string.isRequired,
  queue: PropTypes.array.isRequired,
};

export default withStyles(styles)(BreaksRow);
