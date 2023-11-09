import { Console } from "@woowacourse/mission-utils";
import { OUTPUT } from "./constants/message.js";

export default class OutputView {
  constructor() {
    OutputView.startOrder();
  }

  static startOrder() {
    Console.print(OUTPUT.startOrder);
  }

  static printError(message) {
    Console.print(message);
  }
}