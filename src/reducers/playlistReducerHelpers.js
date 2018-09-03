export function parsePlaylist(draft, items) {
  const itemsHash = {};
  const itemIds = [];

  items.forEach(item => {
    let durationOffset = 0;
    itemIds.push(item.asset_id);

    itemsHash[item.asset_id] = {
      ...item,
      playing: false,
      played: false,
      expanded: false,
      break_items: item.break_items.map(mediaItem => {
        mediaItem.playing = false;
        mediaItem.played = false;
        mediaItem.comingUpNext = false;
        mediaItem.durationOffset = durationOffset;
        durationOffset += mediaItem.duration;
        return mediaItem;
      }),
    };
  });

  draft.items = itemsHash;
  draft.itemIds = itemIds;
}

export function playItem(draft, item) {
  item.playing = true;
  item.startTime = new Date().valueOf();
}

export function stopItem(draft, item) {
  item.playing = false;
  item.played = true;
  item.endTime = new Date().valueOf();
}

export function updateNowPlaying(state, draft) {
  if (!state.currentPlayingItemId) {
    return;
  }
  const item = draft.items[state.currentPlayingItemId];

  if (item.startTime + item.duration < new Date().valueOf()) {
    item.playing = false;
    item.played = true;

    draft.currentPlayingItemId = '';
  }

  item.break_items = item.break_items.map(mediaItem => {
    // Ignore played items
    if (mediaItem.played) {
      return mediaItem;
    }

    // Check if item has started playing
    if (!mediaItem.playing && item.startTime + mediaItem.durationOffset < new Date().valueOf()) {
      mediaItem.playing = true;
      mediaItem.comingUpNext = false;
    }

    if (mediaItem.playing && item.startTime + mediaItem.durationOffset + mediaItem.duration < new Date().valueOf()) {
      mediaItem.playing = false;
      mediaItem.played = true;
    }

    return mediaItem;
  });
}
