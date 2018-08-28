// Libraries
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import produce from 'immer';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

// Widgets
import InfoIcon from '../../../widgets/svgs/Info';
import IconButton from '../../../widgets/IconButton';
import Color from '../../../utilities/theme/Color';
import PlayIcon from '../../../widgets/svgs/Play';
import ForceRescueIcon from '../../../widgets/svgs/ForceRescue';
import QueueBreakIcon from '../../../widgets/svgs/QueueBreak';

const styles = {
  infoIcon: {
    height: 20,
    width: 20,
  },
  actionBar: {
    marginBottom: 20,
  },
  flex: {
    flex: 1,
  },
  iconButtonWrapper: {
    marginLeft: 8,
    width: 35,
    height: 30,
    borderRadius: 2,
    backgroundColor: Color.other.o2,
    border: `solid 1px ${Color.other.o7}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color .3s',
    '&:hover': {
      backgroundColor: '#d5d5d5',
    },
  },
  table: {
    borderSpacing: 0,
    width: '100%',
    '& th': {
      paddingLeft: 20,
      paddingBottom: 10,
      fontSize: 12,
      fontWeight: 'bold',
      color: Color.other.o11,
      textAlign: 'left',
    },
    '& td:first-child $cell': {
      fontWeight: 500,
      borderLeft: `solid 1px ${Color.other.o8}`,
      borderRadius: '4px 0 0 4px',
    },
    '& td:last-child $cell': {
      borderRight: `solid 1px ${Color.other.o8}`,
      borderRadius: '0 4px 4px 0',
    },
  },
  cell: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 60,
    backgroundColor: Color.other.o2,
    borderBottom: `solid 1px ${Color.other.o8}`,
    borderTop: `solid 1px ${Color.other.o8}`,
    paddingLeft: 20,
  },
  expandIcons: {
    color: '#000',
    fontSize: 17,
    marginRight: 4,
  },
  actionIcons: {
    marginRight: 20,
  },
  actionsCell: {
    display: 'flex',
  },
  trWithMarginBottom: {
    '& td': {
      paddingBottom: 20,
    },
  },
  enter: {
    opacity: 0.01,
  },
  enterActive: {
    opacity: 1,
    transition: 'opacity .3s ease-in',
  },
  exit: {
    opacity: 1,
  },
  exitActive: {
    opacity: 0.01,
    transition: 'opacity .3s ease-in',
  },
};

const breakInfos = ['Event start break', 'First over', 'Second Over', 'Emergency break', 'Event end break'];
const duration = ['00:01:00:00', '00:10:00:00', '00:04:00:00', '00:00:08:00'];
const tableData = [];

for (let i = 0; i < 5; i += 1) {
  tableData.push({
    id: i,
    breakInfo: breakInfos[i % 5],
    duration: duration[i % 4],
    playedStatus: 'NOT PLAYED',
  });
}

class LiveBreaks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: [],
    };
    const { classes } = props;
    this.cssTransitionClasses = {
      enter: classes.enter,
      enterActive: classes.enterActive,
      exit: classes.exit,
      exitActive: classes.exitActive,
    };
  }

  handleToggleExpansionClick = index => () => {
    this.setState(
      produce(draft => {
        const indexOfItem = draft.expanded.indexOf(index);
        if (indexOfItem > -1) {
          draft.expanded.splice(indexOfItem, 1);
        } else {
          draft.expanded.push(index);
        }
      })
    );
  };

  renderLiveBreaksTable() {
    const { classes } = this.props;
    const { expanded } = this.state;
    return (
      <table className={classes.table} cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            <th>BREAK/ ASSET INFORMATION</th>
            <th>ASSET TYPE</th>
            <th>PLAYED STATUS</th>
            <th>ACTIONS </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => {
            const isExpanded = expanded.includes(index);
            return (
              <Fragment key={data.id}>
                <tr className={!isExpanded && classes.trWithMarginBottom}>
                  <td>
                    <div className={classes.cell}>
                      <IconButton
                        type={expanded.includes(index) ? 'removeCircle' : 'addCircle'}
                        className={classes.expandIcons}
                        onClick={this.handleToggleExpansionClick(index)}
                      />
                      <span>{data.breakInfo}</span> <span>|</span> <span>{data.duration}</span>
                    </div>
                  </td>
                  <td>
                    <div className={classes.cell} />
                  </td>
                  <td>
                    <div className={classes.cell}>NOT PLAYED</div>
                  </td>
                  <td>
                    <Grid className={classNames(classes.cell, classes.actionsCell)}>
                      <PlayIcon className={classes.actionIcons} />
                      <ForceRescueIcon className={classes.actionIcons} />
                      <QueueBreakIcon className={classes.actionIcons} />
                    </Grid>
                  </td>
                </tr>
                {isExpanded && (
                  <CSSTransition timeout={300} classNames={this.cssTransitionClasses} in={isExpanded}>
                    <tr className={classes.trWithMarginBottom}>
                      <td>
                        <div className={classes.cell} style={{ marginLeft: 30 }}>
                          <span>{data.breakInfo}</span> <span>|</span> <span>{data.duration}</span>
                        </div>
                      </td>
                      <td>
                        <div className={classes.cell} />
                      </td>
                      <td>
                        <div className={classes.cell}>NOT PLAYED</div>
                      </td>
                      <td>
                        <div className={classNames(classes.cell, classes.actionsCell)} style={{ marginRight: 30 }}>
                          <PlayIcon className={classes.icon} />
                          <ForceRescueIcon className={classes.icon} />
                          <QueueBreakIcon className={classes.icon} />
                        </div>
                      </td>
                    </tr>
                  </CSSTransition>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container className={classes.actionBar} alignItems="center">
          <div>
            CURRENT HOUR <span>12:00 - 13:00</span>
          </div>
          <div>|</div>
          <div>
            FCT PLAYED 00:00:00:00
            <InfoIcon className={classes.infoIcon} />
          </div>
          <div className={classes.flex} />
          <div className={classes.iconButtonWrapper}>
            <IconButton type="edit" className={classes.iconButton} />
          </div>
          <div className={classes.iconButtonWrapper}>
            <IconButton type="removeRedEye" className={classes.iconButton} />
          </div>
          <div className={classes.iconButtonWrapper}>
            <IconButton type="search" className={classes.iconButton} />
          </div>
        </Grid>
        {this.renderLiveBreaksTable()}
      </div>
    );
  }
}

LiveBreaks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LiveBreaks);
