export type TimeSpan = {
  _milliseconds: number;
};

const fromMilliseconds = (milliseconds: number): TimeSpan => {
  return {
    _milliseconds: milliseconds,
  };
};

const fromSeconds = (seconds: number): TimeSpan => {
  return fromMilliseconds(seconds * 1000);
};

const fromMinutes = (minutes: number): TimeSpan => {
  return fromSeconds(minutes * 60);
};

const fromHours = (hours: number): TimeSpan => {
  return fromMinutes(hours * 60);
};

const fromDays = (days: number): TimeSpan => {
  return fromHours(days * 24);
};

const fromWeeks = (weeks: number): TimeSpan => {
  return fromDays(weeks * 7);
};

const fromMonths = (months: number): TimeSpan => {
  return fromDays(months * 30);
};

const fromYears = (years: number): TimeSpan => {
  return fromDays(years * 365);
};

const toMilliseconds = (timeSpan: TimeSpan): number => {
  return timeSpan._milliseconds;
};

const toSeconds = (timeSpan: TimeSpan): number => {
  return timeSpan._milliseconds / 1000;
};

const toMinutes = (timeSpan: TimeSpan): number => {
  return toSeconds(timeSpan) / 60;
};

const toHours = (timeSpan: TimeSpan): number => {
  return toMinutes(timeSpan) / 60;
};

const toDays = (timeSpan: TimeSpan): number => {
  return toHours(timeSpan) / 24;
};

const toWeeks = (timeSpan: TimeSpan): number => {
  return toDays(timeSpan) / 7;
};

const toMonths = (timeSpan: TimeSpan): number => {
  return toDays(timeSpan) / 30;
};

const toYears = (timeSpan: TimeSpan): number => {
  return toDays(timeSpan) / 365;
};

export const TimeSpan = {
  fromMilliseconds,
  fromSeconds,
  fromMinutes,
  fromHours,
  fromDays,
  fromWeeks,
  fromMonths,
  fromYears,
  toMilliseconds,
  toSeconds,
  toMinutes,
  toHours,
  toDays,
  toWeeks,
  toMonths,
  toYears,
};
