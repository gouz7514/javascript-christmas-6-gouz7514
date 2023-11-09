import { MENU } from "../constants/menu.js";

class Bill {
  #info = {
    orders: [],
    totalPrice: 0,
    giveAway: false,
    benefits: [],
    benefitAmount: 0,
    finalPrice: 0,
    badge: "",
  };

  createBill(orders) {
    this.#info.orders = orders;

    this.calculateTotalPrice(orders);
  }

  // 2-1. 할인 전 총주문 금액을 계산한다.
  calculateTotalPrice(orders) {
    orders.forEach((order) => {
      const { name, count } = order;
      this.#info.totalPrice += MENU[name].price * count;
    });
  }
}

export default Bill;