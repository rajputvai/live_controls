import timerDurations from '../constants/timerDurations';

const itemsNotToRenderInList = ['LIVE_EVENT_LOGO', 'LIVE_SLATE'];

export function parsePlaylist(draft, items, playlistId) {
  const itemsHash = {};
  // const itemIds = [];
  const breakItemIds = [];
  const graphicItemIds = [];
  let savedItems = localStorage.getItem(playlistId);
  if (savedItems) {
    savedItems = JSON.parse(savedItems);
  } else {
    savedItems = {};
  }

  // Get the queue
  itemsHash.queue = savedItems.queue || [];

  items.forEach(item => {
    let durationOffset = 0;
    if (!itemsNotToRenderInList.includes(item.asset_id)) {
      if (item.sub_type === 'signature') {
        breakItemIds.push(item.asset_id);
      } else if (item.sub_type === 'graphics' || item.sub_type === 'graphic-signature') {
        graphicItemIds.push(item.asset_id);
      }
    }

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
  // draft.itemIds = itemIds;
  draft.breakItemIds = breakItemIds;
  draft.graphicItemIds = graphicItemIds;
}

export function playItem(draft, item) {
  item.playing = true;
  item.stopped = false;
  item.played = false;
  item.startTime = new Date().valueOf();
  let durationOffset = 0;
  item.break_items.forEach(mediaItem => {
    // if (!mediaItem.played) {
    mediaItem.durationOffset = durationOffset;
    durationOffset += mediaItem.duration;
    mediaItem.played = false;
    mediaItem.stopped = false;
    // }
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

  // dequeue everything
  draft.items.queue = [];
}

export function queueItem(draft, item) {
  draft.items.queue.push(item.asset_id);
}

export function dequeueItem(draft, item) {
  draft.items.queue.splice(draft.items.queue.indexOf(item.asset_id), 1);
}

export function updateNowPlaying(state, draft) {
  // Break
  if (state.currentPlayingItemId) {
    const item = draft.items[state.currentPlayingItemId];

    item.timeRemaining = item.startTime + item.duration - new Date().valueOf();

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

      if (mediaItem.playing) {
        mediaItem.timeRemaining = item.startTime + mediaItem.durationOffset + mediaItem.duration - new Date().valueOf();
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

      // Finishes playing
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

      if (draft.items.queue.length > 0) {
        const breakId = draft.items.queue.splice(0, 1)[0];
        playItem(draft, draft.items[breakId]);
        draft.currentPlayingItemId = breakId;
      }
    }
  }

  // Graphics
  if (draft.currentPlayingGraphics.length > 0) {
    draft.currentPlayingGraphics.forEach(playingGraphicId => {
      const playingGraphic = draft.items[playingGraphicId];
      // Finishes playing
      if (playingGraphic.playing && playingGraphic.startTime + playingGraphic.duration < new Date().valueOf()) {
        playingGraphic.playing = false;
        playingGraphic.played = true;
      }
    });
  }
}

export function playGraphics(draft, item) {
  item.playing = true;
  item.stopped = false;
  item.played = false;
  item.startTime = new Date().valueOf();
}

export function stopGraphics(draft, item) {
  item.playing = false;
  item.played = false;
  item.stopped = true;
  item.endTime = new Date().valueOf();
}
