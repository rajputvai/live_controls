import timerDurations from '../constants/timerDurations';

export function parsePlaylist(draft, items, playlistId) {
  const itemsHash = {};
  const itemIds = [];
  let savedItems = localStorage.getItem(playlistId);
  if (savedItems) {
    savedItems = JSON.parse(savedItems);
  } else {
    savedItems = {};
  }

  items.forEach(item => {
    let durationOffset = 0;
    itemIds.push(item.asset_id);

    itemsHash[item.asset_id] = {
      ...item,
      playing: (savedItems[item.asset_id] || {}).playing || false,
      played: (savedItems[item.asset_id] || {}).played || false,
      stopped: (savedItems[item.asset_id] || {}).stopped || false,
      expanded: (savedItems[item.asset_id] || {}).expanded || false,
      startTime: (savedItems[item.asset_id] || {}).startTime,
      break_items: item.break_items.map((mediaItem, i) => {
        mediaItem.playing = (((savedItems[item.asset_id] || {}).break_items || {})[i] || {}).playing || false;
        mediaItem.played = (((savedItems[item.asset_id] || {}).break_items || {})[i] || {}).played || false;
        mediaItem.stopped = (((savedItems[item.asset_id] || {}).break_items || {})[i] || {}).stopped || false;
        mediaItem.comingUpNext = (((savedItems[item.asset_id] || {}).break_items || {})[i] || {}).comingUpNext || false;
        mediaItem.durationOffset = durationOffset;
        durationOffset += mediaItem.duration;
        return mediaItem;
      }),
    };

    if (itemsHash[item.asset_id].playing) {
      draft.currentPlayingItemId = item.asset_id;
    }
  });

  draft.items = itemsHash;
  draft.itemIds = itemIds;
}

export function playItem(draft, item) {
  item.playing = true;
  item.stopped = false;
  item.startTime = new Date().valueOf();
  let durationOffset = 0;
  item.break_items.forEach(mediaItem => {
    if (!mediaItem.played) {
      mediaItem.durationOffset = durationOffset;
      durationOffset += mediaItem.duration;
    }
  });
}

export function stopItem(draft, item) {
  item.playing = false;
  item.played = false;
  item.stopped = true;
  item.endTime = new Date().valueOf();
  item.break_items.forEach(mediaItem => {
    if (mediaItem.playing) {
      mediaItem.playing = false;
      mediaItem.played = false;
      mediaItem.stopped = true;
    }
    if (mediaItem.comingUpNext || (!mediaItem.played && !mediaItem.playing)) {
      mediaItem.comingUpNext = false;
    }
  });
}

export function updateNowPlaying(state, draft) {
  if (!state.currentPlayingItemId) {
    return;
  }
  const item = draft.items[state.currentPlayingItemId];

  let foundComingUpNext = false;
  item.break_items = item.break_items.map(mediaItem => {
    if (mediaItem.played) {
      return mediaItem;
    }
    // Check if item has started playings
    if (
      !mediaItem.playing &&
      item.startTime + mediaItem.durationOffset < new Date().valueOf() &&
      item.startTime + mediaItem.durationOffset + mediaItem.duration > new Date().valueOf()
    ) {
      mediaItem.playing = true;
      mediaItem.stopped = false;
      mediaItem.comingUpNext = false;
    }

    // Coming up next
    if (
      !foundComingUpNext &&
      !mediaItem.played &&
      !mediaItem.playing &&
      item.startTime + mediaItem.durationOffset - new Date().valueOf() < timerDurations.comingUpNext
    ) {
      mediaItem.comingUpNext = true;
      foundComingUpNext = true;
      mediaItem.stopped = false;
    }

    if (mediaItem.playing && item.startTime + mediaItem.durationOffset + mediaItem.duration < new Date().valueOf()) {
      mediaItem.playing = false;
      mediaItem.played = true;
    }
    return mediaItem;
  });

  if (item.break_items.filter(mediaItem => mediaItem.played).length === item.break_items.length) {
    item.playing = false;
    item.played = true;
    item.stopped = false;

    draft.currentPlayingItemId = '';
  }
}
