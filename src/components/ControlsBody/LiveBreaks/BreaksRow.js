// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MuiIconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';

// Assets
import DequeueIcon from '../../../assets/svgs/Dequeue';
import IconButton from '../../../assets/IconButton';
import PlayIcon from '../../../assets/svgs/Play';
import StopIcon from '../../../assets/svgs/Stop';
// import ForceRescueIcon from '../../../assets/svgs/ForceRescue';
import QueueBreakIcon from '../../../assets/svgs/QueueBreak';
import Color from '../../../utilities/theme/Color';
import animations from '../../../constants/animations';

// Utils
import { formatDuration } from '../../../utilities/timeHelpers';

// Components
import PlayStatus from './PlayStatus';

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

const styles = theme => ({
  expandIcons: {
    color: '#000',
    fontSize: 18,
    marginRight: 8,
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
    // padding: '0 10px',
  },
  breakItemsWrapper: {},
  breakItemsRow: {
    minHeight: 50,
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
  },
  cell1: {
    flex: 1,
    zIndex: 100,
    marginLeft: 16,
  },
  cell2: {
    width: 175,
    zIndex: 100,
    [theme.breakpoints.only('xl')]: {
      width: 125,
    },
  },
  cell3: {
    width: 175,
    zIndex: 100,
    [theme.breakpoints.only('xl')]: {
      width: 125,
    },
  },
  cell4: {
    width: 180,
    zIndex: 100,
  },
  subItemCell1: {
    flex: 1,
    zIndex: 100,
    marginLeft: 34,
  },
  subItemCell4: {
    width: 180,
    zIndex: 100,
  },
  actionsIcon: {
    marginLeft: -10,
    marginRight: 10,
    [theme.breakpoints.only('xl')]: {
      marginRight: 5,
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
    fontSize: '10px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  playingBreak: playingStyle,
  playingItem: {
    '&:before': playingStyle,
  },
  playedBreak: playedStyle,
  playedItem: {
    opacity: 0.7,
    '&:before': {
      backgroundColor: '#adcadb',
    },
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
  assetId: {
    fontSize: 14,
    fontWeight: 500,
    color: Color.secondary.s1,
    marginRight: 8,
  },
  assetTitle: {
    fontSize: 13,
    color: Color.primary.p2,
  },
  assetItemDuration: {
    fontSize: 11,
    marginTop: 4,
  },
});

class BreaksRow extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.item !== nextProps.item ||
      this.props.currentPlayingItemId !== nextProps.currentPlayingItemId ||
      this.props.queue !== nextProps.queue ||
      this.props.playerState !== nextProps.playerState
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
    const { classes, item, queue, currentPlayingItemId, playerState, eventEnded } = this.props;
    const disabled = true; // ! TEMP FLAG
    const isPlayDisabled = item.stopped || item.played || !playerState.isPlaying || eventEnded || disabled;
    const queued = queue.indexOf(item.asset_id) > -1;
    const someBreakPlaying = currentPlayingItemId !== '';

    return (
      <div className={classes.root}>
        <Grid container className={this.getClassname()} alignItems="center">
          <Grid container alignItems="center" className={classes.cell1}>
            <IconButton
              type={item.expanded ? 'removeCircle' : 'addCircle'}
              className={classes.expandIcons}
              onClick={this.toggleItem}
            />
            <span className={classes.title}>{item.title}</span> <span className={classes.divider}>|</span>{' '}
            <span>{formatDuration(item.duration)}</span>
          </Grid>
          <div className={classes.cell2}>
            {item.playing ? (
              <div className={classes.playingNow}>( PLAYING NOW )</div>
            ) : (
              <span className={classes.subType}>{item.sub_type}</span>
            )}
          </div>
          <div className={classes.cell3}>
            <PlayStatus item={item} />
          </div>
          {!queued ? (
            <div className={classes.cell4}>
              {item.playing ? (
                <MuiIconButton className={classes.actionsIcon} onClick={this.stopItem} disabled={disabled}>
                  <StopIcon />
                </MuiIconButton>
              ) : (
                <MuiIconButton
                  onClick={this.playItem}
                  className={classNames(classes.actionsIcon, isPlayDisabled ? classes.disabledActionIcons : '')}
                  disabled={isPlayDisabled}
                >
                  <PlayIcon />
                </MuiIconButton>
              )}
              {/* <MuiIconButton className={classes.actionsIcon} disabled>
                <ForceRescueIcon className={classes.disabledActionIcons} />
              </MuiIconButton> */}
              <MuiIconButton
                className={classes.actionsIcon}
                disabled={isPlayDisabled || !someBreakPlaying || item.playing}
                onClick={this.queueItem}
              >
                <QueueBreakIcon
                  className={isPlayDisabled || !someBreakPlaying || item.playing ? classes.disabledActionIcons : ''}
                />
              </MuiIconButton>
            </div>
          ) : (
            <div className={classes.cell4}>
              <span className={classes.message}>Break queued ({queue.indexOf(item.asset_id) + 1})</span>
              <MuiIconButton onClick={this.dequeueItem} disabled={disabled}>
                <DequeueIcon />
              </MuiIconButton>
            </div>
          )}
        </Grid>
        {item.expanded &&
          item.break_items.map((breakItem, breakIndex) => (
            <Grid key={breakItem.id} container className={this.getMediaItemClassname(breakItem)} alignItems="center">
              <Grid container alignItems="center" className={classes.subItemCell1}>
                <div className={classes.breakIndex}>{breakIndex + 1}</div>
                <div>
                  <div>
                    <span className={classes.assetId}>{breakItem.asset_id}</span>
                    <span className={classes.assetTitle}>{breakItem.title}</span>
                  </div>
                  <div className={classes.assetItemDuration}>DURATION - {formatDuration(breakItem.duration)}</div>
                </div>
                <div />
              </Grid>
              <div className={classes.cell2}>
                <span className={classes.subType}>{breakItem.sub_type}</span>
              </div>
              <div className={classes.cell3}>
                <PlayStatus item={breakItem} />
              </div>
              <div className={classes.subItemCell4}>
                {/* <MuiIconButton disabled>
                  <PlayIcon className={classes.disabledActionIcons} />
                </MuiIconButton>
                <MuiIconButton disabled>
                  <ForceRescueIcon className={classes.disabledActionIcons} />
                </MuiIconButton>
                <MuiIconButton disabled>
                  <IconButton type="delete" />
                </MuiIconButton> */}
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
  playItem: PropTypes.func.isRequired,
  stopItem: PropTypes.func.isRequired,
  queueItem: PropTypes.func.isRequired,
  dequeueItem: PropTypes.func.isRequired,
  toggleItem: PropTypes.func.isRequired,
  currentPlayingItemId: PropTypes.string.isRequired,
  queue: PropTypes.array.isRequired,
  playerState: PropTypes.object.isRequired,
  eventEnded: PropTypes.bool.isRequired,
};

export default withStyles(styles)(BreaksRow);
