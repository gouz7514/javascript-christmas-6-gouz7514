import { DATE, EVENT } from "../constants/constant.js";
import { ERROR } from "../constants/error.js";

const isValidDate = date => {
  const { start, end } = DATE;
  return date >= start && date <= end;
};

export const getDay = date => {
  if (!isValidDate(date)) throw new Error(ERROR.errorDate);
  return new Date(EVENT.year, EVENT.month - 1, date).getDay();
};

export const isWeekend = date => {
  const day = getDay(date);
  return DATE.weekend.includes(day);
};

export const isWeekday = date => {
  const day = getDay(date);
  return DATE.weekDay.includes(day);
};

export const isSpecial = date => DATE.special.includes(date);