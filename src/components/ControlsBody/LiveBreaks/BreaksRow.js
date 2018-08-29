// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MuiIconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';

// Widgets
import IconButton from '../../../widgets/IconButton';
import PlayIcon from '../../../widgets/svgs/Play';
import ForceRescueIcon from '../../../widgets/svgs/ForceRescue';
import QueueBreakIcon from '../../../widgets/svgs/QueueBreak';
import Color from '../../../utilities/theme/Color';

const styles = {
  expandIcons: {
    color: '#000',
    fontSize: 18,
    marginRight: 14,
  },
  root: {
    color: Color.primary.p2,
    padding: 1,
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
};

function BreaksRow(props) {
  const { classes, eventItem, index, onExpand, expanded, ...rest } = props;
  return (
    <div {...rest} className={classes.root}>
      <Grid container className={classes.breakRow} alignItems="center">
        <Grid container alignItems="center">
          <IconButton
            type={expanded ? 'removeCircle' : 'addCircle'}
            className={classes.expandIcons}
            onClick={onExpand}
          />
          <span className={classes.title}>{eventItem.title}</span> <span className={classes.divider}>|</span>{' '}
          <span>{eventItem.duration}</span>
        </Grid>
        <div>{index}</div>
        <div className={classes.cell}>NOT PLAYED</div>
        <Grid className={classes.actionsCell}>
          <MuiIconButton>
            <PlayIcon className={classes.actionIcons} />
          </MuiIconButton>
          <MuiIconButton>
            <ForceRescueIcon className={classes.actionIcons} />
          </MuiIconButton>
          <MuiIconButton>
            <QueueBreakIcon className={classes.actionIcons} />
          </MuiIconButton>
        </Grid>
      </Grid>
      <Collapse in={expanded}>
        {eventItem.break_items.map((breakItem, breakIndex) => (
          <Grid key={breakItem.id} container className={classes.breakItemsRow} alignItems="center">
            <Grid container alignItems="center">
              <div className={classes.breakIndex}>{breakIndex + 1}</div>
              <span className={classes.title}>{breakItem.title}</span> <span className={classes.divider}>|</span>{' '}
              <span>{breakItem.segment.data.duration}</span>
            </Grid>
            <div>{index}</div>
            <div>NOT PLAYED</div>
            <div>
              <MuiIconButton>
                <PlayIcon className={classes.actionIcons} />
              </MuiIconButton>
              <MuiIconButton>
                <ForceRescueIcon className={classes.actionIcons} />
              </MuiIconButton>
              <MuiIconButton>
                <IconButton type="delete" />
              </MuiIconButton>
            </div>
          </Grid>
        ))}
      </Collapse>
    </div>
  );
}

BreaksRow.propTypes = {
  classes: PropTypes.object.isRequired,
  eventItem: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onExpand: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
};

export default withStyles(styles)(BreaksRow);
