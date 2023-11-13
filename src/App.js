import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import InputValidator from "./validator/inputValidator.js";

import Bill from "./class/Bill.js";

class App {
  #inputValidator;

  constructor() {
    this.#inputValidator = new InputValidator();
  }

  async run() {
    OutputView.startOrder();
    try {
      const visitDate = await this.getVisitDate();
      const orders = await this.getOrders();
      const bill = this.createBill(visitDate, orders);
      // 3. 최종 정보를 출력한다.
      OutputView.printBill(bill);
    } catch (error) {
      OutputView.printError(error.message);
    }
  }

  // 1-1. 고객의 식당 예상 방문 날짜를 입력받는다.
  async getVisitDate() {
    try {
      const date = this.#inputValidator.validateVisitDate(await InputView.getVisitDate());
      return Number(date);
    } catch (error) {
      OutputView.printError(error.message);
      return this.getVisitDate();
    }
  }

  // 1-2. 고객의 메뉴를 입력받는다.
  async getOrders() {
    try {
      const orders = this.#inputValidator.validateOrders(await InputView.getOrders());
      return orders;
    } catch (error) {
      OutputView.printError(error.message);
      return this.getOrders();
    }
  }

  createBill(visitDate, orders) {
    return new Bill(visitDate, orders);
  }
}

export default App;
