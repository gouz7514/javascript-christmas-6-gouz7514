import Bill from "./Bill.js";

class Order {
  #info = {
    visitDate: 1,
    orders: [],
  };

  constructor(visitDate, orders) {
    this.#info.visitDate = visitDate;
    this.#info.orders = orders;
    this.bill = new Bill();

    this.createBill(orders);
  }

  createBill(orders) {
    this.bill.createBill(orders);
  }
}

export default Order;