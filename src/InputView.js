import { Console } from "@woowacourse/mission-utils";
import { INPUT } from "./constants/message.js";

// 1. 고객의 입력을 받는다.
export default class InputView {
  async readDate() {
    const date = await Console.readLineAsync(INPUT.readDate);
    return date;
  }

  async readMenu() {
    const menu = await Console.readLineAsync(INPUT.readMenu);
    return menu;
  }
}