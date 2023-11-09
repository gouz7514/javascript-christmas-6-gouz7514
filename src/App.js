import { Console } from "@woowacourse/mission-utils"
;
import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import InputValidator from "./validator/inputValidator.js";

class App {
  constructor() {
    this.inputView = new InputView();
    this.outputView = new OutputView();
  }

  async run() {
    const date = await this.readDate();
    Console.print(date);
  }

  // 1-1. 고객의 식당 예상 방문 날짜를 입력받는다.
  async readDate() {
    try {
      const date = InputValidator.validateDate(await this.inputView.readDate());
      return date;
    } catch (error) {
      OutputView.printError(error.message);
      return this.readDate();
    }
  }
}

export default App;
