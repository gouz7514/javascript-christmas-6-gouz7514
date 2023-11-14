import { DAY, DATE, EVENT } from "../constants/constant.js";

export const getDay = date => new Date(EVENT.year, EVENT.month - 1, date).getDay();

export const isWeekend = date => {
  const day = getDay(date);
  return day === DAY.fri || day === DAY.sat;
};

export const isWeekday = date => {
  const day = getDay(date);
  return day !== DAY.fri && day !== DAY.sat;
};

export const isSpecial = date => DATE.special.includes(date);