import { DATE, DELIMITER } from "../constants/constant.js";
import { ERROR } from "../constants/error.js";
import { MENU, MENU_COUNT } from "../constants/menu.js";

const REGEX_STRING = /^[a-zA-Z가-힣]+$/;
const REGEX_NUMBER = /^-?\d+(\.\d+)?$/;

const checkNumber = (value) => REGEX_NUMBER.test(value) && Number.isSafeInteger(Number(value));

export default class InputValidator {
  // 1-1-1. 날짜는 1 이상 31 이하의 숫자여야만 한다.
  static validateVisitDate(date) {
    this.isNumber(date);
    this.isValidDate(date);
    return date;
  }

  static validateOrders(orders) {
    const orderArray = orders.split(DELIMITER.order);
    this.isValidOrderFormat(orderArray);
    this.isValidOrder(orderArray);
    this.isValidMenuCount(orderArray);
    this.isMenuRepeat(orderArray);
    this.isMenuCountOver(orderArray);
    return orders;
  }

  static isNumber(value) {
    const isValid = checkNumber(value);
    if (!isValid) {
      this.throwDateError();
    }
  }

  static isValidDate(value) {
    const isValid = Number(value) >= DATE.start && Number(value) <= DATE.end;
    if (!isValid) {
      this.throwDateError();
    }
  }

  // 1-2-1. 메뉴 형식은 예시와 같아야 한다.
  static isValidOrderFormat(orders) {
    orders.forEach((order) => {
      const [menuName, menuCount] = order.split(DELIMITER.menu);
      const isNameString = REGEX_STRING.test(menuName);
      const isCountNumber = checkNumber(menuCount);
      if (!isNameString || !isCountNumber) {
        this.throwMenuError();
      }
    });
  }

  // 1-2-2. 메뉴판에 있는 메뉴여야만 한다.
  static isValidOrder(orders) {
    orders.forEach((order) => {
      const menuName = order.split(DELIMITER.menu)[0];
      if (!MENU[menuName]) {
        this.throwMenuError();
      }
    });
  }

  // 1-2-3. 메뉴의 개수는 1 이상의 숫자여야만 한다.
  static isValidMenuCount(orders) {
    orders.forEach((order) => {
      const menuCount = order.split(DELIMITER.menu)[1];
      const isValid = checkNumber(menuCount) && Number(menuCount) >= MENU_COUNT.min;
      if (!isValid) {
        this.throwMenuError();
      }
    });
  }

  // 1-2-4. 중복 메뉴는 허용하지 않는다.
  static isMenuRepeat(orders) {
    const menuSet = new Set();
    orders.forEach((order) => {
      const menuName = order.split(DELIMITER.menu)[0];
      menuSet.add(menuName);
    });
    const isValid = menuSet.size === orders.length;
    if (!isValid) {
      this.throwMenuError();
    }
  }

  // 1-2-5. 총 메뉴의 개수는 20개를 초과할 수 없다.
  static isMenuCountOver(orders) {
    const menuCount = orders.reduce((acc, cur) => {
      const count = Number(cur.split(DELIMITER.menu)[1]);
      return acc + count;
    }, 0);
    const isValid = menuCount <= MENU_COUNT.max;
    if (!isValid) {
      this.throwMenuError();
    }
  }

  static throwDateError() {
    throw new Error(ERROR.notValidDate);
  }

  static throwMenuError() {
    throw new Error(ERROR.notValidMenu);
  }
}