import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import InputValidator from "./validator/InputValidator.js";

import Bill from "./class/Bill.js";

class App {
  async run() {
    OutputView.startOrder();
    try {
      const visitDate = await this.#getVisitDate();
      const orders = await this.#getOrders();
      const bill = this.#createBill(visitDate, orders);
      // 3. 최종 정보를 출력한다.
      OutputView.printBill(bill);
    } catch (error) {
      OutputView.printError(error.message);
    }
  }

  // 1-1. 고객의 식당 예상 방문 날짜를 입력받는다.
  async #getVisitDate() {
    try {
      const date = InputValidator.validateVisitDate(await InputView.getVisitDate());
      return date;
    } catch (error) {
      OutputView.printError(error.message);
      return this.#getVisitDate();
    }
  }

  // 1-2. 고객의 메뉴를 입력받는다.
  async #getOrders() {
    try {
      const orders = InputValidator.validateOrders(await InputView.getOrders());
      return orders;
    } catch (error) {
      OutputView.printError(error.message);
      return this.#getOrders();
    }
  }

  // 2. 방문 날짜와 주문 메뉴를 토대로 영수증을 생성한다.
  #createBill(visitDate, orders) {
    const bill = new Bill(visitDate, orders);
    return bill;
  }
}

export default App;
