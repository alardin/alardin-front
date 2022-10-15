import { minuteStringCheck } from './home/convertDateTime';

export const BUTTON_HEIGHT = 54;
export const VIEW_WIDTH = 300;
export const GAP = 12;
export const MERIDIEM_ITEMS = ['오전', '오후'];
export const HOUR_ITEMS = [
  '12',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
];
export const MINUTE_ITEMS = Array.from({ length: 60 }).map((_, index) =>
  minuteStringCheck(index),
);

export const getIndexFromOffset = (offsetY: number) => {
  return Math.round(offsetY / BUTTON_HEIGHT);
};
export const getCenterPosition = (offsetY: number) => {
  return getIndexFromOffset(offsetY) * BUTTON_HEIGHT;
};
export const getCenterPositionFromIndex = (index: number) => {
  return index * BUTTON_HEIGHT;
};
export const fillEmpty = (visibleCount: number, [...values]) => {
  const fillCount = (visibleCount - 1) / 2;
  for (let i = 0; i < fillCount; i++) {
    values.unshift('');
    values.push('');
  }
  return values;
};

export const asPickerFormat = (date: Date) => {
  const _date = new Date(date.getTime());
  const hour = _date.getHours();
  const min = _date.getMinutes();
  _date.setTime(Date.now());
  _date.setHours(hour);
  _date.setMinutes(min);
  _date.setSeconds(0);
  _date.setMilliseconds(0);
  return _date;
};
