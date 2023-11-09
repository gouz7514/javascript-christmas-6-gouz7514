import { DATE } from "../constants/constant.js";
import { ERROR } from "../constants/error.js";

export default class InputValidator {
  // 1-1-1. 숫자로만, 1 이상 31 이하, 이외의 입력값은 예외를 발생시킨다.
  static validateDate(date) {
    this.isNumber(date);
    this.isValidDate(date);
    return date;
  }

  static isNumber(value) {
    const regex = /^-?\d+(\.\d+)?$/;
    const isValid = regex.test(value) && Number.isSafeInteger(Number(value));
    if (!isValid) {
      throw new Error(ERROR.notValidDate);
    }
  }

  static isValidDate(value) {
    const isValid = Number(value) >= DATE.start && Number(value) <= DATE.end;
    if (!isValid) {
      throw new Error(ERROR.notValidDate);
    }
  }
}