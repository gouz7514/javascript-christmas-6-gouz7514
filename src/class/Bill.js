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
    this.#info.totalPrice = this.calculateTotalPrice(orders);
  }

  // 2-1. 할인 전 총주문 금액을 계산한다.
  calculateTotalPrice(orders) {
    let totalPrice = 0;
    orders.forEach((order) => {
      const [menu, count] = order.split("-");
      totalPrice += MENU[menu] * count;
    });
    return totalPrice;
  }
}

export default Bill;