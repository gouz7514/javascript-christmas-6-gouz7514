import { DATE } from "../constants/constant.js";
import { ERROR } from "../constants/error.js";
import { MENU } from "../constants/menu.js";

const REGEX_STRING = /^[a-zA-Z가-힣]+$/;
const REGEX_NUMBER = /^-?\d+(\.\d+)?$/;

const checkNumber = (value) => REGEX_NUMBER.test(value) && Number.isSafeInteger(Number(value));

export default class InputValidator {
  static #menuDelimiter = ",";

  static #menuCountDelimiter = "-";

  // 1-1-1. 숫자로만, 1 이상 31 이하, 이외의 입력값은 예외를 발생시킨다.
  static validateDate(date) {
    this.isNumber(date);
    this.isValidDate(date);
    return date;
  }

  static validateMenu(menus) {
    const menuArray = menus.split(this.#menuDelimiter);
    this.isValidMenuFormat(menuArray);
    this.isValidMenu(menuArray);
    return menus;
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

  // 1-2-1. 메뉴 형식이 예시와 다른 경우, 예외를 발생시킨다.
  static isValidMenuFormat(menus) {
    menus.forEach((menu) => {
      const [menuName, menuCount] = menu.split(this.#menuCountDelimiter);
      const isNameString = REGEX_STRING.test(menuName);
      const isCountNumber = checkNumber(menuCount);
      if (!isNameString || !isCountNumber) {
        this.throwMenuError();
      }
    });
  }

  // 1-2-2. 메뉴판에 없는 메뉴의 경우, 예외를 발생시킨다.
  static isValidMenu(menus) {
    menus.forEach((menu) => {
      const menuName = menu.split(this.#menuCountDelimiter)[0];
      if (!MENU[menuName]) {
        this.throwMenuError();
      }
    });
  }

  static throwDateError() {
    throw new Error(ERROR.notValidDate);
  }

  static throwMenuError() {
    throw new Error(ERROR.notValidMenu);
  }
}