// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AutoSizer, List } from 'react-virtualized';

// Components
import BreaksRow from './BreaksRow';
import TableHeader from './TableHeader';

// Assets
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
};

const itemsNotToRenderInList = ['LIVE_EVENT_LOGO', 'LIVE_SLATE'];

class LiveBreaks extends Component {
  componentDidMount() {
    setInterval(this.props.updateNowPlaying, 1000);
  }

  componentDidUpdate() {
    this.listEl.recomputeRowHeights();
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
        trigger_type: 'break',
        command: 'start',
        params: {
          live_event_id: selectedEvent.ref_id,
          timestamp: pts,
          duration_ms: item.duration,
          jpeg_buffer: '??',
          break_name: item.title,
          best_effort_flag: true,
          best_effort_threshold_ms: 1000,
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

    this.props.stopItem(selectedEvent.ref_id, playlist.id, item.asset_id);
  };

  renderRow = ({ index, key, style }) => {
    const itemId = this.props.playlist.itemIds.filter(item => !itemsNotToRenderInList.includes(item))[index];
    const item = this.props.playlist.items[itemId];

    return (
      <div style={style} key={key}>
        <BreaksRow
          item={item}
          index={index}
          eventId={this.props.selectedEvent.ref_id}
          playlistId={this.props.playlist.playlist.id}
          status={this.props.playlist.status}
          currentPlayingItemId={this.props.playlist.currentPlayingItemId}
          playItem={this.playItem}
          stopItem={this.stopItem}
          toggleItem={this.props.toggleItem}
        />
      </div>
    );
  };

  getRowHeight = ({ index }) => {
    const itemId = this.props.playlist.itemIds[index];
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
      playlist: { itemIds },
    } = this.props;
    const itemIdsWithLogo = itemIds.filter(item => !itemsNotToRenderInList.includes(item));
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
              rowCount={itemIdsWithLogo.length}
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
        <TableHeader />
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
  playItem: PropTypes.func.isRequired,
  stopItem: PropTypes.func.isRequired,
  toggleItem: PropTypes.func.isRequired,
  updateNowPlaying: PropTypes.func.isRequired,
};

export default withStyles(styles)(LiveBreaks);
