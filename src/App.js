import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import InputValidator from "./validator/inputValidator.js";

import Order from "./class/Order.js";

import { orderToArray } from "./util/order.js";

class App {
  constructor() {
    this.inputView = InputView;
    this.outputView = OutputView;
    this.order = new Order();
  }

  async run() {
    this.outputView.startOrder();
    const visitDate = Number(await this.getVisitDate());
    const userOrder = await this.getOrders();
    const orderInfo = this.createOrderInfo(visitDate, userOrder);
    const bill = this.createBill(orderInfo);
    console.log('bill : ', bill);
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

  // 2. 12월 이벤트 계획에 따라 필요한 정보를 계산한다.
  createOrderInfo(visitDate, orders) {
    const orderArray = orderToArray(orders);
    const orderInfo = this.order.createOrderInfo(visitDate, orderArray);
    return orderInfo;
  }

  createBill(orders) {
    const bill = this.order.createBill(orders);
    return bill;
  }
}

export default App;
