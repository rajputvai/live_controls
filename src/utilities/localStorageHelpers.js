export function isLiveOnForEvent(eventRefId) {
  const localConfigForEvent = localStorage.getItem(eventRefId);
  if (!localConfigForEvent) {
    return false;
  }
  const config = JSON.parse(localConfigForEvent);
  return config.isLiveOn || false;
}

export function setLiveOnForEvent(eventRefId, value) {
  const localConfigForEvent = localStorage.getItem(eventRefId);
  let config;
  if (!localConfigForEvent) {
    config = { isLiveOn: value };
  } else {
    config = JSON.parse(localConfigForEvent);
    config.isLiveOn = value;
  }
  localStorage.setItem(eventRefId, JSON.stringify(config));
}

export function getAllPlayedBreakItemsForEvent(eventRefId) {
  const localConfigForEvent = localStorage.getItem(eventRefId);
  if (!localConfigForEvent) {
    return [];
  }
  const config = JSON.parse(localConfigForEvent);
  if (config.breakItemsPlayed) {
    return config.breakItemsPlayed || [];
  }
  return [];
}

export function setBreakItemPlayed(eventRefId, breakItemId) {
  const localConfigForEvent = localStorage.getItem(eventRefId);
  let config;
  if (!localConfigForEvent) {
    config = { breakItemsPlayed: [breakItemId] };
  } else {
    config = JSON.parse(localConfigForEvent);
    if (config.breakItemsPlayed) {
      config.breakItemsPlayed.push(breakItemId);
    } else {
      config.breakItemsPlayed = [breakItemId];
    }
  }
  localStorage.setItem(eventRefId, JSON.stringify(config));
}
