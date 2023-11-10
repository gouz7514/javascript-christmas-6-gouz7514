import { Console } from "@woowacourse/mission-utils";
import { OUTPUT } from "./constants/message.js";

const OutputView = {
  startOrder() {
    Console.print(OUTPUT.startOrder);
  },
  printError(message) {
    Console.print(message);
  }
};

export default OutputView;