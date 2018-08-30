import moment from 'moment';

export function wrap(x) {
  if (x < 10) {
    return `0${x}`;
  }
  return x;
}

export function formatDuration(duration, ms = true) {
  const momentDuration = moment.duration(duration);
  if (!ms) {
    return `${wrap(momentDuration.hours())}:${wrap(momentDuration.minutes())}:${wrap(momentDuration.seconds())}`;
  }
  return `${wrap(momentDuration.hours())}:${wrap(momentDuration.minutes())}:${wrap(momentDuration.seconds())}.${wrap(
    momentDuration.milliseconds()
  )}`;
}
