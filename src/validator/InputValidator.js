import { DATE, DELIMITER } from "../constants/constant.js";
import { ERROR } from "../constants/error.js";
import { orderToArray } from "../util/order.js";
import Menu from "../class/Menu.js";

const REGEX_STRING = /^[a-zA-Z가-힣]+$/;
const REGEX_NUMBER = /^-?\d+(\.\d+)?$/;

const InputValidator = {
  validateVisitDate(date) {
    this.isNumber(date);
    this.isValidDate(date);
    return Number(date);
  },
  validateOrders(orders) {
    const splittedOrder = orders.split(DELIMITER.order);
    this.isValidOrderFormat(splittedOrder);
    this.isValidOrder(splittedOrder);
    this.isValidMenuCount(splittedOrder);
    this.isMenuRepeat(splittedOrder);
    this.isMenuCountOver(splittedOrder);
    this.isOnlyDrink(splittedOrder);
    return orderToArray(orders);
  },
  // 1-1-1. 입력값은 숫자여야 한다.
  isNumber(value) {
    const isValid = this.checkNumber(value);
    if (!isValid) {
      this.throwDateError();
    }
  },
  // 1-1-2. 입력값은 1 이상 31 이하의 숫자여야만 한다.
  isValidDate(value) {
    const isValid = Number(value) >= DATE.start && Number(value) <= DATE.end;
    if (!isValid) {
      this.throwDateError();
    }
  },
  // 1-2-1. 메뉴 형식은 예시와 같아야 한다.
  isValidOrderFormat(orders) {
    orders.forEach((order) => {
      const [menuName, menuCount] = order.split(DELIMITER.menu);
      const isNameString = this.checkString(menuName);
      const isCountNumber = this.checkNumber(menuCount);
      if (!isNameString || !isCountNumber) {
        this.throwMenuError();
      }
    });
  },
  // 1-2-2. 메뉴판에 있는 메뉴여야만 한다.
  isValidOrder(orders) {
    orders.forEach((order) => {
      const menuName = order.split(DELIMITER.menu)[0];
      Menu.isMenuExist(menuName);
    });
  },
  // 1-2-3. 메뉴의 개수는 1 이상의 숫자여야만 한다.
  isValidMenuCount(orders) {
    orders.forEach((order) => {
      const menuCount = order.split(DELIMITER.menu)[1];
      const isValid = this.checkNumber(menuCount) && Number(menuCount) && Menu.isCntOverMin(menuCount);
      if (!isValid) {
        this.throwMenuError();
      }
    });
  },
  // 1-2-4. 중복 메뉴는 허용하지 않는다.
  isMenuRepeat(orders) {
    const menuSet = new Set();
    orders.forEach((order) => {
      const menuName = order.split(DELIMITER.menu)[0];
      menuSet.add(menuName);
    });
    const isValid = menuSet.size === orders.length;
    if (!isValid) {
      this.throwMenuError();
    }
  },
  // 1-2-5. 총 메뉴의 개수는 20개를 초과할 수 없다.
  isMenuCountOver(orders) {
    const menuCount = orders.reduce((acc, cur) => {
      const count = Number(cur.split(DELIMITER.menu)[1]);
      return acc + count;
    }, 0);
    const isValid = Menu.isCntUnderMax(menuCount);
    if (!isValid) {
      this.throwMenuError();
    }
  },
  // 1-2-6. 음료만 주문할 수 없다.
  isOnlyDrink(orders) {
    const isValid = Menu.isOnlyDrink(orders);
    if (!isValid) {
      this.throwMenuError();
    }
  },
  checkString(value) {
    const isValid = REGEX_STRING.test(value);
    return isValid;
  },
  checkNumber(value) {
    const isValid = REGEX_NUMBER.test(value) && Number.isSafeInteger(Number(value));
    return isValid;
  },
  throwDateError() {
    throw new Error(ERROR.notValidDate);
  },
  throwMenuError() {
    throw new Error(ERROR.notValidMenu);
  }
};

export default InputValidator;