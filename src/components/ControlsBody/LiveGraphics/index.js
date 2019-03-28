// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, List } from 'react-virtualized';
import { withStyles } from '@material-ui/core/styles';
import BreaksRow from './BreaksRow';
import Color from '../../../utilities/theme/Color';

const styles = theme => ({
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
      width: 100,
    },
  },
  cell3: {
    width: 175,
    [theme.breakpoints.only('xl')]: {
      width: 100,
    },
  },
  cell4: {
    width: 125,
    [theme.breakpoints.only('xl')]: {
      width: 60,
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

class LiveGraphics extends Component {
  state = {};

  componentDidUpdate() {
    if (!this.props.playlist.noPublishedPlaylistAvailable && this.listEl) {
      this.listEl.recomputeRowHeights();
    }
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
      trigger_type: 'graphic',
      command: 'start',
      params: {
        live_event_id: selectedEvent.ref_id,
        timestamp,
        duration_ms: item.duration,
        jpeg_buffer: '??',
        graphic_name: item.asset_id,
        best_effort_flag: true,
        best_effort_threshold_ms: 1000,
        non_live_masking_flag: true,
      },
    });

    this.props.playItem(selectedEvent.ref_id, item.asset_id);
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
      trigger_type: 'graphic',
      command: 'stop',
      params: {
        live_event_id: selectedEvent.ref_id,
        timestamp,
        duration_ms: item.duration,
        jpeg_buffer: '??',
        graphic_name: item.asset_id,
        best_effort_flag: true,
        best_effort_threshold_ms: 1000,
        non_live_masking_flag: true,
      },
    });
    this.props.stopItem(selectedEvent.ref_id, item.asset_id);
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
          playerState={this.props.playerState}
          eventEnded={this.props.selectedEvent.timeRemainingTillEventEnd < 0}
        />
      </div>
    );
  };

  render() {
    const {
      classes,
      playlist: { graphicItemIds, noPublishedPlaylistAvailable },
    } = this.props;
    if (noPublishedPlaylistAvailable) {
      return <div className={classes.noPlaylists}>No playlists have been published.</div>;
    }
    if (graphicItemIds.length === 0) {
      return <div className={classes.noPlaylists}>No graphics available.</div>;
    }
    return (
      <div className={classes.root}>
        <div className={classes.headerRow}>
          <div className={classes.cell1}>GRAPHIC INFORMATION</div>
          <div className={classes.cell2}>GRAPHIC TYPE</div>
          <div className={classes.cell3}>PLAYED STATUS</div>
          <div className={classes.cell4}>ACTIONS </div>
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
  playerState: PropTypes.object.isRequired,
};

export default withStyles(styles)(LiveGraphics);
