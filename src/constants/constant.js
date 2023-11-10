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

export const BENEFIT_TYPE = {
  discount: 'discount',
  event: 'event',
};

export const BENEFIT = {
  christmas: {
    name: 'christmas',
    type: BENEFIT_TYPE.discount,
    startPrice: 1000,
    dayPrice: 100,
  },
  weekDay: {
    name: 'weekDay',
    type: BENEFIT_TYPE.discount,
    menuType: MENU_TYPE.dessert,
    discount: 2023,
  },
  weekEnd: {
    name: 'weekEnd',
    type: BENEFIT_TYPE.discount,
    menuType: MENU_TYPE.main,
    discount: 2023,
  },
  special: {
    name: 'special',
    type: BENEFIT_TYPE.discount,
    discount: 1000,
  },
  giveAway: {
    name: 'giveAway',
    type: BENEFIT_TYPE.event,
    discount: MENU['샴페인'].price,
    amount: 1,
    threshold: 12000,
  },
};

export const DELIMITER = {
  order: ",",
  menu: "-",
};