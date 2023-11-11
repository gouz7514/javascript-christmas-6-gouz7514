import { MENU_TYPE, MENU, MENU_GIVEAWAY } from "./menu.js";

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

export const BENEFIT_THRESHOLD = 10000;

export const BENEFIT = {
  christmas: {
    name: 'christmas',
    name_ko: '크리스마스 디데이 할인',
    type: BENEFIT_TYPE.discount,
    startPrice: 1000,
    dayPrice: 100,
  },
  weekDay: {
    name: 'weekDay',
    name_ko: '평일 할인',
    type: BENEFIT_TYPE.discount,
    menuType: MENU_TYPE.dessert,
    discount: 2023,
  },
  weekEnd: {
    name: 'weekEnd',
    name_ko: '주말 할인',
    type: BENEFIT_TYPE.discount,
    menuType: MENU_TYPE.main,
    discount: 2023,
  },
  special: {
    name: 'special',
    name_ko: '특별 할인',
    type: BENEFIT_TYPE.discount,
    discount: 1000,
  },
  giveAway: {
    name: 'giveAway',
    name_ko: '증정 이벤트',
    type: BENEFIT_TYPE.event,
    discount: MENU[MENU_GIVEAWAY].price,
    menu: MENU_GIVEAWAY,
    amount: 1,
  },
};

export const BADGE = {
  santa: {
    name: "산타",
    threshold: 20000,
  },
  tree: {
    name: "트리",
    threshold: 10000,
  },
  star: {
    name: "별",
    threshold: 5000,
  },
};

export const THRESHOLD = {
  event: 10000,
  giveAway: 120000,
};

export const DELIMITER = {
  order: ",",
  menu: "-",
};