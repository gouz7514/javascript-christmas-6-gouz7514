import { DATE } from "../constants/constant.js";
import { ERROR } from "../constants/error.js";
import { MENU_SPLIT } from "../constants/menu.js";

const REGEX_NUMBER = /^-?\d+(\.\d+)?$/;
const REGEX_STRING = /^[a-zA-Z가-힣]+$/;

export default class InputValidator {
  // 1-1-1. 숫자로만, 1 이상 31 이하, 이외의 입력값은 예외를 발생시킨다.
  static validateDate(date) {
    this.isNumber(date);
    this.isValidDate(date);
    return date;
  }

  static validateMenu(menus) {
    const menuArray = menus.split(MENU_SPLIT.menu);
    this.isValidMenuFormat(menuArray);
  }

  static isNumber(value) {
    const isValid = REGEX_NUMBER.test(value) && Number.isSafeInteger(Number(value));
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
      const [menuName, menuCount] = menu.split(MENU_SPLIT.count);
      const isNameString = REGEX_STRING.test(menuName);
      const isCountNumber = REGEX_NUMBER.test(menuCount) && Number.isSafeInteger(Number(menuCount));
      if (!isNameString || !isCountNumber) {
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