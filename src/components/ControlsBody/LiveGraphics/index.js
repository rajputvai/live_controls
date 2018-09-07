// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, List } from 'react-virtualized';
import { withStyles } from '@material-ui/core/styles';
import BreaksRow from './BreaksRow';
import Color from '../../../utilities/theme/Color';

const styles = {
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
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
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
  breakIndex: {
    marginRight: 20,
  },
  noPlaylists: {
    margin: 30,
  },
  autoSizer: {
    flex: 1,
  },
};

class LiveGraphics extends Component {
  state = {};

  componentDidMount() {
    this.interval = setInterval(this.props.updateNowPlaying, 1000);
  }

  componentDidUpdate() {
    if (!this.props.playlist.noPublishedPlaylistAvailable && this.listEl) {
      this.listEl.recomputeRowHeights();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  overscanIndicesGetter = ({ cellCount, overscanCellsCount, startIndex, stopIndex }) => ({
    overscanStartIndex: Math.max(0, startIndex - overscanCellsCount),
    overscanStopIndex: Math.min(cellCount - 1, stopIndex + overscanCellsCount),
  });

  playItem = breakId => {
    const {
      selectedEvent,
      playlist: { playlist, items },
    } = this.props;

    const item = items[breakId];
    const startTime = Date.now();
    console.log('requesting player for snapshot at: ', startTime);

    window.inputPlayer.takescreenshot(pts => {
      console.log('pts', pts);
      const endTime = Date.now();
      console.log('pts received from player at: ', endTime);
      console.log('time taken to get pts from player: ', endTime - startTime);
      this.props.sendMessage({
        trigger_type: 'graphic',
        command: 'start',
        params: {
          live_event_id: selectedEvent.ref_id,
          timestamp: pts,
          duration_ms: item.duration,
          jpeg_buffer: '??',
          graphic_name: 'soccer',
          best_effort_flag: true,
          best_effort_threshold_ms: 1000,
          non_live_masking_flag: true,
        },
      });
    });

    this.props.playItem(selectedEvent.ref_id, playlist.id, item.asset_id);
  };

  stopItem = itemId => {
    const {
      selectedEvent,
      playlist: { playlist, items },
    } = this.props;
    const item = items[itemId];
    const startTime = Date.now();
    console.log('requesting player for snapshot at: ', startTime);

    window.inputPlayer.takescreenshot(pts => {
      console.log('pts', pts);
      const endTime = Date.now();
      console.log('pts received from player at: ', endTime);
      console.log('time taken to get pts from player: ', endTime - startTime);
      this.props.sendMessage({
        trigger_type: 'break',
        command: 'stop',
        params: {
          live_event_id: selectedEvent.ref_id,
          timestamp: pts,
          duration_ms: item.duration,
          jpeg_buffer: '??',
          graphic_name: 'soccer',
          best_effort_flag: true,
          best_effort_threshold_ms: 1000,
          non_live_masking_flag: true,
        },
      });
    });
    this.props.stopItem(selectedEvent.ref_id, playlist.id, item.asset_id);
  };

  getRowHeight = ({ index }) => {
    const itemId = this.props.playlist.graphicItemIds[index];
    const item = this.props.playlist.items[itemId];

    if (item.expanded) {
      const expandedItemCount = item.break_items.length;
      return expandedItemCount * 50 + 70;
    }
    return 70;
  };

  renderRow = ({ index, key, style }) => {
    const { items, graphicItemIds } = this.props.playlist;
    const itemId = graphicItemIds[index];
    const item = items[itemId];

    return (
      <div style={style} key={key}>
        <BreaksRow
          item={item}
          eventId={this.props.selectedEvent.ref_id}
          playlistId={this.props.playlist.playlist.id}
          currentPlayingItemId={this.props.playlist.currentPlayingItemId}
          playItem={this.playItem}
          stopItem={this.stopItem}
          toggleItem={this.props.toggleItem}
        />
      </div>
    );
  };

  render() {
    const {
      classes,
      playlist: { graphicItemIds },
    } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.headerRow}>
          <div>GRAPHIC INFORMATION</div>
          <div>GRAPHIC TYPE</div>
          <div>PLAYED STATUS</div>
          <div>ACTIONS </div>
        </div>
        <div className={classes.autoSizer}>
          <AutoSizer>
            {({ width, height }) => (
              <List
                ref={el => {
                  this.listEl = el;
                }}
                width={width}
                height={height}
                rowHeight={this.getRowHeight}
                rowRenderer={this.renderRow}
                rowCount={graphicItemIds.length}
                style={{ outline: 'none' }}
                overscanIndicesGetter={this.overscanIndicesGetter}
                overscanRowCount={50}
              />
            )}
          </AutoSizer>
        </div>
      </div>
    );
  }
}

LiveGraphics.propTypes = {
  classes: PropTypes.object.isRequired,
  playlist: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired,
  selectedEvent: PropTypes.object.isRequired,
  playItem: PropTypes.func.isRequired,
  stopItem: PropTypes.func.isRequired,
  toggleItem: PropTypes.func.isRequired,
  updateNowPlaying: PropTypes.func.isRequired,
};

export default withStyles(styles)(LiveGraphics);
