// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AutoSizer, List } from 'react-virtualized';

// Components
import BreaksRow from './BreaksRow';
// import TableHeader from './TableHeader';

// Assets
import Color from '../../../utilities/theme/Color';

const styles = theme => ({
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
  headerRow: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Color.primary.p3,
    display: 'flex',
    maxWidth: 'calc(100% - 15px)',
    marginBottom: 10,
  },
  cell1: {
    flex: 1,
    marginLeft: 20,
  },
  cell2: {
    width: 175,
    [theme.breakpoints.only('xl')]: {
      width: 150,
    },
  },
  cell3: {
    width: 175,
    [theme.breakpoints.only('xl')]: {
      width: 150,
    },
  },
  cell4: {
    width: 125,
    [theme.breakpoints.only('xl')]: {
      width: 100,
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
});

class LiveBreaks extends Component {
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
    const timestamp = window.inputPlayer ? window.inputPlayer.getPTSVideo() : 0;
    console.log('pts', timestamp);
    const endTime = Date.now();
    console.log('pts received from player at: ', endTime);
    console.log('time taken to get pts from player: ', endTime - startTime);
    this.props.sendMessage({
      trigger_type: 'break',
      command: 'start',
      params: {
        live_event_id: selectedEvent.ref_id,
        timestamp,
        duration_ms: item.duration,
        jpeg_buffer: '??',
        break_name: item.asset_id,
        best_effort_flag: true,
        best_effort_threshold_ms: 1000,
      },
    });

    if (this.props.playlist.currentPlayingItemId) {
      this.props.stopItem(selectedEvent.ref_id, playlist.id, this.props.playlist.currentPlayingItemId);
    }

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
    const timestamp = window.inputPlayer.getPTSVideo();
    console.log('pts', timestamp);
    const endTime = Date.now();
    console.log('pts received from player at: ', endTime);
    console.log('time taken to get pts from player: ', endTime - startTime);
    this.props.sendMessage({
      trigger_type: 'break',
      command: 'stop',
      params: {
        live_event_id: selectedEvent.ref_id,
        timestamp,
        duration_ms: item.duration,
        jpeg_buffer: '??',
        break_name: item.asset_id,
        best_effort_flag: true,
        best_effort_threshold_ms: 1000,
      },
    });
    this.props.stopItem(selectedEvent.ref_id, playlist.id, item.asset_id);
  };

  queueItem = itemId => {
    const {
      selectedEvent,
      playlist: { playlist, items },
    } = this.props;
    const item = items[itemId];
    const startTime = Date.now();
    const timestamp = window.inputPlayer.getPTSVideo();
    console.log('pts', timestamp);
    const endTime = Date.now();
    console.log('pts received from player at: ', endTime);
    console.log('time taken to get pts from player: ', endTime - startTime);
    this.props.sendMessage({
      trigger_type: 'break',
      command: 'queue',
      params: {
        live_event_id: selectedEvent.ref_id,
        timestamp,
        duration_ms: item.duration,
        jpeg_buffer: '??',
        break_name: item.asset_id,
        best_effort_flag: true,
        best_effort_threshold_ms: 1000,
      },
    });
    this.props.queueItem(selectedEvent.ref_id, playlist.id, item.asset_id);
  };

  dequeueItem = itemId => {
    const {
      selectedEvent,
      playlist: { playlist, items },
    } = this.props;
    const item = items[itemId];
    const startTime = Date.now();
    const timestamp = window.inputPlayer.getPTSVideo();
    console.log('pts', timestamp);
    const endTime = Date.now();
    console.log('pts received from player at: ', endTime);
    console.log('time taken to get pts from player: ', endTime - startTime);
    this.props.sendMessage({
      trigger_type: 'break',
      command: 'dequeue',
      params: {
        live_event_id: selectedEvent.ref_id,
        timestamp,
        duration_ms: item.duration,
        jpeg_buffer: '??',
        break_name: item.asset_id,
        best_effort_flag: true,
        best_effort_threshold_ms: 1000,
      },
    });

    this.props.dequeueItem(selectedEvent.ref_id, playlist.id, item.asset_id);
  };

  renderRow = ({ index, key, style }) => {
    const { items, breakItemIds } = this.props.playlist;
    const itemId = breakItemIds[index];
    const item = items[itemId];

    return (
      <div style={style} key={key}>
        <BreaksRow
          item={item}
          eventId={this.props.selectedEvent.ref_id}
          playlistId={this.props.playlist.playlist.id}
          queue={this.props.playlist.items.queue}
          currentPlayingItemId={this.props.playlist.currentPlayingItemId}
          playItem={this.playItem}
          stopItem={this.stopItem}
          queueItem={this.queueItem}
          dequeueItem={this.dequeueItem}
          toggleItem={this.props.toggleItem}
          playerState={this.props.playerState}
        />
      </div>
    );
  };

  getRowHeight = ({ index }) => {
    const itemId = this.props.playlist.breakItemIds[index];
    const item = this.props.playlist.items[itemId];

    if (item.expanded) {
      const expandedItemCount = item.break_items.length;
      return expandedItemCount * 50 + 70;
    }
    return 70;
  };

  renderLiveBreaksTable() {
    const {
      classes,
      playlist: { breakItemIds, noPublishedPlaylistAvailable },
    } = this.props;
    if (noPublishedPlaylistAvailable) {
      return <div className={classes.noPlaylists}>No playlists have been published.</div>;
    }

    if (breakItemIds.length === 0) {
      return <div className={classes.noPlaylists}>No break items available.</div>;
    }

    return (
      <div className={classes.root}>
        <div className={classes.headerRow}>
          <div className={classes.cell1}>BREAK/ ASSET INFORMATION</div>
          <div className={classes.cell2}>ASSET TYPE</div>
          <div className={classes.cell3}>PLAYED STATUS</div>
          <div className={classes.cell4}>ACTIONS</div>
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
                rowCount={breakItemIds.length}
                style={{ outline: 'none', overflowY: 'scroll' }}
                overscanIndicesGetter={this.overscanIndicesGetter}
                overscanRowCount={50}
              />
            )}
          </AutoSizer>
        </div>
      </div>
    );
  }

  render() {
    return this.renderLiveBreaksTable();
  }
}

LiveBreaks.propTypes = {
  classes: PropTypes.object.isRequired,
  playlist: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired,
  selectedEvent: PropTypes.object.isRequired,
  playItem: PropTypes.func.isRequired,
  stopItem: PropTypes.func.isRequired,
  queueItem: PropTypes.func.isRequired,
  dequeueItem: PropTypes.func.isRequired,
  toggleItem: PropTypes.func.isRequired,
  updateNowPlaying: PropTypes.func.isRequired,
  playerState: PropTypes.object.isRequired,
};

export default withStyles(styles)(LiveBreaks);
