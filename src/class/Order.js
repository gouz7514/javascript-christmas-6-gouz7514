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

    this.createBill(visitDate, orders);
  }

  createBill(visitDate, orders) {
    this.bill.createBill(visitDate, orders);
  }
}

export default Order;