import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import InputValidator from "./validator/inputValidator.js";

class App {
  constructor() {
    this.inputView = new InputView();
    this.outputView = new OutputView();
  }

  async run() {
    await this.getVisitDate();
    await this.getOrders();
  }

  // 1-1. 고객의 식당 예상 방문 날짜를 입력받는다.
  async getVisitDate() {
    try {
      const date = InputValidator.validateVisitDate(await this.inputView.getVisitDate());
      return date;
    } catch (error) {
      OutputView.printError(error.message);
      return this.getVisitDate();
    }
  }

  // 1-2. 고객의 메뉴를 입력받는다.
  async getOrders() {
    try {
      const menu = InputValidator.validateOrders(await this.inputView.getOrders());
      return menu;
    } catch (error) {
      OutputView.printError(error.message);
      return this.getOrders();
    }
  }
}

export default App;
