import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import InputValidator from "./validator/inputValidator.js";

import Bill from "./class/Bill.js";

class App {
  constructor() {
    this.inputView = InputView;
    this.outputView = OutputView;
  }

  async run() {
    this.outputView.startOrder();
    const visitDate = Number(await this.getVisitDate());
    const orders = await this.getOrders();
    const bill = this.createBill(visitDate, orders);
    const billInfo = bill.calculateBill();
    console.log(billInfo);
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
      const orders = InputValidator.validateOrders(await this.inputView.getOrders());
      return orders;
    } catch (error) {
      OutputView.printError(error.message);
      return this.getOrders();
    }
  }

  // 2. 방문 날짜와 주문을 토대로 영수증을 생성한다.
  createBill(visitDate, orders) {
    const bill = new Bill(visitDate, orders);
    return bill;
  }
}

export default App;
