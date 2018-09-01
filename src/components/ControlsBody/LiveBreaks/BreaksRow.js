// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MuiIconButton from '@material-ui/core/IconButton';

// Assets
import IconButton from '../../../assets/IconButton';
import PlayIcon from '../../../assets/svgs/Play';
import ForceRescueIcon from '../../../assets/svgs/ForceRescue';
import QueueBreakIcon from '../../../assets/svgs/QueueBreak';
import Color from '../../../utilities/theme/Color';

// Utils
import { formatDuration } from '../../../utilities/timeHelpers';

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
};

class BreaksRow extends Component {
  shouldComponentUpdate(nextProps) {
    if (
      this.props.eventItem === nextProps.eventItem &&
      this.props.index === nextProps.index &&
      this.props.onExpand === nextProps.onExpand &&
      this.props.expanded === nextProps.expanded &&
      this.props.playedBreakItems === nextProps.playedBreakItems
    ) {
      return false;
    }
    return true;
  }

  handleExpandClick = event => {
    event.stopPropagation();
    this.props.onExpand(this.props.index);
  };

  handleBreakStartClick = () => {
    this.props.sendBreakStartMessage(this.props.index);
  };

  render() {
    const { classes, eventItem, expanded, playedBreakItems } = this.props;
    return (
      <div className={classes.root}>
        <Grid container className={classes.breakRow} alignItems="center">
          <Grid container alignItems="center">
            <IconButton
              type={expanded ? 'removeCircle' : 'addCircle'}
              className={classes.expandIcons}
              onClick={this.handleExpandClick}
            />
            <span className={classes.title}>{eventItem.title}</span> <span className={classes.divider}>|</span>{' '}
            <span>{formatDuration(eventItem.duration)}</span>
          </Grid>
          <div />
          <div className={classes.cell}>NOT PLAYED</div>
          <div>
            <MuiIconButton
              onClick={this.handleBreakStartClick}
              className={playedBreakItems.includes(eventItem.asset_id) ? classes.disabledActionIcons : ''}
            >
              <PlayIcon />
            </MuiIconButton>
            <MuiIconButton disabled>
              <ForceRescueIcon className={classes.disabledActionIcons} />
            </MuiIconButton>
            <MuiIconButton disabled>
              <QueueBreakIcon className={classes.disabledActionIcons} />
            </MuiIconButton>
          </div>
        </Grid>
        {expanded &&
          eventItem.break_items.map((breakItem, breakIndex) => (
            <Grid key={breakItem.id} container className={classes.breakItemsRow} alignItems="center">
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
  eventItem: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onExpand: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
  sendBreakStartMessage: PropTypes.func.isRequired,
  playedBreakItems: PropTypes.array.isRequired,
};

export default withStyles(styles)(BreaksRow);
