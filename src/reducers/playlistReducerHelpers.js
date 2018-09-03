export function parsePlaylist(draft, items) {
  const itemsHash = {};
  const itemIds = [];

  items.forEach(item => {
    itemIds.push(item.asset_id);

    itemsHash[item.asset_id] = {
      ...item,
      playing: false,
      played: false,
      expanded: false,
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
}
