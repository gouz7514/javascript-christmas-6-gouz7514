import { MENU_TYPE, MENU } from "./menu.js";

export const DATE = {
  start: 1,
  end: 31,
  dday: {
    start: 1,
    end: 25,
  },
  weekDay: [0, 1, 2, 3, 4],
  weekend: [5, 6],
  special: [3, 10, 17, 24, 25, 31],
};

export const EVENT = {
  year: 2023,
  month: 12,
};

export const BENEFIT = {
  christmas: {
    type: 'christmas',
    startPrice: 1000,
    dayPrice: 100,
  },
  weekDay: {
    type: 'weekDay',
    menuType: MENU_TYPE.dessert,
    discount: 2023,
  },
  weekEnd: {
    type: 'weekEnd',
    menuType: MENU_TYPE.main,
    discount: 2023,
  },
  special: {
    type: 'special',
    discount: 1000,
  },
  giveAway: {
    type: 'giveAway',
    discount: MENU['샴페인'].price,
    amount: 1,
  },
};

export const DELIMITER = {
  order: ",",
  menu: "-",
};

export const GIVEAWAY = 120000;