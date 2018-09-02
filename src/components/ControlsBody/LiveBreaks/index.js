// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { AutoSizer, List } from 'react-virtualized';
import produce from 'immer';

// Components
import BreaksRow from './BreaksRow';

// Assets
import InfoIcon from '../../../assets/svgs/Info';
import IconButton from '../../../assets/IconButton';
import Color from '../../../utilities/theme/Color';

// Utilities
import { getAllPlayedBreakItemsForEvent, setBreakItemPlayed } from '../../../utilities/localStorageHelpers';

const styles = {
  infoIcon: {
    height: 20,
    width: 20,
    marginLeft: 10,
  },
  actionBar: {
    marginBottom: 20,
  },
  boldText: {
    fontWeight: 'bold',
    color: Color.primary.p2,
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
  headerRow: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Color.primary.p3,
    padding: '0 20px 10px',
    display: 'flex',
    maxWidth: 'calc(100% - 15px)',
    '& > div': {
      width: '20%',
    },
    '& > div:first-child': {
      width: '40%',
    },
  },
  expandIcons: {
    color: '#000',
    fontSize: 18,
    marginRight: 14,
  },
  root: {
    color: Color.primary.p2,
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

// const data = {
//   id: 1,
//   title: 'Intent_1_1',
//   type: 'signature',
//   sub_type: 'signature',
//   asset_id: 'Intent_1_1',
//   comments: null,
//   join_status: null,
//   offset: 0,
//   segment: null,
//   playing: false,
//   status: 'Present',
//   subtitle_scheduled: false,
//   duration: 7600,
//   available_segments: null,
//   break_item: {
//     id: 2,
//     title: 'res_00211_newexp',
//     type: 'primary',
//     sub_type: 'program_segment',
//     asset_id: 'res_00211_newexp',
//     comments: '',
//     join_status: null,
//     offset: 0,
//     segment: {
//       data: {
//         default_segment: true,
//         duration: 95,
//         start_time_code: 2880,
//         file_offset: '564',
//         offset: 0,
//       },
//       id: 870,
//       media_id: 8869,
//       segment_id: 211,
//     },
//     playing: false,
//     status: 'Present',
//     subtitle_scheduled: false,
//     duration: 3800,
//     available_segments: [
//       {
//         data: {
//           default_segment: true,
//           duration: 95,
//           start_time_code: 2880,
//           file_offset: '564',
//           offset: 0,
//         },
//         id: 870,
//         media_id: 8869,
//         segment_id: 211,
//       },
//     ],
//   },
// };

// const eventItemRange = new Array(3000).fill(1);
// const breakItemRange = new Array(4).fill(1);

// const eventItems = eventItemRange.map((val, eventIndex) => ({
//   ...data,
//   break_items: breakItemRange.map((v, breakIndex) => ({
//     ...data.break_item,
//     id: breakIndex,
//   })),
//   id: eventIndex,
// }));

class LiveBreaks extends Component {
  constructor(props) {
    super(props);
    const playedBreakItems = getAllPlayedBreakItemsForEvent(props.selectedEvent.ref_id);
    this.state = { expanded: {}, rowHeightToUpdate: 0, playedBreakItems };
  }

  renderActionBar() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.actionBar} alignItems="center">
        <div>
          CURRENT HOUR: <span className={classes.boldText}>12:00 - 13:00</span>
        </div>
        <div className={classes.divider}>|</div>
        <div>
          FCT PLAYED: <span className={classes.boldText}>00:00:00:00</span>
        </div>
        <InfoIcon className={classes.infoIcon} />
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
    );
  }

  componentDidUpdate() {
    this.listEl.recomputeRowHeights(this.state.rowHeightToUpdate);
  }

  overscanIndicesGetter = ({ cellCount, overscanCellsCount, startIndex, stopIndex }) => ({
    overscanStartIndex: Math.max(0, startIndex - overscanCellsCount),
    overscanStopIndex: Math.min(cellCount - 1, stopIndex + overscanCellsCount),
  });

  handleToggleExpansionClick = eventItemIndex => {
    this.setState(
      produce(draft => {
        if (draft.expanded[eventItemIndex]) {
          draft.expanded[eventItemIndex] = false;
        } else {
          draft.expanded[eventItemIndex] = true;
        }
        draft.rowHeightToUpdate = eventItemIndex;
      })
    );
  };

  sendBreakStartMessage = eventItemIndex => {
    const {
      playlist: { playlist },
      selectedEvent,
    } = this.props;
    const playlistItem = playlist.items[eventItemIndex];
    setBreakItemPlayed(selectedEvent.ref_id, playlistItem.asset_id);
    this.setState(
      produce(draft => {
        draft.playedBreakItems.push(playlistItem.asset_id);
      })
    );

    window.inputPlayer.takescreenshot();
    const timestamp = window.inputPlayer.getScreenshotPTS();

    this.props.sendMessage({
      trigger_type: 'break',
      command: 'start',
      params: {
        live_event_id: selectedEvent.ref_id,
        timestamp,
        duration_ms: playlistItem.duration,
        jpeg_buffer: '??',
        break_name: playlistItem.asset_id,
        best_effort_flag: true,
        best_effort_threshold_ms: 1000,
      },
    });
  };

  renderRow = ({ index, key, style }) => {
    const isExpanded = this.state.expanded[index] || false;
    return (
      <div style={style} key={key}>
        <BreaksRow
          playedBreakItems={this.state.playedBreakItems}
          expanded={isExpanded}
          eventItem={this.props.playlist.playlist.items[index]}
          index={index}
          onExpand={this.handleToggleExpansionClick}
          recomputeRowHeight={this.recomputeRowHeight}
          sendBreakStartMessage={this.sendBreakStartMessage}
        />
      </div>
    );
  };

  getRowHeight = params => {
    if (this.state.expanded[params.index]) {
      const expandedItemCount = this.props.playlist.playlist.items[params.index].break_items.length;
      return expandedItemCount * 50 + 70;
    }
    return 70;
  };

  renderLiveBreaksTable() {
    const {
      classes,
      playlist: {
        playlist: { items },
      },
    } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.headerRow}>
          <div>BREAK/ ASSET INFORMATION</div>
          <div>ASSET TYPE</div>
          <div>PLAYED STATUS</div>
          <div>ACTIONS </div>
        </div>
        <AutoSizer disableHeight>
          {({ width }) => (
            <List
              ref={el => {
                this.listEl = el;
              }}
              width={width}
              height={400}
              rowHeight={this.getRowHeight}
              rowRenderer={this.renderRow}
              rowCount={items.length}
              style={{ outline: 'none' }}
              overscanIndicesGetter={this.overscanIndicesGetter}
              overscanRowCount={50}
            />
          )}
        </AutoSizer>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderActionBar()}
        {this.renderLiveBreaksTable()}
      </div>
    );
  }
}

LiveBreaks.propTypes = {
  classes: PropTypes.object.isRequired,
  playlist: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired,
  selectedEvent: PropTypes.object.isRequired,
};

export default withStyles(styles)(LiveBreaks);
