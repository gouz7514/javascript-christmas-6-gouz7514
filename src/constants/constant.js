import { MENU_TYPE } from "./menu.js";

export const DAY = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
};

export const DATE = {
  start: 1,
  end: 31,
  dday: {
    start: 1,
    end: 25,
  },
  weekDay: [DAY.sun, DAY.mon, DAY.tue, DAY.wed, DAY.thu],
  weekend: [DAY.fri, DAY.sat],
  special: [3, 10, 17, 24, 25, 31],
};

export const EVENT = {
  year: 2023,
  month: 12,
  priceThreshold: 10000,
};

export const BENEFIT_TYPE = {
  discount: 'discount',
  event: 'event',
};

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
    threshold: 120000,
  },
};

export const BENEFIT_EMPTY_CASE = {
  benefits: [],
  christmasBenefit: {},
  dayBenefit: {},
  weekDay: {
    benefit: {},
    discountNumber: 0,
  },
  weekEnd: {
    benefit: {},
    discountNumber: 0,
  },
  specialBenefit: {},
  giveAwayBenefit: {},
  benefitAmount: {
    total: 0,
    discount: 0,
    giveAway: 0,
  },
  badge: '',
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