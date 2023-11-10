import Bill from "./Bill.js";

class Order {
  #info = {
    visitDate: 1,
    orders: [],
  };

  constructor() {
    this.bill = new Bill();
  }

  createOrderInfo(visitDate, orders) {
    this.#info.visitDate = visitDate;
    this.#info.orders = orders;
    
    return this.#info;
  }

  createBill(orders) {
    const billInfo = this.bill.createBillInfo(orders);
    return billInfo;
  }
}

export default Order;